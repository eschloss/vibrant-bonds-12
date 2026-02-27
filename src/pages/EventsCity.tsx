import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, ArrowRight, Sparkles, Users, MessageSquare, UtensilsCrossed, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/hooks/useSeo";
import {
  getEventsByCity,
  groupEventsByWeek,
} from "@/data/events";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { useTranslation } from "@/hooks/useTranslation";

function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const EventsCity = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

  const events = cityName ? getEventsByCity(cityName) : [];
  const grouped = groupEventsByWeek(events);

  const { data: cities, loading: loadingCities } = useApiJson<any[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const matchedCity = useMemo(() => {
    if (!cityName || !Array.isArray(cities) || cities.length === 0) return undefined;
    return cities.find(
      (c: any) => typeof c?.url2 === "string" && c.url2.replace(/^\//, "").toLowerCase() === cityName.toLowerCase()
    );
  }, [cities, cityName]);

  useEffect(() => {
    if (!cityName) return;
    if (!Array.isArray(cities) || cities.length === 0) return;
    if (!matchedCity) {
      navigate("/events/cities", { replace: true });
    }
  }, [cities, matchedCity, cityName, navigate]);

  const formattedCityName = useMemo(() => {
    if (!cityName) return "City";
    if (!matchedCity) return formatCityName(cityName);
    const nameField = currentLanguage === "es" ? "es_name" : "en_name";
    return matchedCity[nameField] || matchedCity.en_name || formatCityName(cityName);
  }, [cityName, matchedCity, currentLanguage]);

  const citySubtitle = useMemo(() => {
    if (!matchedCity) return "";
    const countryField = currentLanguage === "es" ? "es_country" : "en_country";
    const stateField = currentLanguage === "es" ? "es_state" : "en_state";
    const country = matchedCity[countryField] || matchedCity.en_country || "";
    const state = matchedCity[stateField] || matchedCity.en_state || "";
    return [state, country].filter(Boolean).join(", ");
  }, [matchedCity, currentLanguage]);

  const cityImage: string | undefined = useMemo(() => {
    if (!matchedCity) return undefined;
    return typeof matchedCity.image === "string" ? matchedCity.image : undefined;
  }, [matchedCity]);

  const seoProps = {
    title: {
      en: `Events in ${formattedCityName} | Pulse`,
      es: `Eventos en ${formattedCityName} | Pulse`,
    },
    description: {
      en: `Discover upcoming events and activities in ${formattedCityName}. From meetups to adventures, find plans perfect for your friend group.`,
      es: `Descubre eventos y actividades en ${formattedCityName}. Desde meetups hasta aventuras, encuentra planes perfectos para tu grupo.`,
    },
    keywords: ["events", formattedCityName, "activities", "meetups", "friend groups"],
    type: "website" as const,
    image: cityImage,
  };

  return (
    <div className="flex flex-col min-h-screen dark">
      <PageLoadingOverlay show={loadingCities} />
      <Seo {...seoProps} />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section (match /cities styling) */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          {cityImage ? (
            <div className="absolute inset-0 -z-10 opacity-20">
              <img src={cityImage} alt="" className="w-full h-full object-cover" />
            </div>
          ) : null}
          <div className="absolute inset-0 -z-5">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
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
              <button
                onClick={() => navigate("/events/cities")}
                className="flex items-center text-pulse-pink hover:text-pulse-pink-300 mb-6 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                {t("events_city.back_to_cities", "Back to Cities")}
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-4">
                  <Sparkles size={16} className="text-purple-400" />
                  {events.length === 0
                    ? t("events_city.hero.badge_default", "Meet new people")
                    : `${t("events_city.hero.badge_prefix", "Upcoming")} ${events.length} ${
                        events.length === 1
                          ? t("events_city.hero.badge_event", "event")
                          : t("events_city.hero.badge_events", "events")
                      }`}
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
                  {t("events_city.hero.title_prefix", "Meet new people at events in")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                    {formattedCityName}
                  </span>
                </h1>
                {citySubtitle ? (
                  <p className="text-sm text-white/70 mb-6">{citySubtitle}</p>
                ) : null}
                <p className="text-xl text-gray-300 mb-2 max-w-3xl mx-auto">
                  {t(
                    "events_city.hero.subtitle",
                    "Book your spot — we’ll add you to an in‑app group chat with other attendees so you can meet before the event."
                  ).replace("{city}", formattedCityName)}
                </p>
                <p className="text-sm text-white/70 max-w-3xl mx-auto">
                  {t("events_city.hero.micro_trust", "You’ll show up with a crew, not alone.")}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compact “After you book” strip */}
        <section className="pb-10 -mt-10 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/70 rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-base md:text-lg font-semibold text-white">
                    {t("events_city.after_booking.title", "After you book")}
                  </h2>
                  <div className="text-xs text-white/60 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-pulse-pink" />
                    {t("events_city.after_booking.pill", "In‑app group chat included")}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {t("events_city.after_booking.step1.title", "You’re in")}
                      </div>
                      <div className="text-sm text-gray-300">
                        {t("events_city.after_booking.step1.desc", "Your RSVP locks in your spot for the event.")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {t("events_city.after_booking.step2.title", "Meet your crew")}
                      </div>
                      <div className="text-sm text-gray-300">
                        {t("events_city.after_booking.step2.desc", "We add you to a group chat with other attendees.")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                      <UtensilsCrossed className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {t("events_city.after_booking.step3.title", "Optional pre‑meet")}
                      </div>
                      <div className="text-sm text-gray-300">
                        {t("events_city.after_booking.step3.desc", "Coordinate drinks/dinner before the event if you want.")}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/60">
                  {t("events_city.after_booking.note", "Chat opens automatically after booking. Leave anytime.")}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Events by Week */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <h2 className="text-2xl font-bold mb-4">
                  No events scheduled yet in {formattedCityName}
                </h2>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                  Check back soon for upcoming events, or explore other cities.
                </p>
                <button
                  onClick={() => navigate("/events/cities")}
                  className="inline-flex items-center gap-2 text-pulse-pink hover:text-pulse-pink-300 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to Cities
                </button>
              </motion.div>
            ) : (
              grouped.map(({ weekLabel, events: weekEvents }, groupIndex) => (
                <motion.div
                  key={weekLabel}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                  className="mb-16"
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-200">
                    {weekLabel}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weekEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Link to={`/events/${cityName}/${event.slug}`}>
                          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group hover:scale-[1.02] overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={event.primaryImage}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                              <div className="absolute top-3 left-3">
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur px-3 py-1 text-xs text-white border border-white/10">
                                  <MessageSquare className="h-3.5 w-3.5 text-pulse-pink" />
                                  {t("events_city.card.badge", "Group chat included")}
                                </div>
                              </div>
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex items-center text-pulse-pink text-sm gap-2">
                                  <Calendar size={14} />
                                  {formatDate(event.dateTime)}
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="text-xl font-bold text-white group-hover:text-pulse-pink transition-colors mb-2">
                                {event.title}
                              </h3>
                              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                {event.shortDescription}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                  <MapPin size={14} />
                                  {event.place}
                                </span>
                                <span className="text-pulse-pink text-sm font-medium flex items-center gap-1">
                                  Learn more
                                  <ArrowRight size={14} />
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventsCity;
