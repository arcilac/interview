import {
  formatNumber,
  getNativeName,
  getCurrencies,
  getLanguages,
  getTopLevelDomain,
  getCapital,
} from '../countryUtils'
import { Country } from '../../types/country'

describe('countryUtils', () => {
  // NOTE: Define the base country for testing
  const baseCountry: Country = {
    name: {
      common: 'Testland',
      official: 'The Republic of Testland',
      nativeName: {
        tst: { official: 'Testlandia', common: 'Testlandia' },
        foo: { official: 'FooBar', common: 'FooBar' },
      },
    },
    tld: ['.tl'],
    cca3: 'TST',
    region: 'TestRegion',
    population: 1234567,
    flags: { png: 'flag.png', svg: 'flag.svg' },
    capital: ['Test City'],
  }

  it('formats numbers with commas', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
    expect(formatNumber(0)).toBe('0')
  })

  it('gets the first native name if present', () => {
    expect(getNativeName(baseCountry)).toBe('Testlandia')
  })

  it('falls back to common name if no nativeName', () => {
    const c = { ...baseCountry, name: { ...baseCountry.name, nativeName: undefined } }
    expect(getNativeName(c)).toBe('Testland')
  })

  it('returns joined currency names or N/A', () => {
    const c = {
      ...baseCountry,
      currencies: { USD: { name: 'Dollar', symbol: '$' }, EUR: { name: 'Euro' } },
    }
    expect(getCurrencies(c)).toBe('Dollar, Euro')
    const noCur = { ...baseCountry, currencies: undefined }
    expect(getCurrencies(noCur)).toBe('N/A')
  })

  it('returns joined languages or N/A', () => {
    const c = { ...baseCountry, languages: { en: 'English', fr: 'French' } }
    expect(getLanguages(c)).toBe('English, French')
    const noLang = { ...baseCountry, languages: undefined }
    expect(getLanguages(noLang)).toBe('N/A')
  })

  it('returns joined TLDs or N/A', () => {
    expect(getTopLevelDomain(baseCountry)).toBe('.tl')
    const noTld = { ...baseCountry, tld: undefined }
    expect(getTopLevelDomain(noTld)).toBe('N/A')
  })

  it('returns joined capitals or N/A', () => {
    expect(getCapital(baseCountry)).toBe('Test City')
    const noCap = { ...baseCountry, capital: undefined }
    expect(getCapital(noCap)).toBe('N/A')
  })
})
