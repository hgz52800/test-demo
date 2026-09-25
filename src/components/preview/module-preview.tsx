import Link from "next/link";
import { ArrowLeft, ArrowRight, Construction } from "lucide-react";
export function ModulePreview({ title }: { title: string }) {
  return <section className="module-preview"><Link className="preview-back" href="/app/overview"><ArrowLeft size={15}/>返回 GEO 总驾驶舱</Link><div className="preview-icon"><Construction size={23}/></div><span className="demo-tag">后续阶段</span><h1>{title}</h1><p>该模块已纳入海心 AI GEO 产品路线图，目前处于预览阶段。当前演示只提供驾驶舱与增长机会工作流。</p><div className="preview-boundary"><b>当前范围</b><span>本页不连接真实 AI 平台，也不展示伪造的实时结果。</span></div><Link className="button button-primary" href="/app/overview">返回驾驶舱 <ArrowRight size={15}/></Link></section>;
}
