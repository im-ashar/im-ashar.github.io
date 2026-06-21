<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from './ui/SectionHeading.svelte';
	import GlassCard from './ui/GlassCard.svelte';
	import Icon from './ui/Icon.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let company = $state(''); // honeypot
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMsg = $state('');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'sending') return;
		status = 'sending';
		errorMsg = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name, email, message, company })
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
			status = 'success';
			name = email = message = '';
		} catch (err) {
			status = 'error';
			errorMsg = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}

	const inputClass =
		'w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30';
</script>

<section id="contact" class="relative mx-auto max-w-5xl scroll-mt-24 px-4 py-24 sm:px-6">
	<SectionHeading
		eyebrow="Let's talk"
		title="Get In Touch"
		subtitle="Have a project in mind or just want to say hi? Send me a message."
	/>

	<div class="grid gap-8 md:grid-cols-[1fr_1.3fr]">
		<!-- contact details -->
		<div use:reveal={{ x: -30, y: 0 }} class="flex flex-col gap-4">
			{#each profile.social.filter((s) => ['mail', 'whatsapp', 'linkedin', 'github'].includes(s.icon)) as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="glass flex items-center gap-4 rounded-xl p-4 transition hover:-translate-y-1 hover:text-brand-400"
				>
					<span class="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-400">
						<Icon name={link.icon} size={20} />
					</span>
					<div>
						<p class="text-sm font-semibold" style="color: var(--text)">{link.label}</p>
						<p class="text-xs" style="color: var(--text-muted)">
							{link.icon === 'mail' ? profile.email : link.label}
						</p>
					</div>
				</a>
			{/each}
		</div>

		<!-- form -->
		<GlassCard class="p-6 sm:p-8" >
			<form onsubmit={submit} class="space-y-4" use:reveal={{ x: 30, y: 0 }}>
				<!-- honeypot (hidden from users) -->
				<input
					type="text"
					bind:value={company}
					name="company"
					tabindex="-1"
					autocomplete="off"
					class="absolute -left-[9999px] h-0 w-0"
					aria-hidden="true"
				/>

				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label for="name" class="mb-1.5 block text-sm font-medium">Name</label>
						<input
							id="name"
							bind:value={name}
							required
							class={inputClass}
							style="border-color: var(--border); color: var(--text)"
							placeholder="Your name"
						/>
					</div>
					<div>
						<label for="email" class="mb-1.5 block text-sm font-medium">Email</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							required
							class={inputClass}
							style="border-color: var(--border); color: var(--text)"
							placeholder="you@example.com"
						/>
					</div>
				</div>
				<div>
					<label for="message" class="mb-1.5 block text-sm font-medium">Message</label>
					<textarea
						id="message"
						bind:value={message}
						required
						rows="5"
						class="{inputClass} resize-none"
						style="border-color: var(--border); color: var(--text)"
						placeholder="Tell me about your project..."
					></textarea>
				</div>

				<button
					type="submit"
					disabled={status === 'sending'}
					class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 font-medium text-white shadow-lg shadow-brand-500/30 transition-all hover:shadow-brand-500/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
				>
					{#if status === 'sending'}
						Sending…
					{:else}
						Send Message <Icon name="arrow" size={18} />
					{/if}
				</button>

				{#if status === 'success'}
					<p class="text-sm font-medium text-emerald-400">
						✓ Thanks! Your message has been sent. I'll get back to you soon.
					</p>
				{:else if status === 'error'}
					<p class="text-sm font-medium text-pink-400">{errorMsg}</p>
				{/if}
			</form>
		</GlassCard>
	</div>
</section>
