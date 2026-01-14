// import { Outlet } from 'react-router-dom';
// import { AppSidebar } from './AppSidebar'; // adjust path if needed

// export default function Layout() {
//   return (
//     <div className="flex h-screen w-screen overflow-hidden">
//       <AppSidebar />
//       <main className="flex-1 flex flex-col p-6 bg-gray-50 overflow-auto">
//         <Outlet /> {/* This is where page content renders */}
//       </main>
//     </div>
//   );
// }


// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'; // adjust alias if needed

export default function Layout() {
  return (
    <SidebarProvider>  {/* ← Wrap everything here */}
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar />

        {/* Use SidebarInset for automatic content adjustment when sidebar collapses */}
        <SidebarInset className="flex-1 flex flex-col">
          <main className="flex-1 p-6 bg-gray-50 overflow-auto">
            <Outlet />  {/* Pages render here */}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}