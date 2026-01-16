# GIS-Integrated Hospital Dashboard

A full-stack mini-dashboard application that visualizes hospital locations and ambulance proximity using spatial data and GIS techniques. Built as part of a technical assessment to demonstrate full-stack skills with React, Leaflet, NestJS, TypeORM, PostgreSQL + PostGIS, and TanStack Query.

## Features

- **Spatial Database** with PostgreSQL + PostGIS
  - At least 10 mock hospitals and 5 ambulances seeded in Lagos, Nigeria area
  - Ambulance locations can be manually updated via API to simulate movement

- **Interactive Map** (Frontend)
  - React + Leaflet map displaying all hospitals as clickable markers
  - Clicking a hospital marker shows hospital details + nearest ambulance (with distance in km)
  - Uses spatial backend query for accurate proximity calculation

- **Proximity Logic**
  - Backend calculates nearest ambulance using PostGIS spatial functions (`ST_Distance` with geography type)
  - Cached results (Redis) for repeated queries → no repeated DB hits (satisfies "Grit Challenge")

- **Ambulance Management**
  - List view of all ambulances with status and current location
  - "Move Randomly" button on each ambulance card → updates coordinates via API (simulates real-time movement)
  - Updates reflect immediately in the list and affect nearest-ambulance calculations on the map

- **Frontend Tech**
  - React (Vite) + TypeScript
  - Leaflet for mapping
  - TanStack Query (React Query) for data fetching & caching
  - Shadcn/ui + Tailwind CSS for modern UI

1. Navigate to frontend folder:Bashcd client
2. Install dependencies:Bashnpm install
3. create .env file and add this VITE_API_BASE_URL
4. Start development server:Bashnpm run devOpen: http://localhost:5173Features:
Dashboard (/): Interactive Leaflet map with hospital markers
Hospitals fetched via TanStack Query from /api/hospitals
Click any hospital marker → popup shows details + nearest ambulance (calculated via backend spatial query)
Nearest result cached in backend (Redis) → repeated clicks are fast

Hospitals (/hospitals): Card list of all hospitals with name, type, capacity, address
Ambulances (/ambulances): Card list of ambulances with status and location
Each card has "Move Randomly" button → sends PUT request to backend to update coordinates
List auto-refreshes after update → new position visible immediately



How to Test Core Features

View hospitals on map → Dashboard page → markers appear
Click hospital → see popup with nearest ambulance distance (uses PostGIS ST_Distance)
Repeat click on same hospital → fast response (cached in backend)
Update ambulance position → Ambulances page → click "Move Randomly" on any ambulance
See toast feedback
Go back to Dashboard → click nearby hospitals → distances should have changed

