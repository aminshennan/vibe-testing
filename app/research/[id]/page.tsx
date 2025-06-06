'use client'

import { useEffect, useState } from 'react'
import { AnimatedSection } from '@/components/ui/animated-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FlaskConicalIcon, 
  UsersIcon, 
  FileTextIcon,
  TrendingUpIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  BarChart3Icon,
  PresentationIcon,
  DollarSignIcon,
  ArrowLeftIcon
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getResearchData } from '@/lib/research-data'

interface ResearchProjectDetailProps {
  params: Promise<{
    id: string
  }>
}

interface Publication {
  title: string
  journal: string
  year: number
  status: 'published' | 'in-press' | 'under-review' | 'in-preparation'
  authors: string[]
  doi?: string
}

interface Presentation {
  title: string
  venue: string
  type: 'keynote' | 'symposium' | 'poster' | 'talk'
  date: string
  location: string
}

interface Collaborator {
  name: string
  institution: string
  role: string
  expertise: string[]
}

interface ProjectData {
  project: any // Will be typed from research data
  id: string
  publications: Publication[]
  presentations: Presentation[]
  collaborators: Collaborator[]
}

const researchPublications: { [key: string]: Publication[] } = {
  'working-memory-education': [
    {
      title: 'Working Memory Training Improves Academic Performance in Elementary Students',
      journal: 'Journal of Educational Psychology',
      year: 2024,
      status: 'published',
      authors: ['Dr. Sarah Mitchell', 'Dr. Robert Chen', 'Jennifer Adams'],
      doi: '10.1037/edu0000789'
    },
    {
      title: 'Neural Mechanisms of Working Memory Enhancement Through Cognitive Training',
      journal: 'Nature Neuroscience',
      year: 2024,
      status: 'in-press',
      authors: ['Dr. Sarah Mitchell', 'Dr. Michael Kumar', 'Sarah Thompson']
    },
    {
      title: 'Long-term Effects of Working Memory Interventions: A 2-Year Follow-up Study',
      journal: 'Developmental Psychology',
      year: 2025,
      status: 'under-review',
      authors: ['Jennifer Adams', 'Dr. Sarah Mitchell', 'Dr. Lisa Wang']
    }
  ],
  'adhd-interventions': [
    {
      title: 'Cognitive Behavioral Interventions for ADHD in Academic Settings',
      journal: 'Clinical Child Psychology Review',
      year: 2023,
      status: 'published',
      authors: ['Dr. Sarah Mitchell', 'Dr. James Rodriguez', 'Maria Santos'],
      doi: '10.1016/j.ccpr.2023.456'
    },
    {
      title: 'Digital Therapeutic Approaches for ADHD Management',
      journal: 'Journal of Attention Disorders',
      year: 2024,
      status: 'in-preparation',
      authors: ['Dr. Sarah Mitchell', 'Alex Peterson', 'Dr. Rachel Green']
    }
  ],
  'social-cognition': [
    {
      title: 'Social Context Effects on Memory Formation and Retrieval',
      journal: 'Psychological Science',
      year: 2023,
      status: 'published',
      authors: ['Dr. Sarah Mitchell', 'Dr. David Kim', 'Laura Johnson'],
      doi: '10.1177/0956797623123456'
    }
  ]
}

const researchPresentations: { [key: string]: Presentation[] } = {
  'working-memory-education': [
    {
      title: 'Working Memory and Educational Outcomes: Bridging Cognitive Science and Practice',
      venue: 'American Psychological Association Annual Convention',
      type: 'keynote',
      date: 'August 2024',
      location: 'San Diego, CA'
    },
    {
      title: 'Neural Plasticity in Working Memory Training',
      venue: 'Cognitive Neuroscience Society Annual Meeting',
      type: 'symposium',
      date: 'March 2024',
      location: 'Toronto, Canada'
    }
  ],
  'adhd-interventions': [
    {
      title: 'Digital Interventions for ADHD: Efficacy and Implementation',
      venue: 'International Conference on ADHD',
      type: 'talk',
      date: 'June 2024',
      location: 'London, UK'
    }
  ]
}

const researchCollaborators: { [key: string]: Collaborator[] } = {
  'working-memory-education': [
    {
      name: 'Dr. Robert Chen',
      institution: 'Stanford University',
      role: 'Co-Principal Investigator',
      expertise: ['Neuroimaging', 'Cognitive Development', 'Statistical Modeling']
    },
    {
      name: 'Dr. Michael Kumar',
      institution: 'MIT',
      role: 'Collaborating Researcher',
      expertise: ['Computational Neuroscience', 'Machine Learning', 'Brain Connectivity']
    },
    {
      name: 'Jennifer Adams',
      institution: 'UC Berkeley',
      role: 'Doctoral Student',
      expertise: ['Educational Psychology', 'Memory Assessment', 'Child Development']
    }
  ],
  'adhd-interventions': [
    {
      name: 'Dr. James Rodriguez',
      institution: 'UCLA',
      role: 'Co-Investigator',
      expertise: ['Clinical Psychology', 'ADHD', 'Intervention Development']
    },
    {
      name: 'Dr. Rachel Green',
      institution: 'UCSF',
      role: 'Clinical Advisor',
      expertise: ['Pediatric Psychology', 'Digital Health', 'Therapy Technology']
    }
  ]
}

export default function ResearchProjectDetail({ params }: ResearchProjectDetailProps) {
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { id } = await params
        const researchData = getResearchData()
        const allProjects = [
          ...researchData.researchProjects.active,
          ...researchData.researchProjects.completed,
          ...researchData.researchProjects.planned
        ]
        const project = allProjects.find((p: any) => p.id === id)

        if (!project) {
          notFound()
          return
        }

        setProjectData({ 
          project, 
          id,
          publications: researchPublications[id] || [],
          presentations: researchPresentations[id] || [],
          collaborators: researchCollaborators[id] || []
        })
      } catch (error) {
        console.error('Error loading project:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params])

  if (loading) {
    return (
      <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-navy mx-auto mb-4"></div>
          <p className="text-academic-slate-600">Loading research project...</p>
        </div>
      </main>
    )
  }

  if (!projectData) {
    return null
  }

  const { project, publications, presentations, collaborators } = projectData
  const progressPercentage = project.status === 'active' ? 75 : 
                           project.status === 'completed' ? 100 : 45

  return (
    <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
      {/* Academic Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Navigation */}
        <AnimatedSection animation="fade-up">
          <div className="mb-6">
            <Link 
              href="/research" 
              className="inline-flex items-center text-primary-navy hover:text-primary-navy/80 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Research
            </Link>
          </div>
        </AnimatedSection>

        {/* Project Header */}
        <AnimatedSection animation="fade-up" delay={100}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <FlaskConicalIcon className="w-8 h-8 text-primary-navy" />
                    <Badge 
                      className={`
                        ${project.status === 'active' ? 'bg-academic-green text-white' : 
                          project.status === 'completed' ? 'bg-primary-navy text-white' : 
                          'bg-accent-burgundy text-white'}
                      `}
                    >
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-primary-navy font-serif mb-4">
                    {project.title}
                  </h1>
                  <p className="text-lg text-academic-slate-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                
                <div className="lg:ml-8 lg:min-w-[300px]">
                  <div className="bg-academic-slate-50 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="text-sm font-medium text-academic-slate-600">Project Progress</label>
                      <Progress value={progressPercentage} className="mt-2" />
                      <p className="text-xs text-academic-slate-600 mt-1">{progressPercentage}% Complete</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-academic-slate-600">Start Date</p>
                        <p className="font-medium text-academic-slate-800">{project.startDate}</p>
                      </div>
                      {project.endDate && (
                        <div>
                          <p className="text-xs text-academic-slate-600">End Date</p>
                          <p className="font-medium text-academic-slate-800">{project.endDate}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-xs text-academic-slate-600">Funding</p>
                      <p className="font-medium text-academic-slate-800">{project.funding.amount}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-academic-slate-600">Research Areas</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.keywords?.map((keyword: string, index: number) => (
                          <Badge key={index} className="text-xs border border-academic-slate-300 text-academic-slate-700">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Project Details Tabs */}
        <AnimatedSection animation="fade-up" delay={200}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="methodology">Methodology</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic h-full">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary-navy font-serif">Project Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-academic-slate-800 mb-2">Research Objectives</h3>
                        <ul className="space-y-2 text-academic-slate-700">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary-navy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Investigate the neural mechanisms underlying working memory improvements
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary-navy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Develop evidence-based interventions for educational settings
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-primary-navy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Assess long-term impacts on academic performance and well-being
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-academic-slate-800 mb-2">Key Findings</h3>
                        <p className="text-academic-slate-700 leading-relaxed">
                          Our research has demonstrated significant improvements in working memory capacity 
                          following targeted cognitive training interventions. Neuroimaging data reveals 
                          enhanced connectivity in fronto-parietal networks associated with executive control.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                        <BarChart3Icon className="w-5 h-5 mr-2" />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-3 bg-primary-navy/5 rounded-lg">
                        <p className="text-2xl font-bold text-primary-navy">450+</p>
                        <p className="text-sm text-academic-slate-600">Participants</p>
                      </div>
                      <div className="text-center p-3 bg-academic-green/5 rounded-lg">
                        <p className="text-2xl font-bold text-academic-green">{publications.length}</p>
                        <p className="text-sm text-academic-slate-600">Publications</p>
                      </div>
                      <div className="text-center p-3 bg-accent-burgundy/5 rounded-lg">
                        <p className="text-2xl font-bold text-accent-burgundy">{presentations.length}</p>
                        <p className="text-sm text-academic-slate-600">Presentations</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                        <DollarSignIcon className="w-5 h-5 mr-2" />
                        Funding Sources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-academic-slate-700">NSF Grant</span>
                          <span className="text-sm font-medium text-academic-slate-800">$750K</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-academic-slate-700">University Funding</span>
                          <span className="text-sm font-medium text-academic-slate-800">$125K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Methodology Tab */}
            <TabsContent value="methodology" className="space-y-6">
              <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-navy font-serif">Research Methodology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-academic-slate-800 mb-3">Study Design</h3>
                    <p className="text-academic-slate-700 leading-relaxed mb-4">
                      We employ a randomized controlled trial design with pre/post assessments and 
                      longitudinal follow-up. Participants are randomly assigned to either the 
                      working memory training condition or an active control condition.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary-navy/5 p-4 rounded-lg">
                        <h4 className="font-medium text-primary-navy mb-2">Participants</h4>
                        <p className="text-sm text-academic-slate-700">Children ages 8-12 with working memory difficulties</p>
                      </div>
                      <div className="bg-academic-green/5 p-4 rounded-lg">
                        <h4 className="font-medium text-academic-green mb-2">Intervention</h4>
                        <p className="text-sm text-academic-slate-700">12-week adaptive training program</p>
                      </div>
                      <div className="bg-accent-burgundy/5 p-4 rounded-lg">
                        <h4 className="font-medium text-accent-burgundy mb-2">Assessment</h4>
                        <p className="text-sm text-academic-slate-700">Cognitive, neural, and academic measures</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-academic-slate-800 mb-3">Data Collection Methods</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FlaskConicalIcon className="w-5 h-5 text-primary-navy mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium text-academic-slate-800">Neuroimaging (fMRI)</h4>
                          <p className="text-sm text-academic-slate-600">Task-based and resting-state functional connectivity</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <TrendingUpIcon className="w-5 h-5 text-academic-green mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium text-academic-slate-800">Cognitive Assessments</h4>
                          <p className="text-sm text-academic-slate-600">Working memory span tasks and executive function measures</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <BookOpenIcon className="w-5 h-5 text-accent-burgundy mr-3 mt-1" />
                        <div>
                          <h4 className="font-medium text-academic-slate-800">Academic Performance</h4>
                          <p className="text-sm text-academic-slate-600">Standardized achievement tests and teacher reports</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                    <UsersIcon className="w-6 h-6 mr-3" />
                    Research Team & Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collaborators.map((collaborator, index) => (
                      <div key={index} className="bg-academic-slate-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-primary-navy">{collaborator.name}</h3>
                            <p className="text-academic-slate-700">{collaborator.institution}</p>
                            <p className="text-sm text-academic-slate-600">{collaborator.role}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-academic-slate-600 mb-2">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {collaborator.expertise.map((skill, i) => (
                              <Badge key={i} className="text-xs border border-academic-slate-300 text-academic-slate-700">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Publications Tab */}
            <TabsContent value="publications" className="space-y-6">
              <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                    <FileTextIcon className="w-6 h-6 mr-3" />
                    Publications & Presentations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Publications */}
                  <div>
                    <h3 className="font-semibold text-academic-slate-800 mb-4">Publications</h3>
                    <div className="space-y-4">
                      {publications.map((pub, index) => (
                        <div key={index} className="border border-academic-slate-200 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-primary-navy flex-1">{pub.title}</h4>
                            <Badge 
                              className={`ml-3 ${
                                pub.status === 'published' 
                                  ? 'bg-academic-green text-white' 
                                  : 'border border-academic-slate-300 text-academic-slate-700'
                              }`}
                            >
                              {pub.status}
                            </Badge>
                          </div>
                          <p className="text-academic-slate-700 font-medium">{pub.journal} ({pub.year})</p>
                          <p className="text-sm text-academic-slate-600">{pub.authors.join(', ')}</p>
                          {pub.doi && (
                            <Button className="p-0 h-auto text-primary-navy hover:text-primary-navy/80 hover:underline bg-transparent border-none shadow-none">
                              <ExternalLinkIcon className="w-3 h-3 mr-1" />
                              DOI: {pub.doi}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Presentations */}
                  {presentations.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-academic-slate-800 mb-4">Conference Presentations</h3>
                      <div className="space-y-3">
                        {presentations.map((pres, index) => (
                          <div key={index} className="bg-academic-slate-50 p-4 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-primary-navy">{pres.title}</h4>
                                <p className="text-academic-slate-700">{pres.venue}</p>
                                <p className="text-sm text-academic-slate-600">{pres.date} • {pres.location}</p>
                              </div>
                              <Badge className="border border-academic-slate-300 text-academic-slate-700">
                                <PresentationIcon className="w-3 h-3 mr-1" />
                                {pres.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Impact Tab */}
            <TabsContent value="impact" className="space-y-6">
              <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                <CardHeader>
                  <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                    <TrendingUpIcon className="w-6 h-6 mr-3" />
                    Research Impact & Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-academic-slate-800 mb-3">Societal Impact</h3>
                    <p className="text-academic-slate-700 leading-relaxed mb-4">
                      This research directly addresses educational challenges faced by millions of students 
                      with working memory difficulties. Our findings inform evidence-based interventions 
                      that can be implemented in schools and clinical settings.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-academic-green/5 border border-academic-green/20 p-4 rounded-lg">
                      <h4 className="font-medium text-academic-green mb-2">Educational Applications</h4>
                      <ul className="text-sm text-academic-slate-700 space-y-1">
                        <li>• School-based intervention programs</li>
                        <li>• Teacher training workshops</li>
                        <li>• Curriculum development guidelines</li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary-navy/5 border border-primary-navy/20 p-4 rounded-lg">
                      <h4 className="font-medium text-primary-navy mb-2">Clinical Applications</h4>
                      <ul className="text-sm text-academic-slate-700 space-y-1">
                        <li>• Therapeutic intervention protocols</li>
                        <li>• Assessment tool development</li>
                        <li>• Treatment outcome measures</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-academic-slate-800 mb-3">Future Directions</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-2 h-2 bg-accent-burgundy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <p className="text-academic-slate-700">Developing personalized intervention protocols based on individual neural profiles</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 bg-accent-burgundy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <p className="text-academic-slate-700">Investigating the role of motivation and engagement in training effectiveness</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 bg-accent-burgundy rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <p className="text-academic-slate-700">Expanding research to include diverse populations and cultural contexts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </main>
  )
} 