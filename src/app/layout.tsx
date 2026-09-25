import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "海心 AI · GEO 智能增长系统",
  description: "通过可观测的 AI 回答与公开引用信息，帮助品牌发现 GEO 增长机会。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
