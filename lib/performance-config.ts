/**
 * Performance Configuration for Academic Portfolio
 * Centralized performance settings and optimizations
 */

export const PERFORMANCE_CONFIG = {
  // Image optimization settings
  images: {
    quality: 85, // Optimal balance between quality and size
    formats: ['webp', 'avif'] as const,
    sizes: {
      thumbnail: '(max-width: 320px) 280px, 320px',
      small: '(max-width: 640px) 280px, 320px',
      medium: '(max-width: 768px) 100vw, 50vw',
      large: '(max-width: 1024px) 100vw, 75vw',
      hero: '100vw',
    },
    placeholderQuality: 10,
    priority: {
      // Above-the-fold images that should be prioritized
      hero: true,
      featuredProjects: true,
      profileImage: true,
    },
  },

  // Animation performance settings
  animations: {
    reducedMotion: {
      respectUserPreference: true,
      fallbackDuration: 200, // Faster for reduced motion
    },
    intersectionObserver: {
      threshold: 0.1,
      rootMargin: '50px',
      freezeOnceVisible: true,
    },
    framerMotion: {
      // Optimize for performance
      layoutId: false, // Disable layout animations for better performance
      dragMomentum: false, // Disable momentum for drag gestures
      whileHover: {
        scale: 1.02, // Subtle scaling to avoid layout shifts
        transition: { duration: 0.2 },
      },
      whileTap: {
        scale: 0.98,
        transition: { duration: 0.1 },
      },
    },
  },

  // Lazy loading configuration
  lazyLoading: {
    images: {
      enabled: true,
      threshold: 0.1,
      rootMargin: '100px',
    },
    components: {
      enabled: true,
      timeout: 5000, // Max time to wait for component loading
    },
    content: {
      enabled: true,
      chunkSize: 10, // Number of items to load per chunk
    },
  },

  // Bundle optimization
  bundling: {
    splitChunks: true,
    vendorSeparation: true,
    treeshaking: {
      enabled: true,
      sideEffects: false,
    },
    compression: {
      gzip: true,
      brotli: true,
    },
  },

  // Caching strategies
  caching: {
    staticAssets: {
      maxAge: 31536000, // 1 year for static assets
      immutable: true,
    },
    apiResponses: {
      maxAge: 3600, // 1 hour for API responses
      staleWhileRevalidate: 86400, // 24 hours SWR
    },
    pages: {
      revalidate: 3600, // ISR every hour
    },
  },

  // Web Vitals thresholds
  webVitals: {
    thresholds: {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 },
      INP: { good: 200, poor: 500 },
    },
    monitoring: {
      enabled: true,
      sampleRate: 0.1, // Sample 10% of sessions
      reportingEndpoint: '/api/analytics/web-vitals',
    },
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    prefetch: [
      '/api/research',
      '/api/publications',
    ],
    preload: {
      fonts: [
        '/fonts/inter-var.woff2',
        '/fonts/playfair-display-var.woff2',
      ],
      criticalCSS: '/styles/critical.css',
    },
  },

  // Service Worker configuration
  serviceWorker: {
    enabled: true,
    cacheStrategy: 'networkFirst', // For academic content freshness
    offlinePagePath: '/offline',
    cacheableRoutes: [
      '/',
      '/research',
      '/publications',
      '/teaching',
      '/cv',
      '/contact',
    ],
    precacheAssets: [
      '/images/logo.svg',
      '/images/hero-bg.jpg',
      '/favicon.ico',
    ],
  },
} as const

// Performance monitoring utilities
export interface PerformanceMetrics {
  componentLoadTime: number
  bundleSize: number
  renderTime: number
  interactionDelay: number
  memoryUsage?: number
}

export class PerformanceTracker {
  private metrics: Map<string, PerformanceMetrics> = new Map()

  startTracking(componentName: string): () => void {
    const startTime = performance.now()
    const startMemory = (performance as any).memory?.usedJSHeapSize

    return () => {
      const endTime = performance.now()
      const endMemory = (performance as any).memory?.usedJSHeapSize

      this.metrics.set(componentName, {
        componentLoadTime: endTime - startTime,
        bundleSize: 0, // Will be filled by webpack
        renderTime: endTime - startTime,
        interactionDelay: 0, // Will be measured separately
        memoryUsage: endMemory - (startMemory || 0),
      })

      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Performance: ${componentName}`, this.metrics.get(componentName))
      }
    }
  }

  getMetrics(componentName?: string) {
    return componentName ? this.metrics.get(componentName) : this.metrics
  }

  clearMetrics() {
    this.metrics.clear()
  }
}

// Export singleton instance
export const performanceTracker = new PerformanceTracker()

// Utility functions
export function isSlowDevice(): boolean {
  // Detect slow devices based on hardware concurrency and memory
  const navigator = globalThis.navigator
  if (!navigator) return false

  const cores = navigator.hardwareConcurrency || 4
  const memory = (navigator as any).deviceMemory || 4

  return cores <= 2 || memory <= 2
}

export function shouldReduceAnimations(): boolean {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isSlowDevice()
}

export function getOptimalImageQuality(): number {
  if (isSlowDevice()) return 70
  return PERFORMANCE_CONFIG.images.quality
}

export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (typeof navigator === 'undefined') return 'medium'
  
  const connection = (navigator as any).connection
  if (!connection) return 'medium'

  const effectiveType = connection.effectiveType
  if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow'
  if (effectiveType === '3g') return 'medium'
  return 'fast'
}

// Academic-specific performance optimizations
export const ACADEMIC_PERFORMANCE_CONFIG = {
  research: {
    // Optimize research data loading
    dataChunking: {
      projectsPerPage: 9,
      publicationsPerPage: 10,
      collaboratorsPerPage: 12,
    },
    visualization: {
      // Reduce complexity for slow devices
      maxDataPoints: isSlowDevice() ? 50 : 100,
      animationDuration: isSlowDevice() ? 300 : 600,
    },
  },
  
  publications: {
    // PDF handling optimization
    pdfPreview: {
      enabled: !isSlowDevice(),
      thumbnailQuality: isSlowDevice() ? 50 : 80,
    },
    citations: {
      lazyLoad: true,
      batchSize: 5,
    },
  },

  contact: {
    // Form optimization
    validation: {
      debounceMs: 300,
      throttleSubmission: 1000,
    },
    fileUpload: {
      maxSize: isSlowDevice() ? 5 * 1024 * 1024 : 10 * 1024 * 1024, // 5MB or 10MB
      chunkSize: 64 * 1024, // 64KB chunks
    },
  },
} 
 