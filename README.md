# Ayana Personal Website

Next.js 14 app for Ayana's personal site, migrated from v0.dev. The repo is ready for local development and Vercel deployment.

## Prerequisites
- Node.js 18.17+ (20.x recommended)
- pnpm installed globally (`npm install -g pnpm`)

## Local setup
```bash
pnpm install
pnpm dev
```
The site runs at http://localhost:3000. Lint or build locally before pushing:
```bash
pnpm lint
pnpm build
```

## Deploying on Vercel (GitHub integration)
1. Push this repository to GitHub (done).
2. In Vercel, **Import Project** → choose the GitHub repo.
3. Framework preset: **Next.js**. Build command `pnpm build`, install command `pnpm install`. Output directory defaults to `.vercel/output` (handled by Next).
4. Environment variables: none required currently. Add them in Vercel if you introduce any later.
5. Click **Deploy**. Vercel will build on every push to the default branch.

## Notes
- `components.json` now points at `tailwind.config.js` to match the repo, so shadcn/ui commands work without edits.
- Images are served unoptimized (`next.config.mjs`), matching the v0.dev export. Update if you want Next.js image optimization.
