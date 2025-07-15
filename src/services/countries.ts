import axios from 'axios'
import { CountriesResponseSchema, CountrySchema, type Country, type Region } from '../types/country'

// Create an Axios instance configured for the restcountries API
const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Helper function to make API calls and validate the response using Zod
const apiCall = async <T>(url: string, schema: any): Promise<T> => {
  try {
    const { data } = await api.get(url)
    return schema.parse(data) // Validate response with provided schema
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Resource not found')
    }
    throw error
  }
}

// Extract a single country from an array response
const getSingleCountry = (data: any[]): any => {
  if (data.length === 0) throw new Error('Country not found')
  return data[0]
}

// Create a minimal country object required for the frontend
const createMinimalCountry = (country: any): Country => ({
  name: country.name || { common: 'Unknown', official: 'Unknown' },
  cca3: country.cca3,
  cca2: country.cca2 || '',
  flags: country.flags || { svg: '', png: '', alt: '' },
  population: country.population || 0,
  region: country.region || 'Unknown',
  subregion: country.subregion || '',
  capital: country.capital || [],
  currencies: country.currencies || {},
  languages: country.languages || {},
  borders: country.borders || [],
  area: country.area || 0,
  timezones: country.timezones || [],
  tld: country.tld || [],
})

// Service with functions to fetch countries from the API
export const countriesService = {
  // Fetches all countries with selected fields
  async getAllCountries(): Promise<Country[]> {
    return apiCall(
      '/all?fields=name,population,region,capital,flags,cca3,cca2,currencies,languages,subregion',
      CountriesResponseSchema,
    )
  },

  // Gets a country by its code (e.g., "COL", "US", etc.)
  async getCountryByCode(code: string): Promise<Country> {
    try {
      const { data } = await api.get(
        `/alpha/${code}?fields=name,population,region,capital,flags,cca3,cca2,currencies,subregion,languages,borders,area,timezones,tld`,
      )

      // The API sometimes returns an array, even for a single country
      const countryData = Array.isArray(data) ? getSingleCountry(data) : data

      return CountrySchema.parse(countryData) // Validate with Zod
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error(`Country with code ${code} not found`)
      }
      throw error
    }
  },

  // Searches countries by name (e.g., "Colombia", "Canada")
  async searchCountries(name: string): Promise<Country[]> {
    return apiCall(
      `/name/${encodeURIComponent(name)}?fields=name,population,region,capital,flags,cca3`,
      CountriesResponseSchema,
    )
  },

  // Gets countries filtered by region (e.g., "Americas", "Europe")
  async getCountriesByRegion(region: Region): Promise<Country[]> {
    return apiCall(
      `/region/${region}?fields=name,population,region,capital,flags,cca3`,
      CountriesResponseSchema,
    )
  },

  // Fetches multiple countries using a list of codes (e.g., ['COL', 'ARG'])
  async getCountriesByCodes(codes: string[]): Promise<Country[]> {
    if (codes.length === 0) return []

    try {
      const { data } = await api.get(`/alpha?codes=${codes.join(',')}&fields=name,cca3,flags`)
      return Array.isArray(data)
        ? data.filter((country) => country?.cca3).map(createMinimalCountry)
        : []
    } catch (error) {
      return []
    }
  },
}
