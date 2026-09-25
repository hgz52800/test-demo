import { beforeEach, describe, expect, it } from "vitest";
import { dashboardFixture, opportunities, platforms } from "@/lib/mock/fixtures";
import { mockDashboardService, mockOptimizationService, mockOpportunityService, mockWorkspaceService, resetCreatedTasks, getCreatedTasks } from "@/lib/mock/mock-services";

const range = { from: "2026-09-23", to: "2026-09-24" };
describe("demo service adapters", () => {
  beforeEach(() => resetCreatedTasks());
  it("exposes configurable platform fixtures and date-filtered opportunities", async () => {
    expect(platforms).toHaveLength(6);
    const rows = await mockOpportunityService.list({ brandProjectId: "brand-demo", range });
    expect(rows.every((row) => row.createdAt >= range.from && row.createdAt <= range.to)).toBe(true);
    expect(await mockOpportunityService.getById("missing")).toBeNull();
  });
  it("keeps empty data valid and creates a clearly marked pending demo task", async () => {
    expect((await mockDashboardService.getDashboard({ brandProjectId: "brand-demo", range })).metrics).toEqual(dashboardFixture.metrics);
    expect(await mockOpportunityService.list({ brandProjectId: "missing", range })).toEqual([]);
    const plan = await mockOptimizationService.createPlan(opportunities[0].id);
    expect(plan.isDemo).toBe(true);
    const task = await mockOptimizationService.createTask({ opportunityId: plan.opportunityId, title: "演示优化", priority: "high" });
    expect(task.status).toBe("todo");
    expect(task.isDemo).toBe(true);
    expect(getCreatedTasks()).toContain(task);
    expect((await mockWorkspaceService.list())[0].brandName).toBe("海心家居");
  });
});
