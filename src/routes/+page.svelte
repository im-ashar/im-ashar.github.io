<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Education from '$lib/components/Education.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Upwork from '$lib/components/Upwork.svelte';
	import GithubStats from '$lib/components/GithubStats.svelte';
	import Contact from '$lib/components/Contact.svelte';

	const description = `${profile.name} — ${profile.title}. ${profile.bio.slice(0, 120)}`;
</script>

<svelte:head>
	<title>{profile.name} — {profile.title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={`${profile.name} — ${profile.title}`} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={profile.website} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Hero />
<About />
<Experience />
<Education />
<Skills />
<Projects />
<GithubStats />
<Upwork />
<Contact />
