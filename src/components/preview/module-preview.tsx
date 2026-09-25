"use client";

import Link from "next/link";
import { useState } from "react";
import { Activity, ArrowLeft, ArrowRight, BarChart3, BookOpenCheck, CheckCircle2, Construction, Database, FileText, LayoutDashboard, MessagesSquare, ScanSearch, Sparkles, Workflow } from "lucide-react";

const PREVIEW_COPY: Record<string, { description: string; focus: string[]; next: string[] }> = {
  "品牌 AI 体检": { description: "查看品牌资料在 AI 问答场景中的完整度，定位需要补充的公开信息。", focus: ["品牌基础资料", "产品与服务信息"], next: ["检测品牌信息一致性", "查看需核验的公开资料"] },
  "曝光监测": { description: "按平台和用户问题跟踪品牌可见度变化，发现新出现的回答信号。", focus: ["平台可见度趋势", "问题覆盖变化"], next: ["扩展监测问题", "对比周期表现"] },
  "竞品洞察": { description: "从可见回答与公开引用比较品牌和竞品表现，识别可行动的差距。", focus: ["品牌提及对比", "公开引用证据"], next: ["定位差距问题", "进入增长机会"] },
  "用户问题": { description: "整理用户在 AI 平台提出的问题，按意图和产品场景组织需求。", focus: ["高意向选购问题", "问题主题与场景"], next: ["筛选待覆盖问题", "转为内容选题"] },
  "关键词与场景": { description: "将关键词放回用户问题和产品场景中查看，帮助确定内容覆盖方向。", focus: ["关键词主题", "用户需求场景"], next: ["标记重点主题", "查看相关问题"] },
  "内容工厂": { description: "围绕真实用户问题规划可核验的品牌内容，并连接到后续优化任务。", focus: ["问题驱动的内容选题", "可核验的品牌资料"], next: ["选择机会问题", "规划内容与证据"] },
  "企业知识库": { description: "集中整理产品、认证、服务与案例信息，为品牌内容提供可靠依据。", focus: ["品牌知识条目", "资料来源与更新状态"], next: ["补充公开资料", "维护信息一致性"] },
  "信源地图": { description: "梳理回答中出现的公开引用，识别品牌自有页面与第三方信源。", focus: ["公开引用来源", "来源类型与覆盖"], next: ["核验来源内容", "查看缺少引用的问题"] },
  "优化任务": { description: "集中跟进由 GEO 增长机会产生的内容与资料优化事项。", focus: ["任务优先级", "执行与复测状态"], next: ["打开高优先级任务", "跟踪后续变化"] },
  "数据报告": { description: "将品牌可见度、平台变化、引用和优化进度汇总成便于复盘的报告。", focus: ["周期表现摘要", "可观测证据"], next: ["选择报告周期", "复盘优化结果"] },
  "套餐与额度": { description: "查看演示环境中的服务套餐与使用额度信息。", focus: ["套餐内容", "监测与使用额度"], next: ["查看当前演示配置", "了解产品模块"] },
  "账户设置": { description: "管理当前工作区的品牌、成员与偏好配置。", focus: ["工作区信息", "账户偏好"], next: ["核对工作区信息", "返回总览"] },
};

const TABS = ["模块概览", "数据范围", "下一步"];

function ModuleIcon({ title }: { title: string }) {
  const Icon = title.includes("体检") ? ScanSearch : title.includes("监测") ? Activity
    : title.includes("竞品") ? BarChart3 : title.includes("问题") ? MessagesSquare
    : title.includes("知识库") ? Database : title.includes("任务") ? CheckCircle2
    : title.includes("报告") ? FileText : title.includes("内容") ? Workflow
    : title.includes("场景") || title.includes("信源") ? BookOpenCheck : LayoutDashboard;
  return <Icon size={20}/>;
}

export function ModulePreview({ title }: { title: string }) {
  const [activeTab, setActiveTab] = useState(0);
  const copy = PREVIEW_COPY[title] ?? PREVIEW_COPY["数据报告"];
  return <div className="module-preview">
    <section className="module-preview-main">
      <Link className="preview-back" href="/app/overview"><ArrowLeft size={14}/>返回 Geo 总览</Link>
      <div className="module-preview-top">
        <div className="module-preview-title"><span className="preview-icon"><ModuleIcon title={title}/></span><div><span className="section-kicker">HAIXIN GEO WORKSPACE</span><h1>{title}</h1></div></div>
        <span className="sample-label"><Construction size={12}/> 后续阶段</span>
      </div>
      <p className="module-preview-lede">{copy.description}</p>
      <div className="preview-tabs" role="tablist" aria-label="模块信息">
        {TABS.map((tab, index) => <button key={tab} type="button" role="tab" aria-selected={activeTab === index} aria-controls="module-preview-panel" onClick={() => setActiveTab(index)}>{tab}</button>)}
      </div>
      <div className="preview-tab-panel" id="module-preview-panel" role="tabpanel">
        {activeTab === 0 && <><h2>这个模块帮助团队</h2><div className="preview-signal-list">{copy.focus.map((item) => <div className="preview-signal" key={item}><Sparkles size={13}/> {item}</div>)}</div></>}
        {activeTab === 1 && <><h2>当前演示边界</h2><p>此模块目前展示产品能力范围，不连接真实 AI 平台、不读取实时企业资料，也不会生成未经核验的实时监测结论。当前工作台的演示样本可在 Geo 总览中查看。</p></>}
        {activeTab === 2 && <><h2>可衔接的工作流程</h2><div className="preview-signal-list">{copy.next.map((item) => <div className="preview-signal" key={item}><ArrowRight size={13}/> {item}</div>)}</div></>}
      </div>
      <div className="preview-boundary"><b>当前状态</b><span>该模块已列入海心 AI GEO 产品路线图，目前处于预览阶段。现有导航与演示工作流保持可用。</span></div>
    </section>
    <aside className="module-preview-side">
      <span className="section-kicker">WORKSPACE SNAPSHOT</span><h2>当前工作区</h2><p>海心家居 · 演示工作区</p>
      <div className="preview-next"><LayoutDashboard size={14}/> GEO 总览与公开样本趋势</div>
      <div className="preview-next"><CheckCircle2 size={14}/> 增长机会详情与演示任务</div>
      <p>当前数据仅用于产品体验，不代表实时平台结果。</p>
      <Link className="button button-primary" href="/app/overview">回到 Geo 总览 <ArrowRight size={14}/></Link>
    </aside>
  </div>;
}
