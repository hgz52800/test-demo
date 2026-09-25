import { ArrowDownRight, ArrowUpRight, ChevronDown, Gauge, Minus } from "lucide-react";
import type { DashboardMetric } from "@/lib/domain/types";

function Change({ value }: { value: number }) {
  const Icon = value > 0 ? ArrowUpRight : value < 0 ? ArrowDownRight : Minus;
  return <span className={`geo-change ${value > 0 ? "is-up" : value < 0 ? "is-down" : ""}`}><Icon size={13}/>{value === 0 ? "持平" : `${Math.abs(value)}% 环比`}</span>;
}

function CompactMetric({ metric }: { metric: DashboardMetric }) {
  return <article className="geo-kpi">
    <span className="geo-kpi-label" title={metric.description}>{metric.label}</span>
    <strong className="geo-kpi-value">{metric.value.toLocaleString("zh-CN")}<small>{metric.unit}</small></strong>
    <Change value={metric.change}/>
  </article>;
}

export function MetricGrid({ metrics, competitorGap }: { metrics: DashboardMetric[]; competitorGap: number | null }) {
  const score = metrics.find((metric) => metric.id === "visibility");
  const featured = ["impressions", "recommendations", "citations", "coverage"]
    .map((id) => metrics.find((metric) => metric.id === id)).filter((metric): metric is DashboardMetric => Boolean(metric));
  const secondary = metrics.filter((metric) => metric.id !== "visibility" && !featured.some((item) => item.id === metric.id));
  const value = score?.value ?? 0;
  return <section className="geo-overview-metrics" aria-label="GEO 核心指标">
    {score && <article className="geo-score-card">
      <div className="geo-score-copy"><span className="geo-score-eyebrow"><Gauge size={15}/> GEO 综合指数</span>
        <strong className="geo-score-value" aria-label={`${value}分`}>{value.toFixed(1)}<small>分</small></strong>
        <div className="geo-score-foot"><span className="geo-health"><i/>稳步提升</span><Change value={score.change}/></div>
      </div>
      <div className="geo-score-ring" aria-hidden="true" style={{ "--score": `${Math.min(Math.max(value, 0), 100) * 3.6}deg` } as React.CSSProperties}>
        <div><b>{Math.round(value)}</b><small>GEO 分</small></div>
      </div>
    </article>}
    <div className="geo-key-metrics">
      {featured.map((metric) => <CompactMetric key={metric.id} metric={metric}/>)}
      <div className="geo-kpi geo-kpi-gap"><span className="geo-kpi-label">竞品差距</span>
        <strong className="geo-kpi-value">{competitorGap === null ? "—" : competitorGap}<small>{competitorGap === null ? "" : "分"}</small></strong>
        <span className="geo-change is-down">可见度均值</span>
      </div>
    </div>
    {secondary.length > 0 && <details className="geo-secondary-metrics">
      <summary>更多指标 <ChevronDown size={13}/></summary>
      <div>{secondary.map((metric) => <CompactMetric key={metric.id} metric={metric}/>)}</div>
    </details>}
  </section>;
}
