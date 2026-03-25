import { useEffect, useState } from "react";
import { useApiJson } from "@/hooks/useApiJson";

/**
 * Preloads cities into useApiJson's cache after the browser is idle so these requests
 * do not compete with first paint and route-critical API calls (e.g. /events/:slug).
 * The expanded list is requested on a subsequent idle tick so the two calls do not run in parallel.
 */
const CitiesPreloader = () => {
  const [idleReady, setIdleReady] = useState(false);
  const [expandedIdleReady, setExpandedIdleReady] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent || "")) {
      return;
    }
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setIdleReady(true));
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(() => setIdleReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!idleReady) return;
    if (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent || "")) {
      return;
    }
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setExpandedIdleReady(true));
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(() => setExpandedIdleReady(true), 0);
    return () => clearTimeout(t);
  }, [idleReady]);

  useApiJson<unknown[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: idleReady
  });

  useApiJson<unknown[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000,
    enabled: expandedIdleReady
  });

  return null;
};

export default CitiesPreloader;
