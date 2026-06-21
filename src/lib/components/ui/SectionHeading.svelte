<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import GradientText from './GradientText.svelte';

	interface Props {
		eyebrow?: string;
		title: string;
		subtitle?: string;
	}
	let { eyebrow, title, subtitle }: Props = $props();
</script>

<div class="mx-auto mb-12 max-w-2xl text-center" use:reveal>
	{#if eyebrow}
		<p class="mb-2 text-sm font-semibold tracking-widest text-brand-400 uppercase">
			{eyebrow}
		</p>
	{/if}
	<h2 class="font-display text-4xl font-bold sm:text-5xl">
		<GradientText>{title}</GradientText>
	</h2>
	{#if subtitle}
		<p class="mt-4 text-base" style="color: var(--text-muted)">{subtitle}</p>
	{/if}
</div>
