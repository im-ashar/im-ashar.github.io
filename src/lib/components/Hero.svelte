<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { profile } from '$lib/data/profile';
	import HeroCanvas from './HeroCanvas.svelte';
	import ResumeButton from './ResumeButton.svelte';
	import GradientText from './ui/GradientText.svelte';
	import Icon from './ui/Icon.svelte';

	let roleIndex = $state(0);
	let displayRole = $state(profile.roles[0]);
	let headline: HTMLElement;
	let intro: HTMLElement;
	let cta: HTMLElement;

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!prefersReduced) {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			tl.from(intro, { y: 20, opacity: 0, duration: 0.6 })
				.from(
					headline.querySelectorAll('[data-line]'),
					{ y: 40, opacity: 0, duration: 0.8, stagger: 0.12 },
					'-=0.2'
				)
				.from(cta, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
		}

		// Rotate roles
		const interval = setInterval(() => {
			roleIndex = (roleIndex + 1) % profile.roles.length;
			displayRole = profile.roles[roleIndex];
		}, 2600);

		return () => clearInterval(interval);
	});
</script>

<section id="home" class="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12">
	<!-- 3D particle accent -->
	<div class="absolute inset-0 -z-[5]">
		<HeroCanvas />
	</div>

	<!-- Readability scrim: keeps text legible over the particle field -->
	<div
		class="pointer-events-none absolute inset-0 -z-[4]"
		style="background: radial-gradient(120% 90% at 25% 45%, var(--surface) 0%, color-mix(in srgb, var(--surface) 70%, transparent) 45%, transparent 75%)"
		aria-hidden="true"
	></div>

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
		<div class="max-w-3xl">
			<p bind:this={intro} class="mb-4 inline-flex items-center gap-2 text-sm font-medium">
				<span class="relative flex h-2.5 w-2.5">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
				</span>
				<span style="color: var(--text-muted)">Available for work · {profile.location}</span>
			</p>

			<h1 bind:this={headline} class="font-display text-5xl font-bold leading-tight sm:text-7xl">
				<span data-line class="block">Hi, I'm <GradientText>Muhammad Ashar</GradientText></span>
				<span data-line class="mt-2 block text-2xl font-medium sm:text-3xl" style="color: var(--text-muted)">
					{#key displayRole}
						<span class="inline-block animate-[float_0.6s_ease]">{displayRole}</span>
					{/key}
				</span>
			</h1>

			<p class="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style="color: var(--text-muted)">
				I build fast, colorful, and reliable web applications — from pixel-perfect front-ends to
				scalable cloud back-ends.
			</p>

			<div bind:this={cta} class="mt-8 flex flex-wrap items-center gap-4">
				<button
					onclick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
					class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 font-medium text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:scale-105 hover:shadow-brand-500/50 active:scale-95"
				>
					View Projects
					<Icon name="arrow" size={18} />
				</button>
				<ResumeButton variant="ghost" />
			</div>

			<div class="mt-10 flex items-center gap-3">
				{#each profile.social.slice(0, 4) as link (link.label)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="glass grid h-11 w-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:text-brand-400"
						aria-label={link.label}
					>
						<Icon name={link.icon} size={18} />
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- scroll cue -->
	<div
		class="absolute bottom-6 left-1/2 -translate-x-1/2 animate-[float_2.5s_ease-in-out_infinite]"
		style="color: var(--text-muted)"
	>
		<div class="flex h-9 w-5 items-start justify-center rounded-full border-2 p-1" style="border-color: var(--text-muted)">
			<span class="h-2 w-1 rounded-full" style="background: var(--text-muted)"></span>
		</div>
	</div>
</section>
