import axios from 'axios'
import { type ZodType } from 'zod'

export const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// ONLY FOR GET CALLS: Generic helper to fetch and validate data against a Zod schema
export const apiGET = async <T>(config, schema: ZodType<T>): Promise<T> => {
  const { data } = await api.get(config.url, config)

  return schema.parse(data)
}

