var CACHE_PREFIX = 'renigman-'
var CACHE_NAME = CACHE_PREFIX + 'v15'

var PRECACHE_URLS = [
  '.',
  'index.html',
  'css/style.css',
  'js/content.js',
  'js/main.js',
  'js/sections/hero.js',
  'js/sections/about.js',
  'js/sections/skills.js',
  'js/sections/projects.js',
  'js/sections/experience.js',
  'js/sections/blog.js',
  'js/sections/contact.js',
  'icons/icon-192.svg',
  'icons/icon-512.svg',
  'icons/icon-maskable-512.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'manifest.json',
  'feed.xml',
  'sitemap.xml',
  'clear.html',
  'blog/index.json',
  'blog/posts/solution-design.md',
  'blog/posts/3_Periods_Of_History.md',
  'blog/posts/notes_from_kindle.md',
  'blog/posts/reading-plan.md',
  'blog/posts/self-ponder.md',
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        PRECACHE_URLS.map(function (url) {
          return cache.add(new Request(url, { cache: 'reload' })).catch(function (err) {
            console.warn('[sw] precache failed:', url, err)
          })
        })
      )
    }).then(function () {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME
          })
          .map(function (key) { return caches.delete(key) })
      )
    }).then(function () {
      return self.clients.claim()
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data === 'SKIP_WAITING') self.skipWaiting()
})

function offlineFallback() {
  return new Response('Offline and not cached.', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

function staleWhileRevalidate(request) {
  return caches.match(request, { cacheName: CACHE_NAME }).then(function (cached) {
    var fetched = fetch(request).then(function (response) {
      if (response && response.status === 200) {
        var copy = response.clone()
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, copy)
        })
      }
      return response
    }).catch(function () {
      return cached || offlineFallback()
    })
    return cached || fetched
  })
}

function navigationHandler(request) {
  return caches.match('index.html', { cacheName: CACHE_NAME }).then(function (cached) {
    var fetched = fetch(request).then(function (response) {
      if (response && response.status === 200) {
        var copy = response.clone()
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put('index.html', copy)
        })
      }
      return response
    }).catch(function () {
      return cached || offlineFallback()
    })
    return cached || fetched
  })
}

self.addEventListener('fetch', function (event) {
  var request = event.request

  if (request.method !== 'GET') return

  var url = new URL(request.url)
  if (url.origin !== location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(navigationHandler(request))
    return
  }

  event.respondWith(staleWhileRevalidate(request))
})
