'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BrainIcon, SearchIcon, TagIcon } from 'lucide-react'
import { FloatingCard } from '../advanced-animations/micro-interactions'

interface ResearchArea {
  id: string
  name: string
  category: 'primary' | 'secondary' | 'emerging'
  relevance: number // 0-100
  publications: number
  projects: number
  keywords: string[]
  description: string
  color: string
}

interface ResearchAreaMappingProps {
  areas: ResearchArea[]
  className?: string
}

function InteractiveTagCloud({ areas, onAreaSelect }: { 
  areas: ResearchArea[]
  onAreaSelect: (area: ResearchArea) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const getTagSize = (relevance: number) => {
    if (relevance >= 80) return 'text-2xl px-6 py-3'
    if (relevance >= 60) return 'text-xl px-5 py-2'
    if (relevance >= 40) return 'text-lg px-4 py-2'
    return 'text-base px-3 py-1'
  }

  const getTagColor = (category: string) => {
    switch (category) {
      case 'primary':
        return 'bg-primary-navy/10 hover:bg-primary-navy/20 border-primary-navy/30 text-primary-navy'
      case 'secondary':
        return 'bg-academic-green/10 hover:bg-academic-green/20 border-academic-green/30 text-academic-green'
      case 'emerging':
        return 'bg-accent-gold/10 hover:bg-accent-gold/20 border-accent-gold/30 text-accent-gold'
      default:
        return 'bg-academic-slate-100 hover:bg-academic-slate-200 border-academic-slate-300 text-academic-slate-700'
    }
  }

  return (
    <div ref={ref} className="flex flex-wrap gap-3 justify-center items-center min-h-[300px] p-8">
      {areas.map((area, index) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: index * 0.1
          }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            className={`${getTagSize(area.relevance)} ${getTagColor(area.category)} cursor-pointer transition-all duration-300 border-2 font-medium relative overflow-hidden`}
            onClick={() => onAreaSelect(area)}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">{area.name}</span>
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}

function AreaDetailsPanel({ area }: { area: ResearchArea | null }) {
  if (!area) {
    return (
      <Card className="h-full bg-academic-slate-50/50">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-academic-slate-500">
            <TagIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a research area to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      key={area.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FloatingCard intensity={0.02} scale={1.01}>
        <Card className="h-full bg-white/90 backdrop-blur-sm border border-academic-slate-200/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-primary-navy">{area.name}</CardTitle>
              <Badge className={`${
                area.category === 'primary' ? 'bg-primary-navy text-white' :
                area.category === 'secondary' ? 'bg-academic-green text-white' :
                'bg-accent-gold text-white'
              }`}>
                {area.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Area description */}
            <p className="text-academic-slate-600 leading-relaxed">
              {area.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-academic-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-navy">{area.publications}</div>
                <div className="text-sm text-academic-slate-600">Publications</div>
              </div>
              <div className="bg-academic-slate-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-academic-green">{area.projects}</div>
                <div className="text-sm text-academic-slate-600">Projects</div>
              </div>
            </div>

            {/* Relevance bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-academic-slate-600">Research Focus</span>
                <span className="font-medium text-primary-navy">{area.relevance}%</span>
              </div>
              <div className="w-full bg-academic-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-navy to-academic-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${area.relevance}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="text-sm font-medium text-academic-slate-700 mb-3">Related Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {area.keywords.map((keyword, index) => (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Badge className="text-xs bg-white/50 border border-academic-slate-300 text-academic-slate-700">
                      {keyword}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FloatingCard>
    </motion.div>
  )
}

function CategoryLegend() {
  const categories = [
    { name: 'Primary Focus', color: 'bg-primary-navy', description: 'Core research areas' },
    { name: 'Secondary', color: 'bg-academic-green', description: 'Supporting research' },
    { name: 'Emerging', color: 'bg-accent-gold', description: 'New explorations' }
  ]

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary-navy flex items-center">
          <BrainIcon className="w-5 h-5 mr-2" />
          Research Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-4 h-4 ${category.color} rounded-full`} />
              <div>
                <div className="font-medium text-academic-slate-800">{category.name}</div>
                <div className="text-xs text-academic-slate-600">{category.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ResearchAreaMapping({ areas, className = '' }: ResearchAreaMappingProps) {
  const [selectedArea, setSelectedArea] = useState<ResearchArea | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAreas = areas.filter(area => {
    const matchesFilter = !filter || area.category === filter
    const matchesSearch = !searchQuery || 
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-academic-slate-400" />
          <input
            type="text"
            placeholder="Search research areas..."
            className="w-full pl-10 pr-4 py-2 border border-academic-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-navy/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className={`${!filter ? 'bg-primary-navy text-white' : 'bg-transparent text-primary-navy border-primary-navy'} border`}
            onClick={() => setFilter(null)}
          >
            All Areas
          </Button>
          <Button
            size="sm"
            className={`${filter === 'primary' ? 'bg-primary-navy text-white' : 'bg-transparent text-primary-navy border-primary-navy'} border`}
            onClick={() => setFilter('primary')}
          >
            Primary
          </Button>
          <Button
            size="sm"
            className={`${filter === 'secondary' ? 'bg-academic-green text-white' : 'bg-transparent text-academic-green border-academic-green'} border`}
            onClick={() => setFilter('secondary')}
          >
            Secondary
          </Button>
          <Button
            size="sm"
            className={`${filter === 'emerging' ? 'bg-accent-gold text-white' : 'bg-transparent text-accent-gold border-accent-gold'} border`}
            onClick={() => setFilter('emerging')}
          >
            Emerging
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tag cloud */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50">
            <CardHeader>
              <CardTitle className="text-xl text-primary-navy">Interactive Research Map</CardTitle>
              <p className="text-sm text-academic-slate-600">
                Click on any area to explore details. Size indicates research focus intensity.
              </p>
            </CardHeader>
            <CardContent>
              <InteractiveTagCloud areas={filteredAreas} onAreaSelect={setSelectedArea} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <CategoryLegend />
          <AreaDetailsPanel area={selectedArea} />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-primary-navy/5 border-primary-navy/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary-navy mb-2">
                {areas.filter(a => a.category === 'primary').length}
              </div>
              <div className="text-sm text-academic-slate-600">Primary Focus Areas</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-academic-green/5 border-academic-green/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-academic-green mb-2">
                {areas.reduce((sum, area) => sum + area.publications, 0)}
              </div>
              <div className="text-sm text-academic-slate-600">Total Publications</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-accent-gold/5 border-accent-gold/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent-gold mb-2">
                {areas.reduce((sum, area) => sum + area.projects, 0)}
              </div>
              <div className="text-sm text-academic-slate-600">Active Projects</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to create sample research areas data
export function createSampleResearchAreas(): ResearchArea[] {
  return [
    {
      id: 'cognitive-psychology',
      name: 'Cognitive Psychology',
      category: 'primary',
      relevance: 95,
      publications: 28,
      projects: 5,
      keywords: ['memory', 'attention', 'perception', 'cognitive processes'],
      description: 'Study of mental processes including attention, memory, perception, and decision-making.',
      color: 'bg-primary-navy'
    },
    {
      id: 'educational-neuroscience',
      name: 'Educational Neuroscience',
      category: 'primary',
      relevance: 88,
      publications: 18,
      projects: 3,
      keywords: ['learning', 'brain development', 'education', 'neuroscience'],
      description: 'Intersection of neuroscience and education to understand learning processes.',
      color: 'bg-primary-navy'
    },
    {
      id: 'memory-consolidation',
      name: 'Memory Consolidation',
      category: 'primary',
      relevance: 82,
      publications: 15,
      projects: 2,
      keywords: ['memory', 'consolidation', 'sleep', 'long-term memory'],
      description: 'Research on how memories are stabilized and maintained over time.',
      color: 'bg-primary-navy'
    },
    {
      id: 'attention-mechanisms',
      name: 'Attention Mechanisms',
      category: 'secondary',
      relevance: 75,
      publications: 12,
      projects: 2,
      keywords: ['attention', 'focus', 'selective attention', 'cognitive control'],
      description: 'Understanding how attention operates and affects cognitive performance.',
      color: 'bg-academic-green'
    },
    {
      id: 'learning-strategies',
      name: 'Learning Strategies',
      category: 'secondary',
      relevance: 68,
      publications: 10,
      projects: 2,
      keywords: ['learning', 'strategies', 'metacognition', 'study techniques'],
      description: 'Effective methods and strategies for enhancing learning outcomes.',
      color: 'bg-academic-green'
    },
    {
      id: 'digital-learning',
      name: 'Digital Learning',
      category: 'emerging',
      relevance: 45,
      publications: 5,
      projects: 1,
      keywords: ['technology', 'digital', 'e-learning', 'online education'],
      description: 'Impact of digital technologies on learning and cognitive processes.',
      color: 'bg-accent-gold'
    },
    {
      id: 'ai-education',
      name: 'AI in Education',
      category: 'emerging',
      relevance: 35,
      publications: 3,
      projects: 1,
      keywords: ['artificial intelligence', 'machine learning', 'personalized learning'],
      description: 'Applications of artificial intelligence in educational settings.',
      color: 'bg-accent-gold'
    }
  ]
} 
 