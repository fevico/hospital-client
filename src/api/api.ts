import type { NearestAmbulanceResponse } from "@/types/abulance";

const API_BASE = '/api'; // assuming proxy to http://localhost:3000/api

export const fetchHospitals = async (): Promise<Hospital[]> => {
  const res = await fetch(`${API_BASE}/hospitals`);
  console.log("Response from server", res)
  if (!res.ok) throw new Error('Failed to fetch hospitals');
  return res.json();
};


export const fetchNearestAmbulance = async (hospitalId: number): Promise<NearestAmbulanceResponse> => {
  const res = await fetch(`${API_BASE}/ambulances/nearest/${hospitalId}`);
  console.log("Response from abulance hospital", res)
  if (!res.ok) throw new Error(`Failed to fetch nearest ambulance for hospital ${hospitalId}`);
  return res.json();
};

// Optional: type your data (strongly recommended)
export interface Hospital {
  id: number;
  name: string;
  address?: string;
  capacity?: number;
  type?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}