import { type Region } from '../types/country'
import { REGIONS } from '../schema/countriesSchema'

export const urlUtils = {
  // Update URL params without navigation
  updateSearchParams: (params: URLSearchParams, updates: Record<string, string | null>) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.trim()) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    return params
  },

  // Build URL with params
  buildUrl: (baseUrl: string, params: URLSearchParams) => {
    const paramString = params.toString()
    return paramString ? `${baseUrl}?${paramString}` : baseUrl
  },

  // Validate region parameter using the centralized REGIONS constant
  isValidRegion: (region: string | null): region is Region => {
    return region !== null && REGIONS.includes(region)
  },
}
