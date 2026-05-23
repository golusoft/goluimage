# GoluImages — Premium Image Tools SaaS

A production-ready, SEO-first image tools platform built with Next.js 15, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, and Supabase. Every tool runs **client-side** using the Canvas API for instant performance and near-zero hosting costs.

## Features

- 30+ high-traffic image tools (compressor, resizer, cropper, converters, watermark, QR, color picker, metadata, etc.)
- Client-side image processing — no server round-trip
- Premium SaaS UI inspired by Vercel / Linear / Stripe
- Dark/light mode, glassmorphism, soft shadows, smooth Framer Motion animations
- SEO-first: dynamic metadata, JSON-LD (FAQ + Breadcrumb + SoftwareApplication), sitemap, robots, OG/Twitter cards
- Programmatic SEO engine (`/compress-image-to-[size]`, `/resize-image-for-[platform]`, etc.)
- Blog system (MDX-style content) with TOC, reading progress, related posts
- Private admin dashboard with JWT auth (analytics, blog, SEO, AdSense, feedback)
- Real integrations: GA4, Google Search Console, Supabase, UptimeRobot, AdSense

## Quick start

```bash
cp .env.example .env.local
# fill in Supabase keys, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET, UPTIMEROBOT_API_KEY
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the env vars from `.env.example` in **Project → Settings → Environment Variables**.
4. Deploy.

## Architecture

- `src/app` — App Router pages and API routes
- `src/components` — UI primitives, layout, tool shells
- `src/components/tools` — individual image tool implementations (Canvas-based)
- `src/lib` — tool registry, SEO helpers, Supabase clients, auth, utils
- `src/content/blog` — markdown blog content
- `middleware.ts` — JWT-protected admin routes

## Security

The admin password and API keys are loaded **only** from environment variables. Never commit `.env.local`. Set production secrets in Vercel's encrypted environment variables UI.

## License

MIT — © GoluImages
