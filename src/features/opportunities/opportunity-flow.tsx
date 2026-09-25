"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import type { OptimizationOpportunity, OptimizationPlan } from "@/lib/domain/types";
import { mockOptimizationService } from "@/lib/mock/mock-services";

export function OpportunityFlow({ opportunity, onTaskCreated }: { opportunity: OptimizationOpportunity; onTaskCreated: () => void }) {
  const [plan, setPlan] = useState<OptimizationPlan | null>(null);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const createPlan = async () => { setError(""); try { setPlan(await mockOptimizationService.createPlan(opportunity.id)); } catch { setError("方案暂时无法生成，请稍后重试。"); } };
  const createTask = async () => {
    if (!plan) return;
    setCreating(true);
    try { const task = await mockOptimizationService.createTask({ opportunityId: opportunity.id, title: opportunity.title, priority: opportunity.priority }); setNotice(`已创建演示任务「${task.title}」· 待处理`); onTaskCreated(); }
    catch { setError("任务暂时无法创建，请稍后重试。"); }
    finally { setCreating(false); }
  };
  return <>
    <dl className="opportunity-facts"><dt>AI 平台</dt><dd>{opportunity.platformName}</dd><dt>当前可见度</dt><dd>{opportunity.currentVisibility}%</dd><dt>竞品表现</dt><dd>{opportunity.competitorName} · {opportunity.competitorVisibility}%</dd><dt>可观测证据</dt><dd>{opportunity.observableEvidence}</dd><dt>建议动作</dt><dd>{opportunity.recommendation}</dd><dt>执行难度</dt><dd>{opportunity.effort}</dd></dl>
    {!plan?<button className="button button-primary plan-button" onClick={()=>void createPlan()}>生成优化方案</button>:<section className="plan-preview"><div className="plan-title"><span>方案预览</span><b>模拟生成</b></div><p>{plan.summary}</p><ol>{plan.actions.map(action=><li key={action}>{action}</li>)}</ol><button className="button button-primary" disabled={creating} onClick={()=>void createTask()}>{creating?"正在创建…":"创建演示任务"}</button></section>}
    {error&&<p role="alert" className="flow-error">{error}</p>}{notice&&<p role="status" className="task-created"><Check size={15}/>{notice}</p>}
  </>;
}
export function OpportunityDetail({ opportunity, onClose, onTaskCreated }: { opportunity: OptimizationOpportunity; onClose: () => void; onTaskCreated: () => void }) {
  return <div className="drawer-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><section role="dialog" aria-modal="true" aria-labelledby="opportunity-title" className="opportunity-detail-panel"><button className="detail-close" aria-label="关闭详情" onClick={onClose}><X size={19}/></button><span className="demo-tag">演示样本证据</span><h2 id="opportunity-title">{opportunity.title}</h2><p className="question-copy">“{opportunity.question}”</p><OpportunityFlow opportunity={opportunity} onTaskCreated={onTaskCreated}/></section></div>;
}
