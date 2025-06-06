import { ReactNode } from 'react'

interface AcademicContentSectionProps {
  children: ReactNode
  title?: string
  subtitle?: string
  layout?: 'default' | 'sidebar' | 'featured' | 'stack'
  spacing?: 'default' | 'tight' | 'loose'
  background?: 'white' | 'slate' | 'transparent'
  containerWidth?: 'default' | 'narrow' | 'wide'
  className?: string
}

export function AcademicContentSection({
  children,
  title,
  subtitle,
  layout = 'default',
  spacing = 'default',
  background = 'transparent',
  containerWidth = 'default',
  className = ''
}: AcademicContentSectionProps) {
  const backgroundClasses = {
    white: 'academic-section-primary',
    slate: 'academic-section-secondary',
    transparent: ''
  }

  const spacingClasses = {
    default: 'academic-section',
    tight: 'academic-section--compact',
    loose: 'academic-section-lg'
  }

  const containerClasses = {
    default: 'academic-container',
    narrow: 'academic-container-narrow',
    wide: 'academic-container-wide'
  }

  const layoutClasses = {
    default: 'academic-stack--lg',
    sidebar: 'academic-sidebar',
    featured: 'academic-grid-featured',
    stack: 'academic-stack--xl'
  }

  return (
    <section 
      className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}
      aria-labelledby={title ? 'section-title' : undefined}
    >
      <div className={containerClasses[containerWidth]}>
        {(title || subtitle) && (
          <header className="academic-component-spacing--tight text-center">
            {subtitle && (
              <p className="academic-body-sm uppercase tracking-wider text-primary-navy font-medium mb-4">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 
                id="section-title"
                className="academic-heading-2 text-balance"
              >
                {title}
              </h2>
            )}
          </header>
        )}
        
        <div className={`${layoutClasses[layout]} academic-content-spacing`}>
          {children}
        </div>
      </div>
    </section>
  )
}

interface AcademicContentCardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'interactive'
  spacing?: 'compact' | 'default' | 'spacious'
  className?: string
}

export function AcademicContentCard({ 
  children, 
  variant = 'default',
  spacing = 'default',
  className = '' 
}: AcademicContentCardProps) {
  const variantClasses = {
    default: 'academic-card',
    elevated: 'academic-card academic-card--elevated',
    interactive: 'academic-card academic-card--interactive'
  }

  const spacingClasses = {
    compact: 'academic-card--compact',
    default: '',
    spacious: 'academic-card--spacious'
  }

  return (
    <article className={`${variantClasses[variant]} ${spacingClasses[spacing]} ${className}`}>
      <div className="academic-card__body academic-stack--md">
        {children}
      </div>
    </article>
  )
}

interface AcademicContentGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4 | 'auto'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AcademicContentGrid({ 
  children, 
  columns = 'auto',
  gap = 'lg',
  className = '' 
}: AcademicContentGridProps) {
  const gridClasses = {
    2: 'academic-grid-2',
    3: 'academic-grid-3', 
    4: 'academic-grid-4',
    'auto': 'academic-grid-auto'
  }

  return (
    <div className={`${gridClasses[columns]} ${className}`} style={{ '--grid-gap': `var(--spacing-${gap})` } as React.CSSProperties}>
      {children}
    </div>
  )
} 