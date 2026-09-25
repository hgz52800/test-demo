"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CalendarDays, Check, RefreshCw, Sparkles } from "lucide-react";
import type { DashboardData, DateRange, OptimizationOpportunity } from "@/lib/domain/types";
import { mockDashboardService, mockOpportunityService } from "@/lib/mock/mock-services";
import { getPresetDateRange, validateDateRange, type RangePreset } from "@/lib/date/range";
import { MetricGrid } from "@/components/dashboard/metric-grid";
import { CompetitorDiagnosis, OpportunityPreview, PlatformBreakdown, TaskSummary } from "@/components/dashboard/dashboard-sections";
import { VisibilityChart } from "@/components/dashboard/visibility-chart";
import { OpportunityDetail } from "@/features/opportunities/opportunity-flow";

const demoToday = new Date().toISOString().slice(0, 10);

function DashboardSkeleton() {
  return <div className="geo-skeleton-state" role="status" aria-label="正在整理演示数据">
    <div className="skeleton-score"/><div className="skeleton-chart"/><div className="skeleton-platform"/>
  </div>;
}

export default function OverviewPage() {
  const [preset, setPreset] = useState<RangePreset | "custom">(30);
  const [range, setRange] = useState<DateRange>(() => getPresetDateRange(30, demoToday));
  const [data, setData] = useState<DashboardData | null>(null);
  const [items, setItems] = useState<OptimizationOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<OptimizationOpportunity | null>(null);
  const validation = validateDateRange(range);
  const load = useCallback(async () => {
    if (!validation.ok) return;
    setLoading(true);
    try {
      const [dashboard, opportunities] = await Promise.all([
        mockDashboardService.getDashboard({ brandProjectId: "brand-demo", range }),
        mockOpportunityService.list({ brandProjectId: "brand-demo", range }),
      ]);
      setData(dashboard); setItems(opportunities); setError("");
    } catch {
      setError("暂时无法读取演示数据，请稍后重试。");
    } finally { setLoading(false); }
  }, [range, validation.ok]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, [load]);
  const choosePreset = (value: RangePreset) => { setPreset(value); setLoading(true); setRange(getPresetDateRange(value, demoToday)); };
  const setDate = (key: keyof DateRange, value: string) => { setPreset("custom"); const next = { ...range, [key]: value }; setLoading(validateDateRange(next).ok); setRange(next); };
  const competitorGap = useMemo(() => items.length ? Math.round(items.reduce((sum, item) => sum + item.competitorVisibility - item.currentVisibility, 0) / items.length) : null, [items]);
  const startCheck = () => { setNotice("演示样本已开始更新"); void load(); };
  return <div className="dashboard-page">
    <section className="geo-command-header">
      <div className="geo-heading-copy"><div className="eyebrow">GEO 工作台 <span>/</span> 总览</div><h1>Geo 总览</h1><p>海心家居在主流 AI 平台中的可见度与增长机会</p></div>
      <div className="geo-heading-actions"><span className="data-pill"><i/>演示环境</span>
        <button className="button button-primary" onClick={startCheck} disabled={loading}><Sparkles size={15}/>{loading ? "检查中…" : "开始检测"}</button>
      </div>
    </section>
    <section className="geo-filter-row" aria-label="驾驶舱筛选">
      <span className="brand-context"><span className="brand-context-mark">海</span><span><b>海心家居</b><small>当前品牌项目</small></span></span>
      <div className="date-toolbar" aria-label="时间范围"><CalendarDays size={15}/><span>统计周期</span>{([7,30,90] as const).map(value=><button key={value} className={preset===value?"range-option active":"range-option"} onClick={()=>choosePreset(value)}>{value} 天</button>)}<button className={preset==="custom"?"range-option active":"range-option"} onClick={()=>setPreset("custom")}>自定义</button>
        {preset==="custom"&&<div className="custom-range"><label>开始日期<input aria-label="开始日期" type="date" value={range.from} onChange={e=>setDate("from",e.target.value)}/></label><span>至</span><label>结束日期<input aria-label="结束日期" type="date" value={range.to} onChange={e=>setDate("to",e.target.value)}/></label></div>}
        {!validation.ok&&<span role="alert" className="date-error">{validation.message}</span>}
      </div>
      <span className="sample-updated"><i/>公开回答演示样本 · 不代表实时平台数据</span>
    </section>
    {notice && <p role="status" className="check-notice"><Check size={14}/>{notice}</p>}
    {loading&&<DashboardSkeleton/>}
    {!loading&&error&&<div className="dashboard-state error-state"><AlertCircle/><p>{error}</p><button className="button button-secondary" onClick={()=>void load()}><RefreshCw size={15}/>重试</button></div>}
    {!loading&&!error&&data&&<>
      {data.metrics.length===0 ? <div className="geo-empty-state"><div>G</div><h2>还没有 GEO 检测数据</h2><p>选择其他时间范围，或稍后再查看。</p><button className="button button-primary" onClick={startCheck}><Sparkles size={15}/>开始检测</button></div> : <MetricGrid metrics={data.metrics} competitorGap={competitorGap}/>}
      <div className="geo-performance-grid"><VisibilityChart series={data.series} rangeLabel={preset === "custom" ? "自定义周期" : `近 ${preset} 天`}/><PlatformBreakdown platforms={data.platformBreakdown}/></div>
      <div className="geo-insight-grid"><OpportunityPreview items={items} onSelect={id=>setSelected(items.find(item=>item.id===id)??null)}/><CompetitorDiagnosis items={items}/></div>
      <TaskSummary tasks={data.recentTasks}/>
    </>}
    {selected&&<OpportunityDetail opportunity={selected} onClose={()=>setSelected(null)} onTaskCreated={()=>void load()}/>}
  </div>;
}
