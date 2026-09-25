# 海心 AI GEO 智能增长系统

阶段一提供响应式产品介绍、演示入口、GEO 总驾驶舱与模块预览页。驾驶舱使用明确标记的本地模拟数据，不连接外部 AI 平台，也不代表真实监测结果。仓库原有 `hello.py` 示例仍保留。

## 环境与启动

- Node.js 22.12 或更高版本
- pnpm 11（可通过 Corepack 启用）

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:3000` 浏览介绍页；从“进入演示工作台”进入无凭据的预置演示工作区。

## 检查

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

## 数据与范围

模拟 fixtures 和服务 adapter 位于 `src/lib/mock` 与 `src/lib/services`。未来真实 API 应在服务端接入，密钥只允许保存在服务端环境变量中。阶段一未实现真实身份认证、多租户、数据库持久化、AI 平台连接、真实优化内容生成、额度计费或报告导出。
