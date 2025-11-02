const STORAGE_KEY = 'pulse_region_cache_v1';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type RegionCache = {
  country: string;
  in_eea_uk: boolean;
  ts: number;
};

function readCache(): RegionCache | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RegionCache;
    if (!parsed || typeof parsed.ts !== 'number') return null;
    if (Date.now() - parsed.ts > ONE_DAY_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: Omit<RegionCache, 'ts'>) {
  try {
    const value: RegionCache = { ...data, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
}

export async function fetchRegion(): Promise<{ country: string; in_eea_uk: boolean }> {
  const cached = readCache();
  if (cached) return { country: cached.country, in_eea_uk: cached.in_eea_uk };

  try {
    const res = await fetch('/geo', { headers: { 'accept': 'application/json' } });
    if (!res.ok) throw new Error('geo failed');
    const json = await res.json();
    const country = typeof json?.country === 'string' ? json.country : 'XX';
    const in_eea_uk = Boolean(json?.in_eea_uk);
    writeCache({ country, in_eea_uk });
    return { country, in_eea_uk };
  } catch {
    // Failure: return sentinel
    return { country: 'XX', in_eea_uk: false };
  }
}

export async function isInEeaUk(): Promise<boolean> {
  const data = await fetchRegion();
  return data.in_eea_uk;
}



