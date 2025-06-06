'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublicationCard } from "@/components/publication-card"
import { PublicationMetrics } from "@/components/publication-metrics"
import { AnimatedSection } from "@/components/ui/animated-section"
import { type Publication, type PublicationsData } from "@/lib/publications-data"
import { academicTracking } from '@/lib/analytics'
import { 
  BookOpenIcon, 
  SearchIcon, 
  FilterIcon, 
  CalendarIcon, 
  ExternalLinkIcon,
  BarChart3Icon,
  DownloadIcon,
  XIcon
} from 'lucide-react'

interface PublicationsPageClientProps {
  publicationsData: PublicationsData
}

export function PublicationsPageClient({ publicationsData }: PublicationsPageClientProps) {
  const { publications, publicationMetrics, researchAreas } = publicationsData

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [sortBy, setSortBy] = useState('year-desc')
  const [activeTab, setActiveTab] = useState('journal')

  // Get all publications as a flat array for search/filtering
  const allPublications = useMemo(() => [
    ...publications.journalArticles,
    ...publications.bookChapters,
    ...publications.conferenceProceedings,
    ...publications.workingPapers
  ], [publications])

  // Filter and search publications
  const filteredPublications = useMemo(() => {
    let filtered = allPublications

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some(author => author.toLowerCase().includes(query)) ||
        pub.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        pub.abstract.toLowerCase().includes(query)
      )
      
      // Track search analytics
      academicTracking.performSearch(searchQuery, filtered.length)
    }

    // Research area filter
    if (selectedArea !== 'all') {
      const areaName = researchAreas.find(area => area.name.toLowerCase().replace(' ', '-') === selectedArea)?.name
      if (areaName) {
        filtered = filtered.filter(pub => pub.researchArea === areaName)
      }
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(pub => pub.year === selectedYear)
    }

    // Sort publications
    switch (sortBy) {
      case 'year-desc':
        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        break
      case 'year-asc':
        filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year))
        break
      case 'citations-desc':
        filtered.sort((a, b) => b.citationCount - a.citationCount)
        break
      case 'citations-asc':
        filtered.sort((a, b) => a.citationCount - b.citationCount)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [allPublications, searchQuery, selectedArea, selectedYear, sortBy, researchAreas])

  // Get publications by type for tabs
  const getPublicationsByType = (type: string) => {
    let typeFilter: Publication[]
    
    switch (type) {
      case 'journal':
        typeFilter = filteredPublications.filter(pub => 'journal' in pub)
        break
      case 'chapters':
        typeFilter = filteredPublications.filter(pub => 'bookTitle' in pub)
        break
      case 'conference':
        typeFilter = filteredPublications.filter(pub => 'conference' in pub)
        break
      case 'working':
        typeFilter = filteredPublications.filter(pub => 'institution' in pub)
        break
      default:
        typeFilter = filteredPublications
    }
    
    return typeFilter
  }

  // Get unique years for year filter
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(allPublications.map(pub => pub.year)))
    return years.sort((a, b) => parseInt(b) - parseInt(a))
  }, [allPublications])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedArea('all')
    setSelectedYear('all')
    setSortBy('year-desc')
    academicTracking.useResearchFilter('clear_all', 'publications_page')
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() || selectedArea !== 'all' || selectedYear !== 'all' || sortBy !== 'year-desc'

  // Export filtered publications to BibTeX
  const exportToBibTeX = () => {
    const bibTexEntries = filteredPublications.map(pub => {
      if ('journal' in pub) {
        return `@article{${pub.id},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  journal={${(pub as any).journal}},
  volume={${(pub as any).volume}},
  number={${(pub as any).issue}},
  pages={${(pub as any).pages}},
  year={${pub.year}},
  doi={${(pub as any).doi}},
  abstract={${pub.abstract}}
}`
      }
      return `@misc{${pub.id},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  year={${pub.year}},
  abstract={${pub.abstract}}
}`
    })

    const bibTexContent = bibTexEntries.join('\n\n')
    const blob = new Blob([bibTexContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `publications-${new Date().toISOString().split('T')[0]}.bib`
    a.click()
    URL.revokeObjectURL(url)

    // Track export analytics
    academicTracking.downloadFile(`publications-bibtex-${filteredPublications.length}`, 'bibtex')
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    academicTracking.useResearchFilter('publication_type', value)
  }

  return (
    <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
      {/* Academic Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Page Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary-navy mb-4">
              Publications
            </h1>
            <p className="text-lg sm:text-xl text-academic-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of peer-reviewed research in cognitive psychology, 
              educational neuroscience, and learning sciences
            </p>
          </div>
        </AnimatedSection>

        {/* Publication Metrics */}
        <AnimatedSection animation="fade-up" delay={100}>
          <div className="mb-8">
            <PublicationMetrics metrics={publicationMetrics} />
          </div>
        </AnimatedSection>

        {/* Research Areas Overview */}
        <AnimatedSection animation="fade-up" delay={200}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                <BarChart3Icon className="w-5 h-5 mr-2" />
                Research Areas & Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {researchAreas.map((area, _index) => (
                  <div key={area.name} className="p-4 bg-academic-slate-50 rounded-lg border border-academic-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-primary-navy">{area.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {area.publicationCount} papers
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-academic-slate-600">
                      <span>{area.totalCitations} citations</span>
                      <span>Avg: {Math.round(area.totalCitations / area.publicationCount * 10) / 10}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Search and Filter Controls */}
        <AnimatedSection animation="fade-up" delay={300}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-academic-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search publications by title, author, or keywords..."
                    className="pl-10 border-academic-slate-300 focus:border-primary-navy"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger className="w-full sm:w-[180px] border-academic-slate-300">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Areas</SelectItem>
                      {researchAreas.map((area) => (
                        <SelectItem key={area.name} value={area.name.toLowerCase().replace(' ', '-')}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full sm:w-[140px] border-academic-slate-300">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {availableYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[160px] border-academic-slate-300">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year-desc">Year (Newest)</SelectItem>
                      <SelectItem value="year-asc">Year (Oldest)</SelectItem>
                      <SelectItem value="citations-desc">Citations (High)</SelectItem>
                      <SelectItem value="citations-asc">Citations (Low)</SelectItem>
                      <SelectItem value="title">Title (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Summary and Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-academic-slate-600">
                    Showing {filteredPublications.length} of {allPublications.length} publications
                  </span>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="text-academic-slate-600 hover:text-primary-navy"
                    >
                      <XIcon className="w-3 h-3 mr-1" />
                      Clear filters
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={exportToBibTeX}
                    className="border-academic-green text-academic-green hover:bg-academic-green hover:text-white"
                  >
                    <DownloadIcon className="w-3 h-3 mr-1" />
                    Export BibTeX
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Publications by Type */}
        <AnimatedSection animation="fade-up" delay={400}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
            <CardContent className="p-4 sm:p-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-academic-slate-100 mb-6">
                  <TabsTrigger value="journal" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                    Journal Articles ({getPublicationsByType('journal').length})
                  </TabsTrigger>
                  <TabsTrigger value="chapters" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                    Book Chapters ({getPublicationsByType('chapters').length})
                  </TabsTrigger>
                  <TabsTrigger value="conference" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                    Conference Proceedings ({getPublicationsByType('conference').length})
                  </TabsTrigger>
                  <TabsTrigger value="working" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                    Working Papers ({getPublicationsByType('working').length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="journal" className="space-y-6">
                  {getPublicationsByType('journal').length > 0 ? (
                    <div className="grid gap-6">
                      {getPublicationsByType('journal').map((publication, _index) => (
                        <AnimatedSection key={publication.id} animation="fade-up" delay={_index * 100}>
                          <PublicationCard publication={publication} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpenIcon className="w-12 h-12 text-academic-slate-400 mx-auto mb-4" />
                      <p className="text-academic-slate-600">No journal articles match your current filters.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="chapters" className="space-y-6">
                  {getPublicationsByType('chapters').length > 0 ? (
                    <div className="grid gap-6">
                      {getPublicationsByType('chapters').map((publication, _index) => (
                        <AnimatedSection key={publication.id} animation="fade-up" delay={_index * 100}>
                          <PublicationCard publication={publication} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpenIcon className="w-12 h-12 text-academic-slate-400 mx-auto mb-4" />
                      <p className="text-academic-slate-600">No book chapters match your current filters.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="conference" className="space-y-6">
                  {getPublicationsByType('conference').length > 0 ? (
                    <div className="grid gap-6">
                      {getPublicationsByType('conference').map((publication, _index) => (
                        <AnimatedSection key={publication.id} animation="fade-up" delay={_index * 100}>
                          <PublicationCard publication={publication} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpenIcon className="w-12 h-12 text-academic-slate-400 mx-auto mb-4" />
                      <p className="text-academic-slate-600">No conference proceedings match your current filters.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="working" className="space-y-6">
                  {getPublicationsByType('working').length > 0 ? (
                    <div className="grid gap-6">
                      {getPublicationsByType('working').map((publication, _index) => (
                        <AnimatedSection key={publication.id} animation="fade-up" delay={_index * 100}>
                          <PublicationCard publication={publication} />
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpenIcon className="w-12 h-12 text-academic-slate-400 mx-auto mb-4" />
                      <p className="text-academic-slate-600">No working papers match your current filters.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Academic Links Footer */}
        <AnimatedSection animation="fade-up" delay={500}>
          <div className="mt-12 pt-8 border-t border-academic-slate-200 text-center">
            <p className="text-sm text-academic-slate-600 mb-4">
              For citation management, consider using academic reference managers
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button 
                asChild
                variant="outline" 
                size="sm"
                className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
              >
                <a 
                  href="https://scholar.google.com/citations?user=example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => academicTracking.clickExternalLink('google_scholar', 'publications_page')}
                >
                  <ExternalLinkIcon className="w-3 h-3 mr-1" />
                  Google Scholar
                </a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="sm"
                className="border-academic-green text-academic-green hover:bg-academic-green hover:text-white"
              >
                <a 
                  href="https://orcid.org/0000-0000-0000-0000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => academicTracking.clickExternalLink('orcid', 'publications_page')}
                >
                  <ExternalLinkIcon className="w-3 h-3 mr-1" />
                  ORCID
                </a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="sm"
                className="border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-white"
              >
                <a 
                  href="https://www.researchgate.net/profile/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => academicTracking.clickExternalLink('researchgate', 'publications_page')}
                >
                  <ExternalLinkIcon className="w-3 h-3 mr-1" />
                  ResearchGate
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
} 
 