'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

/**
 * Wraps the application with React Query's provider,
 * initializing a client with custom config and DevTools.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a single QueryClient instance for the app
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
