'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { ChevronDownIcon } from 'lucide-react'

interface AcademicDropdownProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
  disabled?: boolean
}

interface AcademicDropdownItemProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  role?: 'menuitem' | 'menuitemradio' | 'menuitemcheckbox'
  checked?: boolean
  className?: string
}

export function AcademicDropdown({
  trigger,
  children,
  align = 'left',
  className = '',
  disabled = false
}: AcademicDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLElement[]>([])

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  }

  // Collect menu items
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const items = Array.from(
        menuRef.current.querySelectorAll('[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]')
      ) as HTMLElement[]
      menuItemsRef.current = items
      
      // Focus first item when opened with keyboard
      if (items.length > 0 && focusedIndex === -1) {
        setFocusedIndex(0)
        items[0].focus()
      }
    }
  }, [isOpen, focusedIndex])

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleTriggerClick = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    setFocusedIndex(-1)
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault()
        setIsOpen(true)
        setFocusedIndex(0)
        break
      case 'ArrowUp':
        event.preventDefault()
        setIsOpen(true)
        setFocusedIndex(menuItemsRef.current.length - 1)
        break
      case 'Escape':
        if (isOpen) {
          event.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          triggerRef.current?.focus()
        }
        break
    }
  }

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => {
          const nextIndex = prev < menuItemsRef.current.length - 1 ? prev + 1 : 0
          menuItemsRef.current[nextIndex]?.focus()
          return nextIndex
        })
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : menuItemsRef.current.length - 1
          menuItemsRef.current[nextIndex]?.focus()
          return nextIndex
        })
        break
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        menuItemsRef.current[0]?.focus()
        break
      case 'End':
        event.preventDefault()
        const lastIndex = menuItemsRef.current.length - 1
        setFocusedIndex(lastIndex)
        menuItemsRef.current[lastIndex]?.focus()
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        triggerRef.current?.focus()
        break
      case 'Tab':
        // Allow tab to close dropdown and move to next element
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }

  return (
    <div 
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
    >
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        disabled={disabled}
        className={`
          academic-button academic-button--secondary 
          flex items-center gap-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {trigger}
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-labelledby="dropdown-trigger"
          onKeyDown={handleMenuKeyDown}
          className={`
            absolute top-full mt-1 z-50
            academic-card academic-card--elevated
            min-w-48 max-w-xs
            ${alignmentClasses[align]}
          `}
        >
          <div className="academic-card__body py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export function AcademicDropdownItem({
  children,
  onClick,
  href,
  disabled = false,
  role = 'menuitem',
  checked,
  className = ''
}: AcademicDropdownItemProps) {
  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const baseClasses = `
    w-full px-3 py-2 text-left text-sm
    flex items-center gap-2
    transition-colors duration-150
    ${disabled 
      ? 'text-academic-slate-400 cursor-not-allowed' 
      : 'text-academic-slate-700 hover:bg-academic-slate-50 focus:bg-academic-slate-50'
    }
    ${className}
  `

  if (href && !disabled) {
    return (
      <a
        href={href}
        role={role}
        aria-checked={role.includes('check') ? checked : undefined}
        onKeyDown={handleKeyDown}
        className={`${baseClasses} block no-underline`}
        tabIndex={-1}
      >
        {role === 'menuitemcheckbox' && (
          <span className="w-4 h-4 flex items-center justify-center">
            {checked ? '✓' : ''}
          </span>
        )}
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      role={role}
      aria-checked={role.includes('check') ? checked : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      tabIndex={-1}
      className={baseClasses}
    >
      {role === 'menuitemcheckbox' && (
        <span className="w-4 h-4 flex items-center justify-center">
          {checked ? '✓' : ''}
        </span>
      )}
      {children}
    </button>
  )
}

export function AcademicDropdownSeparator() {
  return (
    <div 
      role="separator"
      className="my-1 border-t border-academic-slate-200"
      aria-hidden="true"
    />
  )
} 