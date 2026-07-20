var CACHE_NAME = 'renigman-v2'

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
  'manifest.json',
  'feed.xml',
  'sitemap.xml',
  'blog/index.json',
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME })
          .map(function (key) { return caches.delete(key) })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url)

  if (url.pathname.includes('/blog/')) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        var fetched = fetch(event.request).then(function (response) {
          if (response && response.status === 200) {
            var copy = response.clone()
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy)
            })
          }
          return response
        })
        return cached || fetched
      })
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fetched = fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var copy = response.clone()
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, copy)
          })
        }
        return response
      })
      return cached || fetched
    })
  )
})
