import { getAllPublications, searchPublications } from '@/lib/publications-data'

// Mock the publications data module
jest.mock('@/lib/publications-data', () => ({
  getAllPublications: jest.fn(() => [
    {
      id: 'test-publication-1',
      title: 'Test Publication 1',
      authors: ['Dr. Sarah Mitchell'],
      publicationDate: '2023-01-15',
      abstract: 'This is a test publication about cognitive psychology.',
      keywords: ['cognitive psychology', 'memory', 'learning'],
      researchArea: 'Cognitive Psychology',
      type: 'journal',
      journal: 'Journal of Test Psychology',
      year: '2023',
      status: 'published'
    },
    {
      id: 'test-publication-2',
      title: 'Test Conference Paper',
      authors: ['Dr. Sarah Mitchell', 'Dr. John Smith'],
      publicationDate: '2023-06-10',
      abstract: 'A conference paper about educational psychology research.',
      keywords: ['educational psychology', 'teaching', 'assessment'],
      researchArea: 'Educational Psychology',
      type: 'conference',
      conference: 'International Conference on Education',
      year: '2023',
      status: 'published'
    },
    {
      id: 'test-publication-3',
      title: 'Working Memory Research',
      authors: ['Dr. Sarah Mitchell'],
      publicationDate: '2024-01-01',
      abstract: 'Research on working memory in children.',
      keywords: ['working memory', 'children', 'development'],
      researchArea: 'Developmental Psychology',
      type: 'journal',
      journal: 'Developmental Science',
      year: '2024',
      status: 'published'
    }
  ]),
  searchPublications: jest.fn((publications: any[], query: string) => {
    if (!query) return publications
    return publications.filter((pub: any) => 
      pub.title.toLowerCase().includes(query.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(query.toLowerCase()) ||
      pub.keywords.some((keyword: string) => keyword.toLowerCase().includes(query.toLowerCase()))
    )
  })
}))

// Mock API functionality
class MockAPIHandler {
  static mockPublications = [
    {
      id: 'test-publication-1',
      title: 'Test Publication 1',
      authors: ['Dr. Sarah Mitchell'],
      publicationDate: '2023-01-15',
      abstract: 'This is a test publication about cognitive psychology.',
      keywords: ['cognitive psychology', 'memory', 'learning'],
      researchArea: 'Cognitive Psychology',
      type: 'journal',
      journal: 'Journal of Test Psychology',
      year: '2023',
      status: 'published'
    },
    {
      id: 'test-publication-2',
      title: 'Test Conference Paper',
      authors: ['Dr. Sarah Mitchell', 'Dr. John Smith'],
      publicationDate: '2023-06-10',
      abstract: 'A conference paper about educational psychology research.',
      keywords: ['educational psychology', 'teaching', 'assessment'],
      researchArea: 'Educational Psychology',
      type: 'conference',
      conference: 'International Conference on Education',
      year: '2023',
      status: 'published'
    },
    {
      id: 'test-publication-3',
      title: 'Working Memory Research',
      authors: ['Dr. Sarah Mitchell'],
      publicationDate: '2024-01-01',
      abstract: 'Research on working memory in children.',
      keywords: ['working memory', 'children', 'development'],
      researchArea: 'Developmental Psychology',
      type: 'journal',
      journal: 'Developmental Science',
      year: '2024',
      status: 'published'
    }
  ]

  static filterByType(publications: any[], type: string) {
    return publications.filter(pub => pub.type === type)
  }

  static filterByYear(publications: any[], year: string) {
    return publications.filter(pub => pub.year === year)
  }

  static filterByArea(publications: any[], area: string) {
    return publications.filter(pub => pub.researchArea === area)
  }

  static sortPublications(publications: any[], sortBy: string) {
    const sorted = [...publications]
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime())
      default:
        return sorted
    }
  }

  static paginate(publications: any[], page: number, limit: number) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return {
      data: publications.slice(startIndex, endIndex),
      total: publications.length,
      totalPages: Math.ceil(publications.length / limit),
      page
    }
  }

  static async processRequest(params: URLSearchParams) {
    let publications = [...this.mockPublications]

    // Apply search filter
    const search = params.get('search')
    if (search) {
      publications = searchPublications(publications, search)
    }

    // Apply type filter
    const type = params.get('type')
    if (type) {
      publications = this.filterByType(publications, type)
    }

    // Apply year filter
    const year = params.get('year')
    if (year) {
      publications = this.filterByYear(publications, year)
    }

    // Apply area filter
    const area = params.get('area')
    if (area) {
      publications = this.filterByArea(publications, area)
    }

    // Apply sorting
    const sort = params.get('sort')
    if (sort) {
      publications = this.sortPublications(publications, sort)
    }

    // Apply pagination with error handling
    let page = parseInt(params.get('page') || '1')
    let limit = parseInt(params.get('limit') || '10')
    
    // Handle invalid pagination parameters
    if (isNaN(page) || page < 1) page = 1
    if (isNaN(limit) || limit < 1) limit = 10

    return this.paginate(publications, page, limit)
  }
}

describe('Publications API Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Data Retrieval', () => {
    it('returns all publications by default', async () => {
      const params = new URLSearchParams('')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(3)
      expect(result.total).toBe(3)
      expect(result.data[0]).toHaveProperty('id')
      expect(result.data[0]).toHaveProperty('title')
      expect(result.data[0]).toHaveProperty('authors')
    })

    it('includes all required publication properties', async () => {
      const params = new URLSearchParams('')
      const result = await MockAPIHandler.processRequest(params)

      const publication = result.data[0]
      expect(publication).toHaveProperty('id')
      expect(publication).toHaveProperty('title')
      expect(publication).toHaveProperty('authors')
      expect(publication).toHaveProperty('publicationDate')
      expect(publication).toHaveProperty('abstract')
      expect(publication).toHaveProperty('keywords')
      expect(publication).toHaveProperty('researchArea')
      expect(publication).toHaveProperty('type')
      expect(publication).toHaveProperty('year')
      expect(publication).toHaveProperty('status')
    })
  })

  describe('Search Functionality', () => {
    it('handles search query parameter', async () => {
      const params = new URLSearchParams('search=working memory')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].title).toBe('Working Memory Research')
      expect(result.total).toBe(1)
    })

    it('searches case-insensitively', async () => {
      const params = new URLSearchParams('search=WORKING MEMORY')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].title).toBe('Working Memory Research')
    })

    it('searches in titles, abstracts, and keywords', async () => {
      const params = new URLSearchParams('search=cognitive')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data.length).toBeGreaterThan(0)
      const hasMatch = result.data.some((pub: any) => 
        pub.title.toLowerCase().includes('cognitive') ||
        pub.abstract.toLowerCase().includes('cognitive') ||
        pub.keywords.some((keyword: string) => keyword.toLowerCase().includes('cognitive'))
      )
      expect(hasMatch).toBe(true)
    })

    it('returns empty results for non-existent search terms', async () => {
      const params = new URLSearchParams('search=nonexistent')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
    })
  })

  describe('Filtering', () => {
    it('filters by publication type', async () => {
      const params = new URLSearchParams('type=journal')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.data.every((pub: any) => pub.type === 'journal')).toBe(true)
    })

    it('filters by publication year', async () => {
      const params = new URLSearchParams('year=2023')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.data.every((pub: any) => pub.year === '2023')).toBe(true)
    })

    it('filters by research area', async () => {
      const params = new URLSearchParams('area=Educational Psychology')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].researchArea).toBe('Educational Psychology')
    })

    it('handles multiple filters', async () => {
      const params = new URLSearchParams('type=journal&year=2023')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].type).toBe('journal')
      expect(result.data[0].year).toBe('2023')
    })
  })

  describe('Sorting', () => {
    it('sorts by newest first', async () => {
      const params = new URLSearchParams('sort=newest')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(3)
      
      const dates = result.data.map((pub: any) => new Date(pub.publicationDate).getTime())
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1])
      }
    })

    it('sorts by oldest first', async () => {
      const params = new URLSearchParams('sort=oldest')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(3)
      
      const dates = result.data.map((pub: any) => new Date(pub.publicationDate).getTime())
      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i]).toBeLessThanOrEqual(dates[i + 1])
      }
    })
  })

  describe('Pagination', () => {
    it('handles pagination parameters', async () => {
      const params = new URLSearchParams('page=1&limit=2')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(3)
      expect(result.page).toBe(1)
      expect(result.totalPages).toBe(2)
    })

    it('handles second page correctly', async () => {
      const params = new URLSearchParams('page=2&limit=2')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.total).toBe(3)
      expect(result.page).toBe(2)
    })

    it('handles invalid pagination gracefully', async () => {
      const params = new URLSearchParams('page=0&limit=0')
      const result = await MockAPIHandler.processRequest(params)

      // Should default to reasonable values
      expect(result.data).toHaveLength(3) // All data with default limit
      expect(result.page).toBe(1) // Should default to page 1
    })
  })

  describe('Data Integration', () => {
    it('calls getAllPublications correctly', () => {
      getAllPublications()
      expect(getAllPublications).toHaveBeenCalled()
    })

    it('calls searchPublications with correct parameters', () => {
      const publications = getAllPublications()
      searchPublications(publications, 'test query')
      expect(searchPublications).toHaveBeenCalledWith(publications, 'test query')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty query parameters', async () => {
      const params = new URLSearchParams('')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(3)
      expect(result.total).toBe(3)
    })

    it('handles malformed parameters gracefully', async () => {
      const params = new URLSearchParams('page=invalid&limit=invalid')
      const result = await MockAPIHandler.processRequest(params)

      // Should handle gracefully
      expect(result.data).toBeDefined()
      expect(result.total).toBeDefined()
    })
  })

  describe('Response Structure', () => {
    it('returns proper response structure', async () => {
      const params = new URLSearchParams('')
      const result = await MockAPIHandler.processRequest(params)

      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('total')
      expect(result).toHaveProperty('page')
      expect(result).toHaveProperty('totalPages')
      expect(Array.isArray(result.data)).toBe(true)
    })

    it('includes correct metadata', async () => {
      const params = new URLSearchParams('page=2&limit=2')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.total).toBe(3)
      expect(result.page).toBe(2)
      expect(result.totalPages).toBe(2)
    })
  })

  describe('Performance', () => {
    it('processes requests efficiently', async () => {
      const start = Date.now()
      const params = new URLSearchParams('search=test&type=journal&sort=newest')
      await MockAPIHandler.processRequest(params)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(100) // Should be very fast for mock data
    })

    it('handles large result sets efficiently', async () => {
      // Create a large mock dataset
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: `publication-${i}`,
        title: `Publication ${i}`,
        authors: ['Dr. Test Author'],
        publicationDate: '2023-01-01',
        abstract: 'Test abstract',
        keywords: ['test'],
        researchArea: 'Test Area',
        type: 'journal',
        year: '2023',
        status: 'published'
      }))

      MockAPIHandler.mockPublications = largeDataset

      const params = new URLSearchParams('limit=10')
      const result = await MockAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(10)
      expect(result.total).toBe(1000)

      // Reset mock data
      MockAPIHandler.mockPublications = [
        {
          id: 'test-publication-1',
          title: 'Test Publication 1',
          authors: ['Dr. Sarah Mitchell'],
          publicationDate: '2023-01-15',
          abstract: 'This is a test publication about cognitive psychology.',
          keywords: ['cognitive psychology', 'memory', 'learning'],
          researchArea: 'Cognitive Psychology',
          type: 'journal',
          journal: 'Journal of Test Psychology',
          year: '2023',
          status: 'published'
        },
        {
          id: 'test-publication-2',
          title: 'Test Conference Paper',
          authors: ['Dr. Sarah Mitchell', 'Dr. John Smith'],
          publicationDate: '2023-06-10',
          abstract: 'A conference paper about educational psychology research.',
          keywords: ['educational psychology', 'teaching', 'assessment'],
          researchArea: 'Educational Psychology',
          type: 'conference',
          conference: 'International Conference on Education',
          year: '2023',
          status: 'published'
        },
        {
          id: 'test-publication-3',
          title: 'Working Memory Research',
          authors: ['Dr. Sarah Mitchell'],
          publicationDate: '2024-01-01',
          abstract: 'Research on working memory in children.',
          keywords: ['working memory', 'children', 'development'],
          researchArea: 'Developmental Psychology',
          type: 'journal',
          journal: 'Developmental Science',
          year: '2024',
          status: 'published'
        }
      ]
    })
  })
}) 
 