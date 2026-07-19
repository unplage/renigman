;(function () {
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
  }

  function initTheme() {
    var saved = localStorage.getItem('theme')
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (saved) {
      document.documentElement.setAttribute('data-theme', saved)
    } else if (!prefersDark) {
      document.documentElement.setAttribute('data-theme', 'light')
    }

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
        link.classList.toggle('active', href === '#' + current)
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
