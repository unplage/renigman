# renigman · 抗体发现与抗体工程个人主页

纯静态个人主页，聚焦抗体发现、抗体工程与生物信息学，支持 PWA 离线访问。玻璃态设计，七模块布局，Markdown 博客系统。

[在线预览](https://unplage.github.io/renigman)

---

## 功能特性

- **七模块布局** — Hero / About / Skills / Projects / Experience / Blog / Contact，模块独立便于增删
- **玻璃态 UI** — 毛玻璃卡片、深色/亮色渐变背景、微光边框，`backdrop-filter` 实现
- **暗色/亮色主题** — 跟随系统或手动切换，localStorage 持久化，无闪烁，地址栏主题色同步切换
- **Markdown 博客** — 写 `.md` 文件即可发博客，`marked.js` 前端渲染，支持代码、表格
- **博客阅读器** — 独立全屏阅读页面，骨架屏加载态，SEO 动态 meta 标签，自动目录与上一篇/下一篇导航
- **全文搜索** — `Ctrl/Cmd+K` 快捷键弹出搜索，按标题/摘要/标签过滤
- **PWA** — Service Worker 离线缓存（首页、样式、脚本、图标、博客全文均已预缓存）+ manifest.json，可安装到桌面
- **SEO** — JSON-LD 结构化数据（Person / BlogPosting）、canonical、sitemap.xml、RSS Feed
- **联系** — 邮箱 mailto 一键写信，无需后端
- **响应式** — 桌面 / 平板 / 手机三档适配
- **键盘快捷键** — `Esc` 关闭阅读器和搜索

## 技术栈

| 层 | 技术 |
|---|---|
| 核心 | 纯 HTML + CSS + JavaScript（零构建） |
| 博客渲染 | [marked.js](https://marked.js.org/)（CDN） |
| 联系 | `mailto:` 链接（纯前端，无后端） |
| 字体 | Google Fonts (Inter + Noto Sans SC + JetBrains Mono) |
| PWA | 手写 Service Worker + manifest.json |
| 部署 | GitHub Pages（`main` 分支根目录） |

## 项目结构

```
├── index.html               # 主入口
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker（离线缓存）
├── feed.xml                  # RSS 订阅源
├── sitemap.xml               # SEO sitemap
├── clear.html                # PWA 缓存清理工具（浏览器直接打开）
├── icons/
│   ├── icon-192.svg / .png
│   ├── icon-512.svg / .png
│   ├── icon-maskable-512.svg / .png
│   └── apple-touch-icon.png
├── css/
│   └── style.css             # 全部样式
├── js/
│   ├── content.js            # 个人信息与项目列表（改这里！）
│   ├── main.js               # 路由、主题、搜索、键盘快捷键
│   └── sections/
│       ├── hero.js           # 首页
│       ├── about.js          # 关于
│       ├── skills.js         # 技能
│       ├── projects.js       # 项目
│       ├── experience.js     # 经历
│       ├── blog.js           # 博客列表 + 阅读器
│       └── contact.js        # 联系
└── blog/
    ├── index.json            # 博客文章列表
    └── posts/
        ├── solution-design.md
        ├── 3_Periods_Of_History.md
        ├── notes_from_kindle.md
        ├── reading-plan.md
        └── self-ponder.md
```

## 快速开始

```bash
# 本地预览（无需任何安装）
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> Service Worker 需要 `http://localhost` 或 HTTPS 才能注册，直接双击 `file://` 打开无法启用离线缓存。

## 自定义内容

所有个人信息集中在 `js/content.js` 的 `CONTENT` 对象中：

| 字段 | 含义 |
|---|---|
| `hero.name` | 姓名 |
| `hero.title` | 头衔 |
| `hero.tagline` | 一句话介绍 |
| `about.intro` | 个人简介文字 |
| `about.stats` | 统计数据（经验/论文/项目数） |
| `skills` | 技能分类与进度条 |
| `projects` | 项目卡片（`title` / `desc` / `tech` / `emoji` / `liveUrl` / `codeUrl` / `tools`） |
| `experience` | 时间线经历 |
| `contact` | 邮箱、社交媒体链接 |

编辑后刷新浏览器即可看到变化。

### 项目卡片字段

```js
{
  title: '项目名',
  desc: '一段话说明',
  tech: ['Python', 'PWA'],
  emoji: '\uD83E\uDDEC',
  liveUrl: 'https://unplage.github.io/xxx',  // 在线演示地址
  liveLabel: '演示',                          // 可选，按钮文案
  codeUrl: 'https://github.com/unplage/xxx',  // 源码地址
  tools: [                                   // 可选，内置工具折叠列表
    { name: 'tool-name', desc: '工具说明' },
  ],
}
```

没有 GitHub Pages 部署时，把 `liveUrl` 指向仓库地址并设 `liveLabel: '仓库'`。

## 写新博客

三步完成：

```bash
# 1. 在 blog/posts/ 创建 Markdown 文件
touch blog/posts/my-new-post.md

# 2. 在 blog/index.json 中添加文章元信息
#    { "slug": "my-new-post", "title": "...", "date": "2026-07-19", "excerpt": "...", "tags": ["tag1"], "filename": "my-new-post.md" }

# 3. 同步 feed.xml 与 sitemap.xml，并给 sw.js 加一条预缓存、递增 CACHE_NAME
```

提交推送后自动上线。

## 部署到 GitHub Pages

Settings → Pages → Branch: `main` → `/` (root) → Save，等待几分钟。仓库中没有 GitHub Actions 工作流，使用分支直接发布。

如果改用 Actions 部署，在 `.github/workflows/deploy.yml` 中创建：

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
          destination_dir: ./
```

---

## 需要你配置的项目

| 项 | 说明 |
|---|---|
| **自定义域名** | 若使用自定义域名，更新 `index.html`（canonical + OG/JSON-LD）、`feed.xml`、`sitemap.xml`、`js/sections/blog.js` 中硬编码的 `unplage.github.io/renigman` |
| **联系表单** | 当前联系入口是 `mailto:` 链接，无需后端。若要换成 Formspree 表单，需自行在 `js/sections/contact.js` 中加入表单并在 `index.html` 的 CSP 中放行 `https://formspree.io` |
| **评论** | 仓库未开启 GitHub Discussions，giscus 评论无法工作，相关容器与 CSP 规则已移除 |

---

## 许可证

MIT
