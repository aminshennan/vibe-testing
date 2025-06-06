"use client"

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  DownloadIcon, 
  RefreshCwIcon, 
  WifiIcon, 
  WifiOffIcon,
  SmartphoneIcon,
  XIcon
} from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWARegistration() {
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null)

  const handleUpdate = useCallback(async () => {
    if (!serviceWorkerRegistration) return

    try {
      // Skip waiting and reload
      if (serviceWorkerRegistration.waiting) {
        serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
        
        // Listen for the controlling service worker change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload()
        })
      }
    } catch (error) {
      console.error('❌ Update failed:', error)
    }
  }, [serviceWorkerRegistration])

  const registerServiceWorker = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      setServiceWorkerRegistration(registration)

      console.log('🎓 Service Worker registered successfully:', registration)

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true)
              toast.info('📚 New version available!', {
                description: 'A new version of the academic portfolio is ready.',
                action: {
                  label: 'Update Now',
                  onClick: () => handleUpdate()
                }
              })
            }
          })
        }
      })

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          toast.success('📖 Content updated', {
            description: 'Latest academic content has been cached for offline access.'
          })
        }
      })

      // Prefetch academic content
      registration.active?.postMessage({
        type: 'PREFETCH_RESEARCH_DATA'
      })

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  }, [handleUpdate])

  // Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    }
  }, [registerServiceWorker])

  // Online/Offline Status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('🌐 Back online! All features are now available.', {
        description: 'Your connection has been restored.'
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.info('📱 You\'re now offline', {
        description: 'Cached content is still available to browse.'
      })
    }

    // Set initial state
    setIsOnline(navigator.onLine)

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Install Prompt Handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      
      // Show install banner after a delay
      setTimeout(() => {
        setShowInstallBanner(true)
      }, 5000)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallBanner(false)
      setInstallPrompt(null)
      
      toast.success('🎓 Academic Portfolio Installed!', {
        description: 'You can now access Dr. Mitchell\'s portfolio from your home screen.'
      })
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    try {
      await installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt')
      } else {
        console.log('❌ User dismissed the install prompt')
      }
      
      setInstallPrompt(null)
      setShowInstallBanner(false)
    } catch (error) {
      console.error('❌ Installation failed:', error)
    }
  }

  const dismissInstallBanner = () => {
    setShowInstallBanner(false)
    // Store preference in localStorage
    localStorage.setItem('install-banner-dismissed', 'true')
  }

  // Check if install banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('install-banner-dismissed')
    if (dismissed === 'true') {
      setShowInstallBanner(false)
    }
  }, [])

  return (
    <>
      {/* Online/Offline Status Badge */}
      <div className="fixed bottom-4 left-4 z-50">
        <Badge 
          variant={isOnline ? "default" : "secondary"}
          className={`flex items-center gap-2 px-3 py-1 ${
            isOnline 
              ? 'bg-academic-green text-white' 
              : 'bg-academic-slate-500 text-white'
          }`}
        >
          {isOnline ? (
            <>
              <WifiIcon className="w-3 h-3" />
              Online
            </>
          ) : (
            <>
              <WifiOffIcon className="w-3 h-3" />
              Offline
            </>
          )}
        </Badge>
      </div>

      {/* Update Available Notification */}
      {updateAvailable && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="border-academic-green shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-academic-green">
                Update Available
              </CardTitle>
              <CardDescription className="text-xs">
                A new version with improvements is ready to install.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleUpdate}
                  className="bg-academic-green hover:bg-academic-green/90 text-white"
                >
                  <RefreshCwIcon className="w-3 h-3 mr-1" />
                  Update
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setUpdateAvailable(false)}
                >
                  Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Install App Banner */}
      {showInstallBanner && installPrompt && !isInstalled && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <Card className="border-primary-navy shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm text-primary-navy flex items-center gap-2">
                    <SmartphoneIcon className="w-4 h-4" />
                    Install Academic Portfolio
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Add Dr. Mitchell&apos;s portfolio to your home screen for quick access and offline reading.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={dismissInstallBanner}
                  className="p-1 h-auto"
                >
                  <XIcon className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleInstall}
                  className="bg-primary-navy hover:bg-primary-navy/90 text-white"
                >
                  <DownloadIcon className="w-3 h-3 mr-1" />
                  Install
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={dismissInstallBanner}
                >
                  Not Now
                </Button>
              </div>
              <div className="mt-2 text-xs text-academic-slate-600">
                ✨ Works offline • 📱 Native feel • ⚡ Fast loading
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Academic PWA Features Info */}
      {isInstalled && (
        <div className="fixed bottom-16 left-4 z-40">
          <Badge className="bg-primary-navy text-white">
            📱 Installed
          </Badge>
        </div>
      )}
    </>
  )
}

// Hook for PWA utilities
export function usePWA() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if PWA is installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const cacheAcademicContent = (urls: string[]) => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_ACADEMIC_CONTENT',
        urls
      })
    }
  }

  const prefetchResearchData = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PREFETCH_RESEARCH_DATA'
      })
    }
  }

  return {
    isOnline,
    isInstalled,
    cacheAcademicContent,
    prefetchResearchData
  }
} 