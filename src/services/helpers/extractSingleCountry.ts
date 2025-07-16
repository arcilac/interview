// Normalize a single-country response when API returns an array
export const extractSingleCountry = <T>(data: T[]): T => {
  if (data.length === 0) throw new Error('Country not found')

  const [singleCountry] = data

  return singleCountry
}
