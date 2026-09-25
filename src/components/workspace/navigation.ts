export const NAV_ITEMS = [
  { label: "GEO 总驾驶舱", href: "/app/overview", icon: "LayoutDashboard" },
  { label: "品牌 AI 体检", href: "/app/diagnostics", icon: "ScanSearch" },
  { label: "AI 曝光监测", href: "/app/monitoring", icon: "Radar" },
  { label: "竞品雷达", href: "/app/competitors", icon: "Crosshair" },
  { label: "用户问题库", href: "/app/questions", icon: "MessagesSquare" },
  { label: "关键词与场景", href: "/app/keywords", icon: "Tags" },
  { label: "企业知识库", href: "/app/knowledge", icon: "Library" },
  { label: "GEO 内容工厂", href: "/app/content", icon: "PanelsTopLeft" },
  { label: "信源地图", href: "/app/sources", icon: "Map" },
  { label: "优化任务", href: "/app/tasks", icon: "ListTodo" },
  { label: "GEO 数据报告", href: "/app/reports", icon: "ChartNoAxesCombined" },
  { label: "套餐与额度", href: "/app/billing", icon: "CreditCard" },
  { label: "账户设置", href: "/app/settings", icon: "Settings" },
] as const;

export const PREVIEW_MODULES = Object.fromEntries(
  NAV_ITEMS.filter((item) => item.href !== "/app/overview").map((item) => [item.href.split("/").at(-1), item.label]),
) as Record<string, string>;
