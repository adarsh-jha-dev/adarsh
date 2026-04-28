export const siteConfig = {
  name: "Adarsh Jha",
  handle: "adarsh-jha-dev",
  role: "full-stack engineer",
  location: "Kolkata, IN",
  email: "adarshjhaxif@gmail.com",
  url: "https://adarsh.vercel.app",
  description:
    "Full-stack engineer building scalable web apps with TypeScript, React, and Node. Currently exploring the AI/ML side of the stack.",
  bio: "I build things for the web. Mostly TypeScript, React, Next.js on the frontend; Node, Express, and the occasional Convex on the backend. Spent the last two years shipping MERN apps end-to-end. In 2026 I'm extending the stack downward — picking up the math, the models, and the infra behind AI.",
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
