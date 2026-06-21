<!--
	Cheap, CSS-only animated gradient "aurora" backdrop.
	Fixed behind all content; pointer-events disabled.
-->
<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
	<div
		class="animate-[aurora_18s_ease_infinite] absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full opacity-40 blur-[100px]"
		style="background: radial-gradient(circle, var(--color-brand-500), transparent 70%)"
	></div>
	<div
		class="animate-[aurora_22s_ease_infinite] absolute top-1/3 -right-1/4 h-[55vh] w-[55vh] rounded-full opacity-30 blur-[100px]"
		style="background: radial-gradient(circle, var(--color-accent-500), transparent 70%)"
	></div>
	<div
		class="animate-[aurora_26s_ease_infinite] absolute -bottom-1/4 left-1/3 h-[50vh] w-[50vh] rounded-full opacity-25 blur-[100px]"
		style="background: radial-gradient(circle, var(--color-cyan-400), transparent 70%)"
	></div>
	<!-- subtle grid texture -->
	<div
		class="absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px); background-size: 48px 48px;"
	></div>
</div>
