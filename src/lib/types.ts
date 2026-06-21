export interface SocialLink {
	label: string;
	href: string;
	/** icon key resolved in the Icon component */
	icon: 'github' | 'linkedin' | 'instagram' | 'whatsapp' | 'mail' | 'upwork';
}

export interface Profile {
	name: string;
	title: string;
	/** rotating roles for the animated hero subtitle */
	roles: string[];
	tagline: string;
	bio: string;
	location: string;
	email: string;
	phone: string;
	website: string;
	githubUsername: string;
	resumePath: string;
	social: SocialLink[];
}

export interface Project {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	tags: string[];
	images: string[];
	cover: string;
	links: { live?: string; repo?: string; demo?: string };
	featured?: boolean;
	year?: number;
}

export interface SkillCategory {
	name: string;
	icon?: string;
	skills: { name: string; level: number }[];
}

export interface Experience {
	role: string;
	company: string;
	location?: string;
	start: string;
	end: string; // 'Present' or year
	highlights: string[];
	tech: string[];
}

export interface Education {
	degree: string;
	institution: string;
	location?: string;
	start: string;
	end: string;
	description?: string;
}

export interface UpworkStat {
	label: string;
	value: string;
}

export interface UpworkProfile {
	profileUrl: string;
	title: string;
	stats: UpworkStat[];
	badges: string[];
}

/* ---- GitHub API response shapes (from /api/github) ---- */

export interface GithubRepo {
	name: string;
	description: string | null;
	url: string;
	stars: number;
	forks: number;
	language: string | null;
}

export interface LanguageSlice {
	name: string;
	percent: number;
	color: string;
}

export interface ContributionDay {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubData {
	profile: {
		login: string;
		name: string | null;
		avatarUrl: string;
		followers: number;
		following: number;
		publicRepos: number;
		totalStars: number;
	};
	topRepos: GithubRepo[];
	languages: LanguageSlice[];
	contributions: {
		total: number;
		weeks: ContributionDay[][];
	};
}
