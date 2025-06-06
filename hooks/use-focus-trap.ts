import { useRef, useEffect } from 'react'

/**
 * Hook for managing focus trapping within a container
 * Essential for WCAG 2.1 AA compliance in modal dialogs and menus
 * 
 * @param isActive - Whether the focus trap should be active
 * @param options - Configuration options for the focus trap
 * @returns Ref to attach to the container element
 */
export function useFocusTrap(
  isActive: boolean, 
  options: {
    initialFocus?: boolean
    restoreFocus?: boolean
    escapeDeactivates?: boolean
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  const {
    initialFocus = true,
    restoreFocus = true,
    escapeDeactivates = true
  } = options

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current

    // Store the previously focused element
    if (restoreFocus) {
      previousActiveElementRef.current = document.activeElement as HTMLElement
    }

    // Get all focusable elements within the container
    const getFocusableElements = (): NodeListOf<HTMLElement> => {
      return container.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable="true"]'
      )
    }

    const focusableElements = getFocusableElements()

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element if initialFocus is enabled
    if (initialFocus) {
      // Small delay to ensure the container is properly rendered
      setTimeout(() => {
        firstElement?.focus()
      }, 0)
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      // Update focusable elements in case the DOM changed
      const currentFocusableElements = getFocusableElements()
      const currentFirstElement = currentFocusableElements[0]
      const currentLastElement = currentFocusableElements[currentFocusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab (backwards navigation)
        if (document.activeElement === currentFirstElement || !currentFirstElement) {
          event.preventDefault()
          currentLastElement?.focus()
        }
      } else {
        // Tab (forward navigation)
        if (document.activeElement === currentLastElement || !currentLastElement) {
          event.preventDefault()
          currentFirstElement?.focus()
        }
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (escapeDeactivates && event.key === 'Escape') {
        event.preventDefault()
        // Let the parent component handle the escape action
        // This hook focuses on focus management, not on closing logic
      }
    }

    // Prevent focus from leaving the container
    const handleFocusOut = (event: FocusEvent) => {
      const target = event.relatedTarget as HTMLElement

      // If focus is moving outside the container, redirect it back
      if (target && !container.contains(target)) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    // Add event listeners
    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)
    container.addEventListener('focusout', handleFocusOut)

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
      container.removeEventListener('focusout', handleFocusOut)

      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus()
      }
    }
  }, [isActive, initialFocus, restoreFocus, escapeDeactivates])

  return containerRef
}

/**
 * Hook for managing focus within a list of items (like navigation menus)
 * Provides arrow key navigation and home/end key support
 * 
 * @param isActive - Whether the focus management should be active
 * @param orientation - Direction of navigation ('vertical' | 'horizontal')
 * @returns Ref to attach to the container element
 */
export function useFocusableList(
  isActive: boolean,
  orientation: 'vertical' | 'horizontal' = 'vertical'
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current

    const getFocusableItems = (): HTMLElement[] => {
      const items = container.querySelectorAll(
        '[role="menuitem"], [role="option"], button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]):not([disabled])'
      )
      return Array.from(items) as HTMLElement[]
    }

    const handleArrowKeys = (event: KeyboardEvent) => {
      const items = getFocusableItems()
      if (items.length === 0) return

      const currentIndex = items.findIndex(item => item === document.activeElement)
      if (currentIndex === -1) return

      let nextIndex = currentIndex

      const isVertical = orientation === 'vertical'
      const forwardKey = isVertical ? 'ArrowDown' : 'ArrowRight'
      const backwardKey = isVertical ? 'ArrowUp' : 'ArrowLeft'

      switch (event.key) {
        case forwardKey:
          event.preventDefault()
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
          break
        case backwardKey:
          event.preventDefault()
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
          break
        case 'Home':
          event.preventDefault()
          nextIndex = 0
          break
        case 'End':
          event.preventDefault()
          nextIndex = items.length - 1
          break
        default:
          return
      }

      items[nextIndex]?.focus()
    }

    container.addEventListener('keydown', handleArrowKeys)

    return () => {
      container.removeEventListener('keydown', handleArrowKeys)
    }
  }, [isActive, orientation])

  return containerRef
}

/**
 * Hook for managing focus announcements to screen readers
 * Useful for dynamic content changes and status updates
 * 
 * @param message - Message to announce
 * @param priority - Priority level for the announcement
 */
export function useFocusAnnouncement(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  useEffect(() => {
    if (!message.trim()) return

    // Create a live region for the announcement
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message

    document.body.appendChild(liveRegion)

    // Remove the live region after the announcement
    const cleanup = setTimeout(() => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion)
      }
    }, 1000)

    return () => {
      clearTimeout(cleanup)
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion)
      }
    }
  }, [message, priority])
}

/**
 * Hook for managing roving tabindex pattern
 * Useful for widget grids, toolbars, and similar patterns
 * 
 * @param items - Array of item identifiers or refs
 * @param activeIndex - Currently active item index
 * @param onActiveIndexChange - Callback when active index changes
 */
export function useRovingTabindex<T extends HTMLElement>(
  items: React.RefObject<T>[],
  activeIndex: number,
  onActiveIndexChange: (index: number) => void
) {
  useEffect(() => {
    items.forEach((itemRef, index) => {
      if (itemRef.current) {
        itemRef.current.tabIndex = index === activeIndex ? 0 : -1
      }
    })
  }, [items, activeIndex])

  const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = items.length - 1
        break
      default:
        return
    }

    onActiveIndexChange(nextIndex)
    items[nextIndex]?.current?.focus()
  }

  return { handleKeyDown }
} 
 