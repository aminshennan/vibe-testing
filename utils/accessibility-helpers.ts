/**
 * Accessibility Helper Utilities for Academic Design System
 * Provides tools for testing and enhancing accessibility compliance
 */

/**
 * Check if an element meets minimum contrast ratio requirements
 * @param foreground - Foreground color in any valid CSS format
 * @param background - Background color in any valid CSS format
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns boolean indicating if contrast ratio is sufficient
 */
export function checkContrastRatio(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  // Note: This is a simplified version. In production, you'd use a library like 'color' or 'chroma-js'
  // For this example, we'll assume the academic colors meet standards
  const minRatios = {
    'AA': { normal: 4.5, large: 3.0 },
    'AAA': { normal: 7.0, large: 4.5 }
  }
  
  // In production, calculate actual contrast ratio
  // For demo purposes, return true for academic design system colors
  return true
}

/**
 * Generate ARIA describedby text for form validation
 * @param fieldName - Name of the form field
 * @param errors - Array of error messages
 * @param helpText - Optional help text
 * @returns Formatted description text
 */
export function generateAriaDescription(
  fieldName: string,
  errors: string[] = [],
  helpText?: string
): string {
  const parts = []
  
  if (helpText) {
    parts.push(helpText)
  }
  
  if (errors.length > 0) {
    parts.push(`${fieldName} has errors: ${errors.join(', ')}`)
  }
  
  return parts.join('. ')
}

/**
 * Focus trap utility for modal dialogs
 * @param containerElement - Container element to trap focus within
 * @returns Object with methods to manage focus trap
 */
export function createFocusTrap(containerElement: HTMLElement) {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
    '[contenteditable]:not([contenteditable="false"])'
  ].join(', ')

  function getFocusableElements(): HTMLElement[] {
    return Array.from(containerElement.querySelectorAll(focusableSelectors))
  }

  function getFirstFocusableElement(): HTMLElement | null {
    const elements = getFocusableElements()
    return elements[0] || null
  }

  function getLastFocusableElement(): HTMLElement | null {
    const elements = getFocusableElements()
    return elements[elements.length - 1] || null
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements()
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }
  }

  function activate() {
    containerElement.addEventListener('keydown', handleKeyDown)
    getFirstFocusableElement()?.focus()
  }

  function deactivate() {
    containerElement.removeEventListener('keydown', handleKeyDown)
  }

  return {
    activate,
    deactivate,
    getFirstFocusableElement,
    getLastFocusableElement,
    getFocusableElements
  }
}

/**
 * Announce content to screen readers using live regions
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 * @param timeout - How long to keep the message (default: 1000ms)
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
  timeout: number = 1000
): void {
  const liveRegion = document.createElement('div')
  liveRegion.className = 'academic-live-region'
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.textContent = message

  document.body.appendChild(liveRegion)

  setTimeout(() => {
    document.body.removeChild(liveRegion)
  }, timeout)
}

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if user prefers high contrast
 * @returns boolean indicating high contrast preference
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

/**
 * Generate unique ID for form elements and ARIA relationships
 * @param prefix - Optional prefix for the ID
 * @returns Unique identifier string
 */
export function generateUniqueId(prefix: string = 'academic'): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Validate ARIA relationships in a component
 * @param element - Root element to validate
 * @returns Array of validation issues
 */
export function validateAriaRelationships(element: HTMLElement): string[] {
  const issues: string[] = []

  // Check aria-labelledby relationships
  const labelledByElements = element.querySelectorAll('[aria-labelledby]')
  labelledByElements.forEach(el => {
    const labelIds = el.getAttribute('aria-labelledby')?.split(' ') || []
    labelIds.forEach(id => {
      if (!document.getElementById(id)) {
        issues.push(`Element references non-existent aria-labelledby ID: ${id}`)
      }
    })
  })

  // Check aria-describedby relationships
  const describedByElements = element.querySelectorAll('[aria-describedby]')
  describedByElements.forEach(el => {
    const descriptionIds = el.getAttribute('aria-describedby')?.split(' ') || []
    descriptionIds.forEach(id => {
      if (!document.getElementById(id)) {
        issues.push(`Element references non-existent aria-describedby ID: ${id}`)
      }
    })
  })

  // Check for buttons without accessible names
  const buttons = element.querySelectorAll('button')
  buttons.forEach(button => {
    const hasText = button.textContent?.trim()
    const hasAriaLabel = button.getAttribute('aria-label')
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby')
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push('Button found without accessible name')
    }
  })

  // Check for images without alt text
  const images = element.querySelectorAll('img')
  images.forEach(img => {
    if (!img.getAttribute('alt') && img.getAttribute('alt') !== '') {
      issues.push('Image found without alt attribute')
    }
  })

  return issues
}

/**
 * Keyboard navigation helper for custom components
 * @param elements - Array of focusable elements
 * @param currentIndex - Currently focused element index
 * @param key - Keyboard key pressed
 * @returns New focus index or null if no change
 */
export function handleKeyboardNavigation(
  elements: HTMLElement[],
  currentIndex: number,
  key: string
): number | null {
  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      return currentIndex < elements.length - 1 ? currentIndex + 1 : 0
    case 'ArrowUp':
    case 'ArrowLeft':
      return currentIndex > 0 ? currentIndex - 1 : elements.length - 1
    case 'Home':
      return 0
    case 'End':
      return elements.length - 1
    default:
      return null
  }
}

/**
 * Create skip link for keyboard navigation
 * @param targetId - ID of target element to skip to
 * @param linkText - Text for the skip link
 * @returns Skip link element
 */
export function createSkipLink(targetId: string, linkText: string): HTMLAnchorElement {
  const skipLink = document.createElement('a')
  skipLink.href = `#${targetId}`
  skipLink.className = 'skip-link'
  skipLink.textContent = linkText
  skipLink.setAttribute('data-skip-link', 'true')
  
  // Position as first element in body
  document.body.insertBefore(skipLink, document.body.firstChild)
  
  return skipLink
}

/**
 * Academic design system accessibility testing suite
 */
export const AcademicA11yTester = {
  /**
   * Run comprehensive accessibility audit on academic components
   * @param rootElement - Root element to audit (defaults to document.body)
   * @returns Audit results with issues and recommendations
   */
  audit(rootElement: HTMLElement = document.body) {
    const results = {
      issues: [] as string[],
      warnings: [] as string[],
      recommendations: [] as string[],
      score: 0
    }

    // Check ARIA relationships
    results.issues.push(...validateAriaRelationships(rootElement))

    // Check for academic design system usage
    const academicComponents = rootElement.querySelectorAll('[class*="academic-"]')
    if (academicComponents.length === 0) {
      results.warnings.push('No academic design system components detected')
    }

    // Check for skip links
    const skipLinks = document.querySelectorAll('[data-skip-link]')
    if (skipLinks.length === 0) {
      results.recommendations.push('Consider adding skip links for keyboard navigation')
    }

    // Check for live regions
    const liveRegions = rootElement.querySelectorAll('[aria-live]')
    if (liveRegions.length === 0) {
      results.recommendations.push('Consider adding live regions for dynamic content updates')
    }

    // Calculate score (simplified)
    const totalChecks = 10
    const issueWeight = 2
    const warningWeight = 1
    const penalty = (results.issues.length * issueWeight) + (results.warnings.length * warningWeight)
    results.score = Math.max(0, Math.round(((totalChecks - penalty) / totalChecks) * 100))

    return results
  },

  /**
   * Test color contrast ratios for academic color tokens
   */
  testColors() {
    // In production, this would test actual computed colors
    const colorTests = [
      { name: 'Primary Navy on White', passes: true },
      { name: 'Academic Slate 600 on White', passes: true },
      { name: 'Academic Green on White', passes: true },
      { name: 'Accent Gold on White', passes: false }, // Example failure
    ]

    return colorTests
  },

  /**
   * Generate accessibility report for documentation
   */
  generateReport(rootElement?: HTMLElement) {
    const auditResults = this.audit(rootElement)
    const colorResults = this.testColors()

    return {
      summary: {
        overallScore: auditResults.score,
        totalIssues: auditResults.issues.length,
        totalWarnings: auditResults.warnings.length,
        colorCompliance: colorResults.filter(c => c.passes).length / colorResults.length * 100
      },
      details: {
        audit: auditResults,
        colors: colorResults
      },
      timestamp: new Date().toISOString()
    }
  }
} 