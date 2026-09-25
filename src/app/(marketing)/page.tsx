import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, BookOpenCheck, Radar, ShieldCheck, Sparkles, Zap } from "lucide-react";

const platforms = [
  { name: "DeepSeek", color: "#2563eb" },
  { name: "豆包", color: "#00687a" },
  { name: "腾讯元宝", color: "#0053db" },
  { name: "通义千问", color: "#7c3aed" },
  { name: "文心一言", color: "#006242" },
];

const capabilities = [
  {
    icon: Radar,
    title: "看见品牌在 AI 中的真实表现",
    description: "追踪品牌提及、推荐和引用来源，按平台与用户问题观察变化。",
  },
  {
    icon: BarChart3,
    title: "从竞品差距找到增长机会",
    description: "对照相同问题下的公开回答与引用信息，梳理优势、差距和建议动作。",
  },
  {
    icon: BookOpenCheck,
    title: "把洞察连到内容与执行",
    description: "将可观测的优化机会整理为内容建议和待办任务，形成可复查的工作闭环。",
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link aria-label="海心 AI 首页" className="brand-lockup" href="/">
                <Image alt="" height={42} src="/haixin-logo.svg" width={42} />
          <span className="brand-copy">
            <span className="brand-name">海心 AI <span aria-hidden="true">· GEO</span></span>
            <span className="brand-subtitle">GEO 智能增长系统</span>
          </span>
        </Link>
        <nav aria-label="主导航" className="header-links">
          <a href="#features">产品能力</a>
          <a href="#approach">分析方式</a>
          <a href="#safety">数据边界</a>
        </nav>
        <Link className="button button-primary button-small" href="/login">
          进入演示工作台 <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> GEO GROWTH INTELLIGENCE</div>
            <h1 id="hero-title">让品牌在 AI 世界里<br /><span>被看见、被推荐、被引用</span></h1>
            <p className="hero-lede">
              海心 AI 帮助品牌监测主流 AI 平台中的曝光与引用表现，基于可观测的回答和公开信源发现差距，把洞察转为可执行的 GEO 优化工作。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/login">进入演示工作台 <ArrowRight aria-hidden="true" size={16} /></Link>
              <a className="button button-secondary" href="#features">了解产品能力 <ArrowUpRight aria-hidden="true" size={15} /></a>
            </div>
            <div aria-label="可扩展的平台维度" className="platform-row">
              {platforms.map((platform) => (
                <span className="platform-chip" key={platform.name} style={{ "--chip-color": platform.color } as CSSProperties}>
                  <i aria-hidden="true" />{platform.name}
                </span>
              ))}
              <span className="platform-chip"><Sparkles aria-hidden="true" size={12} /> 更多平台</span>
            </div>
          </div>

          <div aria-label="驾驶舱效果预览，显示模拟数据" className="preview-wrap">
            <div className="preview-label">
              <strong><span className="status-dot" /> GEO 总驾驶舱</strong>
              <span>最近 30 天</span>
            </div>
            <div className="preview-card">
              <div className="preview-topline">
                <div><h2>海心家居 · AI 品牌表现</h2><p>跨平台可观测指标趋势</p></div>
                <span className="demo-tag">演示数据</span>
              </div>
              <div className="preview-metrics">
                <div className="preview-metric"><span>AI 曝光率</span><strong>68.4%</strong><em>↗ +8.2%</em></div>
                <div className="preview-metric"><span>品牌提及率</span><strong>42.1%</strong><em>↗ +5.6%</em></div>
                <div className="preview-metric"><span>引用率</span><strong>31.8%</strong><em>↗ +3.4%</em></div>
              </div>
              <div aria-label="曝光率与引用率模拟趋势" className="preview-chart" role="img">
                <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 560 142">
                  <path className="grid" d="M0 28H560M0 70H560M0 112H560" />
                  <path d="M0 116 C46 109 62 101 94 105 S145 90 180 94 S232 73 274 79 S320 68 360 70 S423 48 456 53 S504 35 560 28" fill="none" stroke="#dbe1ff" strokeWidth="15" opacity=".65" />
                  <path className="line-main" d="M0 116 C46 109 62 101 94 105 S145 90 180 94 S232 73 274 79 S320 68 360 70 S423 48 456 53 S504 35 560 28" />
                  <path className="line-cite" d="M0 129 C40 126 68 117 104 122 S158 112 192 115 S244 97 278 102 S334 96 368 91 S421 74 454 80 S512 63 560 57" />
                </svg>
              </div>
              <div className="preview-legend"><span><i className="legend-point" />品牌曝光</span><span><i className="legend-point green" />引用表现</span></div>
              <div className="preview-opportunity">
                <span className="opportunity-icon"><Zap aria-hidden="true" size={16} /></span>
                <span><strong>发现 3 个 GEO 增长机会</strong><small>基于演示回答与公开引用信息</small></span>
                <b>+12.4%</b>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="分析原则" className="trust-strip" id="approach">
          <div className="trust-inner">
            <span className="trust-copy">以公开可观测数据为依据，清楚呈现分析边界</span>
            <div className="trust-points">
              <span><ShieldCheck aria-hidden="true" size={15} />回答与引用可追溯</span>
              <span><BarChart3 aria-hidden="true" size={15} />趋势按时间比较</span>
              <span><Sparkles aria-hidden="true" size={15} />模拟结果明确标识</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="features-title" className="features" id="features">
          <div className="section-heading">
            <p>ONE WORKSPACE · CLEAR EVIDENCE</p>
            <h2 id="features-title">从发现变化，到推动优化执行</h2>
            <span>把 AI 平台表现、用户问题、竞品引用和优化工作放在同一个可复查的工作台中。</span>
          </div>
          <div className="feature-grid">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon"><Icon aria-hidden="true" size={19} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="safety-title" className="closing-band" id="safety">
          <div className="closing-panel">
            <div><h2 id="safety-title">先看见证据，再决定怎么优化</h2><p>每条建议都围绕可观察的回答、引用来源和内容差距展开。</p></div>
            <Link className="button button-primary" href="/login">查看演示工作台 <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-brand"><Image alt="" height={23} src="/haixin-logo.svg" width={23} />海心 AI · GEO 智能增长系统</span>
        <span>演示数据不代表真实平台监测结果 · © HaiXin AI</span>
      </footer>
    </>
  );
}
