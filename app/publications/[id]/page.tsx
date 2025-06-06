import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PublicationDetailClient } from '@/components/publication-detail-client'
import { 
  CalendarIcon,
  UserIcon
} from 'lucide-react'
import { 
  getAllPublications, 
  getPublicationById,
  formatAPACitation,
  type Publication,
  type JournalArticle
} from '@/lib/publications-data'
import { generatePageMetadata, generatePublicationStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

interface PublicationPageProps {
  params: Promise<{ id: string }>
}

// Generate static params for ISR
export async function generateStaticParams() {
  const allPublications = getAllPublications()
  
  return allPublications.map((publication) => ({
    id: publication.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { id } = await params
  const publication = getPublicationById(id)

  if (!publication) {
    return {
      title: 'Publication Not Found',
      description: 'The requested publication could not be found.',
    }
  }

  return generatePageMetadata({
    title: publication.title,
    description: publication.abstract,
    path: `/publications/${id}`,
    type: 'article',
    publishedTime: publication.publicationDate,
    authors: publication.authors,
    tags: publication.keywords,
  })
}

export default async function PublicationPage({ params }: PublicationPageProps) {
  const { id } = await params
  const publication = getPublicationById(id)

  if (!publication) {
    notFound()
  }

  // Generate citations
  const apaCitation = formatAPACitation(publication)
  const bibTeX = generateBibTeX(publication)

  // Generate structured data for SEO
  const publicationStructuredData = generatePublicationStructuredData(publication)
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Publications', url: '/publications' },
    { name: publication.title, url: `/publications/${id}` }
  ])

  // Helper function to generate BibTeX
  function generateBibTeX(publication: Publication): string {
    if ('journal' in publication) {
      const journalPub = publication as JournalArticle
      return `@article{${journalPub.id},
  title={${journalPub.title}},
  author={${journalPub.authors.join(' and ')}},
  journal={${journalPub.journal}},
  volume={${journalPub.volume}},
  number={${journalPub.issue}},
  pages={${journalPub.pages}},
  year={${journalPub.year}},
  doi={${journalPub.doi}},
  abstract={${journalPub.abstract}}
}`
    }
    return `@misc{${publication.id},
  title={${publication.title}},
  author={${publication.authors.join(' and ')}},
  year={${publication.year}},
  abstract={${publication.abstract}}
}`
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([publicationStructuredData, breadcrumbStructuredData])
        }}
      />

      <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
        {/* Academic Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

        <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
          {/* Publication Header */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-primary-navy mb-4 leading-tight">
                  {publication.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-academic-slate-600 mb-4">
                  <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-1" />
                    <span>{publication.authors.join(', ')}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(publication.publicationDate).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {publication.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Publication Type Information */}
            <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-primary-navy font-serif flex items-center justify-between">
                  <span>Publication Details</span>
                  <Badge variant="outline" className="ml-2">
                    {publication.researchArea}
                  </Badge>
                </CardTitle>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  {'journal' in publication && (
                    <>
                      <div>
                        <span className="font-medium text-academic-slate-700">Journal:</span>
                        <p className="text-academic-slate-600">{(publication as any).journal}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Volume/Issue:</span>
                        <p className="text-academic-slate-600">{(publication as any).volume}({(publication as any).issue})</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Pages:</span>
                        <p className="text-academic-slate-600">{(publication as any).pages}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Impact Factor:</span>
                        <p className="text-academic-slate-600">{(publication as any).impactFactor}</p>
                      </div>
                    </>
                  )}
                  
                  {'bookTitle' in publication && (
                    <>
                      <div>
                        <span className="font-medium text-academic-slate-700">Book:</span>
                        <p className="text-academic-slate-600">{(publication as any).bookTitle}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Publisher:</span>
                        <p className="text-academic-slate-600">{(publication as any).publisher}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Pages:</span>
                        <p className="text-academic-slate-600">{(publication as any).pages}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">ISBN:</span>
                        <p className="text-academic-slate-600">{(publication as any).isbn}</p>
                      </div>
                    </>
                  )}
                  
                  {'conference' in publication && (
                    <>
                      <div>
                        <span className="font-medium text-academic-slate-700">Conference:</span>
                        <p className="text-academic-slate-600">{(publication as any).conference}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Location:</span>
                        <p className="text-academic-slate-600">{(publication as any).location}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Month:</span>
                        <p className="text-academic-slate-600">{(publication as any).month}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Type:</span>
                        <p className="text-academic-slate-600">{(publication as any).presentationType}</p>
                      </div>
                    </>
                  )}
                  
                  {'institution' in publication && (
                    <>
                      <div>
                        <span className="font-medium text-academic-slate-700">Institution:</span>
                        <p className="text-academic-slate-600">{(publication as any).institution}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Target Journal:</span>
                        <p className="text-academic-slate-600">{(publication as any).targetJournal}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Status:</span>
                        <p className="text-academic-slate-600">{(publication as any).status}</p>
                      </div>
                      <div>
                        <span className="font-medium text-academic-slate-700">Last Updated:</span>
                        <p className="text-academic-slate-600">
                          {new Date((publication as any).lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Client-side Interactive Content */}
          <PublicationDetailClient 
            publication={publication} 
            apaCitation={apaCitation}
            bibTeX={bibTeX}
          />
        </div>
      </main>
    </>
  )
} 
 