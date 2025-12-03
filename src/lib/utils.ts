import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
  options?: { custom?: boolean }
) {
  try {
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      // @ts-ignore
      const fbq = (window as any).fbq as (...args: any[]) => void;
      if (options?.custom) {
        fbq('trackCustom', eventName, params || {});
      } else {
        fbq('track', eventName, params || {});
      }
    }
  } catch (e) {
    // no-op
  }
}
