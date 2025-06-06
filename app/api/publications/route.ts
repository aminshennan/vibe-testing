import { NextRequest, NextResponse } from 'next/server'
import { getPublicationsData } from '@/lib/publications-data'

// GET /api/publications - Fetch publications with optional filtering
export async function GET(request: NextRequest) {
  try {
    const publicationsData = getPublicationsData()
    const { searchParams } = new URL(request.url)
    
    // Get query parameters
    const search = searchParams.get('search') || ''
    const area = searchParams.get('area') || ''
    const year = searchParams.get('year') || ''
    const type = searchParams.get('type') || ''
    const sort = searchParams.get('sort') || 'year-desc'
    const format = searchParams.get('format') || 'json'

    // Get all publications as a flat array
    const allPublications = [
      ...publicationsData.publications.journalArticles,
      ...publicationsData.publications.bookChapters,
      ...publicationsData.publications.conferenceProceedings,
      ...publicationsData.publications.workingPapers
    ]

    // Apply filters
    let filteredPublications = allPublications

    // Search filter
    if (search) {
      const query = search.toLowerCase()
      filteredPublications = filteredPublications.filter(pub => 
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some(author => author.toLowerCase().includes(query)) ||
        pub.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
        pub.abstract.toLowerCase().includes(query)
      )
    }

    // Research area filter
    if (area && area !== 'all') {
      filteredPublications = filteredPublications.filter(pub => 
        pub.researchArea.toLowerCase().replace(' ', '-') === area
      )
    }

    // Year filter
    if (year && year !== 'all') {
      filteredPublications = filteredPublications.filter(pub => pub.year === year)
    }

    // Type filter
    if (type && type !== 'all') {
      switch (type) {
        case 'journal':
          filteredPublications = filteredPublications.filter(pub => 'journal' in pub)
          break
        case 'chapters':
          filteredPublications = filteredPublications.filter(pub => 'bookTitle' in pub)
          break
        case 'conference':
          filteredPublications = filteredPublications.filter(pub => 'conference' in pub)
          break
        case 'working':
          filteredPublications = filteredPublications.filter(pub => 'institution' in pub)
          break
      }
    }

    // Sort publications
    switch (sort) {
      case 'year-desc':
        filteredPublications.sort((a, b) => parseInt(b.year) - parseInt(a.year))
        break
      case 'year-asc':
        filteredPublications.sort((a, b) => parseInt(a.year) - parseInt(b.year))
        break
      case 'citations-desc':
        filteredPublications.sort((a, b) => b.citationCount - a.citationCount)
        break
      case 'citations-asc':
        filteredPublications.sort((a, b) => a.citationCount - b.citationCount)
        break
      case 'title':
        filteredPublications.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    // Return different formats
    if (format === 'bibtex') {
      const bibTexEntries = filteredPublications.map(pub => {
        if ('journal' in pub) {
          return `@article{${pub.id},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  journal={${(pub as any).journal}},
  volume={${(pub as any).volume}},
  number={${(pub as any).issue}},
  pages={${(pub as any).pages}},
  year={${pub.year}},
  doi={${(pub as any).doi}},
  abstract={${pub.abstract}}
}`
        }
        return `@misc{${pub.id},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  year={${pub.year}},
  abstract={${pub.abstract}}
}`
      })

      const bibTexContent = bibTexEntries.join('\n\n')
      
      return new NextResponse(bibTexContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="publications-${new Date().toISOString().split('T')[0]}.bib"`
        }
      })
    }

    // Default JSON response
    const response = {
      publications: filteredPublications,
      total: filteredPublications.length,
      filters: {
        search,
        area,
        year,
        type,
        sort
      },
      metadata: {
        totalPublications: allPublications.length,
        researchAreas: publicationsData.researchAreas,
        availableYears: Array.from(new Set(allPublications.map(pub => pub.year))).sort((a, b) => parseInt(b) - parseInt(a))
      }
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })

  } catch (error) {
    console.error('Publications API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Handle publication creation/updates
    const data = await request.json()
    
    // In a real app, this would save to a database
    console.log('Creating/updating publication:', data)
    
    return NextResponse.json({
      success: true,
      message: 'Publication saved successfully'
    })
  } catch (error) {
    console.error('Error saving publication data:', error)
    return NextResponse.json(
      { error: 'Failed to save publication data' },
      { status: 500 }
    )
  }
}