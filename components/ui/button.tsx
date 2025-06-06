import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Enhanced Academic Button Variants
        "academic-primary": 
          "bg-primary-navy text-white border-2 border-primary-navy font-semibold transition-all duration-normal hover:bg-primary-navy-dark hover:border-primary-navy-dark hover:shadow-academic hover:-translate-y-0.5 active:translate-y-0 focus-visible:academic-focus will-change-transform",
        "academic-secondary": 
          "bg-transparent text-primary-navy border-2 border-primary-navy font-semibold transition-all duration-normal hover:bg-primary-navy hover:text-white hover:shadow-academic hover:-translate-y-0.5 active:translate-y-0 focus-visible:academic-focus will-change-transform",
        "academic-ghost": 
          "bg-transparent text-academic-slate-600 border border-transparent font-medium transition-all duration-normal hover:bg-academic-slate-100 hover:text-academic-slate-700 focus-visible:academic-focus",
        "academic-success": 
          "bg-semantic-success text-white border-2 border-semantic-success font-semibold transition-all duration-normal hover:bg-semantic-success-dark hover:shadow-academic hover:-translate-y-0.5 active:translate-y-0 focus-visible:academic-focus will-change-transform",
        "academic-warning": 
          "bg-semantic-warning text-white border-2 border-semantic-warning font-semibold transition-all duration-normal hover:bg-accent-gold-light hover:shadow-academic hover:-translate-y-0.5 active:translate-y-0 focus-visible:academic-focus will-change-transform",
        "academic-error": 
          "bg-semantic-error text-white border-2 border-semantic-error font-semibold transition-all duration-normal hover:bg-red-700 hover:shadow-academic hover:-translate-y-0.5 active:translate-y-0 focus-visible:academic-focus will-change-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Academic size variants
        "academic-sm": "h-9 px-3 py-2 text-sm rounded-lg",
        "academic-md": "h-10 px-4 py-2.5 text-sm rounded-lg",
        "academic-lg": "h-12 px-6 py-3 text-base rounded-lg",
        "academic-xl": "h-14 px-8 py-4 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
