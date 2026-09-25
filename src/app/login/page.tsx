import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
export default function LoginPage() {
  return <main className="demo-entry"><Link className="demo-back" href="/"><ArrowLeft size={15}/>返回产品介绍</Link><section className="demo-entry-card"><Image src="/haixin-logo.svg" alt="" width={48} height={48}/><p className="eyebrow">HAIXIN AI · GEO WORKSPACE</p><h1>进入演示工作台</h1><p className="demo-entry-copy">体验品牌可见度分析、增长机会和优化工作流。</p><div className="workspace-choice"><span className="workspace-avatar">海</span><span><b>海心家居</b><small>海心演示组织 · 示例数据</small></span><span className="demo-selection">演示</span></div><Link className="button button-primary demo-enter" href="/app/overview">进入海心家居演示工作区 <ArrowRight size={16}/></Link><p className="demo-privacy"><ShieldCheck size={15}/>演示入口不会收集账号或密码，也不会创建真实用户。</p></section><p className="demo-footnote">数据为合成示例 · 不代表真实 AI 平台监测结果</p></main>;
}
