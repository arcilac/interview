'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isLoading: boolean
}

// Create the theme context (light/dark)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get theme from localStorage (if available)
  const getSavedTheme = () => {
    try {
      return localStorage.getItem('theme')
    } catch (error) {
      console.warn('Unable to access localStorage:', error)
      return null
    }
  }

  // Save theme to localStorage
  const setSavedTheme = (theme: string) => {
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      console.warn('Unable to save theme to localStorage:', error)
    }
  }

  // Initialize theme and listen to system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Handle system theme change if no saved preference exists
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!getSavedTheme()) {
        setIsDarkMode(e.matches)
      }
    }

    // Determine and set initial theme
    const initializeTheme = () => {
      const savedTheme = getSavedTheme()
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark')
      } else {
        setIsDarkMode(mediaQuery.matches)
      }
      setIsLoading(false)
    }

    initializeTheme()
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    // Cleanup event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  // Apply the theme class and save preference
  useEffect(() => {
    if (isLoading) return

    document.documentElement.classList.toggle('dark', isDarkMode)
    setSavedTheme(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode, isLoading])

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    // Provide theme state and toggle function to all children
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}
