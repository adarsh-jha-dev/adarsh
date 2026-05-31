export const siteConfig = {
  name: "Adarsh Jha",
  handle: "adarsh-jha-dev",
  role: "AI Product Engineer / Full Stack Developer / SDE",
  location: "Kolkata, IN",
  email: "adarshjhaxif@gmail.com",
  url: "https://adarsh-psi-flax.vercel.app/",
  description:
    "AI product engineer shipping production LLM features and agentic systems. Currently building red-teaming infrastructure for NIST, UNESCO, IMDA, and the DoD at Humane Intelligence.",
  bio: "I build AI-powered products. Currently shipping red-teaming and eval infrastructure at Humane Intelligence. On the side I build projects and developer tools — most recently DiffWatch (AI PR review) and MetaGuard (data governance copilot). TypeScript, Next.js, Python.",
  social: {
    github: "https://github.com/adarsh-jha-dev",
    linkedin: "https://www.linkedin.com/in/adarshjha0410",
    twitter: "https://twitter.com/Adarsh_Jha_0410",
    instagram: "https://www.instagram.com/adarsh_glimpse/",
  },
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Heritage Institute of Technology, Kolkata",
    period: "2022 — 2026",
    cgpa: "9.0+",
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
    bullets: [
      "Develop and deploy Red-Teaming projects across the platform",
      "Integrate multiple AI model providers into the evaluation pipeline",
      "Implement AI red-teaming features scoped to client requirements",
      "Clients include NIST, IMDA, UNESCO, and DoD",
    ],
    stack: ["Next.js", "Vercel", "PostgreSQL", "Docker", "AWS"],
  },
  {
    company: "1 Percent Verse",
    url: "",
    role: "Software Development Engineer Intern",
    period: "Feb 2024 — May 2024",
    current: false,
    bullets: [
      "Translated Figma designs into production-ready UI components",
      "Built RESTful APIs and wired them into the application data layer",
      "Owned the integration layer between frontend and backend services",
    ],
    stack: ["React", "Node.js", "Express", "TypeScript", "Supabase"],
  },
] as const;

export const navItems = [
  { href: "/", label: "~/" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/uses", label: "uses" },
  { href: "/now", label: "now" },
] as const;
