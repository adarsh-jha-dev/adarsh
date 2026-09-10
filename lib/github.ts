import { siteConfig } from "@/lib/config";

export type Repo = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
  topics: string[];
};

export type GitHubProfile = {
  repos: Repo[];
  publicRepos: number;
  followers: number;
  topLanguages: { name: string; pct: number }[];
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
};

/**
 * Never shown in the live feed: this site's own source, the profile
 * README, unmodified framework starters, throwaway tutorial repos, and
 * `ai-bug-bias-bounty` (an older duplicate of `audit-ai`). A feed that
 * pads itself with starters reads worse than a short one.
 */
const EXCLUDED = new Set([
  "adarsh",
  "adarsh-jha-dev",
  "aither",
  "ai-bug-bias-bounty",
  "portfolio",
  "html-portfilio",
  "adarsh_demo",
  "local_repo",
  "test2",
  "client",
  "capstone_01",
  "capstone_02",
  "poem",
]);

/** Anything not pushed within this window is stale for a "latest" feed. */
const MAX_AGE_MS = 550 * 24 * 60 * 60 * 1000; // ~18 months

function headers(auth: boolean): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(auth && process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

/**
 * Fetches both endpoints, retrying once without the token if GitHub
 * rejects it. An expired or revoked PAT returns 401 on every request,
 * which would otherwise blank the whole section — unauthenticated
 * access still works at 60 requests/hour, well inside hourly
 * revalidation.
 */
async function fetchBoth(auth: boolean): Promise<[Response, Response]> {
  return Promise.all([
    fetch(`https://api.github.com/users/${siteConfig.handle}`, {
      headers: headers(auth),
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://api.github.com/users/${siteConfig.handle}/repos?per_page=100&sort=pushed`,
      { headers: headers(auth), next: { revalidate: 3600 } }
    ),
  ]);
}

/**
 * Fetches the profile and public repos, revalidated hourly. Returns
 * null on any failure so callers can degrade to a static link rather
 * than failing the whole page render.
 *
 * `alwaysInclude` names repos that skip the description requirement —
 * the curated projects carry their own taglines in `lib/projects.ts`,
 * and several have no description set on GitHub itself.
 */
export async function getGitHubProfile(
  alwaysInclude: string[] = []
): Promise<GitHubProfile | null> {
  try {
    const hasToken = Boolean(process.env.GITHUB_TOKEN);
    let [userRes, reposRes] = await fetchBoth(hasToken);

    if (hasToken && (userRes.status === 401 || reposRes.status === 401)) {
      console.warn(
        "[github] GITHUB_TOKEN was rejected (401) — falling back to unauthenticated requests."
      );
      [userRes, reposRes] = await fetchBoth(false);
    }

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as {
      followers?: number;
      public_repos?: number;
    };
    const raw = (await reposRes.json()) as ApiRepo[];
    if (!Array.isArray(raw)) return null;

    const own = raw.filter((r) => !r.fork && !r.archived && !r.private);

    // Language mix across all owned repos, before the exclusion filter,
    // so the percentages describe the whole profile.
    const counts: Record<string, number> = {};
    for (const r of own) {
      if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, pct: Math.round((n / total) * 100) }));

    const featured = new Set(alwaysInclude.map((s) => s.toLowerCase()));
    const cutoff = Date.now() - MAX_AGE_MS;

    const repos: Repo[] = own
      .filter((r) => {
        const name = r.name.toLowerCase();
        if (EXCLUDED.has(name)) return false;
        if (+new Date(r.pushed_at) < cutoff) return false;
        // A curated project supplies its own copy; anything else needs
        // a description of its own to be worth a row.
        return featured.has(name) || Boolean(r.description?.trim());
      })
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        topics: r.topics ?? [],
      }));

    return {
      repos,
      // Own non-fork repos, not `user.public_repos` — that count is
      // dominated by forks and overstates the number badly.
      publicRepos: own.length,
      followers: user.followers ?? 0,
      topLanguages,
    };
  } catch {
    return null;
  }
}

/** "3 days ago", "2 months ago" — compact relative time for repo cards. */
export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60_000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 31) return `${days}d ago`;
  const months = Math.round(days / 30.44);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

/** Brand-ish dot colours for the handful of languages actually in use. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
};
