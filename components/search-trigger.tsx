"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { SearchModal } from '@/components/search-modal'

interface SearchTriggerProps {
  variant?: 'default' | 'mobile' | 'header'
  size?: 'sm' | 'lg' | 'default'
  className?: string
}

export function SearchTrigger({ 
  variant = 'default', 
  size = 'default',
  className = '' 
}: SearchTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const getButtonContent = () => {
    switch (variant) {
      case 'mobile':
        return (
          <div className="flex items-center justify-center">
            <SearchIcon className="w-4 h-4" />
          </div>
        )
      case 'header':
        return (
          <div className="flex items-center gap-2 text-academic-slate-600">
            <SearchIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-xs bg-academic-slate-100 border border-academic-slate-200 rounded">
              ⌘K
            </kbd>
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-2">
            <SearchIcon className="w-4 h-4" />
            <span>Search Portfolio</span>
          </div>
        )
    }
  }

  const getButtonStyles = () => {
    const baseStyles = "transition-all duration-200"
    
    switch (variant) {
      case 'mobile':
        return `${baseStyles} p-2 h-10 w-10 rounded-lg hover:bg-academic-slate-100 ${className}`
      case 'header':
        return `${baseStyles} justify-start h-10 px-3 bg-white/80 border border-academic-slate-200 hover:border-primary-navy hover:bg-white hover:shadow-sm backdrop-blur-sm ${className}`
      default:
        return `${baseStyles} ${className}`
    }
  }

  // Convert size prop to valid Button size
  const buttonSize = size === 'default' ? undefined : size

  return (
    <>
      <Button
        variant={variant === 'header' ? 'outline' : 'ghost'}
        size={buttonSize}
        onClick={() => setIsOpen(true)}
        className={getButtonStyles()}
        aria-label="Open search"
      >
        {getButtonContent()}
      </Button>

      <SearchModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
} 