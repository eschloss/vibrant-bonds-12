/**
 * Event API types and helpers for the get_kiki endpoint.
 */

/** Default true: when VITE_IS_STRIPE_TEST_MODE is not set or is "true", use staging; when "false", use production. */
const isStripeTestMode = import.meta.env.VITE_IS_STRIPE_TEST_MODE !== "false";
export const EVENTS_API_BASE_URL = isStripeTestMode
  ? "https://staging-api.kikiapp.eu"
  : "https://api.kikiapp.eu";

/** Provider details returned by get_kiki */
export interface KikiProviderDetails {
  name: string;
  url: string;
  logo: string;
  bio: string;
}

export interface GetKikiEventResponse {
  id: number;
  event_id: number | null;
  city: string;
  city_label: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  language?: string;
  primary_image: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
  datetime_local: string;
  /** If present, user's entrance time can be any time between datetime_local and this latest start time. */
  datetime_local_latest?: string | null;
  place: string;
  ticket_price: number;
  provider_fee: number;
  platform_fee: number;
  total_price: number;
  currency: string;
  currency_symbol: string;
  currency_symbol_is_suffix: boolean;
  currency_decimal_separator_is_comma: boolean;
  provider: KikiProviderDetails;
  duration_hours: number;
  provider_event_url?: string;
  /** URL for the post-purchase vibe test. */
  vibe_test_url?: string;
}

/** Extract provider display name, handling both legacy string and new object shape */
export function getProviderName(provider: KikiProviderDetails | string | null | undefined): string {
  if (!provider) return "Provider";
  if (typeof provider === "string") return provider;
  return provider.name || "Provider";
}

/**
 * Treat event datetimes from the API as already-local wall-clock times.
 * This avoids shifting the displayed time when the string includes a UTC offset.
 */
export function parseEventLocalDateTime(value: string): Date {
  const trimmed = value.trim();
  const match = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?/
  );

  if (match) {
    const [, year, month, day, hour = "0", minute = "0", second = "0", millisecond = "0"] = match;
    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
      Number(millisecond.padEnd(3, "0").slice(0, 3))
    );
  }

  return new Date(trimmed);
}

export type FormatEventPriceOpts = {
  symbol: string;
  isSuffix: boolean;
  useComma: boolean;
};

function coerceAmount(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const normalized = trimmed.replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function formatEventPrice(
  amount: unknown,
  opts: FormatEventPriceOpts
): string {
  const n = coerceAmount(amount);
  if (n === null) return "";
  if (n === 0) return "Free";
  const { symbol, isSuffix, useComma } = opts;
  const sep = useComma ? "," : ".";
  const parts = n.toFixed(2).split(".");
  const formatted = useComma
    ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + sep + parts[1]
    : parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + sep + parts[1];
  return isSuffix ? `${formatted} ${symbol}`.trim() : `${symbol}${formatted}`.trim();
}

export function getEventPriceOpts(data: GetKikiEventResponse): FormatEventPriceOpts {
  return {
    symbol: data.currency_symbol || "$",
    isSuffix: data.currency_symbol_is_suffix ?? false,
    useComma: data.currency_decimal_separator_is_comma ?? false,
  };
}

export function buildGetKikiUrl(eventSlug: string): string {
  const params = new URLSearchParams({ slug: eventSlug });
  return `${EVENTS_API_BASE_URL}/events/get_kiki?${params.toString()}`;
}

/**
 * URL for listing featured/upcoming events (used on /events landing).
 * Override with VITE_EVENTS_FEATURED_PATH (e.g. "get_list") if your backend uses a different endpoint.
 */
export function buildGetFeaturedEventsUrl(limit = 9): string {
  const path =
    import.meta.env.VITE_EVENTS_FEATURED_PATH || "get_featured";
  const params = new URLSearchParams({ limit: String(limit) });
  return `${EVENTS_API_BASE_URL}/events/${path}?${params.toString()}`;
}

/** Map API response to the Event shape used by Events landing/cards. */
export function kikiEventToDisplayEvent(k: GetKikiEventResponse): {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  primaryImage: string;
  dateTime: string;
  citySlug: string;
  price: string;
} {
  const citySlug = (k.city || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "unknown";
  return {
    id: String(k.id ?? k.slug ?? k.event_id ?? Math.random().toString(36).slice(2)),
    title: k.title ?? "",
    slug: k.slug ?? "",
    shortDescription: k.short_description ?? "",
    primaryImage: k.primary_image ?? "",
    dateTime: k.datetime_local ?? "",
    citySlug,
    price: formatEventPrice(k.total_price, getEventPriceOpts(k)),
  };
}

/** Kiki Ticket Order Details API response */
export interface KikiOrderDetailsResponse {
  status: string;
  customer_id: string;
  currency: string;
  amount_total: number; // minor units (cents)
  ticket_total: number;
  provider_total: number;
  pulse_total: number;
  buyer_email: string | null;
  attendee_email: string | null;
}

export function buildKikiOrderDetailsUrl(idOrCustomerId: string): string {
  return `${EVENTS_API_BASE_URL}/payments/kiki/order/${encodeURIComponent(idOrCustomerId)}/`;
}
