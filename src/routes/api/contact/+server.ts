import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let body: { name?: string; email?: string; message?: string; company?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request.' }, { status: 400 });
	}

	const name = (body.name ?? '').trim();
	const email = (body.email ?? '').trim();
	const message = (body.message ?? '').trim();
	const honeypot = (body.company ?? '').trim();

	// Honeypot: real users never fill this hidden field.
	if (honeypot) {
		return json({ ok: true });
	}

	// Validation
	if (name.length < 2 || name.length > 100) {
		return json({ error: 'Please enter your name.' }, { status: 400 });
	}
	if (!EMAIL_RE.test(email) || email.length > 200) {
		return json({ error: 'Please enter a valid email address.' }, { status: 400 });
	}
	if (message.length < 10 || message.length > 5000) {
		return json({ error: 'Message must be between 10 and 5000 characters.' }, { status: 400 });
	}

	const apiKey = env.RESEND_API_KEY;
	const to = env.CONTACT_TO_EMAIL;
	if (!apiKey || !to) {
		return json(
			{ error: 'Contact form is not configured. Please email me directly.' },
			{ status: 500 }
		);
	}

	const resend = new Resend(apiKey);
	const ip = getClientAddress();

	try {
		const { error } = await resend.emails.send({
			// Use Resend's onboarding sender unless a verified domain is configured.
			from: env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
			to,
			replyTo: email,
			subject: `Portfolio contact from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\n${message}`
		});
		if (error) throw new Error(error.message);
		return json({ ok: true });
	} catch (err) {
		const m = err instanceof Error ? err.message : 'Failed to send message.';
		return json({ error: m }, { status: 502 });
	}
};
