/**
 * Event API types and helpers for the get_kiki endpoint.
 */

import { ensureHttpsAssetUrl } from "@/lib/imageUrl";
import { shardApiUrl } from "@/lib/urlShard";

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
  /** Very short blurb for cards; prefer over short_description when present. */
  micro_description?: string;
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
  /** List of strings describing what's included with the event ticket. */
  whats_included?: string[];
  /** Number of tickets remaining for this event. */
  tickets_remaining?: number;
  /** If set, direct bank transfer is available. Multiline text with bank details. */
  direct_bank_details?: string | null;
  /** Optional add-ons (drinks, upgrades, etc.). Shown only at checkout. */
  addons?: Array<{
    id: number;
    name: string;
    description: string;
    price: number; // major units (e.g. 5000 NGN)
    currency: string;
    max_quantity?: number;
    default_quantity?: number;
  }>;
  /** From Kiki.get_json — when true, treat booking as closed. */
  sold_out?: boolean;
  /** From Kiki.get_json — when true, event date has passed. */
  past_event?: boolean;
}

/** Response from GET /events/get_kikis */
export interface GetKikisResponse {
  code: string;
  city_label_en: string;
  city_label_es: string;
  kikis: GetKikiEventResponse[];
}

export function buildGetKikisUrl(cityCode: string, page: number): string {
  const params = new URLSearchParams({
    code: cityCode,
    page: String(page),
  });
  return shardApiUrl(`${EVENTS_API_BASE_URL}/events/get_kikis?${params.toString()}`);
}

export function buildFutureInviteSignupUrl(): string {
  return shardApiUrl(`${EVENTS_API_BASE_URL}/events/future-invite-signup/`);
}

/** City listing cards: prefer API micro blurb, else short description. */
export function getKikiListingDescription(k: GetKikiEventResponse): string {
  const micro = (k.micro_description ?? "").trim();
  if (micro) return micro;
  return (k.short_description ?? "").trim();
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
  return shardApiUrl(`${EVENTS_API_BASE_URL}/events/get_kiki?${params.toString()}`);
}

/** Title-case display from URL slug (dashes → spaces). */
export function slugToDisplayTitle(slug: string): string {
  const s = slug.trim();
  if (!s) return "";
  return s
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Colorful hero until real event images load (Unsplash abstract gradient). */
export const EVENT_DETAIL_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1614850523459-c2f4c299c58e?auto=format&fit=crop&w=1600&q=80";

const PLACEHOLDER_SHORT_EN =
  "Come solo. We'll match you into a small group before the event so you arrive already knowing people. Your group chat opens ahead of time to break the ice and plan around the event.";

/**
 * Dummy `get_kiki` shape for loading / `?loading=true` UI. Display strings may be overridden in the page with translations.
 */
export function buildPlaceholderKikiEvent(slug: string): GetKikiEventResponse {
  const title = slugToDisplayTitle(slug) || "Event";
  return {
    id: 0,
    event_id: null,
    city: "",
    city_label: "",
    slug,
    title,
    short_description: PLACEHOLDER_SHORT_EN,
    long_description:
      "<p>Full event details will appear here once they load.</p>",
    language: undefined,
    primary_image: EVENT_DETAIL_PLACEHOLDER_IMAGE,
    datetime_local: "2030-06-15T19:00:00",
    datetime_local_latest: null,
    place: "",
    ticket_price: 0,
    provider_fee: 0,
    platform_fee: 0,
    total_price: 0,
    currency: "",
    currency_symbol: "",
    currency_symbol_is_suffix: false,
    currency_decimal_separator_is_comma: false,
    provider: {
      name: "Event organizer",
      url: "",
      logo: "",
      bio: "",
    },
    duration_hours: 2,
    whats_included: [],
    tickets_remaining: undefined,
  };
}

function toLocalIsoDateTime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export type BuildKikiEventJsonLdParams = {
  event: GetKikiEventResponse;
  /** Canonical event detail page URL (absolute, https). */
  pageUrl: string;
  /** Checkout / ticket URL (absolute, https). */
  checkoutUrl: string;
  /** Plain-text description for schema (strip HTML). */
  plainDescription: string;
  /** Hero image URLs as returned by the API (normalized to https). */
  heroImageUrls: string[];
};

/**
 * schema.org Event JSON-LD for Google Event rich results (see
 * https://developers.google.com/search/docs/appearance/structured-data/event).
 */
export function buildKikiEventJsonLd(params: BuildKikiEventJsonLdParams): Record<string, unknown> {
  const { event, pageUrl, checkoutUrl, plainDescription, heroImageUrls } = params;
  const start = parseEventLocalDateTime(event.datetime_local);
  const durationHrs = Number.isFinite(event.duration_hours) ? event.duration_hours : 0;
  const end = new Date(start.getTime() + durationHrs * 3600000);
  const startDate = (event.datetime_local || "").trim() || toLocalIsoDateTime(start);
  const endDate = toLocalIsoDateTime(end);

  const images = heroImageUrls
    .map((u) => ensureHttpsAssetUrl(u))
    .filter((u): u is string => Boolean(u));
  const imageField: string | string[] =
    images.length === 0
      ? ensureHttpsAssetUrl(event.primary_image) || EVENT_DETAIL_PLACEHOLDER_IMAGE
      : images.length === 1
        ? images[0]!
        : images;

  const providerName = getProviderName(event.provider);
  const venueName = (event.place || "").trim() || event.city_label?.trim() || providerName;

  const organizer: Record<string, unknown> = {
    "@type": "Organization",
    name: providerName,
  };
  if (typeof event.provider === "object" && event.provider?.url?.trim()) {
    organizer.url = event.provider.url.trim();
  }

  const location: Record<string, unknown> = {
    "@type": "Place",
    name: venueName,
  };
  if (event.city_label?.trim()) {
    location.address = {
      "@type": "PostalAddress",
      addressLocality: event.city_label.trim(),
    };
  }

  const currency = (event.currency || "USD").trim() || "USD";
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: checkoutUrl,
    price: String(event.total_price ?? 0),
    priceCurrency: currency,
    availability: event.sold_out
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock",
  };

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: plainDescription.slice(0, 10000),
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location,
    image: imageField,
    organizer,
    offers: offer,
    url: pageUrl,
  };

  if (!event.past_event) {
    schema.eventStatus = "https://schema.org/EventScheduled";
  }

  return schema;
}


/** Build multiline event context for chat webhook (path, day, name, price, breakdown, what's included). */
export function buildEventContext(
  data: GetKikiEventResponse,
  locale = "en-US",
  pathname?: string
): string {
  const opts = getEventPriceOpts(data);
  const start = parseEventLocalDateTime(data.datetime_local);
  const dateStr = start.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = start.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
  });
  const latest = (data.datetime_local_latest || "").trim();
  const dateTimeStr = latest
    ? `${dateStr} · ${timeStr}–${parseEventLocalDateTime(latest).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}`
    : `${dateStr} · ${timeStr}`;

  const lines: string[] = [];
  const path = (pathname ?? "").trim();
  if (path) {
    lines.push(`Path: ${path}`, "");
  }
  lines.push(
    `Event: ${data.title}`,
    `Date: ${dateTimeStr}`,
    `Location: ${data.place}${data.city_label ? `, ${data.city_label}` : ""}`,
    "",
    `Price: ${formatEventPrice(data.total_price, opts)}`,
    `- Base experience: ${formatEventPrice(data.ticket_price + data.provider_fee, opts)}`,
    `- Pulse fee: ${formatEventPrice(data.platform_fee, opts)}`,
  );
  const whatsIncluded = data.whats_included ?? [];
  if (whatsIncluded.length > 0) {
    lines.push("", "What's included:");
    whatsIncluded.forEach((item) => lines.push(`- ${item}`));
  }
  return lines.join("\n");
}

/**
 * URL for listing featured/upcoming events (used on /events landing).
 * Override with VITE_EVENTS_FEATURED_PATH (e.g. "get_list") if your backend uses a different endpoint.
 */
export function buildGetFeaturedEventsUrl(limit = 9): string {
  const path =
    import.meta.env.VITE_EVENTS_FEATURED_PATH || "get_featured";
  const params = new URLSearchParams({ limit: String(limit) });
  return shardApiUrl(`${EVENTS_API_BASE_URL}/events/${path}?${params.toString()}`);
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
  addons?: Array<{
    addon_id: number;
    name: string;
    quantity: number;
    unit_amount: number; // minor units
    amount: number; // minor units
  }>;
  addons_total?: number; // minor units
  buyer_email: string | null;
  attendee_email: string | null;
  direct_bank_transfer?: boolean;
  bank_transfer_confirmation_code?: string | null;
}

export function buildKikiOrderDetailsUrl(idOrCustomerId: string): string {
  return shardApiUrl(`${EVENTS_API_BASE_URL}/payments/kiki/order/${encodeURIComponent(idOrCustomerId)}/`);
}
