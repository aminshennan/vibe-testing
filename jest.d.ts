import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classes: string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveValue(value: string | number): R
      toBeDisabled(): R
      toHaveFocus(): R
      toBeChecked(): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
      toHaveErrorMessage(text?: string | RegExp): R
    }
  }
} 
 