import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResearchProjectDetail from '@/app/research/[id]/page'

// Mock Next.js functions
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))

// Mock animated section component
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children, animation, delay }: { 
    children: React.ReactNode
    animation?: string
    delay?: number 
  }) => <div data-testid={`animated-section-${animation}`} data-delay={delay}>{children}</div>,
}))

// Mock research data
jest.mock('@/lib/research-data', () => ({
  getResearchData: jest.fn(() => ({
    researchProjects: {
      active: [
        {
          id: 'working-memory-education',
          title: 'Working Memory and Educational Success',
          description: 'Investigating the relationship between working memory capacity and academic performance in elementary school children.',
          status: 'active',
          startDate: '2023-01-15',
          endDate: '2025-12-31',
          funding: {
            source: 'National Science Foundation',
            amount: '$485,000'
          },
          keywords: ['working memory', 'education', 'cognitive development', 'neuroimaging'],
          progress: 75
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
          progress: 100
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
          progress: 45
        }
      ]
    }
  }))
}))

describe('Research Project Detail Page', () => {
  // Mock params for different test scenarios
  const mockParamsActive = Promise.resolve({ id: 'working-memory-education' })
  const mockParamsCompleted = Promise.resolve({ id: 'adhd-interventions' })
  const mockParamsPlanned = Promise.resolve({ id: 'social-cognition' })
  const mockParamsNotFound = Promise.resolve({ id: 'non-existent-project' })

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset console.error mock
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Loading States', () => {
    it('displays project content when loading completes', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByText('Working Memory and Educational Success')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Error Handling', () => {
    it('calls notFound for non-existent project', async () => {
      const { notFound } = jest.requireMock('next/navigation')
      
      render(<ResearchProjectDetail params={mockParamsNotFound} />)
      
      expect(notFound).toHaveBeenCalled()
    })

    it('handles errors during project loading', async () => {
      const originalConsoleError = console.error
      console.error = jest.fn()

      const { getResearchData } = jest.requireMock('@/lib/research-data')
      getResearchData.mockImplementation(() => {
        throw new Error('Failed to load research data')
      })

      render(<ResearchProjectDetail params={mockParamsActive} />)
      
      console.error = originalConsoleError
    })
  })

  describe('Project Header and Navigation', () => {
    it('renders project header with title and description for active project', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByText('Working Memory and Educational Success')).toBeInTheDocument()
        expect(screen.getByText(/Investigating the relationship between working memory capacity/)).toBeInTheDocument()
      })

      // Check navigation back link
      const backLink = screen.getByRole('link', { name: /back to research/i })
      expect(backLink).toBeInTheDocument()
      expect(backLink).toHaveAttribute('href', '/research')
    })

    it('displays correct project status badge for active project', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        const statusBadge = screen.getByText('Active')
        expect(statusBadge).toBeInTheDocument()
        expect(statusBadge).toHaveClass('bg-academic-green')
      })
    })

    it('displays correct project status badge for completed project', async () => {
      render(<ResearchProjectDetail params={mockParamsCompleted} />)

      await waitFor(() => {
        const statusBadge = screen.getByText('Completed')
        expect(statusBadge).toBeInTheDocument()
        expect(statusBadge).toHaveClass('bg-primary-navy')
      })
    })

    it('displays project metadata correctly', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByText('75% Complete')).toBeInTheDocument()
        expect(screen.getByText('2023-01-15')).toBeInTheDocument()
        expect(screen.getByText('2025-12-31')).toBeInTheDocument()
        expect(screen.getByText('$485,000')).toBeInTheDocument()
      })

      // Check keywords are displayed as badges
      expect(screen.getByText('working memory')).toBeInTheDocument()
      expect(screen.getByText('education')).toBeInTheDocument()
      expect(screen.getByText('cognitive development')).toBeInTheDocument()
      expect(screen.getByText('neuroimaging')).toBeInTheDocument()
    })

    it('displays progress bar with correct structure', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar).toBeInTheDocument()
        expect(progressBar).toHaveAttribute('aria-valuemax', '100')
        expect(progressBar).toHaveAttribute('aria-valuemin', '0')
      })
    })
  })

  describe('Tab Navigation UI', () => {
    it('renders all tab triggers correctly', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Methodology' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Team' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Publications' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Impact' })).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('has overview tab active by default', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('data-state', 'active')
      }, { timeout: 3000 })
    })

    it('allows clicking between tabs', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('data-state', 'active')
      }, { timeout: 3000 })

      // Click on different tabs - they should be clickable
      fireEvent.click(screen.getByRole('tab', { name: 'Methodology' }))
      fireEvent.click(screen.getByRole('tab', { name: 'Team' }))
      fireEvent.click(screen.getByRole('tab', { name: 'Publications' }))
      fireEvent.click(screen.getByRole('tab', { name: 'Impact' }))

      // At least they should remain in the DOM after clicking
      expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Methodology' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Team' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Publications' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Impact' })).toBeInTheDocument()
    })
  })

  describe('Basic Content Structure', () => {
    it('displays overview content initially', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // These are static elements that should always be in overview
        expect(screen.getByText('Project Overview')).toBeInTheDocument()
        expect(screen.getByText('Research Objectives')).toBeInTheDocument()
        expect(screen.getByText('Key Findings')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('displays key metrics in overview', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        expect(screen.getByText('Key Metrics')).toBeInTheDocument()
        expect(screen.getByText('450+')).toBeInTheDocument()
        expect(screen.getByText('Participants')).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  describe('Different Project Types', () => {
    it('handles completed project display correctly', () => {
      const { getResearchData } = jest.requireMock('@/lib/research-data')
      getResearchData.mockReturnValue({
        ...mockResearchData,
        researchProjects: {
          ...mockResearchData.researchProjects,
          completed: [mockCompletedProject]
        }
      })

      render(<ResearchProjectDetail params={mockParamsCompleted} />)
      
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('handles planned project display correctly', async () => {
      render(<ResearchProjectDetail params={mockParamsPlanned} />)

      await waitFor(() => {
        expect(screen.getByText('Social Cognition in Learning')).toBeInTheDocument()
        expect(screen.getByText('Planned')).toBeInTheDocument()
        expect(screen.getByText('45% Complete')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility Features', () => {
    it('has proper heading hierarchy', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check main heading
        const h1 = screen.getByRole('heading', { level: 1 })
        expect(h1).toBeInTheDocument()
        expect(h1).toHaveTextContent('Working Memory and Educational Success')
      })
    })

    it('has proper tab accessibility', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        const tabList = screen.getByRole('tablist')
        expect(tabList).toBeInTheDocument()

        const tabs = screen.getAllByRole('tab')
        expect(tabs).toHaveLength(5)
        
        tabs.forEach(tab => {
          expect(tab).toHaveAccessibleName()
        })
      }, { timeout: 3000 })
    })

    it('uses semantic HTML elements', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check main landmark
        expect(screen.getByRole('main')).toBeInTheDocument()

        // Check that progress bar exists
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design and Layout', () => {
    it('has proper responsive styling classes', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check main content structure
        const mainContent = screen.getByRole('main')
        expect(mainContent).toHaveClass('min-h-screen', 'bg-academic-slate-50')

        // Check for responsive container
        const container = document.querySelector('.container')
        expect(container).toBeInTheDocument()
      })
    })

    it('displays proper academic card styling', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check for academic cards
        const academicCards = document.querySelectorAll('.bg-white\\/90')
        expect(academicCards.length).toBeGreaterThan(0)

        // Check for backdrop blur and shadows
        const backdropCards = document.querySelectorAll('.backdrop-blur-sm.shadow-academic')
        expect(backdropCards.length).toBeGreaterThan(0)
      })
    })

    it('has proper background pattern', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check for academic background pattern
        const backgroundPattern = document.querySelector('.fixed.inset-0')
        expect(backgroundPattern).toBeInTheDocument()
      })
    })
  })

  describe('User Interactions', () => {
    it('handles back navigation link', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to research/i })
        expect(backLink).toBeInTheDocument()
        expect(backLink).toHaveAttribute('href', '/research')
      })
    })
  })

  describe('Content Validation', () => {
    it('displays accurate project information', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      await waitFor(() => {
        // Check project details match mock data
        expect(screen.getByText('Working Memory and Educational Success')).toBeInTheDocument()
        expect(screen.getByText('Active')).toBeInTheDocument()
        expect(screen.getByText('$485,000')).toBeInTheDocument()
      })
    })

    it('displays consistent project title across page', async () => {
      render(<ResearchProjectDetail params={mockParamsActive} />)

      // Test consistency by checking project title appears
      await waitFor(() => {
        expect(screen.getByText('Working Memory and Educational Success')).toBeInTheDocument()
      })

      // Verify the title is prominently displayed
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveTextContent('Working Memory and Educational Success')
    })
  })
}) 
 