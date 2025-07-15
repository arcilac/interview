import Link from 'next/link'
import Image from 'next/image'
import type { Country } from '../types/country'
import { formatNumber } from '../utils'

export const CountryCard = ({ country }: { country: Country }) => {
  const capital = country.capital?.[0] || 'N/A'

  return (
    <Link href={`/country/${country.cca3}`} className="block group">
      <div className="country-card">
        <div className="country-card-flag">
          {country.flags?.svg || country.flags?.png ? (
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              width={400}
              height={160}
              className="country-card-flag-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority
            />
          ) : (
            <div className="country-card-flag-placeholder">
              <span className="text-gray-500">No flag</span>
            </div>
          )}
        </div>

        <div className="country-card-content">
          <h3 className="country-card-title">{country.name?.common || 'Unknown Country'}</h3>
          <div className="country-card-info">
            <div className="country-card-info-row">
              <span className="country-card-info-label">Population:</span>
              <span className="country-card-info-value">
                {country.population ? formatNumber(country.population) : 'N/A'}
              </span>
            </div>
            <div className="country-card-info-row">
              <span className="country-card-info-label">Region:</span>
              <span className="country-card-info-value">{country.region || 'N/A'}</span>
            </div>
            <div className="country-card-info-row">
              <span className="country-card-info-label">Capital:</span>
              <span className="country-card-info-value">{capital}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
