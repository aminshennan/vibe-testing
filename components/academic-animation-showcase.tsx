'use client'

import { useState } from 'react'
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react'

interface AnimationDemo {
  name: string
  description: string
  className: string
  duration: string
  easing: string
  category: 'entrance' | 'hover' | 'emphasis' | 'transition'
}

const animationDemos: AnimationDemo[] = [
  {
    name: 'Slide Up',
    description: 'Smooth upward entrance animation for content reveals',
    className: 'academic-animate-slide-up',
    duration: 'var(--duration-animation)',
    easing: 'var(--easing-decelerate)',
    category: 'entrance'
  },
  {
    name: 'Scale In',
    description: 'Gentle scale animation for modal and popup entrances',
    className: 'academic-animate-scale-in',
    duration: 'var(--duration-feedback)',
    easing: 'var(--easing-emphasized)',
    category: 'entrance'
  },
  {
    name: 'Fade Slide',
    description: 'Combined fade and slide for elegant content transitions',
    className: 'academic-animate-fade-slide',
    duration: 'var(--duration-transition)',
    easing: 'var(--easing-academic)',
    category: 'entrance'
  },
  {
    name: 'Hover Lift',
    description: 'Subtle lift effect for interactive cards and buttons',
    className: 'academic-hover-lift',
    duration: 'var(--duration-micro)',
    easing: 'var(--easing-decelerate)',
    category: 'hover'
  }
]

const timingTokens = [
  { name: 'Instant', value: '0ms', use: 'Immediate state changes' },
  { name: 'Micro', value: '100ms', use: 'Micro-interactions (hover, focus)' },
  { name: 'Fast', value: '150ms', use: 'Quick transitions' },
  { name: 'Normal', value: '250ms', use: 'Standard transitions' },
  { name: 'Feedback', value: '200ms', use: 'User feedback responses' },
  { name: 'Animation', value: '500ms', use: 'Complex animations' }
]

export function AcademicAnimationShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const triggerAnimation = (animationName: string) => {
    setActiveDemo(null)
    setTimeout(() => setActiveDemo(animationName), 50)
  }

  return (
    <div className="academic-container academic-section">
      <header className="text-center academic-component-spacing">
        <h2 className="academic-heading-2">Academic Animation System</h2>
        <p className="academic-body-lg max-w-prose mx-auto">
          Standardized timing and easing functions for consistent, accessible animations.
        </p>
      </header>

      {/* Animation Demos */}
      <section className="academic-component-spacing">
        <h3 className="academic-heading-3 mb-6">Animation Examples</h3>
        
        <div className="academic-grid-auto">
          {animationDemos.map((demo) => (
            <div key={demo.name} className="academic-card academic-card--interactive">
              <div className="academic-card__header">
                <h4 className="academic-heading-5">{demo.name}</h4>
                <span className="academic-body-sm text-primary-navy capitalize">
                  {demo.category}
                </span>
              </div>
              
              <div className="academic-card__body">
                <div className="mb-4 p-6 bg-academic-slate-50 rounded-lg flex items-center justify-center min-h-[120px]">
                  <div
                    className={`
                      w-16 h-16 bg-primary-navy rounded-lg
                      ${activeDemo === demo.name ? demo.className : ''}
                      ${demo.category === 'hover' ? demo.className : ''}
                    `}
                  />
                </div>
                
                <p className="academic-body-sm mb-4">{demo.description}</p>
                
                <div className="academic-stack--sm text-xs text-academic-slate-500">
                  <div><strong>Duration:</strong> {demo.duration}</div>
                  <div><strong>Easing:</strong> {demo.easing}</div>
                </div>
              </div>
              
              <div className="academic-card__footer">
                <button
                  onClick={() => triggerAnimation(demo.name)}
                  className="academic-button academic-button--sm academic-button--ghost"
                >
                  Trigger Animation
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timing Reference */}
      <section className="academic-component-spacing">
        <h3 className="academic-heading-3 mb-6">Timing Tokens</h3>
        
        <div className="academic-grid-3">
          {timingTokens.map((token) => (
            <div key={token.name} className="academic-card">
              <div className="academic-card__body">
                <h4 className="academic-heading-5 mb-2">{token.name}</h4>
                <div className="academic-stack--xs">
                  <code className="text-sm font-mono">{token.value}</code>
                  <p className="academic-body-sm text-academic-slate-600">{token.use}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 