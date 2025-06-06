# Accessibility & PWA Enhancement Todo List

## Overview
Advanced accessibility innovations and Progressive Web App features that establish the academic portfolio as a leader in inclusive design and modern web capabilities.

## 📋 Table of Contents
- [Advanced Accessibility Features](#advanced-accessibility-features)
- [Progressive Web App Implementation](#progressive-web-app-implementation)
- [Inclusive Design Patterns](#inclusive-design-patterns)
- [Performance Accessibility](#performance-accessibility)

---

## ♿ Advanced Accessibility Features

### P0 - Critical Accessibility Enhancements

#### High Contrast Mode Implementation
```typescript
// hooks/use-high-contrast.ts
const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsHighContrast(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev)
    document.documentElement.classList.toggle('high-contrast', !isHighContrast)
  }

  return { isHighContrast, toggleHighContrast }
}
```

```css
/* High contrast mode styles */
.high-contrast {
  --primary-navy: #000000;
  --academic-green: #000000;
  --accent-gold: #ffff00;
  --accent-burgundy: #ff0000;
  --academic-slate-700: #000000;
  --academic-slate-200: #cccccc;
  --academic-slate-50: #ffffff;
}

.high-contrast .academic-card {
  border: 2px solid #000000;
  background: #ffffff;
}
```

#### Screen Reader Optimization
```typescript
// components/accessibility/screen-reader-content.tsx
interface ScreenReaderContentProps {
  children: React.ReactNode
  announce?: boolean
  priority?: 'polite' | 'assertive'
}

const ScreenReaderContent = ({ children, announce = false, priority = 'polite' }: ScreenReaderContentProps) => {
  const [shouldAnnounce, setShouldAnnounce] = useState(announce)

  useEffect(() => {
    if (announce) {
      setShouldAnnounce(true)
      const timer = setTimeout(() => setShouldAnnounce(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [announce])

  return (
    <>
      <span className="sr-only">{children}</span>
      {shouldAnnounce && (
        <div aria-live={priority} aria-atomic="true" className="sr-only">
          {children}
        </div>
      )}
    </>
  )
}
```

#### Keyboard Navigation Enhancement
```typescript
// hooks/use-keyboard-navigation.ts
interface KeyboardNavigationConfig {
  container: RefObject<HTMLElement>
  items: string
  loop?: boolean
  orientation?: 'horizontal' | 'vertical' | 'both'
}

const useKeyboardNavigation = ({ container, items, loop = true, orientation = 'both' }: KeyboardNavigationConfig) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const containerEl = container.current
    if (!containerEl) return

    const focusableItems = containerEl.querySelectorAll(items) as NodeListOf<HTMLElement>

    const handleKeyDown = (e: KeyboardEvent) => {
      let newIndex = currentIndex

      switch (e.key) {
        case 'ArrowDown':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            newIndex = currentIndex + 1
          }
          break
        case 'ArrowUp':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            newIndex = currentIndex - 1
          }
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = focusableItems.length - 1
          break
      }

      if (loop) {
        if (newIndex >= focusableItems.length) newIndex = 0
        if (newIndex < 0) newIndex = focusableItems.length - 1
      } else {
        newIndex = Math.max(0, Math.min(newIndex, focusableItems.length - 1))
      }

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
        focusableItems[newIndex]?.focus()
      }
    }

    containerEl.addEventListener('keydown', handleKeyDown)
    return () => containerEl.removeEventListener('keydown', handleKeyDown)
  }, [container, items, currentIndex, loop, orientation])

  return { currentIndex, setCurrentIndex }
}
```

### P1 - Enhanced Accessibility Features

#### Focus Management System
```typescript
// components/accessibility/focus-manager.tsx
interface FocusManagerProps {
  children: React.ReactNode
  restoreFocus?: boolean
  trapFocus?: boolean
}

const FocusManager = ({ children, restoreFocus = true, trapFocus = false }: FocusManagerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }

    return () => {
      if (restoreFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [restoreFocus])

  useEffect(() => {
    if (!trapFocus || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => container.removeEventListener('keydown', handleTabKey)
  }, [trapFocus])

  return (
    <div ref={containerRef} className="focus-manager">
      {children}
    </div>
  )
}
```

---

## 📱 Progressive Web App Implementation

### P0 - Core PWA Features

#### Service Worker Implementation
```javascript
// public/sw.js
const CACHE_NAME = 'academic-portfolio-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

const STATIC_ASSETS = [
  '/',
  '/research',
  '/publications',
  '/teaching',
  '/cv',
  '/contact',
  '/offline',
  '/manifest.json'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Fetch event with network-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Static assets - cache first
  if (STATIC_ASSETS.some(asset => request.url.endsWith(asset))) {
    event.respondWith(
      caches.match(request)
        .then(response => response || fetch(request))
    )
    return
  }

  // Other requests - stale while revalidate
  event.respondWith(
    caches.match(request)
      .then(response => {
        const fetchPromise = fetch(request)
          .then(fetchResponse => {
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, fetchResponse.clone()))
            return fetchResponse
          })
        
        return response || fetchPromise
      })
      .catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/offline')
        }
      })
  )
})
```

#### PWA Installation Prompt
```typescript
// components/pwa/install-prompt.tsx
const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setShowInstallPrompt(false)
    }
    
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showInstallPrompt || localStorage.getItem('pwa-install-dismissed')) {
    return null
  }

  return (
    <div className="pwa-install-prompt fixed bottom-4 right-4 max-w-sm bg-white/95 backdrop-blur-sm border border-academic-slate-200 rounded-lg shadow-academic p-4 z-50">
      <div className="flex items-start gap-3">
        <div className="pwa-icon p-2 bg-primary-navy/10 rounded-lg">
          <Download className="w-5 h-5 text-primary-navy" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-primary-navy mb-1">Install Academic Portfolio</h3>
          <p className="text-sm text-academic-slate-600 mb-3">
            Get quick access and offline reading capabilities
          </p>
          <div className="flex gap-2">
            <button onClick={handleInstallClick} className="btn-academic-primary btn-sm">
              Install
            </button>
            <button onClick={handleDismiss} className="btn-academic-secondary btn-sm">
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Offline Content Strategy
```typescript
// components/offline/offline-indicator.tsx
const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="offline-indicator fixed top-0 left-0 right-0 bg-accent-burgundy text-white p-2 text-center text-sm z-50">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        <span>You're offline. Some features may be limited.</span>
      </div>
    </div>
  )
}
```

### P1 - Enhanced PWA Features

#### Background Sync Implementation
```typescript
// hooks/use-background-sync.ts
const useBackgroundSync = () => {
  const [pendingActions, setPendingActions] = useState<Array<{
    id: string
    action: string
    data: any
    timestamp: number
  }>>([])

  useEffect(() => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        // Register background sync
        registration.sync.register('background-sync')
      })
    }
  }, [])

  const addPendingAction = (action: string, data: any) => {
    const pendingAction = {
      id: Date.now().toString(),
      action,
      data,
      timestamp: Date.now()
    }

    setPendingActions(prev => [...prev, pendingAction])
    
    // Store in localStorage for persistence
    const stored = JSON.parse(localStorage.getItem('pending-actions') || '[]')
    localStorage.setItem('pending-actions', JSON.stringify([...stored, pendingAction]))
  }

  const processPendingActions = async () => {
    const stored = JSON.parse(localStorage.getItem('pending-actions') || '[]')
    
    for (const action of stored) {
      try {
        await processAction(action)
        // Remove from storage on success
        const remaining = stored.filter((a: any) => a.id !== action.id)
        localStorage.setItem('pending-actions', JSON.stringify(remaining))
      } catch (error) {
        console.error('Failed to process pending action:', error)
      }
    }
  }

  const processAction = async (action: any) => {
    switch (action.action) {
      case 'contact-form':
        return fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        })
      default:
        throw new Error(`Unknown action: ${action.action}`)
    }
  }

  return { addPendingAction, processPendingActions, pendingActions }
}
```

---

## 🎯 Implementation Priority Matrix

### Phase 1: Accessibility Foundation (Week 1-2)
**P0 Critical Items**
- [ ] High Contrast Mode implementation
- [ ] Screen Reader optimization
- [ ] Keyboard Navigation enhancement
- [ ] Focus Management system

### Phase 2: PWA Core Features (Week 3-4)
**P0 Critical Items**
- [ ] Service Worker implementation
- [ ] PWA Installation prompt
- [ ] Offline Content strategy
- [ ] App Manifest optimization

### Phase 3: Advanced Features (Week 5-6)
**P1 High Priority Items**
- [ ] Background sync implementation
- [ ] Advanced offline capabilities
- [ ] Push notification system
- [ ] Performance monitoring

## 🎉 Success Metrics

### Accessibility Metrics
- **WCAG 2.1 AAA Compliance**: 100% across all pages
- **Screen Reader Compatibility**: Perfect scores on NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: 100% functionality without mouse
- **Color Contrast**: Minimum 7:1 ratio in high contrast mode

### PWA Performance
- **Installation Rate**: 25% of returning visitors
- **Offline Usage**: 40% of content accessible offline
- **Load Time**: < 2s on 3G networks
- **App Store Quality**: Lighthouse PWA score > 95

### Inclusive Design Impact
- **User Diversity**: 30% increase in users with accessibility needs
- **Engagement**: 50% longer session duration for assisted users
- **Satisfaction**: 98% positive feedback on accessibility features
- **Professional Recognition**: Industry accessibility award consideration 