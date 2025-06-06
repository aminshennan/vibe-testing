'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function AcademicCardSkeleton() {
  return (
    <Card className="academic-card">
      <CardHeader className="pb-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 bg-academic-slate-200" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-16 bg-academic-slate-200 rounded-full" />
            <Skeleton className="h-4 w-20 bg-academic-slate-200" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-academic-slate-200" />
          <Skeleton className="h-4 w-5/6 bg-academic-slate-200" />
          <Skeleton className="h-4 w-4/6 bg-academic-slate-200" />
        </div>
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-6 w-16 bg-academic-slate-200 rounded-full" />
          <Skeleton className="h-6 w-20 bg-academic-slate-200 rounded-full" />
          <Skeleton className="h-6 w-14 bg-academic-slate-200 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export function AcademicPageSkeleton() {
  return (
    <div className="academic-container space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2 bg-academic-slate-200" />
        <Skeleton className="h-6 w-3/4 bg-academic-slate-200" />
      </div>
      
      <div className="academic-grid-3-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <AcademicCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function AcademicStatsSkeleton() {
  return (
    <div className="academic-stats-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="academic-stat-item">
          <Skeleton className="h-8 w-16 mx-auto mb-2 bg-academic-slate-200" />
          <Skeleton className="h-4 w-20 mx-auto bg-academic-slate-200" />
        </div>
      ))}
    </div>
  )
}

export function AcademicPublicationSkeleton() {
  return (
    <div className="academic-publication-item">
      <div className="space-y-3">
        <Skeleton className="h-6 w-4/5 bg-academic-slate-200" />
        <Skeleton className="h-4 w-full bg-academic-slate-200" />
        <Skeleton className="h-4 w-3/4 bg-academic-slate-200" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-5 w-20 bg-academic-slate-200 rounded-full" />
          <Skeleton className="h-5 w-16 bg-academic-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function AcademicSpinner() {
  return (
    <div className="flex justify-center">
      <div className="w-8 h-8 border-2 border-academic-slate-200 border-t-primary-navy rounded-full animate-spin" />
    </div>
  )
}

export function AcademicListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-3/4 bg-academic-slate-200" />
          <Skeleton className="h-4 w-full bg-academic-slate-200" />
          <Skeleton className="h-4 w-2/3 bg-academic-slate-200" />
        </div>
      ))}
    </div>
  )
} 
 