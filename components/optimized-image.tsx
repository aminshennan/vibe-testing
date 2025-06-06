"use client"

import { useState, useCallback } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  showLoadingPlaceholder?: boolean
  containerClassName?: string
  priority?: boolean
  academic?: boolean
  citation?: string
  onLoadComplete?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder-academic.jpg',
  showLoadingPlaceholder = true,
  containerClassName,
  className,
  priority = false,
  academic = false,
  citation,
  onLoadComplete,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoadComplete?.()
  }, [onLoadComplete])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
    setImageSrc(fallbackSrc)
    onError?.()
  }, [fallbackSrc, onError])

  const generateBlurDataURL = (width: number = 10, height: number = 10) => {
    // Generate a simple blur placeholder
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    
    if (ctx) {
      // Academic color scheme for blur placeholder
      ctx.fillStyle = academic ? '#1e3a8a' : '#f1f5f9'
      ctx.fillRect(0, 0, width, height)
    }
    
    return canvas.toDataURL()
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Loading Placeholder */}
      {isLoading && showLoadingPlaceholder && (
        <div className="absolute inset-0 bg-academic-slate-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Main Image */}
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          academic && 'border border-academic-slate-200 rounded-lg shadow-sm',
          className
        )}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        quality={academic ? 90 : 75} // Higher quality for academic images
        {...props}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-academic-slate-50 flex flex-col items-center justify-center text-academic-slate-400">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">Image not available</span>
        </div>
      )}

      {/* Academic Citation */}
      {academic && citation && !isLoading && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-white text-xs leading-relaxed">
            {citation}
          </p>
        </div>
      )}
    </div>
  )
}

// Specialized components for academic content
export function ResearchImage({
  src,
  alt,
  projectTitle,
  caption,
  className,
  ...props
}: OptimizedImageProps & {
  projectTitle?: string
  caption?: string
}) {
  const academicAlt = projectTitle 
    ? `Research visualization for ${projectTitle}: ${alt}`
    : `Research image: ${alt}`

  return (
    <figure className="space-y-2">
      <OptimizedImage
        src={src}
        alt={academicAlt}
        academic
        className={cn('w-full h-auto', className)}
        priority={false}
        {...props}
      />
      {caption && (
        <figcaption className="text-sm text-academic-slate-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function ProfileImage({
  src,
  alt = "Dr. Sarah Mitchell",
  size = 'md',
  className,
  ...props
}: OptimizedImageProps & {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      academic
      className={cn(
        'rounded-full object-cover border-2 border-primary-navy/20',
        sizeClasses[size],
        className
      )}
      priority={size === 'lg' || size === 'xl'}
      {...props}
    />
  )
}

export function PublicationThumbnail({
  src,
  alt,
  title,
  journal,
  className,
  ...props
}: OptimizedImageProps & {
  title?: string
  journal?: string
}) {
  const academicAlt = title 
    ? `Publication thumbnail for "${title}" in ${journal || 'academic journal'}`
    : `Publication thumbnail: ${alt}`

  return (
    <OptimizedImage
      src={src}
      alt={academicAlt}
      academic
      className={cn('w-full h-32 object-cover rounded-lg', className)}
      priority={false}
      sizes="(max-width: 768px) 100vw, 300px"
      {...props}
    />
  )
}

// Performance-optimized lazy loading component
export function LazyAcademicImage({
  src,
  alt,
  threshold = 0.1,
  rootMargin = '50px',
  className,
  ...props
}: OptimizedImageProps & {
  threshold?: number
  rootMargin?: string
}) {
  const [shouldLoad, setShouldLoad] = useState(false)

  // Intersection Observer for lazy loading
  const imageRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={imageRef} className={cn('relative', className)}>
      {shouldLoad ? (
        <OptimizedImage
          src={src}
          alt={alt}
          academic
          {...props}
        />
      ) : (
        <div className="w-full h-64 bg-academic-slate-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-academic-slate-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  )
} 