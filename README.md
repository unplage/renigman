# renigman · 生物信息学个人主页

纯静态个人主页，生物信息学方向，支持 PWA 离线访问。玻璃态设计，七模块布局，Markdown 博客系统。

[在线预览](https://unplage.github.io/renigman)

---

## 功能特性

- **七模块布局** — Hero / About / Skills / Projects / Experience / Blog / Contact，模块独立便于增删
- **玻璃态 UI** — 毛玻璃卡片、深色/亮色渐变背景、微光边框，`backdrop-filter` 实现
- **暗色/亮色主题** — 跟随系统或手动切换，localStorage 持久化，无闪烁
- **Markdown 博客** — 写 `.md` 文件即可发博客，`marked.js` 前端渲染，支持代码、表格
- **博客阅读器** — 独立全屏阅读页面，骨架屏加载态，SEO 动态 meta 标签
- **全文搜索** — `Ctrl/Cmd+K` 快捷键弹出搜索，按标题/摘要/标签过滤
- **PWA** — Service Worker 离线缓存 + manifest.json，可安装到桌面
- **SEO** — JSON-LD 结构化数据（Person / BlogPosting）、sitemap.xml、RSS Feed
- **联系表单** — Formspree 接入，无需后端
- **响应式** — 桌面 / 平板 / 手机三档适配
- **键盘快捷键** — `Esc` 关闭阅读器和搜索

## 技术栈

| 层 | 技术 |
|---|---|
| 核心 | 纯 HTML + CSS + JavaScript（零构建） |
| 博客渲染 | [marked.js](https://marked.js.org/) |
| 表单 | [Formspree](https://formspree.io/) |
| 字体 | Google Fonts (Inter + Noto Sans SC + JetBrains Mono) |
| PWA | 手写 Service Worker + manifest.json |
| 部署 | GitHub Pages |

## 项目结构

```
├── index.html               # 主入口
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker（离线缓存）
├── feed.xml                  # RSS 订阅源
├── sitemap.xml               # SEO sitemap
├── icons/
│   ├── icon-192.svg
│   └── icon-512.svg
├── css/
│   └── style.css             # 全部样式
├── js/
│   ├── content.js            # 个人信息数据（改这里！）
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
        ├── rna-seq-guide.md
        ├── nextflow-practice.md
        └── gatk-best-practice.md
```

## 快速开始

```bash
# 本地预览（无需任何安装）
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

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
| `projects` | 研究成果卡片 |
| `experience` | 时间线经历 |
| `contact` | 邮箱、社交媒体链接 |

编辑后刷新浏览器即可看到变化。

## 写新博客

三步完成：

```bash
# 1. 在 blog/posts/ 创建 Markdown 文件
touch blog/posts/my-new-post.md

# 2. 在 blog/index.json 中添加文章元信息
#    { "slug": "my-new-post", "title": "...", "date": "2026-07-19", "excerpt": "...", "tags": ["tag1"], "filename": "my-new-post.md" }

# 3. 更新 feed.xml（可选）
```

提交推送后自动上线。

## 部署到 GitHub Pages

### 方式一：GitHub Actions（推荐）

在仓库创建 `.github/workflows/deploy.yml`：

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

Settings → Pages → Source 选 **GitHub Actions**。

### 方式二：手动

Settings → Pages → Branch: `main` → `/` (root) → Save，等待几分钟。

---

## 需要你配置的项目

| 项 | 说明 |
|---|---|
| **Formspree ID** | 在 `js/sections/contact.js` 中将 `your-form-id` 替换为你在 [Formspree](https://formspree.io) 注册后的表单 ID |
| **域名** | 如果使用自定义域名，更新 `feed.xml` 和 `sitemap.xml` 中的链接 |

---

## 许可证

MIT
