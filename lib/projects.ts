export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "wip" | "archived";
  year: string;
  stack: string[];
  links: {
    live?: string;
    code?: string;
  };
  highlights: string[];
  problem?: string;
  approach?: string;
  learnings?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "diffwatch",
    name: "diffwatch",
    tagline: "AI-powered PR review platform with multi-persona feedback",
    description:
      "An AI code review tool that ingests a pull request and returns actionable feedback in under 15 seconds. Runs parallel analysis across diffs, CI status, vulnerability signals, and bundle impact, then surfaces the results through four distinct reviewer personas.",
    status: "live",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Gemini AI", "Supabase", "Tailwind"],
    links: {
      live: "https://pr-review-agent-three.vercel.app/",
      code: "https://github.com/adarsh-jha-dev/pr-review-agent",
    },
    highlights: [
      "Actionable PR feedback generated in <15s",
      "Parallel analysis pipeline: diffs, CI status, vulnerabilities, bundle impact",
      "Multi-persona review system — Architect, Security, PM, Intern — with streaming output",
      "Commit history analysis, risk detection, and anti-pattern flagging",
    ],
    problem:
      "Code review is one of the highest-leverage activities on a team, but it's slow and inconsistent — reviewers focus on different things, miss security issues, or skip context. I wanted a tool that could give the same thorough, multi-angle review automatically in the time it takes to open a PR.",
    approach:
      "Built a parallel analysis pipeline in Next.js that fans out across diff parsing, CI API calls, and vulnerability pattern matching simultaneously. Each Gemini prompt is scoped to a specific reviewer persona so the feedback voice is distinct and purposeful — not a single blob of AI text. Streaming output via Server-Sent Events keeps the UI responsive while the analysis runs.",
    learnings:
      "Prompt scoping is everything. Giving the model a narrow, well-defined role (security reviewer vs. PM) produces far more useful output than asking a general question. The parallel fan-out also cut latency by ~60% vs. sequential calls.",
    featured: true,
  },
  {
    slug: "metaguard-ai",
    name: "metaguard ai",
    tagline: "AI data governance copilot for OpenMetadata",
    description:
      "A governance copilot built on top of OpenMetadata that auto-classifies PII, scores metadata quality, and lets you query your data catalog in plain English. Built for the OpenMetadata Hackathon.",
    status: "live",
    year: "2026",
    stack: ["Next.js", "TypeScript", "OpenMetadata", "Gemini AI", "Tailwind"],
    links: {
      live: "https://metaguard.vercel.app",
      code: "https://github.com/adarsh-jha-dev/metaguard-ai",
    },
    highlights: [
      "PII auto-classification using Gemini 2.5 Flash; tags pushed back via OpenMetadata APIs",
      "Governance health score (0–100) based on metadata completeness and tagging coverage",
      "Natural language querying of metadata via AI agent with dynamic API routing",
      "Built end-to-end during a hackathon sprint",
    ],
    problem:
      "Data governance in large organizations is manual and inconsistent. Teams tag PII by hand, health metrics live in spreadsheets, and finding the right dataset still means asking someone who's been there long enough to know. I wanted to see how much of that could be automated with a small AI layer on top of an existing catalog.",
    approach:
      "Used OpenMetadata as the data catalog backbone — it already has an API for everything. On top of it, wired Gemini 2.5 Flash to scan column names and sample metadata for PII signals, then wrote the tags back through the OpenMetadata REST API. The health score aggregates completeness signals (descriptions filled, owners set, tags present) into a single 0–100 number. The NL query agent routes each question to the right OpenMetadata endpoint rather than trying to answer from model memory.",
    learnings:
      "Dynamic API routing via an LLM agent is surprisingly reliable when you give it a strict schema of available endpoints. Hallucination rate dropped dramatically once I switched from free-form descriptions to typed tool definitions.",
    featured: true,
  },
  {
    slug: "podcastr",
    name: "podcastr",
    tagline: "AI-powered podcast generation platform",
    description:
      "Generate full podcasts from a transcript — pick an AI voice, generate or upload a thumbnail, publish. Mobile-first, real-time backend on Convex.",
    status: "live",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Convex", "OpenAI", "Tailwind", "Clerk"],
    links: {
      code: "https://github.com/adarsh-jha-dev/podcastr",
      live: "https://podcastr-beryl-two.vercel.app"
    },
    highlights: [
      "AI voice synthesis from text transcripts",
      "AI thumbnail generation with image models",
      "Real-time data sync with Convex DB",
      "Fully responsive across mobile & desktop",
    ],
    problem:
      "Creating a podcast is a multi-tool dance: scripting, recording, editing, designing cover art, hosting. I wanted to compress that into a single flow where the only input is the script.",
    approach:
      "Built on Next.js App Router with Convex as the realtime backend — it gave me reactive queries out of the box. Wired OpenAI's TTS for voices and an image model for thumbnails. Clerk handled auth so I could focus on the content pipeline.",
    learnings:
      "Convex is genuinely magical for projects that need realtime without managing websockets. But streaming AI output through serverless functions has cold-start tax — worth measuring before committing.",
  },
  {
    slug: "snapgram",
    name: "snapgram",
    tagline: "Instagram-style social platform with Appwrite",
    description:
      "Photo-sharing social app with following, likes, infinite scroll, and saved posts. Built to learn react-query and shadcn/ui.",
    status: "live",
    year: "2024",
    stack: ["React", "TypeScript", "Appwrite", "react-query", "shadcn/ui", "Tailwind"],
    links: {
      code: "https://github.com/adarsh-jha-dev/snapgram",
      live: "https://snapgram-gamma-nine.vercel.app/"
    },
    highlights: [
      "Infinite-scroll feed with react-query",
      "Optimistic UI for likes and saves",
      "Appwrite for auth, storage, and database",
      "Component system with shadcn/ui",
    ],
    problem:
      "I'd built CRUD apps but never seriously dealt with cache invalidation and optimistic updates at scale. Needed a project where those patterns actually mattered.",
    approach:
      "Used react-query as the single source of truth for server state — every mutation paired with explicit invalidation or optimistic update. Appwrite handled the backend so I could focus on the data layer.",
    learnings:
      "Optimistic updates feel like cheating until you have to handle the rollback. Designing the rollback path is the real work.",
    featured: true,
  },
];
