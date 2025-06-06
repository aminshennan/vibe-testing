# Academic Portfolio Design System

## Overview

This design system provides a comprehensive set of design tokens, components, and patterns specifically crafted for Dr. Sarah Mitchell's academic portfolio. It emphasizes accessibility, readability, and professional academic presentation while maintaining modern web standards.

## Design Principles

### 1. Academic Excellence
- Professional, scholarly appearance
- Clear information hierarchy
- Emphasis on content readability
- Credible and trustworthy design

### 2. Accessibility First
- WCAG 2.1 AA compliance
- High contrast ratios (minimum 4.5:1, target 7:1)
- Keyboard navigation support
- Screen reader optimization
- Reduced motion support

### 3. Responsive & Fluid
- Mobile-first approach
- Fluid typography using clamp()
- Responsive spacing tokens
- Adaptive layouts

### 4. Performance Optimized
- GPU-accelerated animations
- Efficient CSS custom properties
- Minimal bundle impact
- Optimized for Core Web Vitals

## Color System

### Primary Academic Colors
```css
--primary-navy: #1e3a8a          /* Main brand color */
--primary-navy-light: #3b82f6    /* Hover states */
--primary-navy-dark: #1e40af     /* Active states */
--academic-green: #065f46        /* Success, research */
--accent-gold: #d97706           /* Warnings, highlights */
--accent-burgundy: #7c2d12       /* Special emphasis */
```

### Semantic Colors
```css
--color-success: #065f46         /* Success states */
--color-warning: #d97706         /* Warning states */
--color-error: #dc2626           /* Error states */
--color-info: #1e3a8a           /* Information states */
```

### Academic Slate Scale (WCAG Compliant)
```css
--academic-slate-50: #f8fafc     /* Backgrounds */
--academic-slate-100: #f1f5f9    /* Light backgrounds */
--academic-slate-200: #e2e8f0    /* Borders */
--academic-slate-300: #cbd5e1    /* Hover borders */
--academic-slate-500: #3f4e5a    /* Secondary text (5.2:1) */
--academic-slate-600: #2d3843    /* Body text (6.1:1) */
--academic-slate-700: #1e293b    /* Headings (7.2:1) */
--academic-slate-900: #020617    /* Maximum contrast (10.1:1) */
```

## Typography System

### Font Families
- **Serif**: 'Crimson Text' - For headings and academic emphasis
- **Sans**: 'Inter' - For body text and UI elements
- **Mono**: 'JetBrains Mono' - For code and technical content

### Fluid Typography Scale
```css
/* Responsive headings using clamp() */
.academic-heading-1: clamp(2rem, 5vw, 3.75rem)
.academic-heading-2: clamp(1.75rem, 4vw, 3rem)
.academic-heading-3: clamp(1.5rem, 3.5vw, 2.25rem)
.academic-heading-4: clamp(1.25rem, 3vw, 1.875rem)
.academic-heading-5: clamp(1.125rem, 2.5vw, 1.5rem)
.academic-heading-6: clamp(1rem, 2vw, 1.25rem)

/* Body text with improved readability */
.academic-body: 1rem (line-height: 1.7)
.academic-body-lg: clamp(1rem, 1.5vw, 1.125rem)
.academic-body-xl: clamp(1.125rem, 2vw, 1.25rem)
```

### Usage Guidelines
- Use serif fonts for headings to establish academic authority
- Maintain 1.7 line-height for body text (optimal for academic reading)
- Apply fluid scaling for responsive typography
- Ensure sufficient contrast for all text elements

## Spacing System

### Base Spacing Tokens
```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 0.75rem    /* 12px */
--spacing-lg: 1rem       /* 16px */
--spacing-xl: 1.5rem     /* 24px */
--spacing-2xl: 2rem      /* 32px */
--spacing-3xl: 2.5rem    /* 40px */
--spacing-4xl: 3rem      /* 48px */
--spacing-5xl: 4rem      /* 64px */
--spacing-6xl: 5rem      /* 80px */
--spacing-7xl: 6rem      /* 96px */
```

### Responsive Spacing Tokens
```css
--spacing-responsive-sm: clamp(0.5rem, 1vw, 1rem)
--spacing-responsive-md: clamp(0.75rem, 2vw, 1.5rem)
--spacing-responsive-lg: clamp(1rem, 3vw, 2rem)
--spacing-responsive-xl: clamp(1.5rem, 4vw, 3rem)
--spacing-responsive-2xl: clamp(2rem, 5vw, 4rem)
```

## Animation System

### Timing Functions
```css
--duration-fast: 150ms           /* Quick interactions */
--duration-normal: 300ms         /* Standard transitions */
--duration-slow: 600ms           /* Complex animations */

--easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1)
--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)
--easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1)
```

### Accessibility Considerations
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Component System

### Button Variants

#### Academic Primary
```tsx
<Button variant="academic-primary" size="academic-md">
  Primary Action
</Button>
```
- Use for main CTAs and primary actions
- High contrast with hover elevation
- Focus ring for accessibility

#### Academic Secondary
```tsx
<Button variant="academic-secondary" size="academic-md">
  Secondary Action
</Button>
```
- Use for secondary actions
- Outline style with fill on hover
- Maintains visual hierarchy

#### Academic Ghost
```tsx
<Button variant="academic-ghost" size="academic-md">
  Tertiary Action
</Button>
```
- Use for subtle actions
- Minimal visual weight
- Good for navigation elements

### Card Variants

#### Academic Research Card
```tsx
<Card variant="academic-research" padding="academic-lg">
  <CardHeader>
    <CardTitle variant="academic">Research Project</CardTitle>
    <CardDescription variant="academic">
      Brief description of the research
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Research content */}
  </CardContent>
</Card>
```

#### Academic Publication Card
```tsx
<Card variant="academic-publication" padding="academic-md">
  <CardTitle variant="academic-small">Publication Title</CardTitle>
  <CardDescription variant="muted">Journal Name, 2024</CardDescription>
</Card>
```

### Badge System

#### Research Status
```tsx
<ResearchStatusBadge status="active">Active Research</ResearchStatusBadge>
<ResearchStatusBadge status="completed">Completed</ResearchStatusBadge>
<ResearchStatusBadge status="pending">Pending Review</ResearchStatusBadge>
```

#### Publication Status
```tsx
<PublicationStatusBadge status="published">Published</PublicationStatusBadge>
<PublicationStatusBadge status="under-review">Under Review</PublicationStatusBadge>
<PublicationStatusBadge status="peer-reviewed">Peer Reviewed</PublicationStatusBadge>
```

#### Teaching Levels
```tsx
<TeachingLevelBadge level="undergraduate">Undergraduate</TeachingLevelBadge>
<TeachingLevelBadge level="graduate">Graduate</TeachingLevelBadge>
<TeachingLevelBadge level="phd">PhD Level</TeachingLevelBadge>
```

## Layout System

### Container Classes
```css
.academic-container        /* Standard container (1280px max) */
.academic-container-wide   /* Wide container (1536px max) */
.academic-container-narrow /* Narrow container (768px max) */
```

### Grid Systems
```css
.academic-grid-2          /* 2-column responsive grid */
.academic-grid-3          /* 3-column responsive grid */
.academic-grid-4          /* 4-column responsive grid */
.academic-grid-responsive /* Auto-fit responsive grid */
```

### Section Classes
```css
.academic-section-hero      /* Hero section spacing */
.academic-section-primary   /* Primary section (white bg) */
.academic-section-secondary /* Secondary section (slate-50 bg) */
.academic-section-tertiary  /* Tertiary section (white bg) */
```

## Accessibility Features

### Focus Management
- Custom focus rings with academic colors
- High contrast focus indicators
- Keyboard navigation support
- Skip links for screen readers

### Color Contrast
- All text meets WCAG 2.1 AA standards (4.5:1 minimum)
- Enhanced contrast for better readability (7:1 target)
- Semantic color coding for status indicators

### Screen Reader Support
- Proper ARIA labels and roles
- Semantic HTML structure
- Descriptive alt text for images
- Logical heading hierarchy

### Motion Preferences
- Respects `prefers-reduced-motion`
- Graceful degradation for animations
- Essential motion only when reduced motion is preferred

## Implementation Guidelines

### CSS Custom Properties
Use CSS custom properties for consistent theming:
```css
.custom-component {
  background: var(--academic-slate-50);
  color: var(--academic-slate-700);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--duration-normal) var(--easing-standard);
}
```

### Responsive Design
Implement mobile-first responsive design:
```css
.responsive-component {
  padding: var(--spacing-responsive-lg);
  font-size: clamp(1rem, 2vw, 1.25rem);
}

@media (max-width: 768px) {
  .responsive-component {
    /* Mobile-specific adjustments */
  }
}
```

### Performance Optimization
```css
.animated-component {
  will-change: transform; /* GPU acceleration */
  transition: transform var(--duration-normal) var(--easing-standard);
}

.animated-component:hover {
  transform: translateY(-2px);
}
```

## Dark Mode Support

The design system includes comprehensive dark mode support:

```css
.dark .academic-card {
  background: var(--academic-dark-surface);
  border-color: var(--academic-dark-border);
  color: var(--academic-dark-text);
}
```

### Dark Mode Colors
- Enhanced contrast ratios for dark backgrounds
- Semantic color adjustments for dark themes
- Consistent visual hierarchy in both modes

## Best Practices

### Do's
✅ Use semantic HTML elements
✅ Implement proper focus management
✅ Test with screen readers
✅ Maintain consistent spacing
✅ Use fluid typography for responsiveness
✅ Follow the established color hierarchy
✅ Implement proper loading states

### Don'ts
❌ Use color alone to convey information
❌ Ignore keyboard navigation
❌ Override focus styles without replacement
❌ Use fixed font sizes for headings
❌ Implement animations without reduced motion support
❌ Use low contrast color combinations
❌ Create overly complex component hierarchies

## Testing Checklist

### Accessibility Testing
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content properly
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] Focus indicators are visible and clear
- [ ] Reduced motion preferences are respected

### Responsive Testing
- [ ] Components work on mobile devices (320px+)
- [ ] Typography scales appropriately
- [ ] Touch targets meet minimum size requirements (44px)
- [ ] Horizontal scrolling is avoided
- [ ] Content reflows properly at all breakpoints

### Performance Testing
- [ ] Animations are smooth (60fps)
- [ ] No layout shifts during loading
- [ ] CSS bundle size is optimized
- [ ] Critical styles are inlined
- [ ] Non-critical styles are loaded asynchronously

## Migration Guide

When updating existing components to use the new design system:

1. **Update color references** to use CSS custom properties
2. **Replace fixed typography** with fluid scale classes
3. **Implement proper focus states** using academic-focus utilities
4. **Add semantic variants** for academic content types
5. **Test accessibility** with keyboard and screen readers
6. **Verify responsive behavior** across all breakpoints

## Support and Resources

- **Design Tokens**: All tokens are defined in `app/globals.css`
- **Component Library**: Enhanced components in `components/ui/`
- **Tailwind Config**: Extended configuration in `tailwind.config.ts`
- **Type Definitions**: TypeScript support for all variants

For questions or contributions to the design system, please refer to the project documentation or create an issue in the repository. 