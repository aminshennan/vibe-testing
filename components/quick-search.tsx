"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon, TrendingUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SearchModal } from '@/components/search-modal'
import { useSearch } from '@/contexts/search-context'

interface QuickSearchProps {
  className?: string
  variant?: 'hero' | 'sidebar' | 'compact'
}

export function QuickSearch({ className = '', variant = 'hero' }: QuickSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { popularQueries } = useSearch()

  const handleQuickSearch = (_query: string) => {
    setIsOpen(true)
    // The search modal will handle the actual search
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full justify-start text-academic-slate-600 border-academic-slate-200 hover:border-primary-navy hover:text-primary-navy"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          Quick search...
        </Button>
        <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm border border-academic-slate-200 rounded-lg p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <SearchIcon className="w-5 h-5 text-primary-navy" />
          <h3 className="font-semibold text-primary-navy">Quick Search</h3>
        </div>

        <p className="text-sm text-academic-slate-600 mb-4">
          Find research, publications, courses, and more
        </p>

        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full justify-start mb-4 text-academic-slate-600 border-academic-slate-200 hover:border-primary-navy hover:text-primary-navy"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          Search portfolio...
          <kbd className="ml-auto px-1.5 py-0.5 text-xs bg-academic-slate-100 border border-academic-slate-200 rounded">
            ⌘K
          </kbd>
        </Button>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="w-3 h-3 text-academic-slate-500" />
            <span className="text-xs font-medium text-academic-slate-600">Popular searches</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {popularQueries.slice(0, 4).map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary-navy hover:text-white hover:border-primary-navy transition-colors"
                onClick={() => handleQuickSearch(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
} 