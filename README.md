# Ayana Personal Website

This is the source for Ayana Mussabayeva’s personal site, live at https://ayana.best. It’s a Next.js 14 App Router project deployed on Vercel (Spaceship). Repo is the single source of truth for prod deploys.

## Stack
- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- i18next for copy; pnpm for package management

## Hosting
- Vercel (Spaceship). Production domain: https://ayana.best
- Deploys from the GitHub repo’s default branch; preview deployments on PRs.

## Local setup
Prereqs: Node.js 18.17+ (20.x recommended) and pnpm installed globally.
```bash
pnpm install
pnpm dev   # http://localhost:3000
```
Optional checks:
```bash
pnpm lint
pnpm build   # requires network to fetch the Inter font via next/font
```

## Deploying on Vercel (from GitHub)
1) In Vercel, **Import Project** and pick this GitHub repo.  
2) Framework preset: **Next.js**. Install command `pnpm install`, build command `pnpm build`; output is handled automatically.  
3) Env vars: none required currently.  
4) Set the production domain to `ayana.best` (already in use on the existing project).  
5) Deploy; Vercel will build on every push to the default branch.
