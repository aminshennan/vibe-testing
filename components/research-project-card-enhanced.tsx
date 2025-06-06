'use client'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, DollarSignIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import type { ResearchProject } from "@/lib/research-data"
import { motion } from 'framer-motion'
import { FloatingCard, MagneticButton, GlowingBorder, CountUpAnimation } from './advanced-animations/micro-interactions'
import { useState } from 'react'

interface ResearchProjectCardEnhancedProps {
  project: ResearchProject
  index?: number
}

const statusConfig = {
  active: {
    color: 'bg-academic-green/10 border-academic-green text-academic-green',
    label: 'Active',
    glowColor: '#059669'
  },
  completed: {
    color: 'bg-primary-navy/10 border-primary-navy text-primary-navy',
    label: 'Completed',
    glowColor: '#3b82f6'
  },
  planned: {
    color: 'bg-accent-gold/10 border-accent-gold text-accent-gold',
    label: 'Planning',
    glowColor: '#f59e0b'
  }
}

export function ResearchProjectCardEnhanced({ project, index = 0 }: ResearchProjectCardEnhancedProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const statusStyle = statusConfig[project.status as keyof typeof statusConfig]
  
  // Calculate project duration and team size
  const startYear = new Date(project.startDate).getFullYear()
  const endYear = new Date(project.endDate).getFullYear()
  const duration = startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`
  const teamSize = project.students.graduate + project.students.undergraduate + project.collaborators.length

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  }

  const expandVariants = {
    collapsed: { height: 'auto', opacity: 1 },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <GlowingBorder glowColor={statusStyle.glowColor}>
        <FloatingCard intensity={0.02} scale={1.03}>
          <Card className="h-full flex flex-col bg-white/80 backdrop-blur-sm border border-academic-slate-200/50 overflow-hidden">
            <CardHeader className="pb-4 relative">
              {/* Animated status indicator */}
              <motion.div 
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Badge 
                  className={`text-xs font-medium ${statusStyle.color} relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">{statusStyle.label}</span>
                </Badge>
              </motion.div>

              <CardTitle className="text-lg font-semibold leading-tight text-primary-navy pr-20 group-hover:text-primary-navy-light transition-colors">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.span>
              </CardTitle>
              
              {/* Enhanced metadata with animations */}
              <motion.div 
                className="flex items-center gap-4 text-sm text-academic-slate-500 mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <CalendarIcon className="w-4 h-4" />
                  {duration}
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <UsersIcon className="w-4 h-4" />
                  <CountUpAnimation value={teamSize} duration={1} /> members
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <DollarSignIcon className="w-4 h-4" />
                  {project.funding.amount}
                </motion.span>
              </motion.div>
            </CardHeader>
            
            <CardContent className="pt-0 flex-1 flex flex-col">
              <motion.div
                variants={expandVariants}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                className="overflow-hidden"
              >
                <motion.p 
                  className="text-academic-slate-600 leading-relaxed mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.description}
                </motion.p>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 mb-4"
                  >
                    {/* Additional project details */}
                    <div className="bg-academic-slate-50/50 rounded-lg p-4">
                      <h4 className="font-medium text-academic-slate-800 mb-2">Project Team</h4>
                      <div className="text-sm text-academic-slate-600">
                        <p>Graduate Students: {project.students.graduate}</p>
                        <p>Undergraduate Students: {project.students.undergraduate}</p>
                        {project.collaborators.length > 0 && (
                          <p>Collaborators: {project.collaborators.join(', ')}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-academic-slate-50/50 rounded-lg p-4">
                      <h4 className="font-medium text-academic-slate-800 mb-2">Funding Details</h4>
                      <div className="text-sm text-academic-slate-600">
                        <p>Source: {project.funding.source}</p>
                        <p>Amount: {project.funding.amount}</p>
                        <p>Grant Number: {project.funding.grantNumber}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Enhanced keywords section */}
              {project.keywords && project.keywords.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.keywords.slice(0, 3).map((keyword, index) => (
                    <motion.div
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge 
                        className="text-xs bg-academic-slate-50 hover:bg-academic-slate-100 transition-colors border-academic-slate-200 text-academic-slate-600"
                      >
                        {keyword}
                      </Badge>
                    </motion.div>
                  ))}
                  {project.keywords.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge className="text-xs bg-academic-slate-50 border-academic-slate-200 text-academic-slate-500">
                        +{project.keywords.length - 3} more
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Enhanced action area */}
              <motion.div 
                className="flex items-center justify-between pt-3 border-t border-academic-slate-100 mt-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-xs text-academic-slate-500 font-medium">
                  {project.funding.source}
                </span>
                
                <div className="flex gap-2">
                  <MagneticButton
                    className="text-xs text-academic-slate-600 hover:text-primary-navy transition-colors px-2 py-1 rounded border-none bg-transparent"
                    strength={0.2}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show Less' : 'Details'}
                  </MagneticButton>
                  
                  <Button 
                    size="sm" 
                    className="text-primary-navy hover:text-primary-navy-dark hover:bg-primary-navy/5 ml-auto group/btn bg-transparent border-none shadow-none"
                    asChild
                  >
                    <Link href={`/research/${project.slug}`}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="flex items-center"
                      >
                        Learn more
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </motion.span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </FloatingCard>
      </GlowingBorder>
    </motion.div>
  )
} 
 