<script lang="ts">
	import { featuredProjects, projects } from '$lib/data/projects';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import ProjectGrid from './ProjectGrid.svelte';
	import Icon from './ui/Icon.svelte';

	const hasMore = projects.length > featuredProjects.length;
</script>

<section id="projects" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading
		eyebrow="Things I've built"
		title="Featured Projects"
		subtitle="A few highlights. Click any card for details — or browse the full archive."
	/>

	<ProjectGrid projects={featuredProjects} />

	{#if hasMore}
		<div use:reveal class="mt-12 flex justify-center">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-7 py-3 font-medium text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:scale-105 hover:shadow-brand-500/50"
			>
				View All Projects
				<Icon name="arrow" size={18} />
			</a>
		</div>
	{/if}
</section>
