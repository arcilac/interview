import { useQuery } from '@tanstack/react-query'
import { countriesService } from '../services/countries'
import { queryConfig } from '../lib/react-query'

// Base error handler
const handleError = (error: unknown, context: string) => {
  console.error(`${context}: API call failed`, error)

  if (error instanceof Error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
  }
  throw error
}

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      try {
        return await countriesService.getAllCountries()
      } catch (error) {
        handleError(error, 'useCountries')
      }
    },
    ...queryConfig.countries,
  })
}

export const useCountryByCode = (code: string) => {
  return useQuery({
    queryKey: ['country', code],
    queryFn: async () => {
      try {
        return await countriesService.getCountryByCode(code)
      } catch (error) {
        handleError(error, 'useCountryByCode')
      }
    },
    enabled: !!code,
    ...queryConfig.country,
  })
}

export const useCountriesByCodes = (codes: string[]) => {
  return useQuery({
    queryKey: ['countries', 'codes', codes],
    queryFn: async () => {
      try {
        return await countriesService.getCountriesByCodes(codes)
      } catch (error) {
        handleError(error, 'useCountriesByCodes')
      }
    },
    enabled: codes.length > 0,
    ...queryConfig.countriesByCodes,
  })
}
