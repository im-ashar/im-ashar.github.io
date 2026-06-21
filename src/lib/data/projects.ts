import type { Project } from '$lib/types';

/**
 * SINGLE SOURCE OF TRUTH for all projects.
 *
 * To add a project:
 *   1. Append a new object below.
 *   2. Drop its images in `static/projects/<slug>/` and reference them here.
 *      `cover` is the card thumbnail; `images` is the gallery shown in the modal.
 */
export const projects: Project[] = [
	{
		slug: 'aichatpdf',
		title: 'AI - ChatPDF',
		tagline: 'Chat with your documents using AI',
		description: `An AI-powered application that lets users upload PDFs and have natural-language
conversations with their content. Built with a retrieval-augmented pipeline: documents are
chunked, embedded, and stored in a vector database, then relevant passages are fed to an LLM to
ground answers in the source material.`,
		tags: ['AI', 'LLM', 'Full-Stack'],
		cover: '/projects/aichatpdf/cover.png',
		images: ['/projects/aichatpdf/cover.png'],
		links: {},
		featured: true,
		year: 2024
	},
	{
		slug: 'mkidz',
		title: 'MKIDZ',
		tagline: 'Interactive learning platform for kids',
		description: `A colorful, gamified learning application aimed at children, focused on engaging
UI and interactive lessons.`,
		tags: ['Web App', 'UI/UX'],
		cover: '/projects/mkidz/cover.png',
		images: ['/projects/mkidz/cover.png'],
		links: {},
		year: 2023
	},
	{
		slug: 'moviesmafia',
		title: 'MoviesMafia',
		tagline: 'Movie discovery & streaming info site',
		description: `A movie information and discovery platform where users can browse, search, and
explore films with rich metadata pulled from external APIs.`,
		tags: ['.NET', 'Web App', 'API'],
		cover: '/projects/moviesmafia/cover.jpg',
		images: ['/projects/moviesmafia/cover.jpg'],
		links: { live: 'https://moviesmafia.ga' },
		featured: true,
		year: 2023
	},
	{
		slug: 'musicmafia',
		title: 'MusicMafia',
		tagline: 'Music streaming platform',
		description: `A music platform for browsing and playing tracks, built with the .NET MVC stack
and deployed to the cloud.`,
		tags: ['.NET', 'MVC', 'Web App'],
		cover: '/projects/musicmafia/cover.png',
		images: ['/projects/musicmafia/cover.png'],
		links: { live: 'https://musicmafia.onrender.com/Home/Homepage' },
		featured: true,
		year: 2022
	}
];

/** All unique tags across projects, for the filter UI. */
export const projectTags: string[] = Array.from(
	new Set(projects.flatMap((p) => p.tags))
).sort();
