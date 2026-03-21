import { useEffect } from "react"
import { dispatchAnalyticsAppReady } from "@/lib/analyticsAppReady"

/**
 * Mount only inside Suspense after the route chunk resolves, then signal that the main view is ready
 * so index.html can inject GA / Meta without competing with first paint.
 */
export default function AppReadyDispatch() {
  useEffect(() => {
    dispatchAnalyticsAppReady()
  }, [])
  return null
}
