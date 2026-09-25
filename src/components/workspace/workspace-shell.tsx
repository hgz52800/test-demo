"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Activity, Bell, ChartNoAxesCombined, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  CreditCard, Crosshair, Database, LayoutDashboard, ListTodo, Map, Menu, MessagesSquare,
  MoreHorizontal, PanelsTopLeft, Radar, ScanSearch, Search, Settings, Tags, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MAIN_NAV_ITEMS, MORE_NAV_ITEMS } from "./navigation";

const ICONS = {
  LayoutDashboard, ScanSearch, Radar, Crosshair, MessagesSquare, Tags, Database,
  PanelsTopLeft, Map, ListTodo, ChartNoAxesCombined, CreditCard, Settings,
} as const;

type NavItem = { label: string; ariaLabel?: string; href: string; icon: keyof typeof ICONS };

function NavLinks({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();
  const renderItem = (item: NavItem) => {
    const Icon = ICONS[item.icon] ?? Activity;
    return <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
      aria-label={item.ariaLabel ?? item.label} aria-current={pathname === item.href ? "page" : undefined}
      onClick={onNavigate}>
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} /><span>{item.label}</span>
    </Link>;
  };
  return <nav className="workspace-nav" aria-label="主导航">
    {MAIN_NAV_ITEMS.map((item) => renderItem(item as NavItem))}
    <details className="workspace-more">
      <summary title={collapsed ? "更多工具" : undefined} aria-label="更多工具"><MoreHorizontal className="more-menu-icon" size={17} aria-hidden="true"/><span>更多工具</span><ChevronDown className="more-chevron" size={14} aria-hidden="true"/></summary>
      <div className="workspace-more-list">{MORE_NAV_ITEMS.map((item) => renderItem(item as NavItem))}</div>
    </details>
  </nav>;
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notice, setNotice] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!drawerOpen) return;
    drawerRef.current?.querySelector<HTMLElement>("button, a, summary")?.focus();
  }, [drawerOpen]);
  useEffect(() => {
    if (window.innerWidth < 1280) setCollapsed(true);
  }, []);
  const closeDrawer = () => { setDrawerOpen(false); menuButtonRef.current?.focus(); };
  const toggleSidebar = () => setCollapsed((value) => !value);
  return <div className="workspace-shell" data-collapsed={collapsed}>
    <aside className="workspace-sidebar">
      <div className="workspace-brand-row">
        <Link className="workspace-brand" href="/app/overview" aria-label="海心 AI Geo 总览">
          <Image src="/haixin-logo.svg" alt="" width={38} height={38}/>
          <span><b>海心 AI</b><small>GEO 智能增长</small></span>
        </Link>
        <button className="sidebar-collapse" aria-label={collapsed ? "展开侧边栏" : "折叠侧边栏"} onClick={toggleSidebar} title={collapsed ? "展开侧边栏" : "折叠侧边栏"}>
          {collapsed ? <ChevronRight size={17}/> : <ChevronLeft size={17}/>}
        </button>
      </div>
      <div className="workspace-label">工作空间</div>
      <NavLinks collapsed={collapsed}/>
      <div className="sidebar-demo"><span className="demo-avatar">海</span><span>海心演示工作区<small>示例数据 · 仅供体验</small></span></div>
    </aside>
    <div className="workspace-main">
      <header className="workspace-topbar">
        <button ref={menuButtonRef} className="icon-button mobile-menu" aria-label="打开导航" onClick={() => setDrawerOpen(true)}><Menu size={19} /></button>
        <div className="workspace-switch"><span className="workspace-avatar">海</span><span><b>海心家居</b><small>演示工作区</small></span><ChevronDown size={14}/></div>
        <div className="topbar-actions">
          <button className="topbar-action" onClick={() => setNotice("搜索入口将在后续阶段开放")}><Search size={16} /><span>搜索</span><kbd>⌘ K</kbd></button>
          <button aria-label="通知" className="icon-button" onClick={() => setNotice("暂无新通知")}><Bell size={18} /></button>
          <button aria-label="帮助" className="icon-button" onClick={() => setNotice("演示工作区帮助中心")}><CircleHelp size={18} /></button>
          <button aria-label="账户菜单" className="user-avatar" onClick={() => setNotice("当前为只读演示账户")}>林</button>
        </div>
      </header>
      {notice && <div role="status" aria-live="polite" className="workspace-notice">{notice}<button aria-label="关闭提示" onClick={() => setNotice("")}>×</button></div>}
      <main className="workspace-content">{children}</main>
    </div>
    {drawerOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDrawer(); }}>
      <section ref={drawerRef} role="dialog" aria-modal="true" aria-label="主导航" className="mobile-drawer" onKeyDown={(event) => {
        if (event.key === "Escape") { closeDrawer(); return; }
        if (event.key === "Tab") {
          const controls = drawerRef.current?.querySelectorAll<HTMLElement>("button, a[href], summary");
          if (!controls?.length) return;
          const first = controls[0]; const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
        <div className="drawer-heading"><Link className="workspace-brand" href="/app/overview"><Image src="/haixin-logo.svg" alt="" width={34} height={34}/><span><b>海心 AI</b><small>GEO 智能增长</small></span></Link><button className="icon-button" aria-label="关闭导航" onClick={closeDrawer}><X size={19} /></button></div>
        <NavLinks onNavigate={closeDrawer}/>
      </section>
    </div>}
  </div>;
}
