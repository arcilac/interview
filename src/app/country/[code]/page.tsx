'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useGetCountryByCode, useGetCountriesByCodes } from '../../../services/countries'
import { Loading } from '../../../components/atoms/Loading'
import {
  formatNumber,
  getNativeName,
  getCurrencies,
  getLanguages,
  getTopLevelDomain,
  getCapital,
} from '../../../utils/countryUtils'

/**
 * Page component for displaying details about a single country.
 * - Fetches main country data and its border countries.
 * - Shows loading, error, and detail states.
 */
export default function CountryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const countryCode = params.code as string // NOTE: Cast to string for TS

  const { data: country, isLoading, error } = useGetCountryByCode(countryCode)
  const { data: borderCountries } = useGetCountriesByCodes(country?.borders || [])

  if (isLoading) {
    return (
      <div className="country-detail-loading-container">
        <div className="country-detail-loading-content">
          <Loading text={`Loading country details...`} />
        </div>
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="country-detail-error-container">
        <div className="country-detail-error-content">
          <div className="country-detail-error-inner">
            <div className="country-detail-error-card">
              <h2 className="country-detail-error-title">Country not found</h2>
              <p className="country-detail-error-message">
                We couldn't find information for country code: {countryCode}
              </p>
              <button onClick={() => router.push('/')} className="country-detail-error-button">
                Go back to countries
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Detail view: display flag, country info, and border countries
  return (
    <div className="country-detail-container">
      <div className="country-detail-content">
        <button onClick={() => router.back()} className="country-detail-back-button">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="country-detail-grid">
          {/* NOTE: Flag section: optimized with next/image */}
          <div className="country-detail-flag-section">
            <div className="country-detail-flag-container">
              {country.flags?.svg || country.flags?.png ? (
                <Image
                  src={country.flags.svg || country.flags.png}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  width={800}
                  height={600}
                  className="country-detail-flag-image"
                  priority
                />
              ) : (
                <div className="country-detail-flag-placeholder">
                  <span className="country-detail-flag-placeholder-text">No flag available</span>
                </div>
              )}
            </div>
          </div>

          {/* Info section: two-column layout for main details */}
          <div className="country-detail-info-section">
            <h1 className="country-detail-title">{country.name.common}</h1>

            <div className="country-detail-info-grid">
              {/* Left column for primary attributes */}
              <div className="country-detail-info-column">
                <Detail label="Native Name" value={getNativeName(country)} />
                <Detail label="Population" value={formatNumber(country.population || 0)} />
                <Detail label="Region" value={country.region} />
                <Detail label="Sub Region" value={country.subregion} />
                <Detail label="Capital" value={getCapital(country)} />
              </div>
              {/* Right column for secondary attributes */}
              <div className="country-detail-info-column">
                <Detail label="Top Level Domain" value={getTopLevelDomain(country)} />
                <Detail label="Currencies" value={getCurrencies(country)} />
                <Detail label="Languages" value={getLanguages(country)} />
              </div>
            </div>

            {/* Border countries section: conditional rendering if borders exist */}
            {Array.isArray(country.borders) && country.borders.length > 0 && (
              <div className="country-detail-border-section">
                <h3 className="country-detail-border-title">Border Countries:</h3>
                <div className="country-detail-border-buttons">
                  {borderCountries && borderCountries.length > 0 ? (
                    borderCountries.map((borderCountry) => (
                      <button
                        key={borderCountry.cca3}
                        onClick={() => router.push(`/country/${borderCountry.cca3}`)}
                        className="country-detail-border-button"
                      >
                        {borderCountry.name.common}
                      </button>
                    ))
                  ) : (
                    <p className="country-detail-border-loading">Loading border countries...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Reusable row component for displaying a label and its value
 */
function Detail({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="country-detail-info-row">
      <span className="country-detail-info-label">{label}: </span>
      <span className="country-detail-info-value">{value || 'N/A'}</span>
    </div>
  )
}
