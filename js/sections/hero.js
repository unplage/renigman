window.renderHero = function (container) {
  const d = CONTENT.hero
  container.innerHTML = `
    <div class="hero-content">
      <div class="hero-avatar">
        <div class="hero-avatar-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      </div>
      <h1 class="hero-name">${d.name}</h1>
      <p class="hero-title">${d.title}</p>
      <p class="hero-tagline">${d.tagline}</p>
      ${d.badge ? `<div class="hero-badge">${d.badge}</div>` : ''}
      <div class="hero-cta">
        <a href="${d.cta.primary.href}" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          ${d.cta.primary.text}
        </a>
        <a href="${d.cta.secondary.href}" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          ${d.cta.secondary.text}
        </a>
      </div>
    </div>
  `
}
