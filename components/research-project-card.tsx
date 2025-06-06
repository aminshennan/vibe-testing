import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, DollarSignIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import type { ResearchProject } from "@/lib/research-data"

interface ResearchProjectCardProps {
  project: ResearchProject
}

const statusConfig = {
  active: {
    color: 'bg-academic-green/10 border-academic-green text-academic-green',
    label: 'Active'
  },
  completed: {
    color: 'bg-primary-navy/10 border-primary-navy text-primary-navy',
    label: 'Completed'
  },
  planned: {
    color: 'bg-accent-gold/10 border-accent-gold text-accent-gold',
    label: 'Planning'
  }
}

export function ResearchProjectCard({ project }: ResearchProjectCardProps) {
  const statusStyle = statusConfig[project.status as keyof typeof statusConfig]
  
  // Calculate project duration
  const startYear = new Date(project.startDate).getFullYear()
  const endYear = new Date(project.endDate).getFullYear()
  const duration = startYear === endYear ? `${startYear}` : `${startYear}-${endYear}`
  
  // Calculate team size
  const teamSize = project.students.graduate + project.students.undergraduate + project.collaborators.length

  return (
    <article className="academic-card academic-card--interactive academic-component-spacing--tight">
      <header className="academic-card__header">
        <div className="flex items-start justify-between mb-3">
          <h3 className="academic-heading-4 flex-1 pr-3">
            {project.title}
          </h3>
          <Badge 
            variant="outline" 
            className={`text-xs font-medium shrink-0 ${statusStyle.color}`}
          >
            {statusStyle.label}
          </Badge>
        </div>
        
        {/* Project metadata */}
        <div className="flex items-center gap-4 text-sm text-academic-slate-500">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            {teamSize} team members
          </span>
          <span className="flex items-center gap-1">
            <DollarSignIcon className="w-4 h-4" />
            {project.funding.amount}
          </span>
        </div>
      </header>
      
      <div className="academic-card__body">
        <p className="academic-body">
          {project.description}
        </p>
        
        {/* Keywords with better spacing */}
        {project.keywords && project.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.keywords.slice(0, 3).map((keyword) => (
              <Badge 
                key={keyword} 
                variant="outline" 
                className="text-xs bg-academic-slate-50 hover:bg-academic-slate-100 transition-colors border-academic-slate-200 text-academic-slate-600"
              >
                {keyword}
              </Badge>
            ))}
            {project.keywords.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs bg-academic-slate-50 border-academic-slate-200 text-academic-slate-500"
              >
                +{project.keywords.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
        
      <footer className="academic-card__footer">
        <div className="flex items-center justify-between">
          <span className="academic-body-sm">
            {project.funding.source}
          </span>
          <Link 
            href={`/research/${project.slug}`}
            className="academic-button academic-button--ghost academic-button--sm"
          >
            Learn more
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </footer>
    </article>
  )
} 