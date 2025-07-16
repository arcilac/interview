import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../../../store/themeSlice'
import { ThemeToggle } from '../ThemeToggle'

// NOTE: Helper to render the component with a Redux store
function renderWithStore(initialState = { theme: { isDarkMode: false } }) {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: initialState,
  })

  const renderResult = render(
    <Provider store={store}>
      <ThemeToggle />
    </Provider>,
  )

  return { store, ...renderResult }
}

describe('ThemeToggle', () => {
  // Renders without errors using default state
  it('renders without crashing', () => {
    renderWithStore()
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  // Displays correct text and icon when in light mode
  it('shows correct content when in light mode', () => {
    renderWithStore({ theme: { isDarkMode: false } })

    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  // Displays correct text and icon when in dark mode
  it('shows correct content when in dark mode', () => {
    renderWithStore({ theme: { isDarkMode: true } })

    expect(screen.getByText('Light Mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  // Clicking the toggle should switch from light to dark mode
  it('toggles from light to dark mode when clicked', () => {
    const { store } = renderWithStore({ theme: { isDarkMode: false } })
    const button = screen.getByRole('button')

    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(store.getState().theme.isDarkMode).toBe(false)

    fireEvent.click(button)

    expect(store.getState().theme.isDarkMode).toBe(true)
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  // Clicking the toggle should switch from dark to light mode
  it('toggles from dark to light mode when clicked', () => {
    const { store } = renderWithStore({ theme: { isDarkMode: true } })
    const button = screen.getByRole('button')

    expect(screen.getByText('Light Mode')).toBeInTheDocument()
    expect(store.getState().theme.isDarkMode).toBe(true)

    fireEvent.click(button)

    expect(store.getState().theme.isDarkMode).toBe(false)
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  // Ensures multiple clicks toggle the theme correctly
  it('handles multiple consecutive toggles correctly', () => {
    const { store } = renderWithStore({ theme: { isDarkMode: false } })
    const button = screen.getByRole('button')

    fireEvent.click(button) // light → dark
    expect(store.getState().theme.isDarkMode).toBe(true)
    expect(screen.getByText('Light Mode')).toBeInTheDocument()

    fireEvent.click(button) // dark → light
    expect(store.getState().theme.isDarkMode).toBe(false)
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()

    fireEvent.click(button) // light → dark again
    expect(store.getState().theme.isDarkMode).toBe(true)
    expect(screen.getByText('Light Mode')).toBeInTheDocument()
  })

  // Checks that required CSS utility classes are applied to the button
  it('has proper CSS classes applied', () => {
    renderWithStore()
    const button = screen.getByRole('button')

    expect(button).toHaveClass('theme-toggle')
    expect(button).toHaveClass('theme-toggle-active')
  })

  // Ensures default state is light mode when no state is provided
  it('defaults to light mode when no initial state provided', () => {
    renderWithStore()

    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })
})
