'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedSection } from '@/components/ui/animated-section'
import Link from 'next/link'
import { 
  ExternalLinkIcon, 
  DownloadIcon, 
  QuoteIcon, 
  TagIcon,
  BarChart3Icon,
  BookOpenIcon,
  ShareIcon,
  ClipboardCopyIcon,
  FileTextIcon,
  FlaskConicalIcon
} from 'lucide-react'
import { 
  formatCitation, 
  type Publication, 
  type JournalArticle
} from '@/lib/publications-data'
import { academicTracking } from '@/lib/analytics'

interface PublicationDetailClientProps {
  publication: Publication
  apaCitation: string
  bibTeX: string
}

export function PublicationDetailClient({ 
  publication, 
  apaCitation, 
  bibTeX 
}: PublicationDetailClientProps) {
  const [citationCopied, setCitationCopied] = useState(false)

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCitationCopied(true)
      setTimeout(() => setCitationCopied(false), 2000)
      
      // Track citation copy analytics
      academicTracking.downloadFile(`${publication.title}_${type}`, `citation_${type}`)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleExternalLinkClick = (linkType: string, destination: string) => {
    academicTracking.clickExternalLink(linkType, destination)
  }

  const handlePDFDownload = (fileName: string) => {
    academicTracking.downloadFile(fileName, 'pdf')
  }

  const handleShareClick = () => {
    copyToClipboard(window.location.href, 'url')
    academicTracking.clickExternalLink('share', 'publication_url')
  }

  return (
    <>
      {/* Share Button */}
      <AnimatedSection animation="fade-up" delay={150}>
        <div className="mb-6 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShareClick}
          >
            <ShareIcon className="w-4 h-4 mr-1" />
            Share Publication
          </Button>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Abstract */}
          <AnimatedSection animation="fade-up" delay={200}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <FileTextIcon className="w-5 h-5 mr-2" />
                  Abstract
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-academic-slate-700 leading-relaxed text-base">
                  {publication.abstract}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Keywords and Research Area */}
          <AnimatedSection animation="fade-up" delay={300}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <TagIcon className="w-5 h-5 mr-2" />
                  Keywords & Research Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-academic-slate-700 mb-3">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-sm bg-academic-slate-50 border-academic-slate-300 text-academic-slate-700"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-academic-slate-700 mb-2">Research Area</h4>
                  <Badge variant="secondary" className="text-sm bg-primary-navy/10 text-primary-navy">
                    {publication.researchArea}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Citations */}
          <AnimatedSection animation="fade-up" delay={400}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <QuoteIcon className="w-5 h-5 mr-2" />
                  Citations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="apa" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-academic-slate-100">
                    <TabsTrigger value="apa" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      APA Style
                    </TabsTrigger>
                    <TabsTrigger value="bibtex" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      BibTeX
                    </TabsTrigger>
                    <TabsTrigger value="mla" className="data-[state=active]:bg-primary-navy data-[state=active]:text-white">
                      MLA Style
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="apa" className="mt-4">
                    <div className="bg-academic-slate-50 p-4 rounded border-l-4 border-primary-navy/20">
                      <p className="text-sm text-academic-slate-700 mb-3">{apaCitation}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(apaCitation, 'apa')}
                        className="text-xs"
                      >
                        <ClipboardCopyIcon className="w-3 h-3 mr-1" />
                        {citationCopied ? 'Copied!' : 'Copy Citation'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bibtex" className="mt-4">
                    <div className="bg-academic-slate-50 p-4 rounded border-l-4 border-primary-navy/20">
                      <pre className="text-xs text-academic-slate-700 whitespace-pre-wrap mb-3 font-mono">
                        {bibTeX}
                      </pre>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(bibTeX, 'bibtex')}
                        className="text-xs"
                      >
                        <ClipboardCopyIcon className="w-3 h-3 mr-1" />
                        {citationCopied ? 'Copied!' : 'Copy BibTeX'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mla" className="mt-4">
                    <div className="bg-academic-slate-50 p-4 rounded border-l-4 border-primary-navy/20">
                      <p className="text-sm text-academic-slate-700 mb-3">
                        {formatCitation(publication as JournalArticle, 'MLA')}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(formatCitation(publication as JournalArticle, 'MLA'), 'mla')}
                        className="text-xs"
                      >
                        <ClipboardCopyIcon className="w-3 h-3 mr-1" />
                        {citationCopied ? 'Copied!' : 'Copy Citation'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <AnimatedSection animation="fade-up" delay={200}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-lg text-primary-navy font-serif">
                  Access & Download
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {('doi' in publication) && (
                  <Button 
                    asChild
                    className="w-full bg-primary-navy hover:bg-primary-navy-dark text-white"
                    onClick={() => handleExternalLinkClick('doi', `https://doi.org/${(publication as JournalArticle).doi}`)}
                  >
                    <a href={`https://doi.org/${(publication as JournalArticle).doi}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon className="w-4 h-4 mr-2" />
                      View on Publisher Site
                    </a>
                  </Button>
                )}
                
                {('pdfUrl' in publication) && (
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full border-academic-green text-academic-green hover:bg-academic-green hover:text-white"
                    onClick={() => handlePDFDownload(publication.title)}
                  >
                    <a href={(publication as JournalArticle).pdfUrl} target="_blank" rel="noopener noreferrer">
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
                
                <Button 
                  variant="outline"
                  className="w-full border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-white"
                  onClick={() => academicTracking.collaborationInquiry('reprint_request', 'publication_page')}
                >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Request Reprint
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Metrics */}
          <AnimatedSection animation="fade-up" delay={300}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                  <BarChart3Icon className="w-5 h-5 mr-2" />
                  Publication Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-academic-slate-600">Citations</span>
                    <Badge variant="outline" className="bg-academic-green/10 border-academic-green/20 text-academic-green">
                      {publication.citationCount}
                    </Badge>
                  </div>
                  
                  {('impactFactor' in publication) && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-600">Impact Factor</span>
                      <Badge variant="outline" className="bg-primary-navy/10 border-primary-navy/20 text-primary-navy">
                        {(publication as JournalArticle).impactFactor}
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-academic-slate-600">Published</span>
                    <span className="text-sm text-academic-slate-700">
                      {new Date(publication.publicationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Related Research */}
          <AnimatedSection animation="fade-up" delay={400}>
            <Card className="bg-white/95 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader>
                <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                  <FlaskConicalIcon className="w-5 h-5 mr-2" />
                  Related Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {('relatedProjects' in publication) && (publication as JournalArticle).relatedProjects.map((projectId, index) => (
                    <div key={index} className="p-3 bg-academic-slate-50 rounded border border-academic-slate-200">
                      <h4 className="text-sm font-medium text-primary-navy mb-1">
                        Related Project
                      </h4>
                      <p className="text-xs text-academic-slate-600">
                        {projectId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <Button 
                        asChild
                        variant="ghost" 
                        size="sm"
                        className="mt-2 text-xs h-auto p-1"
                      >
                        <Link href={`/research`}>
                          View Project →
                        </Link>
                      </Button>
                    </div>
                  ))}
                  
                  {('funding' in publication) && (publication as JournalArticle).funding.length > 0 && (
                    <div className="p-3 bg-accent-gold/5 rounded border border-accent-gold/20">
                      <h4 className="text-sm font-medium text-accent-gold mb-2">
                        Funding Support
                      </h4>
                      <div className="space-y-1">
                        {(publication as JournalArticle).funding.map((grant, index) => (
                          <p key={index} className="text-xs text-academic-slate-600">
                            {grant}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </>
  )
} 
 