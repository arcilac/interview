import { useState, useEffect, useCallback, useMemo } from 'react'
import { CountryCard } from './CountryCard'
import type { Country } from '../types/country'

const useVirtualization = (totalItems: number, initialVisible = 20) => {
  const [visibleItems, setVisibleItems] = useState(initialVisible)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(() => {
    if (isLoading || visibleItems >= totalItems) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 20, totalItems))
      setIsLoading(false)
    }, 100)
  }, [isLoading, visibleItems, totalItems])

  return { visibleItems, isLoading, loadMore }
}

interface Props {
  countries: Country[]
}

export const VirtualizedCountryGrid = ({ countries }: Props) => {
  const { visibleItems, isLoading, loadMore } = useVirtualization(countries.length)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 0.1 },
    )
    const trigger = document.getElementById('load-more-trigger')
    if (trigger) observer.observe(trigger)
    return () => observer.disconnect()
  }, [loadMore])

  const visibleCountries = useMemo(
    () => countries.slice(0, visibleItems),
    [countries, visibleItems],
  )

  return (
    <div className="results-grid">
      {visibleCountries.map((country, index) => (
        <div
          key={country.cca3}
          className="animate-fade-in"
          style={{ animationDelay: `${(index % 20) * 30}ms` }}
        >
          <CountryCard country={country} />
        </div>
      ))}

      {visibleItems < countries.length && (
        <div id="load-more-trigger" className="col-span-full flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span className="text-sm text-gray-500">Loading more...</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">
              {countries.length - visibleItems} more countries
            </span>
          )}
        </div>
      )}
    </div>
  )
}
