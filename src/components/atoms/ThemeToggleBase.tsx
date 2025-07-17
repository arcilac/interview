import { Moon, Sun } from 'lucide-react'

/**
 * Presentational component for theme toggle button
 * Displays a sun or moon icon depending on isDarkMode prop
 */
export interface ThemeToggleBaseProps {
  isDarkMode: boolean
  onToggle: () => void
}

export const ThemeToggleBase = ({ isDarkMode, onToggle }: ThemeToggleBaseProps) => {
  return (
    <button
      onClick={onToggle}
      className="theme-toggle theme-toggle-active"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="theme-toggle-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
