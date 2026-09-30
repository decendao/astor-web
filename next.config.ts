import type { NextConfig } from "next";

/**
 * Next.js 配置 (Vercel 部署专用)
 *
 * 本仓是 Vercel 独立部署版, 始终 SSR + Edge 函数 + 动态路由。/api/* route handler
 * 必须保留 (问卷入库、智能体流式接口)。
 *
 * 静态导出是另一个部署模式 (阿里云 OSS / CDN), 用 ECS 上的 build-static.sh
 * + 临时移开 app/api/ 实现, 不需要在本 config 里写条件。
 */
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["framer-motion", "recharts"] },
};

export default config;