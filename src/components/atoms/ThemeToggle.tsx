import { Moon, Sun } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { toggleTheme } from '../../store/themeSlice'

/**
 * Button component to toggle between light and dark themes
 * Displays a sun or moon icon depending on current mode
 */
export const ThemeToggle = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle theme-toggle-active"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="theme-toggle-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}
