'use client'

import { Provider } from 'react-redux'
import { store } from '../store'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'

/**
 * Client-side providers wrapper
 * Contains all providers that need to run on the client
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </Provider>
  )
}
