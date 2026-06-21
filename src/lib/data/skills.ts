import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		name: 'Languages',
		skills: [
			{ name: 'C#', level: 95 },
			{ name: 'TypeScript', level: 90 },
			{ name: 'JavaScript', level: 92 },
			{ name: 'SQL', level: 88 },
			{ name: 'Python', level: 75 }
		]
	},
	{
		name: 'Frontend',
		skills: [
			{ name: 'Svelte / SvelteKit', level: 88 },
			{ name: 'React', level: 85 },
			{ name: 'Tailwind CSS', level: 92 },
			{ name: 'HTML & CSS', level: 95 }
		]
	},
	{
		name: 'Backend',
		skills: [
			{ name: 'ASP.NET Core', level: 93 },
			{ name: 'Node.js', level: 85 },
			{ name: 'REST & GraphQL APIs', level: 88 },
			{ name: 'Entity Framework', level: 90 }
		]
	},
	{
		name: 'Data & Cloud',
		skills: [
			{ name: 'SQL Server / PostgreSQL', level: 88 },
			{ name: 'Azure', level: 80 },
			{ name: 'Docker', level: 78 },
			{ name: 'CI/CD', level: 80 }
		]
	}
];
