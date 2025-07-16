// NOTE: This is for the theme toggle
export const storage = {
  // Retrieve a value from localStorage by key
  get: (key: string): string | null => {
    try {
      // Only run in browser
      return typeof window !== 'undefined' ? localStorage.getItem(key) : null
    } catch (error) {
      console.warn(`Unable to access localStorage for key "${key}":`, error)
      return null
    }
  },

  // Save a string value under the given key in localStorage
  set: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value)
      }
    } catch (error) {
      console.warn(`Unable to save to localStorage for key "${key}":`, error)
    }
  },

  // Remove the given key (and its value) from localStorage
  remove: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Unable to remove from localStorage for key "${key}":`, error)
    }
  },
}
