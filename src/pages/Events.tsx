import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MessageSquare, Ticket, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FloatingActivityCollage from "@/components/FloatingActivityCollage";
import EventSignupHowItWorks from "@/components/EventSignupHowItWorks";
import EventsLandingFaqSection from "@/components/EventsLandingFaqSection";
import { getFeaturedEventImages } from "@/data/events";
import { EVENT_VIBES } from "@/data/eventVibes";
import { useTranslation } from "@/hooks/useTranslation";

export default function Events() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark");
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
        "Browse real events in your city. Pulse matches solo attendees into small group chats so you can meet before you arrive and avoid walking in alone."
      ),
      es: t(
        "eventsLanding.seo.description",
        "Explora eventos reales en tu ciudad. Pulse empareja a personas que van solas en chats grupales pequeños para que se conozcan antes de llegar."
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
                  {t("eventsLanding.hero.headline_focus", "Meet New Friends")}
                </span>
                <br />
                {t("eventsLanding.hero.headline_rest", "at Events Near You")}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                {t(
                  "eventsLanding.hero.copy",
                  "Pulse is for people going solo. Pick a real event in your city, get matched with a small group of other attendees, and meet in the app before you arrive."
                )}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/80 mb-7 md:mb-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <Ticket size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_1", "Book a real event")}
                </span>
                <span className="text-white/30 select-none">→</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <MessageSquare size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_2", "Meet your small group")}
                </span>
                <span className="text-white/30 select-none">→</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm">
                  <Users size={14} className="text-white/80" />
                  {t("eventsLanding.hero.flow_3", "Arrive with familiar faces")}
                </span>
              </div>

              <div className="text-sm text-white/70 mb-7 md:mb-8">
                {t(
                  "eventsLanding.hero.micro_trust",
                  "Friendship-first, not dating. Most people join solo."
                )}
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link to="/events/claymates-lekki-pottery">
                  <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                    {t("eventsLanding.hero.cta_primary", "Explore events")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
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
              {t("eventsLanding.what.title_prefix", "A real event")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}
                {t("eventsLanding.what.title_focus", "plus the social layer")}
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              {t(
                "eventsLanding.what.subtitle",
                "The venue or organizer runs the event. Pulse helps you meet the right people before it starts."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                icon: Ticket,
                title: t("eventsLanding.what.card1_title", "Book something you'd actually choose"),
                body: t(
                  "eventsLanding.what.card1_body",
                  "Concerts, trivia, classes, dinners, and nights out you would want to attend even without Pulse."
                ),
                accent: "from-pink-500 to-purple-600",
              },
              {
                icon: MessageSquare,
                title: t("eventsLanding.what.card2_title", "Get matched before you go"),
                body: t(
                  "eventsLanding.what.card2_body",
                  "After booking, we place you in a small chat with other solo attendees going to that same event."
                ),
                accent: "from-blue-500 to-cyan-400",
              },
              {
                icon: CalendarDays,
                title: t("eventsLanding.what.card3_title", "Walk in knowing someone"),
                body: t(
                  "eventsLanding.what.card3_body",
                  "The goal is simple: make the first hello easier, coordinate arrival, and show up with familiar faces instead of walking in cold."
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
              {t("eventsLanding.vibes.title_prefix", "Choose the kind of")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}
                {t("eventsLanding.vibes.title_focus", "energy you want")}
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              {t(
                "eventsLanding.vibes.subtitle",
                "Start with an event style that matches how you like to meet people: conversation-first, activity-first, or lively and social."
              )}
            </p>
            <p className="text-sm text-white/60 mt-3 max-w-2xl mx-auto">
              {t(
                "eventsLanding.vibes.helper",
                "Good first-event picks usually give you something to do or talk about together right away."
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
                  <Card className="relative overflow-hidden rounded-3xl border border-gray-700 bg-gray-900/35 backdrop-blur-xl">
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
                      <div className="mt-4">
                        <div className="text-[11px] uppercase tracking-wider text-white/70">
                          {t("eventsLanding.vibes.best_for", "Good if you want")}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {v.chips.slice(0, 3).map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-xs text-white/80"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
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
                  {t("eventsLanding.final.title", "Ready to meet new friends at events near you?")}
                </h2>
                <p className="text-white/75 text-lg mt-3 max-w-2xl mx-auto">
                  {t(
                    "eventsLanding.final.subtitle",
                    "Go solo, have fun, and leave with new friends. Pulse helps you meet people before the event, so showing up feels easy."
                  )}
                </p>
                <p className="text-sm text-white/60 mt-4 max-w-2xl mx-auto">
                  {t(
                    "eventsLanding.final.note",
                    "Explore the event, book your spot, and we'll open your group chat when it's ready."
                  )}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/events/claymates-lekki-pottery">
                    <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                      {t("eventsLanding.final.cta_primary", "Explore events")}
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
