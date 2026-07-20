const skillIconMap = {
  code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  server: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  'pen-tool': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
  tool: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  dna: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c-3 0-5 1.5-5 4s2 4 5 4 5-1.5 5-4-2-4-5-4z"/><path d="M12 10c3 0 5 1.5 5 4s-2 4-5 4-5-1.5-5-4 2-4 5-4z"/><line x1="2" y1="2" x2="22" y2="22"/></svg>',
  brain: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26A6.97 6.97 0 0 1 5 9a7 7 0 0 1 7-7z"/><line x1="9" y1="13" x2="9" y2="19"/><line x1="15" y1="13" x2="15" y2="19"/><line x1="12" y1="3" x2="12" y2="11"/><line x1="9" y1="9" x2="15" y2="9"/></svg>',
}

window.renderSkills = function (container) {
  const data = CONTENT.skills
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Skills</span>
      <h2 class="section-title">专业技能</h2>
      <p class="section-subtitle">抗体工程 · 生物信息学 · AI 智能体</p>
    </div>
    <div class="skills-grid">
      ${data.map(cat => `
        <div class="glass-card skill-card">
          <h3 class="glass-card-title">${skillIconMap[cat.icon] || ''} ${cat.category}</h3>
          <div class="skill-tags">
            ${cat.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
          </div>
          <div style="margin-top:16px">
            ${cat.items.map(item => `
              <div style="margin-bottom:12px">
                <div class="skill-header">
                  <span class="skill-name">${item.name}</span>
                  <span class="skill-percent">${item.level}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-fill" data-level="${item.level}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `
}

window.animateSkills = function () {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const level = bar.dataset.level
    bar.style.width = level + '%'
  })
}
