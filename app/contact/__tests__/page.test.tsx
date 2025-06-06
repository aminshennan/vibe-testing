import { render, screen, fireEvent, waitFor as _waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContactPage from '@/app/contact/page'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/contact',
}))

// Mock framer-motion completely
jest.mock('framer-motion', () => ({
  useMotionValue: () => 0,
  useTransform: () => 0,
  useEffect: jest.fn(),
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}))

// Mock data functions
jest.mock('@/lib/data', () => ({
  getPersonalInfo: () => ({
    name: 'Dr. Sarah Mitchell',
    title: 'Professor of Psychology',
    email: 'sarah.mitchell@berkeley.edu',
    phone: '+1 (510) 123-4567',
    office: 'Tolman Hall, Room 3210',
    institution: 'UC Berkeley',
  }),
}))

// Mock advanced animations
jest.mock('@/components/advanced-animations', () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PageTransition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock AcademicContactForm
jest.mock('@/components/academic-contact-form', () => ({
  AcademicContactForm: () => (
    <div data-testid="academic-contact-form">
      <form>
        <h2>Contact Form</h2>
        <div>
          <label htmlFor="name">Name *</label>
          <input id="name" type="text" required />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" required />
        </div>
        <div>
          <label htmlFor="subject">Subject *</label>
          <input id="subject" type="text" required />
        </div>
        <div>
          <label htmlFor="inquiry-type">Inquiry Type</label>
          <select id="inquiry-type">
            <option value="academic">Academic Inquiry</option>
            <option value="research">Research Collaboration</option>
            <option value="media">Media Request</option>
            <option value="student">Student Question</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message *</label>
          <textarea id="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  ),
}))

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Page Structure and SEO', () => {
    it('renders with proper page structure and heading', () => {
      render(<ContactPage />)

      // Check main heading specifically (h1 level)
      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('Contact')
      
      // Check main content structure
      const mainContent = screen.getByRole('main')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveClass('min-h-screen')

      // Check page description
      expect(screen.getByText(/I welcome inquiries from students, fellow researchers/i)).toBeInTheDocument()
    })

    it('has proper semantic structure with accessible elements', () => {
      render(<ContactPage />)

      // Check main role
      expect(screen.getByRole('main')).toBeInTheDocument()
      
      // Check multiple headings exist for good structure
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(1)
    })
  })

  describe('Contact Methods Section', () => {
    it('displays all four contact method cards', () => {
      render(<ContactPage />)

      // Check that all contact method cards are present
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Office')).toBeInTheDocument()
      expect(screen.getByText('Appointment')).toBeInTheDocument()
    })

    it('displays correct contact information for each method', () => {
      render(<ContactPage />)

      // Email contact - use getAllByText since email appears in multiple places
      const emailElements = screen.getAllByText('sarah.mitchell@berkeley.edu')
      expect(emailElements.length).toBeGreaterThan(0)
      expect(screen.getByText('Best for: Academic inquiries, research questions')).toBeInTheDocument()
      expect(screen.getByText('Response within 24-48 hours')).toBeInTheDocument()

      // Phone contact - use getAllByText since phone appears in multiple places
      const phoneElements = screen.getAllByText('+1 (510) 123-4567')
      expect(phoneElements.length).toBeGreaterThan(0)
      expect(screen.getByText('Best for: Urgent matters, media inquiries')).toBeInTheDocument()
      expect(screen.getByText('Available during office hours')).toBeInTheDocument()

      // Office contact
      expect(screen.getByText('Tolman Hall, Room 3210')).toBeInTheDocument()
      expect(screen.getByText('UC Berkeley')).toBeInTheDocument()
      expect(screen.getByText('In-person meetings by appointment')).toBeInTheDocument()

      // Appointment contact
      expect(screen.getByText('Schedule a meeting')).toBeInTheDocument()
      expect(screen.getByText('Best for: Extended discussions, collaboration planning')).toBeInTheDocument()
      expect(screen.getByText('Flexible scheduling available')).toBeInTheDocument()
    })
  })

  describe('Contact Form Section', () => {
    it('renders the academic contact form', () => {
      render(<ContactPage />)

      const contactForm = screen.getByTestId('academic-contact-form')
      expect(contactForm).toBeInTheDocument()
      expect(screen.getByText('Contact Form')).toBeInTheDocument()
    })

    it('displays all required form fields', () => {
      render(<ContactPage />)

      // Check that form elements exist
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/inquiry type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('has proper form field types and accessibility', () => {
      render(<ContactPage />)

      // Check input types
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toHaveAttribute('type', 'email')

      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toHaveAttribute('type', 'text')

      // Check required fields
      expect(screen.getByLabelText(/name/i)).toBeRequired()
      expect(screen.getByLabelText(/email/i)).toBeRequired()
      expect(screen.getByLabelText(/subject/i)).toBeRequired()
      expect(screen.getByLabelText(/message/i)).toBeRequired()
    })
  })

  describe('Office Hours Section', () => {
    it('displays office hours heading and all scheduled times', () => {
      render(<ContactPage />)

      // Check office hours heading
      expect(screen.getByText('Office Hours')).toBeInTheDocument()

      // Check all days are displayed
      expect(screen.getByText('Tuesday')).toBeInTheDocument()
      expect(screen.getByText('Thursday')).toBeInTheDocument()
      expect(screen.getByText('Wednesday')).toBeInTheDocument()
      expect(screen.getByText('Friday')).toBeInTheDocument()
    })

    it('displays correct times and types for each office hour', () => {
      render(<ContactPage />)

      // Check specific time slots
      const timeSlots = screen.getAllByText(/2:00 PM - 4:00 PM/)
      expect(timeSlots).toHaveLength(2) // Tuesday and Thursday

      const virtualSlots = screen.getAllByText(/1:00 PM - 2:00 PM/)
      expect(virtualSlots).toHaveLength(2) // Wednesday and Friday

      // Check types
      expect(screen.getAllByText('In-person')).toHaveLength(2)
      expect(screen.getAllByText('Virtual')).toHaveLength(2)
    })

    it('displays schedule appointment button', () => {
      render(<ContactPage />)

      const scheduleButton = screen.getByRole('button', { name: /schedule appointment/i })
      expect(scheduleButton).toBeInTheDocument()
      expect(scheduleButton).toHaveClass('w-full')
    })

    it('handles schedule appointment button click', () => {
      render(<ContactPage />)

      const scheduleButton = screen.getByRole('button', { name: /schedule appointment/i })
      fireEvent.click(scheduleButton)
      
      // Button should be clickable (no error thrown)
      expect(scheduleButton).toBeInTheDocument()
    })
  })

  describe('Quick Contact Info Section', () => {
    it('displays quick contact information', () => {
      render(<ContactPage />)

      // Check quick contact heading
      expect(screen.getByText('Quick Contact')).toBeInTheDocument()

      // Check contact details
      expect(screen.getByText('Direct Email')).toBeInTheDocument()
      expect(screen.getByText('Office Phone')).toBeInTheDocument()
      expect(screen.getByText('Mailing Address')).toBeInTheDocument()

      // Check actual contact values appear multiple times (in different sections)
      const emailElements = screen.getAllByText('sarah.mitchell@berkeley.edu')
      expect(emailElements.length).toBeGreaterThan(0)

      const phoneElements = screen.getAllByText('+1 (510) 123-4567')
      expect(phoneElements.length).toBeGreaterThan(0)
    })

    it('displays complete mailing address', () => {
      render(<ContactPage />)

      expect(screen.getByText('Department of Psychology')).toBeInTheDocument()
      expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument()
      expect(screen.getByText('Berkeley, CA 94720-1650')).toBeInTheDocument()
    })
  })

  describe('Response Times Section', () => {
    it('displays response times for different inquiry types', () => {
      render(<ContactPage />)

      // Check response times heading
      expect(screen.getByText('Response Times')).toBeInTheDocument()

      // Check different inquiry types
      expect(screen.getByText('Academic Inquiries')).toBeInTheDocument()
      expect(screen.getByText('Media Requests')).toBeInTheDocument()
      expect(screen.getByText('Student Questions')).toBeInTheDocument()
      expect(screen.getByText('Collaboration')).toBeInTheDocument()

      // Check response time badges
      expect(screen.getByText('24-48 hours')).toBeInTheDocument()
      expect(screen.getByText('Same day')).toBeInTheDocument()
      expect(screen.getByText('1-2 days')).toBeInTheDocument()
      expect(screen.getByText('2-3 days')).toBeInTheDocument()
    })
  })

  describe('Emergency Contact Section', () => {
    it('displays emergency contact information', () => {
      render(<ContactPage />)

      // Check emergency contact heading
      expect(screen.getByText('Emergency Contact')).toBeInTheDocument()

      // Check emergency description
      expect(screen.getByText(/For urgent academic matters or time-sensitive research opportunities/i)).toBeInTheDocument()

      // Check emergency phone number
      const emergencyPhoneElements = screen.getAllByText('+1 (510) 123-4567')
      expect(emergencyPhoneElements.length).toBeGreaterThan(0)

      // Check usage warning
      expect(screen.getByText(/Please use sparingly and only for genuine emergencies/i)).toBeInTheDocument()
    })
  })

  describe('Responsive Design and Layout', () => {
    it('has responsive grid layouts', () => {
      render(<ContactPage />)

      // Check for responsive grid classes in contact methods
      const contactMethodsGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4')
      expect(contactMethodsGrid).toBeInTheDocument()

      // Check for main layout grid
      const mainLayoutGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3')
      expect(mainLayoutGrid).toBeInTheDocument()
    })

    it('contains proper background and styling classes', () => {
      render(<ContactPage />)

      const mainContent = screen.getByRole('main')
      expect(mainContent).toHaveClass('min-h-screen', 'bg-academic-slate-50', 'text-academic-slate-900')
    })
  })

  describe('User Interactions', () => {
    it('handles form submission attempt', async () => {
      render(<ContactPage />)

      // Get form elements
      const nameInput = screen.getByLabelText(/name/i)
      const emailInput = screen.getByLabelText(/email/i)
      const subjectInput = screen.getByLabelText(/subject/i)
      const messageInput = screen.getByLabelText(/message/i)
      const submitButton = screen.getByRole('button', { name: /send message/i })

      // Fill out form
      fireEvent.change(nameInput, { target: { value: 'John Doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
      fireEvent.change(subjectInput, { target: { value: 'Research Inquiry' } })
      fireEvent.change(messageInput, { target: { value: 'I am interested in your research.' } })

      // Submit form
      fireEvent.click(submitButton)

      // Form should handle submission (no errors thrown)
      expect(submitButton).toBeInTheDocument()
    })

    it('allows selection of different inquiry types', () => {
      render(<ContactPage />)

      const inquirySelect = screen.getByLabelText(/inquiry type/i)
      expect(inquirySelect).toBeInTheDocument()

      // Check options are present
      expect(screen.getByRole('option', { name: /academic inquiry/i })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /research collaboration/i })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /media request/i })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: /student question/i })).toBeInTheDocument()

      // Test selection change
      fireEvent.change(inquirySelect, { target: { value: 'research' } })
      expect(inquirySelect).toHaveValue('research')
    })
  })

  describe('Accessibility Features', () => {
    it('has proper heading hierarchy', () => {
      render(<ContactPage />)

      // Check that h1 exists
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()

      // Check that multiple headings exist for proper structure
      const allHeadings = screen.getAllByRole('heading')
      expect(allHeadings.length).toBeGreaterThan(1)
    })

    it('has proper form labels and associations', () => {
      render(<ContactPage />)

      // Check that form inputs have proper labels
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('has keyboard accessible elements', () => {
      render(<ContactPage />)

      // Check that interactive elements can receive focus
      const scheduleButton = screen.getByRole('button', { name: /schedule appointment/i })
      const submitButton = screen.getByRole('button', { name: /send message/i })

      expect(scheduleButton).not.toHaveAttribute('tabindex', '-1')
      expect(submitButton).not.toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Content Validation', () => {
    it('displays all expected text content', () => {
      render(<ContactPage />)

      // Check key phrases
      expect(screen.getByText(/cognitive psychology and educational neuroscience/i)).toBeInTheDocument()
      expect(screen.getByText(/Please choose the most appropriate contact method below/i)).toBeInTheDocument()
      expect(screen.getByText(/Need to meet outside these hours/i)).toBeInTheDocument()
    })

    it('has consistent contact information across sections', () => {
      render(<ContactPage />)

      // Email should appear in multiple places
      const emailOccurrences = screen.getAllByText('sarah.mitchell@berkeley.edu')
      expect(emailOccurrences.length).toBeGreaterThanOrEqual(2)

      // Phone should appear in multiple places
      const phoneOccurrences = screen.getAllByText('+1 (510) 123-4567')
      expect(phoneOccurrences.length).toBeGreaterThanOrEqual(2)
    })
  })
}) 
 