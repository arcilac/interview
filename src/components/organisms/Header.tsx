'use client'

import { ThemeToggle } from '../atoms/ThemeToggle'

// Header component rendering the application title and theme switcher
export const Header = () => {
  return (
    <header className="header">
      <div className="max-w-7xl mx-auto">
        <div className="header-content">
          <h1 className="header-title">Where in the world?</h1>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
