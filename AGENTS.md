# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 14 (App Router) personal portfolio + MDX blog, deployed to Cloudflare Pages
via `@cloudflare/next-on-pages`. Node 22 and `npm` (there is a `package-lock.json`).

### Running / testing / building
- Dev server: `npm run dev` (http://localhost:3000). Standard scripts live in `package.json`.
- Lint: `npm run lint`. Build: `npm run build`. Both pass; the two `<img>`/alt-text warnings in
  `src/components/mdx.tsx` are pre-existing and non-blocking.
- Cloudflare build (`npm run pages:build`) is only needed for deploy validation, not local dev.

### Environment / secrets (non-obvious)
- Local dev needs a `.env.local` (gitignored; not created by the update script). See `.env.example`
  for the full list.
- The public site (home `/`, `/blog`, `/blog/[slug]`) renders with **no** secrets.
- The admin portal (`/admin`) is gated by `ADMIN_PASSWORD`. Set it in `.env.local` to log in and
  exercise content management locally (login POSTs to `/api/admin/auth/login`, sets an
  `admin_session` cookie, verified via `/api/admin/auth/verify`).
- Newsletter (`/test-newsletter`, `/api/admin/plunk/*`) needs real Plunk keys (`PLUNK_SECRET_KEY`,
  `NEXT_PUBLIC_PLUNK_PUBLIC_KEY`); AI content generation (`/api/admin/llm/generate`) needs
  `LLM_API_KEY`/`LLM_BASE_URL`/`LLM_MODEL_ID`. These call external services and are optional locally.

### Content
- Blog posts are `content/*.mdx` with YAML frontmatter; see `BLOG_STANDARDS.md` for the frontmatter
  and the strict allowed-tags rule. Adding an `.mdx` file adds a route under `/blog/[slug]`.
- All `/api/admin/*` routes use the Edge runtime (`export const runtime = 'edge'`).
