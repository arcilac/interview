import { Country } from '../../src/types/country'

export const mockCountries: Country[] = [
  {
    name: {
      common: 'United States',
      official: 'United States of America',
    },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331893745,
    flags: {
      png: 'https://flagcdn.com/w320/us.png',
      svg: 'https://flagcdn.com/us.svg',
    },
    cca3: 'USA',
  },
  {
    name: {
      common: 'Germany',
      official: 'Federal Republic of Germany',
    },
    capital: ['Berlin'],
    region: 'Europe',
    population: 83240525,
    flags: {
      png: 'https://flagcdn.com/w320/de.png',
      svg: 'https://flagcdn.com/de.svg',
    },
    cca3: 'DEU',
  },
  {
    name: {
      common: 'Japan',
      official: 'Japan',
    },
    capital: ['Tokyo'],
    region: 'Asia',
    population: 125836021,
    flags: {
      png: 'https://flagcdn.com/w320/jp.png',
      svg: 'https://flagcdn.com/jp.svg',
    },
    cca3: 'JPN',
  },
]