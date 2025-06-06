"use client"

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load heavy animation components
export const LazyResearchVisualization = dynamic(
  () => import('./research-visualization').then(mod => ({ default: mod.ResearchVisualization })),
  {
    loading: () => (
      <div className="w-full h-64 bg-academic-slate-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-academic-slate-600">Loading visualization...</div>
      </div>
    ),
    ssr: false // These are interactive components
  }
)

export const LazyAdvancedAnimations = dynamic(
  () => import('./advanced-animations').then(mod => ({ default: mod.PageTransition })),
  {
    loading: () => <div className="animate-pulse bg-academic-slate-100 rounded-lg h-32" />,
    ssr: false
  }
)

export const LazyMicroInteractions = dynamic(
  () => import('./advanced-animations/micro-interactions').then(mod => ({ default: mod.FloatingCard })),
  {
    loading: () => <div className="animate-pulse bg-academic-slate-100 rounded-lg h-20" />,
    ssr: false
  }
)

export const LazyResearchTimeline = dynamic(
  () => import('./research-visualization/research-timeline').then(mod => ({ default: mod.ResearchTimeline })),
  {
    loading: () => (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-academic-slate-100 rounded-lg h-24" />
        ))}
      </div>
    ),
    ssr: false
  }
)

export const LazyImpactMetrics = dynamic(
  () => import('./research-visualization/impact-metrics').then(mod => ({ default: mod.ImpactMetrics })),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-academic-slate-100 rounded-lg h-32" />
        ))}
      </div>
    ),
    ssr: false
  }
)

export const LazyResearchAreaMapping = dynamic(
  () => import('./research-visualization/research-area-mapping').then(mod => ({ default: mod.ResearchAreaMapping })),
  {
    loading: () => (
      <div className="space-y-4">
        <div className="animate-pulse bg-academic-slate-100 rounded-lg h-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-academic-slate-100 rounded-lg h-8" />
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
)

export const LazyEnhancedContactForm = dynamic(
  () => import('./enhanced-contact-form').then(mod => ({ default: mod.EnhancedContactForm })),
  {
    loading: () => (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-academic-slate-100 rounded-lg h-12" />
        ))}
      </div>
    ),
    ssr: true // Forms should be SSR for SEO
  }
)

export const LazySearchModal = dynamic(
  () => import('./search-modal').then(mod => ({ default: mod.SearchModal })),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-96 h-64 bg-white rounded-lg animate-pulse" />
      </div>
    ),
    ssr: false
  }
)

// Optimization utility for conditional loading
export function withConditionalLoad<T>(
  component: () => Promise<{ default: ComponentType<T> }>,
  _condition: () => boolean
) {
  return dynamic(component, {
    loading: () => <div className="animate-pulse bg-academic-slate-100 rounded h-8" />,
    ssr: false,
  })
}

// Performance monitoring for dynamic components
const componentLoadTimes: Record<string, number> = {}

export function trackComponentLoad(componentName: string) {
  const startTime = performance.now()
  
  return () => {
    const loadTime = performance.now() - startTime
    componentLoadTimes[componentName] = loadTime
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 ${componentName} loaded in ${loadTime.toFixed(2)}ms`)
    }
  }
}

export function getComponentLoadTimes() {
  return componentLoadTimes
} 
 