import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// SPA fallback — Zerops static service serves this
			// file for all unmatched routes automatically.
			fallback: 'index.html'
		})
	}
};

export default config;
