/**
 * Bridge for early fetches from public/kiki-api-prefetch.js (see index.html).
 * Registry keys are full sharded URLs; must match useApiJson resolveUrl and eventApi builders.
 */

declare global {
  interface Window {
    __KIKI_PREFETCH_CONFIG__?: { eventsApiBase: string; authApiBase: string };
    __KIKI_API_PREFETCH__?: {
      get: (url: string) => Promise<unknown> | undefined;
      /** Settled when early index.html prefetch work for this page load has finished (including chained fetches). */
      ready?: Promise<void>;
    };
  }
}

export function getPrefetchJsonPromise(url: string): Promise<unknown> | undefined {
  if (typeof window === "undefined") return undefined;
  return window.__KIKI_API_PREFETCH__?.get?.(url);
}

/**
 * Resolves when `public/kiki-api-prefetch.js` has finished its initial route prefetch work.
 * No-ops if the script did not run (e.g. SSR) or predates `ready`. Safe to await on every language wave — once resolved, stays resolved.
 */
export function waitForInitialPrefetchWork(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  return window.__KIKI_API_PREFETCH__?.ready ?? Promise.resolve();
}
