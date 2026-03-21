/**
 * Bridge for early fetches from public/kiki-api-prefetch.js (see index.html).
 * Registry keys are full sharded URLs; must match useApiJson resolveUrl and eventApi builders.
 */

declare global {
  interface Window {
    __KIKI_PREFETCH_CONFIG__?: { eventsApiBase: string; authApiBase: string };
    __KIKI_API_PREFETCH__?: { get: (url: string) => Promise<unknown> | undefined };
  }
}

export function getPrefetchJsonPromise(url: string): Promise<unknown> | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__KIKI_API_PREFETCH__?.get?.(url);
}
