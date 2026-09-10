import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { GitHubActivity } from "@/components/github-activity";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Experience />
      <About />
      <GitHubActivity />
      <Contact />
    </>
  );
}
