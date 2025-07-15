'use client'

import { ThemeToggle } from './ThemeToggle'

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
