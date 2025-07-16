'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { type Region } from '../../types/country'
import { REGIONS } from '../../schema/countriesSchema'

// NOTE: Dropdown component allowing selection of a region filter

export const FilterDropdown = ({
  value,
  onChange,
}: {
  value: Region | null
  onChange: (region: Region | null) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Select a region and close
  const handleSelect = (region: Region) => {
    onChange(region)
    setIsOpen(false)
  }

  // Clear selection
  const handleClear = () => {
    onChange(null)
    setIsOpen(false)
  }

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-button">
        {/* Display selected region or placeholder */}
        <span>{value || 'Filter by Region'}</span>
        {/* Dropdown icon rotates when open */}
        <ChevronDown
          className={`filter-dropdown-icon ${isOpen ? 'filter-dropdown-icon-open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-dropdown-content">
            {/* Option to clear current filter */}
            {value && (
              <button type="button" onClick={handleClear} className="filter-dropdown-item">
                All Regions
              </button>
            )}
            {/* Render each region option using the centralized REGIONS constant */}
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region)}
                className={`filter-dropdown-item ${
                  value === region ? 'filter-dropdown-item-active' : ''
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
