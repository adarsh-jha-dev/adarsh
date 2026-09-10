import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/projects";
import { getGitHubProfile, relativeTime, LANGUAGE_COLORS } from "@/lib/github";
import { GithubIcon } from "@/components/icons";

/**
 * Live recency timeline. Curated projects are included rather than
 * filtered out — seeing the featured work at the top of a "last pushed"
 * list is the point, since it shows those projects are still alive.
 * Their rows link to the case study; everything else links to GitHub.
 */
export async function GitHubActivity() {
  const byRepo = new Map<string, (typeof projects)[number]>();
  for (const project of projects) {
    const repo = project.links.code?.split("/").pop()?.toLowerCase();
    if (repo) byRepo.set(repo, project);
  }

  const profile = await getGitHubProfile([...byRepo.keys()]);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="rule" />

      <div className="flex flex-wrap items-end justify-between gap-6 pt-14">
        <div>
          <span className="eyebrow">Live from GitHub</span>
          <h2 className="display mt-3 text-4xl md:text-5xl">Recent activity</h2>
        </div>

        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <GithubIcon size={15} />
          {profile
            ? `${profile.publicRepos} repos · @${siteConfig.handle}`
            : `@${siteConfig.handle}`}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {!profile ? (
        <p className="mt-10 text-[15px] text-muted-foreground">
          GitHub is unreachable right now —{" "}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener"
            className="link-grow text-foreground"
          >
            browse the profile directly
          </a>
          .
        </p>
      ) : (
        <>
          <ul className="mt-10 border-t">
            {profile.repos.map((repo) => {
              const project = byRepo.get(repo.name.toLowerCase());
              const rowClass =
                "group flex flex-col gap-1.5 border-b py-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-baseline sm:gap-5 sm:px-2";

              const inner = (
                <>
                  <span className="flex min-w-0 shrink-0 items-center gap-2 text-[14px] sm:w-52">
                    <span
                      className={`truncate transition-colors group-hover:text-primary ${
                        project ? "font-medium" : "font-mono"
                      }`}
                    >
                      {project ? project.name : repo.name}
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>

                  <span className="min-w-0 flex-1 truncate text-[14px] text-muted-foreground">
                    {project ? project.tagline : repo.description}
                  </span>

                  <span className="flex shrink-0 items-center gap-4 text-[12px] text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="size-2 rounded-full"
                          style={{
                            background:
                              LANGUAGE_COLORS[repo.language] ??
                              "hsl(var(--muted-foreground))",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stars}
                      </span>
                    )}
                    <time
                      dateTime={repo.pushedAt}
                      className="tabular-nums sm:w-20 sm:text-right"
                    >
                      {relativeTime(repo.pushedAt)}
                    </time>
                  </span>
                </>
              );

              return (
                <li key={repo.name}>
                  {project ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className={rowClass}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener"
                      className={rowClass}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {profile.topLanguages.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="eyebrow">Language mix</span>
              {profile.topLanguages.map((lang) => (
                <span
                  key={lang.name}
                  className="inline-flex items-center gap-2 text-[13px] text-muted-foreground"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{
                      background:
                        LANGUAGE_COLORS[lang.name] ??
                        "hsl(var(--muted-foreground))",
                    }}
                  />
                  {lang.name}
                  <span className="tabular-nums opacity-60">{lang.pct}%</span>
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
