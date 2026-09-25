# 海心 AI GEO 驾驶舱基础建设 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `hgz52800/test-demo` 中建立遵循 Stitch 设计、可响应式浏览和交互的海心 AI 演示工作台与 GEO 总驾驶舱。

**Architecture:** 用 Next.js App Router 承载公共介绍页、演示入口和 SaaS 工作台。页面组件通过有类型的服务接口读取 Mock fixtures；工作台布局、通用组件、驾驶舱组件和机会流程分开实现。所有模拟数据和模拟 AI 方案都明确标记为演示内容，后续服务端 API 可替换 Mock adapter。

**Tech Stack:** Next.js、React、TypeScript、CSS variables/CSS Modules、Recharts、Lucide icons、Vitest、React Testing Library。

执行前须查看 Next.js、React、Recharts 和 Vitest 官方文档，锁定 Node/框架兼容版本及 App Router 与测试配置；不依赖当前未确认的版本号。

**Spec:** `docs/superpowers/specs/2026-09-25-haixin-geo-dashboard-design.md`

## Global Constraints

- 桌面视口为 >=1280px，平板为 768-1279px，手机为 <768px。
- 驾驶舱时间筛选提供 7 天、30 天、90 天和自定义时间。
- `stitch_ai_geo.zip` 的截图和 `DESIGN.md` 是首要视觉参考。
- 阶段一只使用带演示标识的 Mock 数据；不调用真实 AI 平台或模型，不推断模型内部算法。
- 演示登录不收集真实密码；本阶段不实现真实身份验证、多租户授权或生产数据库。
- 服务端环境变量、API 密钥、数据库密码不得进入客户端包；`.env.example` 不写真实 Secret。
- 机会诊断使用“可能原因”和公开可观测证据措辞；不能声称已连接真实 AI 平台。
- 未实现导航项须进入清楚标记的预览页，不呈现空白屏或死链接。
- 实际框架和库版本须在执行时依据官方文档确定；不得依赖 Tailwind CDN 或将 API 密钥放入浏览器。

## Review Focus

1. 自定义时间范围的开始日期晚于结束日期时应显示校验错误且不发起查询；在 Task 4 加单元测试。
2. Mock 服务返回空数组时应显示引导空状态，且布局仍可导航；在 Task 3/4 加服务与组件测试。
3. Mock 服务拒绝/抛出错误时应显示可重试的局部错误状态，不能让工作台白屏；在 Task 3/4 加错误映射与组件测试。
4. 机会文本包含中英文标点、长问题和超长品牌名时不可撑破卡片；在 Task 5 加组件边界测试并在窄屏手动检查。
5. 窗口宽度变化、键盘导航和浏览器回退时，移动导航与抽屉应保持可操作；在 Task 2/6 加交互测试并在 Task 7 手动检查。

---

## 文件结构

阶段一拟创建：

- `src/app/(marketing)/page.tsx`：公共产品介绍页。
- `src/app/login/page.tsx`：不收集凭据的演示入口。
- `src/app/app/layout.tsx`：工作台共享布局。
- `src/app/app/overview/page.tsx`：GEO 总驾驶舱路由。
- `src/app/app/[module]/page.tsx`：非本阶段模块预览页（用白名单映射，不能直接输出任意 URL 参数）。
- `src/app/globals.css`：基础 CSS reset 与全局设计令牌加载。
- `src/components/ui/*`：按钮、卡片、徽章、Tabs、Modal/Drawer、Toast、Skeleton、Empty/Error 状态。
- `src/components/workspace/*`：侧栏、顶部栏、项目切换器、菜单、移动导航。
- `src/components/dashboard/*`：标题、时间筛选、指标、趋势、平台表现、任务摘要。
- `src/features/opportunities/*`：机会列表/详情及方案预览。
- `src/lib/domain/*`：阶段一领域类型和校验。
- `src/lib/services/*`：服务接口与错误类型。
- `src/lib/mock/*`：演示 fixtures 和延迟/失败模拟服务。
- `src/lib/date/*`：时间范围计算。
- `src/test/*`：Vitest/RTL 设置和共享 helpers。
- `README.md`、`.env.example`、`.gitignore`、Vitest/Next 配置。
- 保留仓库现有 `hello.py` 和 `docs/superpowers/specs/2026-09-19-ai-girlfriend-demo-design.md`；不把它们作为海心 AI 业务需求，也不删除。

---

### Task 1: 初始化 Web 项目与验证工具

**Files:**
- Create/modify: `package.json`、锁文件、`tsconfig.json`、Next 配置、ESLint 配置、Vitest 配置、`.gitignore`
- Create: `src/app/layout.tsx`、`src/app/(marketing)/page.tsx`、`src/app/(marketing)/page.test.tsx`、`src/test/setup.ts`
- Create: `.env.example`
- Modify: `README.md`
- Preserve: `hello.py` 和现有 docs

**Interfaces:**
- Produces: `npm run dev`、`npm run build`、`npm run lint`、`npm run typecheck`、`npm run test` 脚本。
- Produces: 基础 Next.js layout 和全局样式入口，供后续页面使用。

- [ ] **Step 1: 写启动入口和基础页面的失败测试**
  在 `src/app/(marketing)/page.test.tsx` 测试首页渲染“海心 AI”名称和进入演示入口链接；初始仓库未配置测试框架时，先添加 Vitest/RTL 配置和测试脚本，但不要写生产页面实现。

```tsx
import { render, screen } from "@testing-library/react";
import Home from "./page";

it("shows the product and demo entry", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: /海心 AI/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /进入演示/ })).toHaveAttribute("href", "/login");
});
```

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- 'src/app/(marketing)/page.test.tsx'`
  Expected: FAIL，测试因首页模块或其可见内容不存在而失败。

- [ ] **Step 3: 建立 Next.js 基础结构**
  创建适配当前 Node.js LTS 的 Next.js、React、TypeScript 项目配置；添加 App Router 根 layout 与仅包含产品名称、演示入口链接的最小首页。安装 Vitest、jsdom、React Testing Library 作为轻量验证工具，安装 Recharts 和 Lucide icons 供后续组件使用；具体兼容版本先查官方文档。

- [ ] **Step 4: 添加环境模板、忽略文件与运行说明**
  `.env.example` 只列未来变量名和用途注释；`.gitignore` 排除 `.env*`（保留 `.env.example`）、`node_modules`、`.next`、构建和测试缓存。README 说明 Node 版本、安装/启动/检查命令和当前 Mock 演示范围。

- [ ] **Step 5: 运行启动测试**
  Run: `npm run test -- 'src/app/(marketing)/page.test.tsx'`
  Expected: PASS，首页标题和演示入口链接出现。
  Run: `npm run typecheck`
  Expected: PASS，无 TypeScript 错误。
  Run: `npm run build`
  Expected: PASS，生产构建完成。

- [ ] **Step 6: 提交**
  `git add package.json package-lock.json tsconfig.json next.config.* eslint.config.* vitest.config.* .gitignore .env.example README.md src/app src/test && git commit -m "chore: scaffold Haixin GEO web app"`

---

### Task 2: 设计令牌、基础组件和响应式工作台外壳

**Files:**
- Create: `src/app/app/layout.tsx`、`src/app/app/layout.test.tsx`
- Create: `src/components/ui/button.tsx`、`card.tsx`、`badge.tsx`、`icon-button.tsx`、`drawer.tsx`、`toast.tsx`、`loading-state.tsx`、`empty-state.tsx`、`error-state.tsx`
- Create: `src/components/workspace/sidebar.tsx`、`topbar.tsx`、`workspace-shell.tsx`、`navigation.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Next root layout.
- Produces: `WorkspaceShell({children})`、`NAV_ITEMS` 白名单、`Button`、`Card`、`Badge`、`EmptyState` 和 `ErrorState` 基础接口。

- [ ] **Step 1: 写侧栏导航和断点的失败测试**
  在 `layout.test.tsx` 验证 13 个导航标签可见、当前路由有可访问的选中状态、移动端菜单按钮有名称且能打开/关闭导航抽屉。

```tsx
expect(screen.getByRole("link", { name: "GEO 总驾驶舱" })).toHaveAttribute("aria-current", "page");
await user.click(screen.getByRole("button", { name: "打开导航" }));
expect(screen.getByRole("dialog", { name: "主导航" })).toBeVisible();
```

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- src/app/app/layout.test.tsx`
  Expected: FAIL，工作台布局和导航不存在。

- [ ] **Step 3: 建立设计令牌与基础控件**
  从 `DESIGN.md` 提取颜色、字体、边框、阴影、圆角、间距；在全局 CSS 变量中定义画布/文字/边线/主要与语义色。组件仅覆盖本阶段会复用的控件，使用原生 button/link 语义、focus-visible 样式、禁用状态和可访问名称。

- [ ] **Step 4: 建立桌面、平板、手机工作台布局**
  侧栏包含规格中的 13 项导航；桌面为完整侧栏，平板折叠为图标栏且每个图标有 accessible label，手机通过可关闭 drawer 显示菜单。顶部栏包含工作区切换器、搜索入口、通知、帮助和用户菜单按钮；当前未实现的菜单以 Popover/Drawer 或 Toast 反馈，不使用空按钮。

- [ ] **Step 5: 运行布局测试与窄屏测试**
  Run: `npm run test -- src/app/app/layout.test.tsx`
  Expected: PASS，导航、drawer 开关和当前路由状态均可用。
  Run: `npm run typecheck`
  Expected: PASS。

- [ ] **Step 6: 提交**
  `git add src/app src/components src/app/globals.css && git commit -m "feat: add responsive SaaS workspace shell"`

---

### Task 3: 定义领域类型、Mock adapter 和服务状态

**Files:**
- Create: `src/lib/domain/organization.ts`、`brand-project.ts`、`platform.ts`、`dashboard.ts`、`opportunity.ts`、`task.ts`、`date-range.ts`
- Create: `src/lib/services/errors.ts`、`dashboard-service.ts`、`opportunity-service.ts`、`workspace-service.ts`、`optimization-service.ts`
- Create: `src/lib/mock/fixtures.ts`、`mock-services.ts`
- Create: `src/lib/services/mock-services.test.ts`

**Interfaces:**
- Produces:
  - `DashboardService.getDashboard(input: { brandProjectId: string; range: DateRange }): Promise<DashboardData>`
  - `OpportunityService.list(input: { brandProjectId: string; range: DateRange }): Promise<OptimizationOpportunity[]>`
  - `OpportunityService.getById(id: string): Promise<OptimizationOpportunity | null>`
  - `WorkspaceService.list(): Promise<WorkspaceOption[]>`
  - `OptimizationService.createPlan(opportunityId: string): Promise<OptimizationPlan>`
  - `OptimizationService.createTask(input: CreateTaskInput): Promise<OptimizationTask>`
- Error union: `ServiceError` with `kind: "unavailable" | "invalid-input" | "not-found"`, safe user message, and optional retryable flag.
- `DashboardData = { metrics: DashboardMetric[]; series: MetricSeriesPoint[]; platformBreakdown: PlatformMetric[]; recentTasks: OptimizationTask[] }`.
- `WorkspaceOption = { id: string; organizationName: string; brandProjectId: string; brandName: string }`.
- `OptimizationPlan = { opportunityId: string; summary: string; actions: string[]; isDemo: true }`.
- `CreateTaskInput = { opportunityId: string; title: string; priority: OpportunityPriority }`.

- [ ] **Step 1: 写服务 contracts 的失败测试**
  覆盖 fixtures 含品牌、6 个可配置 AI 平台、问题、竞品、引用摘要、机会和任务；并测试时间范围过滤、缺失机会 ID 返回 null、创建演示任务返回待处理状态、空 fixtures 可用。

```ts
const rows = await service.list({ brandProjectId: "brand-demo", range: dateRange });
expect(rows.every((row) => row.createdAt >= dateRange.from && row.createdAt <= dateRange.to)).toBe(true);
expect(await service.getById("missing")).toBeNull();
```

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- src/lib/services/mock-services.test.ts`
  Expected: FAIL，服务实现尚不存在。

- [ ] **Step 3: 定义明确的领域类型**
  所有实体使用 string ID、显式时间单位/百分比字段及联合类型的状态。趋势点有 ISO 日期和数值。机会文案含公开可观测依据字段，不能由组件拼接猜测性算法说明。平台采用可扩展字符串 ID，避免 UI 代码将清单写死。

- [ ] **Step 4: 填充真实感的中文演示数据并实现 adapter**
  创建“海心家居”及竞品/问题/引用的合成资料；所有答案摘要、日期、指标和机会明确标记为演示。服务通过 Promise 返回 fixture，可配置短延迟；数据和服务实现放在 `lib/mock`，不放在 React 页面中。

- [ ] **Step 5: 运行服务测试**
  Run: `npm run test -- src/lib/services/mock-services.test.ts`
  Expected: PASS，筛选、空数据、not-found 和任务创建均符合接口。
  Run: `npm run typecheck`
  Expected: PASS。

- [ ] **Step 6: 提交**
  `git add src/lib && git commit -m "feat: define GEO dashboard domain and mock services"`

---

### Task 4: GEO 总驾驶舱指标、筛选和趋势

**Files:**
- Create: `src/app/app/overview/page.tsx`、`page.test.tsx`
- Create: `src/components/dashboard/dashboard-header.tsx`、`date-range-filter.tsx`、`metric-grid.tsx`、`metric-card.tsx`、`visibility-chart.tsx`、`platform-breakdown.tsx`、`task-summary.tsx`
- Create: `src/lib/date/range.ts`、`range.test.ts`

**Interfaces:**
- Consumes: Task 2 shell and Task 3 `DashboardService`.
- Consumes: Task 3 `DateRange` type.
- Produces: `validateDateRange(range): { ok: true } | { ok: false; message: string }`.

- [ ] **Step 1: 写时间范围与驾驶舱加载状态测试**
  验证 7/30/90 天范围边界、合法自定义范围和反向范围错误；页面显示 9 个核心指标、趋势图标签、平台名称、Loading、Error、Empty 状态。

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- src/lib/date/range.test.ts src/app/app/overview/page.test.tsx`
  Expected: FAIL，尚无日期范围函数和驾驶舱 UI。

- [ ] **Step 3: 实现时间范围校验**
  日期输入使用 ISO 日期字符串。实现 `getPresetDateRange(preset, today)` 生成含当天的 7/30/90 个日历日范围；无效日期或开始日期晚于结束日期时返回明确错误，页面不调用 DashboardService。

```ts
export function validateDateRange(range: DateRange) {
  if (range.from > range.to) return { ok: false as const, message: "开始日期不能晚于结束日期" };
  return { ok: true as const };
}
```

- [ ] **Step 4: 实现指标、趋势和平台模块**
  页面用客户端的最小状态管理时间范围，并从 DashboardService 拉取数据。趋势图用 Recharts 呈现时间序列，图例、轴标签、数值摘要和空数据状态都可读；避免用户只凭颜色比较。指标覆盖综合指数、曝光、提及、推荐、引用、覆盖问题、监测问题、平台数和任务完成率。

- [ ] **Step 5: 测试筛选、重试和空状态**
  Run: `npm run test -- src/lib/date/range.test.ts src/app/app/overview/page.test.tsx`
  Expected: PASS，反向日期被拒、重试重新请求、空数组显示“还没有 GEO 检测数据”。
  Run: `npm run typecheck`
  Expected: PASS。

- [ ] **Step 6: 提交**
  `git add src/app/app/overview src/components/dashboard src/lib/date && git commit -m "feat: build GEO performance dashboard"`

---

### Task 5: 增长机会详情与演示任务流程

**Files:**
- Create: `src/features/opportunities/opportunity-list.tsx`、`opportunity-card.tsx`、`opportunity-detail.tsx`、`optimization-plan-dialog.tsx`、`opportunities.test.tsx`
- Create: `src/features/tasks/task-created-toast.tsx`
- Modify: `src/app/app/overview/page.tsx`

**Interfaces:**
- Consumes: Task 3 `OpportunityService` 和 `OptimizationService`。
- Produces: `OpportunityCard({ opportunity, onOpen, onGeneratePlan })`；`OptimizationPlanDialog({ plan, onCreateTask, onClose })`。

- [ ] **Step 1: 写机会查看和创建演示任务的失败测试**
  测试用户能打开机会详情、看到平台/问题/当前表现/竞品/可观测证据/建议；点击“生成优化方案”后出现含“模拟生成”标识的预览；创建后出现成功反馈，任务状态为待处理。

```tsx
await user.click(screen.getByRole("button", { name: "生成优化方案" }));
expect(await screen.findByText("模拟生成" )).toBeVisible();
await user.click(screen.getByRole("button", { name: "创建演示任务" }));
expect(await screen.findByText(/待处理/)).toBeVisible();
```

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- src/features/opportunities/opportunities.test.tsx`
  Expected: FAIL，机会流程组件未创建。

- [ ] **Step 3: 实现机会列表和详情面板**
  在卡片上展示问题、AI 平台、品牌现状、竞品现状、影响、优先级、执行难度和建议动作。详情使用可访问 Drawer/Dialog，长文换行，极长名称折叠或省略并提供可访问完整文本。

- [ ] **Step 4: 实现明确标记的方案预览及演示任务创建**
  方案内容由 Mock `OptimizationService` 返回，并显示模拟生成标签及依据说明；点击确认后创建内存态演示任务、关闭对话框、Toast 显示名称和状态，并刷新驾驶舱的任务摘要。不得调用模型 API 或外部发布站点。

- [ ] **Step 5: 运行交互测试**
  Run: `npm run test -- src/features/opportunities/opportunities.test.tsx`
  Expected: PASS，详情、方案预览、关闭和创建任务流程均有反馈。
  Run: `npm run typecheck`
  Expected: PASS。

- [ ] **Step 6: 提交**
  `git add src/features src/app/app/overview/page.tsx && git commit -m "feat: add GEO opportunity to task flow"`

---

### Task 6: 公共介绍、演示入口与预览模块路由

**Files:**
- Modify: `src/app/(marketing)/page.tsx`，并保留 Task 1 的首页测试
- Create: `src/app/login/page.tsx`、`src/app/login/page.test.tsx`
- Create: `src/app/app/[module]/page.tsx`、`src/app/app/[module]/page.test.tsx`
- Create: `src/components/marketing/hero.tsx`、`src/components/preview/module-preview.tsx`

**Interfaces:**
- Consumes: Task 2 shell/navigation and Task 3 workspace option types.
- Produces: marketing route、demo-entry action、navigation module key 的白名单映射。

- [ ] **Step 1: 写公共页、演示入口和模块预览失败测试**
  测试介绍页品牌和 CTA；演示入口不含 password 字段、通过按钮进入预置工作区；导航的每个模块都有对应标题和“预览阶段”状态，未知模块显示 not-found。

- [ ] **Step 2: 运行测试确认失败**
  Run: `npm run test -- 'src/app/(marketing)/page.test.tsx' src/app/login/page.test.tsx 'src/app/app/[module]/page.test.tsx'`
  Expected: FAIL，相关路由尚未实现。

- [ ] **Step 3: 实现介绍页和安全演示入口**
  介绍页复用品牌字体和色彩；演示入口仅选择演示工作区，不展示或保存真实凭据，按钮跳转到 `/app/overview`。

- [ ] **Step 4: 实现模块预览页**
  使用明确允许的 slug → 标题/描述静态映射，不把未经验证的 URL 直接用作内容。每个未交付导航提供价值说明、阶段标记和返回驾驶舱按钮。

```ts
const previewModules = {
  diagnostics: { title: "品牌 AI 体检", phase: "后续阶段" },
  monitoring: { title: "AI 曝光监测", phase: "后续阶段" },
} as const;
const moduleInfo = previewModules[params.module as keyof typeof previewModules];
if (!moduleInfo) notFound();
```

- [ ] **Step 5: 运行路由测试**
  Run: `npm run test -- 'src/app/(marketing)/page.test.tsx' src/app/login/page.test.tsx 'src/app/app/[module]/page.test.tsx'`
  Expected: PASS；未知 slug 显示 not-found，登录入口没有密码字段。
  Run: `npm run typecheck`
  Expected: PASS。

- [ ] **Step 6: 提交**
  `git add src/app src/components/marketing src/components/preview && git commit -m "feat: add Haixin public and preview routes"`

---

### Task 7: 集成检查、响应式校正和运行文档

**Files:**
- Modify: `README.md`、可能需调整的页面 CSS。
- Add if missing: `src/app/not-found.tsx`、少量集成测试。
- Do not modify: 生产 Secret、本阶段不接入的第三方平台。

**Interfaces:**
- Consumes: 所有前面任务交付。
- Produces: 可独立运行的阶段一演示产品及其已知限制说明。

- [ ] **Step 1: 运行完整自动检查**
  Run: `npm run test`
  Expected: PASS，所有单元和组件测试通过。
  Run: `npm run lint`
  Expected: PASS，无 lint 错误。
  Run: `npm run typecheck`
  Expected: PASS。
  Run: `npm run build`
  Expected: PASS，生产构建完成。

- [ ] **Step 2: 手动验证桌面和移动视口**
  启动 `npm run dev`，在 1440px、1024px、390px 检查介绍页、登录入口、工作台、驾驶舱和机会流程。

```sh
npm run test
npm run lint
npm run typecheck
npm run build
npm run dev
```确认窄屏没有布局溢出，移动抽屉可以用按钮打开/关闭，桌面侧栏正常，主要点击均有反馈。

- [ ] **Step 3: 手动检查错误和无障碍**
  模拟服务空数组和失败，确认分别显示空状态和可重试错误；用键盘 Tab/Enter/Escape 操作导航和 Drawer/Dialog；检查浏览器控制台无阻断使用的异常。

- [ ] **Step 4: 更新 README**
  写出具体 Node 最低版本、安装命令、开发启动、自动检查命令、Mock 数据说明、演示入口路径、未实现能力列表和未来真实 API 服务端接入位置。

- [ ] **Step 5: 扫描秘密与构建产物**
  确认仓库中没有真实 key、密码、`.env.local`、`node_modules` 或 `.next` 被提交；确认 `.env.example` 只含模板变量。

- [ ] **Step 6: 提交最终集成修正**
  `git add README.md src && git commit -m "docs: document Haixin GEO demo setup and limits"`

---

## 规格覆盖自检

- 用户入口/演示登录：Task 6。
- 左侧导航、顶部 Header、切换器和工作台响应式：Task 2。
- GEO 核心指标、7/30/90/自定义时间、趋势、平台、任务摘要：Task 3/4。
- 今日机会、证据、竞品、建议、方案预览和任务创建：Task 3/5。
- 13 项导航、未交付页占位和无死链：Task 2/6。
- Stitch 设计和适配：Task 2/4/5/6/7。
- Loading/Empty/Error/Success：Task 2/3/4/5。
- Mock/Adapter/API 边界和安全：Task 1/3/5/7。
- README、运行方式、`.env.example`、检查：Task 1/7。
- 数据库、生产身份、真实 AI 平台、额度和报告导出：明确留待后续阶段，不在第一阶段伪实现。
