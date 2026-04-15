import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  UtensilsCrossed,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Ticket,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useRefParam } from "@/hooks/useRefParam";
import { Seo } from "@/hooks/useSeo";
import NotFound from "@/pages/NotFound";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EventFaqSection from "@/components/EventFaqSection";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import EventProviderSection from "@/components/EventProviderSection";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  type GetKikiEventResponse,
  buildEventContext,
  buildGetKikiUrl,
  buildKikiEventJsonLd,
  buildPlaceholderKikiEvent,
  EVENT_DETAIL_PLACEHOLDER_IMAGE,
  formatEventPrice,
  getEventPriceOpts,
  getProviderName,
  isMicroMatchesEvent,
  parseEventLocalDateTime,
  slugToDisplayTitle,
} from "@/lib/eventApi";
import { buildEventSeoDescriptions, buildEventSeoKeywords } from "@/lib/eventSeoMeta";
import {
  buildEventChatQuickQuestions,
  buildEventFaqParamsFromEventData,
} from "@/lib/eventChatQuickQuestions";
import { getPrefetchJsonPromise } from "@/lib/apiPrefetchBridge";
import { ensureHttpsAssetUrl, upsertLcpImagePreload } from "@/lib/imageUrl";
import { trackMetaPixelEvent } from "@/lib/utils";
import {
  type EventHeaderCtaLocation,
  EventHeaderProvider,
} from "@/contexts/EventHeaderContext";
import { useChatContext } from "@/contexts/ChatContext";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";
import EventStickyCta from "@/components/EventStickyCta";
import GetFutureInvitesModal from "@/components/GetFutureInvitesModal";
import { useIsLg } from "@/hooks/use-mobile";

type SignUpCardProps = {
  t: (key: string, fallback?: string) => string;
  checkoutHref: string;
  trackCheckoutClick: (location: EventHeaderCtaLocation) => void;
  onSeeWhatsIncludedClick?: () => void;
  onOpenFutureInvites?: () => void;
  formattedTotalPrice: string;
  formattedBaseExperiencePrice: string;
  formattedPulseFee: string;
  whatsIncluded?: string[];
  ticketsRemaining: number;
  showPricing?: boolean;
  showSpotsRemaining?: boolean;
  checkoutDisabled?: boolean;
  checkoutDisabledLabel?: string;
  microMatches?: boolean;
};

const SignUpCard = ({
  t,
  checkoutHref,
  trackCheckoutClick,
  onSeeWhatsIncludedClick,
  onOpenFutureInvites,
  formattedTotalPrice,
  formattedBaseExperiencePrice,
  formattedPulseFee,
  whatsIncluded = [],
  ticketsRemaining,
  showPricing = true,
  showSpotsRemaining = true,
  checkoutDisabled = false,
  checkoutDisabledLabel = "",
  microMatches = true,
}: SignUpCardProps) => {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">{t("event_detail.sign_up", "Sign up")}</h3>

        {/* 1. Value props */}
        <div className="space-y-2.5 text-sm text-gray-300 mb-3">
          <div className="flex items-start gap-2">
            <Users size={15} className="text-[#38D1BF] shrink-0 mt-0.5" />
            <div>
              <div>
                {t(
                  microMatches ? "event_detail.matched_solo" : "event_detail.matched_solo_single_group",
                  microMatches
                    ? "Matched with solo attendees making friends"
                    : "Meet other solo attendees in one group chat"
                )}
              </div>
              <div className="text-xs text-white/55 mt-0.5">
                {t(
                  microMatches ? "event_detail.group_size" : "event_detail.group_size_single_group",
                  microMatches ? "Small groups of 4–6 people" : "One attendee group chat for this event"
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare size={15} className="text-purple-300 shrink-0 mt-0.5" />
            <span>{t("event_detail.hosted_chat", "Hosted group chat with icebreaking")}</span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={15} className="text-amber-300 shrink-0 mt-0.5" />
            <span>{t("event_detail.optional_meetup", "Optional pre or post-event meetup")}</span>
          </div>
        </div>

        {/* 2. Price block */}
        {showPricing ? (
          <span className="inline-flex items-baseline gap-1.5 leading-tight">
            <span className="text-sm font-medium text-white/65">
              {t("event_detail.price_from", "From")}
            </span>
            <span className="text-2xl font-bold text-white tabular-nums tracking-wide">
              {formattedTotalPrice.replace(/[,.]00$/, "")}
            </span>
          </span>
        ) : null}

        {/* 3. Conversion area — breathing room: 16-20px price→scarcity, 12-16px scarcity→CTA */}
        <div className={cn("space-y-4", showPricing ? "mt-5" : "mt-0")}>
          {showSpotsRemaining ? (
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
              <Ticket size={16} className="shrink-0 mt-0.5" aria-hidden />
              <span>
                {t("event_detail.sticky.tickets_remaining", "Only {n} tickets left").replace("{n}", String(ticketsRemaining))}
              </span>
            </div>
          ) : null}
          <div className="space-y-2">
            {checkoutDisabled ? (
              <span
                role="status"
                className="w-full justify-center inline-flex items-center gap-2 bg-white/10 text-white/55 px-6 py-4 rounded-full font-semibold text-lg cursor-not-allowed border border-white/10"
              >
                {checkoutDisabledLabel || t("event_detail.cta.unavailable", "Unavailable")}
              </span>
            ) : (
            <Link
              to={checkoutHref}
              onClick={() => trackCheckoutClick("sidebar")}
              className="w-full justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-4 rounded-full font-semibold text-lg shadow-md shadow-purple-500/15 transition-all duration-300"
            >
              {t("event_detail.buy_my_ticket", "Buy my ticket")}
            </Link>
            )}
            {onOpenFutureInvites && (
              <button
                type="button"
                onClick={onOpenFutureInvites}
                className="block w-full text-left text-sm text-gray-400 hover:text-[#38D1BF] transition-colors py-0.5 mt-1"
              >
                {t("event_detail.cant_attend_link", "Can't make it? Get future invites →")}
              </button>
            )}
          </div>
        </div>

        {/* 4. Secondary info zone — subtle divider, 16-20px from CTA */}
        {showPricing ? (
        <div className="mt-5 pt-3 border-t border-white/10">
          <Collapsible open={breakdownOpen} onOpenChange={setBreakdownOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                onClick={() => onSeeWhatsIncludedClick?.()}
                className="flex w-full items-center justify-between gap-2 text-xs text-white/40 hover:text-white/55 transition-colors py-1"
              >
              <span>{t("event_detail.see_whats_included", "See what's included")}</span>
              {breakdownOpen ? (
                <ChevronUp size={14} className="shrink-0" />
              ) : (
                <ChevronDown size={14} className="shrink-0" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-xs text-white/70 pt-1 space-y-0 mt-3">
              {/* Base experience */}
              <div className="space-y-0.5 mb-4">
                <div className="flex items-center justify-between font-medium text-white/85">
                  <span>{t("event_detail.base_experience", "Base experience")}</span>
                  <span className="tabular-nums">{formattedBaseExperiencePrice}</span>
                </div>
                {whatsIncluded.length > 0 && (
                  <ul className="list-disc list-inside pl-4 space-y-0.5 text-white/50 text-[11px]">
                    {whatsIncluded.map((item, i) => (
                      <li key={i} className="leading-snug">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Pulse fee */}
              <div className="flex items-center justify-between font-medium text-white/85 mb-1">
                <span>{t("event_detail.pulse_fee", "Pulse fee")}</span>
                <span className="tabular-nums">{formattedPulseFee}</span>
              </div>
              {/* Total */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>{t("event_detail.total", "Total")}</span>
                  <span className="tabular-nums">{formattedTotalPrice}</span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-white/45">
                {t("event_detail.addons_at_checkout", "Add-ons available at checkout")}
              </p>
            </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

/**
 * Hero group-chat — mount only: slow float into place (larger, up-left → rest).
 * After `groupChatIntroDone`, hover uses plain tweens (`GROUP_CHAT_PREVIEW_HOVER_TWEEN`).
 */
const GROUP_CHAT_PREVIEW_INTRO_FLOAT = {
  duration: 3.15,
  /** Opacity reaches 1 earlier so the float reads clearly while still feeling soft. */
  fadeDuration: 0.82,
  /** Slow start (y1=0), near-linear mid, soft landing — Apple-like standard curve, not mechanical. */
  ease: [0.4, 0.0, 0.2, 1] as const,
  initial: { scale: 1.07, y: -32, x: -26, opacity: 0 } as const,
  rest: { scale: 1, y: -8, x: 0, opacity: 1 } as const,
};

const GROUP_CHAT_PREVIEW_HOVER_TWEEN = {
  duration: 0.28,
  ease: [0.33, 0, 0.2, 1] as const,
};

const EventDetail = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { changeLanguage } = useLanguage();
  const { t, currentLanguage } = useTranslation();
  const { addRefToUrl } = useRefParam();
  const locale = currentLanguage === "es" ? "es" : "en-US";

  const formatDateTimeWindowLong = (
    startIso: string,
    latestIso?: string | null
  ): { text: string; hasWindow: boolean } => {
    const start = parseEventLocalDateTime(startIso);
    const date = start.toLocaleDateString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const startTime = start.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });
    const latest = (latestIso || "").trim();
    if (!latest) return { text: `${date} · ${startTime}`, hasWindow: false };
    const latestTime = parseEventLocalDateTime(latest).toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
    });
    return { text: `${date} · ${startTime}–${latestTime}`, hasWindow: true };
  };

  const formatDuration = (hours: number): string => {
    if (hours === 1) return t("event_detail.duration.hour", "1 hour");
    return t("event_detail.duration.hours", "{n} hours").replace("{n}", String(hours));
  };

  const sanitizeHtml = (html: string): string =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+=(["']).*?\1/gi, "")
      .replace(/\son\w+=([^\s>]+)/gi, "")
      .replace(/(href|src)=(["'])javascript:[\s\S]*?\2/gi, '$1="#"');

  const stripHtml = (html: string): string =>
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const [eventData, setEventData] = useState<GetKikiEventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [heroCarouselApi, setHeroCarouselApi] = useState<CarouselApi | undefined>(undefined);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [entranceTimeTooltipOpen, setEntranceTimeTooltipOpen] = useState(false);
  const [addressTooltipOpen, setAddressTooltipOpen] = useState(false);
  const [futureInvitesOpen, setFutureInvitesOpen] = useState(false);
  const [groupChatIntroDone, setGroupChatIntroDone] = useState(false);
  const groupChatIntroCompleteRef = useRef(false);
  const [lastEventSlugForIntro, setLastEventSlugForIntro] = useState(eventSlug);
  const hasTrackedQualifiedEventPageView = useRef(false);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const whatHappensRef = useRef<HTMLDivElement>(null);
  const signUpAsideRef = useRef<HTMLElement>(null);
  const isLg = useIsLg();
  const prefersReducedMotion = useReducedMotion();
  if (eventSlug !== lastEventSlugForIntro) {
    setLastEventSlugForIntro(eventSlug);
    setGroupChatIntroDone(false);
    groupChatIntroCompleteRef.current = false;
  }
  useEffect(() => {
    if (prefersReducedMotion) setGroupChatIntroDone(true);
  }, [prefersReducedMotion]);
  const scrollContainer = useScrollContainer();
  const { pathname, search } = useLocation();
  const { setChatContext } = useChatContext();

  const forceLoading = useMemo(
    () => new URLSearchParams(search).get("loading") === "true",
    [search]
  );
  const usePlaceholderUI = useMemo(
    () =>
      Boolean(eventSlug) &&
      !notFound &&
      ((loading && !eventData) || (Boolean(forceLoading) && !!eventData)),
    [eventSlug, notFound, loading, eventData, forceLoading]
  );
  const showOverlay = loading || forceLoading;

  const groupChatOverlayImageUrl =
    "https://s.kikiapp.eu/img/Group+Chinchillas.webp";
  /** Stacked drop-shadows follow PNG alpha — reads as floating off the page. */
  const groupChatPreviewImageFilterClass =
    "[filter:drop-shadow(0_28px_56px_rgba(0,0,0,0.62))_drop-shadow(0_14px_32px_rgba(0,0,0,0.48))_drop-shadow(0_6px_16px_rgba(0,0,0,0.42))_drop-shadow(0_1px_4px_rgba(0,0,0,0.75))]";

  const [groupChatImageReady, setGroupChatImageReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setGroupChatImageReady(true);
    };
    img.onerror = () => {
      if (!cancelled) setGroupChatImageReady(true);
    };
    img.src = groupChatOverlayImageUrl;
    return () => {
      cancelled = true;
    };
  }, [groupChatOverlayImageUrl]);

  // Preload Stripe.js after event content loads so checkout is fast; defers until after event data + images
  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;
    const stripePk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (stripePk) {
      void loadStripe(
        stripePk,
        import.meta.env.DEV ? ({ advancedFraudSignals: false } as any) : undefined
      );
    }
  }, [eventData, notFound, usePlaceholderUI]);

  /** Keeps <link rel=preload> in sync on SPA navigations; kiki-api-prefetch.js sets it earlier on full page loads. Does not satisfy Lighthouse "initial HTML" without SSR/edge. */
  useEffect(() => {
    if (!eventSlug || notFound) return;
    if (usePlaceholderUI && eventSlug) {
      const ph = buildPlaceholderKikiEvent(eventSlug);
      const imgs = [ph.primary_image, ph.image_2, ph.image_3, ph.image_4, ph.image_5].filter(Boolean) as string[];
      const list = imgs.length > 0 ? imgs : [ph.primary_image];
      upsertLcpImagePreload(list[0]);
      return;
    }
    if (!eventData) return;
    const imgs = [
      eventData.primary_image,
      eventData.image_2,
      eventData.image_3,
      eventData.image_4,
      eventData.image_5,
    ].filter(Boolean) as string[];
    const list = imgs.length > 0 ? imgs : [eventData.primary_image];
    upsertLcpImagePreload(list[0]);
  }, [eventSlug, notFound, usePlaceholderUI, eventData]);

  useEffect(() => {
    if (!heroCarouselApi) return;
    const onSelect = () => setHeroSlideIndex(heroCarouselApi.selectedScrollSnap());
    onSelect();
    heroCarouselApi.on("select", onSelect);
    heroCarouselApi.on("reInit", onSelect);
    return () => {
      heroCarouselApi.off("select", onSelect);
      heroCarouselApi.off("reInit", onSelect);
    };
  }, [heroCarouselApi]);

  useEffect(() => {
    if (!eventSlug) {
      setNotFound(true);
      setLoading(false);
      setEventData(null);
      return;
    }

    setEventData(null);
    setNotFound(false);
    setLoading(true);

    const controller = new AbortController();
    const url = buildGetKikiUrl(eventSlug);
    let cancelled = false;

    const run = async () => {
      const prefetchP = getPrefetchJsonPromise(url);
      if (prefetchP) {
        try {
          const data = (await prefetchP) as GetKikiEventResponse;
          if (cancelled) return;
          setEventData(data);
          if (data.language) changeLanguage(data.language);
          setLoading(false);
          return;
        } catch {
          /* fall through to fetch */
        }
      }
      if (cancelled) return;

      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: { accept: "application/json" },
        });
        if (cancelled) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const json = (await res.json()) as GetKikiEventResponse;
        if (cancelled) return;
        setEventData(json);
        if (json.language) changeLanguage(json.language);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError" && !cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [eventSlug, changeLanguage]);

  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;
    const faqParams = buildEventFaqParamsFromEventData(
      eventData,
      locale,
      t("event_detail.starts_between", "Starts between")
    );
    const quickQs = buildEventChatQuickQuestions(t, faqParams);
    setChatContext(buildEventContext(eventData, locale, pathname), eventData.title, quickQs);
    return () => setChatContext(null);
  }, [eventData, notFound, usePlaceholderUI, locale, pathname, setChatContext, t]);

  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;
    trackMetaPixelEvent(
      "event_page_view",
      {
        event_slug: eventData.slug,
        event_title: eventData.title,
        city: eventData.city,
        city_label: eventData.city_label,
        provider: eventData.provider,
        path: `/events/${eventData.slug}`,
      },
      { custom: true }
    );
  }, [eventData, notFound, usePlaceholderUI]);

  const trackQualifiedEventPageView = useCallback(
    (
      trigger: "10_seconds" | "checkout_click" | "see_whats_included",
      extraParams?: Record<string, string>
    ) => {
      if (!eventData || notFound || usePlaceholderUI || hasTrackedQualifiedEventPageView.current) return;
      hasTrackedQualifiedEventPageView.current = true;

      trackMetaPixelEvent(
        "event_page_view_10secs_or_ct",
        {
          event_slug: eventData.slug,
          event_title: eventData.title,
          city: eventData.city,
          city_label: eventData.city_label,
          provider: eventData.provider,
          path: `/events/${eventData.slug}`,
          trigger,
          ...(extraParams || {}),
        },
        { custom: true }
      );
    },
    [eventData, notFound, usePlaceholderUI]
  );

  useEffect(() => {
    hasTrackedQualifiedEventPageView.current = false;
  }, [eventData?.slug]);

  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;

    const timeoutId = window.setTimeout(() => {
      trackQualifiedEventPageView("10_seconds");
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [eventData, notFound, usePlaceholderUI, trackQualifiedEventPageView]);

  const minDelayElapsedRef = useRef(false);
  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;
    const id = setTimeout(() => {
      minDelayElapsedRef.current = true;
    }, 3000);
    return () => clearTimeout(id);
  }, [eventData, notFound, usePlaceholderUI]);

  useEffect(() => {
    if (!eventData || notFound || usePlaceholderUI) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const STICKY_SCROLL_THRESHOLD = 80;

    const setup = () => {
      if (cancelled) return;
      const el = scrollContainer?.current;
      if (!el) {
        setTimeout(setup, 50);
        return;
      }

      let raf = 0;
      const updateSticky = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const scrolled = el.scrollTop > STICKY_SCROLL_THRESHOLD;
          setShowSticky(scrolled && minDelayElapsedRef.current);
        });
      };

      updateSticky();
      el.addEventListener("scroll", updateSticky, { passive: true });
      const intervalId = setInterval(updateSticky, 500);
      cleanup = () => {
        cancelAnimationFrame(raf);
        el.removeEventListener("scroll", updateSticky);
        clearInterval(intervalId);
      };
    };

    const timeoutId = setTimeout(setup, 0);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      cleanup?.();
    };
  }, [eventData, notFound, usePlaceholderUI, scrollContainer]);

  const seoProps = useMemo(() => {
    if (!eventSlug || notFound) return null;
    if (eventData) {
      const cityLabel = eventData.city_label || "";
      const providerName = getProviderName(eventData.provider);
      return {
        title: {
          en: `${eventData.title} | ${cityLabel} Events | Pulse`,
          es: `${eventData.title} | Eventos en ${cityLabel} | Pulse`,
        },
        description: buildEventSeoDescriptions(eventData.short_description, {
          groupMode: isMicroMatchesEvent(eventData) ? "micro" : "single_group",
        }),
        keywords: buildEventSeoKeywords({
          title: eventData.title,
          cityLabel,
          providerName,
        }),
        type: "website" as const,
        image: eventData.primary_image,
      };
    }
    const slugTitle = slugToDisplayTitle(eventSlug);
    return {
      title: {
        en: `${slugTitle} | Events | Pulse`,
        es: `${slugTitle} | Eventos | Pulse`,
      },
      description: {
        en:
          "Meet people before the event. Pulse matches you into a small group of solo attendees so you arrive with friends. Full details and tickets load in a moment.",
        es:
          "Conoce gente antes del evento. Pulse te empareja en un grupo pequeño de asistentes que van solos para que llegues con amigos. Los detalles y entradas cargan en un momento.",
      },
      keywords: [slugTitle, "event", "Pulse events", "meet friends"],
      type: "website" as const,
      image: EVENT_DETAIL_PLACEHOLDER_IMAGE,
    };
  }, [eventData, eventSlug, notFound]);

  if (!eventSlug) {
    return <NotFound />;
  }

  if (notFound && !loading) {
    return <NotFound />;
  }

  if (!usePlaceholderUI && !eventData) {
    return <NotFound />;
  }

  if (!seoProps) {
    return <NotFound />;
  }

  const data = usePlaceholderUI && eventSlug ? buildPlaceholderKikiEvent(eventSlug) : eventData!;
  const microMatches = isMicroMatchesEvent(data);
  const priceOpts = getEventPriceOpts(data);

  const formattedCityName = usePlaceholderUI
    ? t("event_detail.placeholder_city", "Your city")
    : data.city_label || "";
  const providerName = getProviderName(data.provider);
  const organiser = usePlaceholderUI
    ? t("event_detail.placeholder_organiser", "Event organizer")
    : providerName || data.place;

  const formattedTotalPrice = formatEventPrice(data.total_price, priceOpts);
  const baseExperienceAmount = data.ticket_price + data.provider_fee;
  const formattedBaseExperiencePrice = formatEventPrice(baseExperienceAmount, priceOpts);
  const formattedPulseFee = formatEventPrice(data.platform_fee, priceOpts);

  const introLine = t(
    microMatches ? "event_detail.intro_line_micro" : "event_detail.intro_line_single_group",
    microMatches
      ? "⭐ {title} is a public event in {city}. Pulse isn't the organiser. We help you go with a small group of other solo attendees, so you can meet new friends before you arrive."
      : "⭐ {title} is a public event in {city}. Pulse isn't the organiser. We connect you with other solo attendees going to this event, then add you to a group chat so you can say hello before you arrive."
  )
    .replace("{title}", data.title)
    .replace("{city}", formattedCityName);

  const heroImages = [
    data.primary_image,
    data.image_2,
    data.image_3,
    data.image_4,
    data.image_5,
  ].filter(Boolean) as string[];

  const displayHeroImages = heroImages.length > 0 ? heroImages : [data.primary_image];

  const checkoutHref = `/events/${data.slug}/checkout`;

  const checkoutDisabled =
    !usePlaceholderUI &&
    !!eventData &&
    (Boolean(eventData.past_event) || Boolean(eventData.sold_out));
  const checkoutDisabledLabel =
    !usePlaceholderUI && eventData?.past_event
      ? t("event_detail.cta.past_event", "This event has already happened")
      : !usePlaceholderUI && eventData?.sold_out
        ? t("event_detail.cta.sold_out", "Sold out")
        : "";

  const futureInvitesParams = {
    event_slug: data.slug,
    event_title: data.title,
    city: data.city,
    city_label: data.city_label,
    provider: providerName,
    path: `/events/${data.slug}`,
  };
  const handleOpenFutureInvites = () => {
    if (usePlaceholderUI) return;
    trackMetaPixelEvent("event_future_invites_modal_click", futureInvitesParams, { custom: true });
    trackMetaPixelEvent(
      "event_qualified_lead",
      { ...futureInvitesParams, lead_source: "future_invites_modal" },
      { custom: true }
    );
    setFutureInvitesOpen(true);
  };
  const trackCheckoutClick = (ctaLocation: EventHeaderCtaLocation) => {
    if (usePlaceholderUI || checkoutDisabled) return;
    trackQualifiedEventPageView("checkout_click", {
      cta_location: ctaLocation,
      destination: checkoutHref,
    });

    const signupPayload = {
      event_slug: data.slug,
      event_title: data.title,
      city: data.city,
      city_label: data.city_label,
      provider: data.provider,
      destination: checkoutHref,
      path: `/events/${data.slug}`,
      cta_location: ctaLocation,
    };
    trackMetaPixelEvent("event_signup_click", signupPayload, { custom: true });
    trackMetaPixelEvent(
      "event_qualified_lead",
      { ...signupPayload, lead_source: "signup_click" },
      { custom: true }
    );
  };

  const eventJsonLd = useMemo(() => {
    if (!eventData || usePlaceholderUI) return null;
    return buildKikiEventJsonLd({
      event: eventData,
      pageUrl: `${window.location.origin}${pathname}`,
      checkoutUrl: `${window.location.origin}${checkoutHref}`,
      plainDescription: `${introLine}\n\n${stripHtml(eventData.long_description)}`,
      heroImageUrls: heroImages,
    });
  }, [eventData, usePlaceholderUI, pathname, checkoutHref, introLine, heroImages]);

  const durationText = formatDuration(data.duration_hours);
  const dateTime = usePlaceholderUI
    ? {
        text: t("event_detail.placeholder_datetime", "Date & time to be confirmed"),
        hasWindow: false,
      }
    : formatDateTimeWindowLong(data.datetime_local, data.datetime_local_latest);
  const placeLabel = usePlaceholderUI
    ? t("event_detail.placeholder_place", "Venue to be announced")
    : data.place;
  const entranceTimeTooltip = t(
    microMatches ? "event_detail.entrance_time_tooltip" : "event_detail.entrance_time_tooltip_single_group",
    microMatches
      ? "Your entrance time depends on the group we match you into — it can be any time in this range. This helps your match group meet each other (instead of mixing with everyone at once)."
      : "Your entrance time can fall anywhere in this window so Pulse attendees can coordinate in the group chat without everyone arriving at exactly the same moment."
  );


  const eventHeaderValue = {
    eventSlug: data.slug,
    checkoutHref,
    trackCheckoutClick,
    backToCityEvents:
      !usePlaceholderUI && data.city
        ? {
            href: `/events/cities/${encodeURIComponent(data.city)}`,
            label: (data.city_label || formattedCityName || data.city).trim(),
          }
        : undefined,
  };

  const shortDescriptionText = usePlaceholderUI
    ? t(
        microMatches ? "event_detail.placeholder_short" : "event_detail.placeholder_short_single_group",
        microMatches
          ? "Come solo. We'll match you into a small group before the event so you arrive already knowing people. Your group chat opens ahead of time to break the ice and plan around the event."
          : "Come solo. We connect you with other solo attendees, then add you to the group chat so you arrive already knowing people. Your chat opens ahead of time to break the ice and plan around the event."
      )
    : data.short_description;
  const longDescriptionHtml = usePlaceholderUI
    ? t("event_detail.placeholder_about_html", "<p>Full event details will appear here once they load.</p>")
    : data.long_description;

  return (
    <EventHeaderProvider value={eventHeaderValue}>
    <div className="flex flex-col min-h-screen dark">
      <PageLoadingOverlay show={showOverlay} />
      <Seo {...seoProps} additionalJsonLd={eventJsonLd ? [eventJsonLd] : undefined} />
      <Navbar />

      <main className={cn("flex-grow", "pb-20 lg:pb-0")}>
        {/* Hero (match /cities visual language) */}
        <section className="relative pt-[4.75rem] lg:pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {eventHeaderValue.backToCityEvents ? (
                <Link
                  to={addRefToUrl(eventHeaderValue.backToCityEvents.href)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-[#FF2688] transition-colors mb-4"
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
                  {t("navbar.see_all_city_events", "See all {city} events").replace(
                    "{city}",
                    eventHeaderValue.backToCityEvents.label
                  )}
                </Link>
              ) : null}
              <div className="mb-8">
                <div className="relative h-64 md:h-96 xl:h-[34rem] 2xl:h-[38rem] rounded-2xl overflow-visible border border-gray-700 bg-black/20">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Carousel setApi={setHeroCarouselApi} opts={{ loop: true }} className="h-full">
                      <CarouselContent className="ml-0 h-full">
                        {displayHeroImages.map((img, i) => {
                          const src = ensureHttpsAssetUrl(img) ?? img;
                          return (
                          <CarouselItem key={img + i} className="pl-0 h-full">
                            <img
                              src={src}
                              alt={`${data.title} — photo ${i + 1}`}
                              className="w-full h-full object-cover"
                              width={1920}
                              height={1080}
                              loading={i === 0 ? "eager" : "lazy"}
                              fetchpriority={i === 0 ? "high" : "low"}
                              decoding="async"
                            />
                          </CarouselItem>
                          );
                        })}
                      </CarouselContent>

                      {displayHeroImages.length > 1 ? (
                        <>
                          <CarouselPrevious
                            variant="secondary"
                            className="z-30 left-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex"
                          />
                          <CarouselNext
                            variant="secondary"
                            className="z-30 right-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex"
                          />
                        </>
                      ) : null}
                    </Carousel>
                  </div>

                  {/* Dots */}
                  {displayHeroImages.length > 1 ? (
                    <div className="absolute z-30 bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2">
                      {displayHeroImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                            aria-label={t("event_detail.go_to_image", "Go to image {n}").replace("{n}", String(i + 1))}
                          onClick={() => heroCarouselApi?.scrollTo(i)}
                          className={[
                            "h-2 w-2 rounded-full transition-all",
                            i === heroSlideIndex ? "bg-white w-5" : "bg-white/45 hover:bg-white/70",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  ) : null}

                  {/* Group chat preview — mount only after asset decode; dialog shadow uses Safari-safe wrapper */}
                  <div className="absolute z-20 -right-4 -bottom-4 md:-right-6 md:-bottom-6 xl:-right-8 xl:-bottom-8 h-[90%] aspect-[9/16]">
                    {!groupChatImageReady ? (
                      <div className="h-full w-full" aria-hidden />
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="group flex h-full w-full cursor-pointer select-none border-0 bg-transparent p-0"
                            aria-label={t("event_detail.view_group_chat_preview", "View group chat preview")}
                          >
                            <motion.img
                              key={eventSlug}
                              src={groupChatOverlayImageUrl}
                              alt={`${data.title} — group chat preview`}
                              className={cn(
                                "w-full h-full object-contain origin-bottom will-change-transform",
                                groupChatPreviewImageFilterClass
                              )}
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : GROUP_CHAT_PREVIEW_INTRO_FLOAT.initial
                              }
                              animate={GROUP_CHAT_PREVIEW_INTRO_FLOAT.rest}
                              transition={
                                prefersReducedMotion
                                  ? { duration: 0 }
                                  : groupChatIntroDone
                                    ? {
                                        duration: GROUP_CHAT_PREVIEW_HOVER_TWEEN.duration,
                                        ease: GROUP_CHAT_PREVIEW_HOVER_TWEEN.ease,
                                      }
                                    : {
                                        duration: GROUP_CHAT_PREVIEW_INTRO_FLOAT.duration,
                                        ease: GROUP_CHAT_PREVIEW_INTRO_FLOAT.ease,
                                        opacity: {
                                          duration: GROUP_CHAT_PREVIEW_INTRO_FLOAT.fadeDuration,
                                          ease: GROUP_CHAT_PREVIEW_INTRO_FLOAT.ease,
                                        },
                                      }
                              }
                              onAnimationComplete={() => {
                                if (prefersReducedMotion || groupChatIntroCompleteRef.current) return;
                                groupChatIntroCompleteRef.current = true;
                                setGroupChatIntroDone(true);
                              }}
                              whileHover={
                                prefersReducedMotion || !groupChatIntroDone
                                  ? undefined
                                  : {
                                      scale: 1.045,
                                      y: -16,
                                      x: 0,
                                      opacity: 1,
                                      transition: {
                                        duration: GROUP_CHAT_PREVIEW_HOVER_TWEEN.duration,
                                        ease: GROUP_CHAT_PREVIEW_HOVER_TWEEN.ease,
                                      },
                                    }
                              }
                              width={360}
                              height={640}
                              loading="eager"
                              decoding="async"
                              draggable={false}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:hover:text-white/80">
                          <div className="group-chat-dialog-float -translate-y-1 rounded-2xl">
                            <img
                              src={groupChatOverlayImageUrl}
                              alt={`${data.title} — group chat preview`}
                              className="relative block w-full rounded-2xl"
                              width={360}
                              height={640}
                              loading="eager"
                              decoding="async"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>

                  <div className="absolute z-10 inset-0 rounded-2xl bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Meta (compact, single-line friendly) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-gray-300 mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} className="shrink-0 text-gray-400" />
                  <span>{dateTime.text}</span>
                  {dateTime.hasWindow ? (
                    <TooltipProvider delayDuration={isLg ? 100 : 999999}>
                      <Tooltip open={entranceTimeTooltipOpen} onOpenChange={setEntranceTimeTooltipOpen}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setEntranceTimeTooltipOpen((prev) => !prev)}
                            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/20 text-[10px] font-semibold text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                            aria-label={t("event_detail.entrance_time_help", "Entrance time info")}
                          >
                            ?
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[260px] text-xs leading-relaxed border-white/15 bg-[#131B2E] text-white/90">
                          {entranceTimeTooltip}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </span>
                <span className="flex items-center gap-1.5 min-w-0 max-w-[180px] sm:max-w-[220px] lg:max-w-md xl:max-w-lg">
                  <MapPin size={15} className="shrink-0 text-gray-400" />
                  {isLg ? (
                    <span className="break-words">{placeLabel}</span>
                  ) : (
                    <TooltipProvider delayDuration={999999}>
                      <Tooltip open={addressTooltipOpen} onOpenChange={setAddressTooltipOpen}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setAddressTooltipOpen((prev) => !prev)}
                            className="text-left truncate min-w-0 w-full bg-transparent border-0 p-0 font-inherit text-inherit text-gray-300 hover:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                            aria-label={placeLabel}
                          >
                            {placeLabel}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-[min(320px,90vw)] text-sm">
                          {placeLabel}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <Clock size={15} className="shrink-0 text-gray-400" />
                  {durationText}
                </span>
                {formattedCityName || usePlaceholderUI ? (
                  <span className="flex items-center gap-1.5 shrink-0">
                    <Globe size={15} className="shrink-0 text-gray-400" />
                    {formattedCityName}
                  </span>
                ) : null}
              </div>

              <h1 className="mb-2 text-white leading-tight">
                <span className="block text-2xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                    {t("event_detail.meet_new_friends_at", "Meet New Friends at")}
                  </span>
                </span>
                <span className="block text-4xl md:text-6xl font-extrabold text-white">{data.title}</span>
              </h1>
              <p className="mt-3 text-lg md:text-xl text-gray-200 mb-3 md:mb-4 whitespace-pre-line leading-[1.52]">
                {t(
                  microMatches ? "event_detail.pulse_matches" : "event_detail.pulse_matches_single_group",
                  microMatches
                    ? "Show up with friends.\nGet matched into a small group before the event."
                    : "Show up with friends.\nMeet other solo attendees going to the same event, then break the ice in a group chat beforehand."
                )}
              </p>

              {/* Prominent CTA (directly below subheadline, above the fold) */}
              <div
                ref={heroCtaRef}
                className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-4 mb-5 md:mb-6"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-1.5">
                    {checkoutDisabled ? (
                      <span
                        role="status"
                        className="w-full sm:w-auto min-w-[200px] sm:min-w-[220px] lg:min-w-[600px] lg:w-[600px] justify-center inline-flex items-center gap-2 bg-white/10 text-white/60 px-14 py-5 sm:py-5 rounded-full font-bold text-lg sm:text-xl border border-white/15 cursor-not-allowed"
                      >
                        {checkoutDisabledLabel}
                      </span>
                    ) : (
                    <Link
                      to={checkoutHref}
                      onClick={() => trackCheckoutClick("hero")}
                      className="w-full sm:w-auto min-w-[200px] sm:min-w-[220px] lg:min-w-[600px] lg:w-[600px] justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-14 py-5 sm:py-5 rounded-full font-bold text-lg sm:text-xl shadow-lg shadow-purple-500/25 transition-all duration-300"
                    >
                      {t("event_detail.sticky.reserve_spot", "Reserve your spot")}
                    </Link>
                    )}
                    <button
                      type="button"
                      onClick={handleOpenFutureInvites}
                      className="text-sm text-gray-400 hover:text-[#38D1BF] transition-colors"
                    >
                      {t("event_detail.cant_attend_link_light", "Can't make it? Get future invites →")}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1.5 px-0.5">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Users size={16} className="text-[#38D1BF] shrink-0" />
                      {t(
                        microMatches
                          ? "event_detail.everyone_making_friends"
                          : "event_detail.everyone_making_friends_single_group",
                        microMatches
                          ? "You'll usually be matched with ~6 solo attendees (often roughly 4–10)"
                          : "You'll meet other solo attendees going to this event—in one Pulse group chat"
                      )}
                    </div>
                    {!usePlaceholderUI && !checkoutDisabled ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-amber-400/95">
                        <Ticket size={16} className="shrink-0" aria-hidden />
                        {t("event_detail.sticky.tickets_remaining_short", "Only {n} spots left for this event").replace("{n}", String(data.tickets_remaining ?? 18))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="max-w-[600px] xl:max-w-[650px] mt-5">
                <div className="space-y-2.5 md:space-y-4 text-lg text-gray-300 leading-[1.68]">
                  <p>{shortDescriptionText}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main details */}
              <div className="lg:col-span-2">
                <Card ref={whatHappensRef} className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      {t("event_detail.what_happens_title", "What happens after you sign up")}
                    </h2>
                    <p className="text-sm text-gray-400 mb-5">
                      {t("event_detail.organised_by", "This event is organised by")}{" "}
                      <span className="text-white/75 font-medium">{organiser}</span>
                      {placeLabel ? (
                        <>
                          {" "}
                          <span className="text-gray-400">at</span>{" "}
                          <span className="font-medium text-[#38D1BF]">{placeLabel}</span>
                        </>
                      ) : null}
                      .
                      {" "}{t("event_detail.organised_by_suffix", "Here's what Pulse adds.")}
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mt-0.5">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold leading-snug">
                            {t(
                              microMatches ? "event_detail.step1_title" : "event_detail.step1_title_single_group",
                              microMatches ? "Get matched with likeminded attendees" : "Join the attendee group chat"
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {t(
                              microMatches ? "event_detail.step1_desc" : "event_detail.step1_desc_single_group",
                              microMatches
                                ? "Complete a quick vibe test so we can place you in a small group of likeminded solo attendees going to the same event—usually around six people, sometimes roughly four to ten depending on the night."
                                : "Complete a quick vibe test so we can tailor introductions for everyone in the Pulse attendee chat for this event."
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mt-0.5">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold leading-snug">{t("event_detail.step2_title", "Break the ice")}</div>
                          <p className="text-sm text-gray-400 mt-1">
                            {t("event_detail.step2_desc", "Chat with fellow group members, guided by our conversation starters so you get to know each other before the event.")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold leading-snug">
                            {t(
                              microMatches ? "event_detail.step3_title" : "event_detail.step3_title_single_group",
                              microMatches ? "Show up with your crew" : "Show up with familiar faces"
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {t("event_detail.step3_desc", "Walk into the event with familiar faces instead of as a stranger.")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mt-0.5">
                          <UtensilsCrossed className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold leading-snug">{t("event_detail.step4_title", "Pre or post-event meetup")}</div>
                          <p className="text-sm text-gray-400 mt-1">
                            {t(
                              microMatches ? "event_detail.step4_desc" : "event_detail.step4_desc_single_group",
                              microMatches
                                ? "If you want, your group can grab coffee or a bite before or after—totally optional; many people just enjoy the main event together."
                                : "If you want, people in the chat can grab coffee or a bite before or after—totally optional; many people just enjoy the main event together."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenFutureInvites}
                      className="mt-4 text-xs text-white/40 hover:text-[#38D1BF]/80 transition-colors"
                    >
                      {t("event_detail.cant_attend_link_light", "Can't make it? Get future invites →")}
                    </button>
                  </CardContent>
                </Card>

                {/* Sign up box above "About this event" – mobile only */}
                <div className="mb-8 lg:hidden">
                  <SignUpCard
                    t={t}
                    checkoutHref={checkoutHref}
                    trackCheckoutClick={trackCheckoutClick}
                    onSeeWhatsIncludedClick={() => trackQualifiedEventPageView("see_whats_included")}
                    onOpenFutureInvites={handleOpenFutureInvites}
                    formattedTotalPrice={formattedTotalPrice}
                    formattedBaseExperiencePrice={formattedBaseExperiencePrice}
                    formattedPulseFee={formattedPulseFee}
                    whatsIncluded={data.whats_included ?? []}
                    ticketsRemaining={data.tickets_remaining ?? 20}
                    showPricing={!usePlaceholderUI}
                    showSpotsRemaining={!usePlaceholderUI && !checkoutDisabled}
                    checkoutDisabled={checkoutDisabled}
                    checkoutDisabledLabel={checkoutDisabledLabel}
                    microMatches={microMatches}
                  />
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2>{t("event_detail.about_this_event", "About this event")}</h2>
                  <div
                    className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-[#38D1BF] prose-a:no-underline hover:prose-a:underline prose-li:marker:text-gray-500"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(longDescriptionHtml) }}
                  />
                  <div className="mt-6 not-prose">
                    <EventProviderSection
                      provider={data.provider}
                      providerEventUrl={data.provider_event_url}
                    />
                  </div>
                  <h3>{t("event_detail.good_to_know", "Good to know")}</h3>
                  <ul className="text-gray-300">
                    <li>
                      {t(
                        microMatches ? "event_detail.good_to_know_1" : "event_detail.good_to_know_1_single_group",
                        microMatches
                          ? "Depending on the event and number of signups, your group can be anywhere from 5 to 20 people. You'll know your group before the event."
                          : "Everyone who booked through Pulse for this event is in the same attendee group chat, so you can coordinate and say hello before you arrive."
                      )}
                    </li>
                    <li>{t("event_detail.good_to_know_2", "Your booking includes a real event ticket issued through the provider.")}</li>
                    <li>{t("event_detail.good_to_know_4", "You don't need to know anyone. That's the whole point.")}</li>
                    <li>{t("event_detail.good_to_know_5", "Meet 15 minutes before the start so you can all enter the venue together.")}</li>
                    <li>{t("event_detail.good_to_know_6", "This is a public event. You may meet other attendees who didn't book through Pulse.")}</li>
                  </ul>
                </div>
              </div>

              {/* Sticky signup card */}
                <aside ref={signUpAsideRef} className="lg:sticky lg:top-28 h-fit">
                <SignUpCard
                    t={t}
                    checkoutHref={checkoutHref}
                    trackCheckoutClick={trackCheckoutClick}
                    onSeeWhatsIncludedClick={() => trackQualifiedEventPageView("see_whats_included")}
                    onOpenFutureInvites={handleOpenFutureInvites}
                    formattedTotalPrice={formattedTotalPrice}
                    formattedBaseExperiencePrice={formattedBaseExperiencePrice}
                    formattedPulseFee={formattedPulseFee}
                    whatsIncluded={data.whats_included ?? []}
                    ticketsRemaining={data.tickets_remaining ?? 20}
                    showPricing={!usePlaceholderUI}
                    showSpotsRemaining={!usePlaceholderUI && !checkoutDisabled}
                    checkoutDisabled={checkoutDisabled}
                    checkoutDisabledLabel={checkoutDisabledLabel}
                    microMatches={microMatches}
                  />
              </aside>
            </motion.div>

            <EventFaqSection
              eventTitle={data.title}
              city={formattedCityName || ""}
              venue={placeLabel}
              organiser={organiser}
              provider={providerName}
              dateTimeLabel={dateTime.text}
              duration={durationText}
              microMatches={microMatches}
            />
          </div>
        </section>
      </main>

      <Footer />

      {showSticky && !usePlaceholderUI && (
        <EventStickyCta
          checkoutHref={checkoutHref}
          trackCheckoutClick={trackCheckoutClick}
          t={t}
          ticketsRemaining={data.tickets_remaining ?? 20}
          checkoutDisabled={checkoutDisabled}
          checkoutDisabledLabel={checkoutDisabledLabel}
        />
      )}

      <GetFutureInvitesModal
        open={futureInvitesOpen && !usePlaceholderUI}
        onOpenChange={setFutureInvitesOpen}
        t={t}
        kikiId={eventData?.id ?? data.id}
        onSuccess={() => {
          trackMetaPixelEvent("event_future_invites_submitted", futureInvitesParams, { custom: true });
        }}
      />
    </div>
    </EventHeaderProvider>
  );
};

export default EventDetail;
