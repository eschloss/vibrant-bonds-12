/**
 * Event API types and helpers for the get_kiki endpoint.
 */

export const EVENTS_API_BASE_URL = "https://staging-api.kikiapp.eu";

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
