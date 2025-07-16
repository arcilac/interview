'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGetAllCountries } from '../../services/countries'
import { useSearch } from '../../hooks/useSearch'
import { urlUtils } from '../../utils/url'
import type { Region } from '../../types/country'
import { renderLoading, renderError, renderNoData, renderResults } from '../layout/PageSections'

/**
 * Countries page content component:
 * - Syncs UI state (search, region) with URL query params
 * - Fetches country data via useCountries hook
 * - Filters results via useSearch
 * - Renders appropriate UI based on loading/error states
 *
 * This component is wrapped in Suspense by the parent page component
 */
export default function CountriesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Local state for search input and region filter
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Fetch all countries, track loading/error
  const { data: countries, isLoading, error, refetch } = useGetAllCountries()

  // Derive filtered list based on current query and region
  const { filteredCountries } = useSearch({
    countries: countries || [],
    query: searchQuery,
    region: selectedRegion,
  })

  // Initialize searchQuery and selectedRegion from URL only once
  useEffect(() => {
    if (isInitialized) return

    const regionParam = searchParams.get('region')
    const searchParam = searchParams.get('search')

    // Validate region before setting
    if (urlUtils.isValidRegion(regionParam)) {
      setSelectedRegion(regionParam)
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    }

    setIsInitialized(true)
  }, [searchParams, isInitialized])

  // Update URL when user changes region filter
  const handleRegionChange = useCallback(
    (region: Region | null) => {
      if (selectedRegion === region) return
      setSelectedRegion(region)

      const params = new URLSearchParams(searchParams.toString())
      const updatedParams = urlUtils.updateSearchParams(params, {
        region,
        search: searchQuery || null,
      })

      const newUrl = urlUtils.buildUrl('/', updatedParams)
      const currentUrl = window.location.pathname + window.location.search

      if (newUrl !== currentUrl) {
        router.push(newUrl, { scroll: false })
      }
    },
    [selectedRegion, searchQuery, searchParams, router],
  )

  // Update URL when user types in search
  const handleSearchChange = useCallback(
    (query: string) => {
      if (searchQuery === query) return
      setSearchQuery(query)

      const params = new URLSearchParams(searchParams.toString())
      const updatedParams = urlUtils.updateSearchParams(params, {
        search: query,
        region: selectedRegion,
      })

      const newUrl = urlUtils.buildUrl('/', updatedParams)
      const currentUrl = window.location.pathname + window.location.search

      if (newUrl !== currentUrl) {
        router.push(newUrl, { scroll: false })
      }
    },
    [searchQuery, selectedRegion, searchParams, router],
  )

  // Render based on data state
  if (isLoading) return renderLoading()
  if (error) return renderError(error, refetch)
  if (!countries || countries.length === 0) return renderNoData()

  // Finally show the filter/search UI with results
  return renderResults({
    filteredCountries,
    searchQuery,
    selectedRegion,
    onSearch: handleSearchChange,
    onRegionChange: handleRegionChange,
  })
}
