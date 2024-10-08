import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				'foreground-pink': '#F9C4CE',
				'foreground-pink-accent': '#EC94CD',
				'foreground-blue': '#B9DFF4',
				'foreground-blue-accent': '#41499E',
				'background-blue-accent': '#2E3191',
				'foreground-blue-dim': '#9598FF',
				'background-yellow': '#FFECD9'
			}
		}
	},
	plugins: [flowbitePlugin]
};
