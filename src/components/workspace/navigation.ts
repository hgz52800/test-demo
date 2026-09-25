export const MAIN_NAV_ITEMS = [
  { label: "Geo 总览", ariaLabel: "GEO 总驾驶舱", href: "/app/overview", icon: "LayoutDashboard" },
  { label: "品牌 AI 体检", href: "/app/diagnostics", icon: "ScanSearch" },
  { label: "曝光监测", href: "/app/monitoring", icon: "Radar" },
  { label: "竞品洞察", href: "/app/competitors", icon: "Crosshair" },
  { label: "用户问题", href: "/app/questions", icon: "MessagesSquare" },
  { label: "内容工厂", href: "/app/content", icon: "PanelsTopLeft" },
  { label: "企业知识库", href: "/app/knowledge", icon: "Database" },
  { label: "优化任务", href: "/app/tasks", icon: "ListTodo" },
  { label: "数据报告", href: "/app/reports", icon: "ChartNoAxesCombined" },
] as const;

export const MORE_NAV_ITEMS = [
  { label: "关键词与场景", href: "/app/keywords", icon: "Tags" },
  { label: "信源地图", href: "/app/sources", icon: "Map" },
  { label: "套餐与额度", href: "/app/billing", icon: "CreditCard" },
  { label: "账户设置", href: "/app/settings", icon: "Settings" },
] as const;

export const NAV_ITEMS = [...MAIN_NAV_ITEMS, ...MORE_NAV_ITEMS];

export const PREVIEW_MODULES = Object.fromEntries(
  NAV_ITEMS.filter((item) => item.href !== "/app/overview").map((item) => [item.href.split("/").at(-1), item.label]),
) as Record<string, string>;
