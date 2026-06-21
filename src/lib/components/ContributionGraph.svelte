<script lang="ts">
	import type { ContributionDay } from '$lib/types';

	interface Props {
		weeks: ContributionDay[][];
		total: number;
	}
	let { weeks, total }: Props = $props();

	// brand-tinted heat levels
	const levelColors = [
		'var(--border)',
		'rgba(99,102,241,0.35)',
		'rgba(99,102,241,0.6)',
		'rgba(168,85,247,0.8)',
		'rgba(217,70,239,1)'
	];

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
</script>

<div class="overflow-x-auto">
	<div class="inline-flex flex-col gap-2">
		<p class="text-sm" style="color: var(--text-muted)">
			<span class="font-semibold gradient-text">{total.toLocaleString()}</span> contributions in the last year
		</p>
		<div class="flex gap-[3px]">
			{#each weeks as week, wi (wi)}
				<div class="flex flex-col gap-[3px]">
					{#each week as day (day.date)}
						<div
							class="h-[11px] w-[11px] rounded-[2px]"
							style="background: {levelColors[day.level]}"
							title="{day.count} contributions on {day.date}"
						></div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="flex items-center gap-1.5 self-end text-xs" style="color: var(--text-muted)">
			<span>Less</span>
			{#each levelColors as c (c)}
				<span class="h-[11px] w-[11px] rounded-[2px]" style="background: {c}"></span>
			{/each}
			<span>More</span>
		</div>
	</div>
</div>
