export interface Hospital {
  id: number;
  name: string;
  address?: string | null;     // nullable in entity
  capacity?: number | null;
  type?: string | null;        // e.g. 'General', 'Teaching', 'Private'
  location: GeoJsonPoint;
}


export interface GeoJsonPoint {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}


export interface HospitalInput {
  name: string;
  address?: string;
  capacity?: number;
  type?: string;
  location: GeoJsonPoint;
}

export type LatLngTuple = [number, number]; // for Leaflet: [lat, lng]