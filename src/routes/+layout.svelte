<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AuroraBackground from '$lib/components/AuroraBackground.svelte';

	let { children } = $props();

	if (browser) gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		// ScrollTrigger measures positions at mount; web fonts and images shift the
		// layout afterwards, so re-measure once everything has settled.
		const refresh = () => ScrollTrigger.refresh();

		if (document.fonts?.ready) {
			document.fonts.ready.then(refresh);
		}
		window.addEventListener('load', refresh);

		// Re-measure on image load (covers project covers, profile photo, etc.)
		let imgListeners: HTMLImageElement[] = [];
		const observeImages = () => {
			imgListeners = Array.from(document.querySelectorAll('img'));
			imgListeners.forEach((img) => {
				if (!img.complete) img.addEventListener('load', refresh, { once: true });
			});
		};
		observeImages();

		// Settle after first paint as a safety net.
		const t = setTimeout(refresh, 600);

		return () => {
			window.removeEventListener('load', refresh);
			clearTimeout(t);
		};
	});
</script>

<AuroraBackground />
<Nav />

<!-- overflow-x: clip contains reveal/animation transforms (e.g. slide-in offsets)
	 so they never create a horizontal scrollbar; clip (not hidden) avoids making
	 this a scroll container, keeping sticky/anchor scrolling intact. -->
<main class="[overflow-x:clip]">
	{@render children()}
</main>

<Footer />
