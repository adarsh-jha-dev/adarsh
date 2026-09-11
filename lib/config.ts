export const siteConfig = {
  name: "Adarsh Jha",
  handle: "adarsh-jha-dev",
  role: "AI Product Engineer",
  location: "Kolkata, India",
  email: "adarshjhaxif@gmail.com",
  url: "https://adarsh-psi-flax.vercel.app",
  description:
    "AI product engineer shipping production LLM features and agentic systems. Currently building red-teaming infrastructure for NIST, UNESCO, IMDA, and the DoD at Humane Intelligence.",
  // One-sentence positioning line used in the hero.
  tagline:
    "I build AI products that make it to production — LLM features, evaluation pipelines, and the interfaces that make them useful.",
  bio: "I work in the gap between application code and AI models: wiring LLMs into real product workflows, building evaluation pipelines, and shipping the UI that makes any of it matter. Currently at Humane Intelligence, where the red-teaming platform I work on is used by NIST, UNESCO, IMDA and the DoD.",
  availability: "Open to full-time SDE roles from summer 2026",
  social: {
    github: "https://github.com/adarsh-jha-dev",
    linkedin: "https://www.linkedin.com/in/adarshjha0410",
    twitter: "https://twitter.com/Adarsh_Jha_0410",
  },
  cv: "/cv/Adarsh_SDE.pdf",
} as const;

export const experience = [
  {
    company: "Humane Intelligence",
    url: "https://humane-intelligence.org",
    role: "Software Engineer",
    period: "Sept 2024 — Present",
    current: true,
    summary:
      "Build and ship red-teaming and evaluation infrastructure used by national standards bodies and government agencies.",
    bullets: [
      "Develop and deploy red-teaming projects across the platform",
      "Integrate multiple AI model providers into the evaluation pipeline",
      "Implement AI red-teaming features scoped to client requirements",
      "Build the annotation workflow for validating model outputs and red-teaming results",
    ],
    clients: ["NIST", "IMDA", "UNESCO", "DoD"],
    stack: ["Next.js", "PostgreSQL", "Docker", "AWS", "Vercel"],
  },
  {
    company: "1 Percent Verse",
    url: "",
    role: "SDE Intern",
    period: "Feb 2024 — May 2024",
    current: false,
    summary:
      "Built a React + TypeScript frontend for an AI-powered career roadmap platform (similar to roadmap.sh)",
    bullets: [
      "Translated Figma designs into production UI, rendering AI-generated learning paths and skill trees ",
      "Designed Supabase-backed REST APIs for user data, progress tracking, and roadmap delivery",
      "Owned the integration layer wiring AI-generated content into the user-facing application"
    ],
    clients: [],
    stack: ["React", "Node.js", "Express", "TypeScript", "Supabase"],
  },
] as const;

/**
 * Primary navigation. `hidden` keeps a route live and indexable while
 * leaving it out of the nav — used for /blog until there's enough
 * writing there to be worth pointing at.
 */
export const navItems = [
  { href: "/projects", label: "Work", hidden: false },
  { href: "/blog", label: "Writing", hidden: true },
] as const;

export const skills = [
  {
    group: "AI / LLM",
    items: ["LangChain", "LangGraph", "LangSmith", "MCP", "RAG", "Evals"],
  },
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Streamlit", "Tailwind", "Motion", "shadcn/ui"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "FastAPI", "tRPC", "GraphQL"],
  },
  {
    group: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    group: "Infra",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Linux"],
  },
] as const;
