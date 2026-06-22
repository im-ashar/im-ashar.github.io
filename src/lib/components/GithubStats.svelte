<script lang="ts">
	import { onMount } from 'svelte';
	import type { GithubData } from '$lib/types';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';
	import RepoCard from './RepoCard.svelte';
	import ContributionGraph from './ContributionGraph.svelte';
	import Icon from './ui/Icon.svelte';

	let data = $state<GithubData | null>(null);
	let loading = $state(true);
	let failed = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('/api/github');
			if (!res.ok) throw new Error('bad response');
			data = await res.json();
		} catch {
			failed = true;
		} finally {
			loading = false;
		}
	});

	let stats = $derived(
		data
			? [
					{ label: 'Followers', value: data.profile.followers },
					{ label: 'Public Repos', value: data.profile.publicRepos },
					{ label: 'Total Stars', value: data.profile.totalStars },
					{ label: 'Following', value: data.profile.following }
				]
			: []
	);
</script>

<section id="github" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading
		eyebrow="Live from GitHub"
		title="Open Source Activity"
		subtitle="Real-time stats pulled straight from my GitHub profile."
	/>

	{#if loading}
		<!-- skeletons -->
		<div class="grid animate-pulse gap-6">
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each Array(4) as _, i (i)}
					<div class="glass h-24 rounded-2xl"></div>
				{/each}
			</div>
			<div class="glass h-40 rounded-2xl"></div>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each Array(6) as _, i (i)}
					<div class="glass h-36 rounded-2xl"></div>
				{/each}
			</div>
		</div>
	{:else if failed || !data}
		<GlassCard class="p-8 text-center">
			<p style="color: var(--text-muted)">
				Couldn't load live GitHub data right now.
				<a href="https://github.com/im-ashar" class="text-brand-400 underline" target="_blank" rel="noopener noreferrer">
					Visit my GitHub profile →
				</a>
			</p>
		</GlassCard>
	{:else}
		<!-- stat cards -->
		<div use:reveal={{ stagger: 0.08 }} class="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{#each stats as stat (stat.label)}
				<GlassCard data-reveal-child class="p-5 text-center" hover>
					<p class="font-display text-3xl font-bold gradient-text">
						{stat.value.toLocaleString()}
					</p>
					<p class="mt-1 text-xs" style="color: var(--text-muted)">{stat.label}</p>
				</GlassCard>
			{/each}
		</div>

		<!-- contributions + languages -->
		<div class="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
			<div use:reveal={{ y: 30 }} class="min-w-0">
				<GlassCard class="p-6">
					<h3 class="font-display mb-4 text-lg font-bold text-brand-400">Contributions</h3>
					<ContributionGraph weeks={data.contributions.weeks} total={data.contributions.total} />
				</GlassCard>
			</div>

			<div use:reveal={{ y: 30 }}>
				<GlassCard class="p-6">
					<h3 class="font-display mb-4 text-lg font-bold text-brand-400">Top Languages</h3>
					<div class="space-y-3">
					{#each data.languages as lang (lang.name)}
						<div>
							<div class="mb-1 flex justify-between text-sm">
								<span style="color: var(--text)">{lang.name}</span>
								<span style="color: var(--text-muted)">{lang.percent}%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full" style="background: var(--border)">
								<div
									class="h-full rounded-full"
									style="width: {lang.percent}%; background: {lang.color}"
								></div>
							</div>
							</div>
						{/each}
					</div>
				</GlassCard>
			</div>
		</div>

		<!-- top repos -->
		<div class="mt-10">
			<h3 class="font-display mb-5 flex items-center gap-2 text-lg font-bold">
				<Icon name="github" size={20} /> Top Repositories
			</h3>
			<div use:reveal={{ stagger: 0.06 }} class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.topRepos as repo (repo.name)}
					<div data-reveal-child>
						<RepoCard {repo} />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
