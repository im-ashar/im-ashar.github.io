<script lang="ts">
	import type { Project } from '$lib/types';
	import { fade, scale } from 'svelte/transition';
	import Icon from './ui/Icon.svelte';

	interface Props {
		project: Project | null;
		onclose: () => void;
	}
	let { project, onclose }: Props = $props();

	let activeImage = $state(0);

	$effect(() => {
		// reset gallery when project changes
		project;
		activeImage = 0;
	});

	$effect(() => {
		if (project) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = '';
			};
		}
	});

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window on:keydown={onkeydown} />

{#if project}
	<div
		class="fixed inset-0 z-[100] grid place-items-center p-4"
		transition:fade={{ duration: 200 }}
	>
		<!-- backdrop -->
		<button
			class="absolute inset-0 bg-black/70 backdrop-blur-sm"
			onclick={onclose}
			aria-label="Close"
			tabindex="-1"
		></button>

		<div
			class="glass relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl"
			transition:scale={{ duration: 220, start: 0.95 }}
			role="dialog"
			aria-modal="true"
			aria-label={project.title}
		>
			<button
				onclick={onclose}
				class="glass absolute top-3 right-3 z-20 grid h-9 w-9 place-items-center rounded-full hover:text-brand-400"
				aria-label="Close dialog"
			>
				<Icon name="close" size={18} />
			</button>

			<!-- gallery -->
			<div class="relative aspect-video overflow-hidden rounded-t-2xl">
				{#key activeImage}
					<img
						src={project.images[activeImage]}
						alt="{project.title} screenshot {activeImage + 1}"
						class="h-full w-full object-cover"
						in:fade={{ duration: 200 }}
					/>
				{/key}
			</div>

			{#if project.images.length > 1}
				<div class="flex gap-2 overflow-x-auto p-3">
					{#each project.images as img, i (img)}
						<button
							onclick={() => (activeImage = i)}
							class="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg ring-2 transition {activeImage ===
							i
								? 'ring-brand-500'
								: 'ring-transparent opacity-60 hover:opacity-100'}"
							aria-label="View image {i + 1}"
						>
							<img src={img} alt="" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}

			<div class="p-6">
				<div class="flex flex-wrap items-center gap-2">
					<h3 class="font-display text-2xl font-bold gradient-text">{project.title}</h3>
					{#if project.year}
						<span class="text-sm" style="color: var(--text-muted)">· {project.year}</span>
					{/if}
				</div>
				<p class="mt-1 font-medium text-accent-500">{project.tagline}</p>

				<p class="mt-4 leading-relaxed whitespace-pre-line" style="color: var(--text-muted)">
					{project.description}
				</p>

				<div class="mt-5 flex flex-wrap gap-2">
					{#each project.tags as tag (tag)}
						<span class="rounded-md bg-brand-500/15 px-2.5 py-1 text-xs text-brand-400">{tag}</span>
					{/each}
				</div>

				{#if project.links.live || project.links.repo || project.links.demo}
					<div class="mt-6 flex flex-wrap gap-3">
						{#if project.links.live}
							<a
								href={project.links.live}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105"
							>
								Live Site <Icon name="external" size={16} />
							</a>
						{/if}
						{#if project.links.demo}
							<a
								href={project.links.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105"
							>
								Live Demo <Icon name="external" size={16} />
							</a>
						{/if}
						{#if project.links.repo}
							<a
								href={project.links.repo}
								target="_blank"
								rel="noopener noreferrer"
								class="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:scale-105 hover:text-brand-400"
							>
								<Icon name="github" size={16} /> Code
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
