# Astor Web · Marketing site + Agent demo

独立 Vercel 部署项目 (从 monorepo `apps/web` 镜像而来)。

## Stack

- Next.js 15.1 (App Router)
- React 19
- Tailwind CSS 3.4
- Prisma 5.22 + PostgreSQL (Neon)
- TypeScript 5.6

## 本地开发

```bash
cp .env.example .env
# 编辑 .env, 填 DATABASE_URL (Neon: https://neon.tech)
pnpm install
pnpm db:push        # 推送 schema 到 DB
pnpm db:seed        # (可选) 插 demo 数据
pnpm dev
```

不设置 DATABASE_URL 时, 所有体验走 mock 模式 (问卷/对话/数据面板 显示 "未连接数据库")。

## 部署到 Vercel

1. vercel.com → Import `github.com/decendao/astor-web`
2. Framework Preset: Next.js (自动检测)
3. Environment Variables:
   - `DATABASE_URL` (Neon Pooled connection)
   - `DATABASE_DIRECT_URL` (Neon Direct connection)
   - `IP_HASH_SALT` (随机字符串)
4. Deploy → 拿到 `https://astor-web.vercel.app`

push master 自动部署。PR 自动起 preview URL。

## 目录

```
app/                   # Next.js App Router
  page.tsx             # 首页
  astor/page.tsx       # 智能体 demo
  admin/stats/page.tsx # 实时数据面板
  api/                 # Route handlers
    survey/submit/     # 问卷提交 (写 DB)
    astor/stream/      # 智能体流式接口 (写 DB)
    admin/stats/       # 统计接口
components/            # 客户端组件
lib/                   # 工具函数 + Prisma client
prisma/                # schema + seed
```

## 与 monorepo 同步

`decendao/AstorAI` 仓的 `apps/web/` 是真源。修改后同步到此仓:

```bash
# 在 monorepo 根
git push origin master              # CNB
git push github master              # GitHub (AstorAI)
# 手动同步 apps/web 到 astor-web
rsync -av --delete --exclude='.next' --exclude='node_modules' \
  apps/web/ /tmp/astor-web/
cd /tmp/astor-web
git add -A && git commit -m "sync from monorepo"
git push origin master
```

后续可加 GitHub Action 自动同步 (`.github/workflows/sync-from-monorepo.yml`)。