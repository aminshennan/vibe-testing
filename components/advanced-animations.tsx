"use client"

import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode, useState, useEffect } from 'react'

// Academic-themed animation variants
export const academicVariants = {
  // Page transitions
  pageEntry: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },

  // Staggered children animations
  academicStagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Card hover effects
  academicCard: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(30, 58, 138, 0.15)",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  },

  // Text animations
  academicText: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  },

  // Button interactions
  academicButton: {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  },

  // Badge animations
  academicBadge: {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  },

  // Academic achievement effect
  academicAchievement: {
    initial: { scale: 0.5, opacity: 0, rotate: -10 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  }
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      variants={academicVariants.pageEntry}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered animation wrapper
interface ScrollRevealProps {
  children: ReactNode
  variant?: keyof typeof academicVariants
  className?: string
  threshold?: number
  once?: boolean
}

export function ScrollReveal({ 
  children, 
  variant = 'academicText', 
  className = '',
  threshold = 0.1,
  once = true 
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={academicVariants[variant]}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      {children}
    </motion.div>
  )
}

// Academic card with hover effects
interface AcademicCardProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
}

export function AcademicCard({ children, className = '', href, onClick }: AcademicCardProps) {
  const cardProps = {
    className,
    variants: academicVariants.academicCard,
    initial: "initial",
    animate: "animate",
    whileHover: "hover",
    whileTap: "tap"
  }

  if (href) {
    return (
      <motion.a href={href} {...cardProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div onClick={onClick} {...cardProps}>
      {children}
    </motion.div>
  )
}

// Staggered list animation
interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredList({ children, className = '', staggerDelay = 0.1 }: StaggeredListProps) {
  const staggerVariants = {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  }

  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial="initial"
      animate="animate"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={academicVariants.academicText}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Academic progress indicator
interface AcademicProgressProps {
  progress: number
  label?: string
  className?: string
}

export function AcademicProgress({ progress, label, className = '' }: AcademicProgressProps) {
  const progressSpring = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <motion.div 
          className="text-sm font-medium text-academic-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {label}
        </motion.div>
      )}
      <div className="w-full bg-academic-slate-200 rounded-full h-2">
        <motion.div
          className="bg-primary-navy h-2 rounded-full"
          style={{
            width: useTransform(progressSpring, (latest) => `${latest}%`)
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// Floating academic badges
interface FloatingBadgeProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FloatingBadge({ children, delay = 0, className = '' }: FloatingBadgeProps) {
  return (
    <motion.div
      className={className}
      variants={academicVariants.academicBadge}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}

// Academic achievement animation
interface AcademicAchievementProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AcademicAchievement({ children, className = '', delay = 0 }: AcademicAchievementProps) {
  return (
    <motion.div
      className={className}
      variants={academicVariants.academicAchievement}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect
interface ParallaxScrollProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function ParallaxScroll({ children, offset = 50, className = '' }: ParallaxScrollProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, offset])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

// Academic loading skeleton
interface LoadingSkeletonProps {
  className?: string
  lines?: number
}

export function LoadingSkeleton({ className = '', lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-academic-slate-200 rounded h-4"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1
          }}
          style={{
            width: index === lines - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  )
}

// Academic typewriter effect
interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, speed = 50, className = '', onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-primary-navy"
      >
        |
      </motion.span>
    </motion.span>
  )
}

// Academic hover card
interface HoverCardProps {
  children: ReactNode
  hoverContent: ReactNode
  className?: string
}

export function HoverCard({ children, hoverContent, className = '' }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-10 p-4 bg-white border border-academic-slate-200 rounded-lg shadow-lg top-full left-0 mt-2"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {hoverContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Academic pulse effect
interface PulseEffectProps {
  children: ReactNode
  color?: string
  className?: string
}

export function PulseEffect({ children, color = '#1e3a8a', className = '' }: PulseEffectProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: [
          `0 0 0 0 ${color}40`,
          `0 0 0 10px ${color}20`,
          `0 0 0 20px ${color}10`,
          `0 0 0 0 ${color}00`
        ]
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
} 