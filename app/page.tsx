import { CredentialsSection } from "@/components/credentials-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FlaskConicalIcon, BookOpenIcon, GraduationCapIcon, ChevronRightIcon, StarIcon, MailIcon } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { getSkillsInfo, getPersonalInfo } from "@/lib/data"
import { getResearchData } from "@/lib/research-data"
import { getPublicationsData, getAllPublications } from "@/lib/publications-data"
import Image from "next/image"
import { PageTransition } from "@/components/advanced-animations"
import { AwardIcon } from "lucide-react"
import { ResearchProjectCardEnhanced } from '@/components/research-project-card-enhanced'
import { StaggeredContainer, StaggeredItem } from '@/components/advanced-animations/staggered-container'
import { CountUpAnimation } from '@/components/advanced-animations/micro-interactions'

export default function HomePage() {
  const personalInfo = getPersonalInfo()
  const skillsInfo = getSkillsInfo()
  const researchData = getResearchData()
  const publicationsData = getPublicationsData()
  const recentPublications = getAllPublications().slice(0, 3)

  // Format authors for publication display
  const formatPublicationAuthors = (authors: string[]): string => {
    if (authors.length === 1) return authors[0]
    if (authors.length === 2) return `${authors[0]} & ${authors[1]}`
    if (authors.length <= 5) {
      return `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`
    }
    return `${authors.slice(0, 3).join(', ')}, et al.`
  }

  return (
    <PageTransition>
      {/* Screen reader page title */}
      <div className="sr-only">
        <h1>Dr. Sarah Mitchell - Psychology Professor Portfolio</h1>
        <p>Academic portfolio featuring research, publications, and teaching expertise in cognitive psychology and educational neuroscience.</p>
      </div>

      <main 
        id="main-content" 
        role="main" 
        aria-labelledby="main-heading"
        className="min-h-screen bg-academic-slate-50 text-academic-slate-900"
      >
        {/* Hero Section with Professional Introduction */}
        <section className="academic-hero-section relative overflow-hidden">
          {/* Enhanced Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy-dark to-academic-slate-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.15)_0%,transparent_50%),conic-gradient(from_180deg_at_50%_50%,rgba(30,58,138,0.1)_0deg,transparent_120deg)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          <div className="relative z-10 academic-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-16">
              {/* Content Column */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <Badge className="bg-academic-green/20 text-academic-green border-academic-green/30 inline-flex items-center gap-2 px-4 py-2">
                    <AwardIcon className="w-4 h-4" />
                      UC Berkeley Faculty
                    </Badge>
                  
                  <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
                      Dr. Sarah Mitchell
                    </h1>
                    <p className="text-xl lg:text-2xl text-academic-slate-200 font-light mb-6 tracking-wide">
                      Professor of Psychology
                    </p>
                  </div>
                  
                  <p className="academic-intro-text text-academic-slate-300 max-w-2xl">
                      Advancing the understanding of cognitive processes in educational settings through 
                      innovative research in memory, attention, and learning mechanisms.
                    </p>
                </div>
                
                {/* Research Interests */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-academic-slate-300 uppercase tracking-wider">
                    Research Focus
                  </h3>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {personalInfo.researchInterests.map((interest) => (
                      <Badge key={interest} variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                {/* Enhanced Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-academic-green to-academic-green-dark hover:from-academic-green-dark hover:to-academic-green text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 academic-transition-all"
                      asChild
                    >
                      <Link href="/research">
                        <GraduationCapIcon className="w-5 h-5 mr-2" />
                        Explore Research
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-navy px-8 py-4 backdrop-blur-sm transition-all duration-300 academic-transition-all"
                      asChild
                    >
                      <Link href="/contact">
                        <MailIcon className="w-5 h-5 mr-2" />
                        Get in Touch
                      </Link>
                    </Button>
                  </div>
                </div>

              {/* Enhanced Image Column */}
                <div className="relative">
                  <div className="relative max-w-md mx-auto lg:max-w-lg">
                    {/* Enhanced glow effect */}
                    <div className="absolute -inset-12 bg-gradient-to-r from-academic-green/40 to-accent-gold/40 rounded-full blur-3xl opacity-40 animate-pulse-slow" />
                    
                    {/* Image container with enhanced styling */}
                    <div className="relative bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20">
                      <Image
                        src="/placeholder-logo.png"
                        alt="Dr. Sarah Mitchell, Professor of Psychology"
                        width={400}
                        height={400}
                        className="rounded-2xl w-full h-auto"
                        priority
                      />
                    </div>
                    
                    {/* Enhanced floating elements */}
                    <div className="absolute -top-6 -right-6 bg-gradient-to-br from-academic-green to-academic-green-dark rounded-full p-4 shadow-xl animate-pulse-glow">
                      <AwardIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-accent-gold to-secondary-gold-dark rounded-full p-4 shadow-xl animate-pulse-glow" style={{ animationDelay: '1s' }}>
                      <FlaskConicalIcon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Academic achievement indicators */}
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">UC Berkeley</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Enhanced Research Projects Section */}
        <section aria-labelledby="research-heading" className="academic-section-primary">
          <div className="academic-container">
            <AnimatedSection animation="fade-up">
              <Card className="academic-card">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="bg-primary-navy/10 p-3 rounded-xl mr-4">
                        <FlaskConicalIcon className="w-8 h-8 text-primary-navy" aria-hidden="true" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold text-primary-navy mb-2">Current Research</CardTitle>
                        <CardDescription className="text-lg text-academic-slate-600 max-w-2xl">
                          Exploring the frontiers of cognitive psychology and educational neuroscience
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all duration-300 px-6 py-3"
                    >
                      <Link href="/research">
                        View All Projects
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StaggeredContainer className="contents" staggerDelay={0.15}>
                      {researchData.researchProjects.active.slice(0, 3).map((project, index) => (
                        <StaggeredItem key={project.id}>
                          <ResearchProjectCardEnhanced 
                            project={project} 
                            index={index}
                            className="h-full" // Ensure equal height cards
                          />
                        </StaggeredItem>
                      ))}
                    </StaggeredContainer>
                  </div>

                  {/* Enhanced Research Impact Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="bg-gradient-to-br from-primary-navy/5 to-primary-navy/10 rounded-xl p-6 text-center border border-primary-navy/20 hover:border-primary-navy/30 transition-all duration-300">
                      <div className="academic-stat-number text-primary-navy mb-2" aria-label={`Total funding: ${researchData.researchImpact.totalFunding}`}>
                        {researchData.researchImpact.totalFunding}
                      </div>
                      <p className="text-academic-slate-600 font-medium">Total Funding</p>
                    </div>
                    <div className="bg-gradient-to-br from-academic-green/5 to-academic-green/10 rounded-xl p-6 text-center border border-academic-green/20 hover:border-academic-green/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={researchData.researchImpact.ongoingProjects} 
                        className="text-3xl font-bold text-academic-green mb-2"
                        duration={1.5}
                      />
                      <p className="text-academic-slate-600 font-medium">Active Projects</p>
                    </div>
                    <div className="bg-gradient-to-br from-accent-burgundy/5 to-accent-burgundy/10 rounded-xl p-6 text-center border border-accent-burgundy/20 hover:border-accent-burgundy/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={researchData.researchImpact.totalStudents} 
                        className="text-3xl font-bold text-accent-burgundy mb-2"
                        duration={2}
                      />
                      <p className="text-academic-slate-600 font-medium">Students Mentored</p>
                    </div>
                    <div className="bg-gradient-to-br from-accent-gold/5 to-accent-gold/10 rounded-xl p-6 text-center border border-accent-gold/20 hover:border-accent-gold/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={publicationsData.publicationMetrics.totalPublications} 
                        className="text-3xl font-bold text-accent-gold mb-2"
                        duration={1.8}
                      />
                      <p className="text-academic-slate-600 font-medium">Publications</p>
                    </div>
                  </div>
            </CardContent>
          </Card>
        </AnimatedSection>
          </div>
        </section>

        {/* Enhanced Publications Section */}
        <section aria-labelledby="publications-heading" className="academic-section-secondary">
          <div className="academic-container">
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="academic-card">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="bg-accent-burgundy/10 p-3 rounded-xl mr-4">
                        <BookOpenIcon className="w-8 h-8 text-accent-burgundy" aria-hidden="true" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold text-accent-burgundy mb-2">Recent Publications</CardTitle>
                        <CardDescription className="text-lg text-academic-slate-600 max-w-2xl">
                          Latest peer-reviewed research and academic contributions
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-accent-burgundy text-accent-burgundy hover:bg-accent-burgundy hover:text-white transition-all duration-300 px-6 py-3"
                    >
                      <Link href="/publications">
                        View All Publications
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {recentPublications.slice(0, 2).map((publication, index) => (
                      <div key={publication.id} className="bg-gradient-to-br from-white to-academic-slate-50 rounded-xl p-6 border border-academic-slate-200 hover:border-accent-burgundy/30 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-accent-burgundy leading-tight text-lg mb-2 hover:text-accent-burgundy-dark transition-colors">
                              <Link href={`/publications/${publication.id}`}>
                                {publication.title}
                              </Link>
                            </h4>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline" className="text-xs bg-accent-burgundy/10 border-accent-burgundy/30 text-accent-burgundy">
                                {publication.year}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {publication.researchArea}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-academic-slate-600 mb-4 leading-relaxed">
                          {formatPublicationAuthors(publication.authors)} ({publication.year}).{' '}
                          {'journal' in publication && (
                            <em className="text-accent-burgundy">{(publication as any).journal}</em>
                          )}
                          {'bookTitle' in publication && (
                            <em className="text-accent-burgundy">{(publication as any).bookTitle}</em>
                          )}
                          {'conference' in publication && (
                            <em className="text-accent-burgundy">{(publication as any).conference}</em>
                          )}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-academic-green/10 border-academic-green/30 text-academic-green">
                              {publication.citationCount} citations
                            </Badge>
                          </div>
                          <Link 
                            href={`/publications/${publication.id}`}
                            className="text-sm text-accent-burgundy hover:text-accent-burgundy-dark font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200"
                          >
                            Read More
                            <ChevronRightIcon className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
              
                  {/* Enhanced Publication Metrics Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    <div className="bg-gradient-to-br from-accent-burgundy/5 to-accent-burgundy/10 rounded-xl p-6 text-center border border-accent-burgundy/20 hover:border-accent-burgundy/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={publicationsData.publicationMetrics.citationsTotal} 
                        className="text-3xl font-bold text-accent-burgundy mb-2"
                        duration={2.5}
                      />
                      <p className="text-academic-slate-600 font-medium">Total Citations</p>
                    </div>
                    <div className="bg-gradient-to-br from-academic-green/5 to-academic-green/10 rounded-xl p-6 text-center border border-academic-green/20 hover:border-academic-green/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={publicationsData.publicationMetrics.hIndex} 
                        className="text-3xl font-bold text-academic-green mb-2"
                        duration={1.8}
                      />
                      <p className="text-academic-slate-600 font-medium">h-Index</p>
                    </div>
                    <div className="bg-gradient-to-br from-primary-navy/5 to-primary-navy/10 rounded-xl p-6 text-center border border-primary-navy/20 hover:border-primary-navy/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={publicationsData.publicationMetrics.journalArticles} 
                        className="text-3xl font-bold text-primary-navy mb-2"
                        duration={2.2}
                      />
                      <p className="text-academic-slate-600 font-medium">Journal Articles</p>
                    </div>
                    <div className="bg-gradient-to-br from-accent-gold/5 to-accent-gold/10 rounded-xl p-6 text-center border border-accent-gold/20 hover:border-accent-gold/30 transition-all duration-300">
                      <CountUpAnimation 
                        value={publicationsData.publicationMetrics.openAccessPublications} 
                        className="text-3xl font-bold text-accent-gold mb-2"
                        duration={2}
                      />
                      <p className="text-academic-slate-600 font-medium">Open Access</p>
                    </div>
                  </div>
            </CardContent>
          </Card>
        </AnimatedSection>
          </div>
        </section>

        {/* Teaching Section */}
        <section aria-labelledby="teaching-heading" className="academic-section-tertiary">
          <div className="academic-container">
        <AnimatedSection animation="fade-up" delay={300}>
              <Card className="academic-card">
                <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                      <GraduationCapIcon className="w-7 h-7 mr-4 text-primary-navy" />
                  <div>
                        <CardTitle className="academic-heading-section mb-2">Teaching & Mentorship</CardTitle>
                        <CardDescription className="academic-intro-text">
                      Current courses and student mentorship opportunities
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
                >
                  <Link href="/teaching">
                    View Teaching Portfolio
                    <ChevronRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
                <CardContent className="pt-0">
                  <div className="academic-grid-2-col">
                    <div className="space-y-6">
                      <h4 className="academic-heading-subsection">Current Courses (Spring 2024)</h4>
                <div className="space-y-4">
                        <div className="p-4 bg-academic-slate-50 rounded-lg border border-academic-slate-200">
                          <h5 className="font-medium text-academic-slate-800 mb-2">PSYC 150: Cognitive Psychology</h5>
                      <p className="text-sm text-academic-slate-600">Undergraduate • 3 units • Tuesdays & Thursdays</p>
                    </div>
                        <div className="p-4 bg-academic-slate-50 rounded-lg border border-academic-slate-200">
                          <h5 className="font-medium text-academic-slate-800 mb-2">PSYC 250: Advanced Research Methods</h5>
                      <p className="text-sm text-academic-slate-600">Graduate • 4 units • Mondays & Wednesdays</p>
                    </div>
                  </div>
                </div>

                    <div className="space-y-6">
                      <h4 className="academic-heading-subsection">Student Resources</h4>
                <div className="space-y-4">
                        <div className="p-4 bg-academic-green/5 border border-academic-green/20 rounded-lg">
                          <h5 className="font-medium text-academic-green mb-2">Office Hours</h5>
                          <p className="text-sm text-academic-slate-600 mb-1">Tuesday & Thursday, 2:00-4:00 PM</p>
                      <p className="text-sm text-academic-slate-600">Tolman Hall, Room 3210</p>
                    </div>
                        <div className="p-4 bg-accent-burgundy/5 border border-accent-burgundy/20 rounded-lg">
                          <h5 className="font-medium text-accent-burgundy mb-2">Research Opportunities</h5>
                      <p className="text-sm text-academic-slate-600">Undergraduate and graduate positions available</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
          </div>
        </section>

        {/* Academic Credentials Section */}
        <section aria-labelledby="credentials-heading" className="academic-section">
          <div className="academic-container">
        <AnimatedSection animation="fade-up" delay={400}>
          <CredentialsSection />
        </AnimatedSection>
          </div>
        </section>

        {/* Skills Section */}
        <section aria-labelledby="skills-heading" className="academic-section">
          <div className="academic-container">
        <AnimatedSection animation="fade-up" delay={500}>
              <Card className="academic-card">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-primary-navy font-serif flex items-center mb-2">
                    <StarIcon className="w-6 h-6 mr-3" />
                Research & Teaching Skills
              </CardTitle>
            </CardHeader>
                <CardContent className="pt-0 space-y-8">
              {Object.entries(skillsInfo).map(([category, skills], skillIndex) => (
                <AnimatedSection key={category} animation="fade-up" delay={100 * (skillIndex + 1)}>
                  <div>
                        <h3 className="text-sm font-medium text-academic-slate-600 mb-4 uppercase tracking-wide border-b border-academic-slate-200 pb-3">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                        <div className="flex flex-wrap gap-3">
                      {skills.map((skill: string, skillSubIndex: number) => (
                        <Badge
                          key={skillSubIndex}
                          variant="secondary"
                              className="bg-primary-navy/10 text-primary-navy border-primary-navy/20 hover:bg-primary-navy hover:text-white transition-colors px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </CardContent>
          </Card>
        </AnimatedSection>
          </div>
        </section>

      </main>
    </PageTransition>
  )
}
