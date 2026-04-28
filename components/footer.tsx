import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line mt-32">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div>
            <div className="text-ink-mute mb-3"># whoami</div>
            <div className="text-ink">{siteConfig.name}</div>
            <div className="text-ink-dim mt-1">{siteConfig.role}</div>
            <div className="text-ink-dim">{siteConfig.location}</div>
          </div>

          <div>
            <div className="text-ink-mute mb-3"># navigate</div>
            <div className="flex flex-col gap-1">
              <Link href="/projects" className="text-ink-dim hover:text-accent">
                projects
              </Link>
              <Link href="/blog" className="text-ink-dim hover:text-accent">
                blog
              </Link>
              <Link href="/uses" className="text-ink-dim hover:text-accent">
                uses
              </Link>
              <Link href="/now" className="text-ink-dim hover:text-accent">
                now
              </Link>
            </div>
          </div>

          <div>
            <div className="text-ink-mute mb-3"># elsewhere</div>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="text-ink-dim hover:text-accent"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="text-ink-dim hover:text-accent"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
                className="text-ink-dim hover:text-accent"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="text-ink-dim hover:text-accent"
              >
                <Mail size={16} />
              </a>
            </div>
            <div className="mt-4">
              <a
                href={`https://github.com/${siteConfig.handle}/adarsh`}
                target="_blank"
                rel="noopener"
                className="text-ink-mute hover:text-accent inline-flex items-center gap-1.5"
              >
                <span>{"</>"}</span> view source
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex items-center justify-between text-[10px] text-ink-mute">
          <span>
            © {year} {siteConfig.name}. built with next.js, deployed on vercel.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            online
          </span>
        </div>
      </div>
    </footer>
  );
}
