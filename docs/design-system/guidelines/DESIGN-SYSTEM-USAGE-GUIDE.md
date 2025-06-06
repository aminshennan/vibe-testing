# 🎨 Design System Usage Guide
**Academic Portfolio - Enhanced Component System Implementation**

## 📋 **OVERVIEW**

This guide provides comprehensive documentation for using the enhanced academic design system. All components follow BEM methodology with academic prefixes and are optimized for accessibility, performance, and responsive design.

## 🎨 **TYPOGRAPHY SYSTEM**

### **Heading Hierarchy**

```tsx
// Primary Page Title (Hero sections)
<h1 className="academic-heading-1">Dr. Sarah Mitchell</h1>
// Alternative: academic-heading-hero (same styling)

// Section Headings
<h2 className="academic-heading-2">Research Projects</h2>
// Alternative: academic-heading-section (same styling)

// Subsection Headings
<h3 className="academic-heading-3">Cognitive Psychology</h3>
// Alternative: academic-heading-subsection (same styling)

// Card/Content Headings
<h4 className="academic-heading-4">Study Results</h4>
<h5 className="academic-heading-5">Methodology</h5>
<h6 className="academic-heading-6">Data Sources</h6>
```

### **Body Text Hierarchy**

```tsx
// Introduction/Lead Text
<p className="academic-body-xl">
  Leading research in cognitive psychology and educational technology.
</p>
// Alternative: academic-intro-text (same styling)

// Large Body Text
<p className="academic-body-lg">
  This research examines the intersection of technology and learning.
</p>

// Standard Body Text (default)
<p className="academic-body">
  Our findings demonstrate significant improvements in student engagement.
</p>

// Small Body Text
<p className="academic-body-sm">
  Additional details and supplementary information.
</p>

// Caption Text
<p className="academic-caption">
  Figure 1: Research Methodology Overview
</p>
```

### **Typography Best Practices**

```tsx
// ✅ Correct: Use semantic HTML with academic classes
<article className="academic-content-spacing">
  <h2 className="academic-heading-section">Research Overview</h2>
  <p className="academic-intro-text">Leading paragraph...</p>
  <p className="academic-body">Main content...</p>
</article>

// ❌ Avoid: Mixing heading levels or skipping semantic structure
<div>
  <h1 className="academic-heading-3">Wrong semantic level</h1>
  <div className="academic-heading-2">Should be proper heading tag</div>
</div>
```

## 🧩 **COMPONENT SYSTEM**

### **Academic Card System**

#### **Basic Card Structure**
```tsx
<div className="academic-card">
  <div className="academic-card__header">
    <h3 className="academic-heading-4">Card Title</h3>
    <p className="academic-body-sm">Subtitle or metadata</p>
  </div>
  
  <div className="academic-card__body">
    <p className="academic-body">Main card content goes here.</p>
  </div>
  
  <div className="academic-card__footer">
    <button className="academic-button academic-button--secondary">
      Learn More
    </button>
  </div>
</div>
```

#### **Card Modifiers**
```tsx
// Elevated Card (enhanced shadow)
<div className="academic-card academic-card--elevated">
  {/* Card content */}
</div>

// Highlighted Card (border emphasis)
<div className="academic-card academic-card--highlighted">
  {/* Card content */}
</div>

// Interactive Card (hover states)
<div className="academic-card academic-card--interactive" tabIndex="0">
  {/* Card content */}
</div>
```

#### **Card Grid Layouts**
```tsx
// 2-Column Grid
<div className="academic-grid-2">
  <div className="academic-card">{/* Card 1 */}</div>
  <div className="academic-card">{/* Card 2 */}</div>
</div>

// 3-Column Grid
<div className="academic-grid-3">
  <div className="academic-card">{/* Card 1 */}</div>
  <div className="academic-card">{/* Card 2 */}</div>
  <div className="academic-card">{/* Card 3 */}</div>
</div>

// Responsive Grid (auto-fit)
<div className="academic-grid-responsive">
  {/* Cards automatically adjust to screen size */}
</div>
```

### **Academic Button System**

#### **Button Variants**
```tsx
// Primary Button (main actions)
<button className="academic-button academic-button--primary">
  Contact Me
</button>

// Secondary Button (secondary actions)
<button className="academic-button academic-button--secondary">
  View Details
</button>

// Ghost Button (subtle actions)
<button className="academic-button academic-button--ghost">
  Cancel
</button>
```

#### **Button Sizes**
```tsx
// Small Button
<button className="academic-button academic-button--primary academic-button--sm">
  Save
</button>

// Default Button (no size modifier needed)
<button className="academic-button academic-button--primary">
  Submit
</button>

// Large Button
<button className="academic-button academic-button--primary academic-button--lg">
  Get Started
</button>
```

#### **Button with Icons**
```tsx
<button className="academic-button academic-button--primary">
  <svg className="w-4 h-4" /* icon *//>
  Download CV
</button>
```

### **Academic Link System**

```tsx
// Standard Academic Link
<a href="/research" className="academic-link">
  View Research Projects
</a>

// Link in Text
<p className="academic-body">
  Read more about our <a href="/methods" className="academic-link">research methodology</a> 
  to understand our approach.
</p>

// External Link (add appropriate attributes)
<a 
  href="https://external-site.com" 
  className="academic-link"
  target="_blank"
  rel="noopener noreferrer"
>
  External Resource
</a>
```

## 🎨 **COLOR SYSTEM**

### **Design Tokens Usage**

```css
/* Academic Brand Colors */
.custom-element {
  color: var(--primary-navy);           /* Primary brand color */
  background: var(--academic-slate-50); /* Light background */
  border-color: var(--academic-slate-200); /* Subtle borders */
}

/* Semantic Colors */
.success-message {
  color: var(--color-success);
  background: var(--color-success-bg);
  border-color: var(--color-success-light);
}

.warning-alert {
  color: var(--color-warning);
  background: var(--color-warning-bg);
  border-color: var(--color-warning-light);
}

.error-state {
  color: var(--color-error);
  background: var(--color-error-bg);
  border-color: var(--color-error-light);
}

.info-panel {
  color: var(--color-info);
  background: var(--color-info-bg);
  border-color: var(--color-info-light);
}
```

### **WCAG Compliant Text Colors**

```css
/* High Contrast Text (12.1:1 ratio) */
.primary-text { color: var(--academic-slate-700); }

/* Medium Contrast Text (8.2:1 ratio) */
.secondary-text { color: var(--academic-slate-600); }

/* Accessible Muted Text (6.1:1 ratio) */
.muted-text { color: var(--academic-slate-500); }

/* Light Text (4.5:1 ratio - minimum for normal text) */
.light-text { color: var(--academic-slate-400); }
```

## 📐 **SPACING SYSTEM**

### **Design Token Usage**

```css
/* Fixed Spacing (use for consistent measurements) */
.element {
  margin: var(--spacing-lg);      /* 16px */
  padding: var(--spacing-xl);     /* 24px */
  gap: var(--spacing-md);         /* 12px */
}

/* Responsive Spacing (use for fluid layouts) */
.responsive-element {
  margin: var(--spacing-responsive-lg);  /* clamp(1rem, 2.5vw, 2rem) */
  padding: var(--spacing-responsive-xl); /* clamp(1.5rem, 3vw, 3rem) */
}

/* Section Spacing */
.section {
  padding: var(--spacing-responsive-2xl) 0; /* Fluid vertical spacing */
}
```

### **Layout Classes**

```tsx
// Academic Container (responsive max-width with padding)
<div className="academic-container">
  <h1 className="academic-heading-1">Page Title</h1>
  {/* Content automatically centered with responsive padding */}
</div>

// Section Spacing
<section className="academic-section">
  {/* Standard section with responsive vertical padding */}
</section>

<section className="academic-section-lg">
  {/* Large section with extra vertical padding */}
</section>

// Content Spacing (automatic spacing between elements)
<div className="academic-content-spacing">
  <h2>Heading</h2>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  {/* Automatic spacing applied between all child elements */}
</div>
```

## 🎯 **ACCESSIBILITY IMPLEMENTATION**

### **Focus Management**

```tsx
// All interactive elements automatically receive focus styling
<button className="academic-button academic-button--primary">
  {/* Focus ring automatically applied */}
</button>

// Custom focusable elements
<div 
  className="academic-focus"
  tabIndex="0"
  role="button"
  onKeyDown={handleKeyDown}
>
  Custom interactive element
</div>
```

### **ARIA Best Practices**

```tsx
// Card with proper ARIA
<div 
  className="academic-card academic-card--interactive"
  role="article"
  aria-labelledby="card-title"
>
  <h3 id="card-title" className="academic-heading-4">
    Research Project
  </h3>
  <p className="academic-body">Project description...</p>
</div>

// Button with descriptive label
<button 
  className="academic-button academic-button--primary"
  aria-label="Download Dr. Mitchell's curriculum vitae"
>
  Download CV
</button>

// Link with context
<a 
  href="/research/cognitive-psychology"
  className="academic-link"
  aria-describedby="research-context"
>
  Cognitive Psychology Research
</a>
<p id="research-context" className="academic-body-sm">
  Explore our latest findings in cognitive psychology research.
</p>
```

### **Keyboard Navigation**

```tsx
// Ensure all interactive elements are keyboard accessible
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    // Handle activation
  }
};

<div
  className="academic-card academic-card--interactive"
  tabIndex="0"
  onKeyDown={handleKeyDown}
  onClick={handleClick}
  role="button"
>
  {/* Interactive card content */}
</div>
```

## 📱 **RESPONSIVE DESIGN**

### **Responsive Utilities**

```tsx
// Use responsive spacing classes
<div className="academic-container">
  <section className="academic-section">
    <h2 className="academic-heading-section">Research</h2>
    {/* Typography automatically scales with clamp() functions */}
  </section>
</div>

// Grid automatically responds to screen size
<div className="academic-grid-responsive">
  {/* Cards stack on mobile, expand on desktop */}
</div>
```

### **Mobile-First Approach**

```css
/* Custom responsive styles */
.custom-element {
  /* Mobile styles first */
  padding: var(--spacing-md);
  font-size: var(--spacing-md);
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: var(--spacing-lg);
    font-size: var(--spacing-lg);
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: var(--spacing-xl);
    font-size: var(--spacing-xl);
  }
}
```

## 🌙 **DARK MODE SUPPORT**

### **Automatic Dark Mode**

```tsx
// Components automatically adapt to dark mode
<div className="academic-card">
  {/* Colors automatically switch based on user preference */}
</div>

// Custom elements with dark mode support
<div className="custom-element">
  {/* Use CSS custom properties for automatic dark mode */}
</div>
```

```css
.custom-element {
  background: var(--academic-slate-50);
  color: var(--academic-slate-700);
  border-color: var(--academic-slate-200);
}

/* Dark mode styles automatically applied via CSS custom properties */
```

## 🚀 **ANIMATION SYSTEM**

### **Performance-Optimized Animations**

```css
/* Use design token timing functions */
.animated-element {
  transition: all var(--duration-normal) var(--easing-standard);
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

### **Built-in Animation Classes**

```tsx
// Fade-in animation
<div className="animate-academic-fade-in">
  {/* Content fades in smoothly */}
</div>

// Slide-in animation
<div className="animate-academic-slide-in">
  {/* Content slides in from bottom */}
</div>

// Pulse glow effect
<div className="animate-pulse-glow">
  {/* Subtle pulsing glow effect */}
</div>
```

## 📊 **BEST PRACTICES**

### **✅ Do's**
- Use semantic HTML elements (`<button>`, `<a>`, `<h1>-<h6>`)
- Apply academic classes for consistent styling
- Use responsive spacing tokens for fluid layouts
- Implement proper ARIA attributes for accessibility
- Test with keyboard navigation and screen readers
- Use design tokens instead of hardcoded values

### **❌ Don'ts**
- Don't mix academic classes with conflicting utility classes
- Don't skip heading levels in semantic hierarchy
- Don't use `<div>` for interactive elements
- Don't hardcode colors, spacing, or font sizes
- Don't ignore focus management for custom components
- Don't create animations without reduced motion support

### **Example: Complete Component Implementation**

```tsx
// ✅ Proper implementation
export const ResearchCard: React.FC<ResearchCardProps> = ({ 
  title, 
  description, 
  link 
}) => {
  return (
    <article className="academic-card academic-card--interactive">
      <header className="academic-card__header">
        <h3 className="academic-heading-4">{title}</h3>
      </header>
      
      <div className="academic-card__body">
        <p className="academic-body">{description}</p>
      </div>
      
      <footer className="academic-card__footer">
        <a 
          href={link}
          className="academic-button academic-button--secondary"
          aria-label={`Learn more about ${title}`}
        >
          Learn More
        </a>
      </footer>
    </article>
  );
};
```

## 🔧 **DEVELOPMENT WORKFLOW**

### **1. Start with Semantic HTML**
```tsx
// Begin with proper semantic structure
<article>
  <header>
    <h2>Title</h2>
  </header>
  <main>
    <p>Content</p>
  </main>
  <footer>
    <button>Action</button>
  </footer>
</article>
```

### **2. Apply Academic Classes**
```tsx
// Add academic design system classes
<article className="academic-card">
  <header className="academic-card__header">
    <h2 className="academic-heading-4">Title</h2>
  </header>
  <main className="academic-card__body">
    <p className="academic-body">Content</p>
  </main>
  <footer className="academic-card__footer">
    <button className="academic-button academic-button--primary">
      Action
    </button>
  </footer>
</article>
```

### **3. Add Accessibility Features**
```tsx
// Enhance with proper ARIA and keyboard support
<article 
  className="academic-card academic-card--interactive"
  role="article"
  aria-labelledby="card-title"
>
  <header className="academic-card__header">
    <h2 id="card-title" className="academic-heading-4">Title</h2>
  </header>
  <main className="academic-card__body">
    <p className="academic-body">Content</p>
  </main>
  <footer className="academic-card__footer">
    <button 
      className="academic-button academic-button--primary"
      aria-label="Perform action for Title"
    >
      Action
    </button>
  </footer>
</article>
```

---

**🎉 Ready to Build!**  
This design system provides a solid foundation for creating accessible, responsive, and beautiful academic interfaces. All components are optimized for performance and follow modern web standards.

*For questions or additional component needs, refer to the design system documentation or create new components following these established patterns.* 