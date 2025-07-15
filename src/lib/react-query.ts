// Centralized query configuration
export const queryConfig = {
  // Default options for all queries
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },

  // Specific configurations for different query types
  countries: {
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  country: {
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  },

  countriesByCodes: {
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  },
}
