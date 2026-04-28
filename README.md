# adarsh

My personal site. Built with Next.js 15, TypeScript, Tailwind, and Motion.
Terminal-coded aesthetic, command palette, MDX blog, live GitHub stats.

```
$ whoami
adarsh-jha-dev
$ cat role.txt
full-stack engineer
```

## quick start

```bash
pnpm install   # or npm install / yarn
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## features

- **terminal hero** with a typewriter intro
- **command palette** (`⌘K` / `Ctrl+K`) to jump anywhere
- **project case studies** — every project gets its own page with problem / approach / learnings
- **MDX blog** with RSS feed at `/rss.xml`
- **live GitHub stats** pulled from the public API (cached for an hour)
- **/uses** and **/now** pages
- **contact form** wired to Resend
- **SEO**: sitemap, robots, OG metadata, semantic HTML
- **CRT scanlines** because terminal aesthetic earns them

## structure

```
src/
├── app/                     # next.js app router
│   ├── api/contact/         # email endpoint
│   ├── projects/[slug]/     # project case studies
│   ├── blog/[slug]/         # mdx blog
│   ├── uses/                # tools page
│   ├── now/                 # what i'm focused on
│   ├── sitemap.ts
│   ├── robots.ts
│   └── rss.xml/route.ts
├── components/              # ui + sections
├── content/posts/           # mdx blog posts
└── lib/
    ├── config.ts            # site config — edit me first
    ├── projects.ts          # project data
    └── posts.ts             # mdx loader
```

## customizing

1. `src/lib/config.ts` — your name, email, socials, education
2. `src/lib/projects.ts` — edit / add projects
3. `src/content/posts/*.mdx` — drop in blog posts as MDX
4. `public/cv/Adarsh_Resume.pdf` — drop your CV here (linked from the hero)

## environment variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — for the contact form ([resend.com](https://resend.com), free tier)
- `CONTACT_TO` — where messages should land
- `GITHUB_TOKEN` — optional, raises GitHub API rate limits

The site runs without any of these (form falls back to a console log in dev).

## deploying

1. Push to GitHub as a repo named `adarsh`
2. Import into [Vercel](https://vercel.com/new)
3. Add the environment variables in Project Settings
4. Deploy

The auto-assigned domain will be `adarsh-<your-username>.vercel.app` (or
similar, depending on availability).

## license

MIT — feel free to fork the structure for your own site, but please
write your own copy.
