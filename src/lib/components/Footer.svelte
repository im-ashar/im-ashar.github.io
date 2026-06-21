<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Icon from './ui/Icon.svelte';
</script>

<footer class="relative mt-24 border-t py-12" style="border-color: var(--border)">
	<div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
		<p class="font-display text-lg font-semibold gradient-text">{profile.tagline}</p>

		<div class="flex flex-wrap items-center justify-center gap-3">
			{#each profile.social as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="glass grid h-11 w-11 place-items-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:text-brand-400"
					aria-label={link.label}
					title={link.label}
				>
					<Icon name={link.icon} size={18} />
				</a>
			{/each}
		</div>

		<p class="text-sm" style="color: var(--text-muted)">
			© {profile.name} — Built with SvelteKit, Tailwind &amp; GSAP.
		</p>
	</div>
</footer>
