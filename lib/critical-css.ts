/**
 * Critical CSS Management for Academic Portfolio
 * Extracts and inlines critical above-the-fold CSS for better performance
 */

export const CRITICAL_CSS = `
/* Critical Typography and Layout Styles */
.academic-heading-hero {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  color: rgb(30, 58, 138); /* primary-navy */
  letter-spacing: -0.025em;
}

.academic-heading-section {
  font-family: var(--font-playfair);
  font-size: clamp(1.875rem, 3vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
  color: rgb(30, 58, 138);
}

.academic-intro-text {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  line-height: 1.7;
  max-width: 65ch;
  color: rgb(71, 85, 105); /* academic-slate-700 */
}

/* Critical Container Styles */
.academic-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.academic-container-wide {
  max-width: 1400px;
}

.academic-container-narrow {
  max-width: 800px;
}

/* Above-the-fold Background */
.academic-bg-pattern {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: 0;
}

/* Critical Navigation Styles */
.portfolio-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(248, 250, 252, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgb(226, 232, 240);
}

/* Critical Button Styles */
.academic-button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgb(30, 58, 138);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.academic-button-primary:hover {
  background: rgb(29, 78, 216);
  transform: translateY(-1px);
}

/* Critical Card Styles */
.academic-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgb(226, 232, 240);
  border-radius: 0.75rem;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Critical Grid Styles */
.academic-grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.academic-grid-2-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.academic-grid-3-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .academic-grid-2-col,
  .academic-grid-3-col {
    grid-template-columns: 1fr;
  }
  
  .academic-container {
    padding: 0 0.75rem;
  }
}

/* Loading states for critical elements */
.academic-skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .academic-skeleton {
    animation: none;
    background: #f1f5f9;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`

/**
 * Extracts critical CSS for a specific route
 */
export function getCriticalCSS(route: string): string {
  const baseCritical = CRITICAL_CSS

  // Route-specific critical CSS
  const routeSpecific: Record<string, string> = {
    '/': `
      /* Homepage-specific critical styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      
      .hero-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: rgb(30, 58, 138);
        color: white;
        border-radius: 9999px;
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }
    `,
    
    '/research': `
      /* Research page critical styles */
      .research-filters {
        position: sticky;
        top: 5rem;
        z-index: 10;
        background: rgba(248, 250, 252, 0.95);
        backdrop-filter: blur(8px);
        padding: 1rem;
        border-radius: 0.75rem;
        margin-bottom: 2rem;
      }
      
      .research-card-enhanced {
        position: relative;
        transform: translateZ(0);
        will-change: transform;
      }
    `,
    
    '/publications': `
      /* Publications page critical styles */
      .publication-card {
        border-left: 4px solid rgb(34, 197, 94);
        padding-left: 1rem;
      }
      
      .citation-preview {
        font-family: monospace;
        font-size: 0.875rem;
        background: rgb(248, 250, 252);
        padding: 0.75rem;
        border-radius: 0.375rem;
        border: 1px solid rgb(226, 232, 240);
      }
    `,
    
    '/contact': `
      /* Contact page critical styles */
      .contact-form {
        max-width: 600px;
        margin: 0 auto;
      }
      
      .contact-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid rgb(203, 213, 225);
        border-radius: 0.5rem;
        font-size: 1rem;
        transition: border-color 0.2s ease;
      }
      
      .contact-input:focus {
        outline: none;
        border-color: rgb(30, 58, 138);
        box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
      }
    `
  }

  return baseCritical + (routeSpecific[route] || '')
}

/**
 * Generates inline critical CSS for a page
 */
export function generateInlineCriticalCSS(route: string): string {
  const criticalCSS = getCriticalCSS(route)
  
  // Minify the CSS (basic minification)
  return criticalCSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/;\s*}/g, '}') // Remove trailing semicolons
    .replace(/:\s+/g, ':') // Remove space after colons
    .replace(/,\s+/g, ',') // Remove space after commas
    .trim()
}

/**
 * Critical CSS injection utility for Next.js
 */
export function getCriticalCSSStyles(route: string): { __html: string } {
  const criticalCSS = generateInlineCriticalCSS(route)
  
  return {
    __html: criticalCSS
  }
}

/**
 * Preload important fonts and assets
 */
export function getResourcePreloads(): Array<{ 
  href: string
  as: string
  type?: string
  crossOrigin?: string
}> {
  return [
    {
      href: '/fonts/inter-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    },
    {
      href: '/fonts/playfair-display-var.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous'
    },
    {
      href: '/images/hero-background.webp',
      as: 'image',
      type: 'image/webp'
    }
  ]
}

/**
 * Performance optimization headers
 */
export function getPerformanceHeaders() {
  return {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    'X-DNS-Prefetch-Control': 'on',
    'Vary': 'Accept-Encoding'
  }
} 
 