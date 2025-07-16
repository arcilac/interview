import { storage } from '../storage'

describe('storage', () => {
  let mockLocalStorage: { [key: string]: string }
  let mockGetItem: jest.Mock
  let mockSetItem: jest.Mock
  let mockRemoveItem: jest.Mock

  beforeEach(() => {
    // NOTE: Reset mock storage
    mockLocalStorage = {}

    // NOTE: Mock localStorage methods
    mockGetItem = jest.fn((key: string) => mockLocalStorage[key] || null)
    mockSetItem = jest.fn((key: string, value: string) => {
      mockLocalStorage[key] = value
    })
    mockRemoveItem = jest.fn((key: string) => {
      delete mockLocalStorage[key]
    })

    // NOTE: Mock window object and localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem,
      },
      writable: true,
    })

    // NOTE: Mock console.warn to avoid noise in tests
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('get', () => {
    it('retrieves a value from localStorage', () => {
      mockLocalStorage['theme'] = 'dark'

      const result = storage.get('theme')

      expect(result).toBe('dark')
      expect(mockGetItem).toHaveBeenCalledWith('theme')
    })

    it('returns null when key does not exist', () => {
      const result = storage.get('nonexistent')

      expect(result).toBeNull()
      expect(mockGetItem).toHaveBeenCalledWith('nonexistent')
    })

    it('handles localStorage errors gracefully', () => {
      mockGetItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      const result = storage.get('theme')

      expect(result).toBeNull()
      expect(console.warn).toHaveBeenCalledWith(
        'Unable to access localStorage for key "theme":',
        expect.any(Error),
      )
    })
  })

  describe('set', () => {
    it('saves a value to localStorage', () => {
      storage.set('theme', 'light')

      expect(mockSetItem).toHaveBeenCalledWith('theme', 'light')
      expect(mockLocalStorage['theme']).toBe('light')
    })

    it('handles localStorage errors gracefully', () => {
      mockSetItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      storage.set('theme', 'dark')

      expect(console.warn).toHaveBeenCalledWith(
        'Unable to save to localStorage for key "theme":',
        expect.any(Error),
      )
    })
  })

  describe('remove', () => {
    it('removes a value from localStorage', () => {
      mockLocalStorage['theme'] = 'dark'

      storage.remove('theme')

      expect(mockRemoveItem).toHaveBeenCalledWith('theme')
      expect(mockLocalStorage['theme']).toBeUndefined()
    })

    it('handles localStorage errors gracefully', () => {
      mockRemoveItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })

      storage.remove('theme')

      expect(console.warn).toHaveBeenCalledWith(
        'Unable to remove from localStorage for key "theme":',
        expect.any(Error),
      )
    })
  })

  describe('integration tests', () => {
    it('can set and get a value', () => {
      storage.set('user', 'john')
      const result = storage.get('user')

      expect(result).toBe('john')
    })

    it('can remove a previously set value', () => {
      storage.set('temp', 'value')
      expect(storage.get('temp')).toBe('value')

      storage.remove('temp')
      expect(storage.get('temp')).toBeNull()
    })

    it('handles multiple operations correctly', () => {
      storage.set('key1', 'value1')
      storage.set('key2', 'value2')

      expect(storage.get('key1')).toBe('value1')
      expect(storage.get('key2')).toBe('value2')

      storage.remove('key1')

      expect(storage.get('key1')).toBeNull()
      expect(storage.get('key2')).toBe('value2')
    })
  })
})
