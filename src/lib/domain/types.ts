export type DateRange = { from: string; to: string };
export type OpportunityPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in_progress" | "done";
export type DashboardMetric = { id: string; label: string; value: number; unit: string; change: number; description: string };
export type MetricSeriesPoint = { date: string; visibility: number; mentions: number; citations: number };
export type PlatformMetric = { id: string; name: string; color: string; visibility: number; mentions: number; citations: number };
export type OptimizationTask = { id: string; title: string; status: TaskStatus; priority: OpportunityPriority; updatedAt: string; isDemo: true };
export type DashboardData = { metrics: DashboardMetric[]; series: MetricSeriesPoint[]; platformBreakdown: PlatformMetric[]; recentTasks: OptimizationTask[] };
export type OptimizationOpportunity = {
  id: string; brandProjectId: string; title: string; question: string; platformId: string; platformName: string;
  currentVisibility: number; competitorName: string; competitorVisibility: number; impact: string;
  priority: OpportunityPriority; effort: string; recommendation: string; observableEvidence: string; createdAt: string; isDemo: true;
};
export type WorkspaceOption = { id: string; organizationName: string; brandProjectId: string; brandName: string };
export type OptimizationPlan = { opportunityId: string; summary: string; actions: string[]; isDemo: true };
export type CreateTaskInput = { opportunityId: string; title: string; priority: OpportunityPriority };
