'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/contact', label: 'Contact' },
]

export function AcademicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <nav className="academic-container" role="navigation" aria-label="Main navigation">
      <div className="flex items-center justify-between py-4">
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="academic-link academic-heading-5"
          aria-label="Dr. Sarah Mitchell - Home"
        >
          Dr. Sarah Mitchell
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`academic-link ${isActive ? 'academic-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="academic-button academic-button--ghost md:hidden"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? (
            <XIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div 
          id="mobile-navigation"
          className="md:hidden academic-card academic-card--elevated mt-2"
          role="menu"
        >
          <div className="academic-card__body">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block academic-link py-3 ${isActive ? 'academic-link--active' : ''}`}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
} 