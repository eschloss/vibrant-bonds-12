import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  MessageSquare,
  Ticket,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { useTranslation } from "@/hooks/useTranslation";
import EventsCityFaqSection from "@/components/EventsCityFaqSection";
import EventsCityFutureInterestSection from "@/components/EventsCityFutureInterestSection";
import EventsCitiesPartnerAside from "@/components/EventsCitiesPartnerAside";
import { getPrefetchJsonPromise } from "@/lib/apiPrefetchBridge";
import {
  type GetKikiEventResponse,
  type GetKikisResponse,
  buildGetKikiUrl,
  buildGetKikisUrl,
  getKikiListingDescription,
  parseEventLocalDateTime,
} from "@/lib/eventApi";
function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const HERO_PARTICLES = [
  { size: 10, top: "14%", left: "8%", duration: 18, delay: "0s" },
  { size: 14, top: "18%", left: "83%", duration: 16, delay: "1.5s" },
  { size: 8, top: "34%", left: "18%", duration: 20, delay: "3s" },
  { size: 12, top: "28%", left: "70%", duration: 17, delay: "2s" },
  { size: 9, top: "52%", left: "10%", duration: 19, delay: "4s" },
  { size: 11, top: "48%", left: "88%", duration: 15, delay: "0.8s" },
  { size: 8, top: "72%", left: "24%", duration: 21, delay: "2.5s" },
  { size: 12, top: "78%", left: "74%", duration: 18, delay: "1.2s" },
  { size: 9, top: "64%", left: "56%", duration: 16, delay: "3.2s" },
  { size: 7, top: "22%", left: "48%", duration: 22, delay: "4.3s" },
];

function scrollToHowItWorksSection() {
  document
    .getElementById("events-city-how-it-works")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function prefetchGetKikiForSlugs(slugs: string[]) {
  const batch = 4;
  for (let i = 0; i < slugs.length; i += batch) {
    const chunk = slugs.slice(i, i + batch);
    await Promise.all(
      chunk.map((slug) =>
        fetch(buildGetKikiUrl(slug), {
          headers: { accept: "application/json" },
        }).catch(() => undefined)
      )
    );
  }
}

const EventsCity = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const locale = currentLanguage === "es" ? "es" : "en-US";

  const [kikis, setKikis] = useState<GetKikiEventResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [kikiFetchError, setKikiFetchError] = useState<string | null>(null);
  const [cityLabelsFromApi, setCityLabelsFromApi] = useState<{ en: string; es: string } | null>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { data: cities, loading: loadingCities } = useApiJson<any[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const matchedCity = useMemo(() => {
    if (!cityName || !Array.isArray(cities) || cities.length === 0) return undefined;
    const lower = cityName.toLowerCase();
    return cities.find((c: any) => {
      const urlMatch =
        typeof c?.url2 === "string" && c.url2.replace(/^\//, "").toLowerCase() === lower;
      const codeMatch = typeof c?.code === "string" && String(c.code).toLowerCase() === lower;
      return urlMatch || codeMatch;
    });
  }, [cities, cityName]);

  const cityCode = matchedCity && typeof (matchedCity as any).code === "string" ? (matchedCity as any).code : "";
  useEffect(() => {
    if (!cityName) return;
    if (!Array.isArray(cities) || cities.length === 0) return;
    if (!matchedCity) {
      navigate("/events/cities", { replace: true });
    }
  }, [cities, matchedCity, cityName, navigate]);

  const fetchKikisPage = useCallback(
    async (page: number, append: boolean) => {
      if (!cityCode) return;
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        if (append) setLoadingMore(true);
        else {
          setLoadingInitial(true);
          setKikiFetchError(null);
        }
        const url = buildGetKikisUrl(cityCode, page);
        let json: GetKikisResponse;
        const prefetchFirst = !append && page === 0 ? getPrefetchJsonPromise(url) : undefined;
        if (prefetchFirst) {
          try {
            json = (await prefetchFirst) as GetKikisResponse;
          } catch {
            const res = await fetch(url, {
              signal: controller.signal,
              headers: { accept: "application/json" },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            json = (await res.json()) as GetKikisResponse;
          }
        } else {
          const res = await fetch(url, {
            signal: controller.signal,
            headers: { accept: "application/json" },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          json = (await res.json()) as GetKikisResponse;
        }
        const batch = Array.isArray(json.kikis) ? json.kikis : [];
        if (!append) {
          setCityLabelsFromApi({
            en: json.city_label_en || "",
            es: json.city_label_es || "",
          });
        }
        setKikis((prev) => (append ? [...prev, ...batch] : batch));
        setHasMore(batch.length >= 10);
        setPageIndex(page);
        void prefetchGetKikiForSlugs(batch.map((k) => k.slug).filter(Boolean));
      } catch (e: unknown) {
        if ((e as Error)?.name === "AbortError") return;
        setKikiFetchError(e instanceof Error ? e.message : "Error");
        if (!append) setKikis([]);
      } finally {
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [cityCode]
  );

  useEffect(() => {
    if (!cityCode || !matchedCity) return;
    setKikis([]);
    setPageIndex(0);
    setHasMore(true);
    setCityLabelsFromApi(null);
    void fetchKikisPage(0, false);
    return () => {
      abortRef.current?.abort();
    };
  }, [cityCode, matchedCity, fetchKikisPage]);

  useEffect(() => {
    if (!hasMore || loadingInitial || loadingMore || !cityCode) return;
    const el = loadMoreSentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (e?.isIntersecting && hasMore && !loadingMore && !loadingInitial) {
          void fetchKikisPage(pageIndex + 1, true);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, loadingInitial, loadingMore, cityCode, pageIndex, fetchKikisPage]);

  const expandedCityName = useMemo(() => {
    if (!cityName) return "City";
    if (!matchedCity) return formatCityName(cityName);
    const nameField = currentLanguage === "es" ? "es_name" : "en_name";
    return matchedCity[nameField] || matchedCity.en_name || formatCityName(cityName);
  }, [cityName, matchedCity, currentLanguage]);

  const displayCityName = useMemo(() => {
    if (cityLabelsFromApi) {
      return currentLanguage === "es"
        ? cityLabelsFromApi.es || cityLabelsFromApi.en || expandedCityName
        : cityLabelsFromApi.en || cityLabelsFromApi.es || expandedCityName;
    }
    return expandedCityName;
  }, [cityLabelsFromApi, currentLanguage, expandedCityName]);

  const heroCityName = loadingInitial && !cityLabelsFromApi
    ? t("events_city.placeholder_city", "Your City")
    : displayCityName;

  const faqCityLabel = loadingInitial && !cityLabelsFromApi
    ? t("events_city.placeholder_city", "Your City")
    : displayCityName;

  const seoCityLabel = displayCityName;

  const seoProps = {
    title: {
      en: `Events in ${seoCityLabel} | Pulse`,
      es: `Eventos en ${seoCityLabel} | Pulse`,
    },
    description: {
      en: `Discover upcoming events in ${seoCityLabel}. RSVP through Pulse, join the attendee group chat, and show up with familiar faces — friendship-first, most people join solo.`,
      es: `Descubre eventos en ${seoCityLabel}. Reserva con Pulse, únete al chat de asistentes y llega con caras conocidas — amistad primero; la mayoría se une sola.`,
    },
    keywords: ["events", seoCityLabel, "activities", "meetups", "friend groups"],
    type: "website" as const,
  };

  const howItWorksSteps = [
    {
      icon: Ticket,
      title: t("events_city.after_booking.step1.title", "Book the ticket"),
      compactTitle: t("events_city.after_booking.step1.compact", "Book ticket"),
      desc: t("events_city.after_booking.step1.desc", "Choose the event you actually want to go to and lock in your spot."),
      gradient: "from-pink-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: t("events_city.after_booking.step2.title", "Meet the group in the chat"),
      compactTitle: t("events_city.after_booking.step2.compact", "Meet group"),
      desc: t(
        "events_city.after_booking.step2.desc",
        "We connect you with other attendees for the same event, then open the Pulse group chat so you can get to know each other before it starts."
      ),
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: UtensilsCrossed,
      title: t("events_city.after_booking.step3.title", "Optionally plan a pre or post-event meetup"),
      compactTitle: t("events_city.after_booking.step3.compact", "Optional pre/post meetup"),
      desc: t("events_city.after_booking.step3.desc", "If you want, use the chat to plan drinks, dinner, or a follow-up hang before or after the event."),
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Users,
      title: t("events_city.after_booking.step4.title", "Show up to the event and make friends"),
      compactTitle: t("events_city.after_booking.step4.compact", "Show up to the event"),
      desc: t("events_city.after_booking.step4.desc", "Show up to the event you booked already knowing people, so the first hello feels easy and natural."),
      gradient: "from-emerald-500 to-teal-400",
    },
  ];

  const formatEventDate = (iso: string) =>
    parseEventLocalDateTime(iso).toLocaleString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const showOverlayOnlyInitialCities = loadingCities && (!cities || cities.length === 0);

  return (
    <div className="flex flex-col min-h-screen dark">
      <PageLoadingOverlay show={showOverlayOnlyInitialCities} />
      <Seo {...seoProps} />
      <Navbar />

      <main className="flex-grow">
        <section className="relative pt-24 md:pt-28 pb-10 md:pb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 -z-10 bg-black/35" />
          <div className="absolute inset-0 -z-5 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl" />
            <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-pink-600/10 blur-3xl" />
            {HERO_PARTICLES.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  top: particle.top,
                  left: particle.left,
                  animation: `float ${particle.duration}s linear infinite`,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  {t("events_city.hero.title_prefix", "Meet new people at events in")}{" "}
                  <Link
                    to="/events/cities"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue underline-offset-4 decoration-white/50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
                  >
                    {heroCityName}
                  </Link>
                </h1>

                <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                  {t(
                    "events_city.hero.lead_short",
                    "Pick a real event you would actually go to, meet your group in the Pulse chat, and arrive already knowing people."
                  )}
                </p>

                <div className="max-w-3xl mx-auto rounded-2xl bg-gray-900/28 backdrop-blur-lg p-2.5 md:p-3 text-left shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                  <button
                    type="button"
                    onClick={scrollToHowItWorksSection}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-left md:hidden"
                  >
                    <span className="text-sm font-medium text-white">
                      {t("events_city.after_booking.title", "How it works")}
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <div className="hidden md:flex md:flex-nowrap md:justify-center gap-1.5">
                    {howItWorksSteps.map((step) => (
                      <div
                        key={step.title}
                        className="w-fit rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1.5"
                      >
                        <div className="flex items-center justify-center gap-2 text-center">
                          <div
                            className={`w-6 h-6 shrink-0 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.2)]`}
                          >
                            <step.icon className="h-3 w-3 text-white" />
                          </div>
                          <h3 className="text-[11px] font-medium text-white/95 leading-snug text-center">
                            {step.compactTitle}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 hidden md:flex justify-center">
                    <button
                      type="button"
                      onClick={scrollToHowItWorksSection}
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/55 transition-colors hover:text-white/80"
                    >
                      {t("events_city.card.learn_more", "Learn more")}
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            {kikiFetchError ? (
              <p className="text-center text-rose-300 py-8">{kikiFetchError}</p>
            ) : null}
            {loadingInitial ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-gray-800/40 h-[340px] animate-pulse"
                  />
                ))}
              </div>
            ) : kikis.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {t("events_city.empty.title", "No events scheduled yet in {city}").replace("{city}", displayCityName)}
                </h2>
                <p className="text-gray-300 max-w-xl mx-auto">
                  {t(
                    "events_city.empty.body",
                    "Check back soon for upcoming events, or explore other cities."
                  )}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {kikis.map((kiki, index) => (
                    <CityKikiCard
                      key={`${kiki.id}-${kiki.slug}-${index}`}
                      kiki={kiki}
                      index={index}
                      cityLabel={displayCityName}
                      t={t}
                      formatEventDate={formatEventDate}
                    />
                  ))}
                </div>
                {hasMore ? (
                  <div ref={loadMoreSentinelRef} className="h-16 flex items-center justify-center py-8">
                    {loadingMore ? (
                      <span className="text-sm text-white/50">
                        {t("events_city.loading_more", "Loading more events…")}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>

        <EventsCityFutureInterestSection
          cityLabel={faqCityLabel}
          kikiId={kikis[0]?.id}
          kikisLoading={loadingInitial}
        />

        <section
          id="events-city-how-it-works"
          className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black text-white border-t border-white/5"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-pulse-blue/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {t("events_city.how_section.title", "What happens after you book")}
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                {t(
                  "events_city.how_section.subtitle",
                  "The venue runs the event itself. Pulse adds the small-group chat and meetup layer that helps you show up already knowing people."
                )}
              </p>
            </motion.div>

            <motion.div
              className="relative max-w-4xl mx-auto rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55 }}
            >
              <div className="relative">
                <div className="absolute left-[21px] top-5 bottom-5 w-px bg-gradient-to-b from-pulse-pink via-pulse-blue to-transparent" />

                <div className="space-y-4">
                  {howItWorksSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className="relative pl-14"
                    >
                      <div className="absolute left-0 top-1.5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gray-950 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
                        <span className="text-xs font-semibold text-white/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-gray-900/40 p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-11 h-11 shrink-0 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-[0_8px_22px_rgba(0,0,0,0.22)]`}
                          >
                            <step.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white leading-snug">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <EventsCityFaqSection cityLabel={faqCityLabel} />

        <section className="border-t border-white/5 bg-gradient-to-b from-gray-900 to-black py-10 md:py-12">
          <div className="container mx-auto px-4">
            <EventsCitiesPartnerAside className="mb-0" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

function CityKikiCard({
  kiki,
  index,
  cityLabel,
  t,
  formatEventDate,
}: {
  kiki: GetKikiEventResponse;
  index: number;
  cityLabel: string;
  t: (key: string, fallback: string) => string;
  formatEventDate: (iso: string) => string;
}) {
  const soldOut = Boolean(kiki.sold_out);
  const isPast = Boolean(kiki.past_event);
  const ticketsRemaining =
    typeof kiki.tickets_remaining === "number" && kiki.tickets_remaining > 0 && !soldOut && !isPast
      ? kiki.tickets_remaining
      : null;

  const cardInner = (
    <Card
      className={`bg-gray-800/50 backdrop-blur-lg border-gray-700 transition-all duration-300 h-full flex flex-col group overflow-hidden ${
        isPast ? "grayscale border-white/10 bg-gray-800/35" : "hover:border-purple-500/50 hover:scale-[1.02]"
      } ${soldOut && !isPast ? "border-amber-900/40" : ""}`}
    >
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={kiki.primary_image}
          alt={`${kiki.title} — Pulse event in ${cityLabel}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isPast ? "grayscale" : "group-hover:scale-110"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${isPast ? "from-gray-900/95 to-transparent" : "from-gray-900/80 to-transparent"}`}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {ticketsRemaining ? (
            <div className="relative inline-flex">
              <span
                className="pointer-events-none absolute -inset-[12px] rounded-full bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_93%,rgba(0,0,0,0.48)_96.5%,rgba(0,0,0,0.12)_99%,transparent_100%)]"
                aria-hidden
              />
              <div className="relative inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/15 backdrop-blur px-3 py-1 text-xs font-medium text-amber-300">
                <Ticket size={13} className="shrink-0" aria-hidden />
                {t(
                  ticketsRemaining === 1
                    ? "events_city.card.ticket_left_singular"
                    : "events_city.card.tickets_left",
                  ticketsRemaining === 1 ? "Only 1 ticket left" : "Only {count} tickets left"
                ).replace("{count}", String(ticketsRemaining))}
              </div>
            </div>
          ) : null}
          {!isPast && soldOut ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 backdrop-blur px-3 py-1 text-xs text-amber-100 border border-amber-700/50">
              {t("events_city.card.sold_out", "Sold out")}
            </div>
          ) : null}
          {isPast ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-xs text-white/90 border border-white/15">
              {t("events_city.card.past_event", "Past event")}
            </div>
          ) : null}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="relative inline-flex max-w-full">
            <span
              className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl bg-[radial-gradient(ellipse_100%_115%_at_center,transparent_0%,transparent_88%,rgba(0,0,0,0.42)_92%,rgba(0,0,0,0.1)_97%,transparent_100%)]"
              aria-hidden
            />
            <div className="relative inline-flex max-w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-pulse-pink backdrop-blur-md [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] [&_svg]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
              <Calendar size={14} className="shrink-0" aria-hidden />
              <span className="min-w-0 truncate">{formatEventDate(kiki.datetime_local)}</span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-1 min-h-0">
        {/*
          Fixed block = 2 lines title (text-xl/leading-7) + gap + 2 lines description (text-sm/leading-5)
          so every card aligns; bottom row sits at the same vertical position.
        */}
        <div className="mb-3 flex min-h-[6.5rem] flex-col gap-2">
          <h3
            className={`text-xl font-bold leading-7 line-clamp-2 min-h-[3.5rem] transition-colors ${
              isPast ? "text-white/85" : "text-white group-hover:text-pulse-pink"
            }`}
          >
            {kiki.title}
          </h3>
          <p
            className={`text-sm leading-5 line-clamp-2 min-h-[2.5rem] ${
              isPast ? "text-gray-400" : "text-gray-300"
            }`}
          >
            {getKikiListingDescription(kiki)}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className={`text-sm flex items-center gap-1 min-w-0 ${isPast ? "text-gray-500" : "text-gray-400"}`}>
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{kiki.place}</span>
          </span>
          <span
            className={`text-sm font-medium flex items-center gap-1 shrink-0 ${isPast ? "text-gray-500" : "text-pulse-pink"}`}
          >
            {t("events_city.card.learn_more", "Learn more")}
            <ArrowRight size={14} />
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/events/${kiki.slug}`} className="block h-full">
        {cardInner}
      </Link>
    </motion.div>
  );
}

export default EventsCity;
