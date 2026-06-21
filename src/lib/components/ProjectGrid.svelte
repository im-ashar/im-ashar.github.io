<script lang="ts">
	import type { Project } from '$lib/types';
	import { reveal } from '$lib/actions/reveal';
	import ProjectCard from './ProjectCard.svelte';
	import ProjectModal from './ProjectModal.svelte';

	interface Props {
		projects: Project[];
		/** show tag filter buttons (used on the full /projects page) */
		filterable?: boolean;
	}
	let { projects, filterable = false }: Props = $props();

	let activeTag = $state<string>('All');
	let selected = $state<Project | null>(null);

	let filters = $derived([
		'All',
		...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()
	]);
	let visible = $derived(
		activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag))
	);
</script>

{#if filterable}
	<div use:reveal class="mb-10 flex flex-wrap justify-center gap-2">
		{#each filters as tag (tag)}
			<button
				onclick={() => (activeTag = tag)}
				class="rounded-full px-4 py-1.5 text-sm font-medium transition-all {activeTag === tag
					? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/30'
					: 'glass hover:text-brand-400'}"
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}

<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
	{#each visible as project (project.slug)}
		<div use:reveal={{ y: 30 }}>
			<ProjectCard {project} onopen={(p) => (selected = p)} />
		</div>
	{/each}
</div>

<ProjectModal project={selected} onclose={() => (selected = null)} />
