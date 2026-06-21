<script lang="ts">
	import { education } from '$lib/data/education';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';
	import Icon from './ui/Icon.svelte';
</script>

<section id="education" class="relative mx-auto max-w-4xl scroll-mt-24 px-4 py-12 sm:px-6">
	<SectionHeading eyebrow="Where I studied" title="Education" />

	<div class="space-y-6">
		{#each education as edu (edu.institution)}
			<div use:reveal={{ y: 30 }}>
				<GlassCard class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start" hover>
					<span
						class="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-400"
					>
						<Icon name="code" size={22} />
					</span>
					<div class="flex-1">
						<div class="flex flex-wrap items-center justify-between gap-2">
							<h3 class="font-display text-lg font-bold" style="color: var(--text)">
								{edu.degree}
							</h3>
							<span
								class="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-400"
							>
								{edu.start} — {edu.end}
							</span>
						</div>
						<p class="mt-0.5 text-sm font-medium text-accent-500">
							{edu.institution}{edu.location ? ` · ${edu.location}` : ''}
						</p>
						{#if edu.description}
							<p class="mt-2 text-sm" style="color: var(--text-muted)">{edu.description}</p>
						{/if}
					</div>
				</GlassCard>
			</div>
		{/each}
	</div>
</section>
