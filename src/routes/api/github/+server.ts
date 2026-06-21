import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchGithubData } from '$lib/server/github';
import { profile } from '$lib/data/profile';

export const GET: RequestHandler = async ({ setHeaders }) => {
	try {
		const data = await fetchGithubData(profile.githubUsername);
		// Cache at the edge for an hour; serve stale while revalidating.
		setHeaders({
			'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
		});
		return json(data);
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Failed to fetch GitHub data';
		return json({ error: message }, { status: 502 });
	}
};
