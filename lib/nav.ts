export type NavItem = { slug: string; zh: string; en: string; key: string }
export type NavGroup = { zh: string; en: string; items: NavItem[] }

export const NAV: NavGroup[] = [
  {
    zh: "指南",
    en: "Guidelines",
    items: [
      { slug: "", zh: "总览", en: "Overview", key: "/" },
      { slug: "logo", zh: "标志", en: "Logo", key: "logo/" },
      { slug: "color", zh: "色彩", en: "Color", key: "color/" },
      { slug: "type", zh: "字体", en: "Typography", key: "type/" },
      { slug: "graphics", zh: "图形语言", en: "Graphics", key: "graphics/" },
      { slug: "icons", zh: "图标", en: "Icons", key: "icons/" },
      { slug: "dataviz", zh: "数据可视化", en: "Data viz", key: "dataviz/" },
      { slug: "web", zh: "网站与组件", en: "Web & UI", key: "web/" },
      { slug: "motion", zh: "动效", en: "Motion", key: "motion/" },
      { slug: "voice", zh: "语言与文案", en: "Voice", key: "voice/" },
    ],
  },
  {
    zh: "模板",
    en: "Templates",
    items: [
      { slug: "ads", zh: "广告投放", en: "Advertising", key: "ads/" },
      { slug: "covers", zh: "文章封面", en: "Article covers", key: "covers/" },
      { slug: "slides", zh: "演示文稿", en: "Slides", key: "slides/" },
      { slug: "video", zh: "视频首尾帧", en: "Video", key: "video/" },
      { slug: "social", zh: "社交媒体", en: "Social", key: "social/" },
      { slug: "print", zh: "印刷与活动", en: "Print & events", key: "print/" },
    ],
  },
  {
    zh: "交付",
    en: "Deliverables",
    items: [
      { slug: "tokens", zh: "Design Tokens", en: "Design tokens", key: "tokens/" },
      { slug: "agents", zh: "DESIGN.md 与 Skill", en: "DESIGN.md & skill", key: "agents/" },
      { slug: "downloads", zh: "资源下载", en: "Downloads", key: "downloads/" },
    ],
  },
]

export const SITE = {
  version: "1.0",
  updated: "2026-10-14",
}
