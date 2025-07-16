'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setTheme } from '../store/themeSlice'
import { storage } from '../utils/storage'

/**
 * Component that handles theme initialization and system preference changes
 * Should be placed high in the component tree
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Determine the correct initial theme
    const savedTheme = storage.get('theme')
    const initialDarkMode = savedTheme
      ? savedTheme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches

    // Set the correct theme
    dispatch(setTheme(initialDarkMode))
    setIsHydrated(true)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Listen for system theme changes, only if user hasn't manually set a theme
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const currentSavedTheme = storage.get('theme')
      if (!currentSavedTheme) {
        dispatch(setTheme(e.matches))
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [dispatch])

  // Don't render until hydrated to avoid mismatch
  if (!isHydrated) {
    return <div className="opacity-0">{children}</div>
  }

  return <>{children}</>
}
