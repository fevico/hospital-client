// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css'; // Move here (inside the component file) — fixes Vite pre-bundling issues

// import { AppSidebar } from './components/AppSidebar'; // adjust path if needed

// // Fix broken default marker icons (very common Vite + Leaflet issue)
// import L from 'leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // One-time fix for icons (run once on app load)
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function App() {
//   return (
//     <div className="flex h-screen w-screen overflow-hidden">
//       <AppSidebar />

//       <main className="flex-1 flex flex-col p-6 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-4">GIS Hospital Dashboard</h1>

//         {/* Map container — give it height! */}
//         <div className="flex-1 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//           <MapContainer
//             center={[6.5244, 3.3792]} // Lagos coordinates (lat, lng) — change as needed
//             zoom={12}
//             scrollWheelZoom={true}
//             style={{ height: '100%', width: '100%' }} // Critical: full height/width
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* Example marker — you'll replace with hospitals later */}
//             {/* <Marker position={[6.5244, 3.3792]}>
//               <Popup>Lagos General Hospital</Popup>
//             </Marker> */}
//           </MapContainer>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;



// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Ambulances from './pages/Ambulance';
import Hospitals from './pages/Hospital';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,          // default route when at "/"
        element: <Dashboard />,
      },
      {
        path: 'hospitals',
        element: <Hospitals />,
      },
      {
        path: 'ambulances',
        element: <Ambulances />,
      },
      // Add a catch-all for 404 later if you want
      // { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;