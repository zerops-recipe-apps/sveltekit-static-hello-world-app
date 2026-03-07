# SvelteKit Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A minimal SvelteKit application deployed as a static site on Zerops — built with Node.js and served by Nginx, with build-time environment variable injection via SvelteKit's `PUBLIC_*` convention.
Used within [SvelteKit Hello World recipe](https://app.zerops.io/recipes/sveltekit-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/sveltekit-hello-world?environment=small-production)

![sveltekit cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-sveltekit.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`
The main application configuration file you place at the root of your repository. It tells Zerops how to build, deploy, and run your application.

```yaml
# The 'prod' setup builds optimized static assets for Nginx
# serving. The 'dev' setup deploys source code for live
# SSH-based development.
zerops:
  - setup: prod
    build:
      # Build with Node.js (npm/npx), serve with Nginx.
      # The build container compiles SvelteKit into static
      # HTML/CSS/JS — Node.js is NOT present at runtime.
      base: nodejs@22

      buildCommands:
        # npm ci installs exact versions from package-lock.json
        # for reproducible production builds.
        - npm ci
        # Zerops injects the runtime var APP_ENV into the build
        # environment as RUNTIME_APP_ENV. Setting PUBLIC_APP_ENV
        # inline passes it to Vite, which bakes it into the
        # static output — no runtime process can read env vars
        # in a static deployment.
        - PUBLIC_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build

      # Strip 'build/' prefix — contents become the Nginx root,
      # so build/index.html is served at /.
      deployFiles:
        - build/~

      cache:
        - node_modules

    run:
      # Nginx serves the compiled output — no Node.js at runtime.
      # Built-in SPA fallback serves index.html for all routes
      # that don't match a static file, enabling client-side
      # routing without custom run.routing configuration.
      base: static

  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu
      buildCommands:
        # npm install (not ci) — dev may lack a lock file or
        # have in-progress dependency changes.
        - npm install
      # Deploy full source so the developer has all files
      # ready in the runtime container on SSH login.
      deployFiles: ./
      cache:
        - node_modules

    run:
      # nodejs@22 runtime gives the developer Node.js tools
      # via SSH — needed to run 'npm run dev' or similar.
      base: nodejs@22
      os: ubuntu
      # Keep the container alive — developer starts their
      # own dev server via SSH, not via a start command.
      start: zsc noop --silent
```

### 2. Build-time environment variables

SvelteKit exposes variables prefixed with `PUBLIC_` to client code via `$env/static/public`. These are resolved at build time — there is no runtime process in a static deployment to read them.

Zerops provides the `RUNTIME_` prefix bridge: a runtime env var `APP_ENV` is available during the build as `RUNTIME_APP_ENV`. Set it per environment in the Zerops dashboard or import.yaml, then reference it in `zerops.yaml`:

```yaml
envVariables:
  PUBLIC_APP_ENV: ${RUNTIME_APP_ENV}
```

In your SvelteKit components:

```svelte
<script>
  import { PUBLIC_APP_ENV } from '$env/static/public';
</script>
```

### 3. SPA routing

`adapter-static` is configured with `fallback: 'index.html'` and `+layout.ts` sets `export const ssr = false`. Zerops static service automatically serves `index.html` for any path that does not match a static file, so client-side routing works without custom Nginx configuration.

<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
