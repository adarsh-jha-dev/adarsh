export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "wip" | "archived";
  year: string;
  /** Short label for the kind of work — shown as an eyebrow on cards. */
  kind: string;
  stack: string[];
  links: {
    live?: string;
    code?: string;
  };
  /** Optional headline metric, rendered large on the bento tile. */
  metric?: { value: string; label: string };
  highlights: string[];
  problem?: string;
  approach?: string;
  learnings?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "mcp-scanner",
    name: "MCP Scanner",
    tagline: "Prompt-injection scanner for MCP servers, scored like a classifier",
    description:
      "Point it at an MCP endpoint. It reads every tool the server exposes, checks descriptions and schemas for planted instructions, then runs a live agent against the server with poisoned tool output to see whether the agent actually obeys.",
    status: "live",
    year: "2026",
    kind: "AI security",
    stack: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Valkey",
      "BullMQ",
      "Gemini",
      "Drizzle",
    ],
    links: {
      live: "https://mcp-scanner-seven.vercel.app",
      code: "https://github.com/adarsh-jha-dev/mcp-scanner",
    },
    metric: { value: "F1 0.800", label: "at 9.4% false-positive rate" },
    highlights: [
      "Two passes — deterministic regex rules over tool schemas, then a live agent probe carrying a unique canary token",
      "Scored against a labelled corpus of 59 tool definitions: 27 graded attacks and 32 benign tools, 13 of them hard negatives written to trip a rule",
      "Rewrote the weakest rule from 44% to 100% precision, taking the detector from 25% to 9.4% FPR with recall unchanged",
      "A response suppressed by the provider's safety filter is recorded as inconclusive, never as safe",
      "19 tests that need no network and no model quota — the model is injected as a dependency",
    ],
    problem:
      "An MCP server hands tool descriptions, schemas, and results straight into a model's context. Every one of those is a place to plant instructions, and the agent has no way to tell them apart from the user's own request. I wanted to know whether a given server was safe to connect to — and to answer it with a number rather than a vibe.",
    approach:
      "The decision worth defending is that the scanner drives the MCP connection itself instead of using a provider's server-side connector. A connector executes tool calls on your behalf, which makes it impossible to tamper with a tool result — and tampering with tool results is the entire test, because that is exactly how indirect prompt injection arrives in production. The static pass is pure regex over descriptions and schemas: free, instant, deterministic, no model involved. The live pass runs a real agent loop against high-risk tools, fetches the genuine result, appends a payload carrying a canary token, and feeds it back. Detection is an exact string match on that canary rather than a model's judgement, which keeps it testable. Scans run through a queued worker at concurrency 1 — a live probe makes several sequential model calls and outlives any sensible HTTP timeout, and the free tier is metered per minute.",
    learnings:
      "The first measurement came back at F1 0.727 with a 25% false-positive rate, and the cause was one rule: it flagged any URL at high severity, so it fired on more honest tools than hostile ones. Naming a URL is what a fetch tool is for. Rewriting it to key on what the description asks the model to *do* with the URL — an outbound verb beside it, an embed that loads without a click, a URL hardcoded as a parameter default — took that rule to 100% precision and the whole detector to F1 0.800, recall unchanged. Building the labelled corpus first is what made the fix findable at all.",
    featured: true,
  },
  {
    slug: "patently",
    name: "Patently",
    tagline: "Prior-art analysis that tells you which parts of your invention are already taught",
    description:
      "Describe what you're building in plain English and get back an element-by-element map of which parts the prior art already teaches, with the passage behind every finding — plus the whitespace nothing covers.",
    status: "live",
    year: "2026",
    kind: "AI / retrieval",
    stack: [
      "TypeScript",
      "Next.js",
      "Python",
      "BERT-Large",
      "Qdrant",
      "Gemini",
      "OpenAI",
      "Docker",
    ],
    metric: { value: "2 LLM calls", label: "per analysis, any corpus size" },
    links: {
      live: "https://patently-gamma.vercel.app",
      code: "https://github.com/adarsh-jha-dev/patently",
    },
    highlights: [
      "Claim-element decomposition — breaks a description into the discrete features a novelty search actually has to clear",
      "Multi-angle retrieval across 4–6 targeted searches, fused with Reciprocal Rank Fusion so consistent mid-pack hits beat one-angle spikes",
      "Every quote verified verbatim against its source abstract; a citation that can't be located is downgraded automatically",
      "§103 combination risk found by exhaustive set arithmetic over the coverage matrix, not by asking a model",
      "88 tests covering quote grounding, rank fusion, the §103 arithmetic and the inconclusive guard — no network, no API key",
    ],
    problem:
      "A semantic search over patents returns ten documents that look like your invention. That's the easy half, and a good Google Patents query roughly does it already. It doesn't answer the question you actually have, which is which parts of my invention are already taught, and by what.",
    approach:
      "A four-stage pipeline — decompose, retrieve, assess, synthesise — that spends exactly two LLM calls regardless of how many candidates come back. Everything computable is computed rather than asked, which is why the combination analysis and the scoring are reproducible across runs. Embedding one whole paragraph averages away the specifics that decide novelty, so retrieval runs several targeted angles separately and fuses the rankings. The embeddings service is a container rather than a serverless function: the vectors already in Qdrant came from BERT-Large, so query vectors must too. The image bakes in the 1.3 GB model and installs CPU-only torch, making a cold start a disk read rather than a download — measured resident memory is about 580 MB because the weights are memory-mapped.",
    learnings:
      "The most important output turned out to be the refusal. When the corpus has nothing in your field, Patently returns Inconclusive instead of a clean 100/100 — an absence only means something if you know what was searched and what came back, and a tool that mistakes an empty index for a novelty clearance is worse than no tool at all. The same instinct drove the guided form: a blank textarea rewards people who already write like a patent attorney and quietly gives everyone else a worse search.",
    featured: true,
  },
  {
    slug: "medswitch",
    name: "MedSwitch",
    tagline: "Finds a cheaper, chemically identical substitute for Indian prescriptions",
    description:
      "Compares pharmacy prices and compositions across Indian retailers so a patient on a chronic medication can find an equivalent that costs a fraction of the brand — and flags anything on the CDSCO banned list along the way.",
    status: "live",
    year: "2026",
    kind: "Data engineering",
    stack: [
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "pgvector",
      "Bright Data",
      "OpenAI",
    ],
    metric: { value: "₹5,684", label: "annual saving on one real prescription" },
    links: {
      live: "https://medswitch.vercel.app",
      code: "https://github.com/adarsh-jha-dev/medswitch",
    },
    highlights: [
      "Resolves molecules across retailers through synonyms and salt-form differences, then matches equivalents by composition fingerprint",
      "A real prescription resolves to the same composition at ₹17.09 and ₹1.51 per tablet — about ₹5,684 a year at one tablet daily",
      "Hybrid parsing: regex for rigidly structured retailers, batched LLM for free text, cached by hash — roughly 40% of rows parse with zero LLM calls",
      "Every scraped composition checked against the CDSCO list of banned fixed-dose combinations",
      "Nearest Jan Aushadhi store ranked by real haversine distance rather than a pincode-string guess",
    ],
    problem:
      "Someone on a long-term prescription in India can be paying ten times what the identical composition costs at a different retailer, and there is no way to check without knowing the chemistry. The information is public and spread across sites that describe the same drug in incompatible ways.",
    approach:
      "Product listings are ingested from four public sources into a re-parseable raw store, so a parser bug is a re-run rather than a re-scrape. Each retailer's composition text is parsed into structured molecule, strength, dosage form and release modifier by whichever parser matches the grammar it actually uses — one regex handles PharmEasy's rigid strings, a Zod-validated batched LLM parser handles Jan Aushadhi's free text, cached by hash so a re-run only pays for genuinely new strings. Molecule resolution tries exact match, then an alias table, then salt-suffix stripping, before auto-creating a new molecule as a last resort. Equivalents converge on a composition fingerprint, and substitution queries compare real price-per-unit.",
    learnings:
      "Extraction gaps had to become visible rather than silent. Apollo's extraction is noticeably less reliable under batch scraping — most likely anti-bot rate limiting rather than a collector bug — and the useful move was logging every gap as an `extraction_issue` row instead of dropping it. A pipeline that quietly loses 20% of its rows looks exactly like one that works.",
    featured: true,
  },
  {
    slug: "metaguard-ai",
    name: "MetaGuard AI",
    tagline: "AI data governance copilot for OpenMetadata",
    description:
      "A governance copilot built on top of OpenMetadata that auto-classifies PII, scores metadata quality, and lets you query your data catalog in plain English.",
    status: "live",
    year: "2026",
    kind: "AI product",
    stack: ["Next.js", "TypeScript", "OpenMetadata", "Gemini", "Tailwind"],
    links: {
      live: "https://metaguard-ai.vercel.app",
      code: "https://github.com/adarsh-jha-dev/metaguard-ai",
    },
    highlights: [
      "PII auto-classification using Gemini 2.5 Flash, with tags pushed back through the OpenMetadata APIs",
      "Governance health score (0–100) derived from metadata completeness and tagging coverage",
      "Natural-language querying of the catalog via an agent that routes to real endpoints instead of answering from memory",
      "Built end-to-end during a hackathon sprint",
    ],
    problem:
      "Data governance in large organisations is manual and inconsistent. Teams tag PII by hand, health metrics live in spreadsheets, and finding the right dataset still means asking someone who has been there long enough to know. I wanted to see how much of that a small AI layer on top of an existing catalog could absorb.",
    approach:
      "OpenMetadata is the catalog backbone — it already has an API for everything. On top of it, Gemini 2.5 Flash scans column names and sample metadata for PII signals and writes tags back through the REST API. The health score aggregates completeness signals — descriptions filled, owners set, tags present — into one number. The natural-language agent routes each question to the right endpoint rather than trying to answer from model memory.",
    learnings:
      "Dynamic API routing through an LLM agent is surprisingly reliable once you give it a strict schema of available endpoints. The hallucination rate dropped sharply the moment I switched from free-form descriptions to typed tool definitions.",
    featured: true,
  },
  {
    slug: "diffwatch",
    name: "DiffWatch",
    tagline: "AI pull-request review with multi-persona feedback",
    description:
      "Ingests a pull request and returns actionable feedback in under 15 seconds, running parallel analysis across diffs, CI status, vulnerability signals and bundle impact, then surfacing it through four distinct reviewer personas.",
    status: "live",
    year: "2026",
    kind: "Developer tools",
    stack: ["Next.js", "TypeScript", "Gemini", "Supabase", "Tailwind"],
    metric: { value: "<15s", label: "from PR link to full review" },
    links: {
      live: "https://pr-review-agent-three.vercel.app",
      code: "https://github.com/adarsh-jha-dev/pr-review-agent",
    },
    highlights: [
      "Parallel analysis pipeline across diffs, CI status, vulnerabilities and bundle impact",
      "Four scoped reviewer personas — Architect, Security, PM, Intern — with streaming output",
      "Commit-history analysis, risk detection and anti-pattern flagging",
    ],
    problem:
      "Code review is one of the highest-leverage activities on a team, but it's slow and inconsistent. Reviewers focus on different things, miss security issues, or skip context entirely. I wanted the same thorough multi-angle review to happen automatically in the time it takes to open a PR.",
    approach:
      "A fan-out pipeline in Next.js runs diff parsing, CI API calls and vulnerability pattern matching simultaneously. Each prompt is scoped to a specific reviewer persona so the feedback has a distinct, purposeful voice instead of arriving as one blob of AI text. Streaming over Server-Sent Events keeps the UI responsive while analysis runs.",
    learnings:
      "Prompt scoping is everything. Giving the model a narrow, well-defined role — security reviewer versus PM — produces far more useful output than asking one general question. The parallel fan-out also cut latency roughly 60% against sequential calls.",
    featured: true,
  },
  {
    slug: "coral-compass",
    name: "Coral Compass",
    tagline: "Measures what context switching actually costs you",
    description:
      "Joins your commits, calendar and chat onto one hourly timeline, scores the day 0–100, and asks a model to name the fragmentation pattern in the data.",
    status: "wip",
    year: "2026",
    kind: "Hackathon",
    stack: ["Next.js", "TypeScript", "Coral", "Gemini", "Anthropic"],
    links: {
      live: "https://coral-campass.vercel.app",
      code: "https://github.com/adarsh-jha-dev/coral-campass",
    },
    highlights: [
      "Joins three signals — GitHub commits as deep work, calendar as scheduled fragmentation, chat pings as unscheduled",
      "A single SQL join stitches them into hourly rows, then scores context switches and refocus tax at roughly 15 minutes per switch",
      "Provider-agnostic insight layer — Gemini or Anthropic behind one env toggle",
    ],
    problem:
      "Most focus tools watch a single signal, which is why their advice never lands. The cost of a fragmented day isn't the meeting itself — it's the refocus tax on either side of it, and you can only see that by joining calendar against work that actually happened.",
    approach:
      "Three Coral data sources feed one SQL join that buckets the day by hour into commits, meetings and pings. The scoring is plain arithmetic over those rows — context switches, refocus tax, longest uninterrupted block — and only the final naming of the pattern goes to a model.",
    learnings:
      "Shipped as a hackathon build and labelled as one. The mock-data path is solid and the live join works end-to-end on GitHub and chat; calendar is wired but rough around timezone edges. Being explicit about that in the README was more useful than polishing it into looking finished.",
    featured: false,
  },
];

/** Featured projects, in the order they appear in the bento grid. */
export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Repo names for every curated project, derived from its GitHub link.
 * Passed to the GitHub fetcher so the "latest on GitHub" feed never
 * repeats something that already has a case study above it.
 */
export function curatedRepoNames(): string[] {
  return projects
    .map((p) => p.links.code?.split("/").pop())
    .filter((n): n is string => Boolean(n));
}
