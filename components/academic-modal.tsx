'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { XIcon } from 'lucide-react'

interface AcademicModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  role?: 'dialog' | 'alertdialog'
  className?: string
}

export function AcademicModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  role = 'dialog',
  className = ''
}: AcademicModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const firstFocusableElement = useRef<HTMLElement | null>(null)
  const lastFocusableElement = useRef<HTMLElement | null>(null)

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
      
      // Focus the modal after a short delay to ensure it's rendered
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
          
          // Set up focusable elements
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          
          if (focusableElements.length > 0) {
            firstFocusableElement.current = focusableElements[0] as HTMLElement
            lastFocusableElement.current = focusableElements[focusableElements.length - 1] as HTMLElement
          }
        }
      }, 10)
    } else {
      // Restore previous focus and scrolling
      document.body.style.overflow = ''
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard event handling
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key === 'Tab') {
      // Tab trapping
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement.current) {
          event.preventDefault()
          lastFocusableElement.current?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement.current) {
          event.preventDefault()
          firstFocusableElement.current?.focus()
        }
      }
    }
  }

  // Click outside to close
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        role={role}
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`
          relative academic-card academic-card--elevated
          ${sizeClasses[size]} w-full mx-4
          max-h-[90vh] overflow-hidden
          ${className}
        `}
      >
        {/* Header */}
        <header className="academic-card__header flex items-center justify-between">
          <h2 
            id="modal-title"
            className="academic-heading-4"
          >
            {title}
          </h2>
          
          <button
            type="button"
            onClick={onClose}
            className="academic-button academic-button--ghost academic-touch-target"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        {/* Body */}
        <div 
          id="modal-description"
          className="academic-card__body overflow-y-auto"
        >
          {children}
        </div>
      </div>

      {/* Announcements for screen readers */}
      <div
        className="academic-live-region"
        aria-live="polite"
        aria-atomic="true"
      >
        {isOpen ? `${title} dialog opened` : ''}
      </div>
    </div>
  )
}

// Hook for modal management
export function useAcademicModal() {
  const handleEscape = (callback: () => void) => {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          callback()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [callback])
  }

  return { handleEscape }
} 