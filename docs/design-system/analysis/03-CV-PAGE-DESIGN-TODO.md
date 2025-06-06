# CV Page Design Optimization Todo List

## Overview
Comprehensive design improvements for the CV/Resume page applying modern design principles to create a professional, accessible, and visually compelling academic CV presentation.

## 📋 Table of Contents
- [Visual Hierarchy & Typography](#visual-hierarchy--typography)
- [Professional Layout System](#professional-layout-system)
- [Interactive Features](#interactive-features)
- [Mobile Optimization](#mobile-optimization)
- [Accessibility Enhancements](#accessibility-enhancements)
- [Performance Optimization](#performance-optimization)
- [Print Optimization](#print-optimization)

---

## 🎯 Visual Hierarchy & Typography

### P0 - Critical Improvements

#### Typography Enhancement
```typescript
// app/cv/page.tsx - Enhanced typography structure
<section className="academic-section-primary">
  <div className="academic-container-narrow">
    <header className="cv-header-section">
      <h1 className="academic-heading-hero text-center mb-6">
        Dr. Sarah Mitchell, Ph.D.
      </h1>
      <p className="academic-intro-text text-center">
        Professor of Psychology | Research Director | Author
      </p>
    </header>
  </div>
</section>
```

#### Section Hierarchy Standardization
```typescript
// components/cv/cv-section.tsx
interface CVSectionProps {
  title: string
  icon?: React.ReactNode
  priority: 'primary' | 'secondary' | 'tertiary'
  children: React.ReactNode
}

const CVSection = ({ title, icon, priority, children }: CVSectionProps) => {
  const headingClasses = {
    primary: 'academic-heading-2 text-primary-navy border-b-2 border-primary-navy pb-2',
    secondary: 'academic-heading-3 text-academic-slate-700 border-b border-academic-slate-300 pb-2',
    tertiary: 'academic-heading-4 text-academic-slate-600'
  }

  return (
    <section className="cv-section mb-8">
      <header className="cv-section-header mb-6">
        <h2 className={headingClasses[priority]}>
          {icon && <span className="mr-3">{icon}</span>}
          {title}
        </h2>
      </header>
      <div className="cv-section-content">
        {children}
      </div>
    </section>
  )
}
```

### P1 - High Priority

#### Enhanced Reading Experience
```css
/* app/globals.css - CV-specific typography */
.cv-header-section {
  padding: var(--spacing-responsive-2xl) 0;
  background: linear-gradient(135deg, var(--academic-slate-50) 0%, white 100%);
  border-bottom: 1px solid var(--academic-slate-200);
}

.cv-section {
  margin-bottom: var(--spacing-responsive-xl);
}

.cv-section-header h2 {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.cv-section-content {
  padding-left: var(--spacing-md);
  border-left: 2px solid var(--academic-slate-100);
  transition: border-color var(--duration-normal) var(--easing-standard);
}

.cv-section-content:hover {
  border-left-color: var(--primary-navy);
}
```

#### Timeline-Based Layout
```typescript
// components/cv/timeline-item.tsx
interface TimelineItemProps {
  startDate: string
  endDate?: string
  title: string
  institution: string
  description?: string
  achievements?: string[]
  type: 'education' | 'experience' | 'research' | 'award'
}

const TimelineItem = ({ 
  startDate, 
  endDate, 
  title, 
  institution, 
  description, 
  achievements,
  type 
}: TimelineItemProps) => {
  const typeColors = {
    education: 'border-l-primary-navy bg-primary-navy/5',
    experience: 'border-l-academic-green bg-academic-green/5',
    research: 'border-l-accent-gold bg-accent-gold/5',
    award: 'border-l-accent-burgundy bg-accent-burgundy/5'
  }

  return (
    <article className={`timeline-item ${typeColors[type]} border-l-4 p-6 mb-4 rounded-r-lg transition-all duration-normal hover:shadow-academic`}>
      <header className="timeline-header mb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="academic-heading-4 text-primary-navy mb-1">
              {title}
            </h3>
            <p className="academic-body-sm text-academic-slate-600 font-semibold">
              {institution}
            </p>
          </div>
          <time className="cv-date-range text-academic-slate-500 text-sm font-medium whitespace-nowrap">
            {startDate} {endDate ? `- ${endDate}` : '- Present'}
          </time>
        </div>
      </header>
      
      {description && (
        <p className="academic-body text-academic-slate-600 mb-3">
          {description}
        </p>
      )}
      
      {achievements && achievements.length > 0 && (
        <ul className="achievement-list space-y-2">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="achievement-bullet w-2 h-2 bg-primary-navy rounded-full mt-2 flex-shrink-0" />
              <span className="academic-body-sm text-academic-slate-600">
                {achievement}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
```

---

## 🏗 Professional Layout System

### P0 - Critical Layout Structure

#### Grid-Based CV Layout
```css
/* CV-specific layout system */
.cv-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-responsive-xl);
  max-width: 1024px;
  margin: 0 auto;
  padding: var(--spacing-responsive-lg);
}

@media (min-width: 1024px) {
  .cv-layout-two-column {
    grid-template-columns: 1fr 300px;
    gap: var(--spacing-4xl);
  }
}

.cv-main-content {
  order: 1;
}

.cv-sidebar {
  order: 2;
  background: var(--academic-slate-50);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  border: 1px solid var(--academic-slate-200);
  height: fit-content;
  position: sticky;
  top: var(--spacing-xl);
}

@media (max-width: 1023px) {
  .cv-sidebar {
    order: 0;
    position: static;
    background: white;
    border: none;
    padding: 0;
  }
}
```

#### Contact Information Enhancement
```typescript
// components/cv/contact-info.tsx
interface ContactInfoProps {
  email: string
  phone?: string
  website?: string
  location: string
  orcid?: string
  linkedIn?: string
  googleScholar?: string
}

const ContactInfo = ({ 
  email, 
  phone, 
  website, 
  location, 
  orcid, 
  linkedIn, 
  googleScholar 
}: ContactInfoProps) => {
  return (
    <section className="contact-info-section">
      <h3 className="academic-heading-5 text-primary-navy mb-4">
        Contact Information
      </h3>
      
      <div className="contact-details space-y-3">
        <ContactItem 
          icon={<Mail className="w-4 h-4" />}
          label="Email"
          value={email}
          href={`mailto:${email}`}
        />
        
        {phone && (
          <ContactItem 
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={phone}
            href={`tel:${phone}`}
          />
        )}
        
        <ContactItem 
          icon={<MapPin className="w-4 h-4" />}
          label="Location"
          value={location}
        />
        
        {website && (
          <ContactItem 
            icon={<Globe className="w-4 h-4" />}
            label="Website"
            value={website}
            href={website}
            external
          />
        )}
      </div>
      
      {(orcid || linkedIn || googleScholar) && (
        <div className="academic-profiles mt-6 pt-4 border-t border-academic-slate-200">
          <h4 className="academic-caption text-academic-slate-600 mb-3">
            Academic Profiles
          </h4>
          <div className="profile-links space-y-2">
            {orcid && (
              <ProfileLink 
                icon={<ExternalLink className="w-4 h-4" />}
                label="ORCID"
                href={`https://orcid.org/${orcid}`}
              />
            )}
            {googleScholar && (
              <ProfileLink 
                icon={<BookOpen className="w-4 h-4" />}
                label="Google Scholar"
                href={googleScholar}
              />
            )}
            {linkedIn && (
              <ProfileLink 
                icon={<LinkedinIcon className="w-4 h-4" />}
                label="LinkedIn"
                href={linkedIn}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
```

### P1 - Enhanced Features

#### Skills & Expertise Visualization
```typescript
// components/cv/skills-section.tsx
interface SkillCategory {
  category: string
  skills: Array<{
    name: string
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    years?: number
  }>
}

const SkillsSection = ({ categories }: { categories: SkillCategory[] }) => {
  return (
    <section className="skills-section">
      <h3 className="academic-heading-5 text-primary-navy mb-6">
        Skills & Expertise
      </h3>
      
      <div className="skills-categories space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="skill-category">
            <h4 className="academic-caption text-academic-slate-600 mb-3">
              {category.category}
            </h4>
            <div className="skills-grid grid grid-cols-1 gap-2">
              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const SkillItem = ({ skill }: { skill: any }) => {
  const levelColors = {
    beginner: 'bg-academic-slate-200',
    intermediate: 'bg-accent-gold/30',
    advanced: 'bg-academic-green/30',
    expert: 'bg-primary-navy/30'
  }

  return (
    <div className="skill-item flex items-center justify-between p-2 rounded-lg border border-academic-slate-200 hover:border-academic-slate-300 transition-colors">
      <span className="academic-body-sm font-medium text-academic-slate-700">
        {skill.name}
      </span>
      {skill.level && (
        <span className={`skill-level px-2 py-1 rounded text-xs font-medium ${levelColors[skill.level]}`}>
          {skill.level}
        </span>
      )}
    </div>
  )
}
```

---

## 🎛 Interactive Features

### P0 - Essential Interactivity

#### Section Navigation & Anchor Links
```typescript
// components/cv/cv-navigation.tsx
const CVNavigation = ({ sections }: { sections: string[] }) => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <nav className="cv-navigation sticky top-4 bg-white border border-academic-slate-200 rounded-lg p-4 shadow-academic-subtle">
      <h4 className="academic-caption text-academic-slate-600 mb-3">
        Quick Navigation
      </h4>
      <ul className="nav-links space-y-2">
        {sections.map((section) => (
          <li key={section}>
            <button
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              className={`nav-link block w-full text-left p-2 rounded transition-colors academic-body-sm ${
                activeSection === section
                  ? 'bg-primary-navy text-white'
                  : 'text-academic-slate-600 hover:bg-academic-slate-100'
              }`}
            >
              {section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

#### Download & Share Options
```typescript
// components/cv/cv-actions.tsx
const CVActions = () => {
  const handleDownloadPDF = async () => {
    // Implementation for PDF generation
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Dr. Sarah Mitchell - Curriculum Vitae',
        url: window.location.href
      })
    }
  }

  return (
    <div className="cv-actions fixed bottom-6 right-6 z-50">
      <div className="action-buttons flex flex-col gap-3">
        <Button
          variant="academic-primary"
          size="academic-lg"
          onClick={handleDownloadPDF}
          className="shadow-academic-professional"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        
        <Button
          variant="academic-secondary"
          size="academic-md"
          onClick={handleShare}
          className="shadow-academic"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
```

### P1 - Enhanced Interactions

#### Expandable Sections
```typescript
// components/cv/expandable-section.tsx
interface ExpandableSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  icon?: React.ReactNode
}

const ExpandableSection = ({ 
  title, 
  children, 
  defaultExpanded = true,
  icon 
}: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <section className="expandable-section border border-academic-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="section-toggle w-full flex items-center justify-between p-4 bg-academic-slate-50 hover:bg-academic-slate-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <h3 className="academic-heading-4 text-primary-navy flex items-center gap-3">
          {icon}
          {title}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-academic-slate-600 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div 
        className={`section-content transition-all duration-normal ${
          isExpanded ? 'max-h-full opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </section>
  )
}
```

---

## 📱 Mobile Optimization

### P0 - Mobile-First Design

#### Responsive CV Layout
```css
/* Mobile-optimized CV styles */
@media (max-width: 768px) {
  .cv-layout {
    padding: var(--spacing-lg);
    gap: var(--spacing-lg);
  }

  .cv-header-section {
    padding: var(--spacing-xl) 0;
  }

  .timeline-item {
    padding: var(--spacing-lg);
    border-left-width: 3px;
  }

  .timeline-header {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .cv-date-range {
    align-self: flex-start;
    background: var(--academic-slate-100);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-md);
    font-size: 0.75rem;
  }

  .cv-actions {
    position: static;
    margin-top: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: var(--academic-slate-50);
    border-radius: var(--radius-lg);
  }

  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
}
```

#### Touch-Friendly Interactions
```typescript
// Enhanced mobile interactions
const useTouchFriendly = () => {
  useEffect(() => {
    const addTouchClass = () => {
      if ('ontouchstart' in window) {
        document.body.classList.add('touch-device')
      }
    }

    addTouchClass()
  }, [])
}

// CSS for touch devices
/* Touch device optimizations */
.touch-device .timeline-item {
  min-height: 44px; /* Minimum touch target */
}

.touch-device .nav-link {
  min-height: 44px;
  display: flex;
  align-items: center;
}

.touch-device .section-toggle {
  min-height: 56px;
}
```

---

## ♿ Accessibility Enhancements

### P0 - Critical Accessibility

#### Semantic Structure
```typescript
// Proper semantic HTML structure
const CVPage = () => {
  return (
    <main className="cv-main" role="main">
      <header className="cv-header-section">
        <h1>Dr. Sarah Mitchell, Ph.D.</h1>
        <p className="academic-intro-text">
          Professor of Psychology | Research Director | Author
        </p>
      </header>

      <nav className="cv-table-of-contents" aria-label="CV sections">
        <h2 className="sr-only">Table of Contents</h2>
        {/* Navigation items */}
      </nav>

      <section id="education" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        {/* Education content */}
      </section>

      <section id="experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional Experience</h2>
        {/* Experience content */}
      </section>

      {/* Additional sections */}
    </main>
  )
}
```

#### Screen Reader Optimization
```typescript
// Enhanced screen reader support
const TimelineItem = ({ item }: { item: any }) => {
  return (
    <article 
      className="timeline-item"
      aria-labelledby={`item-${item.id}-title`}
      aria-describedby={`item-${item.id}-details`}
    >
      <h3 id={`item-${item.id}-title`}>
        {item.title}
      </h3>
      
      <div id={`item-${item.id}-details`}>
        <p>
          <span className="sr-only">Institution: </span>
          {item.institution}
        </p>
        <time dateTime={item.startDate}>
          <span className="sr-only">Duration: </span>
          {item.dateRange}
        </time>
      </div>
      
      {item.achievements && (
        <ul aria-label="Key achievements">
          {item.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
```

---

## 🚀 Performance Optimization

### P1 - Performance Enhancements

#### Lazy Loading & Code Splitting
```typescript
// components/cv/index.tsx
const EducationSection = lazy(() => import('./education-section'))
const ExperienceSection = lazy(() => import('./experience-section'))
const PublicationsSection = lazy(() => import('./publications-section'))

const CVPage = () => {
  return (
    <div className="cv-page">
      <CVHeader />
      
      <Suspense fallback={<SectionSkeleton />}>
        <EducationSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <PublicationsSection />
      </Suspense>
    </div>
  )
}
```

#### Image Optimization
```typescript
// Professional headshot optimization
const ProfessionalPhoto = () => {
  return (
    <div className="professional-photo">
      <Image
        src="/images/dr-sarah-mitchell-professional.jpg"
        alt="Dr. Sarah Mitchell, Professor of Psychology"
        width={300}
        height={300}
        priority
        className="rounded-full shadow-academic-professional"
        sizes="(max-width: 768px) 200px, 300px"
      />
    </div>
  )
}
```

---

## 🖨 Print Optimization

### P1 - Print-Friendly Design

#### Print Styles
```css
/* Print-specific styles */
@media print {
  .cv-page {
    font-size: 12pt;
    line-height: 1.4;
    color: black;
  }

  .cv-header-section {
    background: none !important;
    border: none !important;
    padding: 0 !important;
  }

  .cv-actions,
  .cv-navigation,
  .section-toggle {
    display: none !important;
  }

  .expandable-section .section-content {
    max-height: none !important;
    opacity: 1 !important;
    overflow: visible !important;
  }

  .timeline-item {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 1rem;
    border-left: 2px solid #333;
    background: none;
  }

  .academic-heading-2 {
    border-bottom: 1px solid #333;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
  }

  /* Ensure proper page breaks */
  .cv-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* Print URLs for links */
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  a[href^="mailto"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
}
```

---

## 📊 Success Metrics

### Design Principle Adherence
- **Simplicity**: Clean, uncluttered CV layout with clear information hierarchy
- **Functionality**: Easy navigation, download options, and mobile optimization
- **User-Centered Design**: Professional presentation optimized for academic audiences
- **Consistency**: Uniform typography, spacing, and component design
- **Visual Hierarchy**: Clear section organization and content prioritization
- **Accessibility**: WCAG 2.1 AA compliance with screen reader optimization
- **Responsiveness**: Mobile-first design with touch-friendly interactions

### Performance Targets
- **Load Time**: < 2 seconds on 3G networks
- **Print Generation**: < 3 seconds for PDF export
- **Mobile Usability**: 95%+ on PageSpeed Insights
- **Accessibility Score**: 100% on Lighthouse audit

### User Experience Goals
- **Professional Impression**: Enhanced credibility and visual appeal
- **Information Findability**: 90% task completion rate for section navigation
- **Mobile Usage**: 40% improvement in mobile engagement
- **Download Rate**: 25% increase in CV downloads

---

## 🏁 Implementation Priority

### Phase 1 (Week 1): Foundation
- [ ] Implement semantic CV structure
- [ ] Create timeline-based layout system
- [ ] Add basic mobile responsiveness
- [ ] Implement print optimization

### Phase 2 (Week 2): Enhancement
- [ ] Add interactive navigation
- [ ] Implement download functionality
- [ ] Create expandable sections
- [ ] Enhance accessibility features

### Phase 3 (Week 3): Polish
- [ ] Performance optimization
- [ ] Advanced mobile interactions
- [ ] Print style refinement
- [ ] Comprehensive testing

**Files Modified**: `app/cv/page.tsx`, `components/cv/*`, `app/globals.css`
**Dependencies**: `react-to-print`, `jspdf` (for PDF generation)
**Testing**: Print preview, mobile testing, accessibility audit 