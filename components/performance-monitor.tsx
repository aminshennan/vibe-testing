"use client"

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals'
import { trackWebVitals, pageview } from '@/lib/analytics'

interface WebVitalMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  id: string
}

interface PerformanceMonitorProps {
  children: React.ReactNode
}

export function PerformanceMonitor({ children }: PerformanceMonitorProps) {
  const pathname = usePathname()

  // Track page views
  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  // Performance monitoring setup
  const handleWebVitals = useCallback((metric: WebVitalMetric) => {
    // Track web vitals to analytics
    trackWebVitals(metric)

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚀 Web Vital: ${metric.name}`)
      console.log(`Value: ${metric.value}`)
      console.log(`Rating: ${metric.rating}`)
      console.log(`ID: ${metric.id}`)
      console.groupEnd()
    }

    // Performance alerts for poor metrics
    if (metric.rating === 'poor') {
      console.warn(`⚠️ Poor performance detected for ${metric.name}:`, {
        value: metric.value,
        threshold: getThreshold(metric.name),
        improvement: getImprovementSuggestion(metric.name)
      })
    }
  }, [])

  // Initialize web vitals tracking
  useEffect(() => {
    // Core Web Vitals
    onCLS(handleWebVitals)
    onLCP(handleWebVitals)
    onINP(handleWebVitals) // Interaction to Next Paint (replaces FID)
    
    // Additional metrics
    onFCP(handleWebVitals)
    onTTFB(handleWebVitals)
  }, [handleWebVitals])

  // Page-specific performance tracking
  useEffect(() => {
    const startTime = performance.now()

    const trackPagePerformance = () => {
      // Track time spent on page
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          const timeSpent = performance.now() - startTime
          
          // Track engagement time
          if (timeSpent > 1000) { // Only track if user spent more than 1 second
            trackWebVitals({
              name: 'Page_Engagement_Time',
              value: timeSpent,
              rating: timeSpent > 30000 ? 'good' : timeSpent > 10000 ? 'needs-improvement' : 'poor',
              id: `engagement-${pathname}-${Date.now()}`
            } as WebVitalMetric)
          }
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }

    // Wait for page to load before setting up tracking
    if (document.readyState === 'complete') {
      trackPagePerformance()
    } else {
      window.addEventListener('load', trackPagePerformance)
      return () => window.removeEventListener('load', trackPagePerformance)
    }
  }, [pathname])

  return <>{children}</>
}

// Helper functions for performance thresholds and suggestions
function getThreshold(metricName: string): number {
  switch (metricName) {
    case 'CLS':
      return 0.1
    case 'FID':
    case 'INP':
      return 100
    case 'LCP':
      return 2500
    case 'FCP':
      return 1800
    case 'TTFB':
      return 800
    default:
      return 0
  }
}

function getImprovementSuggestion(metricName: string): string {
  switch (metricName) {
    case 'CLS':
      return 'Ensure images and embeds have dimensions, avoid inserting content above existing content'
    case 'FID':
    case 'INP':
      return 'Break up long tasks, use web workers for heavy computations, reduce JavaScript execution time'
    case 'LCP':
      return 'Optimize images, improve server response times, remove render-blocking resources'
    case 'FCP':
      return 'Eliminate render-blocking resources, minify CSS and JavaScript, improve server response times'
    case 'TTFB':
      return 'Optimize server-side processing, use CDN, enable compression, improve database queries'
    default:
      return 'Check web.dev for performance optimization guidelines'
  }
}

// Development-only performance diagnostics
export function usePerformanceDiagnostics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`📊 Performance Measure: ${entry.name} took ${entry.duration.toFixed(2)}ms`)
        }
        
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.group('🌐 Navigation Timing')
          console.log(`DNS Lookup: ${(navEntry.domainLookupEnd - navEntry.domainLookupStart).toFixed(2)}ms`)
          console.log(`TCP Connection: ${(navEntry.connectEnd - navEntry.connectStart).toFixed(2)}ms`)
          console.log(`Request: ${(navEntry.responseStart - navEntry.requestStart).toFixed(2)}ms`)
          console.log(`Response: ${(navEntry.responseEnd - navEntry.responseStart).toFixed(2)}ms`)
          console.log(`DOM Processing: ${(navEntry.domComplete - navEntry.domContentLoadedEventStart).toFixed(2)}ms`)
          console.groupEnd()
        }
      })
    })

    observer.observe({ entryTypes: ['measure', 'navigation'] })

    return () => observer.disconnect()
  }, [])
}

// Custom performance mark utilities
export const performanceMark = {
  start: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`)
    }
  },
  
  end: (name: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
    }
  },
  
  // Academic-specific marks
  academic: {
    searchStart: () => performanceMark.start('academic-search'),
    searchEnd: () => performanceMark.end('academic-search'),
    
    filterStart: () => performanceMark.start('research-filter'),
    filterEnd: () => performanceMark.end('research-filter'),
    
    visualizationStart: () => performanceMark.start('data-visualization'),
    visualizationEnd: () => performanceMark.end('data-visualization'),
    
    formSubmissionStart: () => performanceMark.start('form-submission'),
    formSubmissionEnd: () => performanceMark.end('form-submission'),
  }
} 