# renigman

Pure static personal homepage (HTML+CSS+JS, zero build). GitHub Pages serves from root on push to `main`.

## Quick start

```bash
python3 -m http.server 8080   # no install required
```

## Architecture

- `index.html` — single-page entry; loads all section renderers, `marked.js` from CDN
- `js/content.js` — `const CONTENT = { ... }` holds **all personal data** (hero, about, skills, projects, experience, contact). This is the main file to edit.
- `js/main.js` — app shell: theme toggle, nav scroll-spy, hash router, search (`Ctrl/Cmd+K`), keyboard shortcuts (`Esc` closes reader/search)
- `js/sections/*.js` — `window.renderXxx(el)` functions that populate each section using `CONTENT`
- `css/style.css` — all styles (glassmorphism, dark/light variables, responsive)
- `sw.js` — service worker; update `CACHE_NAME` version string + `PRECACHE_URLS` when assets change
- `blog/index.json` — array of `{ slug, title, date, excerpt, tags, filename }`
- `blog/posts/*.md` — raw Markdown, rendered client-side by `marked.js`
- `clear.html` — PWA cache debug/cleanup helper (open directly in browser)

## Adding a blog post

1. Create `blog/posts/<slug>.md`
2. Add entry to `blog/index.json` (date format `YYYY-MM-DD`)
3. Add `<item>` to `feed.xml`
4. (Optional) Add URL to `sitemap.xml`

## Customization

- Edit `js/content.js` only — changes appear on refresh
- Replace Formspree form ID in `js/sections/contact.js:68` (search `your-form-id`)
- If using a custom domain, update all hardcoded `unplage.github.io/renigman` references in `feed.xml`, `sitemap.xml`, `index.html` (JSON-LD + OG meta), and `js/sections/blog.js` (OG/JSON-LD fallbacks)
- SW: bump `CACHE_NAME` (e.g. `v6`→`v7`) in `sw.js:1` when assets change

## SEO / PWA

- JSON-LD structured data in `index.html` (`Person`) + dynamic `BlogPosting` via `js/sections/blog.js`
- `sitemap.xml`, `feed.xml`, `manifest.json`, `sw.js` all hand-written
- Icons: `icons/icon-192.svg`, `icons/icon-512.svg`

## Constraints

- No build tools, no package.json, no CI, no tests, no linting
- `marked.js` loaded from CDN — internet required for blog rendering. If updating the CDN URL, sync the `integrity` hash in `index.html:149`.
- `Content-Security-Policy` meta tag in `index.html:8` — update if adding external scripts, styles, fonts, or connections
- Search indexes in-memory from `blog/index.json`
- Theme persisted in `localStorage` (key: `theme`)
