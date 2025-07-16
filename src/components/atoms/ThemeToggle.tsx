import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Button component to toggle between light and dark themes
 * Displays a sun or moon icon depending on current mode
 */
export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="theme-toggle theme-toggle-active"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`} // accessible label
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="theme-toggle-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
