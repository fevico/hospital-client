// src/components/MapView.tsx
import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer } from 'react-leaflet';

// Optional: Fix default marker icons (prevents 404 on markers later)
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Run this once (can be outside the component)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  return (
    <MapContainer
      center={[6.5244, 3.3792]} // Lagos - you can make this dynamic later
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }} // ← Important: 100% of parent
      className="z-0" // helps with layering
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* You can add example markers here for now */}
      {/* <Marker position={[6.5244, 3.3792]}>
        <Popup>Example Hospital</Popup>
      </Marker> */}
    </MapContainer>
  );
}