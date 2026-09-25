import type { CreateTaskInput, DashboardData, DateRange, OptimizationOpportunity, OptimizationPlan, OptimizationTask, WorkspaceOption } from "@/lib/domain/types";
export interface DashboardService { getDashboard(input: { brandProjectId: string; range: DateRange }): Promise<DashboardData> }
export interface OpportunityService { list(input: { brandProjectId: string; range: DateRange }): Promise<OptimizationOpportunity[]>; getById(id: string): Promise<OptimizationOpportunity | null> }
export interface WorkspaceService { list(): Promise<WorkspaceOption[]> }
export interface OptimizationService { createPlan(opportunityId: string): Promise<OptimizationPlan>; createTask(input: CreateTaskInput): Promise<OptimizationTask> }
