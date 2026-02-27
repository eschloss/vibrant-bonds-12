import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, MessageSquare, Ticket, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FloatingActivityCollage from "@/components/FloatingActivityCollage";
import EventSignupHowItWorks from "@/components/EventSignupHowItWorks";
import EventsTestimonials from "@/components/EventsTestimonials";
import EventsLandingFaqSection from "@/components/EventsLandingFaqSection";
import { getFeaturedEventImages, getUpcomingEvents, type Event } from "@/data/events";
import { EVENT_VIBES } from "@/data/eventVibes";
import { useTranslation } from "@/hooks/useTranslation";

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function formatDateShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Events() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark");
  }, []);

  const upcoming = useMemo(() => {
    return getUpcomingEvents(10);
  }, []);

  const collageItems = useMemo(() => {
    const sliced = getFeaturedEventImages(7);
    return sliced.map((img, i) => ({
      id: `event-${i}`,
      img,
      alt: t("eventsLanding.collage_alt", "Pulse event photo"),
    }));
  }, [t]);

  const vibes = useMemo(() => {
    const gradientById: Record<string, string> = {
      create: "from-pink-500/25 via-purple-500/20 to-indigo-500/25",
      experience: "from-purple-500/25 via-pink-500/20 to-orange-500/25",
      play: "from-cyan-500/25 via-blue-500/20 to-indigo-500/25",
      move: "from-emerald-500/25 via-green-500/20 to-cyan-500/25",
    };

    return EVENT_VIBES.map((v, i) => ({
      id: v.id,
      title: t(v.titleKey, v.defaultTitle),
      description: t(v.descriptionKey, v.defaultDescription),
      image: v.backgroundImage,
      gradient: gradientById[v.id] ?? "from-pink-500/25 via-purple-500/20 to-indigo-500/25",
      chips: v.chipKeys.map((key, idx) => t(key, v.defaultChips[idx] ?? "")),
    }));
  }, [t]);

  const seoProps = {
    title: {
      en: t("eventsLanding.seo.title", "Pulse Events | Meet New Friends IRL"),
      es: t("eventsLanding.seo.title", "Eventos de Pulse | Conoce Nuevos Amigos IRL"),
    },
    description: {
      en: t(
        "eventsLanding.seo.description",
        "Pulse Events are real events with an in‑app group chat so you can meet other attendees before you arrive. Find events in your city and show up with new friends."
      ),
      es: t(
        "eventsLanding.seo.description",
        "Los Eventos de Pulse son eventos reales con un chat grupal en la app para conocer a otros asistentes antes de llegar. Encuentra eventos en tu ciudad."
      ),
    },
    keywords: ["events", "meet new people", "group chat", "meetups", "friends", "irl"],
    type: "website" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
        </div>

        {/* Collage behind, masked */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 220px, rgba(0,0,0,1) 500px)",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 220px, rgba(0,0,0,1) 500px)",
          }}
        >
          <FloatingActivityCollage items={collageItems} density={7} floatRange={6} stagger={0.14} parallax={false} />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="text-center px-1 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  {t("eventsLanding.hero.headline_focus", "Your next night out")}
                </span>
                <br />
                {t("eventsLanding.hero.headline_rest", "with new friends")}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                {t(
                  "eventsLanding.hero.copy",
                  "Pick an event you’d be excited to go to. Pulse matches you with other solo‑goers and opens an in‑app group chat so you can meet before you arrive."
                )}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80 mb-7 md:mb-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <Ticket size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_1", "Pick an event")}
                </span>
                <span className="text-white/30 select-none">→</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <MessageSquare size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_2", "Group chat opens")}
                </span>
                <span className="text-white/30 select-none">→</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <Users size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_3", "Arrive together")}
                </span>
              </div>

              <div className="text-sm text-white/70 mb-7 md:mb-8">
                {t(
                  "eventsLanding.hero.micro_trust",
                  "Everyone in your chat is going solo — and there to meet new friends."
                )}
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link to="/events/cities">
                  <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                    {t("eventsLanding.hero.cta_primary", "Find events in your city")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => scrollToId("featured-events")}
                >
                  {t("eventsLanding.hero.cta_secondary", "See featured events")}
                </Button>
                <Link
                  to="/download"
                  className="sm:self-center text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
                >
                  {t("eventsLanding.hero.cta_tertiary", "Download Pulse")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Pulse Events are */}
      <section className="py-14 md:py-18 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("eventsLanding.what.title_prefix", "Turn a night out into")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}
                {t("eventsLanding.what.title_focus", "new friends")}
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              {t(
                "eventsLanding.what.subtitle",
                "Create lasting memories with your new friends."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Ticket,
                title: t("eventsLanding.what.card1_title", "A real event"),
                body: t(
                  "eventsLanding.what.card1_body",
                  "Go to concerts, trivia, nights out, and experiences you’d genuinely choose — not awkward “meetups for meeting up.”"
                ),
                accent: "from-pink-500 to-purple-600",
              },
              {
                icon: MessageSquare,
                title: t("eventsLanding.what.card2_title", "Pulse group chat"),
                body: t(
                  "eventsLanding.what.card2_body",
                  "We match you with other solo‑goers for the same event and open a private in‑app group chat."
                ),
                accent: "from-blue-500 to-cyan-400",
              },
              {
                icon: CalendarDays,
                title: t("eventsLanding.what.card3_title", "Pre/post meetup"),
                body: t(
                  "eventsLanding.what.card3_body",
                  "Say hi before you arrive and coordinate a simple drink/dinner before or after — right in chat."
                ),
                accent: "from-emerald-500 to-green-400",
              },
            ].map((c) => (
              <Card
                key={c.title}
                className="bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-2xl p-6"
              >
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${c.accent}`}>
                  <c.icon size={18} className="text-white" />
                </div>
                <div className="text-white font-semibold text-lg">{c.title}</div>
                <p className="text-gray-300 mt-2 leading-relaxed">{c.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event vibes */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-pulse-pink/15 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("eventsLanding.vibes.title_prefix", "Pick your")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}
                {t("eventsLanding.vibes.title_focus", "scene")}
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              {t(
                "eventsLanding.vibes.subtitle",
                "Choose how you want to connect — then find events where you can meet people before you arrive."
              )}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0">
              {vibes.map((v, idx) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="min-w-[84%] sm:min-w-[64%] md:min-w-[48%] lg:min-w-0 snap-start"
                >
                  <Link to="/events/cities" className="block">
                    <Card className="relative overflow-hidden rounded-3xl border border-gray-700 bg-gray-900/35 backdrop-blur-xl hover:border-purple-500/50 transition-all">
                      <div className="absolute inset-0">
                        <img
                          src={v.image}
                          alt={v.title}
                          className="h-full w-full object-cover scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient}`} />
                      </div>

                      <div className="relative p-8 h-[300px] flex flex-col justify-end">
                        <div className="text-[22px] md:text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                          {v.title}
                        </div>
                        <div className="text-sm text-white/80 mt-2 leading-snug line-clamp-2">
                          {v.description}
                        </div>

                        <div className="mt-5 inline-flex items-center text-[#38D1BF] text-sm font-semibold">
                          {t("eventsLanding.vibes.card_cta", "Find events")}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <EventSignupHowItWorks ctaHref="/how-it-works" ctaLabel={t("eventsLanding.how.cta", "How Pulse works")} />
          </motion.div>
        </div>
      </section>

      {/* Featured events */}
      <section id="featured-events" className="py-14 md:py-18 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {t("eventsLanding.featured.title_prefix", "Featured")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}
                {t("eventsLanding.featured.title_focus", "Events")}
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              {t("eventsLanding.featured.subtitle", "A few upcoming picks across different cities.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcoming.slice(0, 9).map((e, idx) => {
              const cityLabel = titleCaseFromSlug(e.citySlug);
              const dateLabel = formatDateShort(e.dateTime);
              const href = `/events/${e.citySlug}/${e.slug}`;
              return (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                >
                  <Link to={href} className="block h-full">
                    <Card className="bg-gray-800/40 backdrop-blur-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group overflow-hidden rounded-3xl">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={e.primaryImage}
                          alt={`${e.title} in ${cityLabel}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading={idx < 3 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent" />
                        <div className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-white/90 text-xs">
                            <MapPin size={14} className="text-white/70" />
                            <span className="truncate">{cityLabel}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/90 text-xs">
                            <CalendarDays size={14} className="text-white/70" />
                            <span>{dateLabel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="text-lg font-bold text-white group-hover:text-pulse-pink transition-colors leading-snug">
                          {e.title}
                        </div>
                        <div className="text-sm text-gray-300 mt-2 line-clamp-2">{e.shortDescription}</div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-white font-extrabold">{e.price}</div>
                          <div className="text-xs uppercase tracking-wider text-[#38D1BF]">
                            {t("eventsLanding.featured.card_cta", "View details")}
                            <ArrowRight className="inline-block ml-1 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/events/cities">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95">
                {t("eventsLanding.featured.cta", "Discover events in your city")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <EventsTestimonials />

      {/* Landing FAQ (SEO/AEO) */}
      <EventsLandingFaqSection />

      {/* Final CTA */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/60 via-purple-900/35 to-gray-900/60 backdrop-blur-xl overflow-hidden">
            <div className="p-10 md:p-14 text-center relative">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-pulse-pink/20 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {t("eventsLanding.final.title", "Ready to show up with new friends?")}
                </h2>
                <p className="text-white/75 text-lg mt-3 max-w-2xl mx-auto">
                  {t(
                    "eventsLanding.final.subtitle",
                    "Pick a city, pick an event, and let Pulse do the awkward first step for you."
                  )}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/events/cities">
                    <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                      {t("eventsLanding.final.cta_primary", "Find events in your city")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/download">
                    <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                      {t("eventsLanding.final.cta_secondary", "Download Pulse")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
