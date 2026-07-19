window.renderBlog = function (container) {
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
    <div id="blogList" class="blog-grid">' + skeleton + '</div>'

  fetch('blog/index.json')
    .then(function (r) { return r.json() })
    .then(function (posts) {
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
      document.getElementById('blogList').innerHTML = html
    })
    .catch(function () {
      document.getElementById('blogList').innerHTML = '<p style="color:var(--text-muted);text-align:center">暂无文章</p>'
    })
}

window.loadBlogPost = function (slug) {
  var reader = document.getElementById('blogReader')
  var mainContent = document.getElementById('mainContent')
  var contentDiv = document.getElementById('readerContent')
  var titleBar = document.getElementById('readerTitle')

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

  fetch('blog/index.json')
    .then(function (r) { return r.json() })
    .then(function (posts) {
      var found = null
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].slug === slug) { found = posts[i]; break }
      }
      if (!found) throw new Error('not found')
      return found
    })
    .then(function (meta) {
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

      return fetch('blog/posts/' + meta.filename).then(function (r) { return r.text() })
    })
    .then(function (md) {
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
    })
    .catch(function () {
      contentDiv.innerHTML = '<p style="color:var(--text-muted);text-align:center">文章加载失败</p>'
    })
}

window.closeBlogReader = function () {
  var reader = document.getElementById('blogReader')
  var mainContent = document.getElementById('mainContent')
  reader.style.display = 'none'
  mainContent.style.display = ''
  document.title = 'renigman · 生物信息学'
  document.querySelector('meta[name="description"]').setAttribute('content', 'renigman · 生物信息学个人主页')
  history.replaceState(null, '', '#blog')
}
