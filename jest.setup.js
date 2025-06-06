import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
  useParams() {
    return {}
  },
  notFound: jest.fn(),
}))

// Mock Next.js Image component with priority prop support
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', {
      ...props,
      priority: undefined, // Remove priority prop to avoid the warning
    })
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock Clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
  },
  writable: true,
})

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: jest.fn(),
}))

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

// Mock Academic Portfolio specific globals
global.academicPortfolioTestUtils = {
  // Mock research data
  mockResearchProject: {
    id: 'test-project',
    title: 'Test Research Project',
    description: 'A test research project for unit testing',
    status: 'ongoing',
    startDate: '2024-01-01',
    researchArea: 'Cognitive Psychology',
    collaborators: ['Dr. Test'],
    funding: 'Test Grant',
    publications: [],
  },
  
  // Mock publication data
  mockPublication: {
    id: 'test-publication',
    title: 'Test Publication',
    authors: ['Mitchell, S.', 'Test, A.'],
    year: '2024',
    abstract: 'This is a test publication for unit testing purposes.',
    keywords: ['testing', 'jest', 'academic'],
    citationCount: 10,
    researchArea: 'Testing',
    publicationDate: '2024-01-01T00:00:00.000Z',
  },
  
  // Common test selectors
  selectors: {
    navigation: '[data-testid="main-navigation"]',
    publicationCard: '[data-testid="publication-card"]',
    researchCard: '[data-testid="research-card"]',
    searchInput: '[data-testid="search-input"]',
    filterSelect: '[data-testid="filter-select"]',
  },
}

// Set up console warnings for academic portfolio testing
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOMTestUtils.act is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Academic Portfolio Test Utilities
global.renderWithProviders = (ui, options = {}) => {
  const { preloadedState = {}, store = configureStore({ reducer: {} }), ...renderOptions } = options
  
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }
  
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

// Global test setup for academic content
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks()
  
  // Reset document title
  document.title = 'Academic Portfolio Test'
  
  // Clear local storage
  localStorage.clear()
  sessionStorage.clear()
})

// Set up web APIs for API route testing
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder 
 