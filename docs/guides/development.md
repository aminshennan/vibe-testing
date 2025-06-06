# Development Guide

This guide will help you set up and work with Dr. Sarah Mitchell's Academic Portfolio codebase.

## 🚀 Quick Setup

### Prerequisites
- **Node.js** 18+ (recommended: use nvm)
- **pnpm** (preferred package manager)
- **Git** for version control
- **VS Code** (recommended editor)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
portfolio/
├── app/                               # Next.js App Router pages
│   ├── (pages)/                       # Route groups
│   │   ├── contact/                   # Contact page
│   │   ├── cv/                        # CV/Resume page
│   │   ├── publications/              # Publications pages
│   │   ├── research/                  # Research pages
│   │   └── teaching/                  # Teaching page
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Homepage
├── components/                        # React components
│   ├── ui/                           # Base UI components (Shadcn)
│   ├── academic/                     # Academic-specific components
│   ├── layout/                       # Layout components
│   └── shared/                       # Shared utility components
├── data/                             # JSON data files
│   ├── academic-data.json            # Personal and academic info
│   ├── research-projects.json        # Research project data
│   ├── publications.json             # Publications database
│   └── teaching-data.json            # Teaching information
├── lib/                              # Utility functions
│   ├── utils.ts                      # General utilities
│   ├── data.ts                       # Data loading functions
│   └── types.ts                      # TypeScript type definitions
├── hooks/                            # Custom React hooks
├── contexts/                         # React context providers
├── styles/                           # Additional stylesheets
├── public/                           # Static assets
└── docs/                             # Documentation
```

## 🛠️ Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
pnpm dev

# Run tests
pnpm test

# Build to verify
pnpm build
```

### 2. Code Quality
```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Format code
pnpm format

# Run all checks
pnpm check-all
```

### 3. Testing
```bash
# Unit tests
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## 📝 Content Management

### Academic Data
Edit `data/academic-data.json` for:
- Personal information
- Contact details
- Professional summary
- Skills and expertise

### Research Projects
Edit `data/research-projects.json` for:
- Project descriptions
- Research areas
- Collaborations
- Publications links

### Publications
Edit `data/publications.json` for:
- Journal articles
- Conference papers
- Book chapters
- Presentations

### Teaching Information
Edit `data/teaching-data.json` for:
- Course listings
- Teaching philosophy
- Student resources
- Office hours

## 🎨 Styling Guidelines

### Tailwind CSS Classes
```tsx
// Academic color palette
className="bg-primary-navy text-white"
className="text-academic-green"
className="border-accent-gold"
className="bg-accent-burgundy"

// Typography
className="font-serif text-2xl"      // Headings
className="font-sans text-base"      // Body text
className="font-mono text-sm"        // Code/technical

// Spacing (academic-specific)
className="space-y-academic"         // Vertical spacing
className="p-academic-lg"            // Large padding
className="m-academic-sm"            // Small margin
```

### Component Patterns
```tsx
// Academic card component
<AcademicCard
  title="Research Project"
  description="Project description"
  tags={["Psychology", "Research"]}
  variant="research"
/>

// Academic button
<AcademicButton
  variant="primary"
  size="lg"
  className="academic-cta"
>
  View Publications
</AcademicButton>
```

## 🧪 Testing Patterns

### Component Testing
```tsx
import { render, screen } from '@testing-library/react'
import { AcademicCard } from '@/components/academic/academic-card'

describe('AcademicCard', () => {
  it('renders with academic styling', () => {
    render(
      <AcademicCard
        title="Test Project"
        description="Test description"
        variant="research"
      />
    )
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })
})
```

### E2E Testing
```typescript
import { test, expect } from '@playwright/test'

test('academic portfolio navigation', async ({ page }) => {
  await page.goto('/')
  
  // Test navigation
  await page.click('text=Research')
  await expect(page).toHaveURL('/research')
  
  // Test academic content
  await expect(page.locator('.research-grid')).toBeVisible()
})
```

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
CONTACT_EMAIL=sarah.mitchell@berkeley.edu
```

### TypeScript Configuration
Key settings in `tsconfig.json`:
- Strict mode enabled
- Path aliases configured
- Academic-specific type definitions

### Tailwind Configuration
Custom academic theme in `tailwind.config.ts`:
- Academic color palette
- Typography scale
- Spacing system
- Component variants

## 📊 Performance Optimization

### Image Optimization
```tsx
import Image from 'next/image'

// Optimized academic images
<Image
  src="/research/project-image.jpg"
  alt="Research project visualization"
  width={800}
  height={600}
  className="academic-image"
  priority={isAboveFold}
/>
```

### Code Splitting
```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const ResearchVisualization = dynamic(
  () => import('@/components/research/research-visualization'),
  { loading: () => <AcademicSkeleton /> }
)
```

### Bundle Analysis
```bash
# Analyze bundle size
pnpm analyze

# Check performance
pnpm lighthouse
```

## 🐛 Debugging

### Common Issues

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Type Errors:**
```bash
# Check TypeScript
pnpm type-check

# Generate types
pnpm generate-types
```

**Styling Issues:**
```bash
# Rebuild Tailwind
pnpm build-css

# Check Tailwind config
pnpm tailwind-debug
```

### Development Tools
- **React DevTools** - Component debugging
- **Next.js DevTools** - Performance analysis
- **Tailwind DevTools** - CSS debugging
- **TypeScript Language Server** - Type checking

## 🚀 Deployment

### Build Process
```bash
# Production build
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel
vercel --prod
```

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Type checking clean
- [ ] Linting clean
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Academic content reviewed

---

*For deployment specifics, see the [Deployment Guide](./deployment.md).* 