/**
 * Normalizes asset URLs from APIs that omit the scheme (e.g. `s.kikiapp.eu/city/foo.jpg`).
 * Without a scheme, browsers resolve those as relative to the current page path.
 */
export function ensureHttpsAssetUrl(value: string | undefined | null): string | undefined {
  if (value == null) return undefined;
  const s = String(value).trim();
  if (!s) return undefined;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("//")) return `https:${s}`;
  if (s.startsWith("/")) return s;
  return `https://${s}`;
}
