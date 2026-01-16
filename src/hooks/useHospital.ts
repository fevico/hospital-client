import { fetchHospitals, type Hospital } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export const useHospitals = () => {
  return useQuery<Hospital[], Error>({
    queryKey: ['hospitals'],
    queryFn: fetchHospitals,
  });
};