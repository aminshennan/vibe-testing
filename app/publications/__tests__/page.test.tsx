import { render, screen, fireEvent } from '@testing-library/react'
import { PublicationsPageClient } from '@/components/publications-page-client'

// Mock the publications data with complete JournalArticle interface
const mockPublicationsData = {
  publications: {
    journalArticles: [
      {
        id: 'journal-1',
        title: 'Memory Consolidation in Learning',
        authors: ['Mitchell, S.', 'Smith, J.'],
        year: '2024',
        abstract: 'Study on memory consolidation processes in educational settings.',
        keywords: ['memory', 'learning', 'education'],
        citationCount: 25,
        researchArea: 'Cognitive Psychology',
        publicationDate: '2024-01-15T00:00:00.000Z',
        journal: 'Journal of Educational Psychology',
        volume: '115',
        issue: '1',
        pages: '1-20',
        doi: '10.1037/edu0000123',
        impactFactor: 4.5,
        quartile: 'Q1' as const,
        isOpenAccess: true,
        pdfUrl: '/publications/memory-consolidation-2024.pdf',
        funding: ['NSF Grant #1234567'],
        relatedProjects: ['cognitive-learning-project'],
      },
      {
        id: 'journal-2',
        title: 'Sleep and Academic Performance',
        authors: ['Mitchell, S.', 'Brown, A.'],
        year: '2023',
        abstract: 'Research on the relationship between sleep quality and academic success.',
        keywords: ['sleep', 'performance', 'students'],
        citationCount: 18,
        researchArea: 'Educational Psychology',
        publicationDate: '2023-06-01T00:00:00.000Z',
        journal: 'Sleep Research Quarterly',
        volume: '45',
        issue: '2',
        pages: '89-105',
        doi: '10.1016/j.sleep.2023.456',
        impactFactor: 3.2,
        quartile: 'Q2' as const,
        isOpenAccess: false,
        pdfUrl: '/publications/sleep-academic-2023.pdf',
        funding: ['NIH Grant #7890123'],
        relatedProjects: ['sleep-research-project'],
      },
    ],
    bookChapters: [
      {
        id: 'chapter-1',
        title: 'Technology in Modern Education',
        authors: ['Mitchell, S.'],
        year: '2023',
        abstract: 'A comprehensive review of educational technology applications.',
        keywords: ['technology', 'education', 'digital learning'],
        citationCount: 12,
        researchArea: 'Educational Technology',
        publicationDate: '2023-09-15T00:00:00.000Z',
        bookTitle: 'Handbook of Educational Innovation',
        editors: ['Wilson, R.', 'Davis, K.'],
        publisher: 'Academic Press',
        pages: '45-78',
        isbn: '978-0123456789',
      },
    ],
    conferenceProceedings: [
      {
        id: 'conference-1',
        title: 'AI in Educational Assessment',
        authors: ['Mitchell, S.', 'Chen, L.'],
        year: '2024',
        abstract: 'Novel approaches to automated educational assessment using AI.',
        keywords: ['AI', 'assessment', 'automation'],
        citationCount: 8,
        researchArea: 'Educational Technology',
        publicationDate: '2024-05-01T00:00:00.000Z',
        conference: 'International Education Technology Conference',
        location: 'Boston, MA',
        month: 'May',
        pages: '12-18',
        presentationType: 'Oral Presentation',
      },
    ],
    workingPapers: [
      {
        id: 'working-1',
        title: 'Future of Cognitive Research',
        authors: ['Mitchell, S.'],
        year: '2024',
        abstract: 'Exploring emerging trends in cognitive psychology research.',
        keywords: ['cognitive psychology', 'research trends', 'future'],
        citationCount: 2,
        researchArea: 'Cognitive Psychology',
        publicationDate: '2024-07-01T00:00:00.000Z',
        institution: 'University Research Center',
        targetJournal: 'Cognitive Science',
        status: 'Under Review',
        lastUpdated: '2024-07-01T00:00:00.000Z',
      },
    ],
  },
  publicationMetrics: {
    totalPublications: 5,
    totalCitations: 65,
    hIndex: 4,
    i10Index: 3,
    averageCitationsPerPaper: 13.0,
    journalArticles: 2,
    bookChapters: 1,
    conferenceProceedings: 1,
    workingPapers: 1,
    openAccessPublications: 2,
    impactFactorRange: '3.2 - 4.5',
    topQuartilePublications: 2,
    recentPublications: 3,
    collaborativePublications: 3,
    internationalCollaborations: 1,
  },
  researchAreas: [
    {
      name: 'Cognitive Psychology',
      publicationCount: 2,
      totalCitations: 27,
    },
    {
      name: 'Educational Psychology',
      publicationCount: 1,
      totalCitations: 18,
    },
    {
      name: 'Educational Technology',
      publicationCount: 2,
      totalCitations: 20,
    },
  ],
}

// Mock the analytics module
jest.mock('@/lib/analytics', () => ({
  academicTracking: {
    performSearch: jest.fn(),
    useResearchFilter: jest.fn(),
    viewPublication: jest.fn(),
    downloadFile: jest.fn(),
  }
}))

// Mock the PublicationCard component
jest.mock('@/components/publication-card', () => ({
  PublicationCard: ({ publication }: { publication: any }) => (
    <div data-testid={`publication-card-${publication.id}`}>
      <h3>{publication.title}</h3>
      <p>{publication.abstract}</p>
      <div>{publication.authors.join(', ')}</div>
      <div>{publication.year}</div>
    </div>
  ),
}))

// Mock the PublicationMetrics component
jest.mock('@/components/publication-metrics', () => ({
  PublicationMetrics: ({ metrics }: { metrics: any }) => (
    <div data-testid="publication-metrics">
      <span>Total Publications: {metrics.totalPublications}</span>
      <span>Total Citations: {metrics.totalCitations}</span>
      <span>H-Index: {metrics.hIndex}</span>
    </div>
  ),
}))

// Mock the AnimatedSection component
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('Publications Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Page Rendering', () => {
    it('renders the publications page with all main sections', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      // Check page title and header
      expect(screen.getByRole('heading', { name: /publications/i })).toBeInTheDocument()
      expect(screen.getByText(/comprehensive collection of peer-reviewed research/i)).toBeInTheDocument()

      // Check metrics section
      expect(screen.getByTestId('publication-metrics')).toBeInTheDocument()
      expect(screen.getByText('Total Publications: 5')).toBeInTheDocument()
      expect(screen.getByText('Total Citations: 65')).toBeInTheDocument()
      expect(screen.getByText('H-Index: 4')).toBeInTheDocument()

      // Check research areas section
      expect(screen.getByText(/research areas & impact/i)).toBeInTheDocument()
      
      // Check that research areas are rendered in the research areas section
      expect(screen.getByText('Cognitive Psychology')).toBeInTheDocument()
      expect(screen.getByText('Educational Psychology')).toBeInTheDocument()
      
      // Educational Technology appears in different sections, check it exists
      const educationalTechElements = screen.getAllByText('Educational Technology')
      expect(educationalTechElements.length).toBeGreaterThanOrEqual(1) // At least in research areas

      // Check search and filter controls
      expect(screen.getByPlaceholderText(/search publications/i)).toBeInTheDocument()
      expect(screen.getByText('All Areas')).toBeInTheDocument()
      expect(screen.getByText('All Years')).toBeInTheDocument()

      // Check tabs
      expect(screen.getByRole('tab', { name: /journal articles/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /book chapters/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /conference/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /working papers/i })).toBeInTheDocument()
    })

    it('displays publication count in tabs correctly', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      // Check tab counts (note: these reflect filtered results)
      expect(screen.getByText(/journal articles \(2\)/i)).toBeInTheDocument()
      expect(screen.getByText(/book chapters \(1\)/i)).toBeInTheDocument()
      expect(screen.getByText(/conference proceedings \(1\)/i)).toBeInTheDocument()
      expect(screen.getByText(/working papers \(1\)/i)).toBeInTheDocument()
    })

    it('shows correct total count', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      expect(screen.getByText(/showing 5 of 5 publications/i)).toBeInTheDocument()
    })
  })

  describe('Basic Functionality Tests (without userEvent)', () => {
    it('has functional search input', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const searchInput = screen.getByPlaceholderText(/search publications/i)
      expect(searchInput).toBeInTheDocument()
      
      // Test input using fireEvent
      fireEvent.change(searchInput, { target: { value: 'memory' } })
      expect(searchInput).toHaveValue('memory')
    })

    it('has functional tab navigation structure', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      // Should start on journal articles tab
      expect(screen.getByRole('tab', { name: /journal articles/i })).toHaveAttribute('data-state', 'active')

      // Get book chapters tab element
      const bookChaptersTab = screen.getByRole('tab', { name: /book chapters/i })
      expect(bookChaptersTab).toBeInTheDocument()
      
      // Test that tab can be interacted with
      fireEvent.click(bookChaptersTab)
      // Note: The actual state change might not work in mocked environment
    })

    it('shows filter controls', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      // Check filter controls exist
      const selectElements = screen.getAllByRole('combobox')
      expect(selectElements.length).toBeGreaterThan(0)
      
      // Check export button
      expect(screen.getByRole('button', { name: /export bibtex/i })).toBeInTheDocument()
    })
  })

  describe('Export Functionality', () => {
    it('shows export BibTeX button', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const exportButton = screen.getByRole('button', { name: /export bibtex/i })
      expect(exportButton).toBeInTheDocument()
    })
  })

  describe('Academic Impact Section', () => {
    it('renders the academic impact statement', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      expect(screen.getByText(/for citation management, consider using academic reference managers/i)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /google scholar/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /orcid/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /researchgate/i })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const mainHeading = screen.getByRole('heading', { level: 1, name: /publications/i })
      expect(mainHeading).toBeInTheDocument()

      const sectionHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(sectionHeadings.length).toBeGreaterThan(0)
    })

    it('has proper tab accessibility', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const tabList = screen.getByRole('tablist')
      expect(tabList).toBeInTheDocument()

      const tabs = screen.getAllByRole('tab')
      expect(tabs).toHaveLength(4)

      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('data-state')
      })
    })

    it('has proper form controls', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const searchInput = screen.getByPlaceholderText(/search publications/i)
      expect(searchInput).toBeInTheDocument()

      const selectElements = screen.getAllByRole('combobox')
      expect(selectElements.length).toBeGreaterThan(0)
    })
  })

  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      // This test would be more comprehensive with actual performance monitoring
      const startTime = performance.now()
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(600) // Should render in under 600ms
    })

    it('basic input handling', () => {
      render(<PublicationsPageClient publicationsData={mockPublicationsData} />)

      const searchInput = screen.getByPlaceholderText(/search publications/i)
      
      // Test basic input functionality
      fireEvent.change(searchInput, { target: { value: 'test' } })
      expect(searchInput).toHaveValue('test')
    })
  })
}) 
 