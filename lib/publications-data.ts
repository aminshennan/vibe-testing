import publicationsDataJson from "@/data/publications-data.json"

// Export the publications data
export const data = publicationsDataJson

// Type definitions for publications data
export type PublicationsData = typeof publicationsDataJson

export interface BasePublication {
  id: string
  title: string
  authors: string[]
  year: string
  abstract: string
  keywords: string[]
  citationCount: number
  publicationDate: string
  researchArea: string
}

export interface JournalArticle extends BasePublication {
  journal: string
  volume: string
  issue: string
  pages: string
  doi: string
  pdfUrl: string
  isOpenAccess: boolean
  impactFactor: number
  quartile: string
  funding: string[]
  relatedProjects: string[]
}

export interface BookChapter extends BasePublication {
  bookTitle: string
  editors: string[]
  publisher: string
  pages: string
  isbn: string
  doi?: string
}

export interface ConferenceProceeding extends BasePublication {
  conference: string
  location: string
  month: string
  pages: string
  presentationType: string
}

export interface WorkingPaper extends BasePublication {
  institution: string
  status: string
  targetJournal: string
  lastUpdated: string
}

// Union type for all publication types
export type Publication = JournalArticle | BookChapter | ConferenceProceeding | WorkingPaper

export interface PublicationMetrics {
  totalPublications: number
  totalCitations: number
  hIndex: number
  i10Index: number
  averageCitationsPerPaper: number
  journalArticles: number
  bookChapters: number
  conferenceProceedings: number
  workingPapers: number
  openAccessPublications: number
  impactFactorRange: string
  topQuartilePublications: number
  recentPublications: number
  collaborativePublications: number
  internationalCollaborations: number
}

export interface ResearchAreaMetrics {
  name: string
  publicationCount: number
  totalCitations: number
}

// Publications data helper for sitemap and other functionality
// export interface Publication {
//   id: string
//   title: string
//   authors: string[]
//   journal: string
//   year: number
//   doi?: string
//   abstract: string
//   keywords: string[]
//   type: 'journal' | 'conference' | 'book' | 'preprint'
//   status: 'published' | 'in-press' | 'submitted'
//   lastUpdated?: string
//   citationCount?: number
//   researchArea?: string
// }

// Mock publications data for academic portfolio
const mockPublicationsData = {
  publications: {
    journalArticles: [
      {
        id: 'memory-consolidation-2024',
        title: 'Memory consolidation in educational contexts: A neuroimaging study',
        authors: ['Mitchell, S.', 'Chen, M.', 'Rodriguez, E.'],
        year: '2024',
        abstract: 'This study investigates how educational environments influence memory consolidation processes using advanced neuroimaging techniques.',
        keywords: ['memory consolidation', 'education', 'neuroimaging', 'fMRI'],
        citationCount: 15,
        publicationDate: '2024-01-15',
        researchArea: 'Cognitive Psychology',
        journal: 'Nature Neuroscience',
        volume: '31',
        issue: '2',
        pages: '234-251',
        doi: '10.1038/nn.2024.1234',
        pdfUrl: '/publications/memory-consolidation-2024.pdf',
        isOpenAccess: true,
        impactFactor: 14.2,
        quartile: 'Q1',
        funding: ['NSF-BCS-2024-5678'],
        relatedProjects: ['memory-formation-study']
      },
      {
        id: 'cognitive-interventions-adhd-2023',
        title: 'Personalized cognitive interventions for ADHD: A randomized controlled trial',
        authors: ['Mitchell, S.', 'Thompson, J.', 'Park, L.'],
        year: '2023',
        abstract: 'We developed and tested personalized cognitive intervention strategies for adults with ADHD.',
        keywords: ['ADHD', 'cognitive intervention', 'personalized therapy', 'RCT'],
        citationCount: 32,
        publicationDate: '2023-08-20',
        researchArea: 'ADHD Interventions',
        journal: 'Clinical Psychology Review',
        volume: '45',
        issue: '3',
        pages: '123-145',
        doi: '10.1016/j.cpr.2023.5678',
        pdfUrl: '/publications/cognitive-interventions-adhd-2023.pdf',
        isOpenAccess: false,
        impactFactor: 8.4,
        quartile: 'Q1',
        funding: ['NIH-R01-MH123456'],
        relatedProjects: ['adhd-interventions']
      },
      {
        id: 'working-memory-academic-2022',
        title: 'Working memory and academic achievement: A four-year longitudinal study',
        authors: ['Mitchell, S.', 'Foster, A.', 'Williams, R.'],
        year: '2022',
        abstract: 'This longitudinal study examined the relationship between working memory capacity and academic performance over four years.',
        keywords: ['working memory', 'academic achievement', 'longitudinal study'],
        citationCount: 45,
        publicationDate: '2022-12-10',
        researchArea: 'Memory Research',
        journal: 'Journal of Educational Psychology',
        volume: '89',
        issue: '4',
        pages: '567-589',
        doi: '10.1037/edu0000789',
        pdfUrl: '/publications/working-memory-academic-2022.pdf',
        isOpenAccess: true,
        impactFactor: 6.1,
        quartile: 'Q1',
        funding: ['University Research Grant'],
        relatedProjects: ['working-memory-education']
      },
      {
        id: 'social-cognition-aging-2024',
        title: 'Social cognition changes across the lifespan: Protective factors and interventions',
        authors: ['Mitchell, S.', 'Williams, R.'],
        year: '2024',
        abstract: 'An examination of how social cognitive abilities change with age and factors that protect against decline.',
        keywords: ['social cognition', 'aging', 'intervention', 'lifespan development'],
        citationCount: 0,
        publicationDate: '2024-02-01',
        researchArea: 'Developmental Psychology',
        journal: 'Developmental Psychology',
        volume: '60',
        issue: '1',
        pages: '45-62',
        doi: '10.1037/dev0001234',
        pdfUrl: '/publications/social-cognition-aging-2024.pdf',
        isOpenAccess: true,
        impactFactor: 4.8,
        quartile: 'Q2',
        funding: ['Private Foundation Grant'],
        relatedProjects: ['social-cognition']
      }
    ],
    bookChapters: [] as BookChapter[],
    conferenceProceedings: [] as ConferenceProceeding[],
    workingPapers: [] as WorkingPaper[]
  },
  publicationMetrics: {
    totalPublications: 4,
    totalCitations: 92,
    hIndex: 4,
    i10Index: 3,
    averageCitationsPerPaper: 23,
    journalArticles: 4,
    bookChapters: 0,
    conferenceProceedings: 0,
    workingPapers: 0,
    openAccessPublications: 3,
    impactFactorRange: "6.1 - 8.4",
    topQuartilePublications: 4,
    recentPublications: 2,
    collaborativePublications: 4,
    internationalCollaborations: 1,
    citationsTotal: 92,
    topPublications: ['cognitive-interventions-adhd-2023', 'working-memory-academic-2022'],
    recentPapers: 2,
    averageCitationsPerYear: 23
  },
  researchAreas: [
    {
      name: 'Cognitive Psychology',
      description: 'Understanding cognitive processes and mechanisms',
      publicationCount: 1,
      totalCitations: 15,
      publications: ['memory-consolidation-2024']
    },
    {
      name: 'ADHD Interventions',
      description: 'Developing and testing therapeutic interventions for ADHD',
      publicationCount: 1,
      totalCitations: 32,
      publications: ['cognitive-interventions-adhd-2023']
    },
    {
      name: 'Memory Research',
      description: 'Investigating memory processes and their educational applications',
      publicationCount: 1,
      totalCitations: 45,
      publications: ['working-memory-academic-2022']
    },
    {
      name: 'Developmental Psychology',
      description: 'Studying cognitive development across the lifespan',
      publicationCount: 1,
      totalCitations: 0,
      publications: ['social-cognition-aging-2024']
    }
  ]
}

// Helper function to get all publications data
export function getPublicationsData() {
  return mockPublicationsData
}

// Helper function to get all publications (flattened array)
export function getAllPublications(): Publication[] {
  return [
    ...mockPublicationsData.publications.journalArticles,
    ...mockPublicationsData.publications.bookChapters,
    ...mockPublicationsData.publications.conferenceProceedings,
    ...mockPublicationsData.publications.workingPapers
  ]
}

// Helper function to get publications by status
export function getPublicationsByStatus(status: 'published' | 'in-press' | 'submitted'): JournalArticle[] {
  // Since our journal articles are all published, return all if status is 'published'
  return status === 'published' ? mockPublicationsData.publications.journalArticles : []
}

// Helper function to get publications by year
export function getPublicationsByYear(year: string): JournalArticle[] {
  return mockPublicationsData.publications.journalArticles.filter(pub => pub.year === year)
}

// Helper function to get publications by type (simplified for journal articles)
export function getPublicationsByType(type: 'journal' | 'conference' | 'book' | 'preprint'): Publication[] {
  switch (type) {
    case 'journal':
      return mockPublicationsData.publications.journalArticles
    case 'conference':
      return mockPublicationsData.publications.conferenceProceedings
    case 'book':
      return mockPublicationsData.publications.bookChapters
    case 'preprint':
      return mockPublicationsData.publications.workingPapers
    default:
      return []
  }
}

// Helper function to get publication by ID
export function getPublicationById(id: string): JournalArticle | undefined {
  return mockPublicationsData.publications.journalArticles.find(pub => pub.id === id)
}

// Helper function to search publications
export function searchPublications(query: string): JournalArticle[] {
  const lowercaseQuery = query.toLowerCase()
  
  return mockPublicationsData.publications.journalArticles.filter(pub =>
    pub.title.toLowerCase().includes(lowercaseQuery) ||
    pub.abstract.toLowerCase().includes(lowercaseQuery) ||
    pub.authors.some(author => author.toLowerCase().includes(lowercaseQuery)) ||
    pub.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    pub.journal.toLowerCase().includes(lowercaseQuery)
  )
}

// Helper function to get recent publications
export function getRecentPublications(limit: number = 5): JournalArticle[] {
  return mockPublicationsData.publications.journalArticles
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    .slice(0, limit)
}

// Helper function to format citation (APA style)
export function formatCitation(publication: JournalArticle, style: 'APA' | 'MLA' | 'Chicago' = 'APA'): string {
  const { authors, year, title, journal } = publication
  
  switch (style) {
    case 'APA':
      const authorStr = authors.join(', ')
      return `${authorStr} (${year}). ${title}. ${journal}.${publication.doi ? ` https://doi.org/${publication.doi}` : ''}`
    
    case 'MLA':
      const firstAuthor = authors[0]
      const otherAuthors = authors.slice(1)
      const mlaAuthors = otherAuthors.length > 0 
        ? `${firstAuthor}, et al.` 
        : firstAuthor
      return `${mlaAuthors} "${title}." ${journal}, ${year}.`
    
    case 'Chicago':
      const chicagoAuthors = authors.join(', ')
      return `${chicagoAuthors}. "${title}." ${journal} (${year}).${publication.doi ? ` https://doi.org/${publication.doi}.` : ''}`
    
    default:
      return formatCitation(publication, 'APA')
  }
}

// Helper function for backward compatibility - format APA citation
export function formatAPACitation(publication: Publication): string {
  if ('journal' in publication) {
    return formatCitation(publication, 'APA')
  }
  
  // For other publication types, create basic citation
  const { authors, year, title } = publication
  const authorStr = authors.join(', ')
  
  if ('bookTitle' in publication) {
    const bookPub = publication as BookChapter
    return `${authorStr} (${year}). ${title}. In ${bookPub.bookTitle}. ${bookPub.publisher}.`
  }
  
  if ('conference' in publication) {
    const confPub = publication as ConferenceProceeding
    return `${authorStr} (${year}). ${title}. In ${confPub.conference}, ${confPub.location}.`
  }
  
  if ('institution' in publication) {
    const workingPub = publication as WorkingPaper
    return `${authorStr} (${year}). ${title}. ${workingPub.institution}. [Working Paper]`
  }
  
  // Fallback
  return `${authorStr} (${year}). ${title}.`
}

// Helper function to get publication type label
export function getPublicationTypeLabel(publication: Publication): string {
  if ('journal' in publication) return 'Journal Article'
  if ('bookTitle' in publication) return 'Book Chapter'
  if ('conference' in publication) return 'Conference Proceeding'
  if ('institution' in publication) return 'Working Paper'
  return 'Publication'
}

// Helper function to get publication type badge color
export function getPublicationTypeBadgeColor(publication: Publication): string {
  if ('journal' in publication) return 'bg-primary-navy text-white'
  if ('bookTitle' in publication) return 'bg-accent-burgundy text-white'
  if ('conference' in publication) return 'bg-academic-green text-white'
  if ('institution' in publication) return 'bg-accent-gold text-white'
  return 'bg-academic-slate-500 text-white'
}

export default mockPublicationsData 