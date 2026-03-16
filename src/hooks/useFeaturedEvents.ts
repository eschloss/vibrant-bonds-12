import { useEffect, useMemo, useState } from "react";
import {
  buildGetFeaturedEventsUrl,
  kikiEventToDisplayEvent,
  type GetKikiEventResponse,
} from "@/lib/eventApi";

export type FeaturedEvent = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  primaryImage: string;
  dateTime: string;
  citySlug: string;
  price: string;
};

export function useFeaturedEvents(limit = 9) {
  const [events, setEvents] = useState<FeaturedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = buildGetFeaturedEventsUrl(limit);

    setLoading(true);
    setError(null);

    fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        const raw =
          Array.isArray(json) ? json : (json?.events ?? json?.items ?? []);
        const list = Array.isArray(raw) ? raw : [];
        const mapped = list
          .filter((item): item is GetKikiEventResponse => item?.slug != null)
          .map(kikiEventToDisplayEvent);
        setEvents(mapped);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") {
          setError(err instanceof Error ? err : new Error(String(err)));
          setEvents([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [limit]);

  return useMemo(
    () => ({ events, loading, error }),
    [events, loading, error]
  );
}
