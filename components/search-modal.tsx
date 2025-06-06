"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  SearchIcon, 
  XIcon, 
  ClockIcon, 
  TrendingUpIcon,
  BookOpenIcon,
  FlaskConicalIcon,
  FileTextIcon,
  UserIcon,
  ArrowRightIcon,
  LoaderIcon
} from 'lucide-react'
import { useSearch } from '@/contexts/search-context'
import Link from 'next/link'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const {
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    popularQueries,
    performSearch,
    clearSearch,
    addToRecentSearches
  } = useSearch()

  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setInputValue('')
      clearSearch()
      setShowSuggestions(true)
    }
  }, [isOpen, clearSearch])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim()) {
        performSearch(inputValue)
        setShowSuggestions(false)
      } else {
        clearSearch()
        setShowSuggestions(true)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [inputValue, performSearch, clearSearch])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion)
    addToRecentSearches(suggestion)
    performSearch(suggestion)
    setShowSuggestions(false)
  }, [addToRecentSearches, performSearch])

  const handleResultClick = useCallback((query: string) => {
    addToRecentSearches(query)
    onClose()
  }, [addToRecentSearches, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'research':
        return <FlaskConicalIcon className="w-4 h-4" />
      case 'publication':
        return <FileTextIcon className="w-4 h-4" />
      case 'course':
        return <BookOpenIcon className="w-4 h-4" />
      case 'general':
        return <UserIcon className="w-4 h-4" />
      default:
        return <SearchIcon className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'research':
        return 'bg-primary-navy text-white'
      case 'publication':
        return 'bg-academic-green text-white'
      case 'course':
        return 'bg-accent-burgundy text-white'
      case 'general':
        return 'bg-academic-slate-600 text-white'
      default:
        return 'bg-academic-slate-400 text-white'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 bg-white/95 backdrop-blur-sm border-academic-slate-200">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <SearchIcon className="w-6 h-6 text-primary-navy" />
            <h2 className="text-xl font-semibold text-primary-navy font-serif">
              Search Portfolio
            </h2>
          </div>
        </DialogHeader>

        <div className="px-6">
          {/* Search Input */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-academic-slate-400" />
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search research, publications, courses..."
              className="pl-10 pr-10 h-12 text-lg border-academic-slate-200 focus:border-primary-navy focus:ring-primary-navy"
              autoFocus
            />
            {inputValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInputValue('')
                  clearSearch()
                  setShowSuggestions(true)
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8 hover:bg-academic-slate-100"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <LoaderIcon className="w-6 h-6 animate-spin text-primary-navy" />
                <span className="ml-2 text-academic-slate-600">Searching...</span>
              </motion.div>
            )}

            {/* Search Results */}
            {!isSearching && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <p className="text-sm text-academic-slate-600 mb-4">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                </p>
                
                {searchResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link 
                      href={result.url} 
                      onClick={() => handleResultClick(searchQuery)}
                      className="block p-4 rounded-lg border border-academic-slate-200 hover:border-primary-navy hover:shadow-md transition-all duration-200 bg-white"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getTypeColor(result.type)}`}>
                            {getTypeIcon(result.type)}
                            <span className="ml-1">{result.type}</span>
                          </Badge>
                          {result.relevanceScore && (
                            <Badge variant="outline" className="text-xs">
                              {result.relevanceScore}% match
                            </Badge>
                          )}
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-academic-slate-400 group-hover:text-primary-navy transition-colors" />
                      </div>
                      
                      <h3 className="font-medium text-primary-navy mb-1 group-hover:text-primary-navy/80">
                        {result.title}
                      </h3>
                      
                      <p className="text-sm text-academic-slate-600 mb-3 line-clamp-2">
                        &quot;{result.content.substring(0, 120)}...&quot;
                      </p>
                      
                      {result.highlights && result.highlights.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-academic-slate-500 italic">
                            ...{result.highlights[0]}...
                          </p>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {!isSearching && searchQuery && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <SearchIcon className="w-12 h-12 text-academic-slate-300 mx-auto mb-3" />
                <p className="text-academic-slate-600 mb-2">No results found for &quot;{searchQuery}&quot;</p>
                <p className="text-sm text-academic-slate-500">Try different keywords or browse our popular searches below</p>
              </motion.div>
            )}

            {/* Suggestions (when no search query) */}
            {!isSearching && showSuggestions && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ClockIcon className="w-4 h-4 text-academic-slate-500" />
                      <h3 className="text-sm font-medium text-academic-slate-700">Recent Searches</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(search)}
                          className="text-xs hover:bg-primary-navy hover:text-white transition-colors"
                        >
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Popular Queries */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUpIcon className="w-4 h-4 text-academic-slate-500" />
                    <h3 className="text-sm font-medium text-academic-slate-700">Popular Searches</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuggestionClick(query)}
                        className="justify-start text-xs text-academic-slate-600 hover:text-primary-navy hover:bg-primary-navy/5 transition-colors"
                      >
                        <SearchIcon className="w-3 h-3 mr-2" />
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-academic-slate-50 border-t border-academic-slate-200">
          <p className="text-xs text-academic-slate-500 text-center">
            Press <kbd className="px-1 py-0.5 bg-white border border-academic-slate-200 rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 