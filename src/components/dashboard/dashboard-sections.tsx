"use client";

import { ArrowUpRight, Check, ChevronDown, Clock3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import type { OptimizationOpportunity, OptimizationTask, PlatformMetric } from "@/lib/domain/types";

export function PlatformBreakdown({ platforms }: { platforms: PlatformMetric[] }) {
  return <section className="surface-card platform-panel">
    <div className="surface-heading"><div><span className="section-kicker">PLATFORM SIGNAL</span><h2>主流 AI 平台表现</h2></div><span className="sample-label">演示样本</span></div>
    {platforms.length === 0 ? <p className="inline-empty">暂无平台数据</p> : <div className="platform-list">
      {platforms.map((platform, index) => <div className="platform-row-dashboard" key={platform.id} style={{ "--platform-color": platform.color } as React.CSSProperties}>
        <span className="platform-rank">{String(index + 1).padStart(2, "0")}</span><span className="platform-dot"/>
        <b>{platform.name}</b><div className="platform-meter" role="img" aria-label={`${platform.name} 品牌可见度 ${platform.visibility}%`}><i style={{ width: `${platform.visibility}%` }}/></div>
        <strong>{platform.visibility}<small>%</small></strong><span className="platform-count">{platform.mentions.toLocaleString()} 次提及</span>
      </div>)}
    </div>}
    <div className="panel-footnote">按演示样本中的品牌可见度排序</div>
  </section>;
}

export function TaskSummary({ tasks }: { tasks: OptimizationTask[] }) {
  return <section className="task-summary-strip" aria-label="近期优化任务">
    <div className="task-summary-title"><span className="task-icon"><Clock3 size={15}/></span><b>优化进度</b><span>近期任务</span></div>
    <div className="task-summary-list">{tasks.slice(0, 3).map((task) => <div className="task-row" key={task.id}>
      <span className={`task-state ${task.status}`}>{task.status === "done" ? <Check size={13}/> : <Clock3 size={13}/>}</span>
      <span className="task-title">{task.title}</span><span className="task-status">{task.status === "done" ? "已完成" : task.status === "in_progress" ? "进行中" : "待处理"}</span>
    </div>)}{tasks.length === 0 && <p className="inline-empty">还没有优化任务</p>}</div>
  </section>;
}

export function OpportunityPreview({ items, onSelect }: { items: OptimizationOpportunity[]; onSelect: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, 3);
  return <section className="surface-card opportunity-panel">
    <div className="surface-heading opportunity-heading">
      <div><span className="section-kicker">AI OPPORTUNITY FEED</span><h2>AI 今日发现 <em>{items.length}</em> 个 GEO 增长机会</h2><p>今日增长机会 · 根据公开回答与引用整理</p></div>
      <span className="sample-label"><Sparkles size={12}/> 演示分析</span>
    </div>
    {items.length === 0 ? <p className="inline-empty">当前范围暂未发现增长机会</p> : <>
      <div className="opportunity-preview-list">{visible.map((item, index) => <article className="opportunity-item" key={item.id}>
        <span className={`opportunity-index ${item.priority}`}>{String(index + 1).padStart(2, "0")}</span>
        <div className="opportunity-content"><div className="opportunity-meta"><span className="platform-chip-small">{item.platformName}</span><span className={`impact-tag ${item.priority}`}>{item.impact}</span></div>
          <h3>{item.title}</h3><p>{item.observableEvidence}</p>
          <div className="opportunity-result"><span>{item.competitorName} <b>{item.competitorVisibility}%</b></span><span>海心 <b>{item.currentVisibility}%</b></span>
            <button className="text-action" onClick={() => onSelect(item.id)}>AI 优化 <ArrowUpRight size={13}/></button>
          </div>
        </div>
      </article>)}</div>
      {items.length > 3 && <button className="expand-opportunities" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        {expanded ? "收起机会" : `查看全部 ${items.length} 个机会`}<ChevronDown size={14}/>
      </button>}
    </>}
  </section>;
}

export function CompetitorDiagnosis({ items }: { items: OptimizationOpportunity[] }) {
  const competitors = useMemo(() => {
    const grouped = new Map<string, { totalBrand: number; totalCompetitor: number; count: number; latest: OptimizationOpportunity }>();
    items.forEach((item) => {
      const prior = grouped.get(item.competitorName) ?? { totalBrand: 0, totalCompetitor: 0, count: 0, latest: item };
      prior.totalBrand += item.currentVisibility; prior.totalCompetitor += item.competitorVisibility; prior.count += 1;
      grouped.set(item.competitorName, prior);
    });
    return [...grouped.entries()].map(([name, row]) => ({
      name, brand: Math.round(row.totalBrand / row.count), competitor: Math.round(row.totalCompetitor / row.count), item: row.latest,
    })).sort((a, b) => (b.competitor - b.brand) - (a.competitor - a.brand)).slice(0, 3);
  }, [items]);
  return <section className="surface-card diagnosis-panel">
    <div className="surface-heading"><div><span className="section-kicker">COMPETITIVE REVERSE INSIGHT</span><h2>为什么 AI 推荐竞品，却没有推荐我的品牌？</h2></div><span className="sample-label">可观测诊断</span></div>
    <p className="diagnosis-intro">从当前演示回答与公开引用中，找到可以核对的表现差距。</p>
    {competitors.length > 0 && <div className="competitor-comparison" aria-label="品牌与竞品可见度对比">
      {competitors.map((item) => <div className="competitor-row" key={item.name}>
        <div className="competitor-label"><b>{item.name}</b><span>领先海心 {item.competitor - item.brand} 分</span></div>
        <div className="competitor-track" role="img" aria-label={`${item.name} ${item.competitor}%，海心家居 ${item.brand}%`}>
          <i className="competitor-value" style={{ width: `${item.competitor}%` }}/><i className="brand-value" style={{ width: `${item.brand}%` }}/>
        </div><div className="competitor-values"><span>{item.competitor}%</span><small>海心 {item.brand}%</small></div>
      </div>)}
    </div>}
    <div className="diagnosis-evidence-grid">
      {competitors.slice(0, 2).map(({ name, item }, index) => <article className="diagnosis-evidence" key={item.id}>
        <span className="evidence-category">{index === 0 ? "公开引用来源" : "用户问题覆盖"}</span>
        <b>{name} · {item.platformName}</b><p>{item.observableEvidence}</p>
      </article>)}
      {competitors[0] && <article className="diagnosis-next-step">
        <span className="evidence-category">建议优先核查</span><b>{competitors[0].item.title}</b><p>{competitors[0].item.recommendation}</p>
      </article>}
    </div>
    <div className="diagnosis-disclaimer">基于演示样本中的公开回答与引用；不代表对 AI 平台内部推荐机制的推断。</div>
  </section>;
}
