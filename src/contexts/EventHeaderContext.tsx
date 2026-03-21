import React, { createContext, useContext, useCallback, useRef } from "react";
import { trackMetaPixelEvent } from "@/lib/utils";
import { getProviderName, type GetKikiEventResponse } from "@/lib/eventApi";

export type EventHeaderCtaLocation = "hero" | "sidebar" | "header" | "sticky";

export interface EventHeaderContextValue {
  eventSlug: string;
  checkoutHref: string;
  /** Fires qualified event_page_view_10secs_or_ct (if not yet fired) + event_signup_click + event_qualified_lead. */
  trackCheckoutClick: (ctaLocation: EventHeaderCtaLocation) => void;
  /** Event detail only: link back to `/events/cities/{code}` with localized label. */
  backToCityEvents?: { href: string; label: string };
}

const EventHeaderContext = createContext<EventHeaderContextValue | null>(null);

export function useEventHeader(): EventHeaderContextValue | null {
  return useContext(EventHeaderContext);
}

export function EventHeaderProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: EventHeaderContextValue;
}) {
  return (
    <EventHeaderContext.Provider value={value}>
      {children}
    </EventHeaderContext.Provider>
  );
}

/** Build trackCheckoutClick for EventCheckout and EventConfirmation (EventDetail uses its own). */
export function useEventTrackCheckoutClick(
  eventData: GetKikiEventResponse | null,
  notFound: boolean,
  checkoutHref: string
) {
  const hasTrackedQualifiedRef = useRef(false);

  return useCallback(
    (ctaLocation: EventHeaderCtaLocation) => {
      if (!eventData || notFound) return;

      if (!hasTrackedQualifiedRef.current) {
        hasTrackedQualifiedRef.current = true;
        trackMetaPixelEvent(
          "event_page_view_10secs_or_ct",
          {
            event_slug: eventData.slug,
            event_title: eventData.title,
            city: eventData.city,
            city_label: eventData.city_label,
            provider: getProviderName(eventData.provider),
            path: `/events/${eventData.slug}`,
            trigger: "checkout_click",
            cta_location: ctaLocation,
            destination: checkoutHref,
          },
          { custom: true }
        );
      }

      const signupPayload = {
        event_slug: eventData.slug,
        event_title: eventData.title,
        city: eventData.city,
        city_label: eventData.city_label,
        provider: getProviderName(eventData.provider),
        destination: checkoutHref,
        path: `/events/${eventData.slug}`,
        cta_location: ctaLocation,
      };
      trackMetaPixelEvent("event_signup_click", signupPayload, { custom: true });
      trackMetaPixelEvent(
        "event_qualified_lead",
        { ...signupPayload, lead_source: "signup_click" },
        { custom: true }
      );
    },
    [eventData, notFound, checkoutHref]
  );
}
