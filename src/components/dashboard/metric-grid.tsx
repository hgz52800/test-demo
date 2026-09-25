import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { DashboardMetric } from "@/lib/domain/types";
export function MetricGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return <section aria-label="GEO 核心指标" className="metric-grid">{metrics.map((metric) => <article className="metric-card" key={metric.id}>
    <div className="metric-label">{metric.label}<span aria-label={metric.description} className="metric-info">i</span></div>
    <div className="metric-value">{metric.value.toLocaleString("zh-CN")}<small>{metric.unit}</small></div>
    <div className={metric.change >= 0 ? "metric-change positive" : "metric-change negative"}>{metric.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{metric.change === 0 ? "较上期持平" : `${Math.abs(metric.change)}% 较上期`}</div>
  </article>)}</section>;
}
