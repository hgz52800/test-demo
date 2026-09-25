import type { DashboardData, OptimizationOpportunity, OptimizationTask, WorkspaceOption } from "@/lib/domain/types";
export const platforms = [
  { id: "deepseek", name: "DeepSeek", color: "#3775db" }, { id: "doubao", name: "豆包", color: "#25a589" },
  { id: "yuanbao", name: "腾讯元宝", color: "#7863db" }, { id: "qwen", name: "通义千问", color: "#d68a2f" },
  { id: "wenxin", name: "文心一言", color: "#3478c9" }, { id: "kimi", name: "Kimi", color: "#4338a6" },
] as const;
export const workspaces: WorkspaceOption[] = [{ id: "org-demo", organizationName: "海心演示组织", brandProjectId: "brand-demo", brandName: "海心家居" }];
export const tasks: OptimizationTask[] = [
  { id: "task-demo-1", title: "补充实木床选购指南中的环保认证说明", status: "in_progress", priority: "high", updatedAt: "2026-09-23", isDemo: true },
  { id: "task-demo-2", title: "完善儿童家具安全标准 FAQ", status: "todo", priority: "medium", updatedAt: "2026-09-22", isDemo: true },
  { id: "task-demo-3", title: "更新品牌服务与质保信息", status: "done", priority: "low", updatedAt: "2026-09-20", isDemo: true },
];
export const dashboardFixture: DashboardData = {
  metrics: [
    { id: "visibility", label: "GEO 综合指数", value: 68.4, unit: "分", change: 8.2, description: "品牌被 AI 看见的综合表现" },
    { id: "impressions", label: "AI 曝光量", value: 12860, unit: "次", change: 12.6, description: "监测回答中的品牌曝光" },
    { id: "mentions", label: "品牌提及", value: 3842, unit: "次", change: 6.8, description: "回答中提到品牌的次数" },
    { id: "recommendations", label: "推荐次数", value: 1765, unit: "次", change: 4.3, description: "回答将品牌列为推荐选项" },
    { id: "citations", label: "信源引用", value: 926, unit: "次", change: 9.1, description: "品牌相关页面被引用次数" },
    { id: "coverage", label: "覆盖问题", value: 72, unit: "个", change: 5.4, description: "已获得品牌可见度的问题" },
    { id: "monitored", label: "监测问题", value: 120, unit: "个", change: 0, description: "持续跟踪的用户问题数" },
    { id: "platforms", label: "监测平台", value: 6, unit: "个", change: 0, description: "已配置的 AI 平台数" },
    { id: "completion", label: "任务完成率", value: 76, unit: "%", change: 3.2, description: "优化任务按期完成比例" },
  ],
  series: Array.from({ length: 90 }, (_, index) => { const day = new Date("2026-06-27T00:00:00Z"); day.setUTCDate(day.getUTCDate() + index); return { date: day.toISOString().slice(5, 10), visibility: 46 + index * 0.31 + (index % 3) * 2, mentions: 32 + index * 0.25 + (index % 4), citations: 25 + index * 0.2 + (index % 2) * 3 }; }),
  platformBreakdown: platforms.map((platform, index) => ({ ...platform, visibility: [72, 66, 61, 58, 54, 51][index], mentions: [930, 820, 745, 680, 598, 503][index], citations: [240, 186, 167, 139, 112, 82][index] })),
  recentTasks: tasks,
};
export const opportunities: OptimizationOpportunity[] = [
  { id: "opp-1", brandProjectId: "brand-demo", title: "提升实木床环保选购问题中的品牌推荐", question: "环保等级高的实木床有哪些品牌值得推荐？", platformId: "deepseek", platformName: "DeepSeek", currentVisibility: 18, competitorName: "木邻家居", competitorVisibility: 64, impact: "高意向选购问题中品牌出现率偏低", priority: "high", effort: "中", recommendation: "补充可核验的环保认证、木材来源和检测报告说明，并建立清晰的选购指南。", observableEvidence: "本轮演示样本的 12 条回答中，品牌出现 2 次；竞品木邻家居出现 7 次，其中 5 条引用了第三方检测与材料说明页面。", createdAt: "2026-09-24", isDemo: true },
  { id: "opp-2", brandProjectId: "brand-demo", title: "补足儿童家具安全标准的公开说明", question: "儿童房家具应该关注哪些安全标准？", platformId: "doubao", platformName: "豆包", currentVisibility: 29, competitorName: "森语儿童", competitorVisibility: 58, impact: "安全标准类问题有稳定的信息需求", priority: "medium", effort: "低", recommendation: "整理符合现行标准的说明、适用范围和检测材料，方便读者核对。", observableEvidence: "在 10 条演示回答中，品牌被提及 3 次，竞品被提及 6 次；引用来源多为标准解读和品牌质检说明。", createdAt: "2026-09-23", isDemo: true },
  { id: "opp-3", brandProjectId: "brand-demo", title: "补齐小户型实木家具的空间案例", question: "小户型适合选什么样的实木家具？", platformId: "qwen", platformName: "通义千问", currentVisibility: 24, competitorName: "木邻家居", competitorVisibility: 61, impact: "空间场景类问题有较高的选购意图", priority: "high", effort: "中", recommendation: "发布小户型空间方案，标注尺寸、材质与使用场景，并关联可查看的真实案例。", observableEvidence: "演示样本中竞品有 4 条回答关联空间搭配内容；海心相关案例页尚未出现在可见引用中。", createdAt: "2026-09-22", isDemo: true },
  { id: "opp-4", brandProjectId: "brand-demo", title: "完善实木家具保养与耐用性答疑", question: "实木家具日常应该怎么保养，能用多久？", platformId: "yuanbao", platformName: "腾讯元宝", currentVisibility: 31, competitorName: "森屿木作", competitorVisibility: 57, impact: "购买前的维护与使用年限疑问未充分覆盖", priority: "medium", effort: "低", recommendation: "整理木材特性、日常养护和质保范围的 FAQ，说明不同使用环境下的注意事项。", observableEvidence: "本轮演示回答中竞品保养说明被引用 3 次；海心相关公开答疑出现 1 次。", createdAt: "2026-09-21", isDemo: true },
  { id: "opp-5", brandProjectId: "brand-demo", title: "增加环保板材与认证信息的可核验来源", question: "环保家具选购时怎么看板材和检测认证？", platformId: "deepseek", platformName: "DeepSeek", currentVisibility: 22, competitorName: "原木纪", competitorVisibility: 62, impact: "认证与材料来源会影响选购信任", priority: "high", effort: "中", recommendation: "集中展示认证名称、适用产品、有效期和检测机构，提供可直接核对的公开页面。", observableEvidence: "演示引用中竞品有 5 次指向检测与材料说明；海心品牌页面尚未被这些回答引用。", createdAt: "2026-09-20", isDemo: true },
  { id: "opp-6", brandProjectId: "brand-demo", title: "补足定制家具交付与安装流程说明", question: "定制实木家具从下单到安装需要多久？", platformId: "kimi", platformName: "Kimi", currentVisibility: 27, competitorName: "木邻家居", competitorVisibility: 53, impact: "服务流程问题的品牌回答覆盖不足", priority: "medium", effort: "低", recommendation: "公开定制流程、交付周期范围、安装服务和售后边界，减少信息不确定性。", observableEvidence: "样本中竞品的服务流程说明出现在 4 条答案里，海心相关页面没有进入可见引用。", createdAt: "2026-09-19", isDemo: true },
  { id: "opp-7", brandProjectId: "brand-demo", title: "建立卧室家具搭配的品牌方案内容", question: "卧室家具怎么搭配更耐看又实用？", platformId: "wenxin", platformName: "文心一言", currentVisibility: 34, competitorName: "北木生活", competitorVisibility: 59, impact: "搭配建议场景中品牌露出仍有提升空间", priority: "low", effort: "中", recommendation: "按卧室面积与收纳需求整理组合方案，补充产品规格和搭配依据。", observableEvidence: "演示回答多引用第三方搭配文章；海心产品相关的场景化内容尚未形成稳定引用。", createdAt: "2026-09-18", isDemo: true },
];
