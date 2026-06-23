import type { Project } from '$lib/types';

/**
 * SINGLE SOURCE OF TRUTH for all projects.
 *
 * To add a project:
 *   1. Append a new object below.
 *   2. Drop its images in `static/projects/<slug>/` and reference them here.
 *      `cover` is the card thumbnail; `images` is the gallery shown in the modal.
 *
 * Tip: add `links.repo` / `links.live` once URLs are available.
 */
export const projects: Project[] = [
	{
		slug: 'reactiveblazor',
		title: 'ReactiveBlazor',
		tagline: 'Open-source reactive state library for Blazor',
		description: `Authored and actively maintained, ReactiveBlazor is an open-source .NET library on
GitHub that integrates reactive programming patterns into Blazor SSR applications to optimize
state management and component performance.`,
		tags: ['.NET', 'Blazor', 'Open Source'],
		cover: '/projects/reactiveblazor/cover.jpg',
		images: ['/projects/reactiveblazor/cover.jpg'],
		links: {demo:"https://reactive-blazor.runasp.net/",repo:"https://github.com/im-ashar/ReactiveBlazor"},
		featured: true,
		year: 2025
	},
	{
		slug: 'aichatpdf',
		title: 'AI - ChatPDF',
		tagline: 'Chat with your PDFs, powered by OpenAI',
		description: `Built with .NET 7 MVC, AI-ChatPDF lets users extract text from PDF documents and
engage in a question-and-answer session based on the extracted content. It leverages the OpenAI
API's completion capabilities to provide intelligent, context-aware responses.`,
		tags: ['.NET', 'AI', 'OpenAI'],
		cover: '/projects/aichatpdf/cover.png',
		images: ['/projects/aichatpdf/cover.png'],
		links: {},
		featured: false,
		year: 2024
	},
	{
		slug: 'blazingblog',
		title: 'BlazingBlog',
		tagline: 'Dynamic blog platform built on Blazor .NET 8',
		description: `A dynamic and responsive blog application built with Blazor .NET 8. It features an
intuitive, feature-rich admin side for content management and administrative functionality —
showcasing a commitment to staying current with the latest advancements in the Microsoft
ecosystem.`,
		tags: ['.NET', 'Blazor', 'Web App'],
		cover: '/projects/blazingblog/cover.jpg',
		images: ['/projects/blazingblog/cover.jpg','/projects/blazingblog/1.png','/projects/blazingblog/2.png','/projects/blazingblog/3.png'],
		links: {live:"https://blazing-blog.runasp.net/",repo:"https://github.com/im-ashar/BlazingBlog"},
		featured: true,
		year: 2024
	},
	{
		slug: 'edsys',
		title: 'EdSys',
		tagline: 'School management & administration platform',
		description: `A comprehensive school management platform designed to centralize and automate
core administrative workflows — including student and teacher administration, fee processing,
attendance tracking, and examination scheduling. Built with Angular and .NET.`,
		tags: ['.NET', 'Angular', 'Web App'],
		cover: '/projects/edsys/cover.png',
		images: ['/projects/edsys/cover.png','/projects/edsys/1.jpeg','/projects/edsys/2.jpeg','/projects/edsys/3.jpeg','/projects/edsys/4.jpeg'],
		links: {repo:"https://github.com/im-ashar/EdSys"},
		featured: true,
		year: 2023
	}
];

/** Projects shown on the home page. Falls back to the first 3 if none are flagged. */
export const featuredProjects: Project[] = projects.some((p) => p.featured)
	? projects.filter((p) => p.featured)
	: projects.slice(0, 3);

/** All unique tags across projects, for the filter UI. */
export const projectTags: string[] = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
