"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import Fuse from 'fuse.js'
import { getResearchData } from '@/lib/research-data'
import { getAllPublications } from '@/lib/publications-data'
import { getPortfolioData } from '@/lib/data'

interface SearchResult {
  id: string
  title: string
  content: string
  type: 'research' | 'publication' | 'course' | 'general'
  url: string
  relevanceScore?: number
  highlights?: string[]
}

interface SearchContextType {
  searchQuery: string
  searchResults: SearchResult[]
  isSearching: boolean
  recentSearches: string[]
  popularQueries: string[]
  performSearch: (query: string) => void
  clearSearch: () => void
  addToRecentSearches: (query: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Popular query suggestions based on content
  const popularQueries = [
    'memory formation',
    'cognitive psychology',
    'ADHD interventions',
    'educational neuroscience',
    'working memory',
    'research methods',
    'psychology courses',
    'publications',
    'office hours'
  ]

  // Prepare searchable content
  const prepareSearchableContent = useCallback((): SearchResult[] => {
    const researchData = getResearchData()
    const publications = getAllPublications()
    const portfolioData = getPortfolioData()
    
    const searchableItems: SearchResult[] = []

    // Add research projects
    const allProjects = [
      ...researchData.researchProjects.active,
      ...researchData.researchProjects.completed,
      ...researchData.researchProjects.planned
    ]

    allProjects.forEach((project: any) => {
      searchableItems.push({
        id: project.id,
        title: project.title,
        content: `${project.description} ${project.keywords?.join(' ') || ''}`,
        type: 'research',
        url: `/research/${project.id}`
      })
    })

    // Add publications
    publications.forEach((pub: any) => {
      searchableItems.push({
        id: pub.id,
        title: pub.title,
        content: `${pub.abstract || ''} ${pub.keywords?.join(' ') || ''} ${pub.authors?.join(' ') || ''}`,
        type: 'publication',
        url: `/publications/${pub.id}`
      })
    })

    // Add teaching content (courses)
    const courses = [
      {
        id: 'psy-101',
        title: 'PSY 101: Introduction to Psychology',
        content: 'Comprehensive overview of psychological principles, research methods, and major areas of study including cognition, personality, social psychology, and mental health.',
        type: 'course' as const,
        url: '/teaching#psy-101'
      },
      {
        id: 'psy-301',
        title: 'PSY 301: Cognitive Psychology',
        content: 'Advanced study of mental processes including attention, memory, language, problem-solving, and decision-making. Emphasis on current research and experimental methods.',
        type: 'course' as const,
        url: '/teaching#psy-301'
      },
      {
        id: 'psy-350',
        title: 'PSY 350: Research Methods in Psychology',
        content: 'Comprehensive training in psychological research design, statistical analysis, and scientific writing. Students conduct original research projects.',
        type: 'course' as const,
        url: '/teaching#psy-350'
      },
      {
        id: 'psy-710',
        title: 'PSY 710: Advanced Cognitive Neuroscience',
        content: 'Graduate seminar exploring cutting-edge research in cognitive neuroscience, neuroimaging methods, and computational approaches to understanding the mind.',
        type: 'course' as const,
        url: '/teaching#psy-710'
      }
    ]

    searchableItems.push(...courses)

    // Add general content
    const generalContent = [
      {
        id: 'office-hours',
        title: 'Office Hours',
        content: 'Tuesday Thursday 2:00 PM 4:00 PM Friday 1:00 PM 2:00 PM appointment virtual office hours Wednesday',
        type: 'general' as const,
        url: '/teaching#office-hours'
      },
      {
        id: 'contact',
        title: 'Contact Information',
        content: 'email phone berkeley office hours appointment scheduling collaboration',
        type: 'general' as const,
        url: '/contact'
      },
      {
        id: 'cv',
        title: 'Curriculum Vitae',
        content: 'education awards grants publications teaching experience professional service',
        type: 'general' as const,
        url: '/cv'
      }
    ]

    searchableItems.push(...generalContent)

    return searchableItems
  }, [])

  const performSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Simulate search delay for UX
    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      const searchableContent = prepareSearchableContent()
      
      // Configure Fuse.js for fuzzy search
      const fuseOptions = {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'content', weight: 1 }
        ],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2
      }

      const fuse = new Fuse(searchableContent, fuseOptions)
      const results = fuse.search(query)

      // Process results to include highlights and relevance scores
      const processedResults: SearchResult[] = results.map((result) => ({
        ...result.item,
        relevanceScore: result.score ? Math.round((1 - result.score) * 100) : 0,
        highlights: result.matches?.map(match => 
          match.value?.substring(
            Math.max(0, (match.indices?.[0]?.[0] || 0) - 20),
            Math.min(match.value.length, (match.indices?.[0]?.[1] || 0) + 20)
          )
        ).filter((highlight): highlight is string => highlight !== undefined) || []
      }))

      setSearchResults(processedResults)
      setIsSearching(false)
    }, 300)
  }, [prepareSearchableContent])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
  }, [])

  const addToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return
    
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query)
      return [query, ...filtered].slice(0, 5) // Keep only 5 recent searches
    })
  }, [])

  const value: SearchContextType = {
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    popularQueries,
    performSearch,
    clearSearch,
    addToRecentSearches
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 