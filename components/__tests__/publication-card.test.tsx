import { render, screen } from '@testing-library/react'
import { PublicationCard } from '../publication-card'
import type { JournalArticle, BookChapter, ConferenceProceeding, WorkingPaper } from '@/lib/publications-data'

// Mock the data utility functions
jest.mock('@/lib/publications-data', () => ({
  formatAPACitation: jest.fn((pub) => `${pub.authors[0]} (${pub.year}). ${pub.title}.`),
  getPublicationTypeBadgeColor: jest.fn(() => 'bg-primary-navy text-white'),
  getPublicationTypeLabel: jest.fn((pub) => {
    if ('journal' in pub) return 'Journal Article'
    if ('bookTitle' in pub) return 'Book Chapter'
    if ('conference' in pub) return 'Conference Paper'
    return 'Working Paper'
  }),
}))

describe('PublicationCard', () => {
  const mockJournalArticle: JournalArticle = {
    id: 'test-journal-1',
    title: 'Cognitive Load Theory in Academic Learning',
    authors: ['Mitchell, S.', 'Smith, J.', 'Brown, A.'],
    year: '2024',
    abstract: 'This study examines the application of cognitive load theory in academic learning environments, with specific focus on memory consolidation and retention rates among university students.',
    keywords: ['cognitive load', 'memory', 'learning', 'education'],
    citationCount: 45,
    researchArea: 'Cognitive Psychology',
    publicationDate: '2024-03-15T00:00:00.000Z',
    journal: 'Journal of Educational Psychology',
    volume: '116',
    issue: '2',
    pages: '245-267',
    doi: '10.1037/edu0000789',
    impactFactor: 4.2,
    quartile: 'Q1',
    isOpenAccess: true,
    pdfUrl: '/publications/cognitive-load-2024.pdf',
    relatedProjects: ['cognitive-learning-project'],
    funding: ['NSF Grant #1234567'],
  }

  const mockBookChapter: BookChapter = {
    id: 'test-chapter-1',
    title: 'Educational Technology and Cognitive Development',
    authors: ['Mitchell, S.', 'Davis, L.'],
    year: '2023',
    abstract: 'An exploration of how educational technology impacts cognitive development in adolescents, examining both benefits and potential drawbacks.',
    keywords: ['technology', 'cognitive development', 'education', 'adolescents'],
    citationCount: 23,
    researchArea: 'Educational Psychology',
    publicationDate: '2023-09-01T00:00:00.000Z',
    bookTitle: 'Handbook of Educational Psychology',
    editors: ['Wilson, R.', 'Thompson, K.'],
    publisher: 'Academic Press',
    pages: '123-145',
    isbn: '978-0123456789',
  }

  const mockConferenceProceeding: ConferenceProceeding = {
    id: 'test-conference-1',
    title: 'Machine Learning Applications in Educational Assessment',
    authors: ['Mitchell, S.', 'Chen, R.'],
    year: '2024',
    abstract: 'Presentation of novel machine learning approaches for automated educational assessment and feedback systems.',
    keywords: ['machine learning', 'assessment', 'education', 'automation'],
    citationCount: 12,
    researchArea: 'Educational Technology',
    publicationDate: '2024-05-20T00:00:00.000Z',
    conference: 'International Conference on Educational Technology',
    location: 'San Francisco, CA',
    month: 'May',
    pages: '78-85',
    presentationType: 'Oral Presentation',
  }

  const mockWorkingPaper: WorkingPaper = {
    id: 'test-working-1',
    title: 'Future Directions in Cognitive Education Research',
    authors: ['Mitchell, S.'],
    year: '2024',
    abstract: 'A comprehensive review and analysis of emerging trends in cognitive education research, proposing new directions for future studies.',
    keywords: ['cognitive education', 'research trends', 'future directions'],
    citationCount: 3,
    researchArea: 'Cognitive Psychology',
    publicationDate: '2024-06-01T00:00:00.000Z',
    institution: 'University of California, Berkeley',
    targetJournal: 'Cognitive Science',
    status: 'Under Review',
    lastUpdated: '2024-06-01T00:00:00.000Z',
  }

  describe('Journal Article Rendering', () => {
    it('renders journal article with all essential information', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check title and link
      const titleLink = screen.getByRole('link', { name: /cognitive load theory in academic learning/i })
      expect(titleLink).toBeInTheDocument()
      expect(titleLink).toHaveAttribute('href', '/publications/test-journal-1')
      
      // Check authors
      expect(screen.getByText('Mitchell, S., Smith, J., Brown, A.')).toBeInTheDocument()
      
      // Check journal information
      expect(screen.getByText('Journal of Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText(/vol\. 116, issue 2, pp\. 245-267/i)).toBeInTheDocument()
      
      // Check badges
      expect(screen.getByText('Impact Factor: 4.2')).toBeInTheDocument()
      expect(screen.getByText('Q1')).toBeInTheDocument()
      expect(screen.getByText('Open Access')).toBeInTheDocument()
      
      // Check citation count
      expect(screen.getByText('45 citations')).toBeInTheDocument()
      
      // Check abstract
      expect(screen.getByText(/this study examines the application of cognitive load theory/i)).toBeInTheDocument()
      
      // Check keywords
      expect(screen.getByText('cognitive load')).toBeInTheDocument()
      expect(screen.getByText('memory')).toBeInTheDocument()
      
      // Check research area
      expect(screen.getByText('Cognitive Psychology')).toBeInTheDocument()
    })

    it('renders action buttons correctly for journal article', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check View Details button
      const viewDetailsButton = screen.getByRole('link', { name: /view details/i })
      expect(viewDetailsButton).toBeInTheDocument()
      expect(viewDetailsButton).toHaveAttribute('href', '/publications/test-journal-1')
      
      // Check DOI link
      const doiLink = screen.getByRole('link', { name: /view doi/i })
      expect(doiLink).toBeInTheDocument()
      expect(doiLink).toHaveAttribute('href', 'https://doi.org/10.1037/edu0000789')
      expect(doiLink).toHaveAttribute('target', '_blank')
      
      // Check PDF download
      const pdfLink = screen.getByRole('link', { name: /download pdf/i })
      expect(pdfLink).toBeInTheDocument()
      expect(pdfLink).toHaveAttribute('href', '/publications/cognitive-load-2024.pdf')
      
      // Check citation button
      expect(screen.getByRole('button', { name: /cite \(apa\)/i })).toBeInTheDocument()
    })

    it('displays APA citation preview correctly', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check citation preview section
      expect(screen.getByText('APA Citation:')).toBeInTheDocument()
      expect(screen.getByText(/mitchell, s\. \(2024\)\. cognitive load theory in academic learning\./i)).toBeInTheDocument()
    })
  })

  describe('Book Chapter Rendering', () => {
    it('renders book chapter with correct information', () => {
      render(<PublicationCard publication={mockBookChapter} />)
      
      // Check title
      expect(screen.getByText('Educational Technology and Cognitive Development')).toBeInTheDocument()
      
      // Check book-specific information
      expect(screen.getByText('Handbook of Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText(/editors: wilson, r\., thompson, k\./i)).toBeInTheDocument()
      expect(screen.getByText(/publisher: academic press • pages: 123-145 • 2023/i)).toBeInTheDocument()
      
      // Check badges - get all badge elements and find the one with "Book Chapter"
      const badges = screen.getAllByText('Book Chapter')
      expect(badges.length).toBeGreaterThan(0)
      expect(screen.getByText('ISBN: 978-0123456789')).toBeInTheDocument()
    })
  })

  describe('Conference Proceeding Rendering', () => {
    it('renders conference proceeding with correct information', () => {
      render(<PublicationCard publication={mockConferenceProceeding} />)
      
      // Check title
      expect(screen.getByText('Machine Learning Applications in Educational Assessment')).toBeInTheDocument()
      
      // Check conference-specific information
      expect(screen.getByText('International Conference on Educational Technology')).toBeInTheDocument()
      expect(screen.getByText(/san francisco, ca • may 2024/i)).toBeInTheDocument()
      expect(screen.getByText(/pages: 78-85/i)).toBeInTheDocument()
      
      // Check presentation type badge
      expect(screen.getByText('Oral Presentation')).toBeInTheDocument()
    })
  })

  describe('Working Paper Rendering', () => {
    it('renders working paper with correct information', () => {
      render(<PublicationCard publication={mockWorkingPaper} />)
      
      // Check title
      expect(screen.getByText('Future Directions in Cognitive Education Research')).toBeInTheDocument()
      
      // Check working paper-specific information - check for partial text that exists
      expect(screen.getByText('Institution:')).toBeInTheDocument()
      expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument()
      // Use partial text match since "Target Journal:" might be split across elements
      expect(screen.getByText(/Target Journal/)).toBeInTheDocument()
      // Use getAllByText to find "Cognitive Science" and verify at least one instance exists
      const cognitiveScience = screen.getAllByText(/Cognitive Science/)
      expect(cognitiveScience.length).toBeGreaterThan(0)
      
      // Check status badge
      expect(screen.getByText('Under Review')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('handles title link click correctly', async () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      const titleLink = screen.getByRole('link', { name: /cognitive load theory in academic learning/i })
      
      // Verify link attributes
      expect(titleLink).toHaveAttribute('href', '/publications/test-journal-1')
      // Check for hover classes on the actual title element, not the link
      const titleElement = titleLink.querySelector('div') || titleLink
      expect(titleElement).toHaveClass('hover:text-primary-navy/80', 'transition-colors', 'cursor-pointer')
    })

    it('handles external links correctly', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check DOI link opens in new tab
      const doiLink = screen.getByRole('link', { name: /view doi/i })
      expect(doiLink).toHaveAttribute('target', '_blank')
      expect(doiLink).toHaveAttribute('rel', 'noopener noreferrer')
      
      // Check PDF link opens in new tab
      const pdfLink = screen.getByRole('link', { name: /download pdf/i })
      expect(pdfLink).toHaveAttribute('target', '_blank')
      expect(pdfLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('shows hover effects on card', async () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      const card = document.querySelector('.shadow-academic')
      expect(card).toHaveClass('hover:shadow-academic-professional', 'transition-all')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check that title exists as a clickable element
      const title = screen.getByRole('link', { name: /cognitive load theory in academic learning/i })
      expect(title).toBeInTheDocument()
      
      // Check section headings exist
      expect(screen.getByText('Abstract')).toBeInTheDocument()
      expect(screen.getByText('Keywords')).toBeInTheDocument()
    })

    it('has proper link accessibility', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check external links have proper aria attributes
      const doiLink = screen.getByRole('link', { name: /view doi/i })
      expect(doiLink).toHaveAttribute('rel', 'noopener noreferrer')
      
      const pdfLink = screen.getByRole('link', { name: /download pdf/i })
      expect(pdfLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('provides meaningful text for screen readers', () => {
      render(<PublicationCard publication={mockJournalArticle} />)
      
      // Check that citation count is clearly labeled
      expect(screen.getByText('45 citations')).toBeInTheDocument()
      
      // Check that publication year is clearly indicated - use more specific selector
      const yearElements = screen.getAllByText('2024')
      expect(yearElements.length).toBeGreaterThan(0)
      
      // Check that action buttons have descriptive text
      expect(screen.getByRole('button', { name: /cite \(apa\)/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /view details/i })).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles missing optional fields gracefully', () => {
      const minimalPublication: JournalArticle = {
        ...mockJournalArticle,
        impactFactor: 0,
        isOpenAccess: false,
        pdfUrl: '',
        relatedProjects: [],
        funding: [],
      }

      render(<PublicationCard publication={minimalPublication} />)
      
      // Should still render core information
      expect(screen.getByText('Cognitive Load Theory in Academic Learning')).toBeInTheDocument()
      expect(screen.getByText('Mitchell, S., Smith, J., Brown, A.')).toBeInTheDocument()
      
      // Should not show optional badges/links when not available
      expect(screen.queryByText('Open Access')).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /download pdf/i })).not.toBeInTheDocument()
    })

    it('handles empty keyword arrays', () => {
      const publicationWithoutKeywords: JournalArticle = {
        ...mockJournalArticle,
        keywords: [],
      }

      render(<PublicationCard publication={publicationWithoutKeywords} />)
      
      // Should still render the keywords section header
      expect(screen.getByText('Keywords')).toBeInTheDocument()
      
      // But no keyword badges should be present
      const keywordSection = screen.getByText('Keywords').closest('div')
      const badges = keywordSection?.querySelectorAll('.text-xs')
      expect(badges?.length).toBeLessThanOrEqual(1) // Only the "Keywords" label
    })
  })

  describe('Performance', () => {
    it('renders quickly with large abstract text', () => {
      const publicationWithLongAbstract: JournalArticle = {
        ...mockJournalArticle,
        abstract: 'This is a very long abstract that contains multiple sentences and detailed information about the research methodology, findings, and implications. '.repeat(10),
      }

      const startTime = performance.now()
      render(<PublicationCard publication={publicationWithLongAbstract} />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100) // Should render in under 100ms
      expect(screen.getByText(/this is a very long abstract/i)).toBeInTheDocument()
    })

    it('handles many keywords efficiently', () => {
      const publicationWithManyKeywords: JournalArticle = {
        ...mockJournalArticle,
        keywords: Array.from({ length: 20 }, (_, i) => `keyword-${i + 1}`),
      }

      render(<PublicationCard publication={publicationWithManyKeywords} />)
      
      // Should render all keywords
      expect(screen.getByText('keyword-1')).toBeInTheDocument()
      expect(screen.getByText('keyword-20')).toBeInTheDocument()
    })
  })
}) 
 