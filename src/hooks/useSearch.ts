import { useMemo } from 'react'
import Fuse from 'fuse.js'
import uniqBy from 'lodash/uniqBy'

// Custom hook to filter and search through a list of countries.
export const useSearch = ({ countries, query, region }) => {
  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'name.common', weight: 0.7 },
        { name: 'name.official', weight: 0.3 },
        { name: 'capital', weight: 0.2 },
        { name: 'region', weight: 0.1 },
        { name: 'subregion', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
      // Enhanced fuzzy finder options
      ignoreLocation: true,
      ignoreFieldNorm: true,
      includeMatches: true,
      findAllMatches: true,
      shouldSort: true,
    }

    return new Fuse(countries, options)
  }, [countries])

  const filteredCountries = useMemo(() => {
    let result = countries

    // Filter by region first
    if (region) {
      result = result.filter((country) => country.region === region)
    }

    // Then filter by search query with enhanced fuzzy search
    if (query.trim()) {
      if (region) {
        // If region is selected, search within filtered results
        const regionFilteredFuse = new Fuse(result, {
          keys: [
            { name: 'name.common', weight: 0.7 },
            { name: 'name.official', weight: 0.3 },
            { name: 'capital', weight: 0.2 },
          ],
          threshold: 0.4, // Slightly more permissive for regional searches
          includeScore: true,
          minMatchCharLength: 2,
          ignoreLocation: true,
          ignoreFieldNorm: true,
          includeMatches: true,
          findAllMatches: true,
          shouldSort: true,
        })

        const searchResults = regionFilteredFuse.search(query)
        result = searchResults.map((result) => result.item)
      } else {
        const searchResults = fuse.search(query)
        result = searchResults.map((result) => result.item)
      }
    }

    // Use lodash unique to remove any potential duplicates by country code
    result = uniqBy(result, 'cca3')

    return result
  }, [countries, query, region, fuse])

  return { filteredCountries }
}
