# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: MySQL/MariaDB + Drizzle ORM (migrated from PostgreSQL for Hostinger compatibility)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run build:prod` — runs typecheck + builds API server (esbuild) + Next.js standalone for production deployment
- `pnpm run start:prod` — starts both API server and Next.js standalone via `start.mjs`
- `pnpm run typecheck` — runs `tsc --build --force` using project references, then per-artifact typecheck

## Production Deployment (Hostinger)

Target: Hostinger Business plan (Node.js + MySQL/MariaDB, GitHub auto-deploy).

**Build:** `pnpm install && pnpm run build:prod`
**Start:** `pnpm run start:prod` (runs `node start.mjs`)

`start.mjs` launches both processes:
- API server on `API_PORT` (default 8080) — from `artifacts/api-server/dist/index.mjs`
- Next.js on `PORT` (default 3000) — from standalone `server.js`
- Next.js rewrites proxy `/api/*` to the API server internally

**Required env vars:** See `.env.example` — `MYSQL_URL`, `PORT`, `API_PORT`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (production), `NODE_ENV=production`

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Auth: Email/password (bcryptjs) with session cookies — `src/lib/auth.ts`, `src/middlewares/authMiddleware.ts`, `src/routes/auth.ts`
- Articles API: `src/routes/articles.ts` — public GET + auth-protected admin CRUD (POST/PUT/DELETE/PATCH publish)
- Admin API: `src/routes/admin.ts` — stats, denúncias listing/status, contatos listing/mark-read
- Denúncias: `src/routes/denuncias.ts` — POST saves to DB
- Contato: `src/routes/contato.ts` — POST saves to DB
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle
- Build bundles an allowlist of deps (express, cors, mysql2, drizzle-orm, zod, etc.) and externalizes the rest; output is ESM (`dist/index.mjs`)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with MySQL/MariaDB (mysql2 driver). Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a mysql2 connection pool + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (uses `MYSQL_URL` env var, falls back to `DATABASE_URL`)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Database connection uses `MYSQL_URL` (preferred) or `DATABASE_URL` as fallback. In development, MariaDB runs locally via the "MariaDB" workflow with data at `.local/mysql/data/`. The `MYSQL_URL` env var is set to `mysql://root@127.0.0.1:3306/ubatuba_reage`.

Schema push: `MYSQL_URL="mysql://root@127.0.0.1:3306/ubatuba_reage" pnpm --filter @workspace/db run push`
Seed: `MYSQL_URL="mysql://root@127.0.0.1:3306/ubatuba_reage" pnpm --filter @workspace/api-server run seed`

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/ubatuba-reage` (`@workspace/ubatuba-reage`)

Next.js 16.2.1 civic journalism portal (Ubatuba Reage) with full SEO optimizations. Runs as a standalone Next.js app on port 3000.

- **Tech stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, Shadcn/UI
- **Fonts:** TIActuBeta (custom woff in /public/fonts/) + Newsreader (Google Fonts)
- **Design:** Dark sidebar 260px (#111111), light content (#f5f5f5), primary blue #4B59F7
- **Data layer:** Articles fetched from API (`/api/articles`) backed by MySQL/MariaDB; `src/lib/articles.ts` has async fetch functions with 30s revalidation
- **SEO features implemented:**
  - Per-page `<title>`, `<meta description>`, canonical URLs
  - Open Graph (og:title, og:description, og:image, og:url, og:site_name, og:locale, og:type)
  - Twitter Card (summary_large_image)
  - Schema.org structured data: WebSite, Organization, NewsArticle, BreadcrumbList, CollectionPage
  - `/sitemap.xml` (auto-generated from articles data)
  - `/robots.txt` (allows all, points to sitemap)
  - `/feed.xml` RSS 2.0 feed
  - Category pages at `/categoria/[slug]`
  - Breadcrumb navigation with BreadcrumbList schema
  - Font preloading for TIActuBeta .woff files
- **Frontend features:**
  - Cookie consent banner (LGPD) with localStorage persistence
  - Author photo (avatar) + bio displayed on article pages
  - "Apoie" sticky button alongside share buttons on articles
  - Donation banner inserted between article paragraphs (after 3rd paragraph)
  - Editorial series support (optional `series` field on articles) with red badges on cards + article pages
  - Full article lead text on cards (no truncation) with "Ver mais" indicator
  - Threads + WhatsApp Channel in social bar and footer
  - `/materias` archive page with category filters
  - Campaign banner on home page (toggle via `CAMPAIGN_BANNER_ENABLED` in site-config.ts)
- **Key files:**
  - `src/lib/articles.ts` — async API-backed article fetching functions (getAllArticles, getArticleBySlug, etc.)
  - `src/app/admin/` — Full admin panel (dashboard, articles CRUD, denúncias viewer, contatos viewer) with email/password auth
  - `src/lib/site-config.ts` — site-wide constants (URL, name, locale, campaign banner config)
  - `src/app/layout.tsx` — root layout with global metadata, Schema.org, font preloading, cookie banner
  - `src/app/page.tsx` — homepage with CollectionPage schema + campaign banner
  - `src/app/article/[slug]/page.tsx` — article detail with NewsArticle schema + full OG + in-article donation
  - `src/app/materias/page.tsx` — article archive page with category filters
  - `src/app/categoria/[slug]/page.tsx` — category listing pages
  - `src/app/sitemap.ts` — dynamic sitemap generation
  - `src/app/robots.ts` — robots.txt generation
  - `src/app/feed.xml/route.ts` — RSS 2.0 feed
  - `src/components/seo/breadcrumbs.tsx` — breadcrumb with BreadcrumbList schema
  - `src/components/layout/cookie-banner.tsx` — LGPD cookie consent
  - `src/components/layout/campaign-banner.tsx` — configurable campaign banner
  - `src/components/layout/social-bar.tsx` — social links bar (Threads, WhatsApp Channel included)
- **Run:** `pnpm --filter @workspace/ubatuba-reage run dev`
- **Workflow:** "Ubatuba Reage" on port 3000

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
