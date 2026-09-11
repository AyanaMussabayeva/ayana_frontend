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
3) Set the server-only environment variables for ongoing research (see below).
4) Set the production domain to `ayana.best` (already in use on the existing project).  
5) Deploy; Vercel will build on every push to the default branch.

## Private ongoing research

`/research/ongoing` displays a password form; authenticated visitors can open the
Source Localization presentation in English or Russian, including its notation
guide and manuscript PDF. Sessions last eight hours and can be ended with Log out.
The section is excluded from indexing and every project/file request checks the
session on the server. No private material is placed in `public/` or client bundles.

The repository contains only `private/ongoing-research.enc`, an AES-256-GCM
encrypted bundle. Keep both settings from the ignored `.env.local` file in Vercel's
environment variables for the deployments where the section should work:

- `ONGOING_RESEARCH_PASSWORD`: the chosen password, never a `NEXT_PUBLIC_` variable.
- `ONGOING_RESEARCH_SECRET`: the same random 32-byte base64 key used to package
  the bundle. A different key cannot decrypt it. Back up this key privately.

Missing settings disable login and deny access. Neither value is committed. The
deployed bundle is included in the route's server files through Next.js file tracing.
Changing the password invalidates existing sessions; changing the secret requires
repackaging the bundle as well. Do not share `.env.local` in commits or screenshots.

To update the presentation from the research checkout, keeping its original files
outside the website repository:

```bash
node scripts/package-ongoing-research.mjs /path/to/source_localization/presentation
pnpm build
```

The packager includes `index.html`, `index_ru.html`, `../NOTATION.md`, and
`../writing/output/pdf/iclr_draft_v3.pdf`, and adapts their links for the protected
route. The original research files are not modified.

The login endpoint limits failed attempts per server instance. For a deployment
requiring a global limit across Vercel instances, also configure a shared rate limiter
or Vercel Firewall rule for `POST /research/ongoing/session`.

With the production server running locally, verify the access boundary with:

```bash
node scripts/check-ongoing-research.mjs http://127.0.0.1:3110
```
