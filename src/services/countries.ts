
import { useQuery } from '@tanstack/react-query'
import { CountriesResponseSchema, CountrySchema } from '../schema/countriesSchema'
import { type Country, type Region } from '../types/country'
import { api, apiGET } from './helpers/factoryCountries'
import { extractSingleCountry } from './helpers/extractSingleCountry'

// NOTE: Fetch a list of all countries with selected fields
async function getAllCountries(): Promise<Country[]> {
  const fields = [
    'capital',
    'cca2',
    'cca3',
    'currencies',
    'flags',
    'languages',
    'name',
    'population',
    'region',
    'subregion',
  ].join(',')

  const countries = await apiGET<Country[]>(
    { url: '/all', params: { fields } },
    CountriesResponseSchema,
  )
  return countries
}

// NOTE: Fetch details for a single country by its code
async function getCountryByCode(code: string): Promise<Country> {
  const fields = [
    'area',
    'borders',
    'capital',
    'cca2',
    'cca3',
    'currencies',
    'flags',
    'languages',
    'name',
    'population',
    'region',
    'subregion',
    'timezones',
    'tld',
  ].join(',')

  const { data } = await api.get(`/alpha/${code}`, {
    params: { fields },
  })

  // The API can return an array even for one country, therefore it should be normalized
  const countryData = Array.isArray(data) ? extractSingleCountry(data) : data

  // Validate the fetched object against the Zod schema
  const country = CountrySchema.parse(countryData)
  return country
}

// NOTE: Fetch multiple countries by their codes

async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  // Early return if no codes provided
  if (codes.length === 0) return []

  const fields = [
    'capital',
    'cca2', 
    'cca3',
    'currencies',
    'flags',
    'languages',
    'name',
    'population',
    'region',
    'subregion',
  ].join(',')

  const countries = await apiGET<Country[]>(
    { url: `/alpha?codes=${codes.join(',')}`, params: { fields } },
    CountriesResponseSchema,
  )
  
  return countries
}

export const useGetAllCountries = () =>
  useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountries,
    staleTime: 5 * 60 * 1000,
  })

export const useGetCountryByCode = (code: string) =>
  useQuery({
    queryKey: ['country', code],
    queryFn: () => getCountryByCode(code),
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  })

export const useGetCountriesByCodes = (codes: string[]) =>
  useQuery({
    queryKey: ['countries', 'codes', codes],
    queryFn: () => getCountriesByCodes(codes),
    enabled: Array.isArray(codes) && codes?.length > 0,
    staleTime: 5 * 60 * 1000,
  })
