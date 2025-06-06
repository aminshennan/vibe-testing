# 🧩 Component Library Documentation
**Academic Portfolio Design System**

## 📋 **OVERVIEW**

This document provides comprehensive documentation for all components in the academic portfolio design system, including usage examples, accessibility patterns, and implementation guidelines.

## 🎨 **FOUNDATION COMPONENTS**

### **Academic Cards**

#### **Basic Academic Card**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card className="academic-card">
  <CardHeader>
    <CardTitle className="academic-heading-section">Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### **Interactive Academic Card**
```tsx
<Card className="academic-card academic-card--interactive">
  <CardHeader>
    <CardTitle className="academic-heading-section">Interactive Card</CardTitle>
  </CardHeader>
  <CardContent>
    Content with hover effects and focus states
  </CardContent>
</Card>
```

#### **Academic Card Variants**
- `.academic-card` - Standard card with academic styling
- `.academic-card--interactive` - Adds hover and focus effects
- `.academic-card--elevated` - Increased shadow for prominence
- `.academic-card--bordered` - Distinct border styling

**Accessibility Features:**
- Proper semantic structure with `role="article"` when appropriate
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### **Academic Buttons**

#### **Primary Button**
```tsx
import { Button } from "@/components/ui/button"

<Button className="academic-button academic-button--primary">
  Primary Action
</Button>
```

#### **Secondary Button**
```tsx
<Button variant="outline" className="academic-button academic-button--secondary">
  Secondary Action
</Button>
```

#### **Button Sizes**
- `.academic-button--sm` - Small button (32px height)
- `.academic-button--md` - Medium button (40px height) - Default
- `.academic-button--lg` - Large button (48px height)
- `.academic-button--xl` - Extra large button (56px height)

**Accessibility Features:**
- Minimum 44px touch target size
- High contrast focus indicators
- Proper ARIA labels
- Keyboard navigation support

### **Academic Typography**

#### **Heading System**
```tsx
<h1 className="academic-heading-hero">Hero Heading</h1>
<h2 className="academic-heading-section">Section Heading</h2>
<h3 className="academic-heading-subsection">Subsection Heading</h3>
<h4 className="academic-heading-minor">Minor Heading</h4>
```

#### **Body Text**
```tsx
<p className="academic-body-text">Standard body text</p>
<p className="academic-intro-text">Introduction text (larger)</p>
<p className="academic-caption-text">Caption text (smaller)</p>
```

#### **Academic Content Spacing**
```tsx
<div className="academic-content-spacing">
  <p>Paragraph with proper spacing</p>
  <p>Another paragraph with consistent spacing</p>
</div>
```

## 🎯 **LAYOUT COMPONENTS**

### **Academic Container**
```tsx
<div className="academic-container">
  <!-- Responsive container with academic breakpoints -->
</div>
```

### **Academic Grid System**
```tsx
<!-- 2-column grid -->
<div className="academic-grid-2-col">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 3-column grid -->
<div className="academic-grid-3-col">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Auto-fit grid -->
<div className="academic-grid-auto-fit">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### **Academic Sections**
```tsx
<!-- Primary section (white background) -->
<section className="academic-section-primary">
  <div className="academic-container">
    Section content
  </div>
</section>

<!-- Secondary section (light background) -->
<section className="academic-section-secondary">
  <div className="academic-container">
    Section content
  </div>
</section>

<!-- Tertiary section (alternate background) -->
<section className="academic-section-tertiary">
  <div className="academic-container">
    Section content
  </div>
</section>
```

## 📊 **DATA DISPLAY COMPONENTS**

### **Academic Statistics**
```tsx
<div className="academic-stats-grid">
  <div className="academic-stat-item">
    <div className="academic-stat-number">42</div>
    <div className="academic-stat-label">Publications</div>
  </div>
  <div className="academic-stat-item">
    <div className="academic-stat-number">1,234</div>
    <div className="academic-stat-label">Citations</div>
  </div>
</div>
```

### **Publication Item**
```tsx
<div className="academic-publication-item">
  <h4 className="academic-publication-title">Publication Title</h4>
  <p className="academic-publication-authors">Authors list</p>
  <p className="academic-publication-venue">Journal or Conference</p>
  <div className="academic-publication-meta">
    <span className="academic-publication-year">2024</span>
    <span className="academic-publication-citations">15 citations</span>
  </div>
</div>
```

## 🎬 **ANIMATION COMPONENTS**

### **Animated Sections**
```tsx
import { AnimatedSection } from "@/components/animated-section"

<AnimatedSection animation="fade-up" delay={200}>
  <Card>Content that animates in</Card>
</AnimatedSection>
```

### **Staggered Animations**
```tsx
import { StaggeredContainer, StaggeredItem } from "@/components/advanced-animations/staggered-container"

<StaggeredContainer staggerDelay={0.15}>
  {items.map((item, index) => (
    <StaggeredItem key={index}>
      <Card>{item.content}</Card>
    </StaggeredItem>
  ))}
</StaggeredContainer>
```

### **Count Up Animation**
```tsx
import { CountUpAnimation } from "@/components/advanced-animations/micro-interactions"

<CountUpAnimation 
  value={42} 
  className="academic-stat-number"
  duration={2}
  prefix="$"
  suffix="M"
/>
```

## 🔧 **UTILITY CLASSES**

### **Spacing Utilities**
- `.academic-spacing-xs` - 0.25rem spacing
- `.academic-spacing-sm` - 0.5rem spacing
- `.academic-spacing-md` - 1rem spacing
- `.academic-spacing-lg` - 1.5rem spacing
- `.academic-spacing-xl` - 2rem spacing
- `.academic-spacing-2xl` - 3rem spacing

### **Color Utilities**
- `.academic-text-primary` - Primary navy text
- `.academic-text-secondary` - Academic green text
- `.academic-text-accent` - Accent burgundy text
- `.academic-bg-primary` - Primary background
- `.academic-bg-secondary` - Secondary background

### **Transition Utilities**
- `.academic-transition-all` - All properties transition
- `.academic-transition-colors` - Color properties only
- `.academic-transition-transform` - Transform properties only

## ♿ **ACCESSIBILITY GUIDELINES**

### **Color Contrast**
All components meet WCAG 2.1 AA standards:
- Normal text: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- Interactive elements: minimum 3:1 contrast ratio

### **Keyboard Navigation**
- All interactive elements are keyboard accessible
- Logical tab order throughout components
- Visible focus indicators
- Escape key support for modal-like components

### **Screen Reader Support**
- Semantic HTML structure
- Proper ARIA labels and descriptions
- Role attributes where appropriate
- Alt text for all images

### **Motion Sensitivity**
- Respects `prefers-reduced-motion` settings
- Provides alternatives for motion-based content
- Smooth, purposeful animations

## 📱 **RESPONSIVE BEHAVIOR**

### **Breakpoint System**
- `sm`: 640px and up (tablets)
- `md`: 768px and up (small laptops)
- `lg`: 1024px and up (desktops)
- `xl`: 1280px and up (large screens)
- `2xl`: 1536px and up (ultra-wide)

### **Mobile-First Approach**
All components are designed mobile-first with progressive enhancement:

```css
/* Mobile (default) */
.academic-card {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .academic-card {
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .academic-card {
    padding: 2rem;
  }
}
```

## 🔄 **COMPONENT STATES**

### **Interactive States**
- **Default**: Base component appearance
- **Hover**: Visual feedback on mouse hover
- **Focus**: Keyboard focus indicator
- **Active**: Component in pressed/selected state
- **Disabled**: Component in non-interactive state

### **Loading States**
```tsx
<Card className="academic-card academic-card--loading">
  <div className="academic-skeleton">
    <div className="academic-skeleton-line"></div>
    <div className="academic-skeleton-line"></div>
  </div>
</Card>
```

### **Error States**
```tsx
<Card className="academic-card academic-card--error">
  <div className="academic-error-message">
    <AlertCircle className="w-5 h-5 mr-2" />
    Error message content
  </div>
</Card>
```

## 📋 **IMPLEMENTATION CHECKLIST**

When implementing new components:

- [ ] Use semantic HTML structure
- [ ] Apply proper ARIA attributes
- [ ] Ensure keyboard accessibility
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Implement responsive behavior
- [ ] Add proper focus management
- [ ] Include loading/error states
- [ ] Document usage examples
- [ ] Test across browsers

## 🧪 **TESTING GUIDELINES**

### **Accessibility Testing**
- Use axe-core for automated testing
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification

### **Visual Testing**
- Cross-browser compatibility
- Responsive design testing
- Dark mode compatibility
- High contrast mode support

### **Performance Testing**
- Component render performance
- Animation frame rates
- Bundle size impact
- Core Web Vitals compliance

---

*This documentation ensures consistent, accessible, and high-quality component implementation across the academic portfolio.* 