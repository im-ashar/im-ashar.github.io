import type { Experience } from '$lib/types';

/**
 * Work history, newest first. Edit here to update the timeline.
 * Placeholder content — replace with real roles, companies, and dates.
 */
export const experience: Experience[] = [
	{
		role: 'Senior Software Engineer',
		company: 'Your Company',
		location: 'Remote',
		start: '2023',
		end: 'Present',
		highlights: [
			'Lead development of production web applications across the full stack.',
			'Architect scalable APIs and cloud infrastructure for high-traffic services.',
			'Mentor junior engineers and drive code-quality and review standards.'
		],
		tech: ['ASP.NET Core', 'TypeScript', 'Azure', 'SvelteKit']
	},
	{
		role: 'Software Engineer',
		company: 'Previous Company',
		location: 'Lahore, Pakistan',
		start: '2021',
		end: '2023',
		highlights: [
			'Built and maintained C# / .NET MVC web applications.',
			'Implemented authentication, authorization, and data-access layers.',
			'Integrated third-party web services and REST APIs.'
		],
		tech: ['C#', '.NET MVC', 'SQL Server', 'JavaScript']
	},
	{
		role: 'Freelance Developer',
		company: 'Upwork',
		location: 'Remote',
		start: '2020',
		end: 'Present',
		highlights: [
			'Delivered web and AI projects for international clients.',
			'Maintained a strong Job Success Score across completed contracts.'
		],
		tech: ['C#', 'React', 'Node.js', 'AI / LLMs']
	}
];
