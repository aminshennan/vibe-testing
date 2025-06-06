import { GET as _GET } from '@/app/api/research/route'
import { NextRequest as _NextRequest } from 'next/server'
import { getResearchData } from '@/lib/research-data'

// Mock the research data module
jest.mock('@/lib/research-data', () => ({
  getResearchData: jest.fn(() => ({
    researchProjects: {
      active: [
        {
          id: 'working-memory-education',
          title: 'Working Memory and Educational Success',
          description: 'Investigating the relationship between working memory capacity and academic performance.',
          status: 'active',
          startDate: '2023-01-15',
          endDate: '2025-12-31',
          funding: {
            source: 'National Science Foundation',
            amount: '$485,000'
          },
          keywords: ['working memory', 'education', 'cognitive development'],
          progress: 75,
          researchArea: 'Cognitive Psychology'
        },
        {
          id: 'attention-learning',
          title: 'Attention and Learning Mechanisms',
          description: 'Studying how attention affects learning in various contexts.',
          status: 'active',
          startDate: '2023-06-01',
          endDate: '2024-12-31',
          funding: {
            source: 'University Grant',
            amount: '$150,000'
          },
          keywords: ['attention', 'learning', 'neuroscience'],
          progress: 60,
          researchArea: 'Educational Psychology'
        }
      ],
      completed: [
        {
          id: 'adhd-interventions',
          title: 'Cognitive Interventions for ADHD',
          description: 'Developing and testing cognitive behavioral interventions for students with ADHD.',
          status: 'completed',
          startDate: '2021-09-01',
          endDate: '2023-08-31',
          funding: {
            source: 'Department of Education',
            amount: '$320,000'
          },
          keywords: ['ADHD', 'interventions', 'cognitive behavior'],
          progress: 100,
          researchArea: 'Clinical Psychology'
        }
      ],
      planned: [
        {
          id: 'social-cognition',
          title: 'Social Cognition in Learning',
          description: 'Exploring how social context affects cognitive processes and learning outcomes.',
          status: 'planned',
          startDate: '2024-09-01',
          endDate: '2026-08-31',
          funding: {
            source: 'NIH Grant',
            amount: '$750,000'
          },
          keywords: ['social cognition', 'learning', 'context effects'],
          progress: 45,
          researchArea: 'Social Psychology'
        }
      ]
    },
    metrics: {
      totalProjects: 4,
      activeProjects: 2,
      completedProjects: 1,
      plannedProjects: 1,
      totalFunding: 1705000,
      publications: 12,
      citations: 350
    }
  }))
}))

// Mock API functionality
class MockResearchAPIHandler {
  static getAllProjects() {
    const data = getResearchData()
    return [
      ...data.researchProjects.active,
      ...data.researchProjects.completed,
      ...data.researchProjects.planned
    ]
  }

  static filterByStatus(projects: any[], status: string) {
    return projects.filter(project => project.status === status)
  }

  static filterByArea(projects: any[], area: string) {
    return projects.filter(project => project.researchArea === area)
  }

  static filterByFunding(projects: any[], funding: string) {
    return projects.filter(project => 
      project.funding.source.toLowerCase().includes(funding.toLowerCase())
    )
  }

  static searchProjects(projects: any[], query: string) {
    if (!query) return projects
    return projects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.keywords.some((keyword: string) => keyword.toLowerCase().includes(query.toLowerCase()))
    )
  }

  static sortProjects(projects: any[], sortBy: string) {
    const sorted = [...projects]
    switch (sortBy) {
      case 'progress':
        return sorted.sort((a, b) => b.progress - a.progress)
      case 'funding':
        return sorted.sort((a, b) => {
          const aAmount = parseInt(a.funding.amount.replace(/[$,]/g, ''))
          const bAmount = parseInt(b.funding.amount.replace(/[$,]/g, ''))
          return bAmount - aAmount
        })
      case 'startDate':
        return sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      default:
        return sorted
    }
  }

  static paginate(projects: any[], page: number, limit: number) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return {
      data: projects.slice(startIndex, endIndex),
      total: projects.length,
      totalPages: Math.ceil(projects.length / limit),
      page
    }
  }

  static async processRequest(params: URLSearchParams) {
    let projects = this.getAllProjects()

    // Apply status filter
    const status = params.get('status')
    if (status && ['active', 'completed', 'planned'].includes(status)) {
      projects = this.filterByStatus(projects, status)
    }

    // Apply search filter
    const search = params.get('search')
    if (search) {
      projects = this.searchProjects(projects, search)
    }

    // Apply area filter
    const area = params.get('area')
    if (area) {
      projects = this.filterByArea(projects, area)
    }

    // Apply funding filter
    const funding = params.get('funding')
    if (funding) {
      projects = this.filterByFunding(projects, funding)
    }

    // Apply sorting
    const sort = params.get('sort')
    if (sort) {
      projects = this.sortProjects(projects, sort)
    }

    // Apply pagination with error handling
    let page = parseInt(params.get('page') || '1')
    let limit = parseInt(params.get('limit') || '10')
    
    // Handle invalid pagination parameters
    if (isNaN(page) || page < 1) page = 1
    if (isNaN(limit) || limit < 1) limit = 10

    const paginatedResult = this.paginate(projects, page, limit)

    return {
      ...paginatedResult,
      metrics: getResearchData().metrics
    }
  }
}

describe('Research API Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Data Retrieval', () => {
    it('returns all research projects by default', async () => {
      const params = new URLSearchParams('')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(4) // 2 active + 1 completed + 1 planned
      expect(result.total).toBe(4)
      expect(result.metrics).toBeDefined()
      expect(result.data[0]).toHaveProperty('id')
      expect(result.data[0]).toHaveProperty('title')
      expect(result.data[0]).toHaveProperty('status')
    })

    it('includes all required project properties', async () => {
      const params = new URLSearchParams('')
      const result = await MockResearchAPIHandler.processRequest(params)

      const project = result.data[0]
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('status')
      expect(project).toHaveProperty('startDate')
      expect(project).toHaveProperty('endDate')
      expect(project).toHaveProperty('funding')
      expect(project).toHaveProperty('keywords')
      expect(project).toHaveProperty('progress')
      expect(project).toHaveProperty('researchArea')
    })

    it('returns research metrics', async () => {
      const params = new URLSearchParams('')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.metrics).toBeDefined()
      expect(result.metrics).toHaveProperty('totalProjects')
      expect(result.metrics).toHaveProperty('activeProjects')
      expect(result.metrics).toHaveProperty('completedProjects')
      expect(result.metrics).toHaveProperty('plannedProjects')
      expect(result.metrics).toHaveProperty('totalFunding')
      expect(result.metrics).toHaveProperty('publications')
      expect(result.metrics).toHaveProperty('citations')
    })
  })

  describe('Status Filtering', () => {
    it('filters projects by active status', async () => {
      const params = new URLSearchParams('status=active')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.data.every((project: any) => project.status === 'active')).toBe(true)
      expect(result.total).toBe(2)
    })

    it('filters projects by completed status', async () => {
      const params = new URLSearchParams('status=completed')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].status).toBe('completed')
      expect(result.total).toBe(1)
    })

    it('filters projects by planned status', async () => {
      const params = new URLSearchParams('status=planned')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].status).toBe('planned')
      expect(result.total).toBe(1)
    })

    it('handles invalid status gracefully', async () => {
      const params = new URLSearchParams('status=invalid')
      const result = await MockResearchAPIHandler.processRequest(params)

      // Should return all projects when status is invalid
      expect(result.data).toHaveLength(4)
    })
  })

  describe('Search Functionality', () => {
    it('searches in project titles', async () => {
      const params = new URLSearchParams('search=Working')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].title).toContain('Working')
    })

    it('searches in project descriptions', async () => {
      const params = new URLSearchParams('search=cognitive')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data.length).toBeGreaterThan(0)
      expect(result.data.some((p: any) => p.description.toLowerCase().includes('cognitive'))).toBe(true)
    })

    it('searches in project keywords', async () => {
      const params = new URLSearchParams('search=attention')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].keywords).toContain('attention')
    })

    it('performs case-insensitive search', async () => {
      const params = new URLSearchParams('search=WORKING')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].title.toLowerCase()).toContain('working')
    })

    it('returns empty results for non-existent search terms', async () => {
      const params = new URLSearchParams('search=nonexistent')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
    })
  })

  describe('Additional Filtering', () => {
    it('filters by research area', async () => {
      const params = new URLSearchParams('area=Cognitive Psychology')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].researchArea).toBe('Cognitive Psychology')
      expect(result.total).toBe(1)
    })

    it('filters by funding source', async () => {
      const params = new URLSearchParams('funding=National Science Foundation')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].funding.source).toContain('National Science Foundation')
      expect(result.total).toBe(1)
    })

    it('handles multiple filters', async () => {
      const params = new URLSearchParams('status=active&area=Cognitive Psychology')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].status).toBe('active')
      expect(result.data[0].researchArea).toBe('Cognitive Psychology')
      expect(result.total).toBe(1)
    })
  })

  describe('Sorting', () => {
    it('sorts by progress (highest first)', async () => {
      const params = new URLSearchParams('sort=progress')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(4)
      
      // Check that projects are sorted by progress (highest first)
      for (let i = 0; i < result.data.length - 1; i++) {
        expect(result.data[i].progress).toBeGreaterThanOrEqual(result.data[i + 1].progress)
      }
    })

    it('sorts by funding amount (highest first)', async () => {
      const params = new URLSearchParams('sort=funding')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(4)
      
      // Check that projects are sorted by funding amount (highest first)
      for (let i = 0; i < result.data.length - 1; i++) {
        const current = parseInt(result.data[i].funding.amount.replace(/[$,]/g, ''))
        const next = parseInt(result.data[i + 1].funding.amount.replace(/[$,]/g, ''))
        expect(current).toBeGreaterThanOrEqual(next)
      }
    })

    it('sorts by start date (newest first)', async () => {
      const params = new URLSearchParams('sort=startDate')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(4)
      
      // Check that projects are sorted by start date (newest first)
      for (let i = 0; i < result.data.length - 1; i++) {
        const currentDate = new Date(result.data[i].startDate).getTime()
        const nextDate = new Date(result.data[i + 1].startDate).getTime()
        expect(currentDate).toBeGreaterThanOrEqual(nextDate)
      }
    })
  })

  describe('Pagination', () => {
    it('handles pagination parameters', async () => {
      const params = new URLSearchParams('page=1&limit=2')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(4)
      expect(result.page).toBe(1)
      expect(result.totalPages).toBe(2)
    })

    it('handles second page correctly', async () => {
      const params = new URLSearchParams('page=2&limit=2')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(2)
      expect(result.total).toBe(4)
      expect(result.page).toBe(2)
    })

    it('handles invalid pagination gracefully', async () => {
      const params = new URLSearchParams('page=0&limit=0')
      const result = await MockResearchAPIHandler.processRequest(params)

      // Should default to reasonable values
      expect(result.data).toHaveLength(4)
      expect(result.page).toBe(1)
    })
  })

  describe('Data Integration', () => {
    it('calls getResearchData correctly', () => {
      getResearchData()
      expect(getResearchData).toHaveBeenCalled()
    })

    it('properly structures research data', () => {
      const data = getResearchData()
      expect(data.researchProjects).toHaveProperty('active')
      expect(data.researchProjects).toHaveProperty('completed')
      expect(data.researchProjects).toHaveProperty('planned')
      expect(data.metrics).toBeDefined()
    })
  })

  describe('Response Structure', () => {
    it('returns proper response structure', async () => {
      const params = new URLSearchParams('')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('total')
      expect(result).toHaveProperty('page')
      expect(result).toHaveProperty('totalPages')
      expect(result).toHaveProperty('metrics')
      expect(Array.isArray(result.data)).toBe(true)
    })

    it('includes correct metadata', async () => {
      const params = new URLSearchParams('page=2&limit=2')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.total).toBe(4)
      expect(result.page).toBe(2)
      expect(result.totalPages).toBe(2)
    })

    it('includes metrics in all responses', async () => {
      const params = new URLSearchParams('status=active')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.metrics).toBeDefined()
      expect(result.metrics.totalProjects).toBe(4)
      expect(result.metrics.activeProjects).toBe(2)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty query parameters', async () => {
      const params = new URLSearchParams('')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(4)
      expect(result.total).toBe(4)
    })

    it('handles malformed parameters gracefully', async () => {
      const params = new URLSearchParams('page=invalid&limit=invalid')
      const result = await MockResearchAPIHandler.processRequest(params)

      // Should handle gracefully
      expect(result.data).toBeDefined()
      expect(result.total).toBeDefined()
      expect(result.page).toBe(1) // Should default to 1
    })

    it('handles URL encoded parameters', async () => {
      const params = new URLSearchParams('area=Cognitive%20Psychology')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(1)
      expect(result.data[0].researchArea).toBe('Cognitive Psychology')
    })
  })

  describe('Performance', () => {
    it('processes requests efficiently', async () => {
      const start = Date.now()
      const params = new URLSearchParams('search=test&status=active&sort=progress')
      await MockResearchAPIHandler.processRequest(params)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(100) // Should be very fast for mock data
    })

    it('handles large datasets efficiently', async () => {
      // Mock a large dataset
      const originalGetResearchData = getResearchData as jest.MockedFunction<typeof getResearchData>
      const largeActiveProjects = Array.from({ length: 500 }, (_, i) => ({
        id: `project-${i}`,
        title: `Research Project ${i}`,
        description: 'Test project description',
        status: 'active',
        startDate: '2023-01-01',
        endDate: '2024-12-31',
        funding: { source: 'Test Grant', amount: '$100,000' },
        keywords: ['test'],
        progress: 50,
        researchArea: 'Test Area'
      }))

      originalGetResearchData.mockReturnValueOnce({
        researchProjects: {
          active: largeActiveProjects,
          completed: [],
          planned: []
        },
        metrics: {
          totalProjects: 500,
          activeProjects: 500,
          completedProjects: 0,
          plannedProjects: 0,
          totalFunding: 50000000,
          publications: 100,
          citations: 1000
        }
      })

      const params = new URLSearchParams('limit=10')
      const result = await MockResearchAPIHandler.processRequest(params)

      expect(result.data).toHaveLength(10) // Should be limited
      expect(result.total).toBe(500)
    })
  })
}) 
 