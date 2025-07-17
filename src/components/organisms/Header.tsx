'use client'

import { ThemeToggle } from '../atoms/ThemeToggle'

// Header component rendering the application title and theme switcher
export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Where in the world?</h1>
        <ThemeToggle />
      </div>
    </header>
  )
}
