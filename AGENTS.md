# renigman

Pure static personal homepage (HTML+CSS+JS, zero build). GitHub Pages serves from root on push to `main`.

## Quick start

```bash
python3 -m http.server 8080   # no install required
```

Service Worker only registers on `http://localhost` or HTTPS — opening `index.html` via `file://` gives no offline cache.

## Architecture

- `index.html` — single-page entry; loads all section renderers, `marked.js` from CDN
- `js/content.js` — `const CONTENT = { ... }` holds **all personal data** (hero, about, skills, projects, experience, contact). This is the main file to edit.
- `js/main.js` — app shell: theme toggle (also syncs `#themeColorMeta`), nav scroll-spy, hash router, search (`Ctrl/Cmd+K`), keyboard shortcuts (`Esc` closes reader/search)
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
4. Add `<url>` to `sitemap.xml`
5. Add the post path to `PRECACHE_URLS` in `sw.js` and bump `CACHE_NAME` — posts are precached so they stay readable offline

## Adding a project

1. Append an entry to `projects` in `js/content.js`
2. Fields: `title`, `desc`, `tech[]`, `emoji`, `liveUrl`, `codeUrl`, optional `liveLabel` and `tools[]`
3. `liveUrl` should be the deployed GitHub Pages URL; use the repo URL plus `liveLabel: '仓库'` when there is no deployment

## Customization

- Edit `js/content.js` only — changes appear on refresh
- Contact is a `mailto:` link built in `js/sections/contact.js`; no backend form is wired up
- Social links pointing at the same URL as `social.github` are hidden automatically — add a real account URL in `js/content.js` to show them
- If using a custom domain, update all hardcoded `unplage.github.io/renigman` references in `feed.xml`, `sitemap.xml`, `index.html` (canonical + OG meta + JSON-LD), and `js/sections/blog.js` (OG/JSON-LD fallbacks)
- SW: bump `CACHE_NAME` (e.g. `v15`→`v16`) in `sw.js:2` when assets change

## SEO / PWA

- JSON-LD structured data in `index.html` (`Person`) + dynamic `BlogPosting` via `js/sections/blog.js`
- `sitemap.xml`, `feed.xml`, `manifest.json`, `sw.js` all hand-written
- Icons: `icons/icon-192.svg`, `icons/icon-512.svg` (source of truth, shared 512 viewBox), plus `icons/icon-maskable-512.svg` (full-bleed for OS masking) and PNG exports `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-maskable-512.png`, `icons/apple-touch-icon.png`. Regenerate PNGs with `inkscape -z icons/icon-512.svg -e icons/icon-512.png -w 512 -h 512`.

## Constraints

- No build tools, no package.json, no CI, no tests, no linting
- `marked.js` loaded from CDN — internet required for blog rendering. If updating the CDN URL, sync the `integrity` hash in `index.html:170`.
- `Content-Security-Policy` meta tag in `index.html:8` — update if adding external scripts, styles, fonts, or connections
- Search indexes in-memory from `blog/index.json`
- Theme persisted in `localStorage` (key: `renigman-theme`, migrated from legacy `theme`)
- GitHub Discussions are disabled on this repo, so giscus comments cannot work — the container and its CSP rule were removed
