import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { FeaturedProjects } from "@/components/featured-projects";
import { GitHubStats } from "@/components/github-stats";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <GitHubStats />
      <Contact />
    </>
  );
}
