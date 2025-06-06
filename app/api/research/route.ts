import { NextRequest, NextResponse } from 'next/server'

// Mock research data - in a real app this would come from a database
const researchProjects = [
  {
    id: 'working-memory-capacity',
    title: 'Working Memory Capacity in ADHD Students',
    status: 'active',
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    funding: 150000,
    fundingSource: 'National Science Foundation',
    participants: 120,
    description: 'Investigating how working memory limitations affect academic performance in students with ADHD.',
    methodology: 'Longitudinal study with cognitive assessments and academic tracking',
    area: 'cognitive-psychology',
    collaborators: ['Dr. Jane Smith (Stanford)', 'Dr. Robert Chen (UCLA)'],
    publications: ['memory-consolidation-2024'],
    tags: ['ADHD', 'Working Memory', 'Education', 'Cognitive Assessment']
  },
  {
    id: 'memory-consolidation-sleep',
    title: 'Memory Consolidation During Sleep',
    status: 'completed',
    startDate: '2021-09-01',
    endDate: '2023-08-31',
    funding: 200000,
    fundingSource: 'NIH',
    participants: 85,
    description: 'Examining how sleep quality affects memory consolidation in college students.',
    methodology: 'Sleep lab studies with EEG monitoring and memory tasks',
    area: 'neuroscience',
    collaborators: ['Dr. Maria Rodriguez (Berkeley)', 'Dr. Alex Kim (UCSF)'],
    publications: ['sleep-memory-2023', 'consolidation-patterns-2023'],
    tags: ['Sleep', 'Memory', 'EEG', 'Students']
  },
  {
    id: 'educational-technology-impact',
    title: 'Educational Technology Impact on Learning',
    status: 'planning',
    startDate: '2024-06-01',
    endDate: '2026-05-31',
    funding: 300000,
    fundingSource: 'Department of Education',
    participants: 200,
    description: 'Assessing the effectiveness of AI-powered learning tools in diverse educational settings.',
    methodology: 'Multi-site randomized controlled trial',
    area: 'educational-psychology',
    collaborators: ['Dr. Lisa Park (Harvard)', 'Dr. Michael Brown (MIT)'],
    publications: [],
    tags: ['Technology', 'AI', 'Learning', 'Education']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get('area')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let filteredProjects = [...researchProjects]

    // Filter by research area
    if (area && area !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.area === area)
    }

    // Filter by status
    if (status && status !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.status === status)
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    return NextResponse.json({
      projects: filteredProjects,
      total: filteredProjects.length,
      areas: ['cognitive-psychology', 'neuroscience', 'educational-psychology'],
      statuses: ['active', 'completed', 'planning']
    })
  } catch (error) {
    console.error('Error fetching research data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Handle research project creation/updates
    const data = await request.json()
    
    // In a real app, this would save to a database
    console.log('Creating/updating research project:', data)
    
    return NextResponse.json({
      success: true,
      message: 'Research project saved successfully'
    })
  } catch (error) {
    console.error('Error saving research data:', error)
    return NextResponse.json(
      { error: 'Failed to save research data' },
      { status: 500 }
    )
  }
} 