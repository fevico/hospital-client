
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Badge } from '@/components/ui/badge';
import { Navigation, Siren } from 'lucide-react'; // for icons
import { useHospitals } from '@/hooks/useHospital';
import { useNearestAmbulance } from '@/hooks/nearestAmbulance';


export default function Dashboard() {
  const { data: hospitals } = useHospitals();
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const { data: nearest, isLoading: nearestLoading, error: nearestError } = useNearestAmbulance(selectedHospitalId);



  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="h-full w-full rounded-xl border shadow-sm overflow-hidden">
          <MapContainer center={[6.5244, 3.3792]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="..." />

{hospitals?.map((hospital) => {
  // 1. Early exit if no location at all
  if (!hospital?.location) {
    console.warn(`Hospital ${hospital.id} (${hospital.name}) has no location`);
    return null;
  }

  // 2. Safe access to coordinates
  const coords = hospital.location.coordinates;
  if (!Array.isArray(coords) || coords.length !== 2 || 
      typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
    console.warn(`Invalid coordinates for hospital ${hospital.id}:`, coords);
    return null;
  }

  const [lng, lat] = coords;

              return (
                <Marker
                  key={hospital.id}
                  position={[lat, lng]}
                  eventHandlers={{
                    click: () => setSelectedHospitalId(hospital.id), // ← Trigger fetch on click
                  }}
                >
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-semibold mb-2">{hospital.name}</h3>
                      {hospital.address && <p className="text-sm text-muted-foreground mb-1">{hospital.address}</p>}
                      {hospital.type && <Badge className="mb-2">{hospital.type}</Badge>}
                      {hospital.capacity && <p className="text-sm mb-2">Capacity: {hospital.capacity} beds</p>}

                      {/* Nearest Ambulance Section */}
                      <div className="pt-2 border-t">
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-1">
                          <Siren className="h-4 w-4" /> Nearest Ambulance
                        </h4>
                        {nearestLoading && <p className="text-xs text-muted-foreground">Calculating...</p>}
                        {nearestError && <p className="text-xs text-red-600">Error: {nearestError.message}</p>}
                        {nearest && (
                          <div className="text-xs space-y-1">
                            <p><strong>{nearest.name}</strong> ({nearest.status})</p>
                            <p className="flex items-center gap-1">
                              <Navigation className="h-3 w-3" /> {nearest.distance_km.toFixed(2)} km away
                            </p>
                            {/* <p>Position: {nearest.location.coordinates[1].toFixed(4)}, {nearest.location.coordinates[0].toFixed(4)}</p> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}