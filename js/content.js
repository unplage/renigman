const CONTENT = {
  hero: {
    name: 'renigman',
    title: '生物信息学研究员',
    tagline: '深耕基因组学与计算生物学，用数据驱动生命科学研究',
    badge: '\uD83D\uDD2C 寻找博士后 / 合作机会',
    cta: {
      primary: { text: '研究成果', href: '#projects' },
      secondary: { text: '联系我', href: '#contact' },
    },
  },

  about: {
    tag: 'About',
    title: '关于我',
    subtitle: '计算生物学 · 基因组学 · 数据科学',
    intro: '拥有 6 年生物信息学科研经验，专注于高通量测序数据分析、基因组变异检测与单细胞转录组研究。精通 Python/R 生态与生物信息学工具链，具备大规模 HPC 集群数据处理经验。已参与发表 8 篇 SCI 论文（其中一作 3 篇），热衷于开发可复用的开源生信分析流程。',
    stats: [
      { number: '6+', label: '年经验' },
      { number: '8', label: 'SCI 论文' },
      { number: '15+', label: '分析流程' },
      { number: '5', label: '开源项目' },
    ],
  },

  skills: [
    {
      category: '编程语言',
      icon: 'code',
      tags: ['Python', 'R', 'Bash', 'Perl', 'SQL'],
      items: [
        { name: 'Python', level: 92 },
        { name: 'R / Bioconductor', level: 90 },
        { name: 'Bash / Linux', level: 88 },
        { name: 'Perl', level: 68 },
      ],
    },
    {
      category: 'NGS 分析',
      icon: 'dna',
      tags: ['RNA-seq', 'scRNA-seq', 'WGS/WES', 'ChIP-seq', 'ATAC-seq', 'Hi-C'],
      items: [
        { name: 'RNA-seq 分析', level: 92 },
        { name: '单细胞 (scRNA-seq)', level: 85 },
        { name: 'WGS / 变异检测', level: 82 },
        { name: '表观组学 (ChIP/ATAC)', level: 76 },
      ],
    },
    {
      category: '生信工具链',
      icon: 'tool',
      tags: ['BWA', 'STAR', 'GATK', 'samtools', 'cellranger', 'nextflow'],
      items: [
        { name: '序列比对 (BWA/STAR)', level: 90 },
        { name: '变异检测 (GATK)', level: 85 },
        { name: '流程管理 (Nextflow/Snakemake)', level: 82 },
        { name: 'IGV / UCSC / JBrowse', level: 78 },
      ],
    },
    {
      category: '计算平台',
      icon: 'server',
      tags: ['HPC/Slurm', 'Docker', 'AWS', 'Git', 'CI/CD'],
      items: [
        { name: 'HPC / Slurm', level: 86 },
        { name: 'Docker / Singularity', level: 80 },
        { name: 'Git / GitHub', level: 88 },
        { name: '云计算 (AWS/GCP)', level: 72 },
      ],
    },
    {
      category: '统计与机器学习',
      icon: 'brain',
      tags: ['统计学', '机器学习', '深度学习', 'GWAS'],
      items: [
        { name: '生物统计学', level: 84 },
        { name: '机器学习 (scikit-learn)', level: 78 },
        { name: '深度学习 (PyTorch)', level: 70 },
        { name: 'GWAS / 群体遗传学', level: 74 },
      ],
    },
  ],

  projects: [
    {
      title: '单细胞肿瘤微环境分析平台',
      desc: '构建了基于 Seurat + Scanpy 的单细胞转录组分析流程，应用于肿瘤微环境异质性研究，发现 3 个新的巨噬细胞亚型标志基因。',
      tech: ['Python', 'Scanpy', 'R', 'Seurat', 'cellranger'],
      emoji: '\uD83E\uDDEC',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      title: '人群基因组变异数据库',
      desc: '整合 5000 例中国人群 WGS 数据，构建群体特异的 SNP/INDEL/SV 频率数据库，开发了基于 VEP 的变异注释管线。',
      tech: ['Python', 'GATK', 'VEP', 'SQLite', 'Django'],
      emoji: '\uD83E\uDDEC',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'RNA-seq 差异表达分析流程',
      desc: '开发了可复用的 RNA-seq 分析 Nextflow 流程，支持从 fastq 到差异基因、富集分析的一站式运行，被 30+ 实验室采用。',
      tech: ['Nextflow', 'STAR', 'DESeq2', 'Python', 'Docker'],
      emoji: '\uD83E\uDDEC',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      title: 'Hi-C 三维基因组浏览器',
      desc: '基于 Juicebox.js 开发的交互式三维基因组数据可视化工具，支持 Hi-C 矩阵、TAD 识别与 loop 调用结果展示。',
      tech: ['JavaScript', 'D3.js', 'Juicebox', 'Python', 'Flask'],
      emoji: '\uD83E\uDDEC',
      liveUrl: '#',
      codeUrl: '#',
    },
  ],

  experience: [
    {
      period: '2024 - 至今',
      role: '博士研究员',
      company: '中国科学院 · 北京基因组研究所',
      desc: '从事单细胞多组学与肿瘤微环境研究。开发了基于深度学习的 scRNA-seq 数据批次校正方法，主导团队 NGS 分析流程标准化建设。',
    },
    {
      period: '2021 - 2024',
      role: '生物信息学分析工程师',
      company: '华大基因 · 深圳',
      desc: '负责大规模人群基因组项目的变异检测与注释，管理 10+ 节点的 HPC 集群资源调度，参与构建内部生信分析云平台。',
    },
    {
      period: '2019 - 2021',
      role: '研究助理',
      company: '北京大学 · 生物医学工程系',
      desc: '开展转录组与表观组学联合分析，搭建 RNA-seq/ChIP-seq 分析流程，参与 Alzheimer 疾病相关基因调控网络研究。',
    },
    {
      period: '2018 - 2019',
      role: '实习生物信息工程师',
      company: 'illumina · 中国创新中心',
      desc: '参与 NGS 测序数据的质量控制工具开发，测试并优化 WGS/WES 分析管线性能，撰写技术文档。',
    },
  ],

  blog: [
    {
      date: '2026-06-20',
      title: '单细胞 RNA-seq 分析流程选型指南',
      excerpt: '深入对比 Seurat V5、Scanpy 和 Monocle 3 的核心差异，结合实际项目经验给出最适合不同场景的技术选型建议。',
    },
    {
      date: '2026-04-12',
      title: 'Nextflow 实战：构建可复用的生信分析流程',
      excerpt: '从 DSL2 语法、容器化到 CI/CD 集成，手把手教你构建生产级 NGS 分析流程的最佳实践。',
    },
    {
      date: '2026-02-28',
      title: '变异检测的 GATK 最佳实践解析',
      excerpt: '详解 GATK HaplotypeCaller 原理、VQSR 流程设计要点和常见错误排查方法。',
    },
  ],

  contact: {
    email: 'renigman@example.com',
    location: '中国 · 北京',
    phone: '+86 136-0000-0000',
    social: {
      github: 'https://github.com/unplage',
      twitter: 'https://twitter.com/renigman',
      linkedin: 'https://linkedin.com/in/renigman',
      blog: 'https://unplage.github.io',
    },
  },
}
