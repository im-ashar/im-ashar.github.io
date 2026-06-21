<script lang="ts">
	import type { GithubRepo } from '$lib/types';
	import Icon from './ui/Icon.svelte';

	interface Props {
		repo: GithubRepo;
	}
	let { repo }: Props = $props();

	// language color dot
	const langColors: Record<string, string> = {
		'C#': '#178600',
		TypeScript: '#3178c6',
		JavaScript: '#f1e05a',
		HTML: '#e34c26',
		CSS: '#563d7c',
		Python: '#3572A5',
		Svelte: '#ff3e00',
		Vue: '#41b883',
		Shell: '#89e051'
	};
</script>

<a
	href={repo.url}
	target="_blank"
	rel="noopener noreferrer"
	class="glass group flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/20"
>
	<div class="flex items-start justify-between gap-2">
		<h4 class="font-display font-bold text-brand-400 group-hover:underline">{repo.name}</h4>
		<Icon name="external" size={16} class="opacity-40 group-hover:opacity-100" />
	</div>
	<p class="mt-2 line-clamp-2 flex-1 text-sm" style="color: var(--text-muted)">
		{repo.description || 'No description provided.'}
	</p>
	<div class="mt-4 flex items-center gap-4 text-xs" style="color: var(--text-muted)">
		{#if repo.language}
			<span class="flex items-center gap-1.5">
				<span
					class="h-2.5 w-2.5 rounded-full"
					style="background: {langColors[repo.language] || '#888'}"
				></span>
				{repo.language}
			</span>
		{/if}
		<span class="flex items-center gap-1"><Icon name="star" size={14} /> {repo.stars}</span>
		<span class="flex items-center gap-1"><Icon name="fork" size={14} /> {repo.forks}</span>
	</div>
</a>
