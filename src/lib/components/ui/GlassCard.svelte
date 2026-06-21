<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		class?: string;
		hover?: boolean;
		children: Snippet;
		[key: string]: unknown;
	}
	let { class: cls = '', hover = false, children, ...rest }: Props = $props();
</script>

<div
	class="glass rounded-2xl shadow-lg transition-all duration-300 {hover
		? 'hover:-translate-y-1 hover:shadow-brand-500/20 hover:shadow-2xl'
		: ''} {cls}"
	{...rest}
>
	{@render children()}
</div>
