'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const getItemVariants = (direction: string, distance: number) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  }

  return {
    hidden: {
      opacity: 0,
      ...directions[direction as keyof typeof directions],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  }
}

export function StaggeredContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  duration = 0.6,
  direction: _direction = 'up',
  distance: _distance = 30,
}: StaggeredContainerProps) {
  const customContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
        duration,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={customContainerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredItem({
  children,
  className = '',
  direction: _direction = 'up',
  distance: _distance = 30,
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}) {
  const itemVariants = getItemVariants(_direction, _distance)

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

// Scroll-triggered staggered animation
export function ScrollStaggeredContainer({
  children,
  className = '',
  staggerDelay: _staggerDelay = 0.1,
  threshold = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  )
} 
 