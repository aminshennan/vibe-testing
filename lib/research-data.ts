import researchData from "@/data/research-data.json"

// Export the research data
export const data = researchData

// Type definitions for research data
export type ResearchData = typeof researchData

export interface ResearchProject {
  id: string
  title: string
  slug: string
  status: string
  startDate: string
  endDate: string
  funding: {
    source: string
    amount: string
    grantNumber: string
  }
  researchQuestions: string[]
  methodology: {
    approach: string
    participants: string
    duration: string
    techniques: string[]
  }
  collaborators: Array<{
    name: string
    institution: string
    role: string
  }>
  students: {
    graduate: number
    undergraduate: number
    opportunities: boolean
  }
  publications: string[]
  description: string
  impact: string
  keywords: string[]
}

export interface ResearchArea {
  name: string
  description: string
  projects: string[]
}

export interface ResearchImpact {
  totalFunding: string
  totalPublications: number
  totalStudents: number
  collaboratingInstitutions: number
  ongoingProjects: number
  completedProjects: number
  plannedProjects: number
}

// Helper function to get all research data
export function getResearchData(): ResearchData {
  return data
}

// Helper function to get research projects by status
export function getResearchProjectsByStatus(status: "active" | "completed" | "planned"): ResearchProject[] {
  return data.researchProjects[status]
}

// Helper function to get a specific research project by slug
export function getResearchProjectBySlug(slug: string): ResearchProject | undefined {
  const allProjects = [
    ...data.researchProjects.active,
    ...data.researchProjects.completed,
    ...data.researchProjects.planned
  ]
  return allProjects.find(project => project.slug === slug)
}

// Helper function to get research areas
export function getResearchAreas(): ResearchArea[] {
  return data.researchAreas
}

// Helper function to get research impact metrics
export function getResearchImpact(): ResearchImpact {
  return data.researchImpact
}

// Helper function to search research projects
export function searchResearchProjects(query: string): ResearchProject[] {
  const allProjects = [
    ...data.researchProjects.active,
    ...data.researchProjects.completed,
    ...data.researchProjects.planned
  ]
  
  const lowercaseQuery = query.toLowerCase()
  
  return allProjects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    project.funding.source.toLowerCase().includes(lowercaseQuery)
  )
}

// Helper function to filter research projects by area
export function filterResearchProjectsByArea(areaName: string): ResearchProject[] {
  const area = data.researchAreas.find(a => a.name.toLowerCase() === areaName.toLowerCase())
  if (!area) return []
  
  const allProjects = [
    ...data.researchProjects.active,
    ...data.researchProjects.completed,
    ...data.researchProjects.planned
  ]
  
  return allProjects.filter(project => area.projects.includes(project.id))
}

// Helper function to get related projects
export function getRelatedProjects(projectId: string, limit: number = 3): ResearchProject[] {
  const currentProject = getResearchProjectBySlug(projectId)
  if (!currentProject) return []
  
  const allProjects = [
    ...data.researchProjects.active,
    ...data.researchProjects.completed,
    ...data.researchProjects.planned
  ].filter(project => project.id !== currentProject.id)
  
  // Find projects with overlapping keywords
  const relatedProjects = allProjects
    .map(project => ({
      project,
      relevance: project.keywords.filter(keyword => 
        currentProject.keywords.includes(keyword)
      ).length
    }))
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(item => item.project)
  
  return relatedProjects
}

// Helper function to format funding amount
export function formatFundingAmount(amount: string): string {
  return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Helper function to calculate project duration in months
export function calculateProjectDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
  return diffMonths
}

// Helper function to get project status color
export function getProjectStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-academic-green text-white'
    case 'completed':
      return 'bg-primary-navy text-white'
    case 'planned':
      return 'bg-accent-gold text-white'
    default:
      return 'bg-academic-slate-500 text-white'
  }
} 