import { env } from '$env/dynamic/private';
import type { ContributionDay, GithubData, GithubRepo, LanguageSlice } from '$lib/types';

const LANG_COLORS: Record<string, string> = {
	'C#': '#178600',
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Python: '#3572A5',
	Svelte: '#ff3e00',
	Vue: '#41b883',
	Shell: '#89e051',
	Java: '#b07219',
	'C++': '#f34b7d',
	Dart: '#00B4AB',
	Go: '#00ADD8',
	PHP: '#4F5D95'
};

const GRAPHQL_QUERY = `
query ($login: String!) {
  user(login: $login) {
    login
    name
    avatarUrl
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: STARGAZERS, direction: DESC }) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        primaryLanguage { name }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name } }
        }
      }
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
	if (count === 0) return 0;
	if (count < 3) return 1;
	if (count < 6) return 2;
	if (count < 10) return 3;
	return 4;
}

/** Fetch and shape all GitHub data via a single GraphQL request. */
export async function fetchGithubData(login: string): Promise<GithubData> {
	const token = env.GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN is not configured');
	}

	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			authorization: `Bearer ${token}`,
			'content-type': 'application/json'
		},
		body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login } })
	});

	if (!res.ok) {
		throw new Error(`GitHub API responded ${res.status}`);
	}

	const json = await res.json();
	if (json.errors?.length) {
		throw new Error(json.errors[0].message ?? 'GitHub GraphQL error');
	}

	const user = json.data?.user;
	if (!user) throw new Error('GitHub user not found');

	const repoNodes = user.repositories.nodes as any[];

	const totalStars = repoNodes.reduce((sum, r) => sum + (r.stargazerCount ?? 0), 0);

	const topRepos: GithubRepo[] = repoNodes
		.filter((r) => r.description || r.stargazerCount > 0)
		.slice(0, 6)
		.map((r) => ({
			name: r.name,
			description: r.description,
			url: r.url,
			stars: r.stargazerCount,
			forks: r.forkCount,
			language: r.primaryLanguage?.name ?? null
		}));

	// Aggregate language bytes across all repos
	const langTotals: Record<string, number> = {};
	for (const r of repoNodes) {
		for (const edge of r.languages?.edges ?? []) {
			const name = edge.node.name as string;
			langTotals[name] = (langTotals[name] ?? 0) + (edge.size as number);
		}
	}
	const grandTotal = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
	const languages: LanguageSlice[] = Object.entries(langTotals)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 6)
		.map(([name, size]) => ({
			name,
			percent: Math.round((size / grandTotal) * 100),
			color: LANG_COLORS[name] ?? '#8b5cf6'
		}));

	const calendar = user.contributionsCollection.contributionCalendar;
	const weeks: ContributionDay[][] = calendar.weeks.map((w: any) =>
		w.contributionDays.map((d: any) => ({
			date: d.date,
			count: d.contributionCount,
			level: levelFor(d.contributionCount)
		}))
	);

	return {
		profile: {
			login: user.login,
			name: user.name,
			avatarUrl: user.avatarUrl,
			followers: user.followers.totalCount,
			following: user.following.totalCount,
			publicRepos: user.repositories.totalCount,
			totalStars
		},
		topRepos,
		languages,
		contributions: {
			total: calendar.totalContributions,
			weeks
		}
	};
}
