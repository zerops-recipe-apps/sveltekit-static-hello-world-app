import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';

// Read the actual installed SvelteKit version at build time.
let kitVersion = '2.x';
try {
	kitVersion = JSON.parse(
		readFileSync('./node_modules/@sveltejs/kit/package.json', 'utf-8')
	).version;
} catch {
	const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
	kitVersion = pkg.devDependencies['@sveltejs/kit']?.replace(/^\^/, '') ?? '2.x';
}

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// Injected at build time — not available at runtime.
		__BUILD_TIME__: JSON.stringify(new Date().toISOString()),
		__SVELTEKIT_VERSION__: JSON.stringify(kitVersion)
	}
});
