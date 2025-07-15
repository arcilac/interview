'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Region } from '../types/country'

const regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export const FilterDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (region: Region) => {
    onChange(region)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange(null)
    setIsOpen(false)
  }

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-button">
        <span>{value || 'Filter by Region'}</span>
        <ChevronDown
          className={`filter-dropdown-icon ${isOpen ? 'filter-dropdown-icon-open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-dropdown-content">
            {value && (
              <button type="button" onClick={handleClear} className="filter-dropdown-item">
                All Regions
              </button>
            )}
            {regions.map((region) => (
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
