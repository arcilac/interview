import { z } from 'zod'

// Base schemas to avoid repetition
const NameSchema = z.object({
  official: z.string(),
  common: z.string(),
})

const NativeNameSchema = z.record(z.string(), NameSchema).optional()

const CurrencySchema = z.object({
  name: z.string(),
  symbol: z.string().optional(),
})

const FlagsSchema = z.object({
  png: z.string(),
  svg: z.string(),
  alt: z.string().optional(),
})

const DemonymSchema = z.object({
  f: z.string(),
  m: z.string(),
})

// Main country schema
export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: NativeNameSchema,
  }),
  tld: z.array(z.string()).optional(),
  cca2: z.string().optional(),
  ccn3: z.string().optional(),
  cca3: z.string(),
  currencies: z.record(z.string(), CurrencySchema).optional(),
  region: z.string(),
  subregion: z.string().optional(),
  languages: z.record(z.string(), z.string()).optional(),
  borders: z.array(z.string()).optional(),
  area: z.number().optional(),
  population: z.number(),
  flags: FlagsSchema,
  capital: z.array(z.string()).optional(),
  timezones: z.array(z.string()).optional(),
  demonyms: z.record(z.string(), DemonymSchema).optional(),
})

// Inferred types
export type Country = z.infer<typeof CountrySchema>

// Valid regions
export const RegionSchema = z.enum(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'])
export type Region = z.infer<typeof RegionSchema>

// API response schema (reuses CountrySchema)
export const CountriesResponseSchema = z.array(CountrySchema)
export type CountriesResponse = z.infer<typeof CountriesResponseSchema>
