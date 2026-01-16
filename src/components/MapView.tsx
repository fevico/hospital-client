
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { useEffect } from 'react';
// import { useHospitals } from '@/hooks/useHospital';

// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// import L from 'leaflet';

// delete (L.Icon.Default.prototype as any)._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// export default function MapView() {

//     useEffect(() => {
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//   });
// }, []);

//   const { data: hospitals, isLoading, error } = useHospitals();

//   if (isLoading) return <div className="flex-1 flex items-center justify-center">Loading hospitals...</div>;
//   if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error.message}</div>;

//   return (
//     <div className="flex flex-col h-full">
//       <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
//         <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
//       </header>

//       <div className="flex-1 p-6">
//         <div className="h-full w-full rounded-xl border shadow-sm overflow-hidden">
//           <MapContainer
//             center={[6.5244, 3.3792]} // Lagos fallback
//             zoom={11}
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {hospitals?.map((hospital) => {
//               const [lng, lat] = hospital.location.coordinates; // GeoJSON = [lng, lat]
//               return (
//                 <Marker key={hospital.id} position={[lat, lng]}>
//                   <Popup>
//                     <div className="font-semibold">{hospital.name}</div>
//                     {hospital.address && <p>{hospital.address}</p>}
//                     {hospital.type && <p>Type: {hospital.type}</p>}
//                     {hospital.capacity && <p>Capacity: {hospital.capacity} beds</p>}
//                   </Popup>
//                 </Marker>
//               );
//             })}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// }



import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useHospitals } from '@/hooks/useHospital';

// Import marker images (Vite will bundle them automatically)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

// Fix default icons **only once** — do this outside component or in useEffect with empty deps
// We use useEffect to ensure it runs after Leaflet is loaded
useEffect(() => {
  // Prevent multiple runs / conflicts
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  // Optional: Log to confirm fix applied (remove in production)
  console.log('Leaflet default icons fixed');
}, []); // empty deps = run once on mount

export default function MapView() {
  const { data: hospitals, isLoading, error } = useHospitals();

  if (isLoading) return <div className="flex-1 flex items-center justify-center">Loading hospitals...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error.message}</div>;

  // Optional: Debug log to confirm data shape in production
  console.log('Hospitals loaded:', hospitals?.map(h => ({
    id: h.id,
    name: h.name,
    hasLocation: !!h.location?.coordinates,
  })));

  return (
    <div className="flex flex-col h-full">
      <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="h-full w-full rounded-xl border shadow-sm overflow-hidden">
          <MapContainer
            center={[6.5244, 3.3792]} // Lagos fallback
            zoom={11}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hospitals?.map((hospital) => {
              // Safety guard (prevents crash if any hospital has bad data)
              if (!hospital?.location?.coordinates?.length) {
                console.warn(`Skipping hospital ${hospital.id} - invalid location`);
                return null;
              }

              const [lng, lat] = hospital.location.coordinates;

              return (
                <Marker 
                  key={hospital.id} 
                  position={[lat, lng]} // Leaflet wants [lat, lng]
                >
                  <Popup>
                    <div className="font-semibold">{hospital.name}</div>
                    {hospital.address && <p>{hospital.address}</p>}
                    {hospital.type && <p>Type: {hospital.type}</p>}
                    {hospital.capacity && <p>Capacity: {hospital.capacity} beds</p>}
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