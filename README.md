# adarsh

My personal site. Next.js 15, TypeScript, Tailwind, shadcn/ui primitives,
and Motion — a light-first editorial layout with a warm-neutral palette
and a terracotta accent, dark mode included.

## quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## features

- **Editorial light/dark theme** built on CSS custom properties, with
  `next-themes` handling the no-flash SSR handoff
- **Bento project grid** (Aceternity-style) — a highlight slides between
  tiles on a shared `layoutId`, and a spotlight tracks the cursor inside
  the hovered tile
- **Project case studies** — every project gets a routed page with the
  problem, the approach, and what I learned
- **Live GitHub activity** — a "last pushed" timeline that includes the
  featured projects, so it doubles as proof they're still maintained
- **Command palette** (`⌘K` / `Ctrl+K`) for pages, case studies, résumé,
  and the theme toggle
- **MDX writing** with an RSS feed at `/rss.xml`
- **Contact form** wired to Resend
- **SEO** — sitemap, robots, canonicals, and a generated OG image

## structure

```
app/
├── api/
│   ├── contact/            # Resend email endpoint
│   └── now-playing/        # Last.fm currently-playing
├── projects/[slug]/        # case studies
├── blog/[slug]/            # MDX posts
├── opengraph-image.tsx     # generated social card
├── sitemap.ts, robots.ts
└── rss.xml/route.ts
components/
├── ui/                     # button, badge, bento-grid
└── *.tsx                   # page sections
lib/
├── config.ts               # site config — edit me first
├── projects.ts             # project data + case study copy
├── github.ts               # GitHub API fetcher
└── posts.ts                # MDX loader
```

## customizing

1. `lib/config.ts` — name, role, socials, experience, skills
2. `lib/projects.ts` — projects and their case studies. `featured: true`
   puts a project in the homepage bento; tile sizes come from the
   `SPANS` array in `components/featured-projects.tsx`
3. `content/posts/*.mdx` — blog posts
4. `public/cv/Adarsh_SDE.pdf` — CV, linked from the hero and footer

## environment variables

- `RESEND_API_KEY` — contact form ([resend.com](https://resend.com), free tier)
- `CONTACT_TO` — where messages land
- `CONTACT_FROM` — optional verified sender
- `GITHUB_TOKEN` — optional; raises the GitHub API rate limit from 60/hr
  to 5000/hr. If the token is missing *or rejected*, the fetcher falls
  back to unauthenticated requests rather than blanking the section
- `LASTFM_API_KEY`, `LASTFM_USERNAME` — footer now-playing widget

The site runs without any of these: the contact form falls back to a
console log in dev, and the GitHub and now-playing sections degrade to a
static link or hide themselves.

## deploying

1. Push to GitHub
2. Import into [Vercel](https://vercel.com/new)
3. Add the environment variables in Project Settings
4. Deploy

## license

MIT — fork the structure if it's useful, but please write your own copy.
