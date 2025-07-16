import z from 'zod'

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

export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
export const RegionSchema = z.enum(REGIONS)

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
})
export const CountriesResponseSchema = z.array(CountrySchema)
