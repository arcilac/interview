import { type Country } from '../types/country'

// Format a number using U.S. locale (e.g. 1,234,567)
export const formatNumber = (num: number): string => new Intl.NumberFormat('en-US').format(num)

// Get the first native name of the country, or fallback to common name
export const getNativeName = (country: Country): string => {
  const nativeNames = country.name.nativeName
  return nativeNames
    ? // Pick the first entry in the nativeName record
      Object.values(nativeNames)[0]?.common || country.name.common
    : country.name.common
}

// Join all currency names with commas, or "N/A" if none
export const getCurrencies = (country: Country): string =>
  country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(', ')
    : 'N/A'

// Join all languages with commas, or "N/A" if none
export const getLanguages = (country: Country): string =>
  country.languages ? Object.values(country.languages).join(', ') : 'N/A'

// Join all top-level domains, or "N/A" if absent
export const getTopLevelDomain = (country: Country): string => country.tld?.join(', ') || 'N/A'

// Join all capitals (usually one), or "N/A" if none
export const getCapital = (country: Country): string => country.capital?.join(', ') || 'N/A'
