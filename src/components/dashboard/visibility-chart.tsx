"use client";

import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricSeriesPoint } from "@/lib/domain/types";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="geo-chart-tooltip"><b>{label}</b>{payload.map((item) => <div key={item.name}><i style={{ background: item.color }}/><span>{item.name}</span><strong>{item.value}</strong></div>)}</div>;
}

export function VisibilityChart({ series, rangeLabel }: { series: MetricSeriesPoint[]; rangeLabel: string }) {
  return <section className="surface-card chart-panel" aria-label="品牌表现趋势">
    <div className="surface-heading"><div><span className="section-kicker">VISIBILITY TREND</span><h2>品牌曝光趋势</h2><p>可见度、品牌提及与公开信源引用</p></div><span className="sample-label">{rangeLabel}</span></div>
    {series.length === 0 ? <p className="inline-empty">所选时间范围还没有趋势数据</p> : <>
      <div className="chart-legend"><span><i className="legend-blue"/>可见度</span><span><i className="legend-violet"/>品牌提及</span><span><i className="legend-teal"/>信源引用</span></div>
      <div className="chart-area" role="img" aria-label={`品牌曝光趋势，共 ${series.length} 个数据点；最新可见度 ${series.at(-1)?.visibility ?? 0}`}>
        <ResponsiveContainer width="100%" height="100%"><ComposedChart data={series} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
          <defs><linearGradient id="geoVisibilityGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3458a8" stopOpacity={0.2}/><stop offset="95%" stopColor="#3458a8" stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid stroke="#e9edf4" strokeDasharray="3 5" vertical={false}/>
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#8c96a6" }} minTickGap={24}/>
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#8c96a6" }} width={28}/>
          <Tooltip cursor={{ stroke: "#bec8dc", strokeDasharray: "3 4" }} content={<ChartTooltip/>}/>
          <Area type="monotone" dataKey="visibility" name="可见度" stroke="#3458a8" strokeWidth={2.5} fill="url(#geoVisibilityGradient)" activeDot={{ r: 4, strokeWidth: 0 }}/>
          <Line type="monotone" dataKey="mentions" name="品牌提及" stroke="#7868bc" strokeWidth={1.8} dot={false} activeDot={{ r: 3 }}/>
          <Line type="monotone" dataKey="citations" name="信源引用" stroke="#4b9b8e" strokeWidth={1.8} dot={false} activeDot={{ r: 3 }}/>
        </ComposedChart></ResponsiveContainer>
      </div>
    </>}
    <div className="panel-footnote">趋势为当前演示数据范围内的品牌公开表现</div>
  </section>;
}
