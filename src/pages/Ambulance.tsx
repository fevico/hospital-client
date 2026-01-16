
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Siren, MapPin, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

// Fetch function
const fetchAmbulances = async () => {
  const res = await fetch('/api/ambulances');
  if (!res.ok) throw new Error('Failed to fetch ambulances');
  return res.json();
};

// Type for ambulance
interface Ambulance {
  id: number;
  name: string;
  status: string; // 'available', 'in-use', 'maintenance'
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

export default function Ambulances() {
  const queryClient = useQueryClient();

  const { data: ambulances, isLoading, error } = useQuery<Ambulance[], Error>({
    queryKey: ['ambulances'],
    queryFn: fetchAmbulances,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle move ambulance
  const handleMoveAmbulance = async (ambulance: Ambulance) => {
    // Generate random coords around Lagos (approx bounding box)
    const randomLat = 6.45 + Math.random() * 0.15; // ~6.45 to 6.60
    const randomLng = 3.30 + Math.random() * 0.15; // ~3.30 to 3.45

    try {
      const res = await fetch(`/api/ambulances/${ambulance.id}/location`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: randomLat,
          lng: randomLng,
          status: "in-use"
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update ambulance location');
      }

      toast.success(`${ambulance.name} moved to new location`)
      // Refetch ambulances list to show updated position
      queryClient.invalidateQueries({ queryKey: ['ambulances'] });

      // Optional: Also invalidate nearest ambulance cache if you have it
      queryClient.invalidateQueries({ queryKey: ['nearestAmbulance'] });
    } catch (err: any) {
        toast.error(`Failed to move ${ambulance.name}`)
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Ambulances</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-20 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-red-600">
        <h2 className="text-xl font-semibold mb-2">Failed to load ambulances</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Empty state
  if (!ambulances || ambulances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-muted-foreground">
        <Siren className="h-12 w-12 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2">No ambulances found</h2>
        <p>Check if data was seeded in the backend.</p>
      </div>
    );
  }

  // Status badge color mapping
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'default'; // green
      case 'in-use':
        return 'secondary'; // gray
      case 'maintenance':
        return 'destructive'; // red
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ambulances</h2>
        <Badge variant="outline" className="text-sm">
          {ambulances.length} active units
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ambulances.map((ambulance) => (
          <Card
            key={ambulance.id}
            className="hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{ambulance.name}</CardTitle>
                <Badge variant={getStatusVariant(ambulance.status)}>
                  {ambulance.status.replace('-', ' ')}
                </Badge>
              </div>
              <CardDescription className="text-sm mt-1">
                ID: {ambulance.id}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  Location:{' '}
                  {ambulance.location.coordinates[1].toFixed(4)},{' '}
                  {ambulance.location.coordinates[0].toFixed(4)}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <Siren className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Last updated: now (real-time in production)
                </span>
              </div>

              {/* Move Button */}
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleMoveAmbulance(ambulance)}
                  disabled={ambulance.status === 'maintenance'} // Optional: disable if in maintenance
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Move Randomly
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}