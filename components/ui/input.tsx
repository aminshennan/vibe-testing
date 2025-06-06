import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        // Academic input variants
        "academic": 
          "border-academic-slate-300 bg-white text-academic-slate-700 placeholder:text-academic-slate-500 focus-visible:border-primary-navy focus-visible:ring-primary-navy/20 transition-all duration-normal",
        "academic-success": 
          "border-semantic-success bg-semantic-success/5 text-academic-slate-700 placeholder:text-academic-slate-500 focus-visible:border-semantic-success focus-visible:ring-semantic-success/20",
        "academic-warning": 
          "border-semantic-warning bg-semantic-warning/5 text-academic-slate-700 placeholder:text-academic-slate-500 focus-visible:border-semantic-warning focus-visible:ring-semantic-warning/20",
        "academic-error": 
          "border-semantic-error bg-semantic-error/5 text-academic-slate-700 placeholder:text-academic-slate-500 focus-visible:border-semantic-error focus-visible:ring-semantic-error/20",
        "academic-search": 
          "border-academic-slate-300 bg-academic-slate-50 text-academic-slate-700 placeholder:text-academic-slate-500 focus-visible:bg-white focus-visible:border-primary-navy focus-visible:ring-primary-navy/20 transition-all duration-normal",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
        xl: "h-12 px-4 text-lg",
        // Academic size variants
        "academic-sm": "h-9 px-3 py-2 text-sm rounded-md",
        "academic-md": "h-10 px-4 py-2.5 text-sm rounded-lg",
        "academic-lg": "h-12 px-4 py-3 text-base rounded-lg",
        "academic-xl": "h-14 px-6 py-4 text-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type = "text",
    label,
    helperText,
    errorMessage,
    successMessage,
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const helperTextId = `${inputId}-helper`
    const errorId = `${inputId}-error`
    
    // Determine variant based on validation state
    const effectiveVariant = React.useMemo(() => {
      if (errorMessage) return "academic-error"
      if (successMessage) return "academic-success"
      return variant || "academic"
    }, [variant, errorMessage, successMessage])

    const inputElement = (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-academic-slate-500">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: effectiveVariant, size }),
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          ref={ref}
          id={inputId}
          aria-describedby={
            [
              helperText && helperTextId,
              errorMessage && errorId,
            ].filter(Boolean).join(" ") || undefined
          }
          aria-invalid={errorMessage ? "true" : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-academic-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
    )

    if (!label && !helperText && !errorMessage && !successMessage) {
      return inputElement
    }

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-academic-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {inputElement}
        {helperText && !errorMessage && !successMessage && (
          <p id={helperTextId} className="text-sm text-academic-slate-600">
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} className="text-sm text-semantic-error font-medium" role="alert">
            {errorMessage}
          </p>
        )}
        {successMessage && !errorMessage && (
          <p className="text-sm text-semantic-success font-medium">
            {successMessage}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Academic-specific input components
const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "variant">>(
  ({ placeholder = "Search...", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        variant="academic-search"
        placeholder={placeholder}
        leftIcon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        {...props}
      />
    )
  }
)
SearchInput.displayName = "SearchInput"

const EmailInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        type="email"
        leftIcon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        }
        {...props}
      />
    )
  }
)
EmailInput.displayName = "EmailInput"

const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        leftIcon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        }
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-academic-slate-500 hover:text-academic-slate-700 transition-colors duration-fast focus:outline-none focus:text-primary-navy"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        }
        {...props}
      />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { 
  Input, 
  inputVariants,
  SearchInput,
  EmailInput,
  PasswordInput
}
