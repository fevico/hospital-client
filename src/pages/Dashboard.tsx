// import { SidebarTrigger } from '@/components/ui/sidebar';

// export default function Dashboard() {
//   return (
//     <div>
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <SidebarTrigger className="-ml-1" />
//         <h2 className="text-xl font-semibold">Dashboard</h2>
//       </header>

//       {/* Your map or content */}
//       <div className="h-[70vh] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
//         <p className="text-gray-500">GIS Map Placeholder</p>
//       </div>
//     </div>
//   );
// }



// src/pages/Dashboard.tsx
import { SidebarTrigger } from '@/components/ui/sidebar'; // if you're using collapsible sidebar
import MapView from '@/components/MapView'; // adjust path if needed (e.g. ../components/MapView)

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Optional header with sidebar trigger and title */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-white px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
      </header>

      {/* Main content area - map takes most of the space */}
      <div className="flex-1 p-6">
        <div className="h-full w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <MapView />
        </div>
      </div>
    </div>
  );
}