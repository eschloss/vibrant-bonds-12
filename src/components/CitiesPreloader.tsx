import { useApiJson } from "@/hooks/useApiJson";
import { buildGetKikiUrl } from "@/lib/eventApi";

/**
 * CitiesPreloader component that preloads cities and event data in the background.
 * This component doesn't render anything but triggers async fetches, populating
 * the cache so data is instantly available when needed. EventDetail uses raw fetch
 * but benefits from the browser's HTTP cache when the same URL is requested.
 */
const CitiesPreloader = () => {
  // Preload compact cities data
  useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Preload expanded cities data
  useApiJson<any[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Preload event page data (browser HTTP cache helps EventDetail's fetch)
  useApiJson<unknown>(buildGetKikiUrl("claymates-lekki-pottery"), {
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Component doesn't render anything - it just triggers the fetches
  return null;
};

export default CitiesPreloader;

