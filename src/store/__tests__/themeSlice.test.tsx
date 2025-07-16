import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { toggleTheme, setTheme } from '../themeSlice'
import { storage } from '../../utils/storage'

// NOTE: Define the store type used for testing
type TestStore = ReturnType<
  typeof configureStore<{
    theme: ReturnType<typeof themeReducer>
  }>
>

// Mock the storage utility to intercept get/set calls
jest.mock('../../utils/storage', () => ({
  storage: {
    get: jest.fn(),
    set: jest.fn(),
  },
}))

// Mock window.matchMedia to avoid runtime errors in tests
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

// Mock document.documentElement.classList for theme toggling
const mockClassList = {
  toggle: jest.fn(),
}
Object.defineProperty(document, 'documentElement', {
  writable: true,
  value: {
    classList: mockClassList,
  },
})

describe('themeSlice', () => {
  let store: TestStore

  // Create a fresh store before each test and clear all mocks
  beforeEach(() => {
    store = configureStore({
      reducer: {
        theme: themeReducer,
      },
    })

    jest.clearAllMocks()
    const mockedStorageGet = storage.get as jest.Mock
    mockedStorageGet.mockReturnValue(null)
    mockMatchMedia.mockReturnValue({ matches: false })
  })

  describe('initial state', () => {
    // Verifies that the default theme is light mode
    it('starts with light mode (isDarkMode: false)', () => {
      expect(store.getState().theme.isDarkMode).toBe(false)
    })
  })

  describe('toggleTheme action', () => {
    // Toggles theme from light to dark mode
    it('toggles from light to dark mode', () => {
      expect(store.getState().theme.isDarkMode).toBe(false)

      store.dispatch(toggleTheme())
      expect(store.getState().theme.isDarkMode).toBe(true)

      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true)
      expect(storage.set).toHaveBeenCalledWith('theme', 'dark')
    })

    // Toggles theme from dark to light mode
    it('toggles from dark to light mode', () => {
      store.dispatch(setTheme(true)) // Set initial state to dark
      jest.clearAllMocks()

      store.dispatch(toggleTheme())
      expect(store.getState().theme.isDarkMode).toBe(false)

      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', false)
      expect(storage.set).toHaveBeenCalledWith('theme', 'light')
    })

    // Ensures toggle works repeatedly
    it('toggles back and forth correctly', () => {
      expect(store.getState().theme.isDarkMode).toBe(false)

      store.dispatch(toggleTheme()) // light -> dark
      expect(store.getState().theme.isDarkMode).toBe(true)

      store.dispatch(toggleTheme()) // dark -> light
      expect(store.getState().theme.isDarkMode).toBe(false)

      expect(storage.set).toHaveBeenCalledWith('theme', 'dark')
      expect(storage.set).toHaveBeenCalledWith('theme', 'light')
    })
  })

  describe('setTheme action', () => {
    // Directly sets theme to dark mode
    it('sets theme to dark mode', () => {
      store.dispatch(setTheme(true))

      expect(store.getState().theme.isDarkMode).toBe(true)
      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true)
      expect(storage.set).toHaveBeenCalledWith('theme', 'dark')
    })

    // Sets theme to light mode after being in dark
    it('sets theme to light mode', () => {
      store.dispatch(setTheme(true))
      jest.clearAllMocks()

      store.dispatch(setTheme(false))

      expect(store.getState().theme.isDarkMode).toBe(false)
      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', false)
      expect(storage.set).toHaveBeenCalledWith('theme', 'light')
    })

    // Verifies DOM and storage are updated even if the value is the same
    it('setting same theme value still triggers DOM update', () => {
      store.dispatch(setTheme(true))
      jest.clearAllMocks()

      store.dispatch(setTheme(true))

      expect(store.getState().theme.isDarkMode).toBe(true)
      expect(mockClassList.toggle).toHaveBeenCalledWith('dark', true)
      expect(storage.set).toHaveBeenCalledWith('theme', 'dark')
    })
  })

  describe('DOM manipulation and storage', () => {
    // Ensures that the DOM class "dark" is correctly applied
    it('applies theme class to document element', () => {
      store.dispatch(setTheme(true))
      expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', true)
    })

    // Confirms that theme preferences are saved in storage
    it('saves theme preference to storage', () => {
      store.dispatch(setTheme(true))
      expect(storage.set).toHaveBeenCalledWith('theme', 'dark')

      store.dispatch(setTheme(false))
      expect(storage.set).toHaveBeenCalledWith('theme', 'light')
    })

    // Validates consistency after multiple theme changes
    it('handles multiple theme changes correctly', () => {
      store.dispatch(toggleTheme()) // light → dark
      store.dispatch(toggleTheme()) // dark → light
      store.dispatch(setTheme(true)) // light → dark

      expect(storage.set).toHaveBeenCalledTimes(3)
      expect(storage.set).toHaveBeenNthCalledWith(1, 'theme', 'dark')
      expect(storage.set).toHaveBeenNthCalledWith(2, 'theme', 'light')
      expect(storage.set).toHaveBeenNthCalledWith(3, 'theme', 'dark')
    })
  })
})
