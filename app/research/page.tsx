"use client"

import { useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FlaskConicalIcon, 
  UsersIcon, 
  TrendingUpIcon,
  BarChart3Icon
} from 'lucide-react'
import { getResearchData, getResearchAreas } from '@/lib/research-data'
import { ResearchVisualization } from '@/components/research-visualization'
import { ResearchMetrics } from '@/components/research-metrics'
import { ResearchFilters } from '@/components/research-filters'
import { ResearchProjectCard } from '@/components/research-project-card'

interface ActiveFilters {
  status: string
  researchArea: string
  fundingType: string
  collaborationStatus: string
  timePeriod: string
}

export default function ResearchPage() {
  const researchData = getResearchData()
  const researchAreas = getResearchAreas()
  
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    status: 'all',
    researchArea: 'all',
    fundingType: 'all',
    collaborationStatus: 'all',
    timePeriod: 'all'
  })

  // Helper function to get research area for a project
  const getProjectResearchArea = useCallback((projectId: string): string => {
    const area = researchAreas.find(area => area.projects.includes(projectId))
    return area ? area.name.toLowerCase() : ''
  }, [researchAreas])

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    // Get all projects from all statuses
    const allProjects = [
      ...researchData.researchProjects.active,
      ...researchData.researchProjects.completed,
      ...researchData.researchProjects.planned
    ]

    return allProjects.filter(project => {
      // Status filter
      if (activeFilters.status !== 'all' && project.status !== activeFilters.status) {
        return false
      }

      // Research area filter - using the helper function
      if (activeFilters.researchArea !== 'all') {
        const projectArea = getProjectResearchArea(project.id)
        if (!projectArea.includes(activeFilters.researchArea.replace('-', ' '))) {
          return false
        }
      }

      // Funding type filter
      if (activeFilters.fundingType !== 'all') {
        const fundingSource = project.funding.source.toLowerCase()
        switch (activeFilters.fundingType) {
          case 'federal':
            if (!fundingSource.includes('national') && !fundingSource.includes('nsf') && !fundingSource.includes('nih')) {
              return false
            }
            break
          case 'private':
            if (fundingSource.includes('national') || fundingSource.includes('nsf') || fundingSource.includes('nih')) {
              return false
            }
            break
          case 'foundation':
            if (!fundingSource.includes('foundation')) {
              return false
            }
            break
        }
      }

      // Collaboration filter
      if (activeFilters.collaborationStatus !== 'all') {
        const hasCollaborators = project.collaborators.length > 0
        switch (activeFilters.collaborationStatus) {
          case 'solo-research':
            if (hasCollaborators) return false
            break
          case 'internal-collaboration':
            if (!hasCollaborators || !project.collaborators.some(collab => 
              collab.institution.toLowerCase().includes('berkeley'))) return false
            break
          case 'external-collaboration':
            if (!hasCollaborators || project.collaborators.every(collab => 
              collab.institution.toLowerCase().includes('berkeley'))) return false
            break
          case 'international-collaboration':
            // Simple check for international collaboration
            const hasInternational = project.collaborators.some(collab => 
              !collab.institution.toLowerCase().includes('university') ||
              collab.institution.toLowerCase().includes('oxford') ||
              collab.institution.toLowerCase().includes('cambridge')
            )
            if (!hasInternational) return false
            break
        }
      }

      // Time period filter
      if (activeFilters.timePeriod !== 'all') {
        const startYear = new Date(project.startDate).getFullYear()
        const currentYear = new Date().getFullYear()
        
        switch (activeFilters.timePeriod) {
          case 'current':
            if (startYear < currentYear) return false
            break
          case 'recent':
            if (startYear < currentYear - 2) return false
            break
          case 'historical':
            if (startYear >= currentYear - 2) return false
            break
        }
      }

      return true
    })
  }, [researchData.researchProjects, activeFilters, getProjectResearchArea])

  // Group filtered projects by status
  const groupedFilteredProjects = useMemo(() => {
    return {
      active: filteredProjects.filter(p => p.status === 'active'),
      completed: filteredProjects.filter(p => p.status === 'completed'),
      planned: filteredProjects.filter(p => p.status === 'planned')
    }
  }, [filteredProjects])

  const handleFiltersChange = (filters: ActiveFilters) => {
    setActiveFilters(filters)
  }

  return (
    <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
      {/* Academic Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Page Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4">
              <FlaskConicalIcon className="w-8 h-8 mr-3 text-primary-navy" />
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-navy font-serif">Research Portfolio</h1>
            </div>
            <p className="text-lg text-academic-slate-600 max-w-3xl mx-auto leading-relaxed">
              Exploring the frontiers of cognitive psychology, educational neuroscience, and learning sciences 
              through rigorous research and innovative methodologies.
            </p>
          </div>
        </AnimatedSection>

        {/* Research Impact Metrics */}
        <AnimatedSection animation="fade-up" delay={100}>
          <ResearchMetrics metrics={researchData.researchImpact} />
        </AnimatedSection>

        {/* Research Visualization */}
        <AnimatedSection animation="fade-up" delay={200}>
          <ResearchVisualization className="mb-8" />
        </AnimatedSection>

        {/* Research Areas Overview */}
        <AnimatedSection animation="fade-up" delay={300}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                <TrendingUpIcon className="w-5 h-5 mr-2" />
                Research Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {researchAreas.map((area, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                    <div className="bg-primary-navy/5 border border-primary-navy/10 p-4 rounded-lg hover:bg-primary-navy/10 transition-colors">
                      <h3 className="font-semibold text-primary-navy mb-2">{area.name}</h3>
                      <p className="text-sm text-academic-slate-600 mb-3">{area.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {area.projects.length} project{area.projects.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Advanced Filters */}
        <AnimatedSection animation="fade-up" delay={400}>
          <ResearchFilters 
            onFiltersChange={handleFiltersChange}
            className="mb-8"
          />
        </AnimatedSection>

        {/* Research Projects Tabs */}
        <AnimatedSection animation="fade-up" delay={500}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
            <CardContent className="p-0">
              <Tabs defaultValue="active" className="w-full">
                <div className="border-b border-academic-slate-200 px-6 pt-6">
                  <TabsList className="grid w-full grid-cols-3 bg-academic-slate-100">
                    <TabsTrigger value="active" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      Active ({groupedFilteredProjects.active.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      Completed ({groupedFilteredProjects.completed.length})
                    </TabsTrigger>
                    <TabsTrigger value="planned" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      Planned ({groupedFilteredProjects.planned.length})
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="active" className="p-6 space-y-6">
                  {groupedFilteredProjects.active.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {groupedFilteredProjects.active.map((project, index) => (
                        <AnimatedSection key={project.id} animation="fade-up" delay={100 * (index + 1)}>
                          <ResearchProjectCard project={project} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3Icon className="w-12 h-12 text-academic-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-academic-slate-600 mb-2">No projects found</h3>
                      <p className="text-academic-slate-500">Try adjusting your filters to see more results.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="p-6 space-y-6">
                  {groupedFilteredProjects.completed.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {groupedFilteredProjects.completed.map((project, index) => (
                        <AnimatedSection key={project.id} animation="fade-up" delay={100 * (index + 1)}>
                          <ResearchProjectCard project={project} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3Icon className="w-12 h-12 text-academic-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-academic-slate-600 mb-2">No projects found</h3>
                      <p className="text-academic-slate-500">Try adjusting your filters to see more results.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="planned" className="p-6 space-y-6">
                  {groupedFilteredProjects.planned.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {groupedFilteredProjects.planned.map((project, index) => (
                        <AnimatedSection key={project.id} animation="fade-up" delay={100 * (index + 1)}>
                          <ResearchProjectCard project={project} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3Icon className="w-12 h-12 text-academic-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-academic-slate-600 mb-2">No projects found</h3>
                      <p className="text-academic-slate-500">Try adjusting your filters to see more results.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection animation="fade-up" delay={600}>
          <Card className="bg-gradient-to-r from-primary-navy/5 to-academic-green/5 border-primary-navy/20 mt-8">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-primary-navy font-serif mb-4">
                Interested in Research Collaboration?
              </h2>
              <p className="text-academic-slate-600 mb-6 max-w-2xl mx-auto">
                I welcome opportunities to collaborate with fellow researchers, mentor students, 
                and explore new avenues in cognitive psychology and educational neuroscience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary-navy hover:bg-primary-navy-dark text-white"
                  size="lg"
                >
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Join Research Team
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
                  size="lg"
                >
                  Discuss Collaboration
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
}