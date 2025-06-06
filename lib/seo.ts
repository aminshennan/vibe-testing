import type { Metadata } from 'next'

// Base site configuration
const SITE_CONFIG = {
  name: 'Dr. Sarah Mitchell - Psychology Professor',
  description: 'Academic portfolio of Dr. Sarah Mitchell, Professor of Psychology at UC Berkeley specializing in cognitive psychology, memory research, and educational neuroscience.',
  url: 'https://sarah-mitchell-psychology.vercel.app',
  ogImage: '/images/og-image.jpg',
  twitterImage: '/images/twitter-card.jpg',
  twitterHandle: '@drsarahmitchell',
  author: 'Dr. Sarah Mitchell',
  keywords: [
    'psychology professor',
    'cognitive psychology', 
    'memory research',
    'educational neuroscience',
    'UC Berkeley',
    'Dr. Sarah Mitchell',
    'academic research'
  ]
}

// Enhanced metadata generator for individual pages
export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  type = 'article',
  publishedTime,
  modifiedTime,
  authors = ['Dr. Sarah Mitchell'],
  section,
  tags = [],
  image,
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  image?: string
}): Metadata {
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`
  const url = `${SITE_CONFIG.url}${path}`
  const ogImage = image || SITE_CONFIG.ogImage
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords]

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: authors.map(name => ({ name })),
    creator: SITE_CONFIG.author,
    publisher: 'University of California, Berkeley',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: SITE_CONFIG.twitterHandle,
      images: [image || SITE_CONFIG.twitterImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

// Publication-specific structured data
export function generatePublicationStructuredData(publication: {
  id: string
  title: string
  authors: string[]
  year: string
  abstract: string
  journal?: string
  doi?: string
  citationCount: number
  keywords: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": publication.title,
    "author": publication.authors.map(author => ({
      "@type": "Person",
      "name": author
    })),
    "datePublished": `${publication.year}-01-01`,
    "description": publication.abstract,
    "publisher": {
      "@type": "Organization",
      "name": publication.journal || "Academic Publisher"
    },
    "url": `${SITE_CONFIG.url}/publications/${publication.id}`,
    "identifier": publication.doi ? `https://doi.org/${publication.doi}` : undefined,
    "citation": `${publication.citationCount} citations`,
    "keywords": publication.keywords.join(", "),
    "isPartOf": {
      "@type": "Website",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    }
  }
}

// Research project structured data
export function generateResearchStructuredData(project: {
  id: string
  title: string
  description: string
  status: string
  startDate: string
  endDate?: string
  funding?: string[]
  collaborators?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    "name": project.title,
    "description": project.description,
    "url": `${SITE_CONFIG.url}/research/${project.id}`,
    "startDate": project.startDate,
    "endDate": project.endDate,
    "status": project.status,
    "researcher": {
      "@type": "Person",
      "name": "Dr. Sarah Mitchell",
      "affiliation": {
        "@type": "Organization",
        "name": "University of California, Berkeley"
      }
    },
    "funding": project.funding?.map(fund => ({
      "@type": "Grant",
      "name": fund
    })),
    "collaborator": project.collaborators?.map(collaborator => ({
      "@type": "Person", 
      "name": collaborator
    })),
    "isPartOf": {
      "@type": "Website",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    }
  }
}

// Academic course structured data
export function generateCourseStructuredData(course: {
  id: string
  title: string
  code: string
  description: string
  term: string
  year: string
  students?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "courseCode": course.code,
    "description": course.description,
    "url": `${SITE_CONFIG.url}/teaching#${course.id}`,
    "provider": {
      "@type": "Organization",
      "name": "University of California, Berkeley"
    },
    "instructor": {
      "@type": "Person",
      "name": "Dr. Sarah Mitchell"
    },
    "educationalLevel": "University",
    "timeRequired": `${course.term} ${course.year}`,
    "numberOfStudents": course.students,
    "isPartOf": {
      "@type": "Website",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    }
  }
}

// CV/Resume structured data
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Sarah Mitchell",
    "jobTitle": "Professor of Psychology",
    "worksFor": {
      "@type": "Organization",
      "name": "University of California, Berkeley",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Department of Psychology",
        "addressLocality": "Berkeley",
        "addressRegion": "CA",
        "postalCode": "94720",
        "addressCountry": "US"
      }
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Stanford University"
      },
      {
        "@type": "Organization",
        "name": "University of California, San Diego"
      },
      {
        "@type": "Organization",
        "name": "Harvard University"
      }
    ],
    "knowsAbout": [
      "Cognitive Psychology",
      "Memory Research",
      "Educational Neuroscience",
      "ADHD Interventions",
      "Learning Technologies"
    ],
    "url": SITE_CONFIG.url,
    "email": "s.mitchell@berkeley.edu",
    "sameAs": [
      "https://orcid.org/0000-0000-0000-0000",
      "https://scholar.google.com/citations?user=example",
      "https://www.researchgate.net/profile/example",
      "https://linkedin.com/in/example",
      "https://twitter.com/drsarahmitchell"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Psychology Professor",
      "occupationLocation": {
        "@type": "Place",
        "name": "Berkeley, CA"
      },
      "skills": [
        "Research",
        "Teaching",
        "Academic Writing",
        "Statistical Analysis",
        "Experimental Design"
      ]
    }
  }
}

// SEO breadcrumb generator
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
} 
 