export interface Ambulance {
  id: number;
  name: string;
  status: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

export interface NearestAmbulanceResponse {
  id: number;
  name: string;
  status: string;
  distance_km: number; // from backend ST_Distance
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}