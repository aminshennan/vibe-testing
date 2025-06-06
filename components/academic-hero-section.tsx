import Link from 'next/link'
import { ArrowRightIcon, DownloadIcon, MailIcon } from 'lucide-react'

interface AcademicHeroSectionProps {
  title: string
  subtitle?: string
  description: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  showAvatar?: boolean
  avatarSrc?: string
  backgroundVariant?: 'default' | 'gradient' | 'minimal'
}

export function AcademicHeroSection({
  title,
  subtitle,
  description,
  ctaText = 'Learn More',
  ctaHref = '/about',
  secondaryCtaText,
  secondaryCtaHref,
  showAvatar = true,
  avatarSrc = '/images/sarah-mitchell-hero.jpg',
  backgroundVariant = 'default'
}: AcademicHeroSectionProps) {
  const backgroundClasses = {
    default: 'academic-hero-section',
    gradient: 'academic-hero-section bg-gradient-to-br from-academic-slate-50 via-white to-primary-navy/5',
    minimal: 'bg-white'
  }

  return (
    <section 
      className={`${backgroundClasses[backgroundVariant]} academic-section--hero`}
      aria-labelledby="hero-title"
    >
      <div className="academic-container">
        <div className="academic-grid-featured items-center">
          {/* Content Side */}
          <div className="academic-stack--lg">
            {subtitle && (
              <p className="academic-body-sm uppercase tracking-wider text-primary-navy font-medium">
                {subtitle}
              </p>
            )}
            
            <h1 
              id="hero-title"
              className="academic-heading-1 text-balance"
            >
              {title}
            </h1>
            
            <p className="academic-body-xl text-balance max-w-prose">
              {description}
            </p>
            
            {/* Action Buttons */}
            <div className="academic-cluster--lg mt-8">
              <Link
                href={ctaHref}
                className="academic-button academic-button--primary academic-button--lg"
                aria-describedby="primary-cta-description"
              >
                {ctaText}
                <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
              
              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="academic-button academic-button--secondary academic-button--lg"
                >
                  {secondaryCtaHref.includes('cv') || secondaryCtaHref.includes('resume') ? (
                    <DownloadIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  ) : secondaryCtaHref.includes('contact') || secondaryCtaHref.includes('mailto') ? (
                    <MailIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  ) : null}
                  {secondaryCtaText}
                </Link>
              )}
            </div>

            {/* Assistive text for screen readers */}
            <span id="primary-cta-description" className="sr-only">
              Navigate to learn more about Dr. Sarah Mitchell&apos;s work and research
            </span>
          </div>
          
          {/* Avatar/Image Side */}
          {showAvatar && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="academic-card academic-card--elevated w-80 h-80 rounded-full overflow-hidden">
                  <img
                    src={avatarSrc}
                    alt="Dr. Sarah Mitchell"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                
                {/* Decorative elements */}
                <div 
                  className="absolute -top-4 -right-4 w-24 h-24 bg-primary-navy/10 rounded-full -z-10"
                  aria-hidden="true"
                />
                <div 
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold/10 rounded-full -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Stats or Quick Links */}
        <div className="academic-stats-grid mt-16" role="region" aria-label="Key statistics">
          <div className="academic-stat-item">
            <div className="academic-stat-number">15+</div>
            <div className="academic-stat-label">Years Experience</div>
          </div>
          <div className="academic-stat-item">
            <div className="academic-stat-number">50+</div>
            <div className="academic-stat-label">Publications</div>
          </div>
          <div className="academic-stat-item">
            <div className="academic-stat-number">12</div>
            <div className="academic-stat-label">Active Projects</div>
          </div>
          <div className="academic-stat-item">
            <div className="academic-stat-number">500+</div>
            <div className="academic-stat-label">Citations</div>
          </div>
        </div>
      </div>
    </section>
  )
}