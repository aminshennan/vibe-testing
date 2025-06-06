'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, pageview } from '@/lib/analytics'

// Google Analytics 4 Script Component
export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              allow_google_signals: true,
              allow_ad_personalization_signals: false,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  )
}

// Page tracking component
export function PageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize GA on first load
    initGA()
  }, [])

  useEffect(() => {
    // Track page views when route changes
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    pageview(url)
  }, [pathname, searchParams])

  return null
}

// Main Analytics Wrapper
export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === 'production'
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <>
      {isProduction && GA_MEASUREMENT_ID && (
        <>
          <GoogleAnalytics />
          <PageTracker />
        </>
      )}
      {children}
    </>
  )
} 
 