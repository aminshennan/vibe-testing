"use client"

import { useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SendIcon, 
  UserIcon, 
  MailIcon, 
  BookOpenIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  LoaderIcon,
  AlertCircleIcon,
  ClockIcon,
  PhoneIcon
} from 'lucide-react'

// Contact form schema with academic validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  institution: z.string().optional(),
  phone: z.string().optional(),
  inquiryType: z.enum([
    'research-collaboration',
    'student-inquiry',
    'media-interview',
    'speaking-engagement',
    'publication-request',
    'academic-consultation',
    'general-question'
  ], {
    required_error: 'Please select an inquiry type'
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  preferredResponse: z.enum(['email', 'phone', 'video-call']),
  timeline: z.enum(['immediate', 'within-week', 'within-month', 'flexible']).optional(),
  consentToContact: z.boolean().refine(val => val === true, 'You must consent to be contacted')
})

type ContactFormData = z.infer<typeof contactSchema>

const inquiryTypes = [
  {
    value: 'research-collaboration',
    label: 'Research Collaboration',
    icon: BookOpenIcon,
    description: 'Joint research projects or academic partnerships'
  },
  {
    value: 'student-inquiry',
    label: 'Student Inquiry',
    icon: GraduationCapIcon,
    description: 'Questions about courses, supervision, or programs'
  },
  {
    value: 'media-interview',
    label: 'Media Interview',
    icon: MessageSquareIcon,
    description: 'Press interviews or media appearances'
  },
  {
    value: 'speaking-engagement',
    label: 'Speaking Engagement',
    icon: BriefcaseIcon,
    description: 'Conference presentations or guest lectures'
  },
  {
    value: 'publication-request',
    label: 'Publication Request',
    icon: BookOpenIcon,
    description: 'Access to papers or publication permissions'
  },
  {
    value: 'academic-consultation',
    label: 'Academic Consultation',
    icon: UserIcon,
    description: 'Professional consultation services'
  },
  {
    value: 'general-question',
    label: 'General Question',
    icon: MessageSquareIcon,
    description: 'Other inquiries or general questions'
  }
]

const priorityLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-academic-slate-100 text-academic-slate-700' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-academic-green/10 text-academic-green' },
  { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-700' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700' }
]

interface AcademicContactFormProps {
  onSubmissionSuccess?: () => void
}

export function AcademicContactForm({ onSubmissionSuccess }: AcademicContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      priority: 'medium',
      preferredResponse: 'email',
      timeline: 'flexible',
      consentToContact: false
    }
  })

  const watchedInquiryType = watch('inquiryType')
  const _watchedPriority = watch('priority')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store in localStorage for offline support
      const submissions = JSON.parse(localStorage.getItem('contact-submissions') || '[]')
      const newSubmission = {
        ...data,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      submissions.push(newSubmission)
      localStorage.setItem('contact-submissions', JSON.stringify(submissions))
      
      setSubmissionStatus('success')
      toast.success('📧 Message sent successfully!', {
        description: 'Dr. Mitchell will respond within 24-48 hours.',
        action: {
          label: 'View Details',
          onClick: () => console.log('View submission details')
        }
      })
      
      reset()
      onSubmissionSuccess?.()
      
      // Reset to initial state after success
      setTimeout(() => {
        setSubmissionStatus('idle')
        setCurrentStep(1)
      }, 3000)
      
    } catch {
      setSubmissionStatus('error')
      toast.error('❌ Failed to send message', {
        description: 'Please try again or contact us directly.'
      })
      
      setTimeout(() => {
        setSubmissionStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedInquiryType = () => {
    return inquiryTypes.find(type => type.value === watchedInquiryType)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-academic-slate-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-primary-navy flex items-center justify-center gap-2">
          <MailIcon className="w-6 h-6" />
          Contact Dr. Mitchell
        </CardTitle>
        <CardDescription className="text-lg">
          Get in touch for research collaborations, academic inquiries, or general questions.
        </CardDescription>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-primary-navy' : 'bg-academic-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {submissionStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8"
            >
              <CheckCircleIcon className="w-16 h-16 text-academic-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-navy mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-academic-slate-600 mb-4">
                Thank you for reaching out. Dr. Mitchell will review your message and respond within 24-48 hours.
              </p>
              <Badge className="bg-academic-green text-white">
                Expected Response: 24-48 hours
              </Badge>
            </motion.div>
          )}

          {submissionStatus === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8"
            >
              <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Submission Failed
              </h3>
              <p className="text-academic-slate-600 mb-4">
                There was an error sending your message. Please try again or contact us directly.
              </p>
              <Button 
                onClick={() => setSubmissionStatus('idle')}
                variant="outline"
              >
                Try Again
              </Button>
            </motion.div>
          )}

          {submissionStatus === 'idle' && (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-primary-navy mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution" className="flex items-center gap-2">
                        <GraduationCapIcon className="w-4 h-4" />
                        Institution (Optional)
                      </Label>
                      <Input
                        id="institution"
                        {...register('institution')}
                        placeholder="University or Organization"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4" />
                        Phone (Optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-primary-navy hover:bg-primary-navy/90"
                    >
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Inquiry Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-primary-navy mb-4">
                    Inquiry Details
                  </h3>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MessageSquareIcon className="w-4 h-4" />
                      Type of Inquiry *
                    </Label>
                    <Select onValueChange={(value) => setValue('inquiryType', value as any)}>
                      <SelectTrigger className={errors.inquiryType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-xs text-academic-slate-600">
                                    {type.description}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    {errors.inquiryType && (
                      <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
                    )}
                  </div>

                  {getSelectedInquiryType() && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-academic-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-primary-navy">
                        {React.createElement(getSelectedInquiryType()!.icon, { className: "w-4 h-4" })}
                        <span className="font-medium">{getSelectedInquiryType()!.label}</span>
                      </div>
                      <p className="text-sm text-academic-slate-600 mt-1">
                        {getSelectedInquiryType()!.description}
                      </p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <AlertCircleIcon className="w-4 h-4" />
                        Priority Level
                      </Label>
                      <Select 
                        defaultValue="medium"
                        onValueChange={(value) => setValue('priority', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div className="flex items-center gap-2">
                                <Badge className={level.color}>
                                  {level.label}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        Response Timeline
                      </Label>
                      <Select 
                        defaultValue="flexible"
                        onValueChange={(value) => setValue('timeline', value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (Urgent)</SelectItem>
                          <SelectItem value="within-week">Within a week</SelectItem>
                          <SelectItem value="within-month">Within a month</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-primary-navy hover:bg-primary-navy/90"
                    >
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Message */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-primary-navy mb-4">
                    Your Message
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="Brief subject line"
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Response Method</Label>
                    <Select 
                      defaultValue="email"
                      onValueChange={(value) => setValue('preferredResponse', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Response</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="video-call">Video Call (Zoom/Teams)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="consent"
                        {...register('consentToContact')}
                        className="rounded border-academic-slate-300"
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I consent to being contacted regarding this inquiry *
                      </Label>
                    </div>
                    {errors.consentToContact && (
                      <p className="text-sm text-red-500">{errors.consentToContact.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="bg-primary-navy hover:bg-primary-navy/90"
                    >
                      {isSubmitting ? (
                        <>
                          <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendIcon className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
} 