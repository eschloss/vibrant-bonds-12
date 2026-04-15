import React, { lazy, Suspense, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import { useRefParam } from "@/hooks/useRefParam";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  MessageSquare,
  Sparkles,
  MapPin,
  Users,
  CalendarDays,
} from "lucide-react";
import Defer from "@/components/ui/Defer";
const HowItWorksEventsModule = lazy(() => import("@/components/HowItWorksEvents"));
const ActivitiesTeaser = lazy(() => import("@/components/ActivitiesTeaser"));
import FAQItem from "@/components/FAQItem";

const HowItWorksEvents = () => {
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();

  const seoProps = {
    title: {
      en: t("hiw_events_page.title", "How to Meet New Friends with Pulse Events"),
      es: t("hiw_events_page.title", "Cómo funcionan los eventos Pulse | Conocer gente")
    },
    description: {
      en: t("hiw_events_page.description", "Book a ticket, take a short vibe test, and join your group’s Pulse chat before the day. Walk into the experience already knowing people—your chat opens ahead of time to break the ice and plan around what you booked, with optional extras before or after if the group wants them."),
      es: t("hiw_events_page.description", "Reserva entrada, haz un test de vibra corto y únete al chat de tu grupo antes del día. Entra a la experiencia ya habiendo conocido a gente: el chat se abre con antelación para romper el hielo y coordinar la logística alrededor de la experiencia reservada, con extras opcionales antes o después si el grupo quiere.")
    },
    keywords: ["Pulse events", "how it works", "vibe test", "matching", "group chat", "Pip", "meetup"],
    type: "website"
  };

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(260px 260px at ${mx}px ${my}px, rgba(255,255,255,0.12), transparent 60%)`;

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      let attempts = 0;
      const maxAttempts = 15;

      const scrollToElement = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      const tryScroll = () => {
        if (scrollToElement()) {
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryScroll, attempts < 5 ? 200 : 300);
        }
      };

      setTimeout(tryScroll, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      <section
        className="pt-28 md:pt-32 pb-10 relative overflow-hidden"
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
        }}
        onMouseLeave={() => {
          mx.set(-9999);
          my.set(-9999);
        }}
      >
        <motion.img
          src="https://s.kikiapp.eu/img/peoplehero.webp"
          alt={t("hiw_events.hero.image_alt", "People enjoying a shared experience at an event")}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(116,26,221,0.35),transparent),radial-gradient(50%_40%_at_90%_60%,rgba(56,209,191,0.25),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_30%,rgba(0,0,0,0.45),transparent)]" />
        <motion.div style={{ backgroundImage: spotlight }} className="absolute inset-0 pointer-events-none mix-blend-overlay" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] flex flex-col items-center">
              <span className="whitespace-nowrap">
                <span className="inline">{t("hiw_events.hero.title.prefix", "How to ")}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  {t("hiw_events.hero.title.gradient", "Meet New Friends")}
                </span>
              </span>
              <span className="whitespace-nowrap">
                <span className="inline">{t("hiw_events.hero.title.mid", " with ")}</span>
                {t("hiw_events.hero.title.brand", "Pulse Events")}
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] whitespace-pre-line leading-snug sm:leading-relaxed">
              {t(
                "hiw_events_page.hero.subtitle",
                "Come solo. We match you into a small group before the event\nso you arrive already knowing people."
              )}
            </p>
            <a href={addRefToUrl("/events/cities")}>
              <Button className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95">
                {t("hiw_events_page.cta", "Browse events")}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Defer>
        <Suspense fallback={null}>
          <HowItWorksEventsModule />
        </Suspense>
      </Defer>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("hiw_events.matched.title", "Matched for this exact event")}
                </h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">
                  {t("hiw_events.matched.subtitle", "Take a 1‑minute vibe test so we can match you with other solo attendees going to the same showing—people who fit your energy, not random locals—then add you to a group chat together.")}
                </p>

                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: ClipboardList, text: t("hiw_events.matched.point1", "What you care about, when you’re free, and the kind of group energy you want") },
                    { icon: Users, text: t("hiw_events.matched.point2", "Small matched groups—often around six, sometimes roughly four to ten—all for the same date, time, and venue") },
                    { icon: MessageSquare, text: t("hiw_events.matched.point3", "Group chat opens ahead of time—break the ice and coordinate before you’re at the venue") },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${[
                        'from-pink-500 to-purple-600',
                        'from-blue-500 to-cyan-400',
                        'from-stone-500 to-rose-500',
                      ][idx % 3]}`}>
                        <item.icon className="text-white" size={18} />
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1">{item.text}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2"
              >
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 blur-2xl opacity-30" />
              <motion.div
                    className="relative rounded-3xl overflow-hidden border border-gray-700 shadow-2xl shadow-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                      src="https://s.kikiapp.eu/img/Capybaras.webp"
                      alt={t("hiw_events.matched.chat_preview_alt", "Group chat preview for an event crew")}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-3 border border-gray-700/50">
                        <p className="text-white font-medium text-sm mb-1">{t("hiw_events.matched.chat_preview_label", "Your group for this event")}</p>
                        <p className="text-gray-300 text-xs">{t("hiw_events.matched.chat_preview_desc", "Say hi before you’re in the same room")}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-400 blur-2xl opacity-30" />
                <motion.img
                  src="https://s.kikiapp.eu/img/pip/pipinchair.webp"
                  alt={t("hiw_events.break.pip_image_alt", "Pip encouraging the group chat")}
                  className="relative z-10 w-full rounded-3xl object-cover border border-gray-700 bg-gray-900/30 shadow-2xl shadow-blue-500/20"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  loading="lazy"
                  decoding="async"
                  initial={{ y: 8, rotate: -1 }}
                  whileInView={{ y: [8, 0, 8] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("hiw_events.steps.break_ice.title", "Break the ice")}
              </h2>
              <p className="text-lg text-gray-300 mb-6 max-w-xl">
                {t("hiw_events.break.desc", "Your group chat opens ahead of time—say hi, use a quick icebreaker, and sort arrival and timing so you can plan around the experience before doors open.")}
              </p>

              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  { icon: MessageSquare, text: t("hiw_events.break.point1", "Starters that turn “nice to meet you” into real conversation") },
                  { icon: Sparkles, text: t("hiw_events.break.point2", "Light help nailing logistics—where to meet, when to line up") },
                  { icon: CalendarDays, text: t("hiw_events.break.point3", "Optional polls for extras around the event—only if people want them") },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <item.icon className="text-white" size={18} />
                    </div>
                    <p className="text-gray-200 leading-relaxed flex-1">{item.text}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Defer>
        <Suspense fallback={null}>
          <ActivitiesTeaser
            title="hiw_events.teaser.title"
            subtitle="hiw_events.teaser.subtitle"
            ctaHref={addRefToUrl("/events/cities")}
            ctaLabel="hiw_events.teaser.cta"
            itemsCount={8}
            headlineClassName="text-4xl md:text-5xl font-bold mb-4"
          />
        </Suspense>
      </Defer>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1"
              >
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 blur-2xl opacity-30" />
                  <motion.img
                    src="https://s.kikiapp.eu/img/friendsatbbq.webp"
                    alt={t("hiw_events.repeat.image_alt", "Friends chatting after an event")}
                    className="relative z-10 w-full rounded-3xl object-cover border border-gray-700 bg-gray-900/30 shadow-2xl shadow-indigo-500/20"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                    loading="lazy"
                    decoding="async"
                    initial={{ y: 8, rotate: -1 }}
                    whileInView={{ y: [8, 0, 8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("hiw_events.repeat.title", "Afterward—only if you want more")}
                </h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">
                  {t("hiw_events.repeat.desc", "The experience you booked is the anchor—the same story as on every event page. After that, keep it easy: optional hangouts, or just stay in chat if you clicked.")}
                </p>

                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: MapPin, text: t("hiw_events.repeat.points.1", "Coffee before or food after—only if the group is into it") },
                    { icon: Users, text: t("hiw_events.repeat.points.2", "Small groups keep names, plans, and conversations manageable in busy venues") },
                    { icon: Sparkles, text: t("hiw_events.repeat.points.3", "No homework for a second hang—the night out already gave you common ground") },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                    >
                      <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center">
                        <item.icon className="text-white" size={18} />
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1">{item.text}</p>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-6">
                  <a href={addRefToUrl("/events/cities")}>
                    <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                      {t("hiw_events_page.cta", "Browse events")}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("hiw_events.faq.title", "Pulse Events – FAQ")}</h2>
            <p className="text-gray-300">{t("hiw_events.faq.subtitle", "Matching, group size, and what Pulse adds.")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: t("hiw_events.faq.events_pulse.q", "What does Pulse add to an event?"), a: t("hiw_events.faq.events_pulse.a", "The host still runs the experience. Pulse matches you with other solo attendees going to the same showing—typically around six people, though groups can land anywhere from about four to ten—and your group chat opens ahead of time with Pip so you can break the ice and plan around the event before you arrive.") },
              { q: t("hiw_events.faq.matching.q", "How does matching work for events?"), a: t("hiw_events.faq.matching.a", "After you book, a short vibe test helps us place you with others attending that same date and venue who fit your style. You’re matched for that event, not a generic city pool.") },
              { q: t("hiw_events.faq.group_size.q", "How big is my group?"), a: t("hiw_events.faq.group_size.a", "Most groups settle around six people, but it flexes with demand—think roughly four to ten. We keep it small on purpose so you can remember names and actually coordinate.") },
              { q: t("hiw_events.faq.prepost.q", "Do I have to do a pre or post meetup?"), a: t("hiw_events.faq.prepost.a", "No. Some groups grab coffee or food around the event; many just meet at the ticketed experience. Totally optional.") },
              { q: t("hiw_events.faq.vibe.q", "What is the vibe test?"), a: t("hiw_events.faq.vibe.a", "A fast quiz about interests and the kind of group you want to be in. We use it to match you with people headed to the same event—not a personality label for its own sake.") },
              { q: t("hiw_events.faq.pip.q", "Who is Pip?"), a: t("hiw_events.faq.pip.a", "Pip is your AI host in the group chat—icebreakers, gentle structure, and nudges so the group feels ready before you’re in the same room.") },
              { q: t("hiw_events.faq.cost.q", "Is Pulse free? What about tickets?"), a: t("hiw_events.faq.cost.a", "Pulse matching and the group chat are free. You pay the organizer for the ticket or experience the same way you would without Pulse.") },
              { q: t("hiw_events.faq.safety.q", "How do you keep this safe?"), a: t("hiw_events.faq.safety.a", "We focus on small groups and public settings. You control your schedule and can leave the chat anytime. Reporting and community guidelines help keep experiences positive.") },
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksEvents;
