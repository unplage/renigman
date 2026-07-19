window.renderExperience = function (container) {
  const data = CONTENT.experience
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Experience</span>
      <h2 class="section-title">科研经历</h2>
      <p class="section-subtitle">从实验室到基因组学前沿</p>
    </div>
    <div class="timeline">
      ${data.map(exp => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">${exp.period}</div>
            <h3 class="timeline-role">${exp.role}</h3>
            <p class="timeline-company">${exp.company}</p>
            <p class="timeline-desc">${exp.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `
}
