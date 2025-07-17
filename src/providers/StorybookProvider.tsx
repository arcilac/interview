'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import themeReducer from '../store/themeSlice'

// Combines Redux, React Query, and Theme providers
// Allows stories to work with your state management
export const StorybookProvider = ({ children, mockState = {}, defaultTheme = 'light' }) => {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: mockState,
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem={false}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
