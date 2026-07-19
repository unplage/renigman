window.renderBlog = function (container) {
  const data = CONTENT.blog
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Blog</span>
      <h2 class="section-title">技术博客</h2>
      <p class="section-subtitle">生信技术分享与思考</p>
    </div>
    <div class="blog-grid">
      ${data.map(post => `
        <div class="glass-card blog-card">
          <div class="blog-date">${post.date}</div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="#" class="blog-read-more">
            阅读更多
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      `).join('')}
    </div>
  `
}
