'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface FloatingCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  scale?: number
}

export function FloatingCard({ 
  children, 
  className = '', 
  intensity = 0.03,
  scale = 1.02 
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity * 15}deg`, `${-intensity * 15}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${-intensity * 15}deg`, `${intensity * 15}deg`])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    x.set((mouseX / width) - 0.5)
    y.set((mouseY / height) - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({ 
  children, 
  className = '',
  strength = 0.4,
  onClick,
  disabled,
  type = 'button'
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.button>
  )
}

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
}

export function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      skewY: 7,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface GlowingBorderProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowingBorder({ 
  children, 
  className = '',
  glowColor = '#3b82f6'
}: GlowingBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 rounded-lg blur-sm"
        style={{
          background: `linear-gradient(45deg, ${glowColor}40, ${glowColor}20)`,
        }}
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          hover: { opacity: 1, scale: 1.05 },
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative bg-white rounded-lg">
        {children}
      </div>
    </motion.div>
  )
}

interface CountUpAnimationProps {
  value: number
  duration?: number
  className?: string
}

export function CountUpAnimation({ 
  value, 
  duration = 2, 
  className = '' 
}: CountUpAnimationProps) {
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        motionValue.set(value)
      }}
      transition={{ duration }}
    >
      <motion.span>{rounded}</motion.span>
    </motion.span>
  )
}

export const academicMicroInteractions = {
  cardHover: {
    scale: 1.02,
    y: -4,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  buttonPress: {
    scale: 0.95,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
} 
 