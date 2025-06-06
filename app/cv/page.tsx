'use client'

import { AnimatedSection } from '@/components/ui/animated-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  GraduationCapIcon, 
  AwardIcon, 
  BriefcaseIcon, 
  DownloadIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  BookOpenIcon,
  UsersIcon,
  TrophyIcon,
  ExternalLinkIcon
} from 'lucide-react'
import { getPortfolioData } from '@/lib/data'
import { getPublicationsData } from '@/lib/publications-data'

interface Education {
  degree: string
  institution: string
  location: string
  year: string
  specialization?: string
  advisor?: string
  dissertation?: string
  honors?: string[]
}

interface Position {
  title: string
  institution: string
  department?: string
  location: string
  period: string
  description: string
  achievements: string[]
  current?: boolean
}

interface Grant {
  title: string
  agency: string
  amount: string
  period: string
  role: string
  number?: string
}

interface Service {
  type: 'editorial' | 'review' | 'committee' | 'organization'
  role: string
  organization: string
  period: string
  description?: string
}

const educationData: Education[] = [
  {
    degree: 'Ph.D. in Psychology',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    year: '2006-2010',
    specialization: 'Cognitive Psychology',
    advisor: 'Dr. John Anderson',
    dissertation: 'Neural Mechanisms of Working Memory and Academic Performance: A Longitudinal fMRI Study',
    honors: ['Phi Beta Kappa', 'NSF Graduate Research Fellowship', 'Outstanding Dissertation Award']
  },
  {
    degree: 'M.A. in Cognitive Science',
    institution: 'University of California, San Diego',
    location: 'La Jolla, CA',
    year: '2004-2006',
    specialization: 'Computational Cognitive Science',
    advisor: 'Dr. Patricia Kuhl',
    honors: ['Graduate Excellence Award', 'Dean\'s List']
  },
  {
    degree: 'B.A. in Psychology',
    institution: 'Harvard University',
    location: 'Cambridge, MA',
    year: '2000-2004',
    specialization: 'Experimental Psychology, Mathematics Minor',
    honors: ['Magna Cum Laude', 'Phi Beta Kappa', 'John Harvard Scholar']
  }
]

const positions: Position[] = [
  {
    title: 'Professor of Psychology',
    institution: 'University of California, Berkeley',
    department: 'Department of Psychology',
    location: 'Berkeley, CA',
    period: '2018 - Present',
    current: true,
    description: 'Lead research in cognitive psychology and memory sciences. Direct the Memory and Learning Lab with oversight of graduate students and postdoctoral researchers.',
    achievements: [
      'Secured over $2.5M in federal research funding (NSF, NIH)',
      'Published 45+ peer-reviewed articles in top-tier journals',
      'Mentored 23 doctoral students to successful completion',
      'Established international research collaborations',
      'Received UC Berkeley Distinguished Teaching Award (2022)'
    ]
  },
  {
    title: 'Associate Professor of Psychology',
    institution: 'University of Michigan',
    department: 'Department of Psychology',
    location: 'Ann Arbor, MI',
    period: '2014 - 2018',
    description: 'Conducted innovative research in memory and learning processes while developing graduate and undergraduate curricula.',
    achievements: [
      'Awarded NSF CAREER Award ($850K) for memory research',
      'Published seminal work in Nature Neuroscience',
      'Developed statistical methods for memory analysis',
      'Founded Cognitive Development Research Consortium'
    ]
  },
  {
    title: 'Assistant Professor of Psychology',
    institution: 'Boston University',
    department: 'Department of Psychology',
    location: 'Boston, MA',
    period: '2010 - 2014',
    description: 'Launched independent research program investigating neural mechanisms of memory formation.',
    achievements: [
      'Received APA Early Career Award',
      'Published 15 high-impact articles',
      'Developed open-source memory research software',
      'Established undergraduate research program'
    ]
  }
]

const majorGrants: Grant[] = [
  {
    title: 'Neural Mechanisms of Educational Memory Formation',
    agency: 'National Science Foundation',
    amount: '$750,000',
    period: '2023-2025',
    role: 'Principal Investigator',
    number: 'NSF-BCS-2023-1234'
  },
  {
    title: 'Cognitive Interventions for Attention Disorders',
    agency: 'National Institute of Mental Health',
    amount: '$485,000',
    period: '2022-2025',
    role: 'Principal Investigator',
    number: 'NIMH-R01-MH123456'
  },
  {
    title: 'Working Memory and Academic Achievement',
    agency: 'Department of Education',
    amount: '$300,000',
    period: '2019-2022',
    role: 'Principal Investigator',
    number: 'ED-IES-19-C-0123'
  },
  {
    title: 'Memory Consolidation in Learning Environments',
    agency: 'National Science Foundation',
    amount: '$850,000',
    period: '2015-2020',
    role: 'Principal Investigator',
    number: 'NSF CAREER Award'
  }
]

const professionalService: Service[] = [
  {
    type: 'editorial',
    role: 'Associate Editor',
    organization: 'Journal of Educational Psychology',
    period: '2020 - Present',
    description: 'Oversee peer review process for cognitive psychology and educational research submissions'
  },
  {
    type: 'editorial',
    role: 'Editorial Board Member',
    organization: 'Memory & Cognition',
    period: '2018 - Present'
  },
  {
    type: 'review',
    role: 'Grant Reviewer',
    organization: 'National Science Foundation',
    period: '2016 - Present',
    description: 'Review proposals for BCS and EHR directorates'
  },
  {
    type: 'committee',
    role: 'Chair, Graduate Admissions Committee',
    organization: 'UC Berkeley Psychology Department',
    period: '2021 - 2023'
  },
  {
    type: 'organization',
    role: 'Program Committee Member',
    organization: 'Annual Conference of Cognitive Science Society',
    period: '2019 - Present'
  }
]

export default function CVPage() {
  const portfolioData = getPortfolioData()
  const publicationsData = getPublicationsData()
  const { credentials } = portfolioData
  const { publicationMetrics } = publicationsData

  return (
    <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
      {/* Academic Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

      <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Page Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4">
              <GraduationCapIcon className="w-8 h-8 mr-3 text-primary-navy" />
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-navy font-serif">Curriculum Vitae</h1>
            </div>
            <p className="text-lg text-academic-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Complete academic and professional record documenting research excellence, 
              teaching achievements, and scholarly contributions to psychology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white" size="lg">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download Full CV (PDF)
              </Button>
              <Button variant="outline" className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white" size="lg">
                <ExternalLinkIcon className="w-4 h-4 mr-2" />
                View ORCID Profile
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Academic Overview */}
        <AnimatedSection animation="fade-up" delay={100}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <StarIcon className="w-6 h-6 mr-3" />
                Academic Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-primary-navy/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary-navy">{publicationMetrics.totalPublications}</p>
                  <p className="text-sm text-academic-slate-600">Publications</p>
                </div>
                <div className="text-center p-4 bg-academic-green/5 rounded-lg">
                  <p className="text-2xl font-bold text-academic-green">{publicationMetrics.citationsTotal}</p>
                  <p className="text-sm text-academic-slate-600">Citations</p>
                </div>
                <div className="text-center p-4 bg-accent-burgundy/5 rounded-lg">
                  <p className="text-2xl font-bold text-accent-burgundy">{publicationMetrics.hIndex}</p>
                  <p className="text-sm text-academic-slate-600">h-Index</p>
                </div>
                <div className="text-center p-4 bg-accent-gold/5 rounded-lg">
                  <p className="text-2xl font-bold text-accent-gold">$2.5M+</p>
                  <p className="text-sm text-academic-slate-600">Grant Funding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection animation="fade-up" delay={200}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <GraduationCapIcon className="w-6 h-6 mr-3" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {educationData.map((edu, index) => (
                  <div key={index} className="border-l-4 border-primary-navy pl-6 pb-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-navy font-serif">{edu.degree}</h3>
                        <p className="text-academic-slate-700 font-medium">{edu.institution}</p>
                        {edu.specialization && (
                          <p className="text-academic-slate-600 text-sm italic">{edu.specialization}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-academic-slate-600 mb-1">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{edu.year}</span>
                        </div>
                        <div className="flex items-center text-academic-slate-600">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {edu.advisor && (
                      <p className="text-sm text-academic-slate-600 mb-2">
                        <strong>Advisor:</strong> {edu.advisor}
                      </p>
                    )}
                    
                    {edu.dissertation && (
                      <p className="text-sm text-academic-slate-700 mb-3 italic">
                        <strong>Dissertation:</strong> {edu.dissertation}
                      </p>
                    )}
                    
                    {edu.honors && (
                      <div className="flex flex-wrap gap-2">
                        {edu.honors.map((honor, i) => (
                          <Badge key={i} variant="outline" className="text-accent-gold border-accent-gold">
                            {honor}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Academic Positions */}
        <AnimatedSection animation="fade-up" delay={300}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <BriefcaseIcon className="w-6 h-6 mr-3" />
                Academic Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {positions.map((position, index) => (
                  <div key={index} className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-primary-navy font-serif">{position.title}</h3>
                          {position.current && (
                            <Badge className="bg-academic-green text-white">Current</Badge>
                          )}
                        </div>
                        <p className="text-academic-slate-700 font-medium">{position.institution}</p>
                        {position.department && (
                          <p className="text-academic-slate-600 text-sm">{position.department}</p>
                        )}
                      </div>
                      <div className="text-right mt-2 lg:mt-0">
                        <div className="flex items-center text-academic-slate-600 mb-1">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.period}</span>
                        </div>
                        <div className="flex items-center text-academic-slate-600">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-academic-slate-700 mb-4 leading-relaxed">{position.description}</p>
                    
                    <div className="bg-academic-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-academic-slate-800 mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {position.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <StarIcon className="w-4 h-4 text-academic-green mr-2 mt-1 flex-shrink-0" />
                            <span className="text-academic-slate-700 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {index < positions.length - 1 && <Separator className="mt-8" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Awards & Grants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Awards */}
          <AnimatedSection animation="fade-up" delay={400}>
            <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <TrophyIcon className="w-5 h-5 mr-2" />
                  Awards & Honors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {credentials.awards.map((award, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-accent-gold/5 border border-accent-gold/20 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-accent-gold">{award.name}</h3>
                      <p className="text-sm text-academic-slate-600">{award.issuer}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="border-accent-gold text-accent-gold">
                        {award.date}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {/* Additional notable awards */}
                <div className="flex items-start justify-between p-3 bg-accent-gold/5 border border-accent-gold/20 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-accent-gold">Fellow, American Psychological Association</h3>
                    <p className="text-sm text-academic-slate-600">Division 3 (Experimental Psychology)</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-accent-gold text-accent-gold">2021</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Major Grants */}
          <AnimatedSection animation="fade-up" delay={500}>
            <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <AwardIcon className="w-5 h-5 mr-2" />
                  Major Research Grants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {majorGrants.map((grant, index) => (
                  <div key={index} className="border border-academic-green/20 p-4 rounded-lg bg-academic-green/5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-academic-green text-sm">{grant.title}</h3>
                      <Badge className="bg-academic-green text-white text-xs">{grant.amount}</Badge>
                    </div>
                    <p className="text-xs text-academic-slate-600 mb-1">{grant.agency}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-academic-slate-600">{grant.role}</span>
                      <span className="text-xs text-academic-slate-600">{grant.period}</span>
                    </div>
                    {grant.number && (
                      <p className="text-xs text-academic-slate-500 mt-1 font-mono">{grant.number}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Professional Service */}
        <AnimatedSection animation="fade-up" delay={600}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <UsersIcon className="w-6 h-6 mr-3" />
                Professional Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Editorial Service */}
                <div>
                  <h3 className="font-semibold text-academic-slate-800 mb-4 flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-2" />
                    Editorial & Review
                  </h3>
                  <div className="space-y-3">
                    {professionalService.filter(s => s.type === 'editorial' || s.type === 'review').map((service, index) => (
                      <div key={index} className="bg-academic-slate-50 p-3 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-primary-navy text-sm">{service.role}</p>
                            <p className="text-academic-slate-700 text-sm">{service.organization}</p>
                            {service.description && (
                              <p className="text-academic-slate-600 text-xs mt-1">{service.description}</p>
                            )}
                          </div>
                          <span className="text-xs text-academic-slate-600">{service.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Committee & Organization Service */}
                <div>
                  <h3 className="font-semibold text-academic-slate-800 mb-4 flex items-center">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    Committee & Organization
                  </h3>
                  <div className="space-y-3">
                    {professionalService.filter(s => s.type === 'committee' || s.type === 'organization').map((service, index) => (
                      <div key={index} className="bg-academic-slate-50 p-3 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-primary-navy text-sm">{service.role}</p>
                            <p className="text-academic-slate-700 text-sm">{service.organization}</p>
                            {service.description && (
                              <p className="text-academic-slate-600 text-xs mt-1">{service.description}</p>
                            )}
                          </div>
                          <span className="text-xs text-academic-slate-600">{service.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* CV Download CTA */}
        <AnimatedSection animation="fade-up" delay={700}>
          <Card className="bg-gradient-to-r from-primary-navy/5 to-academic-green/5 border-primary-navy/20">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-primary-navy font-serif mb-4">
                Complete Academic Record
              </h2>
              <p className="text-academic-slate-600 mb-6 max-w-2xl mx-auto">
                This overview highlights key achievements. For a complete record including 
                full publication list, conference presentations, and detailed service history, 
                download the comprehensive CV.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary-navy hover:bg-primary-navy/90 text-white"
                  size="lg"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download Complete CV (PDF)
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
                  size="lg"
                >
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  View Google Scholar
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
} 