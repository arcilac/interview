import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const ThemeToggle = () => {
  // Get theme state and toggle function from context
  const { isDarkMode, toggleDarkMode, isLoading } = useTheme()

  // Show a skeleton loading state while theme is initializing
  if (isLoading) {
    return (
      <div className="theme-toggle">
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="theme-toggle active:scale-95 transform"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="font-semibold text-sm">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
