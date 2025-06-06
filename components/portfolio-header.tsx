"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavItems, getPersonalInfo } from "@/lib/data"
import { SearchTrigger } from "@/components/search-trigger"

export function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navItems = getNavItems()
  const personalInfo = getPersonalInfo()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const sections = navItems.filter((item) => item.href.startsWith("#")).map((item) => item.href.substring(1))

      // Find the current section in view
      for (const section of sections.reverse()) {
        // Check from bottom to top
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            // If section is at or above 150px from viewport top
            setActiveSection(section)
            break
          }
        }
      }

      // If scrolled to top, set Home as active
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-navy text-white px-4 py-2 rounded-md z-[100] focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        aria-label="Main site header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-academic border-b border-academic-slate-200 py-3" 
            : "bg-white/90 backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Academic Name/Title */}
          <Link 
            href="/" 
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2 rounded-md"
            aria-label={`${personalInfo.name}, ${personalInfo.title} - Go to homepage`}
          >
            <div className="text-primary-navy font-serif font-bold text-xl lg:text-2xl relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              {personalInfo.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-navy transition-all duration-300 group-hover:w-full"></span>
            </div>
            <span className="text-academic-slate-700 text-sm ml-3 hidden sm:inline-block transition-all duration-300 group-hover:text-primary-navy font-sans">
              {personalInfo.title}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const isActive = item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium relative group transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2",
                    isActive 
                      ? "text-primary-navy bg-primary-navy/5" 
                      : "text-academic-slate-700 hover:text-primary-navy hover:bg-primary-navy/5",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Academic hover effect - subtle background */}
                  <span className="absolute inset-0 bg-primary-navy/0 rounded-md group-hover:bg-primary-navy/5 transition-all duration-300"></span>

                  {/* Academic active indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-navy transition-all duration-300 group-hover:w-3/4",
                      isActive && "w-3/4",
                    )}
                  ></span>
                </Link>
              )
            })}
            
            {/* Search Trigger */}
            <div className="ml-2">
              <SearchTrigger variant="header" size="sm" />
            </div>
          </nav>

          {/* Mobile Search and Menu */}
          <div className="md:hidden flex items-center gap-2">
            <SearchTrigger variant="mobile" size="sm" />
            
            <button
              className="text-academic-slate-700 hover:text-primary-navy transition-colors duration-300 relative overflow-hidden group p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="true"
            >
              <span className="relative z-10">
                {mobileMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </span>
              <span className="absolute inset-0 scale-0 rounded-md bg-primary-navy/10 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={cn(
            "fixed inset-0 bg-white/98 backdrop-blur-md z-40 flex flex-col pt-20 px-4 md:hidden transition-all duration-500",
            mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none",
          )}
          aria-label="Mobile navigation menu"
          role="dialog"
          aria-modal="true"
          aria-hidden={!mobileMenuOpen}
        >
          {/* Screen reader announcement for mobile menu */}
          <h2 className="sr-only">Navigation Menu</h2>
          <p className="sr-only">
            Use arrow keys to navigate, enter to select, or escape to close
          </p>
          
          <nav 
            className="flex flex-col space-y-2"
            role="navigation"
            aria-label="Mobile main navigation"
          >
            {navItems.map((item, index) => {
              const isActive = item.href === "/" ? activeSection === "" : activeSection === item.href.substring(1)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-4 text-lg font-medium border-b border-academic-slate-200 relative group transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-navy focus:ring-offset-2",
                    isActive 
                      ? "text-primary-navy bg-primary-navy/5 border-primary-navy/30" 
                      : "text-academic-slate-700 hover:text-primary-navy hover:bg-primary-navy/5 hover:pl-6",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.label} section and close menu`}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Academic mobile hover effect */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0 h-1/2 bg-primary-navy/20 transition-all duration-300 group-hover:w-1 rounded-r",
                      isActive && "w-1",
                    )}
                  ></span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu overlay click to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            role="button"
            tabIndex={mobileMenuOpen ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setMobileMenuOpen(false)
              }
            }}
          />
        </div>
      </header>
    </>
  )
}
