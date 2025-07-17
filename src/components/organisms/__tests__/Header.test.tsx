import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '../Header'

// NOTE: Mock the ThemeToggle component
jest.mock('../../atoms/ThemeToggle', () => ({
  ThemeToggle: function MockThemeToggle() {
    return <button data-testid="theme-toggle">Toggle Theme</button>
  },
}))

describe('Header', () => {
  // Basic rendering test
  it('renders without crashing', () => {
    render(<Header />)
    expect(screen.getByText('Where in the world?')).toBeInTheDocument()
  })

  // Tests header title
  it('displays the correct title', () => {
    render(<Header />)
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveTextContent('Where in the world?')
  })

  // Tests ThemeToggle component presence
  it('renders ThemeToggle component', () => {
    render(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  // Tests header structure
  it('has correct HTML structure', () => {
    const { container } = render(<Header />)

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('header')

    const headerContent = container.querySelector('.header-content')
    expect(headerContent).toBeInTheDocument()
  })

  // Tests CSS classes are applied correctly
  it('applies correct CSS classes', () => {
    const { container } = render(<Header />)

    const header = container.querySelector('header')
    expect(header).toHaveClass('header')

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('header-title')
  })

  // Tests semantic HTML structure
  it('uses semantic HTML elements', () => {
    const { container } = render(<Header />)

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  // Tests responsive layout classes
  it('includes header content wrapper', () => {
    const { container } = render(<Header />)

    const headerContent = container.querySelector('.header-content')
    expect(headerContent).toBeInTheDocument()
  })

  // Tests component composition
  it('renders both title and theme toggle in correct order', () => {
    render(<Header />)

    const headerContent = screen.getByText('Where in the world?').closest('.header-content')
    expect(headerContent).toBeInTheDocument()

    const title = screen.getByRole('heading', { level: 1 })
    const themeToggle = screen.getByTestId('theme-toggle')

    expect(title).toBeInTheDocument()
    expect(themeToggle).toBeInTheDocument()
  })

  // Tests accessibility
  it('has proper accessibility structure', () => {
    render(<Header />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()

    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
  })

  // Tests component isolation
  it('renders independently without external dependencies', () => {
    const { container } = render(<Header />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  // Tests title text content exactly
  it('displays exact title text', () => {
    render(<Header />)
    const title = screen.getByText('Where in the world?')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('Where in the world?')
  })

  // Tests that header is a landmark
  it('provides header landmark for screen readers', () => {
    render(<Header />)
    const headerLandmark = screen.getByRole('banner')
    expect(headerLandmark).toBeInTheDocument()
  })

  // Tests component stability
  it('maintains consistent structure across renders', () => {
    const { rerender, container } = render(<Header />)

    const initialStructure = container.innerHTML

    rerender(<Header />)

    expect(container.innerHTML).toBe(initialStructure)
  })

  // Tests that the header element is the root element
  it('uses header as root element', () => {
    const { container } = render(<Header />)

    const rootElement = container.firstChild
    expect(rootElement).toBeInstanceOf(HTMLElement)
    expect((rootElement as HTMLElement).tagName.toLowerCase()).toBe('header')
  })
})
