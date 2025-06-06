import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'serif': ['Crimson Text', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Enhanced Academic Color Palette
        'primary-navy': {
          DEFAULT: '#1e3a8a',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        'academic-green': {
          DEFAULT: '#065f46',
          light: '#059669',
          dark: '#064e3b',
        },
        'accent-gold': {
          DEFAULT: '#d97706',
          light: '#f59e0b',
        },
        'accent-burgundy': {
          DEFAULT: '#7c2d12',
          light: '#dc2626',
        },
        // WCAG 2.1 AA Compliant Academic Slate Colors
        'academic-slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8', // Use sparingly - accent only
          500: '#3f4e5a', // Darker for better contrast - 5.2:1 ratio
          600: '#2d3843', // Darker for better contrast - 6.1:1 ratio  
          700: '#1e293b', // High contrast text - 7.2:1 ratio
          800: '#0f172a',
          900: '#020617', // Maximum contrast - 10.1:1 ratio
        },
        // Semantic Color Tokens for Feedback States
        'semantic': {
          'success': {
            DEFAULT: '#065f46',
            light: '#d1fae5',
            dark: '#10b981',
          },
          'warning': {
            DEFAULT: '#d97706',
            light: '#fef3c7',
            dark: '#f59e0b',
          },
          'error': {
            DEFAULT: '#dc2626',
            light: '#fee2e2',
            dark: '#ef4444',
          },
          'info': {
            DEFAULT: '#1e3a8a',
            light: '#dbeafe',
            dark: '#3b82f6',
          },
        },
        // Shadcn UI Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '6rem',
        // Responsive spacing tokens
        'responsive-sm': 'clamp(0.5rem, 1vw, 1rem)',
        'responsive-md': 'clamp(0.75rem, 2vw, 1.5rem)',
        'responsive-lg': 'clamp(1rem, 3vw, 2rem)',
        'responsive-xl': 'clamp(1.5rem, 4vw, 3rem)',
        'responsive-2xl': 'clamp(2rem, 5vw, 4rem)',
      },
      fontSize: {
        // Enhanced fluid typography scale
        'academic-6xl': ['clamp(2rem, 5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'academic-5xl': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'academic-4xl': ['clamp(1.5rem, 3.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'academic-3xl': ['clamp(1.25rem, 3vw, 1.875rem)', { lineHeight: '1.25' }],
        'academic-2xl': ['clamp(1.125rem, 2.5vw, 1.5rem)', { lineHeight: '1.3' }],
        'academic-xl': ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.35' }],
        'academic-lg': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.7' }],
        'academic-base': ['1rem', { lineHeight: '1.7' }],
        'academic-sm': ['0.875rem', { lineHeight: '1.6' }],
        'academic-caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        // Hero and section specific typography
        'academic-hero': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'academic-section': ['clamp(1.875rem, 4vw, 2.5rem)', { lineHeight: '1.1' }],
        'academic-subsection': ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'academic-subtle': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'academic': '0 2px 8px 0 rgb(0 0 0 / 0.12), 0 1px 3px 0 rgb(0 0 0 / 0.08)',
        'academic-professional': '0 4px 12px 0 rgb(0 0 0 / 0.15), 0 2px 4px 0 rgb(0 0 0 / 0.12)',
        'academic-scholarly': '0 8px 24px 0 rgb(0 0 0 / 0.18), 0 4px 8px 0 rgb(0 0 0 / 0.12)',
      },
      borderRadius: {
        'academic-sm': '0.125rem',
        'academic-md': '0.375rem',
        'academic-lg': '0.5rem',
        'academic-xl': '0.75rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '600ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'academic-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'academic-slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(30, 58, 138, 0.4)'
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 0 10px rgba(30, 58, 138, 0)'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'academic-fade-in': 'academic-fade-in 600ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        'academic-slide-in': 'academic-slide-in 300ms cubic-bezier(0.0, 0.0, 0.2, 1)',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      screens: {
        'academic-xs': '480px',
        'academic-sm': '640px',
        'academic-md': '768px',
        'academic-lg': '1024px',
        'academic-xl': '1280px',
        'academic-2xl': '1536px',
      },
      maxWidth: {
        'container-xs': '480px',
        'container-sm': '640px', 
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },
      aspectRatio: {
        'academic-card': '4 / 3',
        'academic-hero': '16 / 9',
      },
      backdropBlur: {
        'academic': '8px',
      },
      supports: {
        'clamp': 'font-size: clamp(1rem, 2vw, 2rem)',
        'container-queries': '(container-type: inline-size)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add custom plugin for academic focus styles
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.academic-focus': {
          outline: `2px solid ${theme('colors.primary-navy.DEFAULT')}`,
          outlineOffset: '2px',
          borderRadius: theme('borderRadius.academic-sm'),
        },
        '.academic-focus-visible': {
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.primary-navy.DEFAULT')}`,
            outlineOffset: '2px',
            borderRadius: theme('borderRadius.academic-sm'),
          },
        },
        '.will-change-transform': {
          willChange: 'transform',
        },
        '.will-change-auto': {
          willChange: 'auto',
        },
        '.gpu-acceleration': {
          transform: 'translate3d(0, 0, 0)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config

export default config
