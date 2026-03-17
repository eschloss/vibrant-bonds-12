import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  MessageSquare,
  Users,
  UtensilsCrossed,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import NotFound from "@/pages/NotFound";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import EventFaqSection from "@/components/EventFaqSection";
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
  buildGetKikiUrl,
  formatEventPrice,
  getEventPriceOpts,
  getProviderName,
  parseEventLocalDateTime,
} from "@/lib/eventApi";
import { trackMetaPixelEvent } from "@/lib/utils";
import { EventHeaderProvider } from "@/contexts/EventHeaderContext";

type SignUpCardProps = {
  t: (key: string, fallback?: string) => string;
  checkoutHref: string;
  trackCheckoutClick: (location: "hero" | "sidebar" | "header") => void;
  formattedTotalPrice: string;
  formattedTicketPrice: string;
  formattedPulseFee: string;
  formattedProviderFee: string | null;
  providerFee: number;
};

const SignUpCard = ({
  t,
  checkoutHref,
  trackCheckoutClick,
  formattedTotalPrice,
  formattedTicketPrice,
  formattedPulseFee,
  formattedProviderFee,
  providerFee,
}: SignUpCardProps) => (
  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
    <CardContent className="p-6">
      <h3 className="text-2xl font-bold text-white mb-4">{t("event_detail.sign_up", "Sign up")}</h3>

      <div className="space-y-2.5 text-sm text-gray-300 mb-6">
        <div className="flex items-center gap-2">
          <Users size={15} className="text-[#38D1BF] shrink-0" />
          {t("event_detail.matched_solo", "Matched with solo attendees making friends")}
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={15} className="text-purple-300 shrink-0" />
          {t("event_detail.hosted_chat", "Hosted group chat with icebreaking")}
        </div>
        <div className="flex items-center gap-2">
          <UtensilsCrossed size={15} className="text-amber-300 shrink-0" />
          {t("event_detail.optional_meetup", "Optional pre or post-event meetup")}
        </div>
      </div>

      <div className="mb-5 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl text-white/90">
            {t("event_detail.total", "Total")}
          </span>
          <span className="text-xl text-white tabular-nums text-right">
            {formattedTotalPrice}
          </span>
        </div>
        <div className="text-xs text-white/60 space-y-0.5">
          <div className="flex items-center justify-between">
            <span>{t("event_detail.event_ticket", "Event ticket")}</span>
            <span className="text-white/75">{formattedTicketPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("event_detail.pulse_fee", "Pulse fee")}</span>
            <span className="text-white/75">{formattedPulseFee}</span>
          </div>
          {formattedProviderFee && providerFee > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("event_detail.provider_fee", "Provider fee")}</span>
              <span className="text-white/75">{formattedProviderFee}</span>
            </div>
          )}
        </div>
      </div>

      <Link
        to={checkoutHref}
        onClick={() => trackCheckoutClick("sidebar")}
        className="w-full justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
      >
        {t("event_detail.sign_up_now", "Sign up now")}
      </Link>

      <p className="mt-3 text-xs text-white/50 text-center">
        {t("event_detail.most_make_friend", "You'll be matched with at least 3 other solo attendees.")}
      </p>
    </CardContent>
  </Card>
);

const EventDetail = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { changeLanguage } = useLanguage();
  const { t, currentLanguage } = useTranslation();
  const locale = currentLanguage === "es" ? "es" : "en-US";

  const formatDateTimeWindowLong = (
    startIso: string,
    latestIso?: string | null
  ): { text: string; hasWindow: boolean } => {
    const start = parseEventLocalDateTime(startIso);
    const date = start.toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
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
    const startsBetween = t("event_detail.starts_between", "Starts between");
    return { text: `${date} · ${startsBetween} ${startTime}–${latestTime}`, hasWindow: true };
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
  const hasTrackedQualifiedEventPageView = useRef(false);

  const groupChatOverlayImageUrl =
    "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Copy%20of%20may%2021,%201107%20am%20(Your%20Story).png";

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
      return;
    }

    const controller = new AbortController();
    const url = buildGetKikiUrl(eventSlug);

    fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          const data = json as GetKikiEventResponse;
          setEventData(data);
          if (data.language) changeLanguage(data.language);
        }
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [eventSlug, changeLanguage]);

  useEffect(() => {
    if (!eventData || notFound) return;
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
  }, [eventData, notFound]);

  const trackQualifiedEventPageView = useCallback(
    (
      trigger: "10_seconds" | "checkout_click",
      extraParams?: Record<string, string>
    ) => {
      if (!eventData || notFound || hasTrackedQualifiedEventPageView.current) return;
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
    [eventData, notFound]
  );

  useEffect(() => {
    hasTrackedQualifiedEventPageView.current = false;
  }, [eventData?.slug]);

  useEffect(() => {
    if (!eventData || notFound) return;

    const timeoutId = window.setTimeout(() => {
      trackQualifiedEventPageView("10_seconds");
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [eventData, notFound, trackQualifiedEventPageView]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen dark">
        <PageLoadingOverlay show={true} />
        <Navbar />
        <main className="flex-grow" />
        <Footer />
      </div>
    );
  }

  if (notFound || !eventData) {
    return <NotFound />;
  }

  const data = eventData;
  const priceOpts = getEventPriceOpts(data);

  const formattedCityName = data.city_label || "";
  const providerName = getProviderName(data.provider);
  const organiser = providerName || data.place;

  const formattedTotalPrice = formatEventPrice(data.total_price, priceOpts);
  const formattedTicketPrice = formatEventPrice(data.ticket_price, priceOpts);
  const formattedPulseFee = formatEventPrice(data.platform_fee, priceOpts);
  const formattedProviderFee =
    data.provider_fee > 0 ? formatEventPrice(data.provider_fee, priceOpts) : null;

  const introLine = `⭐ ${data.title} is a public event in ${formattedCityName}. Pulse isn't the organiser. We help you go with a small group of other solo attendees, so you can meet new friends before you arrive.`;

  const heroImages = [
    data.primary_image,
    data.image_2,
    data.image_3,
    data.image_4,
    data.image_5,
  ].filter(Boolean) as string[];

  const displayHeroImages = heroImages.length > 0 ? heroImages : [data.primary_image];

  const checkoutHref = `/events/${data.slug}/checkout`;
  const trackCheckoutClick = (ctaLocation: "hero" | "sidebar" | "header") => {
    trackQualifiedEventPageView("checkout_click", {
      cta_location: ctaLocation,
      destination: checkoutHref,
    });

    trackMetaPixelEvent(
      "event_signup_click",
      {
        event_slug: data.slug,
        event_title: data.title,
        city: data.city,
        city_label: data.city_label,
        provider: data.provider,
        destination: checkoutHref,
        path: `/events/${data.slug}`,
        cta_location: ctaLocation,
      },
      { custom: true }
    );
  };

  const seoProps = {
    title: {
      en: `${data.title} | ${formattedCityName} Events | Pulse`,
      es: `${data.title} | Eventos en ${formattedCityName} | Pulse`,
    },
    description: {
      en: data.short_description,
      es: data.short_description,
    },
    keywords: [data.title, formattedCityName, "event", "activities", providerName].filter(
      Boolean
    ),
    type: "website" as const,
    image: data.primary_image,
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.title,
    description: `${introLine}\n\n${stripHtml(data.long_description)}`,
    startDate: data.datetime_local,
    location: {
      "@type": "Place",
      name: data.place,
    },
    image: heroImages.length > 0 ? heroImages : [data.primary_image],
    offers: {
      "@type": "Offer",
      price: String(data.total_price),
      priceCurrency: data.currency || "USD",
    },
  };

  const durationText = formatDuration(data.duration_hours);
  const dateTime = formatDateTimeWindowLong(data.datetime_local, data.datetime_local_latest);
  const entranceTimeTooltip = t(
    "event_detail.entrance_time_tooltip",
    "Your entrance time depends on the group we match you into — it can be any time in this range. This helps your match group meet each other (instead of mixing with everyone at once)."
  );


  const eventHeaderValue = {
    eventSlug: data.slug,
    checkoutHref,
    trackCheckoutClick,
  };

  return (
    <EventHeaderProvider value={eventHeaderValue}>
    <div className="flex flex-col min-h-screen dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Seo {...seoProps} />
      <Navbar />

      <main className="flex-grow">
        {/* Hero (match /cities visual language) */}
        <section className="relative pt-32 pb-12 overflow-hidden">
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
              <div className="mb-8">
                <div className="relative h-64 md:h-96 xl:h-[34rem] 2xl:h-[38rem] rounded-2xl overflow-hidden border border-gray-700 bg-black/20">
                  <Carousel setApi={setHeroCarouselApi} opts={{ loop: true }} className="h-full">
                    <CarouselContent className="ml-0 h-full">
                      {displayHeroImages.map((img, i) => (
                        <CarouselItem key={img + i} className="pl-0 h-full">
                          <img
                            src={img}
                            alt={`${data.title} image ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </CarouselItem>
                      ))}
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

                  {/* Group chat preview */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="absolute z-20 right-[22px] bottom-3 md:right-[26px] md:bottom-4 h-[90%] aspect-[9/16] cursor-pointer select-none"
                        aria-label={t("event_detail.view_group_chat_preview", "View group chat preview")}
                      >
                        <img
                          src={groupChatOverlayImageUrl}
                          alt="Group chat preview"
                          className="w-full h-full object-contain drop-shadow-2xl"
                          loading="eager"
                          decoding="async"
                          draggable={false}
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:hover:text-white/80">
                      <img
                        src={groupChatOverlayImageUrl}
                        alt="Group chat preview"
                        className="w-full rounded-2xl"
                      />
                    </DialogContent>
                  </Dialog>

                  <div className="absolute z-10 inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Meta (move above title) */}
              <div className="flex flex-wrap gap-4 text-gray-300 mb-5">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span className="inline-flex items-center gap-2">
                    <span>{dateTime.text}</span>
                    {dateTime.hasWindow ? (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-black/20 text-[11px] font-semibold text-white/80 hover:bg-black/30 hover:text-white transition-colors"
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
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {data.place}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {durationText}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={18} />
                  {formattedTotalPrice}
                </span>
                {formattedCityName ? (
                  <span className="flex items-center gap-2">
                    <Globe size={18} />
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
                <span className="block text-4xl md:text-6xl font-extrabold text-white">
                  {data.title}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-4">
                {t(
                  "event_detail.pulse_matches",
                  "Pulse matches you with a small group of solo attendees going to the same event, so you show up with new friends."
                )}
              </p>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/60">{t("event_detail.about_the_event", "About the event")}</div>
                <p className="text-lg text-gray-300 mt-1">{data.short_description}</p>
              </div>

              {/* Prominent CTA (above the fold) */}
              <div className="mt-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                <Link
                  to={checkoutHref}
                  onClick={() => trackCheckoutClick("hero")}
                  className="w-full sm:w-auto min-w-[200px] sm:min-w-[220px] lg:min-w-[600px] lg:w-[600px] justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-14 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                >
                  {t("event_detail.sign_up", "Sign up")}
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/70 px-2">
                <Users size={16} className="text-[#38D1BF] shrink-0" />
                {t("event_detail.everyone_making_friends", "Everyone in your group is looking to make new friends")}
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
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      {t("event_detail.what_happens_title", "What happens after you sign up")}
                    </h2>
                    <p className="text-sm text-gray-400 mb-5">
                      {t("event_detail.organised_by", "This event is organised by")}{" "}
                      <span className="text-white/75 font-medium">{organiser}</span>
                      {data.place ? (
                        <>
                          {" "}
                          <span className="text-gray-400">at</span>{" "}
                          <span className="font-medium text-[#38D1BF]">{data.place}</span>
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
                          <div className="text-white font-semibold leading-snug">{t("event_detail.step1_title", "Get matched with likeminded attendees")}</div>
                          <p className="text-sm text-gray-400 mt-1">
                            {t("event_detail.step1_desc", "Complete a quick vibe test so we can place you with 5–8 likeminded solo attendees who all want to make friends.")}
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
                          <div className="text-white font-semibold leading-snug">{t("event_detail.step3_title", "Show up with your crew")}</div>
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
                            {t("event_detail.step4_desc", "Your group coordinates a pre or post-event hangout so the friendships keep going beyond the event itself.")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sign up box above "About this event" – mobile only */}
                <div className="mb-8 lg:hidden">
                  <SignUpCard
                    t={t}
                    checkoutHref={checkoutHref}
                    trackCheckoutClick={trackCheckoutClick}
                    formattedTotalPrice={formattedTotalPrice}
                    formattedTicketPrice={formattedTicketPrice}
                    formattedPulseFee={formattedPulseFee}
                    formattedProviderFee={formattedProviderFee}
                    providerFee={data.provider_fee}
                  />
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2>{t("event_detail.about_this_event", "About this event")}</h2>
                  <div
                    className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-[#38D1BF] prose-a:no-underline hover:prose-a:underline prose-li:marker:text-gray-500"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.long_description) }}
                  />
                  <div className="mt-6 not-prose">
                    <EventProviderSection
                      provider={data.provider}
                      providerEventUrl={data.provider_event_url}
                    />
                  </div>
                  <h3>{t("event_detail.good_to_know", "Good to know")}</h3>
                  <ul className="text-gray-300">
                    <li>{t("event_detail.good_to_know_1", "Depending on the event and number of signups, your group can be anywhere from 5 to 20 people. You'll know your group before the event.")}</li>
                    <li>{t("event_detail.good_to_know_2", "Your booking includes a real event ticket issued through the provider.")}</li>
                    <li>{t("event_detail.good_to_know_4", "You don't need to know anyone. That's the whole point.")}</li>
                    <li>{t("event_detail.good_to_know_5", "Meet 15 minutes before the start so you can all enter the venue together.")}</li>
                    <li>{t("event_detail.good_to_know_6", "This is a public event. You may meet other attendees who didn't book through Pulse.")}</li>
                  </ul>
                </div>
              </div>

              {/* Sticky signup card */}
              <aside className="lg:sticky lg:top-28 h-fit">
                <SignUpCard
                  t={t}
                  checkoutHref={checkoutHref}
                  trackCheckoutClick={trackCheckoutClick}
                  formattedTotalPrice={formattedTotalPrice}
                  formattedTicketPrice={formattedTicketPrice}
                  formattedPulseFee={formattedPulseFee}
                  formattedProviderFee={formattedProviderFee}
                  providerFee={data.provider_fee}
                />
              </aside>
            </motion.div>

            <EventFaqSection
              eventTitle={data.title}
              city={formattedCityName || ""}
              venue={data.place}
              organiser={organiser}
              provider={providerName}
              price={formattedTotalPrice}
              dateTimeLabel={dateTime.text}
              duration={durationText}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </EventHeaderProvider>
  );
};

export default EventDetail;
