;(function () {
  var blogPostsCache = []
  var searchTimer = null

  function init() {
    var sections = {
      hero: document.querySelector('#hero'),
      about: document.querySelector('#about'),
      skills: document.querySelector('#skills'),
      projects: document.querySelector('#projects'),
      experience: document.querySelector('#experience'),
      blog: document.querySelector('#blog'),
      contact: document.querySelector('#contact'),
    }

    window.renderHero(sections.hero)
    window.renderAbout(sections.about)
    window.renderSkills(sections.skills)
    window.renderProjects(sections.projects)
    window.renderExperience(sections.experience)
    window.renderBlog(sections.blog)
    window.renderContact(sections.contact)

    initTheme()
    initNav()
    initScrollAnimations()
    initRouter()
    initKeyboard()
    initSearch()

    document.getElementById('readerClose').addEventListener('click', function () {
      window.closeBlogReader()
      if (!window.__blogShowingAll) {
        history.replaceState(null, '', '#blog')
        var blogSection = document.getElementById('blog')
        if (blogSection) blogSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
    document.getElementById('allBlogsClose').addEventListener('click', function () {
      window.__blogShowingAll = false
      document.getElementById('blogFullList').style.display = 'none'
      document.getElementById('mainContent').style.display = ''
      history.replaceState(null, '', '#blog')
      document.getElementById('blog').scrollIntoView({ behavior: 'smooth' })
    })
  }

  function initTheme() {
    var btn = document.getElementById('themeToggle')
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme')
        var next = current === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem('theme', next)
      })
    }
  }

  function initNav() {
    var menuToggle = document.getElementById('menuToggle')
    var navLinks = document.getElementById('navLinks')

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open')
      })
      navLinks.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open')
        })
      })
    }

    var links = document.querySelectorAll('.nav-link')
    var sections = document.querySelectorAll('.section[id]')

    function updateActive() {
      var current = ''
      sections.forEach(function (section) {
        var top = section.offsetTop - 120
        if (window.scrollY >= top) {
          current = section.getAttribute('id')
        }
      })
      links.forEach(function (link) {
        var href = link.getAttribute('href')
        var isActive = href === '#' + current
        link.classList.toggle('active', isActive)
        if (isActive) {
          link.setAttribute('aria-current', 'page')
        } else {
          link.removeAttribute('aria-current')
        }
      })
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
  }

  function initScrollAnimations() {
    var sections = document.querySelectorAll('.section')
    var skillSection = document.querySelector('#skills')

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          if (entry.target === skillSection) {
            setTimeout(window.animateSkills, 200)
          }
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    })

    sections.forEach(function (section) {
      observer.observe(section)
    })
  }

  function initRouter() {
    function handleHash() {
      var hash = window.location.hash.slice(1)

      if (hash === 'blog/all') {
        window.showAllBlogs()
        document.getElementById('navbar').style.display = ''
        return
      }

      if (hash.indexOf('blog/') === 0) {
        var slug = hash.slice(5)
        if (slug) {
          if (window.__blogShowingAll) {
            document.getElementById('blogFullList').style.display = 'none'
          }
          window.loadBlogPost(slug)
          document.getElementById('navbar').style.display = ''
          return
        }
      }

      window.__blogShowingAll = false
      window.closeBlogReader()
      document.getElementById('blogFullList').style.display = 'none'
      if (hash) {
        var target = document.getElementById(hash)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHash)

    if (window.location.hash.indexOf('#blog/') === 0) {
      setTimeout(handleHash, 100)
    }
  }

  function initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
      if (e.key === 'Escape') {
        var overlay = document.getElementById('searchOverlay')
        if (overlay.style.display !== 'none') {
          closeSearch(); return
        }
        var fullList = document.getElementById('blogFullList')
        if (fullList.style.display !== 'none') {
          window.__blogShowingAll = false
          fullList.style.display = 'none'
          document.getElementById('mainContent').style.display = ''
          history.replaceState(null, '', '#')
          return
        }
        var reader = document.getElementById('blogReader')
        if (reader.style.display !== 'none') {
          window.closeBlogReader()
        }
      }
    })
  }

  function initSearch() {
    window.getBlogIndex()
      .then(function (posts) {
        blogPostsCache = posts
        document.getElementById('searchInput').addEventListener('input', function () {
          clearTimeout(searchTimer)
          var self = this
          searchTimer = setTimeout(function () {
            var q = self.value.toLowerCase().trim()
            if (!q) { document.getElementById('searchResults').innerHTML = ''; return }
            var results = blogPostsCache.filter(function (p) {
              return p.title.toLowerCase().indexOf(q) !== -1 ||
                     p.excerpt.toLowerCase().indexOf(q) !== -1 ||
                     p.tags.some(function (t) { return t.toLowerCase().indexOf(q) !== -1 })
            })
            renderSearchResults(results)
          }, 200)
        })
      })
  }

  function toggleSearch() {
    var overlay = document.getElementById('searchOverlay')
    if (overlay.style.display === 'none') {
      overlay.style.display = ''
      document.getElementById('searchInput').value = ''
      document.getElementById('searchResults').innerHTML = ''
      setTimeout(function () { document.getElementById('searchInput').focus() }, 100)
    } else {
      closeSearch()
    }
  }

  function closeSearch() {
    document.getElementById('searchOverlay').style.display = 'none'
  }

  function renderSearchResults(results) {
    var container = document.getElementById('searchResults')
    if (results.length === 0) {
      container.innerHTML = '<div class="search-empty">无匹配结果</div>'
      return
    }
    var MAX_RESULTS = 20
    var showed = results.slice(0, MAX_RESULTS)
    container.innerHTML = showed.map(function (p) {
      return '\
        <a href="#blog/' + p.slug + '" class="search-result-item" onclick="closeSearch()">\
          <div class="search-result-title">' + p.title + '</div>\
          <div class="search-result-excerpt">' + p.excerpt + '</div>\
        </a>'
    }).join('')
    if (results.length > MAX_RESULTS) {
      container.insertAdjacentHTML('beforeend', '\
        <div style="padding:8px 20px;font-size:0.82rem;color:var(--text-muted)">\
          共 ' + results.length + ' 条结果，显示前 ' + MAX_RESULTS + ' 条\
        </div>')
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
