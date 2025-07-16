'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { storage } from '../utils/storage'

/**
 * Defines the shape of our theme context state:
 * - isDarkMode: whether dark theme is active
 * - toggleDarkMode: function to switch between light/dark
 */
type ThemeContextType = {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

// Create React context for theme, will be provided at root
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Custom hook to access theme context.
 * Throws if used outside of ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}

/**
 * Wraps application in ThemeContext.Provider,
 * initializes from localStorage or system preference,
 * and applies 'dark' class on <html> element.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Determine initial theme by checking HTML class
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Listen for system theme changes, if user has not manually set theme
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = storage.get('theme')
      if (!savedTheme) {
        const newIsDark = e.matches
        setIsDarkMode(newIsDark)
        document.documentElement.classList.toggle('dark', newIsDark)
      }
    }

    // Sync initial state with actual DOM
    const currentIsDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(currentIsDark)

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  /**
   * Toggle theme manually:
   * - Updates React state
   * - Adds/removes 'dark' CSS class on <html>
   * - Persists choice in localStorage
   */
  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    document.documentElement.classList.toggle('dark', newIsDarkMode)
    storage.set('theme', newIsDarkMode ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  )
}
