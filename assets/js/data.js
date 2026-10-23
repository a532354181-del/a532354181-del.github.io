/* ============================================================
   小佑 · 全站内容源
   ------------------------------------------------------------
   你只需要改这个文件，就能更新整站内容（作品 / Skills / 配音 / 关于）。
   改完保存，刷新浏览器即可看到效果，不需要构建、不需要联网。

   小抄：
   · 新增作品  → 复制 works 里的一个 { ... }，改字段，记得逗号
   · 新增配音  → 把音频文件放进 assets/audio/，再复制 voices 里的一条
   · featured  → 值为 true 的会出现在首页「精选作品」
   · hue       → 封面色相，0~360 随便调（170 青绿 / 245 紫 / 25 橙）
   ============================================================ */

window.SITE_DATA = {
  /* ---------- 站点与个人信息 ---------- */
  profile: {
    brand: "小佑",                       // 左上角 Logo 文字
    name: "小佑",                        // 你的名字 / ID
    role: "独立开发者 · AI 工作流玩家",
    email: "hello@xiaoyou.studio",          // 改成你的邮箱
    location: "中国 · 上海",
    available: "可接新项目",              // 首页徽标文案
    headline: "把想法，做成<br><span class=\"grad\">能看 · 能用 · 能听</span>",
    lead: "这里是我的数字仓库：自己写的网站与程序、每天在用的 AI Skills，以及可以直接下载使用的配音素材。喜欢把复杂的事，做成一键就能跑的样子。",
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "Bilibili", href: "https://space.bilibili.com/" },
      { label: "小红书", href: "https://www.xiaohongshu.com/" },
      { label: "Email", href: "mailto:hello@xiaoyou.studio" }
    ],
    stats: [
      { value: "12", label: "上线项目" },
      { value: "6", label: "常用 Skills" },
      { value: "40+", label: "配音素材" },
      { value: "5", label: "年开发经验" }
    ],
    now: [
      "打磨「AI 配音工作台 v2」：批量转写 + 多音色试听",
      "整理 HyperFrames 视频模板，目标一条命令出片",
      "把常用提示词沉淀成可复用的 Skill 包"
    ],

    /* 自我介绍页：标题 / 正文 / 资料卡 */
    intro: {
      title: "你好，我是小佑。",
      lead: "一个在上海写代码的人。做网站、做小工具，也把 AI 塞进每天的工作流里——能自动的事，绝不手动做第二遍。",
      facts: [
        { k: "所在地", v: "上海" },
        { k: "身份", v: "独立开发者" },
        { k: "在做", v: "网站 / 工具 / AI 工作流" },
        { k: "状态", v: "可接新项目" }
      ]
    },

    /* 自我介绍页「我在做的事」 */
    doing: [
      {
        title: "网站与产品",
        desc: "从设计稿到上线：响应式页面、滚动动效、后端接口、部署，一个人跑完。"
      },
      {
        title: "AI 工作流",
        desc: "把重复劳动写成 Skill：视频、配音、文档、数据各有一条固定流水线。"
      },
      {
        title: "配音与内容",
        desc: "多音色 TTS、字幕对齐、响度统一，产出可以直接拖进剪辑软件的素材。"
      }
    ],

    /* 完整自我介绍（自我介绍页 + 关于页，每一条是一段） */
    about: [
      "我是小佑，独立开发者，现居上海。从设计稿到上线，习惯一个人把整条链路跑完：写页面、搭服务、接支付、做数据，哪里缺人就补哪里。",
      "我真正着迷的不是「AI 能做什么」，而是「哪些事终于可以不用人做了」。所以我把重复的流程写成 Skill：视频、配音、文档、数据各有一条固定流水线，质量稳定，还能反复复用。",
      "这个站本身也是一件作品：纯静态、零依赖，不加载任何外部字体和追踪脚本。你可以直接右键查看源码，或者把它下载走，改成自己的版本。"
    ]
  },

  /* ---------- 作品 ----------
     type 只能是：「网站」「程序」「实验」—— 作品页的筛选按钮由它自动生成
  */
  works: [
    {
      id: "dafeijing",
      title: "大肥鲸 · 桌面陪伴与工作台",
      summary: "Windows 11 桌宠：互动喂饭、AI 项目会话、文件收纳与本地待办月历，把提醒留给大肥鲸。",
      type: "程序",
      year: "2026",
      hue: 200,
      icon: "app",
      image: "assets/img/dafeijing/logo.svg",
      tags: ["Windows 11", "便携版 0.6.1"],
      link: "dafeijing.html",
      linkLabel: "了解与下载",
      featured: true
    },
    {
      id: "xiaoyou-home",
      title: "个人主页 2.0",
      summary: "从零手写的作品集站点，暗色玻璃质感 + 滚动动效，Lighthouse 移动端 98 分。",
      type: "网站",
      year: "2026",
      hue: 168,
      icon: "globe",
      tags: ["HTML", "CSS", "原生 JS"],
      link: "works.html",
      linkLabel: "查看详情",
      featured: true
    },
    {
      id: "live-helper",
      title: "直播场控助手",
      summary: "Windows 桌面工具：弹幕聚合、关键词自动回复、OBS 场景联动，直播时少盯三个窗口。",
      type: "程序",
      year: "2026",
      hue: 245,
      icon: "app",
      tags: ["Electron", "Node.js", "OBS"],
      link: "#",
      linkLabel: "查看项目",
      featured: true
    },
    {
      id: "voice-studio",
      title: "AI 配音工作台",
      summary: "把长文丢进去，自动分句、多音色试听、批量导出，配音一条龙。本站音频即由它产出。",
      type: "程序",
      year: "2025",
      hue: 22,
      icon: "wave",
      tags: ["Python", "TTS", "FFmpeg"],
      link: "voice.html",
      linkLabel: "去听效果",
      featured: true
    },
    {
      id: "frames-kit",
      title: "HyperFrames 模板集",
      summary: "用 HTML 写视频的模板库：片头、字幕条、数据动效，改文案即可渲染成片。",
      type: "网站",
      year: "2025",
      hue: 285,
      icon: "layers",
      tags: ["HyperFrames", "GSAP", "Motion"],
      link: "#",
      linkLabel: "查看项目",
      featured: false
    },
    {
      id: "clipbox",
      title: "Clipbox 剪贴板",
      summary: "本地优先的剪贴板历史：全局热键、模糊搜索、图片与代码片段分类，数据不出本机。",
      type: "程序",
      year: "2024",
      hue: 200,
      icon: "terminal",
      tags: ["Tauri", "Rust", "SQLite"],
      link: "#",
      linkLabel: "查看项目",
      featured: false
    },
    {
      id: "dash",
      title: "数据看板 Dash",
      summary: "给独立开发者用的轻量指标面板：访问、转化、收入三块屏，5 分钟接完数据源。",
      type: "实验",
      year: "2024",
      hue: 145,
      icon: "chart",
      tags: ["Next.js", "ECharts"],
      link: "#",
      linkLabel: "查看项目",
      featured: false
    }
  ],

  /* ---------- AI Skills ---------- */
  skills: [
    {
      name: "视频成片",
      en: "hyperframes",
      category: "视频",
      icon: "film",
      desc: "给一个主题或网页链接，自动生成分镜、动效与字幕，渲染出可发布的成片。片头、宣传片、口播剪辑都走这套。",
      snippet: "dsh skill hyperframes \"做一支 30 秒产品宣传片\"",
      tags: ["分镜", "GSAP", "渲染"]
    },
    {
      name: "配音与字幕",
      en: "media-use",
      category: "音频",
      icon: "mic",
      desc: "多音色 TTS、语速情绪调节、自动对齐时间轴；一条命令出人声 + SRT 字幕 + 音量归一化。",
      snippet: "dsh skill media-use \"把这篇稿子配成沉稳男声\"",
      tags: ["TTS", "SRT", "混音"]
    },
    {
      name: "文档流水线",
      en: "office",
      category: "办公",
      icon: "doc",
      desc: "Word / Excel / PPT / PDF 的读写与转换。模板套数据、批量生成合同与报表，最后统一导出 PDF。",
      snippet: "dsh skill office \"按模板生成 20 份周报并导出 PDF\"",
      tags: ["docx", "xlsx", "pptx"]
    },
    {
      name: "网页原型",
      en: "web-prototype",
      category: "开发",
      icon: "code",
      desc: "从一句需求或一张草图到可交互页面：结构、样式、响应式、动效一次给全，直接能跑。",
      snippet: "dsh skill web-prototype \"做一个深色作品集首页\"",
      tags: ["HTML", "CSS", "响应式"]
    },
    {
      name: "提示词工坊",
      en: "prompt-craft",
      category: "AI",
      icon: "spark",
      desc: "把模糊需求拆成结构化提示词：角色、约束、示例、验收标准，附 A/B 版本方便对比效果。",
      snippet: "dsh skill prompt-craft \"优化我的写作提示词\"",
      tags: ["结构化", "评测", "迭代"]
    },
    {
      name: "数据清洗",
      en: "data-clean",
      category: "数据",
      icon: "table",
      desc: "脏表进、干净表出：去重、类型规整、缺失值策略、异常值标记，并生成一份可复现的处理日志。",
      snippet: "dsh skill data-clean \"清洗这份销售明细并出报告\"",
      tags: ["pandas", "校验", "报告"]
    }
  ],

  /* ---------- 配音 ----------
     file 是相对路径，音频放 assets/audio/
     换成自己的文件时，把 duration / size 一起改掉即可
  */
  voices: [
    {
      title: "品牌片头 · 开场白",
      voice: "沉稳男声",
      desc: "适合产品片头、频道开场，中低音、语速偏慢。",
      duration: "00:07",
      size: "39 KB",
      format: "MP3",
      file: "assets/audio/brand-intro.mp3",
      tags: ["片头", "男声", "低沉"],
      wave: [8, 14, 20, 12, 26, 18, 30, 22, 10, 24, 32, 16, 26, 12, 20, 28, 14, 22, 30, 18, 10, 26, 16, 24, 12, 30, 20, 14, 24, 18]
    },
    {
      title: "产品介绍 · 温和女声",
      voice: "温和女声",
      desc: "介绍功能与卖点，亲和、清晰，适合官网与演示视频。",
      duration: "00:09",
      size: "53 KB",
      format: "MP3",
      file: "assets/audio/product-intro.mp3",
      tags: ["介绍", "女声", "亲和"],
      wave: [12, 18, 26, 16, 22, 30, 14, 24, 20, 32, 18, 26, 12, 22, 28, 16, 24, 30, 14, 20, 26, 18, 32, 12, 22, 28, 16, 24, 20, 14]
    },
    {
      title: "短视频口播 · 活力女声",
      voice: "活力女声",
      desc: "节奏快、情绪足，适合 15-60 秒短视频开场钩子。",
      duration: "00:06",
      size: "33 KB",
      format: "MP3",
      file: "assets/audio/short-video.mp3",
      tags: ["口播", "女声", "节奏快"],
      wave: [24, 30, 18, 32, 22, 14, 28, 34, 20, 26, 16, 30, 24, 12, 34, 22, 28, 18, 32, 26, 14, 30, 20, 34, 24, 16, 28, 22, 32, 18]
    },
    {
      title: "纪录片旁白 · 低音男声",
      voice: "低音男声",
      desc: "慢速、留白多，适合纪录片、品牌故事与长叙述。",
      duration: "00:07",
      size: "39 KB",
      format: "MP3",
      file: "assets/audio/documentary.mp3",
      tags: ["旁白", "男声", "叙事"],
      wave: [10, 16, 24, 18, 28, 14, 22, 30, 20, 12, 26, 32, 18, 24, 16, 30, 22, 14, 28, 20, 32, 24, 12, 26, 18, 30, 22, 16, 28, 20]
    }
  ],

  /* ---------- 关于页时间线 ---------- */
  timeline: [
    {
      year: "2026",
      title: "把 AI 变成日常工具",
      desc: "开始把重复劳动封装成 Skill：视频、配音、文档、数据各有一条固定流水线。"
    },
    {
      year: "2025",
      title: "做自己的产品",
      desc: "上线 AI 配音工作台与 HyperFrames 模板集，第一次靠工具接到真实订单。"
    },
    {
      year: "2023",
      title: "前端 → 全栈",
      desc: "从写页面到写服务，Node / Python / 数据库都摸了一遍，开始独立交付完整项目。"
    },
    {
      year: "2021",
      title: "第一行代码",
      desc: "为了改一个博客主题开始学 HTML/CSS，从此停不下来。"
    }
  ]
};
