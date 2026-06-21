<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/profile';
	import ThemeToggle from './ThemeToggle.svelte';
	import Icon from './ui/Icon.svelte';

	const links = [
		{ label: 'Home', id: 'home' },
		{ label: 'About', id: 'about' },
		{ label: 'Skills', id: 'skills' },
		{ label: 'Experience', id: 'experience' },
		{ label: 'Projects', id: 'projects' },
		{ label: 'GitHub', id: 'github' },
		{ label: 'Contact', id: 'contact' }
	];

	let scrolled = $state(false);
	let active = $state('home');
	let menuOpen = $state(false);

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 30);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = e.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const l of links) {
			const el = document.getElementById(l.id);
			if (el) observer.observe(el);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});

	function go(id: string) {
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-all duration-300 {scrolled
		? 'glass py-3 shadow-lg'
		: 'py-5'}"
>
	<nav class="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
		<button onclick={() => go('home')} class="font-display text-lg font-bold">
			<span class="gradient-text">M</span><span style="color: var(--text)">Ashar</span>
		</button>

		<!-- Desktop links -->
		<ul class="hidden items-center gap-1 lg:flex">
			{#each links as link (link.id)}
				<li>
					<button
						onclick={() => go(link.id)}
						class="rounded-full px-3 py-1.5 text-sm font-medium transition-colors {active ===
						link.id
							? 'text-brand-400'
							: 'hover:text-brand-400'}"
						style={active === link.id ? '' : 'color: var(--text-muted)'}
					>
						{link.label}
					</button>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<a
				href={profile.social[0].href}
				target="_blank"
				rel="noopener noreferrer"
				class="glass hidden h-10 w-10 place-items-center rounded-full transition-transform hover:scale-110 sm:grid"
				aria-label="GitHub"
			>
				<Icon name="github" size={18} />
			</a>
			<ThemeToggle />
			<button
				onclick={() => (menuOpen = !menuOpen)}
				class="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
				aria-label="Toggle menu"
				aria-expanded={menuOpen}
			>
				<Icon name={menuOpen ? 'close' : 'menu'} size={18} />
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="glass mx-4 mt-3 rounded-2xl p-2 lg:hidden">
			<ul class="flex flex-col">
				{#each links as link (link.id)}
					<li>
						<button
							onclick={() => go(link.id)}
							class="w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors {active ===
							link.id
								? 'text-brand-400'
								: 'hover:text-brand-400'}"
						>
							{link.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>
