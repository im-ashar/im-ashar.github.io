import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		name: 'Languages',
		skills: [
			{ name: 'C#', level: 95 },
			{ name: 'TypeScript', level: 90 },
			{ name: 'JavaScript', level: 92 },
			{ name: 'SQL', level: 90 },
			{ name: 'HTML & CSS', level: 92 }
		]
	},
	{
		name: 'Backend & .NET',
		skills: [
			{ name: '.NET / ASP.NET Core', level: 95 },
			{ name: '.NET Web API', level: 93 },
			{ name: 'Blazor', level: 88 },
			{ name: 'Entity Framework', level: 90 }
		]
	},
	{
		name: 'Frontend',
		skills: [
			{ name: 'React', level: 90 },
			{ name: 'Angular', level: 85 },
			{ name: 'Blazor', level: 88 },
			{ name: 'Svelte / SvelteKit', level: 80 }
		]
	},
	{
		name: 'Cloud & DevOps',
		skills: [
			{ name: 'Azure', level: 88 },
			{ name: 'AWS', level: 82 },
			{ name: 'Docker', level: 82 },
			{ name: 'Git & CI/CD', level: 88 }
		]
	}
];
