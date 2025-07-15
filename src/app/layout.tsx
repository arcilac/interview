import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Nunito_Sans } from 'next/font/google'

import { QueryProvider } from '../components/QueryProvider'
import { ThemeProvider } from '../context/ThemeContext'
import { Header } from '../components/Header'
import './globals.css'

// Load Nunito Sans as a CSS variable
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
  variable: '--font-nunito-sans',
})

// Viewport for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Root layout wraps the entire app (Server Component by default)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body
        className={`${nunitoSans.className} antialiased bg-light-background dark:bg-dark-background`}
      >
        <QueryProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-light-background dark:bg-dark-background">
              <Header />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
