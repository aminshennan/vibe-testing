import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import PublicationPage, { generateMetadata, generateStaticParams } from '@/app/publications/[id]/page'

// Mock Next.js functions
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

// Mock publications data functions
jest.mock('@/lib/publications-data', () => ({
  getAllPublications: jest.fn(() => [
    { id: 'test-publication-1', title: 'Test Publication 1' },
    { id: 'test-publication-2', title: 'Test Publication 2' },
    { id: 'cognitive-load-study', title: 'Cognitive Load Study' },
  ]),
  getPublicationById: jest.fn((id: string) => {
    const publications = {
      'cognitive-load-study': {
        id: 'cognitive-load-study',
        title: 'Cognitive Load Theory and Its Application in Educational Technology',
        authors: ['Dr. Sarah Mitchell', 'Dr. John Anderson'],
        publicationDate: '2023-05-15',
        abstract: 'This study investigates the relationship between cognitive load and learning efficiency in digital educational environments.',
        keywords: ['cognitive load', 'educational technology', 'learning efficiency'],
        researchArea: 'Educational Psychology',
        type: 'journal',
        journal: 'Journal of Educational Psychology',
        volume: '115',
        issue: '3',
        pages: '245-262',
        year: '2023',
        doi: '10.1037/edu0000789',
        impactFactor: '4.2',
        citations: 12,
        downloads: 234,
        status: 'published',
      },
      'conference-presentation': {
        id: 'conference-presentation',
        title: 'Memory Systems in Learning: A Neural Network Approach',
        authors: ['Dr. Sarah Mitchell', 'Dr. Emily Chen'],
        publicationDate: '2023-08-20',
        abstract: 'An investigation into memory systems using neural network modeling techniques.',
        keywords: ['memory systems', 'neural networks', 'computational modeling'],
        researchArea: 'Cognitive Neuroscience',
        type: 'conference',
        conference: 'International Conference on Cognitive Science',
        location: 'San Francisco, CA',
        month: 'August',
        presentationType: 'Oral Presentation',
        year: '2023',
        citations: 5,
        downloads: 89,
        status: 'published',
      },
      'book-chapter': {
        id: 'book-chapter',
        title: 'Attention and Focus in Modern Learning Environments',
        authors: ['Dr. Sarah Mitchell'],
        publicationDate: '2023-03-10',
        abstract: 'A comprehensive review of attention mechanisms in contemporary educational settings.',
        keywords: ['attention', 'focus', 'learning environments'],
        researchArea: 'Educational Psychology',
        type: 'book-chapter',
        bookTitle: 'Handbook of Educational Psychology',
        publisher: 'Academic Press',
        pages: '123-145',
        isbn: '978-0123456789',
        year: '2023',
        citations: 8,
        downloads: 156,
        status: 'published',
      },
      'preprint': {
        id: 'preprint',
        title: 'Neural Mechanisms of Working Memory: A Preprint Study',
        authors: ['Dr. Sarah Mitchell', 'Dr. Patricia Kuhl'],
        publicationDate: '2024-01-15',
        abstract: 'Investigating neural mechanisms underlying working memory processes.',
        keywords: ['working memory', 'neural mechanisms', 'fMRI'],
        researchArea: 'Cognitive Neuroscience',
        type: 'preprint',
        institution: 'UC Berkeley',
        targetJournal: 'Nature Neuroscience',
        status: 'under review',
        lastUpdated: '2024-01-15',
        year: '2024',
        citations: 0,
        downloads: 45,
      },
    }
    return publications[id] || null
  }),
  formatAPACitation: jest.fn((publication: any) => {
    return `${publication.authors.join(', ')} (${publication.year}). ${publication.title}. Journal of Testing, 1(1), 1-10.`
  }),
}))

// Mock SEO functions
jest.mock('@/lib/seo', () => ({
  generatePageMetadata: jest.fn((options: any) => ({
    title: options.title,
    description: options.description,
  })),
  generatePublicationStructuredData: jest.fn(() => ({
    '@type': 'ScholarlyArticle',
    headline: 'Test Publication',
  })),
  generateBreadcrumbStructuredData: jest.fn(() => ({
    '@type': 'BreadcrumbList',
    itemListElement: [],
  })),
}))

// Mock publication detail client component
jest.mock('@/components/publication-detail-client', () => ({
  PublicationDetailClient: ({ publication, apaCitation, bibTeX }: any) => (
    <div data-testid="publication-detail-client">
      <div data-testid="publication-title">{publication.title}</div>
      <div data-testid="apa-citation">{apaCitation}</div>
      <div data-testid="bibtex-citation">{bibTeX}</div>
    </div>
  ),
}))

describe('Publications Detail Page', () => {
  // Mock params for different test scenarios
  const mockParamsJournal = Promise.resolve({ id: 'cognitive-load-study' })
  const mockParamsConference = Promise.resolve({ id: 'conference-presentation' })
  const mockParamsBook = Promise.resolve({ id: 'book-chapter' })
  const mockParamsPreprint = Promise.resolve({ id: 'preprint' })
  const mockParamsNotFound = Promise.resolve({ id: 'non-existent' })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Static Generation Functions', () => {
    it('generates static params correctly', async () => {
      const params = await generateStaticParams()
      
      expect(params).toEqual([
        { id: 'test-publication-1' },
        { id: 'test-publication-2' },
        { id: 'cognitive-load-study' },
      ])
    })

    it('generates metadata for existing publication', async () => {
      const metadata = await generateMetadata({ params: mockParamsJournal })
      
      expect(metadata).toEqual({
        title: 'Cognitive Load Theory and Its Application in Educational Technology',
        description: 'This study investigates the relationship between cognitive load and learning efficiency in digital educational environments.',
      })
    })

    it('generates not found metadata for non-existent publication', async () => {
      try {
        await generateMetadata({ params: { id: 'non-existent' } })
      } catch {
        // Expected error for non-existent publication
      }
    })
  })

  describe('Page Structure and Header', () => {
    it('renders publication page with proper structure for journal article', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveClass('min-h-screen')

      // Check publication title
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Cognitive Load Theory and Its Application in Educational Technology')
    })

    it('displays publication authors and year', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      expect(screen.getByText('Dr. Sarah Mitchell, Dr. John Anderson')).toBeInTheDocument()
      expect(screen.getByText('2023')).toBeInTheDocument()
    })

    it('displays publication keywords as badges', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      expect(screen.getByText('cognitive load')).toBeInTheDocument()
      expect(screen.getByText('educational technology')).toBeInTheDocument()
      expect(screen.getByText('learning efficiency')).toBeInTheDocument()
    })

    it('has proper background pattern and styling', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check for academic background pattern
      const backgroundPattern = document.querySelector('.fixed.inset-0')
      expect(backgroundPattern).toBeInTheDocument()

      // Check for academic containers
      const container = document.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Publication Details Section', () => {
    it('displays journal article details correctly', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      expect(screen.getByText('Publication Details')).toBeInTheDocument()
      expect(screen.getByText('Educational Psychology')).toBeInTheDocument()
      
      // Journal-specific fields
      expect(screen.getByText('Journal:')).toBeInTheDocument()
      expect(screen.getByText('Journal of Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText('Volume/Issue:')).toBeInTheDocument()
      expect(screen.getByText('115(3)')).toBeInTheDocument()
      expect(screen.getByText('Pages:')).toBeInTheDocument()
      expect(screen.getByText('245-262')).toBeInTheDocument()
      expect(screen.getByText('Impact Factor:')).toBeInTheDocument()
      expect(screen.getByText('4.2')).toBeInTheDocument()
    })

    it('displays conference paper details correctly', async () => {
      render(await PublicationPage({ params: mockParamsConference }))

      expect(screen.getByText('Publication Details')).toBeInTheDocument()
      expect(screen.getByText('Cognitive Neuroscience')).toBeInTheDocument()
      
      // Conference-specific fields
      expect(screen.getByText('Conference:')).toBeInTheDocument()
      expect(screen.getByText('International Conference on Cognitive Science')).toBeInTheDocument()
      expect(screen.getByText('Location:')).toBeInTheDocument()
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
      expect(screen.getByText('Month:')).toBeInTheDocument()
      expect(screen.getByText('August')).toBeInTheDocument()
      expect(screen.getByText('Type:')).toBeInTheDocument()
      expect(screen.getByText('Oral Presentation')).toBeInTheDocument()
    })

    it('displays book chapter details correctly', async () => {
      render(await PublicationPage({ params: mockParamsBook }))

      expect(screen.getByText('Publication Details')).toBeInTheDocument()
      
      // Book-specific fields
      expect(screen.getByText('Book:')).toBeInTheDocument()
      expect(screen.getByText('Handbook of Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText('Publisher:')).toBeInTheDocument()
      expect(screen.getByText('Academic Press')).toBeInTheDocument()
      expect(screen.getByText('Pages:')).toBeInTheDocument()
      expect(screen.getByText('123-145')).toBeInTheDocument()
      expect(screen.getByText('ISBN:')).toBeInTheDocument()
      expect(screen.getByText('978-0123456789')).toBeInTheDocument()
    })

    it('displays preprint details correctly', async () => {
      render(await PublicationPage({ params: mockParamsPreprint }))

      expect(screen.getByText('Publication Details')).toBeInTheDocument()
      
      // Preprint-specific fields
      expect(screen.getByText('Institution:')).toBeInTheDocument()
      expect(screen.getByText('UC Berkeley')).toBeInTheDocument()
      expect(screen.getByText('Target Journal:')).toBeInTheDocument()
      expect(screen.getByText('Nature Neuroscience')).toBeInTheDocument()
      expect(screen.getByText('Status:')).toBeInTheDocument()
      expect(screen.getByText('under review')).toBeInTheDocument()
      expect(screen.getByText('Last Updated:')).toBeInTheDocument()
    })
  })

  describe('Client-side Components', () => {
    it('renders publication detail client component with correct props', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      const clientComponent = screen.getByTestId('publication-detail-client')
      expect(clientComponent).toBeInTheDocument()

      // Check that publication data is passed correctly
      const titleElement = screen.getByTestId('publication-title')
      expect(titleElement).toHaveTextContent('Cognitive Load Theory and Its Application in Educational Technology')

      // Check that citations are generated and passed
      const apaCitation = screen.getByTestId('apa-citation')
      expect(apaCitation).toBeInTheDocument()

      const bibtexCitation = screen.getByTestId('bibtex-citation')
      expect(bibtexCitation).toBeInTheDocument()
    })
  })

  describe('SEO and Structured Data', () => {
    it('includes structured data script for SEO', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check that structured data script is present
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]')
      expect(structuredDataScript).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('calls notFound for non-existent publication', async () => {
      const { notFound } = jest.requireMock('next/navigation')
      
      // This should call notFound() and not render content
      try {
        await PublicationPage({ params: mockParamsNotFound })
      } catch {
        // Expected behavior - component calls notFound()
      }
      
      expect(notFound).toHaveBeenCalled()
    })
  })

  describe('Publication Types Coverage', () => {
    it('handles all publication types correctly', async () => {
      // Test each publication type in separate test components to avoid conflicts
      
      // Test journal article
      const { unmount: unmountJournal } = render(await PublicationPage({ params: mockParamsJournal }))
      expect(screen.getByText('Journal of Educational Psychology')).toBeInTheDocument()
      unmountJournal()

      // Test conference paper
      const { unmount: unmountConference } = render(await PublicationPage({ params: mockParamsConference }))
      expect(screen.getByText('International Conference on Cognitive Science')).toBeInTheDocument()
      unmountConference()

      // Test book chapter
      const { unmount: unmountBook } = render(await PublicationPage({ params: mockParamsBook }))
      expect(screen.getByText('Handbook of Educational Psychology')).toBeInTheDocument()
      unmountBook()

      // Test preprint
      render(await PublicationPage({ params: mockParamsPreprint }))
      expect(screen.getByText('UC Berkeley')).toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    it('displays comprehensive publication information', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check title and authors - use getAllByText for duplicates
      const titleElements = screen.getAllByText('Cognitive Load Theory and Its Application in Educational Technology')
      expect(titleElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('Dr. Sarah Mitchell, Dr. John Anderson')).toBeInTheDocument()

      // Check research area and keywords
      expect(screen.getByText('Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText('cognitive load')).toBeInTheDocument()

      // Check publication details
      expect(screen.getByText('Publication Details')).toBeInTheDocument()
    })

    it('displays proper academic formatting', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check that academic elements are present
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveClass('font-serif', 'text-primary-navy')

      // Check for proper card styling
      const cards = document.querySelectorAll('.bg-white\\/90')
      expect(cards.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility Features', () => {
    it('has proper heading hierarchy', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check that h1 exists
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent('Cognitive Load Theory and Its Application in Educational Technology')
    })

    it('uses semantic HTML elements', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check main landmark
      expect(screen.getByRole('main')).toBeInTheDocument()

      // Check that badges have proper styling
      const badges = document.querySelectorAll('.inline-flex.items-center.rounded-full')
      expect(badges.length).toBeGreaterThan(0)
    })

    it('provides proper text contrast and readability', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check that text uses academic color classes
      const titleElement = screen.getByRole('heading', { level: 1 })
      expect(titleElement).toHaveClass('text-primary-navy')

      // Check subtitle text styling
      const subtitleElements = document.querySelectorAll('.text-academic-slate-600')
      expect(subtitleElements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design', () => {
    it('has proper responsive styling classes', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toHaveClass('min-h-screen', 'bg-academic-slate-50')

      // Check for responsive container
      const container = document.querySelector('.container')
      expect(container).toBeInTheDocument()

      // Check for responsive grids
      const responsiveGrids = document.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4')
      expect(responsiveGrids.length).toBeGreaterThan(0)
    })

    it('displays proper responsive text sizing', async () => {
      render(await PublicationPage({ params: mockParamsJournal }))

      // Check responsive title sizing
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl')
    })
  })
}) 
 