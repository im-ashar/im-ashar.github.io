<script lang="ts">
	import { experience } from '$lib/data/experience';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';
</script>

<section id="experience" class="relative mx-auto max-w-4xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading eyebrow="My journey" title="Experience" />

	<div class="relative">
		<!-- vertical line -->
		<div
			class="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-brand-500 via-accent-500 to-transparent sm:left-1/2"
		></div>

		<div class="space-y-10">
			{#each experience as job, i (job.company + job.start)}
				{@const left = i % 2 === 0}
				<div use:reveal={{ y: 40 }} class="relative sm:grid sm:grid-cols-2 sm:gap-8">
					<!-- node dot -->
					<div
						class="absolute top-2 left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-500 sm:left-1/2"
						style="box-shadow: 0 0 0 4px var(--surface)"
					></div>

					<div class={left ? 'pl-10 sm:pr-0 sm:pl-0' : 'pl-10 sm:col-start-2 sm:pl-0'}>
						<GlassCard class="p-5 sm:p-6" hover>
							<span
								class="inline-block rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-400"
							>
								{job.start} — {job.end}
							</span>
							<h3 class="font-display mt-3 text-lg font-bold" style="color: var(--text)">
								{job.role}
							</h3>
							<p class="text-sm font-medium text-accent-500">
								{job.company}{job.location ? ` · ${job.location}` : ''}
							</p>
							<ul class="mt-3 space-y-1.5 text-sm" style="color: var(--text-muted)">
								{#each job.highlights as h (h)}
									<li class="flex gap-2">
										<span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-500"></span>
										<span>{h}</span>
									</li>
								{/each}
							</ul>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each job.tech as t (t)}
									<span
										class="rounded-md px-2 py-0.5 text-xs"
										style="background: var(--border); color: var(--text-muted)"
									>
										{t}
									</span>
								{/each}
							</div>
						</GlassCard>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
