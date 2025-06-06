import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        // Enhanced Academic Card Variants
        "academic": 
          "bg-white border-academic-slate-200 rounded-lg shadow-academic-subtle transition-all duration-normal hover:shadow-academic hover:border-academic-slate-300 hover:-translate-y-0.5",
        "academic-interactive": 
          "bg-white border-academic-slate-200 rounded-lg shadow-academic-subtle transition-all duration-normal hover:shadow-academic hover:border-academic-slate-300 hover:-translate-y-0.5 cursor-pointer focus-visible:academic-focus will-change-transform",
        "academic-research": 
          "bg-white border-academic-slate-200 rounded-xl shadow-academic-subtle transition-all duration-normal hover:shadow-academic-professional hover:border-primary-navy hover:-translate-y-1 relative overflow-hidden",
        "academic-publication": 
          "bg-white border-l-4 border-l-academic-slate-200 rounded-r-lg shadow-academic-subtle transition-all duration-normal hover:border-l-primary-navy hover:bg-academic-slate-50 hover:shadow-academic",
        "academic-feature": 
          "bg-gradient-to-br from-primary-navy/5 to-academic-green/5 border-primary-navy/20 rounded-xl shadow-academic transition-all duration-normal hover:shadow-academic-professional hover:-translate-y-1",
        "academic-stat": 
          "bg-academic-slate-50 border-transparent rounded-lg transition-all duration-normal hover:bg-white hover:shadow-academic hover:-translate-y-0.5 text-center",
        "academic-testimonial": 
          "bg-white border-academic-slate-200 rounded-lg shadow-academic-subtle transition-all duration-normal hover:shadow-academic relative before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-primary-navy before:to-academic-green before:rounded-l-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        // Academic padding variants
        "academic-sm": "p-4",
        "academic-md": "p-6", 
        "academic-lg": "p-8",
        "academic-xl": "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants> & {
    interactive?: boolean
  }
>(({ className, variant, padding, interactive, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({ variant, padding }),
      interactive && "academic-card-interactive",
      className
    )}
    role={interactive ? "button" : undefined}
    tabIndex={interactive ? 0 : undefined}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "md" | "lg"
  }
>(({ className, spacing = "md", ...props }, ref) => {
  const spacingClass = {
    sm: "space-y-1 pb-2",
    md: "space-y-1.5 pb-4", 
    lg: "space-y-2 pb-6",
  }[spacing]

  return (
  <div
    ref={ref}
      className={cn("flex flex-col", spacingClass, className)}
    {...props}
  />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    variant?: "default" | "academic" | "academic-large" | "academic-small"
  }
>(({ className, as: Comp = "h3", variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "text-2xl font-semibold leading-none tracking-tight",
    academic: "text-xl font-semibold text-primary-navy leading-tight",
    "academic-large": "text-2xl font-bold text-primary-navy leading-tight font-serif",
    "academic-small": "text-lg font-semibold text-primary-navy leading-tight",
  }

  return (
    <Comp
    ref={ref}
      className={cn(variantClasses[variant], className)}
    {...props}
  />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: "default" | "academic" | "muted"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "text-sm text-muted-foreground",
    academic: "text-sm text-academic-slate-600 leading-relaxed",
    muted: "text-xs text-academic-slate-500 uppercase tracking-wide font-medium",
  }

  return (
    <p
    ref={ref}
      className={cn(variantClasses[variant], className)}
    {...props}
  />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "none" | "sm" | "md" | "lg"
  }
>(({ className, spacing = "md", ...props }, ref) => {
  const spacingClass = {
    none: "",
    sm: "pt-2",
    md: "pt-4",
    lg: "pt-6",
  }[spacing]

  return (
    <div ref={ref} className={cn(spacingClass, className)} {...props} />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "md" | "lg"
    variant?: "default" | "academic" | "bordered"
  }
>(({ className, spacing = "md", variant = "default", ...props }, ref) => {
  const spacingClass = {
    sm: "pt-2",
    md: "pt-4",
    lg: "pt-6",
  }[spacing]

  const variantClasses = {
    default: "flex items-center",
    academic: "flex items-center gap-3",
    bordered: "flex items-center border-t border-academic-slate-100 pt-4 mt-4",
  }

  return (
  <div
    ref={ref}
      className={cn(spacingClass, variantClasses[variant], className)}
    {...props}
  />
  )
})
CardFooter.displayName = "CardFooter"

// Academic-specific card components
const AcademicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "research" | "publication" | "teaching" | "default"
    interactive?: boolean
  }
>(({ className, type = "default", interactive = false, ...props }, ref) => {
  const typeVariants = {
    research: "academic-research",
    publication: "academic-publication", 
    teaching: "academic",
    default: "academic",
  } as const

  return (
    <Card
      ref={ref}
      variant={typeVariants[type]}
      interactive={interactive}
      className={className}
      {...props}
    />
  )
})
AcademicCard.displayName = "AcademicCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  AcademicCard,
  cardVariants
}
