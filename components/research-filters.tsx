"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  FilterIcon, 
  XIcon, 
  SlidersHorizontalIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  FlaskConicalIcon
} from 'lucide-react'

interface FilterOptions {
  status: string[]
  researchAreas: string[]
  fundingTypes: string[]
  collaborationStatus: string[]
  timePeriods: string[]
}

interface ActiveFilters {
  status: string
  researchArea: string
  fundingType: string
  collaborationStatus: string
  timePeriod: string
}

interface ResearchFiltersProps {
  onFiltersChange: (filters: ActiveFilters) => void
  className?: string
}

export function ResearchFilters({ onFiltersChange, className = '' }: ResearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    status: 'all',
    researchArea: 'all',
    fundingType: 'all',
    collaborationStatus: 'all',
    timePeriod: 'all'
  })

  const filterOptions: FilterOptions = {
    status: ['all', 'active', 'completed', 'planned', 'on-hold'],
    researchAreas: [
      'all', 
      'cognitive-psychology', 
      'memory-research', 
      'educational-neuroscience', 
      'adhd-interventions',
      'learning-technologies',
      'developmental-psychology'
    ],
    fundingTypes: [
      'all',
      'nsf',
      'nih',
      'university-grant',
      'private-foundation',
      'industry-partnership',
      'unfunded'
    ],
    collaborationStatus: [
      'all',
      'solo-research',
      'internal-collaboration',
      'external-collaboration',
      'international-collaboration'
    ],
    timePeriods: [
      'all',
      'current-year',
      'last-2-years',
      'last-5-years',
      'historical'
    ]
  }

  const filterLabels = {
    status: {
      'all': 'All Status',
      'active': 'Active',
      'completed': 'Completed',
      'planned': 'Planned',
      'on-hold': 'On Hold'
    },
    researchArea: {
      'all': 'All Areas',
      'cognitive-psychology': 'Cognitive Psychology',
      'memory-research': 'Memory Research',
      'educational-neuroscience': 'Educational Neuroscience',
      'adhd-interventions': 'ADHD Interventions',
      'learning-technologies': 'Learning Technologies',
      'developmental-psychology': 'Developmental Psychology'
    },
    fundingType: {
      'all': 'All Funding',
      'nsf': 'NSF Grant',
      'nih': 'NIH Grant',
      'university-grant': 'University Grant',
      'private-foundation': 'Private Foundation',
      'industry-partnership': 'Industry Partnership',
      'unfunded': 'Unfunded'
    },
    collaborationStatus: {
      'all': 'All Collaborations',
      'solo-research': 'Solo Research',
      'internal-collaboration': 'Internal Collaboration',
      'external-collaboration': 'External Collaboration',
      'international-collaboration': 'International Collaboration'
    },
    timePeriod: {
      'all': 'All Time',
      'current-year': 'Current Year',
      'last-2-years': 'Last 2 Years',
      'last-5-years': 'Last 5 Years',
      'historical': 'Historical (5+ years)'
    }
  }

  useEffect(() => {
    onFiltersChange(activeFilters)
  }, [activeFilters, onFiltersChange])

  const handleFilterChange = (filterType: keyof ActiveFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      status: 'all',
      researchArea: 'all',
      fundingType: 'all',
      collaborationStatus: 'all',
      timePeriod: 'all'
    })
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== 'all').length
  }

  const hasActiveFilters = getActiveFilterCount() > 0

  return (
    <div className={`bg-white border border-academic-slate-200 rounded-lg shadow-sm ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <SlidersHorizontalIcon className="w-5 h-5 text-primary-navy" />
          <h3 className="font-semibold text-primary-navy">Research Filters</h3>
          {hasActiveFilters && (
            <Badge variant="secondary" className="bg-primary-navy text-white">
              {getActiveFilterCount()} active
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-academic-slate-600 hover:text-primary-navy"
            >
              <XIcon className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-academic-slate-600 hover:text-primary-navy"
          >
            <FilterIcon className="w-4 h-4" />
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Quick Filters (Always Visible) */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          <Select value={activeFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger className="w-auto min-w-[120px] h-8 text-sm">
              <FlaskConicalIcon className="w-3 h-3 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.status.map((status) => (
                <SelectItem key={status} value={status}>
                  {filterLabels.status[status as keyof typeof filterLabels.status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={activeFilters.researchArea} onValueChange={(value) => handleFilterChange('researchArea', value)}>
            <SelectTrigger className="w-auto min-w-[140px] h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.researchAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {filterLabels.researchArea[area as keyof typeof filterLabels.researchArea]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Filters (Expandable) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Separator />
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Funding Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-academic-slate-700 mb-2">
                    <DollarSignIcon className="w-4 h-4" />
                    Funding Type
                  </label>
                  <Select value={activeFilters.fundingType} onValueChange={(value) => handleFilterChange('fundingType', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.fundingTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {filterLabels.fundingType[type as keyof typeof filterLabels.fundingType]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Collaboration Status */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-academic-slate-700 mb-2">
                    <UsersIcon className="w-4 h-4" />
                    Collaboration
                  </label>
                  <Select value={activeFilters.collaborationStatus} onValueChange={(value) => handleFilterChange('collaborationStatus', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.collaborationStatus.map((status) => (
                        <SelectItem key={status} value={status}>
                          {filterLabels.collaborationStatus[status as keyof typeof filterLabels.collaborationStatus]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Period */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-academic-slate-700 mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    Time Period
                  </label>
                  <Select value={activeFilters.timePeriod} onValueChange={(value) => handleFilterChange('timePeriod', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filterOptions.timePeriods.map((period) => (
                        <SelectItem key={period} value={period}>
                          {filterLabels.timePeriod[period as keyof typeof filterLabels.timePeriod]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="pt-2 border-t border-academic-slate-100">
                  <p className="text-sm font-medium text-academic-slate-700 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                      if (value === 'all') return null
                      
                      // Safe property access with proper typing
                      let label = value
                      const filterKey = key as keyof typeof filterLabels
                      const filterLabelGroup = filterLabels[filterKey]
                      
                      if (filterLabelGroup && typeof filterLabelGroup === 'object') {
                        const typedValue = value as keyof typeof filterLabelGroup
                        label = (filterLabelGroup as Record<string, string>)[typedValue] || value
                      }
                      
                      return (
                        <Badge
                          key={`${key}-${value}`}
                          variant="outline"
                          className="text-xs bg-primary-navy/5 border-primary-navy text-primary-navy"
                        >
                          {label}
                          <button
                            onClick={() => handleFilterChange(key as keyof ActiveFilters, 'all')}
                            className="ml-1 hover:text-red-600"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 