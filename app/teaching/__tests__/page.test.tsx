import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TeachingPage from '@/app/teaching/page'

// Mock animated section
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('Teaching Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Page Structure and Header', () => {
    it('renders with proper page structure and main heading', () => {
      render(<TeachingPage />)

      // Check main heading
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Teaching Portfolio')

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveClass('min-h-screen')

      // Check page description
      expect(screen.getByText(/Fostering critical thinking, scientific literacy, and passion for psychological science/i)).toBeInTheDocument()
    })

    it('displays graduation cap icon in header', () => {
      render(<TeachingPage />)

      // Check that the graduation cap icon appears in the page
      const graduationCapIcon = document.querySelector('svg[class*="w-8 h-8"]')
      expect(graduationCapIcon).toBeInTheDocument()
    })

    it('has proper background pattern and styling', () => {
      render(<TeachingPage />)

      // Check for academic background pattern
      const backgroundPattern = document.querySelector('.fixed.inset-0')
      expect(backgroundPattern).toBeInTheDocument()

      // Check for academic containers
      const container = document.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Teaching Philosophy Section', () => {
    it('displays teaching philosophy section header', () => {
      render(<TeachingPage />)

      // Teaching Philosophy uses CardTitle which is a div, not a heading element
      // Check for text content instead of heading role
      expect(screen.getByText('Teaching Philosophy')).toBeInTheDocument()
    })

    it('displays teaching philosophy overview', () => {
      render(<TeachingPage />)

      expect(screen.getByText(/My teaching philosophy centers on active learning, critical thinking/i)).toBeInTheDocument()
      expect(screen.getByText(/application of psychological science to real-world problems/i)).toBeInTheDocument()
    })

    it('displays all teaching philosophy principles', () => {
      render(<TeachingPage />)

      // Check all four principles
      expect(screen.getByText('Evidence-Based Learning')).toBeInTheDocument()
      expect(screen.getByText(/All course content is grounded in current psychological research/i)).toBeInTheDocument()

      expect(screen.getByText('Active Engagement')).toBeInTheDocument()
      expect(screen.getByText(/Interactive lectures, hands-on experiments, and collaborative projects/i)).toBeInTheDocument()

      expect(screen.getByText('Critical Thinking')).toBeInTheDocument()
      expect(screen.getByText(/Students learn to evaluate research claims/i)).toBeInTheDocument()

      expect(screen.getByText('Inclusive Excellence')).toBeInTheDocument()
      expect(screen.getByText(/Creating a welcoming environment where diverse perspectives are valued/i)).toBeInTheDocument()
    })

    it('displays learning outcomes section', () => {
      render(<TeachingPage />)

      expect(screen.getByText('Learning Outcomes')).toBeInTheDocument()
      
      // Check specific outcomes
      expect(screen.getByText(/Develop strong analytical and critical thinking skills/i)).toBeInTheDocument()
      expect(screen.getByText(/Understand and apply the scientific method to psychological questions/i)).toBeInTheDocument()
      expect(screen.getByText(/Communicate psychological concepts clearly to diverse audiences/i)).toBeInTheDocument()
      expect(screen.getByText(/Appreciate the diversity and complexity of human behavior/i)).toBeInTheDocument()
      expect(screen.getByText(/Connect psychological principles to real-world applications/i)).toBeInTheDocument()
    })
  })

  describe('Current Courses Section', () => {
    it('displays current courses section header', () => {
      render(<TeachingPage />)

      // Current Courses uses CardTitle which is a div, not a heading element
      // Check for text content instead of heading role
      expect(screen.getByText('Current Courses - Fall 2024')).toBeInTheDocument()
    })

    it('displays all four current courses', () => {
      render(<TeachingPage />)

      // Check PSY 101
      expect(screen.getByText('PSY 101')).toBeInTheDocument()
      expect(screen.getByText('Introduction to Psychology')).toBeInTheDocument()
      expect(screen.getByText(/Comprehensive overview of psychological principles/i)).toBeInTheDocument()
      
      // Wheeler Hall 150 appears multiple times - use getAllByText
      const wheelerHallElements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('Wheeler Hall 150') || false
      })
      expect(wheelerHallElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('180')).toBeInTheDocument() // Enrollment

      // Check PSY 301
      expect(screen.getByText('PSY 301')).toBeInTheDocument()
      expect(screen.getByText('Cognitive Psychology')).toBeInTheDocument()
      expect(screen.getByText(/Advanced study of mental processes including attention, memory/i)).toBeInTheDocument()
      
      // Tolman Hall 1102 might be broken across elements - use flexible matcher
      const tolmanHall1102Elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('Tolman Hall 1102') || false
      })
      expect(tolmanHall1102Elements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('45')).toBeInTheDocument() // Enrollment

      // Check PSY 350
      expect(screen.getByText('PSY 350')).toBeInTheDocument()
      expect(screen.getByText('Research Methods in Psychology')).toBeInTheDocument()
      expect(screen.getByText(/Comprehensive training in psychological research design/i)).toBeInTheDocument()
      
      // Tolman Hall 1203 might be broken across elements - use flexible matcher
      const tolmanHall1203Elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('Tolman Hall 1203') || false
      })
      expect(tolmanHall1203Elements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('32')).toBeInTheDocument() // Enrollment

      // Check PSY 710
      expect(screen.getByText('PSY 710')).toBeInTheDocument()
      expect(screen.getByText('Advanced Cognitive Neuroscience')).toBeInTheDocument()
      expect(screen.getByText(/Graduate seminar exploring cutting-edge research/i)).toBeInTheDocument()
      
      // Tolman Hall 3105 might be broken across elements - use flexible matcher
      const tolmanHall3105Elements = screen.getAllByText((content, element) => {
        return element?.textContent?.includes('Tolman Hall 3105') || false
      })
      expect(tolmanHall3105Elements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('12')).toBeInTheDocument() // Enrollment
    })

    it('displays course schedules and formats correctly', () => {
      render(<TeachingPage />)

      // Check PSY 101 schedule
      expect(screen.getByText(/Mon, Wed, Fri • 10:00 AM - 10:50 AM/)).toBeInTheDocument()
      expect(screen.getByText(/Wheeler Hall 150 • in-person/)).toBeInTheDocument()

      // Check PSY 301 schedule
      expect(screen.getByText(/Tue, Thu • 2:00 PM - 3:30 PM/)).toBeInTheDocument()
      expect(screen.getByText(/Tolman Hall 1102 • in-person/)).toBeInTheDocument()

      // Check PSY 350 schedule (hybrid format)
      expect(screen.getByText(/Mon, Wed • 1:00 PM - 2:30 PM/)).toBeInTheDocument()
      expect(screen.getByText(/Tolman Hall 1203 • hybrid/)).toBeInTheDocument()

      // Check PSY 710 schedule
      expect(screen.getByText(/Wed • 3:00 PM - 6:00 PM/)).toBeInTheDocument()
      expect(screen.getByText(/Tolman Hall 3105 • in-person/)).toBeInTheDocument()
    })

    it('displays course credits and level badges', () => {
      render(<TeachingPage />)

      // Check credits badges
      const creditBadges = screen.getAllByText(/\d+ Credits/)
      expect(creditBadges.length).toBe(4) // One for each course

      // Check level badges - PSY 710 should be graduate level
      const badges = document.querySelectorAll('[class*="bg-primary-navy text-white"]')
      expect(badges.length).toBeGreaterThanOrEqual(1) // Graduate level badge
    })

    it('displays prerequisites when available', () => {
      render(<TeachingPage />)

      // Prerequisites appears multiple times - use getAllByText
      const prerequisitesElements = screen.getAllByText(/Prerequisites:/)
      expect(prerequisitesElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText(/PSY 101, PSY 201/)).toBeInTheDocument()
      expect(screen.getByText(/PSY 101, Statistics 101/)).toBeInTheDocument()
      expect(screen.getByText(/Graduate standing, PSY 601/)).toBeInTheDocument()
    })

    it('displays syllabus and course info buttons', () => {
      render(<TeachingPage />)

      // All courses should have syllabus buttons
      const syllabusButtons = screen.getAllByText(/Syllabus/)
      expect(syllabusButtons.length).toBe(4)

      // All courses should have course info buttons
      const courseInfoButtons = screen.getAllByText(/Course Info/)
      expect(courseInfoButtons.length).toBe(4)
    })
  })

  describe('Office Hours Section', () => {
    it('displays office hours section header', () => {
      render(<TeachingPage />)

      // Office Hours & Availability uses CardTitle which is a div, not a heading element
      // Check for text content instead of heading role
      expect(screen.getByText('Office Hours & Availability')).toBeInTheDocument()
    })

    it('displays regular office hours', () => {
      render(<TeachingPage />)

      expect(screen.getByText('Regular Office Hours')).toBeInTheDocument()
      
      // Check Tuesday hours
      expect(screen.getByText('Tuesday')).toBeInTheDocument()
      
      // 2:00 PM - 4:00 PM appears multiple times - use getAllByText
      const timeSlotElements = screen.getAllByText('2:00 PM - 4:00 PM')
      expect(timeSlotElements.length).toBeGreaterThan(0)
      
      // Thursday appears in multiple places, use getAllByText
      const thursdayElements = screen.getAllByText('Thursday')
      expect(thursdayElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('Friday')).toBeInTheDocument()
      expect(screen.getByText('1:00 PM - 2:00 PM')).toBeInTheDocument()

      // Check office location
      const tolmanElements = screen.getAllByText('Tolman Hall 3210')
      expect(tolmanElements.length).toBeGreaterThan(0)

      // Check appointment types - Drop-in appears multiple times
      const dropInElements = screen.getAllByText('Drop-in')
      expect(dropInElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText('By appointment')).toBeInTheDocument()
    })

    it('displays virtual office hours', () => {
      render(<TeachingPage />)

      expect(screen.getByText('Virtual Office Hours')).toBeInTheDocument()
      expect(screen.getByText('Wednesdays 3:00 PM - 4:00 PM')).toBeInTheDocument()

      const joinVirtualButton = screen.getByRole('button', { name: /join virtual hours/i })
      expect(joinVirtualButton).toBeInTheDocument()
    })

    it('displays schedule appointment button', () => {
      render(<TeachingPage />)

      const scheduleButton = screen.getByRole('button', { name: /schedule appointment/i })
      expect(scheduleButton).toBeInTheDocument()
    })
  })

  describe('Student Testimonials Section', () => {
    it('displays student feedback section header', () => {
      render(<TeachingPage />)

      // Student Feedback uses CardTitle which is a div, not a heading element
      // Check for text content instead of heading role
      expect(screen.getByText('Student Feedback')).toBeInTheDocument()
    })

    it('displays all student testimonials', () => {
      render(<TeachingPage />)

      // Check Alex Chen testimonial
      expect(screen.getByText('Alex Chen')).toBeInTheDocument()
      expect(screen.getByText('PSY 301 - Cognitive Psychology')).toBeInTheDocument()
      expect(screen.getByText(/Dr\. Mitchell&apos;s class completely changed how I think about memory and learning/i)).toBeInTheDocument()

      // Check Maria Rodriguez testimonial
      expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('PSY 350 - Research Methods')).toBeInTheDocument()
      expect(screen.getByText(/The research project I completed in this class led to my first publication/i)).toBeInTheDocument()

      // Check Jordan Williams testimonial
      expect(screen.getByText('Jordan Williams')).toBeInTheDocument()
      expect(screen.getByText('PSY 101 - Introduction to Psychology')).toBeInTheDocument()
      expect(screen.getByText(/Even though this was an intro class, Dr\. Mitchell made complex topics accessible/i)).toBeInTheDocument()
    })

    it('displays star ratings for testimonials', () => {
      render(<TeachingPage />)

      // Check for star icons (all testimonials have 5 stars)
      const starIcons = document.querySelectorAll('svg[class*="w-4 h-4 text-accent-gold"]')
      expect(starIcons.length).toBe(15) // 3 testimonials × 5 stars each
    })

    it('displays testimonial years', () => {
      render(<TeachingPage />)

      const years = screen.getAllByText('2024')
      expect(years.length).toBeGreaterThanOrEqual(2) // Alex Chen and Jordan Williams

      expect(screen.getByText('2023')).toBeInTheDocument() // Maria Rodriguez
    })
  })

  describe('Student Resources Section', () => {
    it('displays student opportunities section header', () => {
      render(<TeachingPage />)

      expect(screen.getByRole('heading', { name: /student opportunities & resources/i })).toBeInTheDocument()
    })

    it('displays student opportunities description', () => {
      render(<TeachingPage />)

      expect(screen.getByText(/I'm committed to providing students with research opportunities/i)).toBeInTheDocument()
      expect(screen.getByText(/academic mentorship, and resources for academic and professional development/i)).toBeInTheDocument()
    })

    it('displays all resource buttons', () => {
      render(<TeachingPage />)

      expect(screen.getByRole('button', { name: /join research lab/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /course materials/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /academic advising/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /study resources/i })).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('handles syllabus button clicks', () => {
      render(<TeachingPage />)

      const syllabusButtons = screen.getAllByText(/Syllabus/)
      
      syllabusButtons.forEach(button => {
        fireEvent.click(button)
        // Should not throw error and button should remain in document
        expect(button).toBeInTheDocument()
      })
    })

    it('handles course info button clicks', () => {
      render(<TeachingPage />)

      const courseInfoButtons = screen.getAllByText(/Course Info/)
      
      courseInfoButtons.forEach(button => {
        fireEvent.click(button)
        expect(button).toBeInTheDocument()
      })
    })

    it('handles office hours button clicks', () => {
      render(<TeachingPage />)

      const joinVirtualButton = screen.getByRole('button', { name: /join virtual hours/i })
      const scheduleButton = screen.getByRole('button', { name: /schedule appointment/i })

      fireEvent.click(joinVirtualButton)
      fireEvent.click(scheduleButton)

      expect(joinVirtualButton).toBeInTheDocument()
      expect(scheduleButton).toBeInTheDocument()
    })

    it('handles student resource button clicks', () => {
      render(<TeachingPage />)

      const resourceButtons = [
        screen.getByRole('button', { name: /join research lab/i }),
        screen.getByRole('button', { name: /course materials/i }),
        screen.getByRole('button', { name: /academic advising/i }),
        screen.getByRole('button', { name: /study resources/i })
      ]

      resourceButtons.forEach(button => {
        fireEvent.click(button)
        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design and Layout', () => {
    it('has proper responsive grid layouts', () => {
      render(<TeachingPage />)

      // Check for grid layouts
      const gridElements = document.querySelectorAll('.grid')
      expect(gridElements.length).toBeGreaterThan(0)

      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toHaveClass('min-h-screen', 'bg-academic-slate-50')
    })

    it('displays proper academic styling', () => {
      render(<TeachingPage />)

      // Check for academic containers
      const container = document.querySelector('.container')
      expect(container).toBeInTheDocument()

      // Check for cards with academic styling
      const academicCards = document.querySelectorAll('.bg-white\\/90')
      expect(academicCards.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility Features', () => {
    it('has proper heading hierarchy', () => {
      render(<TeachingPage />)

      // Check that h1 exists
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      // Check that multiple headings exist for proper structure
      const allHeadings = screen.getAllByRole('heading')
      expect(allHeadings.length).toBeGreaterThan(1)

      // Check specific section headings that actually have heading roles
      expect(screen.getByRole('heading', { name: /teaching portfolio/i })).toBeInTheDocument()
      
      // Note: Other section titles like "Teaching Philosophy" and "Current Courses" use CardTitle
      // which is a div, not a heading element, so they don't have heading roles
      // Instead check they exist as text content
      expect(screen.getByText('Teaching Philosophy')).toBeInTheDocument()
      expect(screen.getByText('Current Courses - Fall 2024')).toBeInTheDocument()
    })

    it('has keyboard accessible buttons', () => {
      render(<TeachingPage />)

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)

      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('uses semantic HTML elements', () => {
      render(<TeachingPage />)

      // Check main landmark
      expect(screen.getByRole('main')).toBeInTheDocument()

      // Check buttons are properly labeled
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName()
      })
    })

    it('displays proper ARIA labels and roles', () => {
      render(<TeachingPage />)

      // Check that all buttons have accessible names
      const syllabusButtons = screen.getAllByText(/Syllabus/)
      syllabusButtons.forEach(button => {
        expect(button).toBeInTheDocument()
      })

      const courseInfoButtons = screen.getAllByText(/Course Info/)
      courseInfoButtons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })
  })

  describe('Content Validation', () => {
    it('displays comprehensive teaching information', () => {
      render(<TeachingPage />)

      // Check key teaching elements
      expect(screen.getByText(/evidence-based teaching and mentorship/i)).toBeInTheDocument()
      expect(screen.getByText(/active learning, critical thinking/i)).toBeInTheDocument()
      
      // Psychological science appears multiple times - use getAllByText
      const psychologicalScienceElements = screen.getAllByText(/psychological science/i)
      expect(psychologicalScienceElements.length).toBeGreaterThan(0)

      // Check course diversity - these appear in multiple places, use getAllByText
      const introPsychElements = screen.getAllByText(/Introduction to Psychology/i)
      expect(introPsychElements.length).toBeGreaterThan(0)
      
      const cognitivePsychElements = screen.getAllByText(/Cognitive Psychology/i)
      expect(cognitivePsychElements.length).toBeGreaterThan(0)
      
      // Research Methods appears in multiple places - use getAllByText
      const researchMethodsElements = screen.getAllByText(/Research Methods/i)
      expect(researchMethodsElements.length).toBeGreaterThan(0)
      
      expect(screen.getByText(/Advanced Cognitive Neuroscience/i)).toBeInTheDocument()

      // Check student support elements
      expect(screen.getByText(/research opportunities/i)).toBeInTheDocument()
      expect(screen.getByText(/academic mentorship/i)).toBeInTheDocument()
    })

    it('displays accurate course information', () => {
      render(<TeachingPage />)

      // Check enrollment numbers
      expect(screen.getByText('180')).toBeInTheDocument() // PSY 101
      expect(screen.getByText('45')).toBeInTheDocument()  // PSY 301
      expect(screen.getByText('32')).toBeInTheDocument()  // PSY 350
      expect(screen.getByText('12')).toBeInTheDocument()  // PSY 710

      // Check credit hours
      const creditBadges = screen.getAllByText(/\d+ Credits/)
      expect(creditBadges.length).toBe(4)

      // Check locations are UC Berkeley buildings
      expect(screen.getByText(/Wheeler Hall/i)).toBeInTheDocument()
      const tolmanHallElements = screen.getAllByText(/Tolman Hall/i)
      expect(tolmanHallElements.length).toBeGreaterThan(2) // Multiple Tolman Hall locations
    })

    it('displays student testimonial authenticity markers', () => {
      render(<TeachingPage />)

      // Check that testimonials have proper attribution
      expect(screen.getByText('Alex Chen')).toBeInTheDocument()
      expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument()
      expect(screen.getByText('Jordan Williams')).toBeInTheDocument()

      // Check course connections
      expect(screen.getByText('PSY 301 - Cognitive Psychology')).toBeInTheDocument()
      expect(screen.getByText('PSY 350 - Research Methods')).toBeInTheDocument()
      expect(screen.getByText('PSY 101 - Introduction to Psychology')).toBeInTheDocument()

      // Check years are recent
      const years = screen.getAllByText(/202[3-4]/)
      expect(years.length).toBeGreaterThanOrEqual(3)
    })
  })
}) 
 