<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';
	import ResumeButton from './ResumeButton.svelte';

	const facts = [
		{ label: 'Location', value: profile.location },
		{ label: 'Email', value: profile.email },
		{ label: 'Phone', value: profile.phone },
		{ label: 'Freelance', value: 'Available' }
	];
</script>

<section id="about" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading eyebrow="Get to know me" title="About Me" />

	<div class="grid items-center gap-10 md:grid-cols-[320px_1fr]">
		<div use:reveal={{ x: -40, y: 0 }} class="relative mx-auto w-full max-w-xs">
			<div
				class="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-500 to-accent-500 opacity-40 blur-2xl"
			></div>
			<img
				src="/img/profile.jpg"
				alt={profile.name}
				width="320"
				height="384"
				loading="lazy"
				class="glass relative aspect-[5/6] w-full rounded-3xl object-cover"
			/>
		</div>

		<div use:reveal={{ x: 40, y: 0 }}>
			<h3 class="font-display text-2xl font-bold sm:text-3xl">
				{profile.title} based in {profile.location}
			</h3>
			<p class="mt-4 leading-relaxed whitespace-pre-line" style="color: var(--text-muted)">
				{profile.bio}
			</p>

			<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each facts as fact (fact.label)}
					<GlassCard class="px-4 py-3">
						<p class="text-xs font-semibold tracking-wide text-brand-400 uppercase">
							{fact.label}
						</p>
						<p class="mt-0.5 text-sm break-words" style="color: var(--text)">{fact.value}</p>
					</GlassCard>
				{/each}
			</div>

			<div class="mt-8">
				<ResumeButton />
			</div>
		</div>
	</div>
</section>
