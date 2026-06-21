<script lang="ts">
	import { upwork } from '$lib/data/upwork';
	import { reveal } from '$lib/actions/reveal';
	import GlassCard from './ui/GlassCard.svelte';
	import Icon from './ui/Icon.svelte';
</script>

<section id="upwork" class="relative mx-auto max-w-5xl scroll-mt-24 px-4 py-12 sm:px-6">
	<GlassCard class="overflow-hidden p-8 sm:p-10">
		<div use:reveal class="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
			<div class="text-center lg:text-left">
				<div class="mb-3 inline-flex items-center gap-2 text-emerald-400">
					<Icon name="upwork" size={26} />
					<span class="font-display text-xl font-bold">Upwork</span>
				</div>
				<h3 class="font-display text-2xl font-bold" style="color: var(--text)">{upwork.title}</h3>
				<div class="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
					{#each upwork.badges as badge (badge)}
						<span
							class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-400"
						>
							{badge}
						</span>
					{/each}
				</div>
				<a
					href={upwork.profileUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 hover:bg-emerald-400"
				>
					View Upwork Profile <Icon name="external" size={16} />
				</a>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
				{#each upwork.stats as stat (stat.label)}
					<div
						data-reveal-child
						class="rounded-xl px-5 py-4 text-center"
						style="background: var(--border)"
					>
						<p class="font-display text-2xl font-bold gradient-text">{stat.value}</p>
						<p class="mt-1 text-xs" style="color: var(--text-muted)">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	</GlassCard>
</section>
