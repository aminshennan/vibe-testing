'use client'

import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUpIcon, UsersIcon, BookOpenIcon, DollarSignIcon, AwardIcon, GlobeIcon } from 'lucide-react'
import { CountUpAnimation } from '../advanced-animations/micro-interactions'

interface MetricData {
  id: string
  label: string
  value: number
  change: number
  changeLabel: string
  icon: React.ComponentType<any>
  color: string
  description: string
  trend: 'up' | 'down' | 'stable'
}

interface ChartDataPoint {
  label: string
  value: number
  year: number
}

interface ImpactMetricsProps {
  metrics: MetricData[]
  publicationTrend: ChartDataPoint[]
  citationTrend: ChartDataPoint[]
  className?: string
}

function AnimatedProgressBar({ 
  value, 
  maxValue, 
  color, 
  delay = 0 
}: { 
  value: number
  maxValue: number
  color: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const percentage = (value / maxValue) * 100

  return (
    <div ref={ref} className="w-full bg-academic-slate-100 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`h-full ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ 
          duration: 1.5, 
          delay,
          type: 'spring',
          stiffness: 100,
          damping: 15
        }}
      />
    </div>
  )
}

function MetricCard({ metric, index }: { metric: MetricData, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const IconComponent = metric.icon

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  }

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return '↗️'
      case 'down':
        return '↘️'
      default:
        return '➡️'
    }
  }

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-academic-green'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-academic-slate-500'
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50 hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Metric header */}
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <motion.span 
                className={`text-sm font-medium ${getTrendColor()} flex items-center gap-1`}
                whileHover={{ scale: 1.05 }}
              >
                {getTrendIcon()} {metric.changeLabel}
              </motion.span>
            </div>

            {/* Metric value */}
            <div>
              <CountUpAnimation 
                value={metric.value}
                className="text-3xl font-bold text-primary-navy"
                duration={2}
              />
              <p className="text-sm text-academic-slate-600 mt-1">{metric.label}</p>
            </div>

            {/* Metric description */}
            <p className="text-xs text-academic-slate-500 leading-relaxed">
              {metric.description}
            </p>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-academic-slate-500">
                <span>Progress</span>
                <span>{Math.round((metric.value / 100) * 100)}%</span>
              </div>
              <AnimatedProgressBar
                value={metric.value}
                maxValue={100}
                color={metric.color}
                delay={index * 0.2}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SimpleBarChart({ 
  data, 
  title, 
  color 
}: { 
  data: ChartDataPoint[]
  title: string
  color: string
}) {
  const ref = useRef(null)
  const _isInView = useInView(ref, { once: true })
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary-navy">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="space-y-4">
          {data.map((item, index) => (
            <div key={item.year} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-academic-slate-600">{item.label}</span>
                <CountUpAnimation 
                  value={item.value}
                  className="font-medium text-primary-navy"
                  duration={1.5}
                />
              </div>
              <AnimatedProgressBar
                value={item.value}
                maxValue={maxValue}
                color={color}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CollaborationNetwork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const institutions = [
    { name: 'UC Berkeley', x: 50, y: 50, size: 'large', connections: 8 },
    { name: 'Stanford', x: 20, y: 30, size: 'medium', connections: 5 },
    { name: 'MIT', x: 80, y: 40, size: 'medium', connections: 4 },
    { name: 'Harvard', x: 30, y: 70, size: 'medium', connections: 6 },
    { name: 'Caltech', x: 70, y: 80, size: 'small', connections: 3 },
    { name: 'CMU', x: 15, y: 60, size: 'small', connections: 2 }
  ]

  const connections = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
    { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 }
  ]

  const getNodeSize = (size: string) => {
    switch (size) {
      case 'large': return 'w-16 h-16'
      case 'medium': return 'w-12 h-12'
      default: return 'w-8 h-8'
    }
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-academic-slate-200/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary-navy">Research Collaborations</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="relative h-64 bg-gradient-to-br from-academic-slate-50 to-primary-navy/5 rounded-lg p-4">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map((conn, index) => {
              const from = institutions[conn.from]
              const to = institutions[conn.to]
              return (
                <motion.line
                  key={index}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                />
              )
            })}
          </svg>

          {/* Institution nodes */}
          {institutions.map((inst, index) => (
            <motion.div
              key={inst.name}
              className={`absolute ${getNodeSize(inst.size)} bg-primary-navy rounded-full flex items-center justify-center shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
              style={{ left: `${inst.x}%`, top: `${inst.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
              title={`${inst.name} - ${inst.connections} collaborations`}
            >
              <span className="text-white text-xs font-bold">
                {inst.name.split(' ').map(word => word[0]).join('')}
              </span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function ImpactMetrics({ 
  metrics, 
  publicationTrend, 
  citationTrend,
  className = '' 
}: ImpactMetricsProps) {
  const [activeView, setActiveView] = useState<'overview' | 'trends' | 'network'>('overview')

  return (
    <div className={`space-y-8 ${className}`}>
      {/* View selector */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-academic-slate-100 rounded-lg">
          <Button
            size="sm"
            className={`${activeView === 'overview' ? 'bg-white shadow-sm' : 'bg-transparent'} border-none`}
            onClick={() => setActiveView('overview')}
          >
            <TrendingUpIcon className="w-4 h-4 mr-1" />
            Overview
          </Button>
          <Button
            size="sm"
            className={`${activeView === 'trends' ? 'bg-white shadow-sm' : 'bg-transparent'} border-none`}
            onClick={() => setActiveView('trends')}
          >
            <BookOpenIcon className="w-4 h-4 mr-1" />
            Trends
          </Button>
          <Button
            size="sm"
            className={`${activeView === 'network' ? 'bg-white shadow-sm' : 'bg-transparent'} border-none`}
            onClick={() => setActiveView('network')}
          >
            <GlobeIcon className="w-4 h-4 mr-1" />
            Network
          </Button>
        </div>
      </div>

      {/* Content based on active view */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>
        )}

        {activeView === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleBarChart
              data={publicationTrend}
              title="Publication Trends"
              color="bg-primary-navy"
            />
            <SimpleBarChart
              data={citationTrend}
              title="Citation Impact"
              color="bg-academic-green"
            />
          </div>
        )}

        {activeView === 'network' && (
          <div className="max-w-4xl mx-auto">
            <CollaborationNetwork />
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Helper function to create sample metrics data
export function createSampleMetricsData(): {
  metrics: MetricData[]
  publicationTrend: ChartDataPoint[]
  citationTrend: ChartDataPoint[]
} {
  const metrics: MetricData[] = [
    {
      id: 'publications',
      label: 'Total Publications',
      value: 67,
      change: 15,
      changeLabel: '+15% this year',
      icon: BookOpenIcon,
      color: 'bg-primary-navy',
      description: 'Peer-reviewed articles in top-tier journals',
      trend: 'up'
    },
    {
      id: 'citations',
      label: 'Total Citations',
      value: 89,
      change: 22,
      changeLabel: '+22% this year',
      icon: TrendingUpIcon,
      color: 'bg-academic-green',
      description: 'Citations across all published works',
      trend: 'up'
    },
    {
      id: 'h-index',
      label: 'h-Index',
      value: 24,
      change: 3,
      changeLabel: '+3 this year',
      icon: AwardIcon,
      color: 'bg-accent-burgundy',
      description: 'Research impact and productivity measure',
      trend: 'up'
    },
    {
      id: 'funding',
      label: 'Active Grants',
      value: 8,
      change: 2,
      changeLabel: '+2 new grants',
      icon: DollarSignIcon,
      color: 'bg-accent-gold',
      description: 'Currently funded research projects',
      trend: 'up'
    },
    {
      id: 'students',
      label: 'Students Mentored',
      value: 32,
      change: 8,
      changeLabel: '+8 this semester',
      icon: UsersIcon,
      color: 'bg-primary-navy',
      description: 'Graduate and undergraduate researchers',
      trend: 'up'
    },
    {
      id: 'collaborations',
      label: 'Collaborations',
      value: 15,
      change: 4,
      changeLabel: '+4 institutions',
      icon: GlobeIcon,
      color: 'bg-academic-green',
      description: 'Active research partnerships worldwide',
      trend: 'up'
    }
  ]

  const publicationTrend: ChartDataPoint[] = [
    { label: '2020', value: 12, year: 2020 },
    { label: '2021', value: 15, year: 2021 },
    { label: '2022', value: 18, year: 2022 },
    { label: '2023', value: 22, year: 2023 },
    { label: '2024', value: 25, year: 2024 }
  ]

  const citationTrend: ChartDataPoint[] = [
    { label: '2020', value: 245, year: 2020 },
    { label: '2021', value: 312, year: 2021 },
    { label: '2022', value: 389, year: 2022 },
    { label: '2023', value: 456, year: 2023 },
    { label: '2024', value: 523, year: 2024 }
  ]

  return { metrics, publicationTrend, citationTrend }
} 
 