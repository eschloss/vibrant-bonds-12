/**
 * Event API types and helpers for the get_kiki endpoint.
 */

export const EVENTS_API_BASE_URL = "https://staging-api.kikiapp.eu";

export interface GetKikiEventResponse {
  id: number;
  event_id: number | null;
  city: string;
  city_label: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  primary_image: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
  datetime_local: string;
  place: string;
  ticket_price: number;
  provider_fee: number;
  platform_fee: number;
  total_price: number;
  currency: string;
  currency_symbol: string;
  currency_symbol_is_suffix: boolean;
  currency_decimal_separator_is_comma: boolean;
  provider: string;
  duration_hours: number;
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
