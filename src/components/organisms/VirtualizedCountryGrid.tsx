import { useState, useEffect, useCallback, useMemo } from 'react'
import { CountryCard } from '../molecules/CountryCard'

// NOTE:Hook to manage virtualization (incremental loading) of a long list

const useVirtualization = (totalItems: number, initialVisible = 20) => {
  const [visibleItems, setVisibleItems] = useState(initialVisible)
  const [isLoading, setIsLoading] = useState(false)

  //Increase visible items by a batch size, up to totalItems

  const loadMore = useCallback(() => {
    if (isLoading || visibleItems >= totalItems) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 20, totalItems))
      setIsLoading(false)
    }, 100) // simulated network/loading delay
  }, [isLoading, visibleItems, totalItems])

  return { visibleItems, isLoading, loadMore }
}

// Virtualized grid component that progressively loads more CountryCards

export const VirtualizedCountryGrid = ({ countries }) => {
  const { visibleItems, isLoading, loadMore } = useVirtualization(countries.length)

  // Set up IntersectionObserver on "load-more-trigger" to auto-load more
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

  // Memoize the slice to avoid unnecessary renders
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
          style={{ animationDelay: `${(index % 20) * 30}ms` }} // staggered fade-in
        >
          <CountryCard country={country} />
        </div>
      ))}

      {/* Trigger element to load more when in viewport */}
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
