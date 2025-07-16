import { z } from 'zod'
import { CountrySchema, CountriesResponseSchema, RegionSchema } from '../schema/countriesSchema'

export type Region = z.infer<typeof RegionSchema>

export type CountriesResponse = z.infer<typeof CountriesResponseSchema>
export type Country = z.infer<typeof CountrySchema>