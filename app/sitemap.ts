import { MetadataRoute } from 'next'
import { getResearchData } from '@/lib/research-data'
import { getAllPublications } from '@/lib/publications-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sarah-mitchell-psychology.vercel.app'
  const currentDate = new Date()
  
  // Get dynamic content for sitemap generation
  const researchData = getResearchData()
  const allPublications = getAllPublications()

  // Static pages with SEO priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teaching`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamic research project pages
  const researchPages: MetadataRoute.Sitemap = []
  
  // Add active research projects
  researchData.researchProjects.active.forEach((project) => {
    researchPages.push({
      url: `${baseUrl}/research/${project.id}`,
      lastModified: new Date(project.endDate || currentDate),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Add completed research projects
  researchData.researchProjects.completed.forEach((project) => {
    researchPages.push({
      url: `${baseUrl}/research/${project.id}`,
      lastModified: new Date(project.endDate || currentDate),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Dynamic publication pages (if individual publication pages exist)
  const publicationPages: MetadataRoute.Sitemap = []
  
  allPublications.forEach((publication) => {
    publicationPages.push({
      url: `${baseUrl}/publications/${publication.id}`,
      lastModified: new Date(publication.publicationDate || currentDate),
      changeFrequency: 'yearly',
      priority: 0.6,
    })
  })

  return [
    ...staticPages,
    ...researchPages,
    ...publicationPages,
  ]
} 