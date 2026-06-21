import type { UpworkProfile } from '$lib/types';

/**
 * Upwork has no public stats API, so these are maintained manually.
 * Update the values below to match your live Upwork profile.
 */
export const upwork: UpworkProfile = {
	profileUrl: 'https://www.upwork.com/freelancers/~01d3e02810a3244d32',
	title: 'Top Rated Software Engineer',
	stats: [
		{ label: 'Job Success', value: '100%' },
		{ label: 'Total Earned', value: '$10K+' },
		{ label: 'Hours Worked', value: '500+' },
		{ label: 'Jobs Completed', value: '20+' }
	],
	badges: ['Top Rated', 'Rising Talent']
};
