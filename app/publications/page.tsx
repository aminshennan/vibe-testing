import type { Metadata } from 'next'
import { PublicationsPageClient } from '@/components/publications-page-client'
import { getPublicationsData } from "@/lib/publications-data"
import { generatePageMetadata, generateBreadcrumbStructuredData } from '@/lib/seo'

// Enhanced metadata for publications page
export const metadata: Metadata = generatePageMetadata({
  title: 'Publications',
  description: 'Comprehensive collection of peer-reviewed research publications by Dr. Sarah Mitchell in cognitive psychology, educational neuroscience, and learning sciences. Explore journal articles, book chapters, conference proceedings, and working papers.',
  path: '/publications',
  keywords: [
    'publications',
    'research papers',
    'journal articles',
    'book chapters',
    'conference proceedings',
    'cognitive psychology research',
    'educational neuroscience',
    'peer-reviewed articles',
    'academic publications',
    'psychology journals',
    'research bibliography'
  ],
  type: 'website'
})

export default function PublicationsPage() {
  const publicationsData = getPublicationsData()

  // Generate structured data for the publications collection
  const collectionsStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Publications - Dr. Sarah Mitchell",
    "description": "Academic publications and research contributions in psychology and educational sciences",
    "url": "https://sarah-mitchell-psychology.vercel.app/publications",
    "author": {
      "@type": "Person",
      "name": "Dr. Sarah Mitchell",
      "jobTitle": "Professor of Psychology",
      "affiliation": {
        "@type": "Organization",
        "name": "University of California, Berkeley"
      }
    },
    "numberOfItems": publicationsData.publicationMetrics.totalPublications,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": publicationsData.publicationMetrics.totalPublications,
      "itemListElement": [
        ...publicationsData.publications.journalArticles.slice(0, 5).map((pub, index) => ({
          "@type": "ScholarlyArticle",
          "position": index + 1,
          "name": pub.title,
          "author": pub.authors.map(author => ({
            "@type": "Person",
            "name": author
          })),
          "datePublished": pub.year,
          "url": `https://sarah-mitchell-psychology.vercel.app/publications/${pub.id}`
        }))
      ]
    },
    "isPartOf": {
      "@type": "Website",
      "name": "Dr. Sarah Mitchell - Academic Portfolio",
      "url": "https://sarah-mitchell-psychology.vercel.app"
    }
  }

  // Research areas structured data
  const researchAreasStructuredData = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "name": "Dr. Sarah Mitchell Research Areas",
    "description": "Research specializations and impact areas",
    "knowsAbout": publicationsData.researchAreas.map(area => area.name),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Research Publications by Area",
      "itemListElement": publicationsData.researchAreas.map((area, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "name": area.name,
        "description": `${area.publicationCount} publications with ${area.totalCitations} total citations`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": Math.min(5, Math.max(1, area.totalCitations / area.publicationCount / 10)),
          "reviewCount": area.publicationCount
        }
      }))
    }
  }

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://sarah-mitchell-psychology.vercel.app' },
    { name: 'Publications', url: 'https://sarah-mitchell-psychology.vercel.app/publications' }
  ])

  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionsStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(researchAreasStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <PublicationsPageClient publicationsData={publicationsData} />
    </>
  )
} 