window.renderAbout = function (container) {
  const d = CONTENT.about
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">${d.tag}</span>
      <h2 class="section-title">${d.title}</h2>
      <p class="section-subtitle">${d.subtitle}</p>
    </div>
    <div class="about-grid">
      <div class="glass-card">
        <h3 class="glass-card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          个人简介
        </h3>
        <p class="glass-card-text">${d.intro}</p>
      </div>
      <div class="about-stats">
        ${d.stats.map(s => `
          <div class="glass-card stat-card">
            <div class="stat-number">${s.number}</div>
            <div class="stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}
