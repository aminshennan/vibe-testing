// Service Worker for Academic Portfolio PWA
const CACHE_NAME = 'dr-mitchell-portfolio-v1'
const RUNTIME_CACHE_NAME = 'dr-mitchell-runtime-v1'

// Cache different types of assets with different strategies
const STATIC_ASSETS = [
  '/',
  '/research',
  '/publications',
  '/contact',
  '/teaching',
  '/cv',
  '/manifest.json',
]

// Assets to cache on installation
const INSTALL_CACHE_ASSETS = [
  '/',
  '/research',
  '/publications',
  '/offline', // We'll create this page
]

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching install assets')
        return cache.addAll(INSTALL_CACHE_ASSETS)
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete')
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Delete old caches
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE_NAME
            })
            .map((cacheName) => {
              console.log(`🗑️ Service Worker: Deleting old cache ${cacheName}`)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete')
        // Ensure the service worker takes control immediately
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  const { request } = event
  const url = new URL(request.url)

  // Strategy for academic content pages
  if (isAcademicContentRequest(url)) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Strategy for static assets (images, CSS, JS)
  if (isStaticAssetRequest(url)) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Strategy for API requests
  if (isApiRequest(url)) {
    event.respondWith(networkFirst(request))
    return
  }

  // Default strategy for other requests
  event.respondWith(staleWhileRevalidate(request))
})

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE_NAME)
      await cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return getOfflineFallback(request)
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE_NAME)
      await cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('Network first failed, trying cache:', error)
    const cachedResponse = await caches.match(request)
    return cachedResponse || getOfflineFallback(request)
  }
}

async function staleWhileRevalidate(request) {
  try {
    const cache = await caches.open(RUNTIME_CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    // Fetch fresh version in background
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })

    // Return cached version immediately if available
    return cachedResponse || await fetchPromise
  } catch (error) {
    console.error('Stale while revalidate failed:', error)
    return getOfflineFallback(request)
  }
}

// Helper functions to categorize requests
function isAcademicContentRequest(url) {
  const academicPaths = ['/research', '/publications', '/teaching', '/cv', '/contact']
  return academicPaths.some(path => url.pathname.startsWith(path))
}

function isStaticAssetRequest(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.woff', '.woff2']
  return staticExtensions.some(ext => url.pathname.endsWith(ext))
}

function isApiRequest(url) {
  return url.pathname.startsWith('/api') || url.pathname.startsWith('/_next/static')
}

// Offline fallback
async function getOfflineFallback(request) {
  const cache = await caches.open(CACHE_NAME)
  
  // For navigation requests, return offline page
  if (request.mode === 'navigate') {
    return await cache.match('/offline') || new Response(
      '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  // For other requests, return a simple offline response
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered', event.tag)
  
  if (event.tag === 'contact-form-submission') {
    event.waitUntil(syncContactFormSubmissions())
  }
  
  if (event.tag === 'analytics-events') {
    event.waitUntil(syncAnalyticsEvents())
  }
})

// Background sync handlers
async function syncContactFormSubmissions() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions()
    
    for (const submission of pendingSubmissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submission.data)
        })
        
        if (response.ok) {
          await removePendingSubmission(submission.id)
          console.log('✅ Contact form submission synced successfully')
        }
      } catch (error) {
        console.error('❌ Failed to sync contact form submission:', error)
      }
    }
  } catch (error) {
    console.error('❌ Background sync failed:', error)
  }
}

async function syncAnalyticsEvents() {
  try {
    // Sync any pending analytics events
    const pendingEvents = await getPendingAnalyticsEvents()
    
    for (const event of pendingEvents) {
      try {
        // Send to analytics service
        await sendAnalyticsEvent(event.data)
        await removePendingAnalyticsEvent(event.id)
        console.log('✅ Analytics event synced successfully')
      } catch (error) {
        console.error('❌ Failed to sync analytics event:', error)
      }
    }
  } catch (error) {
    console.error('❌ Analytics sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('📩 Service Worker: Push notification received')
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'academic-update',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ],
    data: {
      url: '/',
      timestamp: Date.now()
    }
  }

  event.waitUntil(
    self.registration.showNotification('Dr. Sarah Mitchell - Academic Portfolio', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Service Worker: Notification clicked', event.action)
  
  event.notification.close()
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    )
  }
})

// Academic-specific features
self.addEventListener('message', (event) => {
  console.log('💬 Service Worker: Message received', event.data)
  
  if (event.data && event.data.type === 'CACHE_ACADEMIC_CONTENT') {
    event.waitUntil(cacheAcademicContent(event.data.urls))
  }
  
  if (event.data && event.data.type === 'PREFETCH_RESEARCH_DATA') {
    event.waitUntil(prefetchResearchData())
  }
})

async function cacheAcademicContent(urls) {
  try {
    const cache = await caches.open(RUNTIME_CACHE_NAME)
    await cache.addAll(urls)
    console.log('✅ Academic content cached successfully')
  } catch (error) {
    console.error('❌ Failed to cache academic content:', error)
  }
}

async function prefetchResearchData() {
  try {
    // Prefetch research and publication data
    const researchUrls = ['/api/research', '/api/publications']
    const cache = await caches.open(RUNTIME_CACHE_NAME)
    
    for (const url of researchUrls) {
      try {
        const response = await fetch(url)
        if (response.ok) {
          await cache.put(url, response)
        }
      } catch (error) {
        console.error(`Failed to prefetch ${url}:`, error)
      }
    }
    
    console.log('✅ Research data prefetched successfully')
  } catch (error) {
    console.error('❌ Failed to prefetch research data:', error)
  }
}

// Placeholder functions for IndexedDB operations
// These would be implemented with proper IndexedDB handling
async function getPendingSubmissions() {
  // Implementation would use IndexedDB to get pending form submissions
  return []
}

async function removePendingSubmission(id) {
  // Implementation would remove the submission from IndexedDB
  return true
}

async function getPendingAnalyticsEvents() {
  // Implementation would use IndexedDB to get pending analytics events
  return []
}

async function removePendingAnalyticsEvent(id) {
  // Implementation would remove the event from IndexedDB
  return true
}

async function sendAnalyticsEvent(data) {
  // Implementation would send analytics event to service
  return true
}

console.log('🎓 Dr. Mitchell Academic Portfolio Service Worker loaded') 