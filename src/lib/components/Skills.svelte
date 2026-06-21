<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { skills } from '$lib/data/skills';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';

	let section: HTMLElement;

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		gsap.registerPlugin(ScrollTrigger);

		const bars = section.querySelectorAll<HTMLElement>('[data-bar]');
		if (prefersReduced) {
			bars.forEach((b) => (b.style.width = b.dataset.level + '%'));
			return;
		}

		const ctx = gsap.context(() => {
			bars.forEach((bar) => {
				gsap.fromTo(
					bar,
					{ width: '0%' },
					{
						width: bar.dataset.level + '%',
						duration: 1.2,
						ease: 'power2.out',
						scrollTrigger: { trigger: bar, start: 'top 90%' }
					}
				);
			});
		}, section);

		return () => ctx.revert();
	});
</script>

<section bind:this={section} id="skills" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading eyebrow="What I work with" title="Skills & Tech" />

	<div class="grid gap-6 sm:grid-cols-2">
		{#each skills as category (category.name)}
			<GlassCard class="p-6" hover>
				<h3 class="font-display mb-5 text-lg font-bold text-brand-400">{category.name}</h3>
				<div class="space-y-4">
					{#each category.skills as skill (skill.name)}
						<div>
							<div class="mb-1.5 flex justify-between text-sm">
								<span style="color: var(--text)">{skill.name}</span>
								<span style="color: var(--text-muted)">{skill.level}%</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full" style="background: var(--border)">
								<div
									data-bar
									data-level={skill.level}
									class="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
									style="width: 0%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</GlassCard>
		{/each}
	</div>
</section>
