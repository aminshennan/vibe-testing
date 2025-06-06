"use client"

import React from 'react'
import { trackError } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error
  errorInfo: React.ErrorInfo | null
  resetError: () => void
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track error for analytics
    trackError(error, errorInfo)
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.groupEnd()
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      
      return (
        <FallbackComponent
          error={this.state.error!}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

// Default error fallback component with academic styling
function DefaultErrorFallback({ error, errorInfo, resetError }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  return (
    <div className="min-h-screen bg-academic-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-lg border-red-200">
        <CardHeader className="text-center border-b border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-800">
            Something went wrong
          </CardTitle>
          <p className="text-academic-slate-600 mt-2">
            We apologize for the inconvenience. An unexpected error has occurred in the academic portfolio.
          </p>
        </CardHeader>
        
        <CardContent className="pt-6">
          {isDevelopment && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Development Error Details:</h3>
              <div className="text-sm text-red-700 space-y-2">
                <div>
                  <strong>Error:</strong> {error.message}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                      {error.stack}
                    </pre>
                  </div>
                )}
                {errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetError}
              className="bg-primary-navy hover:bg-primary-navy-dark text-white"
            >
              <RefreshCwIcon className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-academic-slate-200 text-center">
            <p className="text-sm text-academic-slate-500">
              If this problem persists, please contact{' '}
              <a 
                href="mailto:s.mitchell@berkeley.edu" 
                className="text-primary-navy hover:underline"
              >
                s.mitchell@berkeley.edu
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Academic-specific error fallback
export function AcademicErrorFallback({ error: _error, errorInfo: _errorInfo, resetError }: ErrorFallbackProps) {
  return (
    <div className="bg-white border border-academic-slate-200 rounded-lg p-6 m-4">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangleIcon className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-semibold text-primary-navy">
          Academic Content Error
        </h2>
      </div>
      
      <p className="text-academic-slate-600 mb-4">
        Unable to load this academic content. This may be due to a temporary issue with the data source.
      </p>
      
      <div className="flex gap-3">
        <Button
          size="sm"
          onClick={resetError}
          className="bg-primary-navy hover:bg-primary-navy-dark text-white"
        >
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Retry
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
          className="border-academic-slate-300"
        >
          Refresh Page
        </Button>
      </div>
    </div>
  )
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Hook for error reporting from components
export function useErrorHandler() {
  return React.useCallback((error: Error, errorInfo?: any) => {
    trackError(error, errorInfo)
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Component Error:', error, errorInfo)
    }
  }, [])
}

export default ErrorBoundary 