import Link from "next/link";
import { Mail } from "lucide-react";

import { siteConfig } from "@/lib/config";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { NowPlaying } from "@/components/now-playing";

const social = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: "X / Twitter", href: siteConfig.social.twitter, Icon: TwitterIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="display text-2xl">{siteConfig.name}</p>
            <p className="mt-1 text-[14px] text-muted-foreground">
              {siteConfig.role} · {siteConfig.location}
            </p>
            <div className="mt-5">
              <NowPlaying />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              <Link
                href="/projects"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Work
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Writing
              </Link>
              <a
                href={siteConfig.cv}
                target="_blank"
                rel="noopener"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Résumé
              </a>
            </nav>

            <div className="flex items-center gap-4 sm:mt-1">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-[12px] text-muted-foreground">
          <span>
            © {year} {siteConfig.name}
          </span>
          <a
            href={`https://github.com/${siteConfig.handle}/adarsh`}
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-foreground"
          >
            Built with Next.js — source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
