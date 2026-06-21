import type { Experience } from '$lib/types';

/**
 * Work history, newest first. Edit here to update the timeline.
 */
export const experience: Experience[] = [
	{
		role: 'Sr. Software Engineer',
		company: 'Strategic Systems International',
		location: 'Lahore, Pakistan',
		start: '03/2026',
		end: 'Present',
		highlights: [
			'Built an automated weekly PDF reporting module using .NET Web APIs and React to deliver customized client insights.',
			'Optimized system performance and scalability by offloading intensive report-rendering tasks to serverless Lambda functions.',
			'Implemented efficient background jobs to aggregate complex datasets without degrading core application responsiveness.'
		],
		tech: ['.NET Web API', 'React', 'AWS Lambda']
	},
	{
		role: 'Software Engineer',
		company: 'CodeNinja',
		location: 'Lahore, Pakistan',
		start: '09/2024',
		end: '02/2026',
		highlights: [
			'Developed and optimized backend services using .NET Web API and Azure, ensuring high performance and scalability.',
			'Designed and maintained the front end with React and TypeScript, enhancing the user experience with responsive, intuitive interfaces.',
			'Improved system reliability and functionality by debugging and resolving issues across the full stack.'
		],
		tech: ['.NET Web API', 'Azure', 'React', 'TypeScript']
	},
	{
		role: 'Associate Software Engineer',
		company: 'Autymate LLC',
		location: 'Lahore, Pakistan',
		start: '09/2023',
		end: '09/2024',
		highlights: [
			'Developed robust backend systems using .NET, ensuring reliability and scalability for accounting workflows.',
			'Implemented Azure cloud solutions, optimizing data storage, processing, and application performance.',
			'Built dynamic and user-friendly front-end interfaces with Angular, enhancing user engagement and usability.'
		],
		tech: ['.NET', 'Azure', 'Angular']
	},
	{
		role: '.NET Developer (Freelancer)',
		company: 'Upwork',
		location: 'California, United States',
		start: '05/2021',
		end: '08/2023',
		highlights: [
			'Delivered multiple projects across diverse domains, showcasing expertise in .NET development and front-end technologies.',
			'Collaborated with clients to gather requirements, propose solutions, and ensure successful project execution.',
			'Ensured timely delivery by managing project timelines and meeting critical deadlines.'
		],
		tech: ['.NET', 'C#', 'JavaScript']
	}
];
