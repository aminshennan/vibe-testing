// Environment variables for analytics
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Declare gtag function type
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (IS_PRODUCTION && GA_MEASUREMENT_ID && typeof window !== 'undefined') {
    // Load gtag script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll send manually for better control
    })
  }
}

// Page view tracking
export const pageview = (url: string, title?: string) => {
  if (IS_PRODUCTION && typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    })
  }
}

// Custom event tracking for academic content
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

export const trackEvent = ({ action, category, label, value, custom_parameters }: AnalyticsEvent) => {
  if (IS_PRODUCTION && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    })
  }
}

// Academic-specific tracking functions
export const academicTracking = {
  // Research project interactions
  viewResearchProject: (projectId: string, projectTitle: string) => {
    trackEvent({
      action: 'view_research_project',
      category: 'Academic_Content',
      label: projectTitle,
      custom_parameters: {
        project_id: projectId,
        content_type: 'research_project',
      }
    })
  },

  // Publication interactions
  viewPublication: (publicationId: string, publicationTitle: string) => {
    trackEvent({
      action: 'view_publication',
      category: 'Academic_Content',
      label: publicationTitle,
      custom_parameters: {
        publication_id: publicationId,
        content_type: 'publication',
      }
    })
  },

  // Search interactions
  performSearch: (searchQuery: string, resultsCount: number) => {
    trackEvent({
      action: 'search',
      category: 'User_Interaction',
      label: searchQuery,
      value: resultsCount,
      custom_parameters: {
        search_type: 'academic_content',
      }
    })
  },

  // Contact form interactions
  contactFormSubmission: (inquiryType: string, success: boolean) => {
    trackEvent({
      action: success ? 'contact_form_success' : 'contact_form_error',
      category: 'Lead_Generation',
      label: inquiryType,
      custom_parameters: {
        form_type: 'enhanced_contact_form',
      }
    })
  },

  // Research filter usage
  useResearchFilter: (filterType: string, filterValue: string) => {
    trackEvent({
      action: 'use_research_filter',
      category: 'User_Interaction',
      label: `${filterType}: ${filterValue}`,
      custom_parameters: {
        filter_type: filterType,
        filter_value: filterValue,
      }
    })
  },

  // Visualization interactions
  viewVisualization: (visualizationType: string, tabName: string) => {
    trackEvent({
      action: 'view_visualization',
      category: 'Academic_Content',
      label: `${visualizationType} - ${tabName}`,
      custom_parameters: {
        visualization_type: visualizationType,
        tab_name: tabName,
      }
    })
  },

  // Social media and external link clicks
  clickExternalLink: (linkType: string, destination: string) => {
    trackEvent({
      action: 'click_external_link',
      category: 'Outbound_Links',
      label: destination,
      custom_parameters: {
        link_type: linkType, // 'orcid', 'google_scholar', 'researchgate', etc.
      }
    })
  },

  // PDF downloads and file interactions
  downloadFile: (fileName: string, fileType: string) => {
    trackEvent({
      action: 'download_file',
      category: 'File_Downloads',
      label: fileName,
      custom_parameters: {
        file_type: fileType,
      }
    })
  },

  // Performance and engagement metrics
  timeOnPage: (pageName: string, timeSpent: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'Engagement',
      label: pageName,
      value: Math.round(timeSpent / 1000), // Convert to seconds
      custom_parameters: {
        engagement_type: 'time_spent',
      }
    })
  },

  // Academic collaboration inquiries
  collaborationInquiry: (collaborationType: string, source: string) => {
    trackEvent({
      action: 'collaboration_inquiry',
      category: 'Lead_Generation',
      label: collaborationType,
      custom_parameters: {
        inquiry_source: source,
        lead_quality: 'high', // Academic collaborations are high-quality leads
      }
    })
  },
}

// Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  if (IS_PRODUCTION && typeof window !== 'undefined') {
    trackEvent({
      action: 'web_vitals',
      category: 'Performance',
      label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameters: {
        metric_name: metric.name,
        metric_id: metric.id,
        metric_rating: metric.rating,
      }
    })
  }
}

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  if (IS_PRODUCTION && typeof window !== 'undefined') {
    trackEvent({
      action: 'javascript_error',
      category: 'Error',
      label: error.message,
      custom_parameters: {
        error_name: error.name,
        error_stack: error.stack?.substring(0, 150), // Limit stack trace length
        error_info: errorInfo ? JSON.stringify(errorInfo).substring(0, 150) : undefined,
      }
    })
  }
}

// Enhanced e-commerce tracking for academic content
export const academicEcommerce = {
  // Track "purchase" of academic content (viewing papers, research projects)
  viewAcademicContent: (contentId: string, contentType: string, contentTitle: string) => {
    if (IS_PRODUCTION && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: `academic_${contentId}_${Date.now()}`,
        value: 1, // Symbolic value for content consumption
        currency: 'USD',
        items: [{
          item_id: contentId,
          item_name: contentTitle,
          category: contentType,
          quantity: 1,
          price: 1,
        }]
      })
    }
  },
}

const analytics = {
  initGA,
  pageview,
  trackEvent,
  academicTracking,
  trackWebVitals,
  trackError,
  academicEcommerce,
}

export default analytics 