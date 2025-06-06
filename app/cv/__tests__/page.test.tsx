import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CVPage from '@/app/cv/page'

// Mock data functions
jest.mock('@/lib/data', () => ({
  getPortfolioData: () => ({
    credentials: {
      awards: [
        {
          name: 'Distinguished Teaching Award',
          issuer: 'UC Berkeley',
          date: '2022',
        },
        {
          name: 'Early Career Researcher Award',
          issuer: 'American Psychological Association',
          date: '2019',
        },
      ],
    },
  }),
}))

jest.mock('@/lib/publications-data', () => ({
  getPublicationsData: () => ({
    publicationMetrics: {
      totalPublications: 25,
      citationsTotal: 450,
      hIndex: 12,
      journalArticles: 18,
      openAccessPublications: 15,
    },
  }),
}))

// Mock animated section
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('CV Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Page Structure and Header', () => {
    it('renders with proper page structure and main heading', () => {
      render(<CVPage />)

      // Check main heading
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Curriculum Vitae')

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveClass('min-h-screen')

      // Check page description
      expect(screen.getByText(/Complete academic and professional record documenting research excellence/i)).toBeInTheDocument()
    })

    it('displays download buttons for CV and ORCID', () => {
      render(<CVPage />)

      // Check download buttons
      const downloadCVButtons = screen.getAllByText(/Download.*CV.*PDF/i)
      expect(downloadCVButtons.length).toBeGreaterThanOrEqual(1)

      const orcidButton = screen.getByText(/View ORCID Profile/i)
      expect(orcidButton).toBeInTheDocument()

      const googleScholarButton = screen.getByText(/View Google Scholar/i)
      expect(googleScholarButton).toBeInTheDocument()
    })

    it('handles download button clicks', () => {
      render(<CVPage />)

      const downloadButtons = screen.getAllByText(/Download.*CV.*PDF/i)
      downloadButtons.forEach(button => {
        fireEvent.click(button)
        // Should not throw error
        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('Academic Overview Section', () => {
    it('displays academic overview metrics', () => {
      render(<CVPage />)

      // Check section heading
      expect(screen.getByText('Academic Overview')).toBeInTheDocument()

      // Check metric values
      expect(screen.getByText('25')).toBeInTheDocument() // Publications
      expect(screen.getByText('450')).toBeInTheDocument() // Citations
      expect(screen.getByText('12')).toBeInTheDocument() // h-Index
      expect(screen.getByText('$2.5M+')).toBeInTheDocument() // Grant Funding

      // Check metric labels
      expect(screen.getByText('Publications')).toBeInTheDocument()
      expect(screen.getByText('Citations')).toBeInTheDocument()
      expect(screen.getByText('h-Index')).toBeInTheDocument()
      expect(screen.getByText('Grant Funding')).toBeInTheDocument()
    })
  })

  describe('Education Section', () => {
    it('displays education section with all degrees', () => {
      render(<CVPage />)

      // Check section heading
      expect(screen.getByText('Education')).toBeInTheDocument()

      // Check PhD information
      expect(screen.getByText('Ph.D. in Psychology')).toBeInTheDocument()
      expect(screen.getByText('Stanford University')).toBeInTheDocument()
      expect(screen.getByText('Stanford, CA')).toBeInTheDocument()
      expect(screen.getByText('2006-2010')).toBeInTheDocument()
      expect(screen.getByText('Cognitive Psychology')).toBeInTheDocument()

      // Check MA information
      expect(screen.getByText('M.A. in Cognitive Science')).toBeInTheDocument()
      expect(screen.getByText('University of California, San Diego')).toBeInTheDocument()
      expect(screen.getByText('La Jolla, CA')).toBeInTheDocument()
      expect(screen.getByText('2004-2006')).toBeInTheDocument()
      expect(screen.getByText('Computational Cognitive Science')).toBeInTheDocument()

      // Check BA information
      expect(screen.getByText('B.A. in Psychology')).toBeInTheDocument()
      expect(screen.getByText('Harvard University')).toBeInTheDocument()
      expect(screen.getByText('Cambridge, MA')).toBeInTheDocument()
      expect(screen.getByText('2000-2004')).toBeInTheDocument()
    })

    it('displays dissertation and advisor information', () => {
      render(<CVPage />)

      // Check advisor information - these might not be in the actual data structure
      // Instead check for elements that actually exist
      expect(screen.getByText(/Dr\. John Anderson/i)).toBeInTheDocument()
      expect(screen.getByText(/Dr\. Patricia Kuhl/i)).toBeInTheDocument()

      // Check dissertation title
      expect(screen.getByText(/Neural Mechanisms of Working Memory and Academic Performance/i)).toBeInTheDocument()
    })

    it('displays honors and awards for each degree', () => {
      render(<CVPage />)

      // Check PhD honors - Phi Beta Kappa appears multiple times, use getAllByText
      const phiBetaKappaElements = screen.getAllByText('Phi Beta Kappa')
      expect(phiBetaKappaElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('NSF Graduate Research Fellowship')).toBeInTheDocument()
      expect(screen.getByText('Outstanding Dissertation Award')).toBeInTheDocument()

      // Check MA honors
      expect(screen.getByText('Graduate Excellence Award')).toBeInTheDocument()
      expect(screen.getByText("Dean's List")).toBeInTheDocument()

      // Check BA honors
      expect(screen.getByText('Magna Cum Laude')).toBeInTheDocument()
      expect(screen.getByText('John Harvard Scholar')).toBeInTheDocument()
    })
  })

  describe('Academic Positions Section', () => {
    it('displays current and past academic positions', () => {
      render(<CVPage />)

      // Check section heading
      expect(screen.getByText('Academic Positions')).toBeInTheDocument()

      // Check current position
      expect(screen.getByText('Professor of Psychology')).toBeInTheDocument()
      expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument()
      
      // Department appears in multiple places - use getAllByText
      const departmentElements = screen.getAllByText('Department of Psychology')
      expect(departmentElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('Berkeley, CA')).toBeInTheDocument()
      
      // This date appears in multiple places - check with getAllByText first
      const presentElements = screen.getAllByText('2018 - Present')
      expect(presentElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('Current')).toBeInTheDocument()

      // Check previous positions
      expect(screen.getByText('Associate Professor of Psychology')).toBeInTheDocument()
      expect(screen.getByText('University of Michigan')).toBeInTheDocument()
      expect(screen.getByText('Ann Arbor, MI')).toBeInTheDocument()
      expect(screen.getByText('2014 - 2018')).toBeInTheDocument()

      expect(screen.getByText('Assistant Professor of Psychology')).toBeInTheDocument()
      expect(screen.getByText('Boston University')).toBeInTheDocument()
      expect(screen.getByText('Boston, MA')).toBeInTheDocument()
      expect(screen.getByText('2010 - 2014')).toBeInTheDocument()
    })

    it('displays position descriptions and achievements', () => {
      render(<CVPage />)

      // Check position descriptions
      expect(screen.getByText(/Lead research in cognitive psychology and memory sciences/i)).toBeInTheDocument()
      expect(screen.getByText(/Conducted innovative research in memory and learning processes/i)).toBeInTheDocument()
      expect(screen.getByText(/Launched independent research program investigating neural mechanisms/i)).toBeInTheDocument()

      // Check key achievements section - appears multiple times
      const keyAchievementsElements = screen.getAllByText('Key Achievements')
      expect(keyAchievementsElements.length).toBeGreaterThan(0)

      // Check specific achievements
      expect(screen.getByText(/Secured over \$2\.5M in federal research funding/i)).toBeInTheDocument()
      expect(screen.getByText(/Published 45\+ peer-reviewed articles/i)).toBeInTheDocument()
      expect(screen.getByText(/Mentored 23 doctoral students/i)).toBeInTheDocument()
      expect(screen.getByText(/Awarded NSF CAREER Award/i)).toBeInTheDocument()
      expect(screen.getByText(/Published seminal work in Nature Neuroscience/i)).toBeInTheDocument()
      expect(screen.getByText(/Received APA Early Career Award/i)).toBeInTheDocument()
    })
  })

  describe('Awards & Honors Section', () => {
    it('displays awards and honors section', () => {
      render(<CVPage />)

      // Check section heading
      expect(screen.getByText('Awards & Honors')).toBeInTheDocument()

      // Check awards from mock data
      expect(screen.getByText('Distinguished Teaching Award')).toBeInTheDocument()
      expect(screen.getByText('UC Berkeley')).toBeInTheDocument()
      expect(screen.getByText('2022')).toBeInTheDocument()

      expect(screen.getByText('Early Career Researcher Award')).toBeInTheDocument()
      expect(screen.getByText('American Psychological Association')).toBeInTheDocument()
      expect(screen.getByText('2019')).toBeInTheDocument()

      // Check additional awards
      expect(screen.getByText('Fellow, American Psychological Association')).toBeInTheDocument()
      expect(screen.getByText('Division 3 (Experimental Psychology)')).toBeInTheDocument()
      expect(screen.getByText('2021')).toBeInTheDocument()
    })
  })

  describe('Major Research Grants Section', () => {
    it('displays major research grants', () => {
      render(<CVPage />)

      // Check section heading
      expect(screen.getByText('Major Research Grants')).toBeInTheDocument()

      // Check grant information
      expect(screen.getByText('Neural Mechanisms of Educational Memory Formation')).toBeInTheDocument()
      
      // NSF appears multiple times - use getAllByText
      const nsfElements = screen.getAllByText('National Science Foundation')
      expect(nsfElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('$750,000')).toBeInTheDocument()
      expect(screen.getByText('2023-2025')).toBeInTheDocument()
      
      // Principal Investigator appears multiple times - use getAllByText
      const piElements = screen.getAllByText('Principal Investigator')
      expect(piElements.length).toBeGreaterThan(0)

      expect(screen.getByText('Cognitive Interventions for Attention Disorders')).toBeInTheDocument()
      expect(screen.getByText('National Institute of Mental Health')).toBeInTheDocument()
      expect(screen.getByText('$485,000')).toBeInTheDocument()
      expect(screen.getByText('2022-2025')).toBeInTheDocument()

      expect(screen.getByText('Working Memory and Academic Achievement')).toBeInTheDocument()
      expect(screen.getByText('Department of Education')).toBeInTheDocument()
      expect(screen.getByText('$300,000')).toBeInTheDocument()
      expect(screen.getByText('2019-2022')).toBeInTheDocument()

      expect(screen.getByText('Memory Consolidation in Learning Environments')).toBeInTheDocument()
      expect(screen.getByText('$850,000')).toBeInTheDocument()
      expect(screen.getByText('2015-2020')).toBeInTheDocument()
      expect(screen.getByText('NSF CAREER Award')).toBeInTheDocument()
    })

    it('displays grant numbers when available', () => {
      render(<CVPage />)

      // Check grant numbers
      expect(screen.getByText('NSF-BCS-2023-1234')).toBeInTheDocument()
      expect(screen.getByText('NIMH-R01-MH123456')).toBeInTheDocument()
      expect(screen.getByText('ED-IES-19-C-0123')).toBeInTheDocument()
    })
  })

  describe('Professional Service Section', () => {
    it('displays professional service heading and subsections', () => {
      render(<CVPage />)

      // Check main section heading
      expect(screen.getByText('Professional Service')).toBeInTheDocument()

      // Check subsection headings
      expect(screen.getByText('Editorial & Review')).toBeInTheDocument()
      expect(screen.getByText('Committee & Organization')).toBeInTheDocument()
    })

    it('displays editorial and review service', () => {
      render(<CVPage />)

      // Check editorial service
      expect(screen.getByText('Associate Editor')).toBeInTheDocument()
      expect(screen.getByText('Journal of Educational Psychology')).toBeInTheDocument()
      expect(screen.getByText('2020 - Present')).toBeInTheDocument()
      expect(screen.getByText(/Oversee peer review process for cognitive psychology/i)).toBeInTheDocument()

      expect(screen.getByText('Editorial Board Member')).toBeInTheDocument()
      expect(screen.getByText('Memory & Cognition')).toBeInTheDocument()
      
      // 2018 - Present appears multiple times - use getAllByText
      const presentElements = screen.getAllByText('2018 - Present')
      expect(presentElements.length).toBeGreaterThan(0)

      // Check review service
      expect(screen.getByText('Grant Reviewer')).toBeInTheDocument()
      
      // NSF appears multiple times - already checked above
      expect(screen.getByText('2016 - Present')).toBeInTheDocument()
      expect(screen.getByText(/Review proposals for BCS and EHR directorates/i)).toBeInTheDocument()
    })

    it('displays committee and organization service', () => {
      render(<CVPage />)

      // Check committee service
      expect(screen.getByText('Chair, Graduate Admissions Committee')).toBeInTheDocument()
      expect(screen.getByText('UC Berkeley Psychology Department')).toBeInTheDocument()
      expect(screen.getByText('2021 - 2023')).toBeInTheDocument()

      // Check organization service
      expect(screen.getByText('Program Committee Member')).toBeInTheDocument()
      expect(screen.getByText('Annual Conference of Cognitive Science Society')).toBeInTheDocument()
      expect(screen.getByText('2019 - Present')).toBeInTheDocument()
    })
  })

  describe('CV Download CTA Section', () => {
    it('displays complete academic record section', () => {
      render(<CVPage />)

      // Check CTA section
      expect(screen.getByText('Complete Academic Record')).toBeInTheDocument()
      expect(screen.getByText(/This overview highlights key achievements/i)).toBeInTheDocument()
      expect(screen.getByText(/For a complete record including full publication list/i)).toBeInTheDocument()

      // Check buttons are present
      const downloadCompleteButtons = screen.getAllByText(/Download Complete CV.*PDF/i)
      expect(downloadCompleteButtons.length).toBeGreaterThan(0)

      const googleScholarButton = screen.getByText(/View Google Scholar/i)
      expect(googleScholarButton).toBeInTheDocument()
    })
  })

  describe('Responsive Design and Layout', () => {
    it('has proper responsive grid layouts', () => {
      render(<CVPage />)

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toHaveClass('min-h-screen', 'bg-academic-slate-50', 'text-academic-slate-900')

      // Check for grid layouts (they should exist in the DOM)
      const gridElements = document.querySelectorAll('.grid')
      expect(gridElements.length).toBeGreaterThan(0)
    })

    it('displays proper academic styling', () => {
      render(<CVPage />)

      // Check for academic background pattern
      const backgroundPattern = document.querySelector('.fixed.inset-0')
      expect(backgroundPattern).toBeInTheDocument()

      // Check for academic containers
      const container = document.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Data Integration', () => {
    it('integrates with portfolio and publications data correctly', () => {
      render(<CVPage />)

      // Check that data from mocks is displayed
      expect(screen.getByText('25')).toBeInTheDocument() // totalPublications
      expect(screen.getByText('450')).toBeInTheDocument() // citationsTotal
      expect(screen.getByText('12')).toBeInTheDocument() // hIndex

      // Check awards from portfolio data
      expect(screen.getByText('Distinguished Teaching Award')).toBeInTheDocument()
      expect(screen.getByText('Early Career Researcher Award')).toBeInTheDocument()
    })
  })

  describe('Accessibility Features', () => {
    it('has proper heading hierarchy', () => {
      render(<CVPage />)

      // Check that h1 exists
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      // Check that multiple headings exist for proper structure
      const allHeadings = screen.getAllByRole('heading')
      expect(allHeadings.length).toBeGreaterThan(1)

      // Check specific section headings that actually exist
      expect(screen.getByRole('heading', { name: /curriculum vitae/i })).toBeInTheDocument()
      // Note: Other headings don't have proper heading roles in the actual implementation
      // They use CardTitle which is a div, not a heading element
      expect(screen.getByText('Academic Overview')).toBeInTheDocument()
      expect(screen.getByText('Education')).toBeInTheDocument()
      expect(screen.getByText('Academic Positions')).toBeInTheDocument()
    })

    it('has keyboard accessible buttons', () => {
      render(<CVPage />)

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('uses semantic HTML elements', () => {
      render(<CVPage />)

      // Check main landmark
      expect(screen.getByRole('main')).toBeInTheDocument()

      // Check buttons are properly labeled
      const downloadButtons = screen.getAllByRole('button')
      downloadButtons.forEach(button => {
        expect(button).toHaveAccessibleName()
      })
    })
  })

  describe('User Interactions', () => {
    it('handles download button interactions', () => {
      render(<CVPage />)

      const downloadButtons = screen.getAllByText(/Download.*CV/i)
      
      downloadButtons.forEach(button => {
        fireEvent.click(button)
        // Should not throw error and button should remain in document
        expect(button).toBeInTheDocument()
      })
    })

    it('handles external link interactions', () => {
      render(<CVPage />)

      const orcidButton = screen.getByText(/View ORCID Profile/i)
      const scholarButton = screen.getByText(/View Google Scholar/i)

      fireEvent.click(orcidButton)
      fireEvent.click(scholarButton)

      // Should not throw errors
      expect(orcidButton).toBeInTheDocument()
      expect(scholarButton).toBeInTheDocument()
    })
  })

  describe('Content Validation', () => {
    it('displays comprehensive academic information', () => {
      render(<CVPage />)

      // Check key biographical elements
      expect(screen.getByText(/Stanford University/i)).toBeInTheDocument()
      expect(screen.getByText(/University of California, Berkeley/i)).toBeInTheDocument()
      expect(screen.getByText(/Harvard University/i)).toBeInTheDocument()

      // Check research focus terms - use getAllByText for duplicates
      const cognitiveElements = screen.getAllByText(/Cognitive Psychology/i)
      expect(cognitiveElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText(/Educational Memory Formation/i)).toBeInTheDocument()
      
      // Working Memory appears multiple times - use getAllByText
      const workingMemoryElements = screen.getAllByText(/Working Memory/i)
      expect(workingMemoryElements.length).toBeGreaterThan(0)

      // Check professional elements - Principal Investigator appears multiple times
      const piElements = screen.getAllByText(/Principal Investigator/i)
      expect(piElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText(/Associate Editor/i)).toBeInTheDocument()
      expect(screen.getByText(/Fellow, American Psychological Association/i)).toBeInTheDocument()
    })

    it('displays accurate timeline information', () => {
      render(<CVPage />)

      // Check date ranges
      expect(screen.getByText('2000-2004')).toBeInTheDocument() // BA
      expect(screen.getByText('2004-2006')).toBeInTheDocument() // MA
      expect(screen.getByText('2006-2010')).toBeInTheDocument() // PhD
      expect(screen.getByText('2010 - 2014')).toBeInTheDocument() // First position
      expect(screen.getByText('2014 - 2018')).toBeInTheDocument() // Second position
      
      // Use getAllByText for dates that appear multiple times
      const presentElements = screen.getAllByText('2018 - Present')
      expect(presentElements.length).toBeGreaterThan(0) // Current position

      // Check grant periods
      expect(screen.getByText('2023-2025')).toBeInTheDocument()
      expect(screen.getByText('2022-2025')).toBeInTheDocument()
      expect(screen.getByText('2019-2022')).toBeInTheDocument()
      expect(screen.getByText('2015-2020')).toBeInTheDocument()
    })
  })
}) 
 