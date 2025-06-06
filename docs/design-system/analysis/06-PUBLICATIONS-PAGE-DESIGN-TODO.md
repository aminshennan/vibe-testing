# Publications Page Design Optimization Todo List

## Overview
Comprehensive design improvements for the Publications page applying scholarly design principles to create an authoritative, searchable, and accessible presentation of Dr. Mitchell's academic publications, research impact, and scholarly contributions.

## 📋 Table of Contents
- [Scholarly Content Hierarchy](#scholarly-content-hierarchy)
- [Publication Organization System](#publication-organization-system)
- [Citation & Metrics Display](#citation--metrics-display)
- [Advanced Search & Filtering](#advanced-search--filtering)
- [Mobile Research Access](#mobile-research-access)
- [Academic Accessibility](#academic-accessibility)
- [Performance for Scholars](#performance-for-scholars)

---

## 📚 Scholarly Content Hierarchy

### P0 - Critical Academic Structure

#### Publication Hero Section
```typescript
// app/publications/page.tsx - Enhanced scholarly presentation
<section className="publications-hero academic-section-hero">
  <div className="academic-container">
    <header className="publications-header text-center mb-12">
      <h1 className="academic-heading-hero text-primary-navy mb-6">
        Publications & Research Impact
      </h1>
      <p className="academic-intro-text max-w-4xl mx-auto">
        Peer-reviewed publications, book chapters, and scholarly contributions 
        advancing the field of psychology and cognitive research.
      </p>
    </header>
    
    <div className="impact-metrics academic-stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <ImpactMetric
        number={publications.totalCount}
        label="Total Publications"
        icon={<FileText className="w-6 h-6" />}
        trend="+12 this year"
      />
      <ImpactMetric
        number={metrics.totalCitations}
        label="Total Citations"
        icon={<Quote className="w-6 h-6" />}
        trend={`h-index: ${metrics.hIndex}`}
      />
      <ImpactMetric
        number={metrics.impactFactor}
        label="Avg Impact Factor"
        icon={<TrendingUp className="w-6 h-6" />}
        trend="Top quartile"
      />
      <ImpactMetric
        number={collaborations.coAuthors}
        label="Collaborators"
        icon={<Users className="w-6 h-6" />}
        trend="International"
      />
    </div>
  </div>
</section>
```

#### Publication Type Categories
```typescript
// components/publications/publication-categories.tsx
interface PublicationCategoryProps {
  type: 'journal-articles' | 'book-chapters' | 'conference-papers' | 'books' | 'preprints'
  title: string
  description: string
  count: number
  publications: Publication[]
  impactMetrics: {
    averageCitations: number
    topQuartileCount: number
    recentCount: number
  }
}

const PublicationCategory = ({ 
  type, 
  title, 
  description, 
  count, 
  publications, 
  impactMetrics 
}: PublicationCategoryProps) => {
  const categoryStyles = {
    'journal-articles': 'bg-gradient-to-br from-primary-navy/5 to-primary-navy/10 border-l-4 border-l-primary-navy',
    'book-chapters': 'bg-gradient-to-br from-academic-green/5 to-academic-green/10 border-l-4 border-l-academic-green',
    'conference-papers': 'bg-gradient-to-br from-accent-gold/5 to-accent-gold/10 border-l-4 border-l-accent-gold',
    'books': 'bg-gradient-to-br from-accent-burgundy/5 to-accent-burgundy/10 border-l-4 border-l-accent-burgundy',
    'preprints': 'bg-gradient-to-br from-academic-slate-100/50 to-academic-slate-200/50 border-l-4 border-l-academic-slate-400'
  }

  const typeIcons = {
    'journal-articles': <FileText className="w-6 h-6" />,
    'book-chapters': <BookOpen className="w-6 h-6" />,
    'conference-papers': <Presentation className="w-6 h-6" />,
    'books': <Book className="w-6 h-6" />,
    'preprints': <FileStack className="w-6 h-6" />
  }

  return (
    <section className={`publication-category ${categoryStyles[type]} rounded-xl p-8 mb-8`}>
      <header className="category-header mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="category-icon p-3 bg-white rounded-lg shadow-academic-subtle">
              {typeIcons[type]}
            </div>
            <div>
              <h2 className="academic-heading-2 text-primary-navy mb-2">
                {title}
                <span className="ml-3 text-lg font-normal text-academic-slate-600">
                  ({count})
                </span>
              </h2>
              <p className="academic-body text-academic-slate-600">
                {description}
              </p>
            </div>
          </div>
          <PublicationStatusBadge status={getStatusFromType(type)} />
        </div>
        
        <div className="category-metrics grid grid-cols-3 gap-4">
          <MetricCard
            value={impactMetrics.averageCitations}
            label="Avg Citations"
            icon={<Quote className="w-4 h-4" />}
          />
          <MetricCard
            value={impactMetrics.topQuartileCount}
            label="Top Quartile"
            icon={<Star className="w-4 h-4" />}
          />
          <MetricCard
            value={impactMetrics.recentCount}
            label="Recent (2022-2024)"
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>
      </header>
      
      <div className="publications-preview">
        {publications.slice(0, 3).map((publication, index) => (
          <PublicationCard 
            key={publication.id} 
            publication={publication}
            priority={index === 0 ? 'featured' : 'standard'}
            view="compact"
          />
        ))}
        
        {publications.length > 3 && (
          <div className="view-all-button mt-6">
            <Button variant="academic-secondary" size="academic-md">
              View All {count} {title}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
```

### P1 - Enhanced Publication Display

#### Detailed Publication Cards
```typescript
// components/publications/publication-card.tsx
interface PublicationCardProps {
  publication: {
    id: string
    title: string
    authors: string[]
    journal: string
    year: number
    volume?: string
    issue?: string
    pages?: string
    doi?: string
    abstract: string
    keywords: string[]
    citations: number
    impactFactor?: number
    quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    type: 'journal-article' | 'book-chapter' | 'conference-paper' | 'book' | 'preprint'
    status: 'published' | 'in-press' | 'under-review' | 'preprint'
    pdfUrl?: string
    supplementaryMaterials?: string[]
  }
  priority: 'featured' | 'standard'
  view: 'detailed' | 'compact' | 'citation'
}

const PublicationCard = ({ publication, priority, view }: PublicationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [citationFormat, setCitationFormat] = useState<'apa' | 'mla' | 'chicago'>('apa')

  if (view === 'citation') {
    return <CitationView publication={publication} format={citationFormat} />
  }

  return (
    <Card 
      variant="academic-publication"
      className={`publication-card ${priority === 'featured' ? 'ring-2 ring-primary-navy/20' : ''}`}
    >
      <CardHeader>
        <div className="publication-header mb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <CardTitle variant="academic-large" className="mb-3">
                {publication.title}
              </CardTitle>
              
              <div className="authors-list mb-2">
                <AuthorsList 
                  authors={publication.authors}
                  highlightAuthor="Sarah Mitchell"
                />
              </div>
              
              <div className="publication-meta flex flex-wrap items-center gap-3 text-academic-slate-600">
                <span className="journal-name font-semibold">
                  {publication.journal}
                </span>
                <span className="publication-year">
                  {publication.year}
                </span>
                {publication.volume && (
                  <span className="volume-issue">
                    Vol. {publication.volume}
                    {publication.issue && `, Issue ${publication.issue}`}
                  </span>
                )}
                {publication.pages && (
                  <span className="pages">
                    pp. {publication.pages}
                  </span>
                )}
              </div>
            </div>
            
            <div className="publication-badges flex flex-col gap-2">
              <PublicationStatusBadge status={publication.status} />
              {publication.quartile && (
                <Badge variant={getQuartileVariant(publication.quartile)} size="sm">
                  {publication.quartile} Journal
                </Badge>
              )}
              {priority === 'featured' && (
                <Badge variant="status-featured" size="sm">Featured</Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="publication-metrics flex items-center gap-6">
          <MetricDisplay
            icon={<Quote className="w-4 h-4" />}
            value={publication.citations}
            label="Citations"
          />
          {publication.impactFactor && (
            <MetricDisplay
              icon={<TrendingUp className="w-4 h-4" />}
              value={publication.impactFactor}
              label="Impact Factor"
              precision={2}
            />
          )}
          <MetricDisplay
            icon={<Calendar className="w-4 h-4" />}
            value={new Date().getFullYear() - publication.year}
            label="Years Since Publication"
            suffix=" years"
          />
        </div>
      </CardHeader>
      
      {view === 'detailed' && (
        <CardContent>
          <div className="abstract-section mb-4">
            <h4 className="academic-caption text-academic-slate-600 mb-2">
              Abstract
            </h4>
            <p className="academic-body text-academic-slate-700 leading-relaxed">
              {publication.abstract}
            </p>
          </div>
          
          {publication.keywords.length > 0 && (
            <div className="keywords-section mb-4">
              <h4 className="academic-caption text-academic-slate-600 mb-2">
                Keywords
              </h4>
              <div className="keywords flex flex-wrap gap-2">
                {publication.keywords.map((keyword, index) => (
                  <Badge key={index} variant="field-primary" size="sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="citation-tools mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-primary-navy hover:text-primary-navy-dark transition-colors"
              aria-expanded={isExpanded}
            >
              <span className="academic-body-sm font-medium">
                Citation Formats
              </span>
              <ChevronDown 
                className={`w-4 h-4 transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {isExpanded && (
              <div className="citation-formats mt-3 p-4 bg-academic-slate-50 rounded-lg">
                <CitationFormats 
                  publication={publication}
                  activeFormat={citationFormat}
                  onFormatChange={setCitationFormat}
                />
              </div>
            )}
          </div>
        </CardContent>
      )}
      
      <CardFooter variant="bordered" className="flex justify-between">
        <div className="action-buttons flex gap-3">
          {publication.doi && (
            <Button variant="academic-primary" size="academic-sm" asChild>
              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Publication
              </a>
            </Button>
          )}
          
          {publication.pdfUrl && (
            <Button variant="academic-secondary" size="academic-sm" asChild>
              <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
          )}
        </div>
        
        <ShareButton publication={publication} />
      </CardFooter>
    </Card>
  )
}
```

---

## 🔍 Advanced Search & Filtering

### P0 - Comprehensive Search System

#### Multi-Faceted Search Interface
```typescript
// components/publications/advanced-search.tsx
interface AdvancedSearchProps {
  publications: Publication[]
  onFilter: (filteredPublications: Publication[]) => void
  onSort: (sortOption: SortOption) => void
}

const AdvancedSearch = ({ publications, onFilter, onSort }: AdvancedSearchProps) => {
  const [searchState, setSearchState] = useState({
    query: '',
    type: 'all',
    year: { from: 2010, to: new Date().getFullYear() },
    journal: 'all',
    status: 'all',
    quartile: 'all',
    citations: { min: 0, max: 1000 },
    keywords: [],
    author: ''
  })

  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'year',
    direction: 'desc'
  })

  const handleSearch = useMemo(() => {
    return debounce((filters: typeof searchState) => {
      let filtered = publications

      // Text search across title, abstract, authors, journal
      if (filters.query) {
        const query = filters.query.toLowerCase()
        filtered = filtered.filter(pub => 
          pub.title.toLowerCase().includes(query) ||
          pub.abstract.toLowerCase().includes(query) ||
          pub.authors.some(author => author.toLowerCase().includes(query)) ||
          pub.journal.toLowerCase().includes(query) ||
          pub.keywords.some(keyword => keyword.toLowerCase().includes(query))
        )
      }

      // Publication type filter
      if (filters.type !== 'all') {
        filtered = filtered.filter(pub => pub.type === filters.type)
      }

      // Year range filter
      filtered = filtered.filter(pub => 
        pub.year >= filters.year.from && pub.year <= filters.year.to
      )

      // Journal filter
      if (filters.journal !== 'all') {
        filtered = filtered.filter(pub => pub.journal === filters.journal)
      }

      // Status filter
      if (filters.status !== 'all') {
        filtered = filtered.filter(pub => pub.status === filters.status)
      }

      // Quartile filter
      if (filters.quartile !== 'all') {
        filtered = filtered.filter(pub => pub.quartile === filters.quartile)
      }

      // Citation range filter
      filtered = filtered.filter(pub => 
        pub.citations >= filters.citations.min && 
        pub.citations <= filters.citations.max
      )

      // Keywords filter
      if (filters.keywords.length > 0) {
        filtered = filtered.filter(pub =>
          filters.keywords.some(keyword =>
            pub.keywords.some(pubKeyword =>
              pubKeyword.toLowerCase().includes(keyword.toLowerCase())
            )
          )
        )
      }

      // Co-author filter
      if (filters.author) {
        const authorQuery = filters.author.toLowerCase()
        filtered = filtered.filter(pub =>
          pub.authors.some(author => 
            author.toLowerCase().includes(authorQuery)
          )
        )
      }

      onFilter(filtered)
    }, 300)
  }, [publications, onFilter])

  useEffect(() => {
    handleSearch(searchState)
  }, [searchState, handleSearch])

  return (
    <div className="advanced-search bg-white border border-academic-slate-200 rounded-xl p-6 mb-8 shadow-academic-subtle">
      <header className="search-header mb-6">
        <h3 className="academic-heading-5 text-primary-navy mb-2">
          Search Publications
        </h3>
        <p className="academic-body-sm text-academic-slate-600">
          Use advanced filters to find specific research publications
        </p>
      </header>
      
      <div className="search-controls space-y-6">
        {/* Main Search Bar */}
        <div className="main-search">
          <label className="academic-caption text-academic-slate-600 block mb-2">
            Search in titles, abstracts, authors, and keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-academic-slate-400" />
            <input
              type="text"
              placeholder="Enter search terms..."
              value={searchState.query}
              onChange={(e) => setSearchState(prev => ({ ...prev, query: e.target.value }))}
              className="w-full pl-11 pr-4 py-3 border border-academic-slate-200 rounded-lg focus:ring-2 focus:ring-primary-navy/20 focus:border-primary-navy academic-body"
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div className="filter-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <FilterSelect
            label="Publication Type"
            value={searchState.type}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'journal-article', label: 'Journal Articles' },
              { value: 'book-chapter', label: 'Book Chapters' },
              { value: 'conference-paper', label: 'Conference Papers' },
              { value: 'book', label: 'Books' },
              { value: 'preprint', label: 'Preprints' }
            ]}
            onChange={(value) => setSearchState(prev => ({ ...prev, type: value }))}
          />

          <FilterSelect
            label="Publication Status"
            value={searchState.status}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'published', label: 'Published' },
              { value: 'in-press', label: 'In Press' },
              { value: 'under-review', label: 'Under Review' },
              { value: 'preprint', label: 'Preprint' }
            ]}
            onChange={(value) => setSearchState(prev => ({ ...prev, status: value }))}
          />

          <FilterSelect
            label="Journal Quartile"
            value={searchState.quartile}
            options={[
              { value: 'all', label: 'All Quartiles' },
              { value: 'Q1', label: 'Q1 (Top 25%)' },
              { value: 'Q2', label: 'Q2 (25-50%)' },
              { value: 'Q3', label: 'Q3 (50-75%)' },
              { value: 'Q4', label: 'Q4 (75-100%)' }
            ]}
            onChange={(value) => setSearchState(prev => ({ ...prev, quartile: value }))}
          />

          <div className="sort-control">
            <label className="academic-caption text-academic-slate-600 block mb-2">
              Sort Results
            </label>
            <SortSelect
              value={sortOption}
              onChange={(option) => {
                setSortOption(option)
                onSort(option)
              }}
              options={[
                { field: 'year', direction: 'desc', label: 'Year (Newest)' },
                { field: 'year', direction: 'asc', label: 'Year (Oldest)' },
                { field: 'citations', direction: 'desc', label: 'Citations (Most)' },
                { field: 'citations', direction: 'asc', label: 'Citations (Least)' },
                { field: 'title', direction: 'asc', label: 'Title (A-Z)' },
                { field: 'impactFactor', direction: 'desc', label: 'Impact Factor (High)' }
              ]}
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="advanced-filters border-t border-academic-slate-200 pt-6">
          <h4 className="academic-caption text-academic-slate-600 mb-4">
            Advanced Filters
          </h4>
          
          <div className="advanced-filter-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <YearRangeFilter
              label="Publication Year"
              value={searchState.year}
              onChange={(range) => setSearchState(prev => ({ ...prev, year: range }))}
              min={2000}
              max={new Date().getFullYear()}
            />

            <CitationRangeFilter
              label="Citation Count"
              value={searchState.citations}
              onChange={(range) => setSearchState(prev => ({ ...prev, citations: range }))}
              min={0}
              max={500}
            />

            <KeywordFilter
              label="Keywords"
              value={searchState.keywords}
              onChange={(keywords) => setSearchState(prev => ({ ...prev, keywords }))}
              availableKeywords={getUniqueKeywords(publications)}
            />
          </div>
        </div>

        {/* Search Summary & Actions */}
        <div className="search-summary flex items-center justify-between pt-4 border-t border-academic-slate-200">
          <div className="results-count">
            <span className="academic-body-sm text-academic-slate-600">
              Showing {publications.length} publications
            </span>
          </div>
          
          <div className="search-actions flex gap-3">
            <Button
              variant="academic-ghost"
              size="academic-sm"
              onClick={() => setSearchState({
                query: '',
                type: 'all',
                year: { from: 2010, to: new Date().getFullYear() },
                journal: 'all',
                status: 'all',
                quartile: 'all',
                citations: { min: 0, max: 1000 },
                keywords: [],
                author: ''
              })}
            >
              Clear All Filters
            </Button>
            
            <SavedSearchButton searchState={searchState} />
            
            <ExportButton publications={publications} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 Citation & Metrics Display

### P0 - Impact Visualization

#### Research Impact Dashboard
```typescript
// components/publications/impact-dashboard.tsx
const ImpactDashboard = ({ metrics, publications }: { 
  metrics: ResearchMetrics
  publications: Publication[] 
}) => {
  return (
    <section className="impact-dashboard academic-section-secondary">
      <div className="academic-container">
        <header className="dashboard-header text-center mb-12">
          <h2 className="academic-heading-2 text-primary-navy mb-4">
            Research Impact & Metrics
          </h2>
          <p className="academic-intro-text">
            Quantitative analysis of research output and scholarly influence
          </p>
        </header>
        
        <div className="metrics-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citation Analytics */}
          <Card variant="academic" className="citation-analytics">
            <CardHeader>
              <CardTitle variant="academic">Citation Analytics</CardTitle>
              <CardDescription variant="academic">
                Citation patterns and research impact over time
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="citation-chart mb-6">
                <CitationTimelineChart 
                  data={metrics.citationsByYear}
                  height={300}
                />
              </div>
              
              <div className="citation-metrics grid grid-cols-2 gap-4">
                <MetricCard
                  value={metrics.totalCitations}
                  label="Total Citations"
                  icon={<Quote className="w-5 h-5" />}
                  trend={`+${metrics.citationsThisYear} this year`}
                />
                <MetricCard
                  value={metrics.hIndex}
                  label="h-index"
                  icon={<TrendingUp className="w-5 h-5" />}
                  trend={`${metrics.hIndexPercentile}th percentile`}
                />
                <MetricCard
                  value={metrics.i10Index}
                  label="i10-index"
                  icon={<BarChart className="w-5 h-5" />}
                  trend="10+ citations each"
                />
                <MetricCard
                  value={metrics.averageCitationsPerPaper}
                  label="Avg Citations/Paper"
                  icon={<Calculator className="w-5 h-5" />}
                  precision={1}
                />
              </div>
            </CardContent>
          </Card>

          {/* Publication Analytics */}
          <Card variant="academic" className="publication-analytics">
            <CardHeader>
              <CardTitle variant="academic">Publication Analytics</CardTitle>
              <CardDescription variant="academic">
                Publication output and quality metrics
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="publication-chart mb-6">
                <PublicationTimelineChart 
                  data={metrics.publicationsByYear}
                  height={300}
                />
              </div>
              
              <div className="publication-metrics grid grid-cols-2 gap-4">
                <MetricCard
                  value={publications.length}
                  label="Total Publications"
                  icon={<FileText className="w-5 h-5" />}
                  trend={`${getPublicationsThisYear(publications)} this year`}
                />
                <MetricCard
                  value={metrics.averageImpactFactor}
                  label="Avg Impact Factor"
                  icon={<Star className="w-5 h-5" />}
                  precision={2}
                />
                <MetricCard
                  value={metrics.topQuartileCount}
                  label="Q1 Publications"
                  icon={<Trophy className="w-5 h-5" />}
                  trend="Top 25% journals"
                />
                <MetricCard
                  value={metrics.internationalCollaborations}
                  label="International Collabs"
                  icon={<Globe className="w-5 h-5" />}
                  trend="Multi-country"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Areas Analytics */}
        <div className="research-areas mt-12">
          <Card variant="academic">
            <CardHeader>
              <CardTitle variant="academic">Research Areas & Keywords</CardTitle>
              <CardDescription variant="academic">
                Most frequent research topics and keyword trends
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="areas-visualization grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="keyword-cloud">
                  <h4 className="academic-caption text-academic-slate-600 mb-4">
                    Research Keywords Cloud
                  </h4>
                  <KeywordCloud 
                    keywords={getKeywordFrequency(publications)}
                    maxKeywords={30}
                  />
                </div>
                
                <div className="research-areas-chart">
                  <h4 className="academic-caption text-academic-slate-600 mb-4">
                    Publication Distribution by Area
                  </h4>
                  <ResearchAreasChart 
                    data={getResearchAreaDistribution(publications)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
```

---

## 📱 Mobile Research Access

### P0 - Mobile-First Academic Design

#### Touch-Optimized Publication Browsing
```css
/* Mobile-optimized publications page styles */
@media (max-width: 768px) {
  .advanced-search {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }
  
  .search-controls {
    gap: var(--spacing-lg);
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .advanced-filter-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .publication-card {
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-lg);
  }
  
  .publication-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .publication-badges {
    flex-direction: row;
    gap: var(--spacing-sm);
  }
  
  .publication-metrics {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .citation-formats {
    padding: var(--spacing-md);
  }
  
  .impact-dashboard .metrics-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .areas-visualization {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}

/* Touch-friendly interactions */
.touch-device .publication-card {
  min-height: 60px;
}

.touch-device .search-button,
.touch-device .filter-button {
  min-height: 48px;
  min-width: 48px;
}

.touch-device .citation-copy-button {
  min-height: 44px;
  padding: var(--spacing-md);
}
```

#### Mobile Citation Tools
```typescript
// components/publications/mobile-citation-tools.tsx
const MobileCitationTools = ({ publication }: { publication: Publication }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)

  const citationFormats = {
    apa: generateAPACitation(publication),
    mla: generateMLACitation(publication),
    chicago: generateChicagoCitation(publication),
    bibtex: generateBibTexCitation(publication)
  }

  const handleCopy = async (format: string, citation: string) => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = citation
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    }
  }

  return (
    <div className="mobile-citation-tools">
      <Button
        variant="academic-ghost"
        size="academic-sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <span>Citation Formats</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="citation-options mt-3 space-y-3 p-4 bg-academic-slate-50 rounded-lg">
          {Object.entries(citationFormats).map(([format, citation]) => (
            <div key={format} className="citation-item">
              <div className="flex items-center justify-between mb-2">
                <span className="academic-caption text-academic-slate-600 uppercase">
                  {format}
                </span>
                <Button
                  variant="academic-ghost"
                  size="academic-sm"
                  onClick={() => handleCopy(format, citation)}
                  className={copiedFormat === format ? 'text-academic-green' : ''}
                >
                  {copiedFormat === format ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="academic-body-sm text-academic-slate-700 bg-white p-3 rounded border border-academic-slate-200">
                {citation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## ♿ Academic Accessibility

### P0 - Scholarly Content Accessibility

#### Screen Reader Optimized Publications
```typescript
// Enhanced accessibility for publication content
const AccessiblePublicationCard = ({ publication }: { publication: Publication }) => {
  return (
    <Card
      variant="academic-publication"
      role="article"
      aria-labelledby={`pub-${publication.id}-title`}
      aria-describedby={`pub-${publication.id}-meta`}
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle 
          id={`pub-${publication.id}-title`}
          variant="academic-large"
        >
          {publication.title}
        </CardTitle>
        
        <div id={`pub-${publication.id}-meta`}>
          <p className="sr-only">
            Published in {publication.journal} in {publication.year}. 
            Authors: {publication.authors.join(', ')}. 
            This publication has been cited {publication.citations} times.
            {publication.quartile && ` Published in a ${publication.quartile} journal.`}
          </p>
          
          <div className="visible-meta" aria-hidden="true">
            <AuthorsList authors={publication.authors} />
            <PublicationMeta publication={publication} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div role="region" aria-labelledby={`pub-${publication.id}-abstract`}>
          <h4 id={`pub-${publication.id}-abstract`} className="sr-only">
            Abstract for {publication.title}
          </h4>
          <p className="academic-body">{publication.abstract}</p>
        </div>
        
        {publication.keywords.length > 0 && (
          <div role="region" aria-labelledby={`pub-${publication.id}-keywords`}>
            <h4 id={`pub-${publication.id}-keywords`} className="academic-caption mb-2">
              Keywords
            </h4>
            <ul className="keywords-list flex flex-wrap gap-2" role="list">
              {publication.keywords.map((keyword, index) => (
                <li key={index} role="listitem">
                  <Badge variant="field-primary" size="sm">
                    {keyword}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## 🚀 Performance for Scholars

### P1 - Academic Performance Optimization

#### Virtualized Publication Lists
```typescript
// Performance optimization for large publication lists
const VirtualizedPublicationList = ({ 
  publications, 
  itemHeight = 280,
  overscan = 5 
}: {
  publications: Publication[]
  itemHeight?: number
  overscan?: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(600)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + overscan,
    publications.length
  )

  const visibleItems = publications.slice(
    Math.max(0, visibleStart - overscan),
    visibleEnd
  )

  const totalHeight = publications.length * itemHeight
  const offsetY = Math.max(0, (visibleStart - overscan) * itemHeight)

  return (
    <div 
      ref={containerRef}
      className="virtualized-list"
      style={{ height: '600px', overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            width: '100%'
          }}
        >
          {visibleItems.map((publication, index) => (
            <div 
              key={publication.id}
              style={{ height: itemHeight }}
              className="publication-item"
            >
              <PublicationCard 
                publication={publication}
                priority="standard"
                view="compact"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 Success Metrics

### Design Principle Adherence
- **Scholarly Authority**: Professional presentation of academic credentials
- **Functionality**: Advanced search, filtering, and citation tools
- **Clarity**: Clear publication hierarchy and research impact visualization
- **Accessibility**: WCAG 2.1 AA compliance for academic content
- **User-Centered Design**: Optimized for researchers, students, and academic audiences

### Performance Targets
- **Search Performance**: < 200ms for filtered results
- **Citation Generation**: < 100ms for any format
- **Mobile Load Time**: < 2.5 seconds on 3G networks
- **Large Dataset Handling**: Smooth scrolling with 100+ publications

### Academic Goals
- **Research Discoverability**: 90% improvement in publication findability
- **Citation Accuracy**: 100% accurate citation generation
- **Mobile Academic Usage**: 60% increase in mobile research access
- **Scholar Engagement**: 45% increase in publication downloads

---

## 🏁 Implementation Priority

### Phase 1 (Week 1): Foundation
- [ ] Implement publication categorization
- [ ] Create detailed publication cards
- [ ] Add basic search and filtering
- [ ] Mobile-responsive design

### Phase 2 (Week 2): Advanced Features
- [ ] Advanced search interface
- [ ] Citation tools and formats
- [ ] Impact metrics dashboard
- [ ] Accessibility enhancements

### Phase 3 (Week 3): Optimization
- [ ] Performance optimization
- [ ] Virtualized lists for large datasets
- [ ] Advanced analytics visualization
- [ ] Comprehensive testing

**Files Modified**: `app/publications/page.tsx`, `components/publications/*`, `app/globals.css`
**Dependencies**: `react-window` (virtualization), `recharts` (charts), `d3` (keyword cloud)
**Testing**: Academic usability testing, mobile testing, accessibility audit 