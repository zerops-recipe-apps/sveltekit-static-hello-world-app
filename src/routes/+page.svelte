<script lang="ts">
	// PUBLIC_APP_ENV is baked in at build time from the
	// RUNTIME_APP_ENV env var — see zerops.yaml.
	import { PUBLIC_APP_ENV } from '$env/static/public';

	const env = PUBLIC_APP_ENV || 'development';
	const buildTime = __BUILD_TIME__;
</script>

<svelte:head>
	<title>SvelteKit · Zerops Hello World</title>
</svelte:head>

<main>
	<div class="hero">
		<div class="badge">⚡ SvelteKit v{__SVELTEKIT_VERSION__}</div>
		<h1>Hello from Zerops!</h1>
	</div>

	<ul class="meta">
		<li>
			<span class="label">Environment</span>
			<code>{env}</code>
		</li>
		<li>
			<span class="label">Built at</span>
			<code>{buildTime}</code>
		</li>
	</ul>
</main>

<style>
	:global(body) {
		margin: 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background: #0d0d0d;
		color: #f0f0f0;
	}

	main {
		text-align: center;
		padding: 2rem;
		width: min(480px, 100%);
	}

	.hero {
		margin-bottom: 2rem;
	}

	.badge {
		display: inline-block;
		background: #ff3e0018;
		color: #ff6d3a;
		border: 1px solid #ff3e0035;
		border-radius: 999px;
		padding: 0.3rem 0.9rem;
		font-size: 0.85rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 700;
		margin: 0;
		color: #ffffff;
	}

	.meta {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.meta li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #1a1a1a;
		border: 1px solid #272727;
		border-radius: 8px;
		padding: 0.75rem 1.25rem;
	}

	.label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: #666;
	}

	code {
		font-family: 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.875rem;
		color: #ff6d3a;
		background: #ff3e0010;
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
	}
</style>
