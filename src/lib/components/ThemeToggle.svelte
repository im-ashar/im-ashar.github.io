<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import Icon from './ui/Icon.svelte';
</script>

<button
	onclick={() => theme.toggle()}
	class="glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:scale-110 active:scale-95"
	aria-label="Toggle dark mode"
	title="Toggle theme"
>
	{#if $theme === 'dark'}
		<Icon name="sun" size={18} class="text-amber-400" />
	{:else}
		<Icon name="moon" size={18} class="text-brand-600" />
	{/if}
</button>
