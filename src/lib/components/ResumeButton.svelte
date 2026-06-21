<script lang="ts">
	import { profile } from '$lib/data/profile';
	import Icon from './ui/Icon.svelte';

	interface Props {
		variant?: 'solid' | 'ghost';
		class?: string;
	}
	let { variant = 'solid', class: cls = '' }: Props = $props();

	const base =
		'inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105 active:scale-95';
	const solid =
		'text-white shadow-lg shadow-brand-500/30 bg-gradient-to-r from-brand-500 to-accent-500 hover:shadow-brand-500/50';
	const ghost = 'glass hover:text-brand-400';
</script>

<a
	href={profile.resumePath}
	download
	class="{base} {variant === 'solid' ? solid : ghost} {cls}"
>
	<Icon name="download" size={18} />
	Download Resume
</a>
