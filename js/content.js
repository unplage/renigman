const CONTENT = {
  hero: {
    name: 'renigman',
    title: '抗体发现科学家 · 生物信息学专家',
    tagline: '深耕抗体发现领域 7 年，融合 AI 与生物信息学驱动下一代抗体药物研发',
    badge: '\uD83E\uDDEC 专注于抗体发现与工程化改造',
    cta: {
      primary: { text: '研究成果', href: '#projects' },
      secondary: { text: '联系我', href: '#contact' },
    },
  },

  about: {
    tag: 'About',
    title: '关于我',
    subtitle: '抗体发现 · 生物信息学 · AI 智能体',
    intro: '拥有抗体发现领域 9 年以上深厚工作经验，业务涵盖了从杂交瘤技术到抗体库构建，再到新型抗体研发的完整流程，始终专注于通过持续的技术迭代升级，为项目的高效推进与高质量成果提供有力支持。\n\n精通利用噬菌体建库开展抗体药物发现以及抗体工程化改造工作，熟练掌握亲和力成熟、pH 型抗体改造等技术。具备多物种抗体库引物设计、高库容（千亿 + 级）多种类型抗体库（包括人源天然库、人源重组库、人源共链库、驼源纳米库、人源纳米库等）构建、抗体序列高通量分析、抗体人源化以及亲和力成熟等全方位的专业技能。\n\n能够熟练运用 AI 技术，借助 Python 编程语言以及生物信息学工具解决实际工作中的复杂问题。亲自开发了一款集成 biopython 与 igblast_tool 的软件，高效实现对不同物种（人源、鼠源、兔源、驼源等）抗体序列的高通量分析，该软件具备抗体数据清洗、无冗余片段提取、重复度统计、氨基酸翻译去重、IMGT 分析、多重比对以及进化树生成等实用功能。\n\n积极参与抗肿瘤和代谢领域多个抗体药物研发项目，负责从文献调研到质粒构建、蛋白制备、动物免疫、细胞系构建、噬菌体淘选、流式分选以及体外活性检测等全流程工作，积累了丰富的项目实践经验。',
    stats: [
      { number: '9+', label: '年经验' },
      { number: '100+', label: '抗体库' },
      { number: '15+', label: '研发项目' },
      { number: '10+', label: '开源项目' },
    ],
  },

  skills: [
    {
      category: '引物设计',
      icon: 'pen-tool',
      tags: ['抗体库引物', '抗体人源化', '亲和力成熟', '杂交瘤调序', 'pH改造'],
      items: [
        { name: '多物种抗体库引物设计', level: 95 },
        { name: '抗体人源化设计', level: 90 },
        { name: '亲和力成熟', level: 88 },
        { name: 'pH 型抗体改造', level: 85 },
      ],
    },
    {
      category: '生物信息数据处理',
      icon: 'dna',
      tags: ['NGS分析', '抗体序列提取', 'IgBLAST', '靶点调研'],
      items: [
        { name: 'NGS 抗体库分析', level: 92 },
        { name: 'IgBLAST / IMGT 分析', level: 92 },
        { name: '抗体序列数据清洗/去重', level: 90 },
        { name: '靶点调研程序开发', level: 85 },
      ],
    },
    {
      category: '重组抗体库设计',
      icon: 'tool',
      tags: ['单重链', '单轻链', '共重链', '共轻链'],
      items: [
        { name: '单重链抗体库设计', level: 90 },
        { name: '单轻链抗体库设计', level: 88 },
        { name: '共重链抗体库', level: 85 },
        { name: '共轻链抗体库', level: 85 },
      ],
    },
    {
      category: 'AI 智能体开发',
      icon: 'brain',
      tags: ['Python', 'LLM', 'BioPython', 'opencode', '自动化'],
      items: [
        { name: 'AI 智能体程序开发', level: 90 },
        { name: '测序分析自动化', level: 88 },
        { name: '实验室工具开发', level: 85 },
        { name: 'Web 应用 (PWA)', level: 82 },
      ],
    },
    {
      category: '抗体药物研发',
      icon: 'server',
      tags: ['Phage-Display', 'ELISA', 'FACS', 'BLI'],
      items: [
        { name: '噬菌体淘选 (Panning)', level: 92 },
        { name: '蛋白表达与纯化', level: 85 },
        { name: '细胞系构建', level: 82 },
        { name: '体外活性检测', level: 80 },
      ],
    },
  ],

  projects: [
    {
      title: 'bio-box 抗体分析平台',
      desc: '开源生物分析相关的代码，包括靶点调研、引物Tm值计算、igblast构建相关，持续更新。',
      tech: ['Python', 'BioPython', 'IgBLAST', '生物信息学'],
      emoji: '\uD83E\uDDEC',
      liveUrl: 'https://github.com/unplage/bio-box',
      codeUrl: 'https://github.com/unplage/bio-box',
    },
    {
      title: 'KmWord 智能单词学习',
      desc: '基于 PWA 的智能单词学习应用，模拟扇贝单词体验，集成free dict api、韦氏词典api、智谱GLM-4.7-flash api、纯正英英释义、原生 TTS 语音朗读、离线学习与进度追踪功能。',
      tech: ['JavaScript', 'PWA', 'Android', 'WebView', 'TTS'],
      emoji: '\uD83D\uDCDA',
      liveUrl: 'https://github.com/unplage/kmword',
      codeUrl: 'https://github.com/unplage/kmword',
    },
    {
      title: 'FundNote 本地记账本',
      desc: '轻量级本地记账 PWA，模拟海豚记账本，支持收支分类管理、统计图表可视化、数据本地持久化存储，无需网络即可完整使用。',
      tech: ['JavaScript', 'IndexedDB', 'PWA', 'HTML/CSS'],
      emoji: '\uD83D\uDCB0',
      liveUrl: 'https://github.com/unplage/fundnote',
      codeUrl: 'https://github.com/unplage/fundnote',
    },
    {
      title: 'LocalNote 离线记事本',
      desc: '基于 IndexedDB 的离线记事本 PWA，模拟素记笔记体验，支持分类管理、Markdown 渲染、搜索过滤、JSON/Markdown 导入导出及完整数据备份恢复。',
      tech: ['JavaScript', 'IndexedDB', 'PWA', 'Markdown'],
      emoji: '\uD83D\uDCDD',
      liveUrl: 'https://github.com/unplage/localnote1',
      codeUrl: 'https://github.com/unplage/localnote1',
    },
    {
      title: 'Browser 浏览器工具',
      desc: '轻量级 Web 浏览器工具，支持多种搜索引擎、支持智谱AI聚合分析、支持创建不同提示词模块、支持多种大模型厂商api。',
      tech: ['JavaScript', 'PWA', 'HTML/CSS'],
      emoji: '\uD83C\uDF10',
      liveUrl: 'https://github.com/unplage/browser',
      codeUrl: 'https://github.com/unplage/browser',
    },
    {
      title: 'P2P Chat 点对点聊天',
      desc: '基于 WebRTC 的点对点网页聊天应用，无需服务器中转，实现端到端即时通讯，亦可便捷进行文件无线传输。',
      tech: ['HTML', 'JavaScript', 'WebRTC', 'PWA'],
      emoji: '\uD83D\uDCAC',
      liveUrl: 'https://github.com/unplage/p2p-chat',
      codeUrl: 'https://github.com/unplage/p2p-chat',
    },
    {
      title: 'Weather 天气应用',
      desc: '天气应用，集成和风天气 API，支持实时天气查询、天气预警、实时降雨预测、空气质量等。',
      tech: ['HTML', 'JavaScript', 'API', 'CSS'],
      emoji: '\uD83C\uDF26\uFE0F',
      liveUrl: 'https://github.com/unplage/weather',
      codeUrl: 'https://github.com/unplage/weather',
    },
    {
      title: 'CFU Count 菌落计数',
      desc: '菌落计数工具，基于YOLO26模型进行真实世界训练，内置常见物品识别以及菌落计数，支持图片上传与自动识别，快速准确统计培养皿中的菌落数量。',
      tech: ['HTML', 'JavaScript', '图像处理', 'PWA'],
      emoji: '\uD83D\uDD2C',
      liveUrl: 'https://github.com/unplage/cfu_count',
      codeUrl: 'https://github.com/unplage/cfu_count',
    },
    {
      title: 'Mu-Bu 幕布笔记',
      desc: '幕布风格大纲笔记工具，支持层级结构整理与思维导图式内容管理。',
      tech: ['HTML', 'JavaScript', 'PWA'],
      emoji: '\uD83D\uDCCB',
      liveUrl: 'https://github.com/unplage/mu-bu',
      codeUrl: 'https://github.com/unplage/mu-bu',
    },
  ],

  experience: [
    {
      period: '2023 - 至今',
      role: '新药发现研究员',
      desc: '主导抗体药物发现与工程化平台建设。负责多物种抗体库（天然库、重组库、共链库、纳米库）设计与构建、噬菌体展示淘选、亲和力成熟及 pH 型抗体改造。搭建 NGS 抗体库高通量分析流程，覆盖从动物免疫、细胞融合到噬菌体淘选的完整抗体制备与工程化改造流程。',
    },
    {
      period: '2019 - 2023',
      role: '抗体工程研究员',
      desc: '负责杂交瘤调序与抗体人源化改造，构建千亿级人源天然/重组抗体库及纳米抗体库。主导多物种抗体库引物设计与优化，开发集成 BioPython + ClustalW2 + Seqkit + IgBLAST 的高通量抗体序列分析软件，赋能多个抗肿瘤与代谢领域抗体药物研发项目。',
    },
    {
      period: '2017 - 2019',
      role: '抗体研发员',
      desc: '通过杂交瘤技术开发开发IVD抗体原料、抗肿瘤新药（包括PEG融合以及电融合，膜蛋白细胞免疫，胞外区免疫，过表达细胞株检测），驼源纳米抗体噬菌体建库工作',
    },
  ],

  contact: {
    email: 'jmxstudent@163.com',
    phone: '未公开',
    location: '中国 · 广东东莞',
    social: {
      github: 'https://github.com/unplage',
      twitter: 'https://github.com/unplage',
      linkedin: 'https://github.com/unplage',
      blog: 'https://unplage.github.io/renigman',
    },
  },
}
