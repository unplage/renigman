function fetchWithTimeout(url, ms) {
  return new Promise(function (resolve, reject) {
    var controller = new AbortController()
    setTimeout(function () { controller.abort() }, ms)
    fetch(url, { signal: controller.signal }).then(resolve, reject)
  })
}

window.getBlogIndex = function () {
  if (window.__blogIndexPromise) return window.__blogIndexPromise
  window.__blogIndexPromise = fetchWithTimeout('blog/index.json', 8000).then(function (r) { return r.json() })
  return window.__blogIndexPromise
}

function renderBlogCards(posts, containerId) {
  var html = posts.map(function (p) {
    return '\
      <div class="glass-card blog-card" data-slug="' + p.slug + '">\
        <div class="blog-date">' + p.date + '</div>\
        <h3 class="blog-card-title">' + p.title + '</h3>\
        <p class="blog-excerpt">' + p.excerpt + '</p>\
        <div class="blog-tags">' +
          p.tags.map(function (t) { return '<span class="skill-tag">' + t + '</span>' }).join('') +
        '</div>\
        <a href="#blog/' + p.slug + '" class="blog-read-more">\
          阅读更多\
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\
        </a>\
      </div>'
  }).join('')
  document.getElementById(containerId).innerHTML = html
}

window.renderBlog = function (container) {
  try {
  var skeleton = '\
    <div class="blog-grid">\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
    </div>'

  container.innerHTML = '\
    <div class="section-header">\
      <span class="section-tag">Blog</span>\
      <h2 class="section-title">技术博客</h2>\
      <p class="section-subtitle">生信技术分享与思考</p>\
    </div>\
    <div id="blogList" class="blog-grid">' + skeleton + '</div>\
    <div id="blogMoreWrapper"></div>'

  window.getBlogIndex().then(function (posts) {
    var sorted = posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date) })
    var latest = sorted.slice(0, 6)
    renderBlogCards(latest, 'blogList')

    if (posts.length > 6) {
      document.getElementById('blogMoreWrapper').innerHTML = '\
        <div style="text-align:center;margin-top:24px">\
          <a href="#blog/all" class="btn btn-secondary">\
            显示全部（' + posts.length + ' 篇）\
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\
          </a>\
        </div>'
    }
  }).catch(function () {
    document.getElementById('blogList').innerHTML = '<p style="color:var(--text-muted);text-align:center">暂无文章</p>'
  })
  } catch (e) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">博客模块加载失败</div>'
    console.error('renderBlog:', e)
  }
}

window.showAllBlogs = function () {
  window.__blogShowingAll = true
  document.getElementById('mainContent').style.display = 'none'
  document.getElementById('blogFullList').style.display = ''
  document.getElementById('blogReader').style.display = 'none'
  document.title = '全部文章 · renigman'

  var grid = document.getElementById('allBlogGrid')
  grid.innerHTML = '\
    <div class="blog-grid">\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
      <div class="glass-card blog-card"><div class="skeleton"><div class="skeleton-line" style="width:30%"></div><div class="skeleton-line" style="width:90%"></div><div class="skeleton-line" style="width:60%"></div></div></div>\
    </div>'

  window.getBlogIndex().then(function (posts) {
    var sorted = posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date) })
    renderBlogCards(sorted, 'allBlogGrid')
  }).catch(function () {
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center">加载失败</p>'
  })
}

window.loadBlogPost = function (slug) {
  var reader = document.getElementById('blogReader')
  var mainContent = document.getElementById('mainContent')
  var contentDiv = document.getElementById('readerContent')
  var titleBar = document.getElementById('readerTitle')

  document.getElementById('blogFullList').style.display = 'none'
  reader.style.display = ''
  mainContent.style.display = 'none'
  window.scrollTo(0, 0)

  contentDiv.innerHTML = '\
    <div class="skeleton">\
      <div class="skeleton-line" style="width:60%"></div>\
      <div class="skeleton-line" style="width:40%"></div>\
      <div class="skeleton-line"></div>\
      <div class="skeleton-line"></div>\
      <div class="skeleton-line" style="width:75%"></div>\
    </div>'

  titleBar.textContent = ''

  var sortedPosts = []
  var currentIndex = -1

  var readerBody = document.querySelector('.reader-body')
  var layout = readerBody.querySelector('.reader-layout')
  if (!layout) {
    layout = document.createElement('div')
    layout.className = 'reader-layout'
    readerBody.insertBefore(layout, contentDiv)
    layout.appendChild(contentDiv)
    var tocNav = document.createElement('nav')
    tocNav.id = 'readerToc'
    tocNav.className = 'reader-toc'
    layout.appendChild(tocNav)
  }

  window.getBlogIndex().then(function (posts) {
    var sorted = posts.slice().sort(function (a, b) { return b.date.localeCompare(a.date) })
    sortedPosts = sorted
    var found = null
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].slug === slug) { found = sorted[i]; currentIndex = i; break }
    }
    if (!found) throw new Error('not found')
    return found
  }).then(function (meta) {
    titleBar.textContent = meta.title
    document.title = meta.title + ' · renigman'
    document.querySelector('meta[name="description"]').setAttribute('content', meta.excerpt)

    var ld = document.getElementById('blog-ld')
    if (!ld) {
      ld = document.createElement('script')
      ld.id = 'blog-ld'
      ld.type = 'application/ld+json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': meta.title,
      'description': meta.excerpt,
      'datePublished': meta.date,
      'author': { '@type': 'Person', 'name': 'renigman' },
    })

    var ogTitle = document.querySelector('meta[property="og:title"]')
    var ogDesc = document.querySelector('meta[property="og:description"]')
    var ogUrl = document.querySelector('meta[property="og:url"]')
    var twTitle = document.querySelector('meta[name="twitter:title"]')
    var twDesc = document.querySelector('meta[name="twitter:description"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title + ' · renigman')
    if (ogDesc) ogDesc.setAttribute('content', meta.excerpt)
    if (ogUrl) ogUrl.setAttribute('content', 'https://unplage.github.io/renigman/#blog/' + slug)
    if (twTitle) twTitle.setAttribute('content', meta.title + ' · renigman')
    if (twDesc) twDesc.setAttribute('content', meta.excerpt)

    return fetchWithTimeout('blog/posts/' + meta.filename, 8000).then(function (r) { return r.text() })
  }).then(function (md) {
    if (typeof marked !== 'undefined' && marked.parse) {
      contentDiv.innerHTML = marked.parse(md)
    } else {
      contentDiv.innerHTML = '<pre>' + md.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>'
    }
    contentDiv.querySelectorAll('img').forEach(function (img) { img.loading = 'lazy' })
    contentDiv.querySelectorAll('pre code').forEach(function (block) {
      block.style.display = 'block'
      block.style.overflowX = 'auto'
    })

    contentDiv.querySelectorAll('h2').forEach(function (h2, idx) {
      var baseId = h2.textContent.trim().toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, '')
      if (!baseId) baseId = 'heading-' + idx
      var suffix = ''
      var count = 1
      while (document.getElementById(baseId + suffix)) { suffix = '-' + (count++) }
      h2.id = baseId + suffix
    })

    renderTOC()
    var navHtml = renderPostNav(sortedPosts, currentIndex)
    if (navHtml) contentDiv.insertAdjacentHTML('beforeend', navHtml)
  }).catch(function () {
    contentDiv.innerHTML = '<p style="color:var(--text-muted);text-align:center">文章加载失败</p>'
  })
}

function renderTOC() {
  var toc = document.getElementById('readerToc')
  if (!toc) return
  var headings = document.querySelectorAll('#readerContent h2')
  if (headings.length === 0) {
    toc.style.display = 'none'
    return
  }
  toc.style.display = ''
  var items = []
  headings.forEach(function (h2) {
    items.push('<li class="toc-item"><a href="#" class="toc-link" data-target="' + h2.id + '">' + h2.textContent + '</a></li>')
  })
  toc.innerHTML = '<div class="toc-title">目录</div><ul class="toc-list">' + items.join('') + '</ul>'
  toc.querySelectorAll('.toc-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      var target = document.getElementById(this.getAttribute('data-target'))
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

function renderPostNav(posts, currentIndex) {
  if (!posts || currentIndex < 0) return ''
  var prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  var next = currentIndex > 0 ? posts[currentIndex - 1] : null
  if (!prev && !next) return ''
  var html = '<nav class="post-nav">'
  if (prev) {
    html += '<a href="#blog/' + prev.slug + '" class="post-nav-link post-nav-prev">' +
      '<span class="post-nav-direction">← 上一篇</span>' +
      '<span class="post-nav-title">' + prev.title + '</span></a>'
  }
  if (next) {
    html += '<a href="#blog/' + next.slug + '" class="post-nav-link post-nav-next">' +
      '<span class="post-nav-direction">下一篇 →</span>' +
      '<span class="post-nav-title">' + next.title + '</span></a>'
  }
  html += '</nav>'
  return html
}

window.closeBlogReader = function () {
  var reader = document.getElementById('blogReader')

  reader.style.display = 'none'

  if (window.__blogShowingAll) {
    document.getElementById('blogFullList').style.display = ''
    history.replaceState(null, '', '#blog/all')
  } else {
    document.getElementById('mainContent').style.display = ''
    document.title = 'renigman · 生物信息学'
    document.querySelector('meta[name="description"]').setAttribute('content', 'renigman · 生物信息学个人主页')
    var ogTitle = document.querySelector('meta[property="og:title"]')
    var ogDesc = document.querySelector('meta[property="og:description"]')
    var ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogTitle) ogTitle.setAttribute('content', 'renigman · 生物信息学')
    if (ogDesc) ogDesc.setAttribute('content', 'renigman · 生物信息学个人主页')
    if (ogUrl) ogUrl.setAttribute('content', 'https://unplage.github.io/renigman/')
    var twTitle = document.querySelector('meta[name="twitter:title"]')
    var twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twTitle) twTitle.setAttribute('content', 'renigman · 生物信息学')
    if (twDesc) twDesc.setAttribute('content', 'renigman · 生物信息学个人主页')
  }
}
