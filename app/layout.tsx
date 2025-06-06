import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { PortfolioHeader } from "@/components/portfolio-header"
import { AnimationProvider } from "@/contexts/animation-context"
import { SearchProvider } from "@/contexts/search-context"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { PWARegistration } from '@/components/pwa-registration'
import { Toaster } from 'sonner'
import ErrorBoundary from '@/components/error-boundary'
import { AnalyticsWrapper } from '@/components/analytics-wrapper'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sarah-mitchell-psychology.vercel.app'),
  title: {
    default: 'Dr. Sarah Mitchell - Psychology Professor',
    template: '%s | Dr. Sarah Mitchell'
  },
  description: 'Academic portfolio of Dr. Sarah Mitchell, Professor of Psychology at UC Berkeley specializing in cognitive psychology, memory research, and educational neuroscience.',
  keywords: [
    'psychology professor',
    'cognitive psychology',
    'memory research',
    'educational neuroscience',
    'UC Berkeley',
    'Dr. Sarah Mitchell',
    'academic research',
    'psychology',
    'neuroscience',
    'education',
    'ADHD interventions',
    'learning technologies'
  ],
  authors: [{ name: 'Dr. Sarah Mitchell', url: 'https://sarah-mitchell-psychology.vercel.app' }],
  creator: 'Dr. Sarah Mitchell',
  publisher: 'University of California, Berkeley',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sarah-mitchell-psychology.vercel.app',
    title: 'Dr. Sarah Mitchell - Psychology Professor',
    description: 'Leading research in cognitive psychology and educational neuroscience at UC Berkeley',
    siteName: 'Dr. Sarah Mitchell - Academic Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Sarah Mitchell - Psychology Professor at UC Berkeley',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Sarah Mitchell - Psychology Professor',
    description: 'Leading research in cognitive psychology and educational neuroscience',
    creator: '@drsarahmitchell',
    images: ['/images/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
    yandex: 'yandex-verification-token',
  },
  alternates: {
    canonical: 'https://sarah-mitchell-psychology.vercel.app',
    languages: {
      'en-US': 'https://sarah-mitchell-psychology.vercel.app',
    },
  },
  category: 'education',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a8a' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' }
  ],
  colorScheme: 'light',
}

// Structured Data for Academic Profile
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Sarah Mitchell",
  "jobTitle": "Professor of Psychology",
  "affiliation": {
    "@type": "Organization",
    "name": "University of California, Berkeley",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Department of Psychology",
      "addressLocality": "Berkeley",
      "addressRegion": "CA",
      "postalCode": "94720",
      "addressCountry": "US"
    }
  },
  "worksFor": {
    "@type": "Organization",
    "name": "University of California, Berkeley"
  },
  "alumniOf": [
    {
      "@type": "Organization",
      "name": "Stanford University"
    },
    {
      "@type": "Organization", 
      "name": "University of California, San Diego"
    },
    {
      "@type": "Organization",
      "name": "Harvard University"
    }
  ],
  "knowsAbout": [
    "Cognitive Psychology",
    "Memory Research", 
    "Educational Neuroscience",
    "ADHD Interventions",
    "Learning Technologies"
  ],
  "url": "https://sarah-mitchell-psychology.vercel.app",
  "email": "s.mitchell@berkeley.edu",
  "sameAs": [
    "https://orcid.org/0000-0000-0000-0000",
    "https://scholar.google.com/citations?user=example",
    "https://www.researchgate.net/profile/example",
    "https://linkedin.com/in/example"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//scholar.google.com" />
        <link rel="dns-prefetch" href="//orcid.org" />
        <link rel="dns-prefetch" href="//researchgate.net" />
        
        {/* Security and Performance Meta Tags */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          img-src 'self' data: https: blob:;
          font-src 'self' https://fonts.gstatic.com;
          connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com;
          frame-src 'none';
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'none';
          upgrade-insecure-requests;
        " />
        
        {/* Academic/Professional Meta Tags */}
        <meta name="citation_author" content="Dr. Sarah Mitchell" />
        <meta name="citation_author_institution" content="University of California, Berkeley" />
        <meta name="DC.creator" content="Dr. Sarah Mitchell" />
        <meta name="DC.publisher" content="University of California, Berkeley" />
        <meta name="DC.type" content="Text.Homepage.Personal" />
        <meta name="DC.language" content="en-US" />
        
        {/* Enhanced Academic Meta Tags */}
        <meta name="citation_author_email" content="s.mitchell@berkeley.edu" />
        <meta name="citation_author_orcid" content="https://orcid.org/0000-0000-0000-0000" />
        <meta name="citation_institution" content="University of California, Berkeley" />
        <meta name="academic.field" content="Psychology" />
        <meta name="academic.discipline" content="Cognitive Psychology" />
        <meta name="academic.specialization" content="Memory Research, Educational Neuroscience" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-academic-slate-50 text-academic-slate-900">
        <AnalyticsWrapper>
          <ErrorBoundary>
            <PerformanceMonitor>
              <SearchProvider>
                <AnimationProvider>
                  <PortfolioHeader />
                  <main className="min-h-screen">
                    {children}
                  </main>
                  {/* PWA Registration and Features */}
                  <PWARegistration />
                  {/* Toast Notifications */}
                  <Toaster 
                    position="top-center"
                    richColors
                    closeButton
                    theme="light"
                  />
                </AnimationProvider>
              </SearchProvider>
            </PerformanceMonitor>
          </ErrorBoundary>
        </AnalyticsWrapper>
      </body>
    </html>
  )
}
