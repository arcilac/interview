import { Suspense } from 'react'
import { Loading } from '../components/atoms/Loading'
import CountriesPageContent from '../components/organisms/CountriesPageContent'

/**
 * Home page component (Server Component):
 * - Wraps the client component in Suspense boundary
 * - Provides loading fallback for useSearchParams hydration
 * - Follows Next.js 13+ best practices for search params
 */
export default function HomePage() {
  return (
    <Suspense 
      fallback={
        <div className="page-container">
          <div className="page-content">
            <Loading text="Loading countries..." />
          </div>
        </div>
      }
    >
      <CountriesPageContent />
    </Suspense>
  )
}
