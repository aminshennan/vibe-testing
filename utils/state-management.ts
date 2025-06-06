/**
 * Academic State Management Utilities
 * Comprehensive utilities for managing component states, form validation,
 * and user feedback patterns in the academic portfolio system.
 */

// ============================
// State Type Definitions
// ============================

export interface LoadingState {
  isLoading: boolean
  message?: string
  progress?: number
  type?: 'spinner' | 'skeleton' | 'progress' | 'pulse'
}

export interface ErrorState {
  hasError: boolean
  message?: string
  code?: string | number
  type?: 'validation' | 'network' | 'authentication' | 'system'
  details?: Record<string, any>
  retryable?: boolean
}

export interface DisabledState {
  isDisabled: boolean
  reason?: string
  type?: 'loading' | 'permission' | 'validation' | 'system'
  canOverride?: boolean
}

export interface ValidationState<T = any> {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  touched: Set<keyof T>
  dirty: Set<keyof T>
  isSubmitting: boolean
}

export interface ValidationError {
  field: string
  message: string
  code: string
  severity: 'error' | 'warning'
}

export interface ValidationWarning {
  field: string
  message: string
  code: string
}

export interface FeedbackState {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  title?: string
  isVisible: boolean
  duration?: number
  actions?: FeedbackAction[]
}

export interface FeedbackAction {
  label: string
  action: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}

// ============================
// Loading State Management
// ============================

export class LoadingStateManager {
  private state: LoadingState = {
    isLoading: false,
    type: 'spinner'
  }

  private listeners: ((state: LoadingState) => void)[] = []

  constructor(initialState?: Partial<LoadingState>) {
    if (initialState) {
      this.state = { ...this.state, ...initialState }
    }
  }

  /**
   * Start loading with optional configuration
   */
  startLoading(config?: {
    message?: string
    type?: LoadingState['type']
    progress?: number
  }): void {
    this.updateState({
      isLoading: true,
      message: config?.message,
      type: config?.type || 'spinner',
      progress: config?.progress
    })
  }

  /**
   * Stop loading and clear state
   */
  stopLoading(): void {
    this.updateState({
      isLoading: false,
      message: undefined,
      progress: undefined
    })
  }

  /**
   * Update loading progress (0-100)
   */
  updateProgress(progress: number, message?: string): void {
    if (this.state.isLoading) {
      this.updateState({
        ...this.state,
        progress: Math.max(0, Math.min(100, progress)),
        message: message || this.state.message
      })
    }
  }

  /**
   * Get current loading state
   */
  getState(): LoadingState {
    return { ...this.state }
  }

  /**
   * Check if currently loading
   */
  isLoading(): boolean {
    return this.state.isLoading
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: LoadingState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private updateState(newState: Partial<LoadingState>): void {
    this.state = { ...this.state, ...newState }
    this.listeners.forEach(listener => listener(this.getState()))
  }
}

// ============================
// Error State Management
// ============================

export class ErrorStateManager {
  private state: ErrorState = {
    hasError: false
  }

  private listeners: ((state: ErrorState) => void)[] = []

  /**
   * Set error state with comprehensive error information
   */
  setError(config: {
    message: string
    code?: string | number
    type?: ErrorState['type']
    details?: Record<string, any>
    retryable?: boolean
  }): void {
    this.updateState({
      hasError: true,
      message: config.message,
      code: config.code,
      type: config.type || 'system',
      details: config.details,
      retryable: config.retryable || false
    })
  }

  /**
   * Set validation error with field-specific information
   */
  setValidationError(message: string, details?: Record<string, any>): void {
    this.setError({
      message,
      type: 'validation',
      details,
      retryable: false
    })
  }

  /**
   * Set network error with retry capability
   */
  setNetworkError(message: string, retryable: boolean = true): void {
    this.setError({
      message,
      type: 'network',
      retryable
    })
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.updateState({
      hasError: false,
      message: undefined,
      code: undefined,
      type: undefined,
      details: undefined,
      retryable: undefined
    })
  }

  /**
   * Get current error state
   */
  getState(): ErrorState {
    return { ...this.state }
  }

  /**
   * Check if there's an active error
   */
  hasError(): boolean {
    return this.state.hasError
  }

  /**
   * Check if error is retryable
   */
  isRetryable(): boolean {
    return this.state.retryable || false
  }

  /**
   * Subscribe to error state changes
   */
  subscribe(listener: (state: ErrorState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private updateState(newState: Partial<ErrorState>): void {
    this.state = { ...this.state, ...newState }
    this.listeners.forEach(listener => listener(this.getState()))
  }
}

// ============================
// Form Validation Manager
// ============================

export class FormValidationManager<T extends Record<string, any>> {
  private state: ValidationState<T> = {
    isValid: false,
    errors: [],
    warnings: [],
    touched: new Set(),
    dirty: new Set(),
    isSubmitting: false
  }

  private rules: Map<keyof T, ValidationRule<T>[]> = new Map()
  private listeners: ((state: ValidationState<T>) => void)[] = []

  constructor(validationRules?: Partial<Record<keyof T, ValidationRule<T>[]>>) {
    if (validationRules) {
      Object.entries(validationRules).forEach(([field, rules]) => {
        this.rules.set(field as keyof T, rules as ValidationRule<T>[])
      })
    }
  }

  /**
   * Add validation rule for a field
   */
  addRule(field: keyof T, rule: ValidationRule<T>): void {
    const existingRules = this.rules.get(field) || []
    this.rules.set(field, [...existingRules, rule])
  }

  /**
   * Validate a specific field
   */
  validateField(field: keyof T, value: any, formData: T): ValidationResult {
    const rules = this.rules.get(field) || []
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    for (const rule of rules) {
      const result = rule.validate(value, formData)
      if (!result.isValid) {
        if (result.severity === 'warning') {
          warnings.push({
            field: field as string,
            message: result.message,
            code: result.code || 'VALIDATION_WARNING'
          })
        } else {
          errors.push({
            field: field as string,
            message: result.message,
            code: result.code || 'VALIDATION_ERROR',
            severity: result.severity || 'error'
          })
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * Validate entire form
   */
  validateForm(formData: T): ValidationState<T> {
    const allErrors: ValidationError[] = []
    const allWarnings: ValidationWarning[] = []

    // Validate all fields with rules
    for (const [field, rules] of this.rules.entries()) {
      const fieldResult = this.validateField(field, formData[field], formData)
      allErrors.push(...fieldResult.errors)
      allWarnings.push(...fieldResult.warnings)
    }

    const newState: ValidationState<T> = {
      ...this.state,
      isValid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings
    }

    this.updateState(newState)
    return newState
  }

  /**
   * Mark field as touched
   */
  touchField(field: keyof T): void {
    const newTouched = new Set(this.state.touched)
    newTouched.add(field)
    this.updateState({ ...this.state, touched: newTouched })
  }

  /**
   * Mark field as dirty (modified)
   */
  markFieldDirty(field: keyof T): void {
    const newDirty = new Set(this.state.dirty)
    newDirty.add(field)
    this.updateState({ ...this.state, dirty: newDirty })
  }

  /**
   * Start form submission
   */
  startSubmission(): void {
    this.updateState({ ...this.state, isSubmitting: true })
  }

  /**
   * End form submission
   */
  endSubmission(): void {
    this.updateState({ ...this.state, isSubmitting: false })
  }

  /**
   * Reset validation state
   */
  reset(): void {
    this.updateState({
      isValid: false,
      errors: [],
      warnings: [],
      touched: new Set(),
      dirty: new Set(),
      isSubmitting: false
    })
  }

  /**
   * Get validation state
   */
  getState(): ValidationState<T> {
    return {
      ...this.state,
      touched: new Set(this.state.touched),
      dirty: new Set(this.state.dirty)
    }
  }

  /**
   * Subscribe to validation state changes
   */
  subscribe(listener: (state: ValidationState<T>) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private updateState(newState: ValidationState<T>): void {
    this.state = newState
    this.listeners.forEach(listener => listener(this.getState()))
  }
}

// ============================
// Validation Rules
// ============================

export interface ValidationRule<T> {
  validate: (value: any, formData: T) => ValidationRuleResult
  message?: string
  code?: string
}

export interface ValidationRuleResult {
  isValid: boolean
  message: string
  code?: string
  severity?: 'error' | 'warning'
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

// Common validation rules
export const ValidationRules = {
  required: <T>(message: string = 'This field is required'): ValidationRule<T> => ({
    validate: (value) => ({
      isValid: value !== null && value !== undefined && value !== '',
      message
    })
  }),

  email: <T>(message: string = 'Please enter a valid email address'): ValidationRule<T> => ({
    validate: (value) => {
      if (!value) return { isValid: true, message }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return {
        isValid: emailRegex.test(value),
        message
      }
    }
  }),

  minLength: <T>(min: number, message?: string): ValidationRule<T> => ({
    validate: (value) => ({
      isValid: !value || value.length >= min,
      message: message || `Must be at least ${min} characters`
    })
  }),

  maxLength: <T>(max: number, message?: string): ValidationRule<T> => ({
    validate: (value) => ({
      isValid: !value || value.length <= max,
      message: message || `Must be no more than ${max} characters`
    })
  })
}

// ============================
// Feedback State Manager
// ============================

export class FeedbackManager {
  private feedbacks: Map<string, FeedbackState> = new Map()
  private listeners: ((feedbacks: FeedbackState[]) => void)[] = []

  /**
   * Show feedback message
   */
  show(id: string, feedback: Omit<FeedbackState, 'isVisible'>): void {
    const feedbackState: FeedbackState = {
      ...feedback,
      isVisible: true
    }

    this.feedbacks.set(id, feedbackState)
    this.notifyListeners()

    // Auto-hide after duration if specified
    if (feedback.duration && feedback.duration > 0) {
      setTimeout(() => {
        this.hide(id)
      }, feedback.duration)
    }
  }

  /**
   * Show success feedback
   */
  showSuccess(id: string, message: string, title?: string, duration: number = 4000): void {
    this.show(id, {
      type: 'success',
      message,
      title,
      duration
    })
  }

  /**
   * Show error feedback
   */
  showError(id: string, message: string, title?: string, actions?: FeedbackAction[]): void {
    this.show(id, {
      type: 'error',
      message,
      title,
      actions
    })
  }

  /**
   * Hide specific feedback
   */
  hide(id: string): void {
    const feedback = this.feedbacks.get(id)
    if (feedback) {
      this.feedbacks.set(id, { ...feedback, isVisible: false })
      setTimeout(() => {
        this.feedbacks.delete(id)
        this.notifyListeners()
      }, 300)
    }
  }

  /**
   * Get all visible feedbacks
   */
  getFeedbacks(): FeedbackState[] {
    return Array.from(this.feedbacks.values()).filter(f => f.isVisible)
  }

  /**
   * Subscribe to feedback changes
   */
  subscribe(listener: (feedbacks: FeedbackState[]) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notifyListeners(): void {
    const visibleFeedbacks = this.getFeedbacks()
    this.listeners.forEach(listener => listener(visibleFeedbacks))
  }
}

// ============================
// State Combination Utilities
// ============================

/**
 * Combine multiple states into a unified component state
 */
export function combineStates(states: {
  loading?: LoadingState
  error?: ErrorState
  disabled?: DisabledState
  validation?: ValidationState
}) {
  const isLoading = states.loading?.isLoading || false
  const hasError = states.error?.hasError || false
  const isDisabled = states.disabled?.isDisabled || false
  const isValid = states.validation?.isValid !== false
  const isSubmitting = states.validation?.isSubmitting || false

  return {
    // Primary states
    isLoading,
    hasError,
    isDisabled,
    isValid,
    isSubmitting,

    // Derived states
    canInteract: !isLoading && !isDisabled && !isSubmitting,
    shouldShowError: hasError && !isLoading,
    isReady: !isLoading && !hasError && isValid,
    
    // State access
    ...states
  }
}

/**
 * Create a comprehensive state manager for a component
 */
export function createStateManager<T extends Record<string, any> = Record<string, any>>(config?: {
  validation?: Partial<Record<keyof T, ValidationRule<T>[]>>
  initialLoading?: boolean
  initialDisabled?: boolean
}) {
  const loading = new LoadingStateManager({ 
    isLoading: config?.initialLoading || false 
  })
  const error = new ErrorStateManager()
  const feedback = new FeedbackManager()
  const validation = new FormValidationManager<T>(config?.validation)

  return {
    loading,
    error,
    feedback,
    validation,
    
    // Convenience methods
    startLoading: (message?: string) => loading.startLoading({ message }),
    stopLoading: () => loading.stopLoading(),
    setError: (message: string, type?: ErrorState['type']) => error.setError({ message, type }),
    clearError: () => error.clearError(),
    showSuccess: (message: string) => feedback.showSuccess('default', message),
    showError: (message: string) => feedback.showError('default', message),
    
    // Combined state getter
    getState: () => combineStates({
      loading: loading.getState(),
      error: error.getState(),
      validation: validation.getState()
    })
  }
}

// Export singleton instances for global use
export const globalFeedback = new FeedbackManager()
export const globalLoading = new LoadingStateManager()
export const globalError = new ErrorStateManager() 