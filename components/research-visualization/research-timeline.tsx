'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarIcon, BookOpenIcon, FlaskConicalIcon, UsersIcon, ChevronRightIcon } from 'lucide-react'
import type { ResearchProject } from '@/lib/research-data'
import { FloatingCard } from '../advanced-animations/micro-interactions'

interface TimelineEvent {
  id: string
  date: string
  type: 'project' | 'publication' | 'milestone'
  title: string
  description: string
  status?: string
  metadata?: {
    funding?: string
    collaborators?: string[]
    impact?: string
  }
}

interface ResearchTimelineProps {
  events: TimelineEvent[]
  className?: string
}

const typeConfig = {
  project: {
    icon: FlaskConicalIcon,
    color: 'bg-academic-green',
    textColor: 'text-academic-green',
    borderColor: 'border-academic-green'
  },
  publication: {
    icon: BookOpenIcon,
    color: 'bg-primary-navy',
    textColor: 'text-primary-navy',
    borderColor: 'border-primary-navy'
  },
  milestone: {
    icon: UsersIcon,
    color: 'bg-accent-gold',
    textColor: 'text-accent-gold',
    borderColor: 'border-accent-gold'
  }
}

function TimelineEventCard({ event, index, isLast }: { 
  event: TimelineEvent
  index: number
  isLast: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const config = typeConfig[event.type]
  const IconComponent = config.icon

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -50 : 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  }

  return (
    <div ref={ref} className="relative flex items-center">
      {/* Timeline line */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 top-16 w-0.5 h-24 bg-academic-slate-200 z-0"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          style={{ originY: 0 }}
        />
      )}

      {/* Timeline dot */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 ${config.color} rounded-full flex items-center justify-center shadow-lg z-10`}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 15,
          delay: index * 0.1
        }}
        whileHover={{ scale: 1.1 }}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </motion.div>

      {/* Event card */}
      <motion.div
        className={`w-full ${index % 2 === 0 ? 'pr-8' : 'pl-8'} ${
          index % 2 === 0 ? 'text-right' : 'text-left'
        }`}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <FloatingCard intensity={0.02} scale={1.02}>
          <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Event header */}
                <div className={`flex items-start gap-3 ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon className="w-4 h-4 text-academic-slate-500" />
                      <span className="text-sm text-academic-slate-500 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                    <h3 className={`text-lg font-semibold ${config.textColor} leading-tight`}>
                      {event.title}
                    </h3>
                    <p className="text-academic-slate-600 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  
                  <Badge className={`${config.borderColor} ${config.textColor} border shrink-0`}>
                    {event.type}
                  </Badge>
                </div>

                {/* Event metadata */}
                {event.metadata && (
                  <motion.div
                    className="space-y-2 pt-4 border-t border-academic-slate-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                  >
                    {event.metadata.funding && (
                      <div className={`text-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="font-medium text-academic-slate-700">Funding: </span>
                        <span className="text-academic-slate-600">{event.metadata.funding}</span>
                      </div>
                    )}
                    
                    {event.metadata.collaborators && event.metadata.collaborators.length > 0 && (
                      <div className={`text-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="font-medium text-academic-slate-700">Collaborators: </span>
                        <span className="text-academic-slate-600">
                          {event.metadata.collaborators.join(', ')}
                        </span>
                      </div>
                    )}

                    {event.metadata.impact && (
                      <div className={`text-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <span className="font-medium text-academic-slate-700">Impact: </span>
                        <span className="text-academic-slate-600">{event.metadata.impact}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Expandable details */}
                <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <Button
                    size="sm"
                    className={`${config.textColor} bg-transparent hover:bg-current/5 border-none shadow-none text-xs`}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show Less' : 'View Details'}
                    <ChevronRightIcon className={`w-3 h-3 ml-1 transition-transform ${
                      isExpanded ? 'rotate-90' : 'rotate-0'
                    }`} />
                  </Button>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <motion.div
                    className="pt-4 border-t border-academic-slate-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className={`text-sm text-academic-slate-600 space-y-2 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <p>Additional project details, methodologies, outcomes, and future implications would be displayed here.</p>
                      <p>This could include links to publications, datasets, or related projects.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </FloatingCard>
      </motion.div>
    </div>
  )
}

export function ResearchTimeline({ events, className = '' }: ResearchTimelineProps) {
  const [filter, setFilter] = useState<string | null>(null)
  
  const filteredEvents = filter 
    ? events.filter(event => event.type === filter)
    : events

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Timeline filters */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 p-1 bg-academic-slate-100 rounded-lg">
          <Button
            size="sm"
            className={`${!filter ? 'bg-white shadow-sm' : 'bg-transparent'} border-none`}
            onClick={() => setFilter(null)}
          >
            All Events
          </Button>
          {Object.entries(typeConfig).map(([type, config]) => (
            <Button
              key={type}
              size="sm"
              className={`${filter === type ? 'bg-white shadow-sm' : 'bg-transparent'} border-none`}
              onClick={() => setFilter(type)}
            >
              <config.icon className="w-4 h-4 mr-1" />
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline events */}
      <div className="relative">
        <div className="space-y-16">
          {sortedEvents.map((event, index) => (
            <TimelineEventCard
              key={event.id}
              event={event}
              index={index}
              isLast={index === sortedEvents.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to convert research data to timeline events
export function createTimelineFromResearchData(researchData: any): TimelineEvent[] {
  const events: TimelineEvent[] = []

  // Add research projects
  const allProjects = [
    ...researchData.researchProjects.active,
    ...researchData.researchProjects.completed,
    ...researchData.researchProjects.planned
  ]

  allProjects.forEach((project: ResearchProject) => {
    events.push({
      id: `project-${project.id}`,
      date: project.startDate,
      type: 'project',
      title: project.title,
      description: project.description,
      status: project.status,
      metadata: {
        funding: project.funding.amount,
        collaborators: project.collaborators.map((c: any) => 
          typeof c === 'string' ? c : c.name
        ).slice(0, 3), // Limit to first 3 collaborators
        impact: `${project.students.graduate + project.students.undergraduate} students involved`
      }
    })
  })

  return events
} 
 