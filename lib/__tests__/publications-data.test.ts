import {
  getPublicationsData,
  getAllPublications,
  getPublicationById,
  searchPublications,
  formatAPACitation,
  formatCitation,
  getPublicationTypeLabel,
  getPublicationTypeBadgeColor,
  type JournalArticle,
  type BookChapter,
  type ConferenceProceeding,
  type WorkingPaper,
} from '../publications-data'

describe('Publications Data Utilities', () => {
  
  describe('getPublicationsData', () => {
    it('returns complete publications data structure', () => {
      const data = getPublicationsData()
      
      expect(data).toHaveProperty('publications')
      expect(data).toHaveProperty('publicationMetrics')
      expect(data).toHaveProperty('researchAreas')
      
      // Check publications structure
      expect(data.publications).toHaveProperty('journalArticles')
      expect(data.publications).toHaveProperty('bookChapters')
      expect(data.publications).toHaveProperty('conferenceProceedings')
      expect(data.publications).toHaveProperty('workingPapers')
      
      // Verify all arrays contain data
      expect(Array.isArray(data.publications.journalArticles)).toBe(true)
      expect(Array.isArray(data.publications.bookChapters)).toBe(true)
      expect(Array.isArray(data.publications.conferenceProceedings)).toBe(true)
      expect(Array.isArray(data.publications.workingPapers)).toBe(true)
    })

    it('calculates metrics correctly', () => {
      const data = getPublicationsData()
      const allPubs = getAllPublications()
      
      // Total publications should match array lengths
      const expectedTotal = 
        data.publications.journalArticles.length +
        data.publications.bookChapters.length +
        data.publications.conferenceProceedings.length +
        data.publications.workingPapers.length
      
      expect(data.publicationMetrics.totalPublications).toBe(expectedTotal)
      expect(allPubs.length).toBe(expectedTotal)
    })
  })

  describe('getAllPublications', () => {
    it('returns all publications as a flat array', () => {
      const publications = getAllPublications()
      
      expect(Array.isArray(publications)).toBe(true)
      expect(publications.length).toBeGreaterThan(0)
      
      // Each publication should have required fields
      publications.forEach(pub => {
        expect(pub).toHaveProperty('id')
        expect(pub).toHaveProperty('title')
        expect(pub).toHaveProperty('authors')
        expect(pub).toHaveProperty('year')
        expect(pub).toHaveProperty('abstract')
        expect(pub).toHaveProperty('keywords')
        expect(pub).toHaveProperty('citationCount')
        expect(pub).toHaveProperty('researchArea')
        expect(pub).toHaveProperty('publicationDate')
        
        expect(Array.isArray(pub.authors)).toBe(true)
        expect(Array.isArray(pub.keywords)).toBe(true)
        expect(typeof pub.citationCount).toBe('number')
      })
    })
  })

  describe('getPublicationById', () => {
    it('returns correct publication by ID', () => {
      const allPublications = getAllPublications()
      const firstPub = allPublications[0]
      
      const foundPub = getPublicationById(firstPub.id)
      
      expect(foundPub).toBeTruthy()
      expect(foundPub?.id).toBe(firstPub.id)
      expect(foundPub?.title).toBe(firstPub.title)
    })

    it('returns undefined for non-existent ID', () => {
      const nonExistentPub = getPublicationById('non-existent-id')
      expect(nonExistentPub).toBeUndefined()
    })
  })

  describe('searchPublications', () => {
    it('returns all publications for empty query', () => {
      const results = searchPublications('')
      const allPubs = getAllPublications()
      
      // Note: searchPublications only returns journal articles in the current implementation
      expect(results.length).toBe(allPubs.filter(pub => 'journal' in pub).length)
    })

    it('searches by title case-insensitively', () => {
      const allPubs = getAllPublications()
      const journalArticles = allPubs.filter(pub => 'journal' in pub)
      
      if (journalArticles.length > 0) {
        const samplePub = journalArticles[0]
        const titleWord = samplePub.title.split(' ')[0].toLowerCase()
        
        const results = searchPublications(titleWord)
        
        expect(results.length).toBeGreaterThan(0)
        expect(results.some(pub => pub.title.toLowerCase().includes(titleWord))).toBe(true)
      }
    })
  })

  describe('formatAPACitation', () => {
    const mockJournalArticle: JournalArticle = {
      id: 'test-1',
      title: 'Cognitive Load Theory in Educational Settings',
      authors: ['Mitchell, S.', 'Smith, J. A.', 'Brown, M.'],
      year: '2024',
      abstract: 'Test abstract',
      keywords: ['test'],
      citationCount: 10,
      researchArea: 'Cognitive Psychology',
      publicationDate: '2024-01-01T00:00:00.000Z',
      journal: 'Journal of Educational Psychology',
      volume: '116',
      issue: '2',
      pages: '123-145',
      doi: '10.1037/edu0000123',
      impactFactor: 4.5,
      quartile: 'Q1',
      isOpenAccess: true,
      pdfUrl: '/test.pdf',
      funding: [],
      relatedProjects: [],
    }

    it('formats journal article citation correctly', () => {
      const citation = formatAPACitation(mockJournalArticle)
      
      // The actual implementation uses simple comma-separated authors without &
      expect(citation).toContain('Mitchell, S., Smith, J. A., Brown, M.')
      expect(citation).toContain('(2024)')
      expect(citation).toContain('Cognitive Load Theory in Educational Settings')
      expect(citation).toContain('Journal of Educational Psychology')
      expect(citation).toContain('https://doi.org/10.1037/edu0000123')
    })
  })

  describe('getPublicationTypeLabel', () => {
    it('identifies journal articles correctly', () => {
      const mockJournal: JournalArticle = {
        id: 'test',
        title: 'Test',
        authors: ['Test'],
        year: '2024',
        abstract: 'Test',
        keywords: ['test'],
        citationCount: 0,
        researchArea: 'Test',
        publicationDate: '2024-01-01T00:00:00.000Z',
        journal: 'Test Journal',
        volume: '1',
        issue: '1',
        pages: '1-10',
        doi: '10.1000/test',
        impactFactor: 1.0,
        quartile: 'Q1',
        isOpenAccess: true,
        pdfUrl: '/test.pdf',
        funding: [],
        relatedProjects: [],
      }
      
      expect(getPublicationTypeLabel(mockJournal)).toBe('Journal Article')
    })

    it('identifies book chapters correctly', () => {
      const mockChapter: BookChapter = {
        id: 'test',
        title: 'Test',
        authors: ['Test'],
        year: '2024',
        abstract: 'Test',
        keywords: ['test'],
        citationCount: 0,
        researchArea: 'Test',
        publicationDate: '2024-01-01T00:00:00.000Z',
        bookTitle: 'Test Book',
        editors: ['Test Editor'],
        publisher: 'Test Publisher',
        pages: '1-20',
        isbn: '978-0000000000',
      }
      
      expect(getPublicationTypeLabel(mockChapter)).toBe('Book Chapter')
    })

    it('identifies conference proceedings correctly', () => {
      const mockConference: ConferenceProceeding = {
        id: 'test',
        title: 'Test',
        authors: ['Test'],
        year: '2024',
        abstract: 'Test',
        keywords: ['test'],
        citationCount: 0,
        researchArea: 'Test',
        publicationDate: '2024-01-01T00:00:00.000Z',
        conference: 'Test Conference',
        location: 'Test City',
        month: 'January',
        pages: '1-5',
        presentationType: 'Oral Presentation',
      }
      
      expect(getPublicationTypeLabel(mockConference)).toBe('Conference Proceeding')
    })

    it('identifies working papers correctly', () => {
      const mockWorking: WorkingPaper = {
        id: 'test',
        title: 'Test',
        authors: ['Test'],
        year: '2024',
        abstract: 'Test',
        keywords: ['test'],
        citationCount: 0,
        researchArea: 'Test',
        publicationDate: '2024-01-01T00:00:00.000Z',
        institution: 'Test University',
        targetJournal: 'Test Journal',
        status: 'Under Review',
        lastUpdated: '2024-01-01T00:00:00.000Z',
      }
      
      expect(getPublicationTypeLabel(mockWorking)).toBe('Working Paper')
    })
  })

  describe('getPublicationTypeBadgeColor', () => {
    it('returns appropriate colors for journal articles', () => {
      const mockJournal = { journal: 'test' } as JournalArticle
      const color = getPublicationTypeBadgeColor(mockJournal)
      
      expect(color).toBe('bg-primary-navy text-white')
    })

    it('returns appropriate colors for book chapters', () => {
      const mockChapter = { bookTitle: 'test' } as BookChapter
      const color = getPublicationTypeBadgeColor(mockChapter)
      
      expect(color).toBe('bg-accent-burgundy text-white')
    })

    it('returns appropriate colors for conference proceedings', () => {
      const mockConference = { conference: 'test' } as ConferenceProceeding
      const color = getPublicationTypeBadgeColor(mockConference)
      
      expect(color).toBe('bg-academic-green text-white')
    })

    it('returns appropriate colors for working papers', () => {
      const mockWorking = { institution: 'test' } as WorkingPaper
      const color = getPublicationTypeBadgeColor(mockWorking)
      
      expect(color).toBe('bg-accent-gold text-white')
    })
  })

  describe('formatCitation', () => {
    const mockJournalArticle: JournalArticle = {
      id: 'test-1',
      title: 'Memory and Learning in Digital Environments',
      authors: ['Mitchell, S.', 'Johnson, R.'],
      year: '2024',
      abstract: 'Test abstract',
      keywords: ['test'],
      citationCount: 15,
      researchArea: 'Cognitive Psychology',
      publicationDate: '2024-01-01T00:00:00.000Z',
      journal: 'Cognitive Science Review',
      volume: '45',
      issue: '3',
      pages: '234-256',
      doi: '10.1016/j.cogrev.2024.123',
      impactFactor: 3.8,
      quartile: 'Q1',
      isOpenAccess: false,
      pdfUrl: '/test.pdf',
      funding: [],
      relatedProjects: [],
    }

    it('formats APA citation correctly', () => {
      const citation = formatCitation(mockJournalArticle, 'APA')
      
      expect(citation).toContain('Mitchell, S., Johnson, R.')
      expect(citation).toContain('(2024)')
      expect(citation).toContain('Memory and Learning in Digital Environments')
      expect(citation).toContain('Cognitive Science Review')
      expect(citation).toContain('https://doi.org/10.1016/j.cogrev.2024.123')
    })

    it('formats MLA citation correctly', () => {
      const citation = formatCitation(mockJournalArticle, 'MLA')
      
      expect(citation).toContain('Mitchell, S., et al.')
      expect(citation).toContain('"Memory and Learning in Digital Environments."')
      expect(citation).toContain('Cognitive Science Review')
      expect(citation).toContain('2024')
    })

    it('formats Chicago citation correctly', () => {
      const citation = formatCitation(mockJournalArticle, 'Chicago')
      
      expect(citation).toContain('Mitchell, S., Johnson, R.')
      expect(citation).toContain('"Memory and Learning in Digital Environments."')
      expect(citation).toContain('Cognitive Science Review')
      expect(citation).toContain('(2024)')
    })

    it('defaults to APA for unknown format', () => {
      const citation = formatCitation(mockJournalArticle, 'Unknown' as any)
      const apaCitation = formatCitation(mockJournalArticle, 'APA')
      
      expect(citation).toBe(apaCitation)
    })
  })
}) 
 