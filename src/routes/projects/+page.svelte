<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import GradientText from '$lib/components/ui/GradientText.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
</script>

<svelte:head>
	<title>Projects — {profile.name}</title>
	<meta name="description" content={`All projects by ${profile.name}, ${profile.title}.`} />
</svelte:head>

<section class="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
	<a
		href="/#projects"
		class="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-400"
		style="color: var(--text-muted)"
	>
		<span class="rotate-180"><Icon name="arrow" size={16} /></span>
		Back to home
	</a>

	<div class="mb-12 max-w-2xl">
		<p class="mb-2 text-sm font-semibold tracking-widest text-brand-400 uppercase">
			The full archive
		</p>
		<h1 class="font-display text-4xl font-bold sm:text-5xl">
			<GradientText>All Projects</GradientText>
		</h1>
		<p class="mt-4 text-base" style="color: var(--text-muted)">
			Everything I've built — filter by technology to explore.
		</p>
	</div>

	<ProjectGrid {projects} filterable />
</section>
