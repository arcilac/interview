import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storage } from '../utils/storage'

/**
 * Determines the initial theme based on:
 * 1. Saved preference in localStorage
 * 2. System preference (prefers-color-scheme)
 * 3. Default to light mode
 */
const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return false

  // Check if user has a saved preference
  const savedTheme = storage.get('theme')
  if (savedTheme) {
    return savedTheme === 'dark'
  }

  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initialState = {
  isDarkMode: false, // Always start with light mode for SSR
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode

      // Apply theme to DOM
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode)
        storage.set('theme', state.isDarkMode ? 'dark' : 'light')
      }
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload

      // Apply theme to DOM
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', state.isDarkMode)
        storage.set('theme', state.isDarkMode ? 'dark' : 'light')
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
