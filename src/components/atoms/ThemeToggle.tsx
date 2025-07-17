import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { toggleTheme } from '../../store/themeSlice'
import { ThemeToggleBase } from './ThemeToggleBase'

/**
 * Connected container component for theme toggle
 * Manages Redux state and delegates presentation to ThemeToggleBase
 */
export const ThemeToggle = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  return <ThemeToggleBase isDarkMode={isDarkMode} onToggle={handleToggle} />
}
