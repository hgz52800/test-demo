import type { CreateTaskInput, DateRange, OptimizationTask } from "@/lib/domain/types";
import type { DashboardService, OpportunityService, OptimizationService, WorkspaceService } from "@/lib/services/contracts";
import { dashboardFixture, opportunities, workspaces } from "./fixtures";

const withinRange = (date: string, range: DateRange) => date >= range.from && date <= range.to;
export const mockDashboardService: DashboardService = {
  async getDashboard({ range }) { const result = structuredClone(dashboardFixture); const days = Math.floor((Date.parse(`${range.to}T00:00:00Z`) - Date.parse(`${range.from}T00:00:00Z`)) / 86_400_000) + 1; result.series = result.series.slice(-Math.min(Math.max(days, 1), result.series.length)); result.recentTasks = [...createdTasks, ...result.recentTasks]; return result; },
};
export const mockOpportunityService: OpportunityService = {
  async list({ brandProjectId, range }) { return opportunities.filter((item) => item.brandProjectId === brandProjectId && withinRange(item.createdAt, range)); },
  async getById(id) { return opportunities.find((item) => item.id === id) ?? null; },
};
export const mockWorkspaceService: WorkspaceService = { async list() { return structuredClone(workspaces); } };
let createdTasks: OptimizationTask[] = [];
export const mockOptimizationService: OptimizationService = {
  async createPlan(opportunityId) {
    const opportunity = opportunities.find((item) => item.id === opportunityId);
    if (!opportunity) throw { kind: "not-found", message: "暂时找不到这条优化机会" };
    return { opportunityId, summary: `围绕“${opportunity.question}”完善公开、可核验的品牌资料。`, actions: ["整理可公开核验的产品与认证信息", "补充问题场景对应的品牌内容", "复查后续演示样本中的回答与引用变化"], isDemo: true };
  },
  async createTask(input: CreateTaskInput) {
    const task: OptimizationTask = { id: `task-demo-${Date.now()}`, title: input.title, status: "todo", priority: input.priority, updatedAt: new Date().toISOString().slice(0, 10), isDemo: true };
    createdTasks = [task, ...createdTasks];
    return task;
  },
};
export function getCreatedTasks() { return createdTasks; }
export function resetCreatedTasks() { createdTasks = []; }
