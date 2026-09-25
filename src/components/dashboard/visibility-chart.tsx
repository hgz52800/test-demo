"use client";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricSeriesPoint } from "@/lib/domain/types";
export function VisibilityChart({ series }: { series: MetricSeriesPoint[] }) {
  return <section className="panel chart-panel" aria-label="品牌表现趋势"><div className="panel-heading"><div><h2>品牌表现趋势</h2><p>查看可见度、提及与引用的变化趋势</p></div><span className="demo-tag">演示数据</span></div>
    {series.length === 0 ? <p className="inline-empty">所选时间范围还没有趋势数据</p> : <><div className="chart-legend"><span><i className="legend-blue" />可见度</span><span><i className="legend-violet" />品牌提及</span><span><i className="legend-teal" />信源引用</span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><LineChart data={series} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}><CartesianGrid stroke="#edf0f6" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#8a90a0" }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#8a90a0" }} /><Tooltip /><Line type="monotone" dataKey="visibility" name="可见度" stroke="#356fe0" strokeWidth={2.5} dot={false} /><Line type="monotone" dataKey="mentions" name="品牌提及" stroke="#8270d8" strokeWidth={2} dot={false} /><Line type="monotone" dataKey="citations" name="信源引用" stroke="#31a699" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div></>}
  </section>;
}
