import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	// The no-FOUC script in app.html has already set the class before hydration.
	const initial: Theme = browser
		? document.documentElement.classList.contains('dark')
			? 'dark'
			: 'light'
		: 'dark';

	const { subscribe, set, update } = writable<Theme>(initial);

	function apply(theme: Theme) {
		if (browser) {
			document.documentElement.classList.toggle('dark', theme === 'dark');
			try {
				localStorage.setItem('theme', theme);
			} catch (e) {
				// ignore storage errors (private mode, etc.)
			}
		}
	}

	return {
		subscribe,
		set(theme: Theme) {
			apply(theme);
			set(theme);
		},
		toggle() {
			update((current) => {
				const next: Theme = current === 'dark' ? 'light' : 'dark';
				apply(next);
				return next;
			});
		}
	};
}

export const theme = createThemeStore();
