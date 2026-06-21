<script lang="ts">
	import type { Project } from '$lib/types';
	import { projects, projectTags } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import ProjectModal from './ProjectModal.svelte';

	let activeTag = $state<string>('All');
	let selected = $state<Project | null>(null);

	const filters = ['All', ...projectTags];
	let filtered = $derived(
		activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag))
	);
</script>

<section id="projects" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading
		eyebrow="Things I've built"
		title="Projects"
		subtitle="A selection of products and experiments. Click any card to see more."
	/>

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

	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as project (project.slug)}
			<div use:reveal={{ y: 30 }}>
				<ProjectCard {project} onopen={(p) => (selected = p)} />
			</div>
		{/each}
	</div>
</section>

<ProjectModal project={selected} onclose={() => (selected = null)} />
