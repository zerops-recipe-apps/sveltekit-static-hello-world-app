# sveltekit-static-hello-world-app

Minimal SvelteKit app using `@sveltejs/adapter-static`, compiled to static HTML/CSS/JS by Node.js and served by Zerops Nginx with SPA fallback to `index.html`.

## Zerops service facts

- HTTP port: `5173` (dev server) / `80` (prod nginx)
- Siblings: —
- Runtime base: `nodejs@22` (dev) / `static` (prod)

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm run dev`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- No Node.js at prod runtime — the `static` base is pure Nginx serving the `build/` output; env vars must be baked in at build time.
- Runtime `APP_ENV` is bridged as `RUNTIME_APP_ENV` during the prod build and passed to Vite as `PUBLIC_APP_ENV`.
