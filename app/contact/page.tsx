import type { Metadata, Viewport } from "next"
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, CalendarIcon, UsersIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AcademicContactForm } from "@/components/academic-contact-form"
import { ScrollReveal, PageTransition } from "@/components/advanced-animations"
import { getPersonalInfo } from "@/lib/data"

export const metadata: Metadata = {
  title: 'Contact - Dr. Sarah Mitchell',
  description: 'Get in touch with Dr. Sarah Mitchell for research collaboration, academic inquiries, speaking engagements, and student consultations.',
  keywords: 'contact, office hours, appointment, research collaboration, academic inquiry, UC Berkeley psychology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function ContactPage() {
  const personalInfo = getPersonalInfo()

  const officeHours = [
    { day: 'Tuesday', time: '2:00 PM - 4:00 PM', type: 'In-person', location: 'Tolman Hall 3210' },
    { day: 'Thursday', time: '2:00 PM - 4:00 PM', type: 'In-person', location: 'Tolman Hall 3210' },
    { day: 'Wednesday', time: '1:00 PM - 2:00 PM', type: 'Virtual', location: 'Zoom (by appointment)' },
    { day: 'Friday', time: '1:00 PM - 2:00 PM', type: 'Virtual', location: 'Zoom (by appointment)' }
  ]

  const contactMethods = [
    {
      icon: MailIcon,
      title: 'Email',
      primary: personalInfo.email,
      secondary: 'Best for: Academic inquiries, research questions',
      response: 'Response within 24-48 hours',
      color: 'text-primary-navy'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      primary: personalInfo.phone,
      secondary: 'Best for: Urgent matters, media inquiries',
      response: 'Available during office hours',
      color: 'text-academic-green'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      primary: personalInfo.office,
      secondary: personalInfo.institution,
      response: 'In-person meetings by appointment',
      color: 'text-accent-burgundy'
    },
    {
      icon: CalendarIcon,
      title: 'Appointment',
      primary: 'Schedule a meeting',
      secondary: 'Best for: Extended discussions, collaboration planning',
      response: 'Flexible scheduling available',
      color: 'text-academic-slate-600'
    }
  ]

  return (
    <PageTransition>
      <main className="min-h-screen bg-academic-slate-50 text-academic-slate-900">
        {/* Academic Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

        <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center mb-4">
                <MailIcon className="w-8 h-8 mr-3 text-primary-navy" />
                <h1 className="text-3xl sm:text-4xl font-bold text-primary-navy font-serif">Contact</h1>
              </div>
              <p className="text-lg text-academic-slate-600 max-w-3xl mx-auto leading-relaxed">
                I welcome inquiries from students, fellow researchers, media professionals, and anyone interested 
                in cognitive psychology and educational neuroscience. Please choose the most appropriate contact method below.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <ScrollReveal key={method.title} threshold={0.1}>
                  <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary-navy/10 flex items-center justify-center mr-3">
                          <Icon className={`w-5 h-5 ${method.color}`} />
                        </div>
                        <h3 className="font-semibold text-primary-navy">{method.title}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-medium text-academic-slate-900">{method.primary}</p>
                        <p className="text-sm text-academic-slate-600">{method.secondary}</p>
                        <Badge className="text-xs border border-academic-slate-300 text-academic-slate-600">
                          {method.response}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Contact Form */}
            <div className="lg:col-span-2">
              <ScrollReveal variant="academicCard">
                <AcademicContactForm />
              </ScrollReveal>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Office Hours */}
              <ScrollReveal>
                <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      Office Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-6 md:gap-8">
                      {officeHours.map((day) => (
                        <div key={day.day} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-academic-slate-200 rounded-lg">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-primary-navy">{day.day}</span>
                            <Badge 
                              className={`text-xs ${day.type === 'In-person' ? 'bg-primary-navy text-white' : 'border border-academic-slate-300 text-academic-slate-600'}`}
                            >
                              {day.type}
                            </Badge>
                          </div>
                          <span className="text-sm font-medium text-academic-slate-900">{day.time}</span>
                          <span className="text-xs text-academic-slate-600">{day.location}</span>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-academic-slate-200">
                        <p className="text-sm text-academic-slate-600 mb-3">
                          Need to meet outside these hours? Please use the contact form to request a special appointment.
                        </p>
                        <Button className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white transition-colors">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Schedule Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Quick Contact Info */}
              <ScrollReveal>
                <Card className="bg-gradient-to-r from-primary-navy/5 to-academic-green/5 border-primary-navy/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary-navy font-serif flex items-center">
                      <UsersIcon className="w-5 h-5 mr-2" />
                      Quick Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-academic-slate-900 mb-1">Direct Email</p>
                      <p className="text-sm text-primary-navy">{personalInfo.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-academic-slate-900 mb-1">Office Phone</p>
                      <p className="text-sm text-primary-navy">{personalInfo.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-academic-slate-900 mb-1">Mailing Address</p>
                      <div className="text-sm text-academic-slate-600">
                        <p>Department of Psychology</p>
                        <p>University of California, Berkeley</p>
                        <p>Berkeley, CA 94720-1650</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Response Time Info */}
              <ScrollReveal>
                <Card className="bg-white/90 border-academic-slate-200 backdrop-blur-sm shadow-academic">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary-navy font-serif">Response Times</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-600">Academic Inquiries</span>
                      <Badge className="bg-academic-green text-white">24-48 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-600">Media Requests</span>
                      <Badge className="bg-orange-100 text-orange-700">Same day</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-600">Student Questions</span>
                      <Badge className="bg-primary-navy text-white">1-2 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-academic-slate-600">Collaboration</span>
                      <Badge className="bg-academic-slate-100 text-academic-slate-700">2-3 days</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Emergency Contact */}
              <ScrollReveal>
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-700 font-serif">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-600 mb-3">
                      For urgent academic matters or time-sensitive research opportunities:
                    </p>
                    <p className="text-sm font-medium text-red-700">
                      {personalInfo.phone}
                    </p>
                    <p className="text-xs text-red-500 mt-2">
                      Please use sparingly and only for genuine emergencies.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
} 