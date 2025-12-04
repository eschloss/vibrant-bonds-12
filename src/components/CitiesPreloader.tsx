import { useApiJson } from "@/hooks/useApiJson";

/**
 * CitiesPreloader component that preloads cities data in the background.
 * This component doesn't render anything but triggers async fetches for both
 * cities endpoints, populating the cache so data is instantly available when needed.
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

  // Component doesn't render anything - it just triggers the fetches
  return null;
};

export default CitiesPreloader;

