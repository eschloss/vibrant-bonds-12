import React, { lazy, Suspense } from "react";
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
  Repeat,
  MapPin,
  Users,
  CalendarDays,
  Timer,
} from "lucide-react";
import Defer from "@/components/ui/Defer";
const HowItWorksModule = lazy(() => import("@/components/HowItWorks"));
const ActivitiesTeaser = lazy(() => import("@/components/ActivitiesTeaser"));
const MissionCountdown = lazy(() => import("@/components/MissionCountdown"));
import FAQItem from "@/components/FAQItem";

const HowItWorks = () => {
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();

  const seoProps = {
    title: {
      en: t("how_it_works_page.title", "How Pulse Works | Meet Your Crew, Make It A Ritual"),
      es: t("how_it_works_page.title", "Cómo funciona Pulse | Conoce tu grupo, hazlo ritual")
    },
    description: {
      en: t("how_it_works_page.description", "Six simple steps: take the vibe test, get matched, break the ice, let Pip guide, meet up, repeat."),
      es: t("how_it_works_page.description", "Seis pasos simples: test de vibra, emparejamiento, rompehielos, guía de Pip, quedada, repetir.")
    },
    keywords: ["how it works", "vibe test", "matching", "group chat", "Pip", "meetups"],
    type: "website"
  };

  // interactive hero motion values (mouse spotlight)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(260px 260px at ${mx}px ${my}px, rgba(255,255,255,0.12), transparent 60%)`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero with full-background image, Ken Burns, and mouse-follow spotlight */}
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
        {/* Background image with Ken Burns */}
        <motion.img
          src="https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/vitaly-gariev-iqr2NaFrCKE-unsplash.jpg"
          alt={t("hiw.hero.image_alt", "Friends laughing at sunset")}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Color overlays for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(116,26,221,0.35),transparent),radial-gradient(50%_40%_at_90%_60%,rgba(56,209,191,0.25),transparent)]" />
        {/* Strengthened readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Centered vignette behind headline for extra contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_30%,rgba(0,0,0,0.45),transparent)]" />
        {/* Mouse-follow spotlight overlay */}
        <motion.div style={{ backgroundImage: spotlight }} className="absolute inset-0 pointer-events-none mix-blend-overlay" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Removed hero pill badge */}
            <h1 className="text-5xl md:text-6xl font-bold leading-none md:leading-none mb-3 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">
              <span>{t("hiw.hero.title.prefix", "How to ")}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {t("hiw.hero.title.gradient", "Meet New Friends")}
              </span>
              <span>{t("hiw.hero.title.suffix", " with Pulse")}</span>
            </h1>
            <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              {t(
                "how_it_works_page.hero.subtitle",
                "A clear path from strangers in a chat to friends you see every week."
              )}
            </p>
            {/* Removed hero chips per request */}
            <a href={addRefToUrl("/matchmaking")}>
              <Button className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95">
                {t("how_it_works_page.cta", "Meet your crew")}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Reuse the exact How It Works module from the index page */}
      <Defer>
        <Suspense fallback={null}>
          <HowItWorksModule />
        </Suspense>
      </Defer>

      {/* Removed steps grid; focusing on detailed modules */}

      {/* 1. Get Matched Module */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1"
              >
                {/* removed badge per request */}
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("hiw.matched.title", "Get Matched")}
                </h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">
                  {t("hiw.matched.subtitle", "Take a 1‑minute vibe test and we'll spin up a small group chat with local people in your city who fit your interests and schedule.")}
                </p>
                
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: ClipboardList, text: t("hiw.matched.point1", "Interests, availability, neighborhoods and budget") },
                    { icon: Users, text: t("hiw.matched.point2", "Crew of 10 locals with shared vibes") },
                    { icon: MessageSquare, text: t("hiw.matched.point3", "One Group Chat to break the ice and plan the meetup") },
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
              {/* Visual - Group Chat Screenshot */}
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
                      src="https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/capybaras.jpg"
                      alt={t("hiw.matched.chat_preview_alt", "Group chat preview showing matched members")}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-3 border border-gray-700/50">
                        <p className="text-white font-medium text-sm mb-1">{t("hiw.matched.chat_preview_label", "Your crew is ready!")}</p>
                        <p className="text-gray-300 text-xs">{t("hiw.matched.chat_preview_desc", "Meet your matched group and start planning")}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Break The Ice Module */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
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
                  src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20in%20chair.png"
                  alt={t("hiw.break.pip_image_alt", "Pip encouraging the group chat")}
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

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              {/* removed badge per request */}
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t("steps.break_ice.title", "Break the Ice")}
              </h2>
              <p className="text-lg text-gray-300 mb-6 max-w-xl">
                {t("hiw.break.desc", "Say hi, play quick icebreakers, and watch Pip suggest relevant activities and times as your chat unfolds.")}
              </p>

              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  { icon: MessageSquare, text: t("hiw.break.point1", "Fun starters to get everyone talking") },
                  { icon: Sparkles, text: t("hiw.break.point2", "Pip suggests activities that match the chat") },
                  { icon: CalendarDays, text: t("hiw.break.point3", "Quick polls and time suggestions to lock plans") },
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

      {/* 3. Just Show Up (adventures teaser) */}
      <Defer>
        <Suspense fallback={null}>
          <ActivitiesTeaser
            title="steps.meet_up.title"
            subtitle="hiw.justshow.subtitle"
            ctaHref="/activities"
            ctaLabel="hiw.adventures.cta"
            itemsCount={8}
            headlineClassName="text-4xl md:text-5xl font-bold mb-4"
          />
        </Suspense>
      </Defer>

      {/* 4. Keep It Going Module */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Visual */}
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
                    src="https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/vitaly-gariev-7k2EkNAf4gw-unsplash%20(1).jpg"
                    alt={t("hiw.repeat.image_alt", "Friends keeping the streak alive")}
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

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2"
              >
                {/* removed badge per request */}
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {t("steps.grow_friendships.title", "Keep It Going")}
                </h2>
                <p className="text-lg text-gray-300 mb-6 max-w-xl">
                  {t("how_it_works_page.steps.repeat.desc", "Pip follows up so meeting again becomes your crew's weekly ritual.")}
                </p>

                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: Repeat, text: t("how_it_works_page.repeat.points.1", "Plan the next hang while the energy's high") },
                    { icon: Users, text: t("how_it_works_page.repeat.points.2", "Build familiarity that turns into friendship") },
                    { icon: Sparkles, text: t("how_it_works_page.repeat.points.3", "Low-lift planning every time") },
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
                  <a href={addRefToUrl("/matchmaking")}>
                    <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                      {t("how_it_works_page.cta", "Meet your crew")}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed Your 7‑day journey timeline per request */}

      {/* How It Works – FAQ */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t("hiw.faq.title", "How It Works – FAQ")}</h2>
            <p className="text-gray-300">{t("hiw.faq.subtitle", "Everything you need to know to start meeting new friends.")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What is Pulse?",
                a: "Pulse is a free mobile app that helps you make real-life friends in your city. It matches you with a small group of locals who share your vibe and brings everyone together in a group chat hosted by Pip, our friendly AI penguin.",
              },
              {
                q: "How does Pulse work?",
                a: "Pulse helps you make real-life friends in your city. You’ll take a quick vibe test, get matched with up to 10 locals who share your interests, and join a group chat hosted by Pip, our friendly AI penguin. Your crew starts a 10-day mission to plan a meetup. Once half the group RSVP, the mission activates — and every time you meet, it automatically extends, keeping your momentum high.",
              },
              {
                q: "What kinds of activities do crews do together?",
                a: "Every crew is different — some meet for coffee, brunch, or trivia nights, while others go kayaking, hiking, pottery painting, or karaoke. Pip suggests ideas that fit your group’s shared vibe, schedule, and budget — from low-key hangs to more adventurous plans.",
              },
              {
                q: "What’s the vibe test?",
                a: "It’s a one-minute quiz about your interests, personality, schedule, and budget. It helps us understand your social vibe — so we can match you with people who click naturally, not randomly.",
              },
              {
                q: "How does matching work?",
                a: "Pulse uses a mathematical matching algorithm to find the people you’re statistically closest to in vibe and lifestyle. It’s social chemistry, powered by data. Every week, new crews form based on who’s active in your city and who fits your profile best.",
              },
              {
                q: "Do you match people based on identity or interests?",
                a: "Yes — Pulse creates sub-communities in each city. Depending on the city, we currently offer specific matches for Queer People and Expats. As our userbase grows, we intend to include more subgroups to make it even easier for you to find people you click with.",
              },
              {
                q: "How does the 10 day mission work?",
                a: "Each crew gets a 10-day countdown to plan and commit to one real-life hangout. Once 50% RSVP, the mission is successful and automatically extends so you can keep planning the next hang while everyone’s still excited. Many crews evolve into weekly or biweekly rituals.",
              },
              {
                q: "What if my crew doesn’t click?",
                a: "No stress. Pip will keep the chat lively, suggest activities, and help things move along — but if the vibe feels off to you, you don’t need to show up for the meetup. You can always join another group after the initial 10 day mission is over.",
              },
              {
                q: "Who is Pip?",
                a: "Pip is your AI host and ice-breaker. Pip introduces everyone, sparks conversation, suggests fun local plans, and celebrates wins when your crew meets. Think of Pip as the friendly organizer who keeps everyone connected.",
              },
              {
                q: "How does Pulse keep things safe?",
                a: "We focus on small-group meetups in public places. You control what you share and can leave a crew anytime. Our community guidelines, report tools, and quick moderation keep spaces safe, positive, and inclusive.",
              },
              {
                q: "Is Pulse free?",
                a: "Yes — completely free to use. Many crews choose free plans like hikes, picnics, or trivia nights. Others explore local partner activities like bowling, pottery, or paddle-boarding. Your vibe test budget ensures you’re matched with people who spend like you.",
              },
              {
                q: "Is this a dating app?",
                a: "Not really — Pulse is about community, friendship, and shared experiences. Most people join to make new friends or find their crowd. But real life is full of surprises, and sometimes connections turn into something more.",
              },
              {
                q: "What happens after the first meetup?",
                a: "When your crew meets, Pip keeps the chat open and your mission extends. New plans appear, the group energy stays high, and hangouts often turn into regular meetups. That’s when strangers start feeling like friends.",
              },
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 7 Day Mission to Meet IRL */}
      <Defer>
        <Suspense fallback={null}>
          <MissionCountdown showLabel={false} />
        </Suspense>
      </Defer>

      <Footer />
    </div>
  );
};

export default HowItWorks;


