import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button Component', () => {
  
  describe('Rendering', () => {
    it('renders with default properties', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })

    it('renders with custom className', () => {
      render(<Button className="custom-class">Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('renders as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      
      const link = screen.getByRole('link', { name: /link button/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('Variants', () => {
    it('applies default variant styling', () => {
      render(<Button>Default</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('applies destructive variant styling', () => {
      render(<Button variant="destructive">Delete</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')
    })

    it('applies outline variant styling', () => {
      render(<Button variant="outline">Outline</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border', 'border-input', 'bg-background')
    })

    it('applies secondary variant styling', () => {
      render(<Button variant="secondary">Secondary</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    it('applies ghost variant styling', () => {
      render(<Button variant="ghost">Ghost</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')
    })

    it('applies link variant styling', () => {
      render(<Button variant="link">Link</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('applies default size styling', () => {
      render(<Button>Default Size</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
    })

    it('applies small size styling', () => {
      render(<Button size="sm">Small</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9', 'rounded-md', 'px-3')
    })

    it('applies large size styling', () => {
      render(<Button size="lg">Large</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-11', 'rounded-md', 'px-8')
    })

    it('applies icon size styling', () => {
      render(<Button size="icon">Icon</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })
  })

  describe('States', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
    })

    it('applies hover and focus states', () => {
      render(<Button>Hover Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-primary/90')
      expect(button).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-ring')
    })
  })

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click Test</Button>)
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not fire click events when disabled', async () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} disabled>
          Disabled Click
        </Button>
      )
      
      const button = screen.getByRole('button')
      await userEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('handles keyboard events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard Test</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      await userEvent.keyboard('{Enter}')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles space key activation', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Space Test</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      await userEvent.keyboard(' ')
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper button role', () => {
      render(<Button>Accessible Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>)
      
      const button = screen.getByLabelText('Close dialog')
      expect(button).toBeInTheDocument()
    })

    it('supports aria-disabled when disabled', () => {
      render(<Button disabled>Disabled Button</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('is focusable by default', () => {
      render(<Button>Focusable</Button>)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has proper focus visible styling', () => {
      render(<Button>Focus Test</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
    })
  })

  describe('Custom Props', () => {
    it('forwards custom HTML attributes', () => {
      render(
        <Button
          data-testid="custom-button"
          title="Custom Title"
          type="submit"
        >
          Custom Props
        </Button>
      )
      
      const button = screen.getByTestId('custom-button')
      expect(button).toHaveAttribute('title', 'Custom Title')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('merges custom styles with variant styles', () => {
      render(
        <Button
          variant="outline"
          className="border-red-500 text-red-500"
        >
          Custom Styled
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-red-500', 'text-red-500')
      // Should still have base outline variant classes
      expect(button).toHaveClass('border', 'bg-background')
    })

    it('handles ref forwarding', () => {
      const ref = { current: null }
      
      render(<Button ref={ref}>Ref Test</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Performance', () => {
    it('renders quickly with multiple variants', () => {
      const startTime = performance.now()
      
      render(
        <div>
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      )
      
      const endTime = performance.now()
      expect(endTime - startTime).toBeLessThan(100) // Should render in under 100ms
      
      expect(screen.getAllByRole('button')).toHaveLength(6)
    })

    it('handles rapid click events efficiently', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Rapid Click</Button>)
      
      const button = screen.getByRole('button')
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        await userEvent.click(button)
      }
      
      expect(handleClick).toHaveBeenCalledTimes(10)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button></Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('')
    })

    it('handles null children', () => {
      render(<Button>{null}</Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles complex children', () => {
      render(
        <Button>
          <span>Complex</span>
          <strong>Children</strong>
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('Children')).toBeInTheDocument()
    })

    it('maintains functionality with custom event handlers', async () => {
      const handleMouseDown = jest.fn()
      const handleMouseUp = jest.fn()
      const handleClick = jest.fn()
      
      render(
        <Button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
        >
          Event Test
        </Button>
      )
      
      const button = screen.getByRole('button')
      
      fireEvent.mouseDown(button)
      fireEvent.mouseUp(button)
      await userEvent.click(button)
      
      expect(handleMouseDown).toHaveBeenCalledTimes(2)
      expect(handleMouseUp).toHaveBeenCalledTimes(2)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
}) 
 