<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		class?: string;
		children: Snippet;
	}
	let { class: cls = '', children }: Props = $props();
</script>

<span class="gradient-text {cls}">{@render children()}</span>
