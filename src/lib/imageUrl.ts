/**
 * Normalizes asset URLs from APIs that omit the scheme (e.g. `s.kikiapp.eu/city/foo.jpg`).
 * Without a scheme, browsers resolve those as relative to the current page path.
 */
export function ensureHttpsAssetUrl(value: string | undefined | null): string | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("/")) return s;
  return `https://${s}`;
}

/** Same id as `public/kiki-api-prefetch.js` so early script + React share one preload tag. */
export const KIKI_LCP_EVENT_IMAGE_PRELOAD_ID = "kiki-event-lcp-preload";

/**
 * When the CDN exposes multiple absolute URLs keyed by width descriptor (e.g. `"800w"`, `"1200w"`),
 * pass them here; omit until the API supports variants.
 */
export function buildSrcSetFromWidths(
  entries: Record<string, string> | undefined | null
): string | undefined {
  if (entries == null) return undefined;
  const parts = Object.entries(entries)
    .map(([w, url]) => {
      const u = ensureHttpsAssetUrl(url);
      return u ? `${u} ${w}` : null;
    })
    .filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(", ") : undefined;
}

export function upsertLcpImagePreload(href: string | undefined): void {
  if (typeof document === "undefined") return;
  const normalized = ensureHttpsAssetUrl(href);
  if (!normalized) return;
  let link = document.getElementById(KIKI_LCP_EVENT_IMAGE_PRELOAD_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = KIKI_LCP_EVENT_IMAGE_PRELOAD_ID;
    link.rel = "preload";
    link.as = "image";
    document.head.appendChild(link);
  }
  link.href = normalized;
}
