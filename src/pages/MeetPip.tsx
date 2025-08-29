
import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, MessageSquare, Users, Calendar, MapPin, Coffee, CheckCircle, Database, Eye, Brain, PartyPopper, Flame, Repeat, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import AiIcebreakers from "@/components/AiIcebreakers";

const MeetPip = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: t("meet_pip.title", "Meet Pip | Your AI Connection Assistant | Pulse"),
      es: t("meet_pip.title", "Conoce a Pip | Tu Asistente de Conexión IA | Pulse")
    },
    description: {
      en: t("meet_pip.description", "Meet Pip, the AI that makes group connections effortless. Learn how Pip helps facilitate conversations and plan perfect meetups for your friend groups."),
      es: t("meet_pip.description", "Conoce a Pip, la IA que hace las conexiones grupales sin esfuerzo. Aprende cómo Pip ayuda a facilitar conversaciones y planificar encuentros perfectos para tus grupos de amigos.")
    },
    keywords: ["AI assistant", "Pip", "group chat", "conversation starter", "meetup planning", "artificial intelligence"],
    type: "website"
  };

  const pipFeatures = [
    {
      icon: <MessageSquare className="text-white h-6 w-6" />,
      title: t("meet_pip.features.conversation.title", "Conversation Starter"),
      description: t("meet_pip.features.conversation.description", "Pip breaks the ice with fun questions and topics that get everyone talking and sharing.")
    },
    {
      icon: <Calendar className="text-white h-6 w-6" />,
      title: t("meet_pip.features.planner.title", "Meetup Planner"),
      description: t("meet_pip.features.planner.description", "From finding the perfect time to suggesting activities, Pip makes planning effortless.")
    },
    {
      icon: <MapPin className="text-white h-6 w-6" />,
      title: t("meet_pip.features.expert.title", "Local Expert"),
      description: t("meet_pip.features.expert.description", "Pip knows your city and suggests the best spots for your group's interests and vibe.")
    },
    {
      icon: <Users className="text-white h-6 w-6" />,
      title: t("meet_pip.features.dynamics.title", "Group Dynamics"),
      description: t("meet_pip.features.dynamics.description", "Pip understands your group's personality and adapts suggestions to everyone's preferences.")
    },
    {
      icon: <Coffee className="text-white h-6 w-6" />,
      title: t("meet_pip.features.curator.title", "Activity Curator"),
      description: t(
        "meet_pip.features.curator.description",
        "Pip builds the plan itself, step by step: quick coffee at a local café, mini golf, then gelato to recap."
      )
    },
    {
      icon: <Heart className="text-white h-6 w-6" />,
      title: t("meet_pip.features.coach.title", "Connection Coach"),
      description: t(
        "meet_pip.features.coach.description",
        "Pip turns small talk into closeness with gentle check-ins, thoughtful callbacks, and little rituals."
      )
    }
  ];

  const pipExamples = [
    {
      scenario: t("meet_pip.examples.new_group", "New Group Chat"),
      pipResponse: "Hey everyone! 🎉 I'm Pip, your group's AI assistant. Let's start with a fun question: What's the most interesting thing that happened to you this week?"
    },
    {
      scenario: t("meet_pip.examples.planning", "Planning a Meetup"),
      pipResponse: "I noticed you're all free this Saturday! How about we explore that new art district downtown? I found a great coffee shop with outdoor seating perfect for group conversations ☕🎨"
    },
    {
      scenario: t("meet_pip.examples.energy", "Keeping Energy Up"),
      pipResponse: "This conversation is amazing! Since you're all into hiking, has anyone tried the new trail that opened up? I can share some details and we could plan a group adventure! 🥾"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue blur-xl opacity-30" />
                <img
                  src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png"
                  alt={t("meet_pip.hero.image_alt", "Pip, your AI friend")}
                  className="relative z-10 w-36 h-36 md:w-52 md:h-52 rounded-full object-cover border border-gray-700 shadow-2xl shadow-purple-500/20 bg-gray-900/30"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t("meet_pip.hero.full_title_prefix", "Meet Pip")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {t("meet_pip.hero.full_title_suffix", "Turning Group Chats Into Group Adventures")}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {t(
                "meet_pip.hero.description",
                "From the first hello to the final high-five, Pip keeps the fun flowing. They know your crew’s interests, suggest the perfect activities, and drop in daily games that turn small talk into big laughs."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* Meet Pip Module: Image + Content */}
      <section className="py-10 md:py-14 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/70 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1"
              >
                <div className="relative max-w-md mx-auto">
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue blur-2xl opacity-30" />
                  <motion.img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20in%20chair.png"
                    alt={t("meet_pip.module.image_alt", "Pip sitting in a chair")}
                    className="relative z-10 w-full rounded-3xl object-cover border border-gray-700 bg-gray-900/30 shadow-2xl shadow-purple-500/20"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
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
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
                  <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                  {t("meet_pip.module.badge", "Built to spark IRL connections")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span>{t("meet_pip.module.headline_prefix", "From “Nice to Meet You”")}</span>
                  <br />
                  <span>{t("meet_pip.module.headline_suffix", "To “See You Next Week”")}</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  {t(
                    "meet_pip.module.subcopy",
                    "Pip nudges your group from friendly chats to real plans with playful prompts and smart suggestions."
                  )}
                </p>

                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {[
                    { title: t("meet_pip.module.point1.title", "Ice Breakers"), text: t("meet_pip.module.point1", "Pip breaks the ice with fun icebreaker games") },
                    { title: t("meet_pip.module.point2.title", "No Awkward Lulls"), text: t("meet_pip.module.point2", "Removes the awkward silence and creates continous engagements") },
                    { title: t("meet_pip.module.point3.title", "Perfect Meetups"), text: t("meet_pip.module.point3", "Suggests the perfect meetups for the group to meet and bond over.") },
                    { title: t("meet_pip.module.point4.title", "See You Again"), text: t("meet_pip.module.point4", "Pushes the group to meet again so that real friendship can grow.") },
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${[
                        'from-pink-500 to-purple-600',
                        'from-blue-500 to-cyan-400',
                        'from-stone-500 to-rose-500',
                        'from-green-400 to-emerald-500',
                      ][idx % 4]}`}> 
                        <CheckCircle className="text-white" size={18} />
                      </div>
                      <p className="text-gray-200 leading-snug flex-1">
                        <span className="font-semibold text-white">{item.title}</span>
                        <span>: {item.text}</span>
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-6">
                  <a href="/" className="inline-block">
                    <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                      {t("meet_pip.module.cta", "Meet Your Crew")}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Spark Meaningful Conversations (customized for Meet Pip) */}
      <AiIcebreakers 
        heading1={t("meet_pip.icebreakers.heading1", "Meet Pip’s Party Crew")}
        heading2={t("meet_pip.icebreakers.heading2", "")}
        description={t(
          "meet_pip.icebreakers.description",
          "From awkward silence to inside jokes, these quirky characters drop into your chat with games that get everyone talking and laughing."
        )}
      />

      {/* Pip Friendship Formula (compact) */}
      <section className="py-10 md:py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("meet_pip.formula.title", "The Friendship Formula")}
            </h2>
            <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
              {t(
                "meet_pip.formula.subtitle",
                "Three simple truths Pip builds on to turn chats into real friendships."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                <div className="rounded-full bg-accent/90 p-2">
                  <Heart className="text-white" size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("meet_pip.formula.shared.title", "Shared Interests")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "meet_pip.formula.shared.desc",
                  "Plans built around what you care about make connection easy."
                )}
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                <div className="rounded-full bg-accent/90 p-2">
                  <Calendar className="text-white" size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("meet_pip.formula.irl.title", "IRL, Again and Again")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "meet_pip.formula.irl.desc",
                  "Friendship forms through repeat hangouts, and Pip makes sure they keep happening."
                )}
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
            >
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                <div className="rounded-full bg-accent/90 p-2">
                  <Zap className="text-white" size={18} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("meet_pip.formula.nudge.title", "A Little Nudge")}
              </h3>
              <p className="text-gray-300 text-sm">
                {t(
                  "meet_pip.formula.nudge.desc",
                  "Gentle prompts and playful ideas keep the momentum alive."
                )}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("meet_pip.features.title", "What Pip Does")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("meet_pip.features.description", "Pip is designed to make every group interaction more meaningful and every meetup more memorable.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipFeatures.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-gradient-to-r ${[
                      'from-pink-500 to-purple-600',
                      'from-blue-500 to-cyan-400',
                      'from-stone-500 to-rose-500',
                      'from-green-400 to-emerald-500',
                    ][index % 4]}`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Pip Knows What You Love */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Creative diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex items-center justify-center order-2 lg:order-1"
            >
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pulse-pink/20 via-accent/20 to-pulse-blue/20 blur-2xl" />
                {/* Orbits */}
                <div className="absolute inset-0 rounded-full border border-gray-700/60" />
                <div className="absolute inset-6 rounded-full border border-gray-700/40" />
                <div className="absolute inset-12 rounded-full border border-gray-700/30" />
                {/* Center Pip */}
                <div className="absolute inset-0 grid place-items-center">
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20chill.png"
                    alt={t("meet_pip.know.image_alt", "Pip avatar")}
                    className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-gray-700 bg-gray-900/40 shadow-lg shadow-purple-500/20"
                  />
                </div>
                {/* Chips around orbits */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-gray-800/70 border border-gray-700 rounded-full px-3 py-1 text-sm">
                    <Database size={16} className="text-accent" />
                    <span className="text-gray-200">{t("meet_pip.know.point1.short", "Millions of local events")}</span>
                  </div>
                </div>
                <div className="absolute top-1/2 -left-6 -translate-y-1/2">
                  <div className="flex items-center gap-2 bg-gray-800/70 border border-gray-700 rounded-full px-3 py-1 text-sm">
                    <Brain size={16} className="text-pulse-blue" />
                    <span className="text-gray-200">{t("meet_pip.know.point3.short", "AI social prediction")}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-gray-800/70 border border-gray-700 rounded-full px-3 py-1 text-sm">
                    <Eye size={16} className="text-pulse-pink" />
                    <span className="text-gray-200">{t("meet_pip.know.point2.short", "Understands your group signals")}</span>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-8 -translate-y-1/2">
                  <div className="flex items-center gap-2 bg-gray-800/70 border border-gray-700 rounded-full px-3 py-1 text-sm">
                    <Users size={16} className="text-emerald-400" />
                    <span className="text-gray-200">{t("meet_pip.know.point4.short", "Learns your group vibe")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                {t("meet_pip.know.badge", "Personalized by design")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("meet_pip.know.title", "How Pip Knows What You Love")}
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                {t(
                  "meet_pip.know.copy",
                  "Pip blends real‑world data with your group’s unique rhythm to suggest plans that actually fit."
                )}
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mt-0.5">
                    <Database size={18} className="text-white" />
                  </div>
                  <span className="text-gray-200">{t("meet_pip.know.point1", "Has access to millions of local events, venues, and IRL experiences.")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mt-0.5">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <span className="text-gray-200">{t("meet_pip.know.point2", "Sees everyone's public profile, interests, chat interactions, availability and other group signals.")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-stone-500 to-rose-500 flex items-center justify-center mt-0.5">
                    <Zap size={18} className="text-white" />
                  </div>
                  <span className="text-gray-200">{t("meet_pip.know.point3", "Uses AI for social prediction to suggest what will click.")}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                    <Users size={18} className="text-white" />
                  </div>
                  <span className="text-gray-200">{t("meet_pip.know.point4", "Learns and adapts to your group dynamic and each person’s style.")}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Repeat Meetups CTA: Make It A Ritual */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/70 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-3">
                  <PartyPopper size={16} className="text-pulse-pink" />
                  {t("meet_pip.repeat.badge", "Crew ritual")}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {t("meet_pip.repeat.title", "Make great hangs a weekly ritual")}
                </h2>
                <p className="text-gray-300 mb-5 max-w-xl">
                  {t(
                    "meet_pip.repeat.copy",
                    "Pip removes planning pain so your crew keeps meeting with ease."
                  )}
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-stone-500 to-rose-500 flex items-center justify-center mt-0.5">
                      <Calendar size={18} className="text-white" />
                    </div>
                    <span className="text-gray-200">{t("meet_pip.repeat.point1", "Finds a date that works for everyone")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                      <Repeat size={18} className="text-white" />
                    </div>
                    <span className="text-gray-200">{t("meet_pip.repeat.point2", "Keeps your streak alive")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mt-0.5">
                      <Flame size={18} className="text-white" />
                    </div>
                    <span className="text-gray-200">{t("meet_pip.repeat.point3", "Drops quick mini‑plans when the vibe is high")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center mt-0.5">
                      <Trophy size={18} className="text-white" />
                    </div>
                    <span className="text-gray-200">{t("meet_pip.repeat.point4", "Celebrates milestones and crew rituals")}</span>
                  </li>
                </ul>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <a href="/matchmaking" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95 transition">
                    {t("meet_pip.repeat.cta_primary", "Meet your crew")}
                  </a>
                  <a href="/" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-gray-700 text-white hover:bg-gray-800/50 transition">
                    {t("meet_pip.repeat.cta_secondary", "Browse ideas")}
                  </a>
                </div>
              </motion.div>

              {/* Image collage */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="relative max-w-xl mx-auto h-[460px] sm:h-[500px]">
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue blur-2xl opacity-30" />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20cooking%20friends.png"
                    alt="Pip cooking with friends"
                    className="absolute top-2 left-0 w-44 sm:w-48 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-[-3deg]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Pip%20paintball%20friends.png"
                    alt="Pip paintball with friends"
                    className="absolute top-6 right-0 w-44 sm:w-52 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-1"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Pip%20bowling%20friends.png"
                    alt="Pip bowling with friends"
                    className="absolute bottom-8 left-4 w-44 sm:w-52 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-1"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/golf%20pip.png"
                    alt="Pip golfing with friends"
                    className="absolute bottom-2 right-6 w-40 sm:w-48 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-[-2deg]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20skiing%20friends.png"
                    alt="Pip skiing with friends"
                    className="absolute top-20 left-1/4 w-40 sm:w-48 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-2 z-10"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20sailing%20friends.png"
                    alt="Pip sailing with friends"
                    className="absolute left-1/2 -translate-x-1/2 bottom-6 w-48 sm:w-56 rounded-2xl border border-gray-700 bg-gray-900/30 shadow-xl rotate-[-1deg] z-20"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MeetPip;
