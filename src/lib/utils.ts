import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getProviderName, type GetKikiEventResponse } from "@/lib/eventApi"

/** Meta Pixel ID (same as index.html bootstrap) */
export const META_PIXEL_ID = "1935826830293991"

/** Re-init Meta Pixel with advanced matching params (em, fn, ln, ct). Caller should pass the full known set each time. */
export function initMetaPixelAdvancedMatching(params: {
  em?: string
  fn?: string
  ln?: string
  ct?: string
}) {
  try {
    if (typeof window === "undefined" || typeof (window as any).fbq !== "function") return
    const fbq = (window as any).fbq as (...args: any[]) => void
    const filtered = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && String(v).trim() !== "")
    ) as Record<string, string>
    if (Object.keys(filtered).length === 0) return
    fbq("init", META_PIXEL_ID, filtered)
  } catch (e) {
    // no-op
  }
}

/** Shared params for checkout events. */
export function buildCheckoutEventParams(
  eventData: GetKikiEventResponse,
  orderId?: string | null
): Record<string, string | number | undefined> {
  const providerName = getProviderName(eventData.provider)
  return {
    event_slug: eventData.slug,
    event_title: eventData.title,
    city: eventData.city,
    city_label: eventData.city_label,
    provider: providerName,
    ...(orderId ? { order_id: orderId } : {}),
    path: typeof window !== "undefined" ? window.location.pathname + window.location.search : undefined,
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple helper to read current page path for attribution
export function getCurrentPageLabel(): string {
  if (typeof window === 'undefined') return 'unknown';
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/partners')) return 'Partners';
  if (path.startsWith('/meet-pip')) return 'Meet Pip';
  if (path.startsWith('/ambassador-program')) return 'Ambassador Program';
  if (path.startsWith('/careers')) return 'Careers';
  if (path.startsWith('/cities')) return 'Cities';
  if (path.startsWith('/events')) return 'Events';
  if (path.startsWith('/communities')) return 'Communities';
  if (path.startsWith('/about')) return 'About';
  if (path.startsWith('/contact')) return 'Contact';
  return 'Home';
}

// Track redirects to Typeform (or intermediary) without altering navigation
export function trackTypeformRedirect(params: {
  href: string;
  cityName?: string;
  code?: string;
  source?: string;
  extra?: Record<string, any>;
}) {
  try {
    const payload = {
      destination: params.href,
      city: params.cityName,
      city_code: params.code,
      source: params.source || getCurrentPageLabel(),
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...(params.extra || {})
    };
    let destinationHost: string | undefined;
    let destinationPath: string | undefined;
    let isSignupClick = false;
    if (typeof window !== 'undefined' && params.href) {
      try {
        const targetUrl = new URL(params.href, window.location.origin);
        destinationHost = targetUrl.hostname;
        destinationPath = targetUrl.pathname;
        isSignupClick = targetUrl.pathname.startsWith('/signup');
      } catch {
        isSignupClick = params.href.includes('/signup');
      }
    }
    const metaPayload = {
      destination: payload.destination,
      city: payload.city,
      city_code: payload.city_code,
      source: payload.source,
      path: payload.path,
      destination_host: destinationHost,
      destination_path: destinationPath,
    };
    trackMetaPixelEvent(
      isSignupClick ? 'signup_cta_click' : 'typeform_redirect_click',
      metaPayload,
      { custom: true }
    );
    // GA4 gtag support
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      // @ts-ignore
      (window as any).gtag('event', 'typeform_redirect', payload);
    }
    // GTM dataLayer support
    // @ts-ignore
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      // @ts-ignore
      (window as any).dataLayer.push({ event: 'typeform_redirect', ...payload });
    }
  } catch (e) {
    // no-op
  }
}

// Track pre-waitlister events
export function trackPreWaitlisterEvent(eventName: 'pre_waitlist_popup_open' | 'pre_waitlist_popup_submission', params: {
  cityName?: string;
  city?: string;
  isCommunity?: boolean;
  extra?: Record<string, any>;
}) {
  try {
    const payload = {
      city: params.cityName,
      city_code: params.city,
      is_community: params.isCommunity,
      source: getCurrentPageLabel(),
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...(params.extra || {})
    };
    const sanitizedMetaPayload = {
      city: payload.city,
      city_code: payload.city_code,
      is_community: payload.is_community,
      source: payload.source,
      path: payload.path,
    };
    trackMetaPixelEvent(eventName, sanitizedMetaPayload, { custom: true });
    // GA4 gtag support
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      // @ts-ignore
      (window as any).gtag('event', eventName, payload);
    }
    // GTM dataLayer support
    // @ts-ignore
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      // @ts-ignore
      (window as any).dataLayer.push({ event: eventName, ...payload });
    }
  } catch (e) {
    // no-op
  }
}

// Track Meta Pixel events
export function trackMetaPixelEvent(
  eventName: string,
  params?: Record<string, any>,
  options?: { custom?: boolean; eventID?: string }
) {
  try {
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      // @ts-ignore
      const fbq = (window as any).fbq as (...args: any[]) => void;
      if (options?.custom) {
        fbq('trackCustom', eventName, params || {});
      } else {
        const trackParams = params || {};
        const metaOptions = options?.eventID ? { eventID: options.eventID } : undefined;
        if (metaOptions) {
          fbq('track', eventName, trackParams, metaOptions);
        } else {
          fbq('track', eventName, trackParams);
        }
      }
    }
  } catch (e) {
    // no-op
  }
}
