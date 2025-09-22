import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Sparkles, Heart, Calendar, Database, Eye, Brain, MessageSquare, Zap, Timer } from "lucide-react";
import MissionCountdown from "@/components/MissionCountdown";
import FloatingActivityCollage from "@/components/FloatingActivityCollage";

// Import Pip activity images
import pipSurfing from "@/assets/pip-surfing.png";
import pipVolleyball from "@/assets/pip-volleyball.png";
import pipCamping from "@/assets/pip-camping.png";
import pipPilates from "@/assets/pip-pilates.png";
import pipBookclub from "@/assets/pip-bookclub.png";
import pipPottery from "@/assets/pip-pottery.png";
import pipEscapeRoom from "@/assets/pip-escape-room.png";

// Additional activity images (added by user in public/lovable-uploads)
// Using public paths so bundler doesn't need imports
const pipTennis = "/lovable-uploads/38e3c054-e0e0-4011-bd40-d167b312c66d.png";
const pipArcade = "/lovable-uploads/c8835787-8f77-40c7-9df3-f0f092e43f1d.png";
const pipWine = "/lovable-uploads/41aeb601-a150-497b-bf78-4174c5e9ed71.jpg";
const pipMeditation = "/lovable-uploads/571fb6ca-bde5-463d-abd8-02269d300648.png";
const pipScavenger = "/lovable-uploads/4511f010-fca9-4375-992c-dba8555e7191.png";
const pipPickleball = "/lovable-uploads/8e380861-65d4-4d89-96b3-2de89a3e831c.png";
const pipSoccer = "/lovable-uploads/a26a7983-2c55-4dca-8d85-5b0d8154c5a8.jpg";
const pipGardening = "/lovable-uploads/bd8cf463-4a58-4a21-8681-90c958baf08a.jpg";
const pipClimbing = "/lovable-uploads/aa5d117e-d012-4bcd-b7b6-09b64d034f78.png";

const Activities = () => {
  const { t } = useTranslation();

  const seoProps = {
    title: {
      en: "Group Activities & Experiences | Pulse - Find Your Crew",
      es: "Actividades Grupales y Experiencias | Pulse - Encuentra Tu Grupo"
    },
    description: {
      en: "Discover amazing group activities curated by Pip. From surfing to book clubs, join matched crews for unforgettable experiences that build lasting friendships.",
      es: "Descubre increíbles actividades grupales curadas por Pip. Desde surf hasta clubes de lectura, únete a grupos compatibles para experiencias inolvidables."
    },
    keywords: ["group activities", "social experiences", "friendship building", "outdoor adventures", "creative workshops", "team activities"]
  };

  // SEO will be handled by Seo component

  // Activity categories for themed sections
  const activityCategories = [
    {
      title: "Outdoor Adventures",
      description: "Connect through shared challenges and natural beauty",
      color: "from-green-500 to-blue-500",
      activities: [
        { id: "surfing", name: "Beach & Water", image: pipSurfing, vibe: "Adventurous" },
        { id: "camping", name: "Camping", image: pipCamping, vibe: "Peaceful" },
        { id: "climbing", name: "Rock Climbing", image: pipClimbing, vibe: "Thrilling" },
        { id: "scavenger", name: "Scavenger Hunt", image: pipScavenger, vibe: "Playful" },
        { id: "gardening", name: "Gardening", image: pipGardening, vibe: "Wholesome" },
      ]
    },
    {
      title: "Creative & Social",
      description: "Express yourselves and enjoy great company",
      color: "from-purple-500 to-pink-500",
      activities: [
        { id: "bookclub", name: "Book Clubs", image: pipBookclub, vibe: "Thoughtful" },
        { id: "pottery", name: "Arts & Crafts", image: pipPottery, vibe: "Creative" },
        { id: "wine", name: "Wine Tasting", image: pipWine, vibe: "Chill" },
        { id: "arcade", name: "Arcade Night", image: pipArcade, vibe: "Nostalgic" },
        { id: "escape-room", name: "Escape Room", image: pipEscapeRoom, vibe: "Strategic" }
      ]
    },
    {
      title: "Wellness & Social",
      description: "Build bonds while taking care of your mind and body",
      color: "from-pink-500 to-orange-500",
      activities: [
        { id: "pilates", name: "Pilates", image: pipPilates, vibe: "Mindful" },
        { id: "meditation", name: "Meditation", image: pipMeditation, vibe: "Calm" },
        { id: "tennis", name: "Tennis", image: pipTennis, vibe: "Active" },
        { id: "pickleball", name: "Pickleball", image: pipPickleball, vibe: "Casual" },
        { id: "soccer", name: "Soccer", image: pipSoccer, vibe: "Team Fun" }
      ]
    }
  ];

  // All activities for the hero collage
  const allActivities = [
    { id: "surfing", name: "Surfing", image: pipSurfing, position: "top-10 left-10", rotation: "-rotate-3", size: "w-32 h-32", zIndex: "z-20" },
    { id: "volleyball", name: "Volleyball", image: pipVolleyball, position: "top-20 right-20", rotation: "rotate-6", size: "w-28 h-28", zIndex: "z-10" },
    { id: "camping", name: "Camping", image: pipCamping, position: "top-32 left-1/2 -translate-x-1/2", rotation: "-rotate-2", size: "w-36 h-36", zIndex: "z-30" },
    { id: "pilates", name: "Pilates", image: pipPilates, position: "bottom-32 left-16", rotation: "rotate-3", size: "w-30 h-30", zIndex: "z-15" },
    { id: "bookclub", name: "Book Club", image: pipBookclub, position: "bottom-20 right-10", rotation: "-rotate-6", size: "w-32 h-32", zIndex: "z-25" },
    { id: "pottery", name: "Pottery", image: pipPottery, position: "top-1/2 left-8 -translate-y-1/2", rotation: "rotate-12", size: "w-28 h-28", zIndex: "z-5" },
    { id: "escape-room", name: "Escape Room", image: pipEscapeRoom, position: "top-1/2 right-8 -translate-y-1/2", rotation: "-rotate-12", size: "w-30 h-30", zIndex: "z-15" }
  ];
  // Flattened list for unified gallery (no categories) – using provided Supabase image URLs
  const activitiesList = [
    { id: "arcade", name: "Arcade", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/arcade.png" },
    { id: "board-games", name: "Board Games", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/board_game.png" },
    { id: "cycling", name: "Cycling", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/cycling.png" },
    { id: "escape-rooms", name: "Escape Rooms", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/escape_rooms.png" },
    { id: "gardening", name: "Gardening", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/gardening.png" },
    { id: "golf", name: "Golf", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/golf.png" },
    { id: "hiking", name: "Hiking", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/hiking.png" },
    { id: "pilates", name: "Pilates", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Pilates.png" },
    { id: "pottery", name: "Pottery", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pottery.png" },
    { id: "rock-climbing", name: "Rock Climbing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/rock_climbing.png" },
    { id: "scavenger-hunt", name: "Scavenger Hunt", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/scavenger_hunt.png" },
    { id: "surfing", name: "Surfing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Surfing.png" },
    { id: "tennis", name: "Tennis", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/tennis.png" },
    { id: "wine-tasting", name: "Wine Tasting", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/wine_tasting.png" },
    { id: "yoga", name: "Yoga", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/yoga.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        {/* Collage behind, wrapping the centered content */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ WebkitMaskImage: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 220px, rgba(0,0,0,1) 500px)', maskImage: 'radial-gradient(circle at 50% 40%, rgba(0,0,0,0) 0, rgba(0,0,0,0) 220px, rgba(0,0,0,1) 500px)' }}
        >
          <FloatingActivityCollage
            items={[
              { id: "surfing", img: pipSurfing, alt: "Pip surfing" },
              { id: "volleyball", img: pipVolleyball, alt: "Pip playing beach volleyball" },
              { id: "camping", img: pipCamping, alt: "Pip camping" },
              { id: "pilates", img: pipPilates, alt: "Pip pilates" },
              { id: "bookclub", img: pipBookclub, alt: "Pip book club" },
              { id: "pottery", img: pipPottery, alt: "Pip pottery" },
              { id: "escape-room", img: pipEscapeRoom, alt: "Pip escape room" },
            ]}
            density={7}
            floatRange={6}
            stagger={0.14}
            parallax={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="text-center px-1 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                Curated by Pip
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                Your Crew's Next
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  Epic Adventure
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
                Every crew gets a 7‑day mission: plan an unforgettable experience together. 
                From beach days to workshops, Pip curates activities that fit your vibe and spark friendships.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                  Get Matched to Your Crew
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Activity Collage */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Activities That Build 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Real Bonds</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A few favorites from millions of events worldwide—find even more in your city.
            </p>
          </motion.div>

          {/* Removed the temporary static grid collage for a cleaner hero experience */}

          {/* Unified activities gallery (no category wrappers) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {activitiesList.map((activity, idx) => (
              <motion.div
                key={`${activity.id}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 5) * 0.06 }}
                className="group"
              >
                <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900/30 hover:border-accent/40 transition-colors">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={activity.image}
                      alt={`Pip enjoying ${activity.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="inline-block bg-black/60 text-white px-2 py-1 rounded text-[11px] font-medium border border-white/10">
                        {activity.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/cities">
              <Button size="lg" className="group bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90 mb-4">
                Meet Your Crew
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-gray-400">
              87% of crews meet within 2 weeks of being matched
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Pip Knows What You Love (reused module from Meet Pip) */}
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

              <div className="mt-7">
                <Link to="/meet-pip" className="inline-block">
                  <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95">
                    Meet Pip
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof & Benefits (upgraded) */}
      <section className="py-14 md:py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-1/3 w-80 h-80 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/60 border border-gray-700/70 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                Built for real connection
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                Why Shared Experiences Create
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Lasting Bonds</span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                When people do something meaningful together, walls drop, stories emerge, and momentum builds.
              </p>
            </motion.div>

            {/* Stats strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8">
              {[{
                kpi: '2.1×', label: 'faster sense of closeness'
              }, {
                kpi: '78%', label: 'plan a second hangout'
              }, {
                kpi: '94%', label: 'feel more comfortable IRL'
              }].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-white">{s.kpi}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Benefits cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              {[{
                title: 'Break Down Barriers Fast',
                copy: "Shared challenges and new experiences dissolve social anxiety so conversation flows naturally.",
                icon: <Sparkles className="text-white" size={18} />,
                gradient: 'from-pink-500 to-purple-600'
              }, {
                title: 'Create Inside Jokes',
                copy: 'Those “remember when” moments become the foundation of friendship and future plans.',
                icon: <Heart className="text-white" size={18} />,
                gradient: 'from-blue-500 to-cyan-400'
              }, {
                title: 'See Real Personalities',
                copy: 'Activities reveal the problem-solver, the encourager, the comedian—authentic connection forms.',
                icon: <MessageSquare className="text-white" size={18} />,
                gradient: 'from-green-400 to-emerald-500'
              }].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="group rounded-2xl border border-gray-700 bg-gray-900/40 p-6 hover:border-accent/40 transition-all hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <div className={`mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r ${c.gradient} p-[2px]`}> 
                    <div className="rounded-full bg-gray-900 p-2">
                      {c.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{c.copy}</p>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8 md:mt-10 rounded-2xl border border-gray-700 bg-gray-900/50 p-5 text-center"
            >
              <p className="text-gray-200 text-sm md:text-base max-w-3xl mx-auto">
                “Our pottery night turned into weekly coffee. Doing something together made it effortless to keep meeting.”
              </p>
              <div className="text-gray-400 text-xs mt-2">— Sarah, matched in Austin</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-14 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Story Together?</span>
            </h2>
            
            <p className="text-gray-300 mb-6">
              Your crew is waiting. Your next favorite memory is one activity away. 
              Let Pip match you with like-minded people who'll become your adventure partners, coffee companions, and lifelong friends.
            </p>
            
            <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
              Find Your Crew & Start Planning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-gray-400 mt-4">
              We'll match you when enough compatible people in your city sign up—no endless waitlist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7 Day Mission to Meet in Real Life (shared component for exact parity) */}
      <MissionCountdown />

      <Footer />
    </div>
  );
};

export default Activities;