import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Enhanced Academic Badge Variants
        "academic-primary": "border-transparent bg-primary-navy text-white hover:bg-primary-navy-dark transition-all duration-fast",
        "academic-secondary": "border-primary-navy bg-primary-navy/10 text-primary-navy hover:bg-primary-navy/20 transition-all duration-fast",
        "academic-success": "border-transparent bg-semantic-success text-white hover:bg-semantic-success-dark transition-all duration-fast",
        "academic-warning": "border-transparent bg-semantic-warning text-white hover:bg-accent-gold-light transition-all duration-fast",
        "academic-error": "border-transparent bg-semantic-error text-white hover:bg-red-700 transition-all duration-fast",
        "academic-info": "border-transparent bg-semantic-info text-white hover:bg-semantic-info-dark transition-all duration-fast",
        // Research-specific badges
        "research-active": "border-transparent bg-academic-green text-white hover:bg-academic-green-dark transition-all duration-fast",
        "research-completed": "border-transparent bg-academic-slate-600 text-white hover:bg-academic-slate-700 transition-all duration-fast",
        "research-pending": "border-transparent bg-accent-gold text-white hover:bg-accent-gold-light transition-all duration-fast",
        // Publication status badges
        "published": "border-transparent bg-semantic-success text-white hover:bg-semantic-success-dark transition-all duration-fast",
        "under-review": "border-transparent bg-accent-gold text-white hover:bg-accent-gold-light transition-all duration-fast",
        "in-progress": "border-transparent bg-semantic-info text-white hover:bg-semantic-info-dark transition-all duration-fast",
        "peer-reviewed": "border-transparent bg-primary-navy text-white hover:bg-primary-navy-dark transition-all duration-fast",
        // Teaching level badges
        "undergraduate": "border-transparent bg-academic-slate-500 text-white hover:bg-academic-slate-600 transition-all duration-fast",
        "graduate": "border-transparent bg-primary-navy text-white hover:bg-primary-navy-dark transition-all duration-fast",
        "phd": "border-transparent bg-accent-burgundy text-white hover:bg-accent-burgundy-light transition-all duration-fast",
        // Academic field badges
        "field-primary": "border-primary-navy bg-primary-navy/10 text-primary-navy hover:bg-primary-navy/20 transition-all duration-fast",
        "field-secondary": "border-academic-green bg-academic-green/10 text-academic-green hover:bg-academic-green/20 transition-all duration-fast",
        "field-tertiary": "border-accent-gold bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 transition-all duration-fast",
        // Status badges with subtle styling
        "status-new": "border-transparent bg-semantic-success/20 text-semantic-success font-medium hover:bg-semantic-success/30 transition-all duration-fast",
        "status-updated": "border-transparent bg-semantic-info/20 text-semantic-info font-medium hover:bg-semantic-info/30 transition-all duration-fast",
        "status-featured": "border-transparent bg-accent-gold/20 text-accent-gold font-medium hover:bg-accent-gold/30 transition-all duration-fast",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs rounded-md",
        lg: "px-3 py-1 text-sm rounded-lg",
        xl: "px-4 py-1.5 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

// Academic-specific badge components for common use cases
const ResearchStatusBadge = ({ status, className, ...props }: { status: "active" | "completed" | "pending" } & Omit<BadgeProps, "variant">) => {
  const variantMap = {
    active: "research-active",
    completed: "research-completed", 
    pending: "research-pending",
  } as const

  return <Badge variant={variantMap[status]} className={className} {...props} />
}

const PublicationStatusBadge = ({ status, className, ...props }: { status: "published" | "under-review" | "in-progress" | "peer-reviewed" } & Omit<BadgeProps, "variant">) => {
  const variantMap = {
    published: "published",
    "under-review": "under-review",
    "in-progress": "in-progress",
    "peer-reviewed": "peer-reviewed",
  } as const

  return <Badge variant={variantMap[status]} className={className} {...props} />
}

const TeachingLevelBadge = ({ level, className, ...props }: { level: "undergraduate" | "graduate" | "phd" } & Omit<BadgeProps, "variant">) => {
  const variantMap = {
    undergraduate: "undergraduate",
    graduate: "graduate",
    phd: "phd",
  } as const

  return <Badge variant={variantMap[level]} className={className} {...props} />
}

const AcademicFieldBadge = ({ priority = "primary", className, ...props }: { priority?: "primary" | "secondary" | "tertiary" } & Omit<BadgeProps, "variant">) => {
  const variantMap = {
    primary: "field-primary",
    secondary: "field-secondary",
    tertiary: "field-tertiary",
  } as const

  return <Badge variant={variantMap[priority]} className={className} {...props} />
}

export { 
  Badge, 
  badgeVariants,
  ResearchStatusBadge,
  PublicationStatusBadge,
  TeachingLevelBadge,
  AcademicFieldBadge
}
