'use client'

import { AnimatedSection } from '@/components/ui/animated-section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  GraduationCapIcon, 
  BookOpenIcon, 
  ClockIcon, 
  UsersIcon,
  CalendarIcon,
  FileTextIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  StarIcon,
  DownloadIcon
} from 'lucide-react'

interface Course {
  courseCode: string
  title: string
  description: string
  semester: string
  year: number
  credits: number
  enrollment: number
  level: 'undergraduate' | 'graduate'
  prerequisites?: string[]
  format: 'in-person' | 'online' | 'hybrid'
  schedule: {
    days: string[]
    time: string
    location: string
  }
  syllabus?: string
}

interface StudentTestimonial {
  name: string
  course: string
  year: string
  quote: string
  rating: number
}

const currentCourses: Course[] = [
  {
    courseCode: 'PSY 101',
    title: 'Introduction to Psychology',
    description: 'Comprehensive overview of psychological principles, research methods, and major areas of study including cognition, personality, social psychology, and mental health.',
    semester: 'Fall',
    year: 2024,
    credits: 4,
    enrollment: 180,
    level: 'undergraduate',
    format: 'in-person',
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      time: '10:00 AM - 10:50 AM',
      location: 'Wheeler Hall 150'
    },
    syllabus: '/syllabi/psy101-fall2024.pdf'
  },
  {
    courseCode: 'PSY 301',
    title: 'Cognitive Psychology',
    description: 'Advanced study of mental processes including attention, memory, language, problem-solving, and decision-making. Emphasis on current research and experimental methods.',
    semester: 'Fall',
    year: 2024,
    credits: 3,
    enrollment: 45,
    level: 'undergraduate',
    prerequisites: ['PSY 101', 'PSY 201'],
    format: 'in-person',
    schedule: {
      days: ['Tue', 'Thu'],
      time: '2:00 PM - 3:30 PM',
      location: 'Tolman Hall 1102'
    },
    syllabus: '/syllabi/psy301-fall2024.pdf'
  },
  {
    courseCode: 'PSY 350',
    title: 'Research Methods in Psychology',
    description: 'Comprehensive training in psychological research design, statistical analysis, and scientific writing. Students conduct original research projects.',
    semester: 'Fall',
    year: 2024,
    credits: 4,
    enrollment: 32,
    level: 'undergraduate',
    prerequisites: ['PSY 101', 'Statistics 101'],
    format: 'hybrid',
    schedule: {
      days: ['Mon', 'Wed'],
      time: '1:00 PM - 2:30 PM',
      location: 'Tolman Hall 1203'
    },
    syllabus: '/syllabi/psy350-fall2024.pdf'
  },
  {
    courseCode: 'PSY 710',
    title: 'Advanced Cognitive Neuroscience',
    description: 'Graduate seminar exploring cutting-edge research in cognitive neuroscience, neuroimaging methods, and computational approaches to understanding the mind.',
    semester: 'Fall',
    year: 2024,
    credits: 3,
    enrollment: 12,
    level: 'graduate',
    prerequisites: ['Graduate standing', 'PSY 601'],
    format: 'in-person',
    schedule: {
      days: ['Wed'],
      time: '3:00 PM - 6:00 PM',
      location: 'Tolman Hall 3105'
    },
    syllabus: '/syllabi/psy710-fall2024.pdf'
  }
]

const teachingPhilosophy = {
  overview: 'My teaching philosophy centers on active learning, critical thinking, and the application of psychological science to real-world problems. I believe that students learn best when they are engaged as active participants in the learning process, connecting theoretical concepts to their own experiences and contemporary issues.',
  principles: [
    {
      title: 'Evidence-Based Learning',
      description: 'All course content is grounded in current psychological research and empirical evidence, helping students understand how we know what we know in psychology.'
    },
    {
      title: 'Active Engagement',
      description: 'Interactive lectures, hands-on experiments, and collaborative projects ensure students are actively constructing their understanding rather than passively receiving information.'
    },
    {
      title: 'Critical Thinking',
      description: 'Students learn to evaluate research claims, identify methodological strengths and weaknesses, and apply psychological principles to analyze complex problems.'
    },
    {
      title: 'Inclusive Excellence',
      description: 'Creating a welcoming environment where diverse perspectives are valued and all students can succeed regardless of their background or learning style.'
    }
  ],
  outcomes: [
    'Develop strong analytical and critical thinking skills',
    'Understand and apply the scientific method to psychological questions',
    'Communicate psychological concepts clearly to diverse audiences',
    'Appreciate the diversity and complexity of human behavior',
    'Connect psychological principles to real-world applications'
  ]
}

const studentTestimonials: StudentTestimonial[] = [
  {
    name: 'Alex Chen',
    course: 'PSY 301 - Cognitive Psychology',
    year: '2024',
    quote: 'Dr. Mitchell&apos;s class completely changed how I think about memory and learning. The experiments we conducted gave me hands-on experience with real research methods.',
    rating: 5
  },
  {
    name: 'Maria Rodriguez',
    course: 'PSY 350 - Research Methods',
    year: '2023',
    quote: 'The research project I completed in this class led to my first publication! Dr. Mitchell&apos;s mentorship was invaluable in developing my research skills.',
    rating: 5
  },
  {
    name: 'Jordan Williams',
    course: 'PSY 101 - Introduction to Psychology',
    year: '2024',
    quote: 'Even though this was an intro class, Dr. Mitchell made complex topics accessible and exciting. I&apos;m now majoring in psychology because of this course.',
    rating: 5
  }
]

const officeHours = {
  regular: [
    {
      day: 'Tuesday',
      time: '2:00 PM - 4:00 PM',
      location: 'Tolman Hall 3210',
      type: 'Drop-in'
    },
    {
      day: 'Thursday', 
      time: '2:00 PM - 4:00 PM',
      location: 'Tolman Hall 3210',
      type: 'Drop-in'
    },
    {
      day: 'Friday',
      time: '1:00 PM - 2:00 PM',
      location: 'Tolman Hall 3210',
      type: 'By appointment'
    }
  ],
  virtual: {
    platform: 'Zoom',
    time: 'Wednesdays 3:00 PM - 4:00 PM',
    link: 'https://berkeley.zoom.us/j/123456789'
  }
}

export default function TeachingPage() {
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
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-navy font-serif">Teaching Portfolio</h1>
            </div>
            <p className="text-lg text-academic-slate-600 max-w-3xl mx-auto leading-relaxed">
              Fostering critical thinking, scientific literacy, and passion for psychological science 
              through evidence-based teaching and mentorship.
            </p>
          </div>
        </AnimatedSection>

        {/* Teaching Philosophy */}
        <AnimatedSection animation="fade-up" delay={100}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-3" />
                Teaching Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-academic-slate-700 leading-relaxed text-lg">
                {teachingPhilosophy.overview}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teachingPhilosophy.principles.map((principle, index) => (
                  <div key={index} className="bg-primary-navy/5 border border-primary-navy/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary-navy mb-2">{principle.title}</h3>
                    <p className="text-academic-slate-600 text-sm">{principle.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-academic-green/5 border-l-4 border-academic-green p-4 rounded-r-lg">
                <h3 className="font-semibold text-academic-green mb-3">Learning Outcomes</h3>
                <ul className="space-y-2">
                  {teachingPhilosophy.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <StarIcon className="w-4 h-4 text-academic-green mr-2 mt-1 flex-shrink-0" />
                      <span className="text-academic-slate-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Current Courses */}
        <AnimatedSection animation="fade-up" delay={200}>
          <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-navy font-serif flex items-center">
                <CalendarIcon className="w-6 h-6 mr-3" />
                Current Courses - Fall 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentCourses.map((course, index) => (
                  <AnimatedSection key={course.courseCode} animation="fade-up" delay={100 * (index + 1)}>
                    <div className="bg-gradient-to-br from-white to-academic-slate-50 border border-academic-slate-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={course.level === 'graduate' ? 'default' : 'secondary'}
                              className={course.level === 'graduate' ? 'bg-primary-navy text-white' : ''}
                            >
                              {course.courseCode}
                            </Badge>
                            <Badge variant="outline" className="text-academic-green border-academic-green">
                              {course.credits} Credits
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-primary-navy font-serif">{course.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-academic-slate-600">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            <span className="text-sm">{course.enrollment}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-academic-slate-700 text-sm mb-4 leading-relaxed">
                        {course.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-academic-slate-600">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>{course.schedule.days.join(', ')} • {course.schedule.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-academic-slate-600">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span>{course.schedule.location} • {course.format}</span>
                        </div>
                      </div>

                      {course.prerequisites && (
                        <div className="mb-4">
                          <span className="text-xs font-medium text-academic-slate-600">Prerequisites: </span>
                          <span className="text-xs text-academic-slate-600">{course.prerequisites.join(', ')}</span>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {course.syllabus && (
                          <Button variant="outline" size="sm" className="text-primary-navy border-primary-navy hover:bg-primary-navy hover:text-white">
                            <FileTextIcon className="w-4 h-4 mr-1" />
                            Syllabus
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-academic-green border-academic-green hover:bg-academic-green hover:text-white">
                          <MessageSquareIcon className="w-4 h-4 mr-1" />
                          Course Info
                        </Button>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Office Hours & Student Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Office Hours */}
          <AnimatedSection animation="fade-up" delay={300}>
            <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  Office Hours & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-academic-slate-800 mb-3">Regular Office Hours</h3>
                  <div className="space-y-3">
                    {officeHours.regular.map((hours, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-primary-navy/5 rounded-lg">
                        <div>
                          <p className="font-medium text-primary-navy">{hours.day}</p>
                          <p className="text-sm text-academic-slate-600">{hours.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-academic-slate-700">{hours.location}</p>
                          <Badge variant="outline" className="text-xs">{hours.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-academic-green/5 border border-academic-green/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-academic-green mb-2">Virtual Office Hours</h3>
                  <p className="text-sm text-academic-slate-700 mb-2">{officeHours.virtual.time}</p>
                  <Button size="sm" className="bg-academic-green hover:bg-academic-green/90 text-white">
                    Join Virtual Hours
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-academic-slate-200">
                  <Button className="bg-primary-navy hover:bg-primary-navy/90 text-white">
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Student Testimonials */}
          <AnimatedSection animation="fade-up" delay={400}>
            <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
                  <MessageSquareIcon className="w-5 h-5 mr-2" />
                  Student Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentTestimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-r from-academic-slate-50 to-white p-4 rounded-lg border border-academic-slate-200">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-accent-gold fill-current" />
                        ))}
                      </div>
                      <div className="ml-auto">
                        <p className="text-xs text-academic-slate-600">{testimonial.year}</p>
                      </div>
                    </div>
                    <p className="text-sm text-academic-slate-700 italic mb-3">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="text-xs text-academic-slate-600">
                      <p className="font-medium">{testimonial.name}</p>
                      <p>{testimonial.course}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Teaching Resources & Opportunities */}
        <AnimatedSection animation="fade-up" delay={500}>
          <Card className="bg-gradient-to-r from-primary-navy/5 to-academic-green/5 border-primary-navy/20">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-bold text-primary-navy font-serif mb-4">
                Student Opportunities & Resources
              </h2>
              <p className="text-academic-slate-600 mb-6 max-w-2xl mx-auto">
                I&apos;m committed to providing students with research opportunities, academic mentorship, 
                and resources for academic and professional development in psychology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  className="bg-primary-navy hover:bg-primary-navy/90 text-white"
                >
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Join Research Lab
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
                >
                  <FileTextIcon className="w-4 h-4 mr-2" />
                  Course Materials
                </Button>
                <Button 
                  variant="outline" 
                  className="border-academic-green text-academic-green hover:bg-academic-green hover:text-white"
                >
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Academic Advising
                </Button>
                <Button 
                  variant="outline" 
                  className="border-accent-burgundy text-accent-burgundy hover:bg-accent-burgundy hover:text-white"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Study Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
} 