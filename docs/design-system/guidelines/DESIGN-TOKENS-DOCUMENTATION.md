# 🎨 Design Tokens Documentation
**Academic Portfolio Design System**

## 📋 **OVERVIEW**

Design tokens are the atomic design decisions that make up the visual design language. This document provides comprehensive documentation of all design tokens used in the academic portfolio design system.

## 🎨 **COLOR TOKENS**

### **Primary Palette**
```css
:root {
  /* Primary Navy - Main brand color */
  --color-primary-navy: #1e3a8a;
  --color-primary-navy-light: #3b82f6;
  --color-primary-navy-dark: #1e40af;
  
  /* Academic Green - Secondary brand color */
  --color-academic-green: #059669;
  --color-academic-green-light: #10b981;
  --color-academic-green-dark: #047857;
  
  /* Accent Burgundy */
  --color-accent-burgundy: #be123c;
  --color-accent-burgundy-light: #e11d48;
  --color-accent-burgundy-dark: #9f1239;
  
  /* Accent Gold */
  --color-accent-gold: #d97706;
  --color-accent-gold-light: #f59e0b;
  --color-accent-gold-dark: #b45309;
}
```

### **Semantic Colors**
```css
:root {
  --color-success: var(--color-academic-green);
  --color-warning: var(--color-accent-gold);
  --color-error: var(--color-accent-burgundy);
  --color-info: var(--color-primary-navy);
}
```

## 📐 **SPACING TOKENS**

```css
:root {
  --spacing-xs: 0.25rem;     /* 4px */
  --spacing-sm: 0.5rem;      /* 8px */
  --spacing-md: 1rem;        /* 16px */
  --spacing-lg: 1.5rem;      /* 24px */
  --spacing-xl: 2rem;        /* 32px */
  --spacing-2xl: 3rem;       /* 48px */
  --spacing-3xl: 4rem;       /* 64px */
  --spacing-4xl: 5rem;       /* 80px */
  --spacing-5xl: 6rem;       /* 96px */
}
```

## 🔤 **TYPOGRAPHY TOKENS**

```css
:root {
  /* Font Families */
  --font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-family-serif: 'Merriweather', Georgia, serif;
  
  /* Font Sizes */
  --font-size-xs: clamp(0.75rem, 1vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 1.2vw, 1rem);
  --font-size-base: clamp(1rem, 1.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 2vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 2.5vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 3vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 4vw, 2.5rem);
  --font-size-4xl: clamp(2.25rem, 5vw, 3rem);
  --font-size-5xl: clamp(3rem, 6vw, 4rem);
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  --line-height-loose: 2;
}
```

## ⏱️ **ANIMATION TOKENS**

```css
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-micro: 75ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-moderate: 500ms;
  --duration-slow: 700ms;
  --duration-slower: 1000ms;
  
  /* Semantic Durations */
  --duration-feedback: var(--duration-fast);
  --duration-transition: var(--duration-normal);
  --duration-animation: var(--duration-moderate);
  --duration-emphasis: var(--duration-slow);
  
  /* Easing Functions */
  --easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
  --easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
  --easing-sharp: cubic-bezier(0.4, 0.0, 0.6, 1);
  --easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1);
  --easing-academic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## 🎭 **SHADOW TOKENS**

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Academic Shadows */
  --shadow-academic: 0 4px 12px rgba(30, 58, 138, 0.08);
  --shadow-academic-lg: 0 10px 24px rgba(30, 58, 138, 0.12);
  --shadow-focus: 0 0 0 3px rgba(30, 58, 138, 0.1);
}
```

## 🔄 **BORDER RADIUS TOKENS**

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;      /* 2px */
  --radius-base: 0.25rem;     /* 4px */
  --radius-md: 0.375rem;      /* 6px */
  --radius-lg: 0.5rem;        /* 8px */
  --radius-xl: 0.75rem;       /* 12px */
  --radius-2xl: 1rem;         /* 16px */
  --radius-3xl: 1.5rem;       /* 24px */
  --radius-full: 9999px;
  
  /* Component Radii */
  --radius-academic-card: var(--radius-xl);
  --radius-academic-button: var(--radius-md);
  --radius-academic-input: var(--radius-md);
}
```

## 📱 **BREAKPOINT TOKENS**

```css
:root {
  --breakpoint-sm: 640px;      /* Tablet portrait */
  --breakpoint-md: 768px;      /* Tablet landscape */
  --breakpoint-lg: 1024px;     /* Desktop */
  --breakpoint-xl: 1280px;     /* Large desktop */
  --breakpoint-2xl: 1536px;    /* Ultra-wide */
}
```

## 📋 **TOKEN USAGE GUIDELINES**

### **Naming Convention**
```
--{category}-{property}-{variant}-{modifier}
```

### **Examples**
- `--color-primary-navy-300` (Color token)
- `--spacing-component-lg` (Spacing token)
- `--font-size-3xl` (Typography token)
- `--duration-transition` (Animation token)

### **Best Practices**
1. Always use tokens instead of hardcoded values
2. Use semantic tokens when possible
3. Follow naming conventions consistently
4. Test color contrast ratios
5. Consider dark mode implications

### **Implementation Example**
```css
/* ✅ Correct usage */
.academic-card {
  background: var(--color-academic-slate-50);
  padding: var(--spacing-lg);
  border-radius: var(--radius-academic-card);
  box-shadow: var(--shadow-academic);
  transition: all var(--duration-transition) var(--easing-standard);
}

/* ❌ Avoid hardcoded values */
.card {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 300ms ease;
}
```

---

*These design tokens ensure consistency, maintainability, and scalability across the academic portfolio design system.*
