import { MapContainer, TileLayer } from "react-leaflet"  // you'll add this later
import { AppSidebar } from "./components/AppSidebar"
// ...

function App() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        {/* Your map + content here */}
        <h1 className="text-2xl font-bold">GIS Hospital Dashboard</h1>
        {/* Map goes here */}
      </main>
    </div>
  )
}

export default App