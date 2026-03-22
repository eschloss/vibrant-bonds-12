# Static landing pages (`static-landings/`)

Conventions for fast, English-only HTML landings that mirror Pulse city pages **at rest** (no React, no Vite imports).

## Purpose

- Ship a **minimal static shell** (HTML + CSS + tiny scripts only for iframe timing and optional live countdown parity).
- **Do not** import from `src/` or add these files to the Vite bundle.

## Per-landing layout

- One folder per slug: `static-landings/<slug>/index.html` plus scoped CSS (e.g. `<slug>.css`).
- **Internal links** must be absolute: `https://pulsenow.app/...` (not root-relative `/`).

## Visual target

- **Pixel-perfect** alignment with the live `/cities/<slug>` page: spacing, typography, colors, breakpoints — **resting state only**.
- **No animations**: no `@keyframes`, decorative `transition`/`animation`, scroll-driven motion, Framer-style effects, or `animate-*` utilities. Prefer instant paint; `:hover` color changes only if they match the live site and stay cheap.

## Copy & data

- **English only** — bake strings in HTML (no i18n).
- Bake city (or campaign) fields from a provided JSON row; normalize asset URLs to `https://…`.

## Warming the SPA (no duplicate prefetch stack)

- **Do not** add `kiki-api-prefetch.js`, URL-shard logic, or extra `fetch` calls to `get_all_cities` on these pages.
- After `load` + `requestIdleCallback` (with `setTimeout` fallback), inject a **hidden** iframe:

  - `width="0"` `height="0"` `hidden` `aria-hidden="true"` `tabindex="-1"`
  - `src="https://pulsenow.app/cities/<slug>"` for city landings (adjust for non-city landings).

## Infra: framing from a subdomain

- Landings may live on a **different origin** (e.g. `https://lagos.pulsenow.app`) while the iframe loads `https://pulsenow.app/...`.
- `X-Frame-Options: SAMEORIGIN` on `pulsenow.app` **blocks** embedding from subdomains. The app must expose a CSP (or equivalent) that allows the landing origin, e.g. `frame-ancestors https://lagos.pulsenow.app` (plus staging hosts as needed).

## Checklist for a new landing

1. Create `static-landings/<slug>/` with `index.html` + CSS.
2. Set meta/SEO (title, description, `og:*`, canonical for the **landing** URL).
3. Hero image: dimensions + `fetchpriority="high"` on LCP image.
4. All in-site links → `https://pulsenow.app/...`.
5. No animation/motion libraries; no duplicate API prefetch scripts.
6. Append deferred hidden iframe to the canonical in-app URL.
7. Document or verify `frame-ancestors` for the landing host.
