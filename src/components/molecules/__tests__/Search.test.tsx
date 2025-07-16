import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Search } from '../Search'

describe('Search', () => {
  // NOTE: Mock the onSearch function
  let mockOnSearch: jest.Mock

  beforeEach(() => {
    jest.useFakeTimers()
    mockOnSearch = jest.fn()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  // Basic rendering
  it('renders the input and search icon', () => {
    const { container } = render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    // Better way to find the search icon
    const searchIcon = container.querySelector('.search-icon svg')
    expect(searchIcon).toBeInTheDocument()
  })

  // Props: placeholder
  it('shows the custom placeholder', () => {
    render(<Search onSearch={mockOnSearch} placeholder="Type here..." />)
    expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
  })

  // Props: defaultValue
  it('shows the default value in the input', () => {
    render(<Search onSearch={mockOnSearch} defaultValue="foo" />)
    expect(screen.getByDisplayValue('foo')).toBeInTheDocument()
  })

  // Props: default placeholder
  it('uses default placeholder when none provided', () => {
    render(<Search onSearch={mockOnSearch} />)
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument()
  })

  // Debounce behavior: rapid changes
  it('cancels previous debounced calls when input changes quickly', () => {
    render(<Search onSearch={mockOnSearch} />)
    const input = screen.getByRole('textbox')

    // Rapid changes within debounce window
    fireEvent.change(input, { target: { value: 'a' } })
    jest.advanceTimersByTime(50)

    fireEvent.change(input, { target: { value: 'ab' } })
    jest.advanceTimersByTime(50)

    fireEvent.change(input, { target: { value: 'abc' } })
    jest.advanceTimersByTime(100)

    // Should only call once with the final value
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith('abc')
  })

  // Edge case: clearing input
  it('calls onSearch with empty string when input is cleared', () => {
    render(<Search onSearch={mockOnSearch} defaultValue="foo" />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '' } })
    jest.advanceTimersByTime(100)

    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  // Edge case: default value triggers onSearch
  it('calls onSearch with default value on mount', () => {
    render(<Search onSearch={mockOnSearch} defaultValue="initial" />)

    jest.advanceTimersByTime(100)
    expect(mockOnSearch).toHaveBeenCalledWith('initial')
  })

  // Edge case: empty default value
  it('calls onSearch with empty string when default value is empty', () => {
    render(<Search onSearch={mockOnSearch} defaultValue="" />)

    jest.advanceTimersByTime(100)
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  // Behavior: no default value
  it('calls onSearch with empty string when no default value provided', () => {
    render(<Search onSearch={mockOnSearch} />)

    jest.advanceTimersByTime(100)
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  // Input behavior: maintains controlled state
  it('updates input value when user types', () => {
    render(<Search onSearch={mockOnSearch} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })

  // Accessibility: input has proper type
  it('renders input with correct type attribute', () => {
    render(<Search onSearch={mockOnSearch} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
  })

  // Performance: debounce timing precision
  it('respects exact debounce timing', () => {
    render(<Search onSearch={mockOnSearch} />)
    const input = screen.getByRole('textbox')

    // Wait for initial mount call to complete
    jest.advanceTimersByTime(100)
    jest.clearAllMocks()

    fireEvent.change(input, { target: { value: 'test' } })

    // Should not call at 99ms
    jest.advanceTimersByTime(99)
    expect(mockOnSearch).not.toHaveBeenCalled()

    // Should call at 100ms
    jest.advanceTimersByTime(1)
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  // Cleanup: timer cleanup on unmount
  it('cleans up timer on unmount', () => {
    const { unmount } = render(<Search onSearch={mockOnSearch} />)
    const input = screen.getByRole('textbox')

    // Clear the initial call
    jest.clearAllMocks()

    fireEvent.change(input, { target: { value: 'test' } })
    unmount()

    // Should not call onSearch after unmount
    jest.advanceTimersByTime(100)
    expect(mockOnSearch).not.toHaveBeenCalled()
  })
})
