import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Loading } from '../Loading'

describe('Loading', () => {
  // Checks that the component renders with default props
  it('renders without crashing', () => {
    render(<Loading />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  // Verifies that a custom text is correctly rendered when passed as prop
  it('renders with custom text', () => {
    render(<Loading text="Please wait" />)
    expect(screen.getByText('Please wait')).toBeInTheDocument()
  })

  // Ensures custom className is applied in addition to base container class
  it('applies custom className to the container', () => {
    const { container } = render(<Loading className="my-custom-class" />)
    const loadingContainer = container.querySelector('.loading-container')
    expect(loadingContainer).toHaveClass('loading-container')
    expect(loadingContainer).toHaveClass('my-custom-class')
  })

  // Confirms that the spinner element is present and is an SVG
  it('renders the spinner icon', () => {
    const { container } = render(<Loading />)
    const spinner = container.querySelector('.loading-spinner')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toBeInstanceOf(SVGElement)
  })

  // Validates the overall structure of the component with expected class names
  it('has correct structure with loading-content wrapper', () => {
    const { container } = render(<Loading />)

    const loadingContainer = container.querySelector('.loading-container')
    const loadingContent = container.querySelector('.loading-content')
    const spinner = container.querySelector('.loading-spinner')
    const text = container.querySelector('.loading-text')

    expect(loadingContainer).toBeInTheDocument()
    expect(loadingContent).toBeInTheDocument()
    expect(spinner).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  // Tests that the component correctly renders when the text is an empty string
  it('handles empty text prop', () => {
    const { container } = render(<Loading text="" />)
    const textElement = container.querySelector('.loading-text')
    expect(textElement).toBeInTheDocument()
    expect(textElement).toHaveTextContent('')
  })

  // Verifies that long texts do not break the component layout
  it('handles long text without breaking layout', () => {
    const longText =
      'This is a very long loading message that should not break the component layout'
    render(<Loading text={longText} />)
    expect(screen.getByText(longText)).toBeInTheDocument()
  })

  // Basic accessibility check: ensures the loading text is visually and semantically present
  it('has proper accessibility attributes', () => {
    render(<Loading />)
    const text = screen.getByText('Loading...')
    expect(text).toHaveClass('loading-text')
  })
})
