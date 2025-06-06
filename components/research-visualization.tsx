"use client"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FlaskConicalIcon,
  CalendarIcon,
  DollarSignIcon,
  BarChart3Icon
} from "lucide-react"

interface VisualizationData {
  timeline: TimelineItem[]
  collaborations: CollaborationData[]
  publications: PublicationMetrics
  funding: FundingData[]
}

interface TimelineItem {
  year: number
  projects: number
  publications: number
  funding: number
  milestones: string[]
}

interface CollaborationData {
  institution: string
  projects: number
  type: 'internal' | 'external' | 'international'
  strength: number
}

interface PublicationMetrics {
  totalPublications: number
  totalCitations: number
  hIndex: number
  impactFactor: number
  yearlyPublications: { year: number; count: number; citations: number }[]
}

interface FundingData {
  year: number
  amount: number
  source: string
  type: 'nsf' | 'nih' | 'university' | 'private'
}

interface ResearchVisualizationProps {
  className?: string
}

export function ResearchVisualization({ className = '' }: ResearchVisualizationProps) {
  const [activeView, setActiveView] = useState<string>('timeline')

  // Mock data - in a real app, this would come from your data source
  const visualizationData: VisualizationData = useMemo(() => ({
    timeline: [
      {
        year: 2020,
        projects: 3,
        publications: 5,
        funding: 275000,
        milestones: ['NSF Grant Awarded', 'Memory Lab Established']
      },
      {
        year: 2021,
        projects: 4,
        publications: 7,
        funding: 320000,
        milestones: ['First ADHD Study Published', 'International Collaboration']
      },
      {
        year: 2022,
        projects: 5,
        publications: 8,
        funding: 450000,
        milestones: ['Educational Tech Patent', 'NIH Grant Received']
      },
      {
        year: 2023,
        projects: 6,
        publications: 12,
        funding: 520000,
        milestones: ['Best Paper Award', 'Research Center Founded']
      },
      {
        year: 2024,
        projects: 7,
        publications: 8,
        funding: 680000,
        milestones: ['Keynote Speaker', 'Industry Partnership']
      }
    ],
    collaborations: [
      { institution: 'Stanford University', projects: 8, type: 'external', strength: 0.9 },
      { institution: 'UC Berkeley - Computer Science', projects: 12, type: 'internal', strength: 0.95 },
      { institution: 'Oxford University', projects: 3, type: 'international', strength: 0.7 },
      { institution: 'MIT Media Lab', projects: 5, type: 'external', strength: 0.8 },
      { institution: 'UC Berkeley - Education', projects: 15, type: 'internal', strength: 1.0 },
      { institution: 'University of Toronto', projects: 4, type: 'international', strength: 0.75 }
    ],
    publications: {
      totalPublications: 47,
      totalCitations: 1256,
      hIndex: 18,
      impactFactor: 3.4,
      yearlyPublications: [
        { year: 2020, count: 5, citations: 156 },
        { year: 2021, count: 7, citations: 234 },
        { year: 2022, count: 8, citations: 298 },
        { year: 2023, count: 12, citations: 387 },
        { year: 2024, count: 8, citations: 181 }
      ]
    },
    funding: [
      { year: 2020, amount: 275000, source: 'NSF', type: 'nsf' },
      { year: 2021, amount: 150000, source: 'University', type: 'university' },
      { year: 2022, amount: 420000, source: 'NIH', type: 'nih' },
      { year: 2023, amount: 200000, source: 'Private Foundation', type: 'private' },
      { year: 2024, amount: 485000, source: 'NSF', type: 'nsf' }
    ]
  }), [])

  const getCollaborationColor = (type: string) => {
    switch (type) {
      case 'internal': return 'bg-primary-navy'
      case 'external': return 'bg-academic-green'
      case 'international': return 'bg-accent-burgundy'
      default: return 'bg-academic-slate-400'
    }
  }

  const getFundingColor = (type: string) => {
    switch (type) {
      case 'nsf': return 'bg-blue-500'
      case 'nih': return 'bg-green-500'
      case 'university': return 'bg-purple-500'
      case 'private': return 'bg-orange-500'
      default: return 'bg-academic-slate-400'
    }
  }

  return (
    <div className={`bg-white border border-academic-slate-200 rounded-lg shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3Icon className="w-6 h-6 text-primary-navy" />
          <h2 className="text-xl font-bold text-primary-navy font-serif">Research Analytics</h2>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="collaborations" className="flex items-center gap-2">
              <FlaskConicalIcon className="w-4 h-4" />
              Network
            </TabsTrigger>
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <FlaskConicalIcon className="w-4 h-4" />
              Impact
            </TabsTrigger>
            <TabsTrigger value="funding" className="flex items-center gap-2">
              <DollarSignIcon className="w-4 h-4" />
              Funding
            </TabsTrigger>
          </TabsList>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FlaskConicalIcon className="w-4 h-4 text-primary-navy" />
                    <span className="text-sm text-academic-slate-600">Total Projects</span>
                  </div>
                  <p className="text-2xl font-bold text-primary-navy">25</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FlaskConicalIcon className="w-4 h-4 text-academic-green" />
                    <span className="text-sm text-academic-slate-600">Publications</span>
                  </div>
                  <p className="text-2xl font-bold text-academic-green">47</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-4 h-4 text-accent-burgundy" />
                    <span className="text-sm text-academic-slate-600">Total Funding</span>
                  </div>
                  <p className="text-2xl font-bold text-accent-burgundy">$2.25M</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FlaskConicalIcon className="w-4 h-4 text-academic-slate-600" />
                    <span className="text-sm text-academic-slate-600">H-Index</span>
                  </div>
                  <p className="text-2xl font-bold text-academic-slate-900">18</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {visualizationData.timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 p-4 bg-academic-slate-50 rounded-lg border border-academic-slate-200">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-lg font-bold text-primary-navy">{item.year}</div>
                      <div className="w-3 h-3 bg-primary-navy rounded-full mx-auto mt-2"></div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-academic-slate-900">Research Activity</h4>
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-primary-navy rounded"></div>
                            {item.projects} Projects
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-academic-green rounded"></div>
                            {item.publications} Publications
                          </span>
                        </div>
                        <div className="text-sm text-academic-slate-600">
                          Funding: ${(item.funding / 1000).toFixed(0)}K
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-academic-slate-900 mb-2">Key Milestones</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.milestones.map((milestone, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {milestone}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < visualizationData.timeline.length - 1 && (
                    <div className="absolute left-8 top-full w-0.5 h-4 bg-academic-slate-300"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Collaborations View */}
          <TabsContent value="collaborations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visualizationData.collaborations.map((collab, index) => (
                <motion.div
                  key={collab.institution}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-academic-slate-900 text-sm">
                          {collab.institution}
                        </h3>
                        <Badge className={`text-xs text-white ${getCollaborationColor(collab.type)}`}>
                          {collab.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-academic-slate-600">Projects</span>
                          <span className="font-medium">{collab.projects}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-academic-slate-600">Collaboration Strength</span>
                            <span className="font-medium">{(collab.strength * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-academic-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getCollaborationColor(collab.type)}`}
                              style={{ width: `${collab.strength * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Publications View */}
          <TabsContent value="publications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-navy">
                    {visualizationData.publications.totalPublications}
                  </div>
                  <div className="text-sm text-academic-slate-600">Total Publications</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-academic-green">
                    {visualizationData.publications.totalCitations}
                  </div>
                  <div className="text-sm text-academic-slate-600">Total Citations</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent-burgundy">
                    {visualizationData.publications.hIndex}
                  </div>
                  <div className="text-sm text-academic-slate-600">H-Index</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-academic-slate-900">
                    {visualizationData.publications.impactFactor}
                  </div>
                  <div className="text-sm text-academic-slate-600">Avg Impact Factor</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              {visualizationData.publications.yearlyPublications.map((year, index) => (
                <motion.div
                  key={year.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-academic-slate-50 rounded-lg"
                >
                  <div className="w-12 text-sm font-medium text-primary-navy">
                    {year.year}
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary-navy rounded"></div>
                      <span className="text-sm">{year.count} publications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-academic-green rounded"></div>
                      <span className="text-sm">{year.citations} citations</span>
                    </div>
                  </div>
                  <div className="text-sm text-academic-slate-600">
                    Avg: {(year.citations / year.count).toFixed(1)} citations/paper
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Funding View */}
          <TabsContent value="funding" className="space-y-4">
            <div className="space-y-3">
              {visualizationData.funding.map((fund, index) => (
                <motion.div
                  key={`${fund.year}-${fund.source}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-academic-slate-50 rounded-lg"
                >
                  <div className="w-12 text-sm font-medium text-primary-navy">
                    {fund.year}
                  </div>
                  <div className={`w-4 h-4 rounded ${getFundingColor(fund.type)}`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-academic-slate-900">{fund.source}</div>
                    <div className="text-sm text-academic-slate-600">{fund.type.toUpperCase()} Grant</div>
                  </div>
                  <div className="text-lg font-bold text-primary-navy">
                    ${(fund.amount / 1000).toFixed(0)}K
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary-navy/5 rounded-lg border border-primary-navy/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-navy">
                  ${visualizationData.funding.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-academic-slate-600">Total Funding Awarded (2020-2024)</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 