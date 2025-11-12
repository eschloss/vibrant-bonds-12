import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";

type UseApiJsonOptions<T> = {
  initialData?: T;
  fetchInit?: RequestInit;
  enabled?: boolean;
  cache?: boolean;
  staleTime?: number; // ms
};

type UseApiJsonReturn<T> = {
  data: T | undefined;
  setData: (updater: T | ((prev: T | undefined) => T)) => void;
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<void>;
  isStale: boolean;
  url: string;
};

type CacheEntry<T> = { data: T; timestamp: number };
const urlCache = new Map<string, CacheEntry<unknown>>();

function resolveUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const trimmed = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${API_BASE_URL}${trimmed}`;
}

export function useApiJson<T = unknown>(
  pathOrUrl: string,
  {
    initialData,
    fetchInit,
    enabled = true,
    cache = true,
    staleTime = 0
  }: UseApiJsonOptions<T> = {}
): UseApiJsonReturn<T> {
  const url = useMemo(() => resolveUrl(pathOrUrl), [pathOrUrl]);
  const [data, setDataState] = useState<T | undefined>(initialData as T | undefined);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isStale, setIsStale] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  const setData = useCallback((updater: T | ((prev: T | undefined) => T)) => {
    setDataState(prev => (typeof updater === "function" ? (updater as (p: T | undefined) => T)(prev) : updater));
  }, []);

  const doFetch = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    // Abort previous in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setError(undefined);
      setLoading(true);

      // Serve from cache if fresh
      if (cache && urlCache.has(url)) {
        const entry = urlCache.get(url) as CacheEntry<T>;
        const age = Date.now() - entry.timestamp;
        if (staleTime <= 0 || age < staleTime) {
          setDataState(entry.data);
          setIsStale(false);
          setLoading(false);
          return;
        } else {
          // serve cached data as stale immediately while revalidating
          setDataState(entry.data);
          setIsStale(true);
        }
      }

      const response = await fetch(url, {
        ...fetchInit,
        signal: controller.signal,
        headers: {
          accept: "application/json",
          ...(fetchInit?.headers || {})
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const json = (await response.json()) as T;
      setDataState(json);
      if (cache) {
        urlCache.set(url, { data: json, timestamp: Date.now() });
      }
      setIsStale(false);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [url, enabled, cache, fetchInit, staleTime]);

  useEffect(() => {
    doFetch();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [doFetch]);

  const refetch = useCallback(async () => {
    // bust cache for this url before refetch
    if (cache) urlCache.delete(url);
    await doFetch();
  }, [doFetch, url, cache]);

  return { data, setData, loading, error, refetch, isStale, url };
}


