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
- **No animations** on the landing shell: no `@keyframes`, decorative `transition`/`animation`, scroll-driven motion, Framer-style effects, or `animate-*` utilities on page content. Prefer instant paint; `:hover` color changes only if they match the live site and stay cheap. **Exception:** the shared Pulse chat widget (`scripts/pulse-whatsapp-chat.css`) uses motion to match the in-app `WhatsAppChatButton`.

## Copy & data

- **English only** — bake strings in HTML (no i18n).
- **Do not** add a fake language pill or language selector on static pages; the live app may show `LanguageSelector`, but English-only landings omit it.
- Bake city (or campaign) fields from a provided JSON row; normalize asset URLs to `https://…`.
- **City page headline** (default city, non-queer/affinity): match the live template — `Meet New Friends` on the first line, line break, then `in {CityName}` with the city in gradient text (see `CityMatchmakingTemplate`).

## UI details (match live)

- **Hero primary CTA** (“Get Matched in {City}”): use **Pulse pink** (`#ff2688`) as the button fill — not pink-to-green or other multi-color gradients unless the live page explicitly uses them for that control.
- **Dark sections** (steps, timer / “Ready to meet…”, activities, footer): use the same **`bg-gray-900`** base (`#111827`) as the React/Tailwind sections — avoid ad-hoc `rgba` tints that skew hue.
- **Footer social row**: use **inline SVG** icons (Instagram, Facebook, LinkedIn, Reddit) consistent with the main app footer — not text abbreviations (“IG”, “FB”).
- **Newsletter**: do **not** ship a subscribe form unless it posts to the real backend (e.g. Supabase). If not wired, omit the form and button entirely (link to `https://pulsenow.app/contact` is fine if you add copy elsewhere).

## Warming the SPA (no duplicate prefetch stack)

- **Do not** add `kiki-api-prefetch.js`, URL-shard logic, or extra `fetch` calls to `get_all_cities` on these pages.
- After `load` + `requestIdleCallback` (with `setTimeout` fallback), inject a **hidden** iframe:

  - `width="0"` `height="0"` `hidden` `aria-hidden="true"` `tabindex="-1"`
  - `src="https://pulsenow.app/cities/<slug>"` for city landings (adjust for non-city landings).

## Analytics (Google + Meta) — deferred

- Append **`scripts/analytics-deferred.js`** at the end of `<body>` (with `defer`). It loads **Google Analytics** (`gtag`, measurement ID aligned with `public/third-party-bootstrap.js`) and **Meta Pixel** after `window` `load` + `requestIdleCallback`. **Do not** load ManyChat on static indexes.

## Pulse WhatsApp chat (optional per landing)

- Shared implementation: **`scripts/pulse-whatsapp-chat.js`** loads **`scripts/pulse-whatsapp-chat.css`** dynamically (same directory as the script). **Do not** add a render-blocking `<link>` for the chat CSS in `<head>` — the script injects the stylesheet after **`load`** + idle, then mounts the widget after the CSS loads (keeps first paint fast).
- **`data-variant`**: `matchmaking` (e.g. Lagos static — mirror `/cities/lagos` chat) or `events` (e.g. event/campaign landings — mirror `/events/:slug` chat).
- Optional: **`data-event-title`**, **`data-webhook-context`** (webhook `context` string), **`data-storage-id`** (namespaces `localStorage` chat thread/messages per page).

## Step icons (Lucide parity)

- Use the **Lucide** SVG paths with `stroke-linecap="round"` and `stroke-linejoin="round"` for steps (e.g. Sprout for “Grow the Friendships”) so icons match the React page, not a substitute glyph.

## Infra: framing from a subdomain

- Landings may live on a **different origin** (e.g. `https://lagos.pulsenow.app`) while the iframe loads `https://pulsenow.app/...`.
- `X-Frame-Options: SAMEORIGIN` on `pulsenow.app` **blocks** embedding from subdomains. The app must expose a CSP (or equivalent) that allows the landing origin, e.g. `frame-ancestors https://lagos.pulsenow.app` (plus staging hosts as needed).

## Checklist for a new landing

1. Create `static-landings/<slug>/` with `index.html` + CSS.
2. Set meta/SEO (title, description, `og:*`, canonical for the **landing** URL).
3. Hero image: dimensions + `fetchpriority="high"` on LCP image.
4. All in-site links → `https://pulsenow.app/...`.
5. No animation/motion libraries on the page shell; no duplicate API prefetch scripts.
6. Append deferred hidden iframe to the canonical in-app URL; append **`analytics-deferred.js`** at the end of `<body>`.
7. If this landing needs the same floating chat as the app, append **`pulse-whatsapp-chat.js`** (with the correct **`data-variant`** and optional context attributes) — not a separate CSS link in `<head>`.
8. Document or verify `frame-ancestors` for the landing host.
9. Omit language UI; match hero CTA color and H1 line breaks; match dark section backgrounds; footer social as SVGs; no fake newsletter form.
