import { siteConfig } from "@/lib/config";

type GitHubStats = {
  followers: number;
  publicRepos: number;
  topLanguages: { name: string; pct: number }[];
  pinnedRepos: { name: string; description: string; stars: number; url: string; lang?: string }[];
};

async function fetchStats(): Promise<GitHubStats | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${siteConfig.handle}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${siteConfig.handle}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos: Array<{
      name: string;
      description: string | null;
      stargazers_count: number;
      html_url: string;
      language: string | null;
      fork: boolean;
    }> = await reposRes.json();

    const own = repos.filter((r) => !r.fork);

    // Language distribution
    const langCount: Record<string, number> = {};
    own.forEach((r) => {
      if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
    });
    const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));

    const pinnedRepos = own
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        stars: r.stargazers_count,
        url: r.html_url,
        lang: r.language ?? undefined,
      }));

    return {
      followers: user.followers ?? 0,
      publicRepos: user.public_repos ?? 0,
      topLanguages,
      pinnedRepos,
    };
  } catch {
    return null;
  }
}

export async function GitHubStats() {
  const stats = await fetchStats();

  if (!stats) {
    return (
      <section className="py-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-xs text-ink-mute mb-2">// section</div>
          <h2 className="text-2xl font-medium mb-4">
            <span className="text-ink-mute">$ git </span>
            <span className="text-ink">log --stat</span>
          </h2>
          <div className="text-xs text-ink-mute">
            github stats unavailable right now —{" "}
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener"
              className="text-accent link-underline"
            >
              browse the profile directly →
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-t border-line">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-xs text-ink-mute mb-2">// section</div>
        <h2 className="text-2xl font-medium mb-10">
          <span className="text-ink-mute">$ git </span>
          <span className="text-ink">log --stat</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Stat block */}
          <div className="bg-bg-elev border border-line p-5">
            <div className="text-xs text-ink-mute mb-3">// counters</div>
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-ink-dim text-xs">public_repos</span>
                <span className="text-2xl text-accent font-mono">{stats.publicRepos}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-ink-dim text-xs">followers</span>
                <span className="text-2xl text-accent font-mono">{stats.followers}</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-bg-elev border border-line p-5 md:col-span-2">
            <div className="text-xs text-ink-mute mb-3">// languages</div>
            <div className="space-y-2.5">
              {stats.topLanguages.map((l) => (
                <div key={l.name} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-ink">{l.name}</span>
                    <span className="text-ink-mute">{l.pct}%</span>
                  </div>
                  <div className="h-1 bg-bg-high rounded overflow-hidden">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top repos */}
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {stats.pinnedRepos.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener"
              className="group bg-bg-elev border border-line hover:border-accent/40 p-4 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink group-hover:text-accent transition-colors font-mono">
                  {r.name}
                </span>
                <span className="text-ink-mute">★ {r.stars}</span>
              </div>
              {r.description && (
                <p className="mt-2 text-[11px] text-ink-dim line-clamp-2">
                  {r.description}
                </p>
              )}
              {r.lang && (
                <div className="mt-3 text-[10px] text-ink-mute">{r.lang}</div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
