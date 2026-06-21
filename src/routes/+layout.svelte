<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AuroraBackground from '$lib/components/AuroraBackground.svelte';

	let { children } = $props();
</script>

<AuroraBackground />
<Nav />

<main>
	{@render children()}
</main>

<Footer />
