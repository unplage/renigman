window.renderProjects = function (container) {
  try {
  const data = CONTENT.projects
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Projects</span>
      <h2 class="section-title">研究成果</h2>
      <p class="section-subtitle">抗体分析 · AI 应用 · 开源工具</p>
    </div>
    <div class="projects-grid">
      ${data.map(p => `
        <div class="glass-card project-card">
          <div class="project-banner">${p.emoji}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tech">
            ${p.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${p.liveUrl}" class="btn btn-primary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              演示
            </a>
            <a href="${p.codeUrl}" class="btn btn-secondary btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              源码
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `
  } catch (e) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">模块加载失败</div>'
    console.error('renderProjects:', e)
  }
}
