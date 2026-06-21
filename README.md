# Muhammad Ashar — Portfolio

A modern, colorful, interactive developer portfolio built with **SvelteKit**, **Tailwind CSS 4**,
**GSAP**, and a lightweight **Three.js** hero. Deployed to **Netlify** with serverless functions for
live GitHub stats and a working contact form.

## Tech stack

- **SvelteKit** (Svelte 5 runes) + TypeScript
- **Tailwind CSS 4** (`@tailwindcss/vite`, configured via `@theme` in `src/app.css`)
- **GSAP** + ScrollTrigger for scroll animations
- **Three.js** — lazy-loaded particle hero (code-split, paused off-screen, respects reduced motion)
- **adapter-netlify** — `+server.ts` endpoints deploy as Netlify Functions
- **Resend** — contact-form email delivery

## Project structure

```
src/lib/data/        # ← single source of truth for content
  profile.ts         # name, title, bio, contact, social links
  projects.ts        # all projects (add one object + images in static/projects/<slug>/)
  skills.ts          # skills by category
  experience.ts      # work timeline
  upwork.ts          # Upwork profile + stats (manual — no public API)
src/lib/components/   # UI + sections
src/routes/api/       # github + contact serverless endpoints
static/               # images, favicon, resume.pdf
```

### Adding a project

Append an object to `src/lib/data/projects.ts` and drop its images in
`static/projects/<slug>/`. `cover` is the card thumbnail; `images[]` is the modal gallery.

### Updating your resume

Replace `static/resume.pdf` with your real CV (the download button links to `/resume.pdf`).

## Local development

```bash
npm install
cp .env.example .env      # fill in the values below
npm run dev
```

### Environment variables

| Variable             | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `GITHUB_TOKEN`       | Fine-grained PAT (read-only public data) for `/api/github`     |
| `RESEND_API_KEY`     | Resend API key for the contact form                            |
| `CONTACT_TO_EMAIL`   | Where contact-form messages are delivered                      |
| `CONTACT_FROM_EMAIL` | (optional) verified sender; defaults to Resend onboarding addr |

Without `GITHUB_TOKEN`, the GitHub section degrades gracefully to a "visit my profile" card.

## Build & deploy

```bash
npm run build     # outputs to build/ via adapter-netlify
```

Connect the repo to Netlify and set the env vars above in **Site settings → Environment variables**.
`netlify dev` runs the functions locally.
