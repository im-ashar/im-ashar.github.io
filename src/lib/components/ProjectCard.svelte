<script lang="ts">
	import type { Project } from '$lib/types';
	import Icon from './ui/Icon.svelte';

	interface Props {
		project: Project;
		onopen: (project: Project) => void;
	}
	let { project, onopen }: Props = $props();
</script>

<button
	onclick={() => onopen(project)}
	class="glass group relative block w-full overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/20"
>
	<div class="relative aspect-video overflow-hidden">
		<img
			src={project.cover}
			alt={project.title}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80"
		></div>
		{#if project.featured}
			<span
				class="absolute top-3 right-3 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-2.5 py-1 text-xs font-semibold text-white"
			>
				Featured
			</span>
		{/if}
	</div>

	<div class="p-5">
		<div class="flex items-center justify-between gap-2">
			<h3 class="font-display text-lg font-bold" style="color: var(--text)">{project.title}</h3>
			<span
				class="text-brand-400 opacity-0 transition-opacity group-hover:opacity-100"
				aria-hidden="true"
			>
				<Icon name="arrow" size={18} />
			</span>
		</div>
		<p class="mt-1 text-sm" style="color: var(--text-muted)">{project.tagline}</p>
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each project.tags as tag (tag)}
				<span class="rounded-md bg-brand-500/15 px-2 py-0.5 text-xs text-brand-400">{tag}</span>
			{/each}
		</div>
	</div>
</button>
