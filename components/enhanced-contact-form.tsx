"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  MailIcon, 
  SendIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  UserIcon,
  GraduationCapIcon,
  FlaskConicalIcon,
  UsersIcon,
  BookOpenIcon,
  CalendarIcon,
  LoaderIcon
} from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  institution: string
  role: string
  inquiryType: string
  subject: string
  message: string
  urgency: string
  preferredContact: string
  newsletter: boolean
}

interface FormErrors {
  [key: string]: string
}

interface EnhancedContactFormProps {
  className?: string
}

export function EnhancedContactForm({ className = '' }: EnhancedContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    institution: '',
    role: '',
    inquiryType: '',
    subject: '',
    message: '',
    urgency: 'normal',
    preferredContact: 'email',
    newsletter: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inquiryTypes = [
    { value: 'collaboration', label: 'Research Collaboration', icon: FlaskConicalIcon, color: 'bg-primary-navy' },
    { value: 'student-inquiry', label: 'Student Inquiry', icon: GraduationCapIcon, color: 'bg-academic-green' },
    { value: 'speaking', label: 'Speaking Engagement', icon: UserIcon, color: 'bg-accent-burgundy' },
    { value: 'mentorship', label: 'Mentorship Request', icon: UsersIcon, color: 'bg-academic-slate-600' },
    { value: 'media', label: 'Media Interview', icon: MailIcon, color: 'bg-purple-600' },
    { value: 'course', label: 'Course Information', icon: BookOpenIcon, color: 'bg-blue-600' },
    { value: 'appointment', label: 'Appointment Request', icon: CalendarIcon, color: 'bg-orange-600' },
    { value: 'other', label: 'Other', icon: MailIcon, color: 'bg-academic-slate-400' }
  ]

  const roles = [
    'Student (Undergraduate)',
    'Student (Graduate)',
    'Student (PhD)',
    'Faculty Member',
    'Researcher',
    'Industry Professional',
    'Journalist/Media',
    'Parent/Guardian',
    'Other'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide a more detailed message (at least 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error state
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${className}`}
      >
        <Card className="bg-white border-academic-green/20 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-academic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="w-8 h-8 text-academic-green" />
            </div>
            <h3 className="text-xl font-bold text-primary-navy mb-2">Message Sent Successfully!</h3>
            <p className="text-academic-slate-600 mb-4">
              Thank you for your inquiry. I typically respond within 24-48 hours during business days.
            </p>
            <div className="space-y-2 text-sm text-academic-slate-500">
              <p>• Check your email for a confirmation message</p>
              <p>• Urgent matters will be prioritized</p>
              <p>• You can expect a personalized response soon</p>
            </div>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: '',
                  email: '',
                  institution: '',
                  role: '',
                  inquiryType: '',
                  subject: '',
                  message: '',
                  urgency: 'normal',
                  preferredContact: 'email',
                  newsletter: false
                })
              }}
              variant="outline"
              className="mt-6"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className={`${className}`}>
      <Card className="bg-white/95 backdrop-blur-sm border-academic-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary-navy font-serif flex items-center">
            <MailIcon className="w-5 h-5 mr-2" />
            Contact Dr. Mitchell
          </CardTitle>
          <p className="text-academic-slate-600">
            Please provide details about your inquiry. All fields marked with * are required.
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-academic-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`mt-1 ${errors.name ? 'border-red-500' : 'border-academic-slate-300'}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-academic-slate-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`mt-1 ${errors.email ? 'border-red-500' : 'border-academic-slate-300'}`}
                  placeholder="your.email@university.edu"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institution" className="text-sm font-medium text-academic-slate-700">
                  Institution/Organization
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="mt-1 border-academic-slate-300"
                  placeholder="University or organization"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-sm font-medium text-academic-slate-700">
                  Your Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger className="mt-1 border-academic-slate-300">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Inquiry Type */}
            <div>
              <Label className="text-sm font-medium text-academic-slate-700 mb-3 block">
                Inquiry Type *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {inquiryTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = formData.inquiryType === type.value
                  
                  return (
                    <motion.button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('inquiryType', type.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-navy bg-primary-navy/5'
                          : 'border-academic-slate-200 hover:border-primary-navy/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full ${type.color} flex items-center justify-center mb-2`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-academic-slate-700">
                          {type.label}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
              {errors.inquiryType && (
                <p className="mt-2 text-xs text-red-600 flex items-center">
                  <AlertCircleIcon className="w-3 h-3 mr-1" />
                  {errors.inquiryType}
                </p>
              )}
            </div>

            {/* Subject and Message */}
            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-academic-slate-700">
                Subject *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`mt-1 ${errors.subject ? 'border-red-500' : 'border-academic-slate-300'}`}
                placeholder="Brief subject line"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircleIcon className="w-3 h-3 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-academic-slate-700">
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`mt-1 min-h-[120px] ${errors.message ? 'border-red-500' : 'border-academic-slate-300'}`}
                placeholder="Please provide detailed information about your inquiry..."
              />
              <p className="mt-1 text-xs text-academic-slate-500">
                {formData.message.length} characters (minimum 20 required)
              </p>
              {errors.message && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <AlertCircleIcon className="w-3 h-3 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-academic-slate-700">
                  Priority Level
                </Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                  <SelectTrigger className="mt-1 border-academic-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General inquiry</SelectItem>
                    <SelectItem value="normal">Normal - Standard response</SelectItem>
                    <SelectItem value="high">High - Time-sensitive</SelectItem>
                    <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-academic-slate-700">
                  Preferred Contact Method
                </Label>
                <Select value={formData.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                  <SelectTrigger className="mt-1 border-academic-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone call</SelectItem>
                    <SelectItem value="video">Video meeting</SelectItem>
                    <SelectItem value="in-person">In-person meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
              />
              <Label htmlFor="newsletter" className="text-sm text-academic-slate-700">
                Subscribe to research updates and newsletter
              </Label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-navy hover:bg-primary-navy-dark text-white py-3 text-sm font-medium"
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 