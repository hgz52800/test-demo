"use client";
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CalendarDays, RefreshCw } from "lucide-react";
import type { DashboardData, DateRange, OptimizationOpportunity } from "@/lib/domain/types";
import { mockDashboardService, mockOpportunityService } from "@/lib/mock/mock-services";
import { getPresetDateRange, validateDateRange, type RangePreset } from "@/lib/date/range";
import { MetricGrid } from "@/components/dashboard/metric-grid";
import { OpportunityPreview, PlatformBreakdown, TaskSummary } from "@/components/dashboard/dashboard-sections";
import { VisibilityChart } from "@/components/dashboard/visibility-chart";
import { OpportunityDetail } from "@/features/opportunities/opportunity-flow";

const demoToday = new Date().toISOString().slice(0, 10);
export default function OverviewPage() {
  const [preset, setPreset] = useState<RangePreset | "custom">(30);
  const [range, setRange] = useState<DateRange>(() => getPresetDateRange(30, demoToday));
  const [data, setData] = useState<DashboardData | null>(null);
  const [items, setItems] = useState<OptimizationOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<OptimizationOpportunity | null>(null);
  const validation = validateDateRange(range);
  const load = useCallback(async () => {
    if (!validation.ok) return;
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
  return <div className="dashboard-page">
    <div className="dashboard-heading"><div><div className="eyebrow">GEO 工作台 / 总览</div><h1>GEO 总驾驶舱</h1><p>了解海心家居在主流 AI 平台中的品牌可见度与优化进展。</p></div><span className="data-pill"><i/>全部为演示数据</span></div>
    <section className="date-toolbar" aria-label="时间范围"><CalendarDays size={16}/><span>统计周期</span>{([7,30,90] as const).map(value=><button key={value} className={preset===value?"range-option active":"range-option"} onClick={()=>choosePreset(value)}>{value} 天</button>)}<button className={preset==="custom"?"range-option active":"range-option"} onClick={()=>setPreset("custom")}>自定义</button>{preset==="custom"&&<div className="custom-range"><label>开始日期<input aria-label="开始日期" type="date" value={range.from} onChange={e=>setDate("from",e.target.value)}/></label><span>至</span><label>结束日期<input aria-label="结束日期" type="date" value={range.to} onChange={e=>setDate("to",e.target.value)}/></label></div>}{!validation.ok&&<span role="alert" className="date-error">{validation.message}</span>}</section>
    {loading&&<div className="dashboard-state" role="status">正在整理演示数据…</div>}
    {!loading&&error&&<div className="dashboard-state error-state"><AlertCircle/><p>{error}</p><button className="button button-secondary" onClick={()=>void load()}><RefreshCw size={15}/>重试</button></div>}
    {!loading&&!error&&data&&<>
      {data.metrics.length===0?<div className="dashboard-state"><h2>还没有 GEO 检测数据</h2><p>选择其他时间范围，或稍后再查看。</p></div>:<MetricGrid metrics={data.metrics}/>}
      <div className="dashboard-main-grid"><VisibilityChart series={data.series}/><PlatformBreakdown platforms={data.platformBreakdown}/></div>
      <div className="dashboard-lower-grid"><OpportunityPreview items={items} onSelect={id=>setSelected(items.find(item=>item.id===id)??null)}/><TaskSummary tasks={data.recentTasks}/></div>
    </>}
    {selected&&<OpportunityDetail opportunity={selected} onClose={()=>setSelected(null)} onTaskCreated={()=>void load()}/>}
  </div>;
}
