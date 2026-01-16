import { useQuery } from '@tanstack/react-query';
import { fetchNearestAmbulance } from '@/api/api';
import type { NearestAmbulanceResponse } from '@/types/abulance';

export const useNearestAmbulance = (hospitalId: number | null) => {
  return useQuery<NearestAmbulanceResponse, Error>({
    queryKey: ['nearestAmbulance', hospitalId],
    queryFn: () => fetchNearestAmbulance(hospitalId!),
    enabled: !!hospitalId, // Only fetch if ID is set (after click)
    staleTime: 5 * 60 * 1000, // Cache for 5 min (matches backend TTL)
  });
};