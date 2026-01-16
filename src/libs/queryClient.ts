import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes — data stays fresh
      gcTime: 10 * 60 * 1000,        // 10 minutes garbage collection (cache time)
      refetchOnWindowFocus: false,   // Avoid unnecessary refetches
      retry: 1,                      // Retry once on failure
    },
  },
});