/** Dispatched when the lazy route inside AppLayout has mounted (first paint of main content). */
export const ANALYTICS_APP_READY_EVENT = "kiki:app-ready" as const

/** Dispatched from index.html immediately after gtag/fbq stubs and script tags are injected. */
export const ANALYTICS_INIT_EVENT = "kiki:analytics-init" as const

let appReadyDispatched = false

/** Fire once when the shell considers the primary route ready (after Suspense + lazy chunk). */
export function dispatchAnalyticsAppReady(): void {
  if (typeof window === "undefined" || appReadyDispatched) return
  appReadyDispatched = true
  window.dispatchEvent(new CustomEvent(ANALYTICS_APP_READY_EVENT))
}
