/**
 * Hash a string to a bucket 0-9 (djb2-style).
 */
function hashToBucket(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) % 10;
}

/**
 * Shard api.kikiapp.eu requests across api, api1, ... api9 by hashing the path+params.
 * Staging (staging-api.kikiapp.eu) is left unchanged.
 */
export function shardApiUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;

    if (host === "staging-api.kikiapp.eu") {
      return url;
    }

    if (host === "api.kikiapp.eu") {
      const pathAndSearch = parsed.pathname + parsed.search;
      const bucket = hashToBucket(pathAndSearch);
      const shardHost = bucket === 0 ? "api" : `api${bucket}`;
      parsed.hostname = `${shardHost}.kikiapp.eu`;
      return parsed.toString();
    }

  } catch {
    // Invalid URL, return as-is
  }
  return url;
}
