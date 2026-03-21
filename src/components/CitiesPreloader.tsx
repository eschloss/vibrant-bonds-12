import { useEffect, useState } from "react";
import { useApiJson } from "@/hooks/useApiJson";

/**
 * Preloads cities into useApiJson's cache after the browser is idle so these requests
 * do not compete with first paint and route-critical API calls (e.g. /events/:slug).
 */
const CitiesPreloader = () => {
  const [idleReady, setIdleReady] = useState(false);

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

  useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: idleReady
  });

  useApiJson<any[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000,
    enabled: idleReady
  });

  return null;
};

export default CitiesPreloader;
