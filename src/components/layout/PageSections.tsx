import { Search } from '../molecules/Search'
import { FilterDropdown } from '../molecules/FilterDropdown'
import { VirtualizedCountryGrid } from '../organisms/VirtualizedCountryGrid'
import { Loading } from '../atoms/Loading'

export function renderLoading() {
  return (
    <div className="page-container">
      <div className="page-content">
        <Loading text="Loading countries..." />
      </div>
    </div>
  )
}

export function renderError(error: unknown, refetch: () => void) {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="text-center">
          <div className="error-container">
            <h2 className="error-title">Error loading countries</h2>
            <p className="error-message">
              {error instanceof Error ? error.message : 'Please try again later.'}
            </p>
            <button onClick={refetch} className="btn-retry">
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function renderNoData() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="text-center">
          <h2 className="no-results-title">No countries available</h2>
          <p className="no-results-text">Unable to load countries data.</p>
        </div>
      </div>
    </div>
  )
}

export function renderResults({
  filteredCountries,
  searchQuery,
  selectedRegion,
  onSearch,
  onRegionChange,
}) {
  return (
    <div className="page-container">
      <div className="page-content-main">
        <div className="search-filter-container">
          <div className="search-wrapper">
            <Search
              placeholder="Search for a country..."
              onSearch={onSearch}
              defaultValue={searchQuery}
            />
          </div>
          <div className="filter-wrapper">
            <FilterDropdown value={selectedRegion} onChange={onRegionChange} />
          </div>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="no-results">
            <h2 className="no-results-title">No countries found</h2>
            <p className="no-results-text">Try adjusting your search terms or filter.</p>
          </div>
        ) : (
          <>
            <VirtualizedCountryGrid countries={filteredCountries} />
          </>
        )}
      </div>
    </div>
  )
}
