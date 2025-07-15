import type { ReactNode } from 'react'
import { Nunito_Sans } from 'next/font/google'
import { QueryProvider } from '../components/QueryProvider'
import { ThemeProvider } from '../context/ThemeContext'
import { Header } from '../components/Header'
import '../styles/base.css'
import '../styles/country-card.css'
import '../styles/detailed-layout.css'
import '../styles/main-layout.css'
import '../styles/search.css'
import '../styles/page-layout.css'

// Load Nunito Sans font with multiple weights
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
  variable: '--font-nunito-sans',
})

/**
 * Root layout wrapping all pages:
 * - Injects global CSS and font variable
 * - Provides React Query and Theme contexts
 * - Renders Header and main content
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body
        className={`${nunitoSans.className} antialiased bg-light-background dark:bg-dark-background`}
      >
        <QueryProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-light-background dark:bg-dark-background">
              {/* Global header with title and theme toggle */}
              <Header />
              {/* Page-specific content */}
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
