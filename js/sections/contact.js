window.renderContact = function (container) {
  var d = CONTENT.contact
  container.innerHTML = `
    <div class="section-header">
      <span class="section-tag">Contact</span>
      <h2 class="section-title">联系我</h2>
      <p class="section-subtitle">科研合作 · 学术交流 · 技术探讨</p>
    </div>
    <div class="contact-content">
      <div class="glass-card" style="padding:24px">
        <h3 class="glass-card-title" style="margin-bottom:16px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          联系方式
        </h3>
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div class="contact-label">邮箱</div>
              <div class="contact-value">${d.email}</div>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div class="contact-label">地点</div>
              <div class="contact-value">${d.location}</div>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <div class="contact-label">电话</div>
              <div class="contact-value">${d.phone}</div>
            </div>
          </div>
        </div>
        <div style="margin-top:16px">
          <div style="font-size:0.82rem;font-weight:500;color:var(--text-secondary);margin-bottom:10px">社交媒体</div>
          <div class="social-links">
            <a href="${d.social.github}" class="social-link" target="_blank" rel="noopener" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="${d.social.twitter}" class="social-link" target="_blank" rel="noopener" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="${d.social.linkedin}" class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="${d.social.blog}" class="social-link" target="_blank" rel="noopener" aria-label="博客">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="glass-card" style="padding:24px">
        <h3 class="glass-card-title" style="margin-bottom:16px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          发送消息
        </h3>
        <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
          <div class="form-group">
            <label class="form-label" for="name">姓名</label>
            <input class="form-input" id="name" name="name" type="text" placeholder="你的名字" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="email">邮箱</label>
            <input class="form-input" id="email" name="_replyto" type="email" placeholder="your@email.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="message">消息</label>
            <textarea class="form-textarea" id="message" name="message" placeholder="写下你想说的..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            发送消息
          </button>
        </form>
      </div>
    </div>
  `
}
