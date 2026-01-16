import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useHospitals } from '@/hooks/useHospital';

export default function Hospitals() {
  const { data: hospitals, isLoading, error } = useHospitals();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Hospitals List</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-red-600">
        <h2 className="text-xl font-semibold mb-2">Failed to load hospitals</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-muted-foreground">
        <Building className="h-12 w-12 mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2">No hospitals found</h2>
        <p>Try refreshing or check if data is seeded in the backend.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hospitals List</h2>
        <Badge variant="outline" className="text-sm">
          {hospitals.length} hospitals
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hospitals.map((hospital) => (
          <Card 
            key={hospital.id} 
            className="hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-1">{hospital.name}</CardTitle>
              {hospital.type && (
                <CardDescription className="flex items-center gap-1 text-sm">
                  <Badge variant="secondary">{hospital.type}</Badge>
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {hospital.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-muted-foreground line-clamp-2">{hospital.address}</span>
                </div>
              )}

              {hospital.capacity && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Capacity: <span className="font-medium">{hospital.capacity} beds</span>
                  </span>
                </div>
              )}

              {/* Optional: Show coordinates */}
              <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                Coordinates: {hospital.location.coordinates[1].toFixed(4)},{' '}
                {hospital.location.coordinates[0].toFixed(4)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}