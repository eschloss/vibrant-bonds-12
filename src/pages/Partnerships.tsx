
import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Handshake, 
  TrendingUp, 
  Award, 
  Building2, 
  Megaphone, 
  MessageSquare, 
  Globe,
  Heart,
  Target,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Users2,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import ActivitiesTeaser from "@/components/ActivitiesTeaser";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import EarningCalculator from "@/components/EarningCalculator";
import { trackTypeformRedirect } from "@/lib/utils";
import Text from "@/components/Text";

const Partnerships = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: t("partnerships.title", "Venue Partnerships | Boost Revenue & Community | Pulse"),
      es: t("partnerships.title", "Asociaciones de Venues | Impulsa Ingresos | Pulse")
    },
    description: {
      en: t("partnerships.description", "Partner with Pulse to solve loneliness, boost retention, and drive new customers to your venue. Create exclusive group matches and get featured in our app."),
      es: t("partnerships.description", "Asóciate con Pulse para resolver la soledad, aumentar la retención e impulsar nuevos clientes a tu venue. Crea matches grupales exclusivos y destácate en nuestra app.")
    },
    keywords: ["venue partnerships", "business partnerships", "community building", "customer retention", "loneliness solution"],
    type: "website"
  };

  const eventExamples = [
    { name: "Bowling & Beer", price: "$20", category: "Casual Meetups" },
    { name: "Art & Wine Night", price: "$50", category: "Premium Nights" },
    { name: "Ceramics Workshop", price: "$75", category: "Creative Classes" },
    { name: "Cooking Masterclass", price: "$80", category: "Creative Classes" },
    { name: "Hot Air Balloon", price: "$200", category: "Luxury Events" },
    { name: "Laser Tag Tournament", price: "$30", category: "Casual Meetups" },
    { name: "Sailing Adventure", price: "$150", category: "Premium Nights" },
    { name: "Paintball Battle", price: "$40", category: "Casual Meetups" },
    { name: "Football League", price: "$25", category: "Casual Meetups" }
  ];

  const pricingTiers = [
    {
      tier: "Free Events",
      price: "$0",
      examples: ["Walks", "Board Games", "Coffee Meetups"],
      description: "Perfect for building community and brand awareness"
    },
    {
      tier: "Casual Meetups", 
      price: "$20-40",
      examples: ["Bowling + Beer", "Laser Tag", "Football"],
      description: "Great for driving regular foot traffic"
    },
    {
      tier: "Premium Nights",
      price: "$50-100", 
      examples: ["Wine Tasting", "Sailing", "Art Classes"],
      description: "Higher value experiences for engaged customers"
    },
    {
      tier: "Luxury Events",
      price: "$200+",
      examples: ["Hot Air Balloon", "Private Chef", "Helicopter Tours"],
      description: "Exclusive experiences for your VIP customers"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <Text id="partnerships.hero.title1">Turn Your Venue Into a</Text>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                <Text id="partnerships.hero.title2">Friendship Factory</Text>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              <Text id="partnerships.hero.description">Get more prepaid group bookings and loyal regulars with zero upfront cost. Pulse brings groups of compatible locals to your venue.</Text>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="https://482tykjn26x.typeform.com/to/e4yibguB" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'partnerships:hero' })} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span><Text id="partnerships.hero.cta">Apply for Partnership</Text></span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#calculator" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span><Text id="partnerships.hero.earnings">See Earnings Estimate</Text></span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* At a glance */}
            <div className="max-w-5xl mx-auto mt-2 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1"><Text id="partnerships.hero.what_you_do">What you do</Text></div>
                <div className="text-gray-300"><Text id="partnerships.hero.what_you_do_desc">Approve a simple group package and host prepaid groups.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1"><Text id="partnerships.hero.what_we_do">What we do</Text></div>
                <div className="text-gray-300"><Text id="partnerships.hero.what_we_do_desc">Match 10 locals, handle chat, bookings, and payments.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1"><Text id="partnerships.hero.cost">Cost</Text></div>
                <div className="text-gray-300"><Text id="partnerships.hero.cost_desc">Pay‑as‑you‑go fee 25%. No subscription. No minimums.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1"><Text id="partnerships.hero.time">Time to start</Text></div>
                <div className="text-gray-300"><Text id="partnerships.hero.time_desc">2–5 days. We set it up with you.</Text></div>
              </div>
            </div>
            <div className="text-center mt-3 text-xs text-gray-400"><Text id="partnerships.hero.fee_note">Pay‑as‑you‑go fee: 25%. You keep 75%.</Text></div>

            {/* Quick Stats removed per design simplification */}
          </motion.div>
        </div>
      </section>

      {/* How Pulse works (compact steps) */}
      <section className="py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-56 h-56 rounded-full bg-pulse-pink/10 blur-3xl" />
          <div className="absolute bottom-0 -right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-purple-900/30 text-white border border-purple-700/40">
              <span className="w-2 h-2 rounded-full bg-pulse-pink" /> <Text id="partnerships.how_it_works.badge">How Pulse works</Text>
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              <Text id="partnerships.how_it_works.title">10 like‑minded locals on a 7‑day challenge to meet in person</Text>
            </h2>
            <p className="text-gray-300 mt-3 text-sm md:text-base"><Text id="partnerships.how_it_works.subtitle">City‑wide and interest groups. Pip sparks the chat and lines up the plan.</Text></p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Steps (vertical) */}
              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 md:p-5">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <Users2 className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg font-semibold"><Text id="partnerships.how_it_works.step1">We match 10 locals by vibe</Text></div>
                    <div className="text-gray-400 text-sm md:text-base"><Text id="partnerships.how_it_works.step1_desc">Grouped in a shared chat in the same city</Text></div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 md:p-5">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg font-semibold"><Text id="partnerships.how_it_works.step2">Pip sparks the chat and suggests plans</Text></div>
                    <div className="text-gray-400 text-sm md:text-base"><Text id="partnerships.how_it_works.step2_desc">Icebreakers + plan ideas tailored to the group</Text></div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 md:p-5">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg font-semibold"><Text id="partnerships.how_it_works.step3">They meet within 7 days</Text></div>
                    <div className="text-gray-400 text-sm md:text-base"><Text id="partnerships.how_it_works.step3_desc">They book a simple, prepaid experience at a venue</Text></div>
                  </div>
                </div>
              </div>

              {/* Images (small mosaic) */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md h-72 md:h-80">
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Pip%20bowling%20friends.png"
                    alt="Pip bowling with friends"
                    className="absolute top-0 left-0 w-40 md:w-48 rounded-xl border border-gray-700 bg-gray-900/30 rotate-[-3deg] z-20"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Pip%20paintball%20friends.png"
                    alt="Pip paintball with friends"
                    className="absolute top-6 right-0 w-44 md:w-56 rounded-xl border border-gray-700 bg-gray-900/30 rotate-2 z-10"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <img
                    src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/pip%20cooking%20friends.png"
                    alt="Pip cooking with friends"
                    className="absolute bottom-0 left-12 md:left-24 w-36 md:w-44 rounded-xl border border-gray-700 bg-gray-900/30 rotate-1 z-30"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <a href="/meet-pip" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95 transition">
                <Text id="partnerships.how_it_works.learn_more_pip">Learn more about Pip</Text>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Venue Examples (teaser with shuffle) */}
      <section className="py-12 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          {(() => {
            const partnerVenueItems = [
              { id: 'arcade', name: 'Arcade', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/arcade.png' },
              { id: 'pottery-studio', name: 'Pottery Studio', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pottery.png' },
              { id: 'surf-club', name: 'Surf Club', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Surfing.png' },
              { id: 'outdoor-club', name: 'Outdoor Club', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/hiking.png' },
              { id: 'wine-bar', name: 'Wine Bar', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/wine_tasting.png' },
              { id: 'pilates-studio', name: 'Pilates Studio', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Pilates.png' },
              { id: 'climbing-gym', name: 'Climbing Gym', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/rock_climbing.png' },
              { id: 'tennis-club', name: 'Tennis Club', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/tennis.png' },
              { id: 'community-garden', name: 'Community Garden', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/gardening.png' },
              { id: 'escape-room', name: 'Escape Room', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Escape%20Room.png' },
              { id: 'cycling-club', name: 'Cycling Club', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/cycling.png' },
              { id: 'yoga-studio', name: 'Yoga Studio', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/yoga%20outdoors.png' },
              { id: 'board-game-cafe', name: 'Board Game Cafe', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/arcade.png' },
              { id: 'laser-tag', name: 'Laser Tag Arena', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Escape%20Room.png' },
              { id: 'sailing-club', name: 'Sailing Club', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Surfing.png' },
              { id: 'art-studio', name: 'Art Studio', image: 'https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pottery.png' }
            ];
            return (
              <ActivitiesTeaser
                title="partnerships.venues_teaser.title"
                subtitle="partnerships.venues_teaser.subtitle"
                ctaHref="https://482tykjn26x.typeform.com/to/e4yibguB"
                ctaLabel="partnerships.venues_teaser.cta"
                itemsCount={16}
                items={partnerVenueItems}
                onCtaClick={(href) => trackTypeformRedirect({ href, source: 'partnerships:venues_teaser' })}
              />
            );
          })()}
        </div>
      </section>

      {/* Partnership Programs */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><Text id="partnerships.programs.title">Two Ways to Partner</Text></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <Text id="partnerships.programs.description">Choose between city‑wide featuring or your own recurring community built around your core experience.</Text>
            </p>
          </motion.div>

          {/* Comparison strip */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
            {/* Program 1: Featured in the City */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="relative overflow-hidden bg-gray-800/50 backdrop-blur-lg border-gray-700 h-full hover:border-blue-400/50 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300">
                <div className="pointer-events-none absolute -top-20 -right-24 w-80 h-80 rounded-full bg-pulse-blue/20 blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl md:text-2xl font-bold">1</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white"><Text id="partnerships.programs.featured.title">Get Featured in the City</Text></h3>
                  </div>
                  <p className="text-gray-300 mb-2">
                    <Text id="partnerships.programs.featured.description">Show up as a ready‑to‑book group plan across the city. When a group chooses your plan, they prepay.</Text>
                  </p>
                  <div className="text-xs text-gray-400 mb-6"><Text id="partnerships.programs.featured.example">Example: $30 × 10 people = $300 booking → You receive $225.</Text></div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.featured.benefit1">Featured as a plan idea promoted to relevant groups citywide.</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.featured.benefit2">Groups opt in; no commitments or coupons required</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.featured.benefit3">Prepaid, packaged bookings handled by Pulse — you just host</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        <Text id="partnerships.programs.featured.benefit4">You keep 75% of the booking (Pulse platform fee: 25%)</Text>
                      </span>
                    </li>
                  </ul>

                  <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
                    <div className="text-sm font-semibold mb-4 text-white">Typical package price points</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$20–40</div>
                        <div className="text-xs text-pulse-pink"><Text id="partnerships.programs.featured.pricing_casual">Casual</Text></div>
                      </div>
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$50–100</div>
                        <div className="text-xs text-pulse-pink"><Text id="partnerships.programs.featured.pricing_premium">Premium</Text></div>
                      </div>
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$200+</div>
                        <div className="text-xs text-pulse-pink"><Text id="partnerships.programs.featured.pricing_luxury">Luxury</Text></div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
                    <a href="https://482tykjn26x.typeform.com/to/e4yibguB" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'partnerships:featured_cta' })} className="w-full md:w-auto px-6 py-3 text-base rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:from-pulse-blue hover:via-accent hover:to-pulse-pink transition-all duration-300 inline-flex items-center justify-center gap-2">
                      <Text id="partnerships.programs.featured.cta">Apply Now</Text>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#calculator" className="w-full md:w-auto px-6 py-3 text-base rounded-full border border-gray-600 text-white hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2">
                      <Text id="partnerships.programs.featured.earnings">See Earnings Estimate</Text>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Program 2: Exclusive Group Match */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="relative overflow-hidden bg-gray-800/50 backdrop-blur-lg border-gray-700 h-full hover:border-purple-400/60 hover:shadow-pink-500/20 hover:shadow-xl transition-all duration-300">
                <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-pulse-pink/20 blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold">2</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white"><Text id="partnerships.programs.recurring.title">Your Own Recurring Community</Text></h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    <Text id="partnerships.programs.recurring.description">We create a branded group for your core activity on Pulse so locals meet new friends at your venue. We continuously match many small groups and route them to your venue weekly or monthly, building loyal regulars while attracting new customers.</Text>
                  </p>
                  {/* Example callouts moved above bullets and styled larger/bolder */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎳</div>
                      <div className="text-sm md:text-base font-semibold text-white">{t("partnerships.programs.recurring.example1", "Meet Fellow Bowlers in Boston")}</div>
                    </div>
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🏋️</div>
                      <div className="text-sm md:text-base font-semibold text-white">{t("partnerships.programs.recurring.example2", "Find Gym Buddies in Barcelona")}</div>
                    </div>
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎲</div>
                      <div className="text-sm md:text-base font-semibold text-white">{t("partnerships.programs.recurring.example3", "Meet Local Gamers in London")}</div>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.recurring.benefit1">Dedicated, branded group in the Pulse app for your activity</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.recurring.benefit2">Pulse matches compatible people and fills your sessions</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.recurring.benefit3">Recurring events to keep customers returning</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.recurring.benefit4">Co‑promotion (venue + Pulse) and citywide featuring included</Text></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300"><Text id="partnerships.programs.recurring.benefit5">Scales to dozens or hundreds of micro‑groups as demand grows</Text></span>
                    </li>
                  </ul>

                  

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
                    <a href="https://482tykjn26x.typeform.com/to/e4yibguB" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'partnerships:recurring_cta' })} className="w-full md:w-auto px-6 py-3 text-base rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:from-pulse-blue hover:via-accent hover:to-pulse-pink transition-all duration-300 inline-flex items-center justify-center gap-2">
                      <Text id="partnerships.programs.recurring.cta">Apply Now</Text>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#calculator" className="w-full md:w-auto px-6 py-3 text-base rounded-full border border-gray-600 text-white hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2">
                      <Text id="partnerships.programs.recurring.earnings">See Earnings Estimate</Text>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Your Recurring Community (examples) moved up below the card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
            {[
              {
                title: t("partnerships.examples.boston.title", "Meet Fellow Bowlers in Boston"),
                venue: t("partnerships.examples.boston.venue", "Boston Bowlers"),
                poweredBy: t("partnerships.examples.boston.powered_by", "New England Bowling Alley"),
                description: t("partnerships.examples.boston.description", "Exclusive Pulse group for bowlers. Match by skill and meet weekly at the alley."),
                emoji: "🎳",
                features: [
                  t("partnerships.examples.boston.features.0", "Skill-based matching"),
                  t("partnerships.examples.boston.features.1", "Weekly league nights"),
                  t("partnerships.examples.boston.features.2", "Tournament events"),
                  t("partnerships.examples.boston.features.3", "Social mixers")
                ],
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: t("partnerships.examples.barcelona.title", "Meet Gym Buddies in Barcelona"),
                venue: t("partnerships.examples.barcelona.venue", "Barcelona Gym Buddies"),
                poweredBy: t("partnerships.examples.barcelona.powered_by", "BCN Gym Group"),
                description: t("partnerships.examples.barcelona.description", "Pulse‑matched workout partners. Recurring sessions hosted at your gym."),
                emoji: "🏋️",
                features: [
                  t("partnerships.examples.barcelona.features.0", "Goal-based matching"),
                  t("partnerships.examples.barcelona.features.1", "Workout partners"),
                  t("partnerships.examples.barcelona.features.2", "Nutrition sharing"),
                  t("partnerships.examples.barcelona.features.3", "Fitness challenges")
                ],
                color: "from-purple-500 to-pink-500"
              }
            ].map((example, index) => (
              <motion.div key={example.venue} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden group">
                  <div className="relative h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${example.color} opacity-20`}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{example.emoji}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{example.venue}</h3>
                        <div className="text-sm text-gray-300">{t("partnerships.examples.powered_by", "powered by")} {example.poweredBy}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {example.features.map((feature) => (
                        <span key={feature} className="text-[11px] text-gray-200 bg-gray-700/50 border border-gray-700 rounded-full px-2.5 py-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Side-by-side comparison (polished) */}
          <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured in the City */}
            <div className="rounded-xl border border-gray-700 bg-gray-900/60 backdrop-blur-md p-5 hover:border-blue-400/40 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <div className="text-white font-semibold">{t("partnerships.programs.comparison.featured_title", "Featured in the City")}</div>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.best_for", "Best for:")}</span> <Text id="partnerships.programs.comparison.featured_best">Occasional group bookings</Text></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.you_get", "You get:")}</span> <Text id="partnerships.programs.comparison.featured_you_get">Citywide discovery + prepaid groups</Text></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.fee", "Fee:")}</span> <Text id="partnerships.programs.comparison.featured_fee">25% per booking</Text></span></li>
              </ul>
            </div>

            {/* Your Recurring Community */}
            <div className="rounded-xl border border-gray-700 bg-gray-900/60 backdrop-blur-md p-5 hover:border-purple-400/40 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                <div className="text-white font-semibold">{t("partnerships.programs.comparison.recurring_title", "Your Recurring Community")}</div>
              </div>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-pulse-pink mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.best_for", "Best for:")}</span> <Text id="partnerships.programs.comparison.recurring_best">Regular sessions (weekly/monthly)</Text></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-pulse-pink mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.you_get", "You get:")}</span> <Text id="partnerships.programs.comparison.recurring_you_get">Ongoing groups, co‑promotion</Text></span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-pulse-pink mt-0.5" /><span><span className="text-white font-medium">{t("partnerships.programs.comparison.fee", "Fee:")}</span> <Text id="partnerships.programs.comparison.recurring_fee">25% per booking</Text></span></li>
              </ul>
            </div>
          </div>

          {/* How it works for venues */}
          <div className="max-w-6xl mx-auto mt-10">
            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg p-6 md:p-8 shadow-lg shadow-purple-500/10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40">
                  <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" /> <Text id="partnerships.how_it_works_venues.title">How it works for venues</Text>
                </div>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <li className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-[1px] rounded-2xl">
                  <div className="rounded-2xl bg-gray-900/60 border border-gray-700 p-5 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pulse-pink to-accent flex items-center justify-center text-white">1</div>
                      <div className="font-semibold text-white text-lg"><Text id="partnerships.how_it_works_venues.step1">Apply</Text></div>
                    </div>
                    <div className="text-gray-300 text-sm"><Text id="partnerships.how_it_works_venues.step1_desc">Tell us your activity and preferred times.</Text></div>
                  </div>
                </li>
                <li className="bg-gradient-to-r from-accent to-pulse-blue p-[1px] rounded-2xl">
                  <div className="rounded-2xl bg-gray-900/60 border border-gray-700 p-5 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-pulse-blue flex items-center justify-center text-white">2</div>
                      <div className="font-semibold text-white text-lg"><Text id="partnerships.how_it_works_venues.step2">Set your package</Text></div>
                    </div>
                    <div className="text-gray-300 text-sm"><Text id="partnerships.how_it_works_venues.step2_desc">We craft a simple, prepaid plan (e.g., $25 per person for 10).</Text></div>
                  </div>
                </li>
                <li className="bg-gradient-to-r from-pulse-blue to-pulse-pink p-[1px] rounded-2xl">
                  <div className="rounded-2xl bg-gray-900/60 border border-gray-700 p-5 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pulse-blue to-pulse-pink flex items-center justify-center text-white">3</div>
                      <div className="font-semibold text-white text-lg"><Text id="partnerships.how_it_works_venues.step3">Host groups</Text></div>
                    </div>
                    <div className="text-gray-300 text-sm"><Text id="partnerships.how_it_works_venues.step3_desc">We match and book groups. You host and get paid fast.</Text></div>
                  </div>
                </li>
              </ol>
              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="https://482tykjn26x.typeform.com/to/e4yibguB" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'partnerships:how_it_works_apply' })} className="px-6 py-3 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95 transition inline-flex items-center justify-center gap-2">
                  <Text id="partnerships.how_it_works_venues.cta">Apply Now</Text>
                </a>
                <a href="/contact" className="px-6 py-3 rounded-full border border-gray-600 text-white hover:bg-gray-800/50 transition inline-flex items-center justify-center gap-2">
                  <Text id="partnerships.how_it_works_venues.contact">Contact Us</Text>
                </a>
              </div>
            </div>
          </div>

          {/* Clarifier bar */}
          <div className="max-w-6xl mx-auto mt-6">
            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-center gap-3">
              <span className="text-gray-400">Note:</span>
              <span><Text id="partnerships.how_it_works_venues.note">Recurring Community partners also receive full city-wide featuring of their venue and events.</Text></span>
            </div>
          </div>
        </div>
      </section>

      {/* Your Recurring Community Examples (trimmed) */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><Text id="partnerships.examples.title">Your Recurring Community</Text></h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto"><Text id="partnerships.examples.description">We match small groups and route them to your venue weekly or monthly — building loyal regulars while attracting new customers.</Text></p>
          </motion.div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: t("partnerships.examples.boston.title", "Meet Fellow Bowlers in Boston"),
                venue: t("partnerships.examples.boston.venue", "Boston Bowlers"),
                poweredBy: t("partnerships.examples.boston.powered_by", "New England Bowling Alley"),
                description: t("partnerships.examples.boston.description", "Exclusive Pulse group for bowlers. Match by skill and meet weekly at the alley."),
                emoji: "🎳",
                features: [
                  t("partnerships.examples.boston.features.0", "Skill-based matching"),
                  t("partnerships.examples.boston.features.1", "Weekly league nights"),
                  t("partnerships.examples.boston.features.2", "Tournament events"),
                  t("partnerships.examples.boston.features.3", "Social mixers")
                ],
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: t("partnerships.examples.barcelona.title", "Meet Gym Buddies in Barcelona"),
                venue: t("partnerships.examples.barcelona.venue", "Barcelona Gym Buddies"),
                poweredBy: t("partnerships.examples.barcelona.powered_by", "BCN Gym Group"),
                description: t("partnerships.examples.barcelona.description", "Pulse‑matched workout partners. Recurring sessions hosted at your gym."),
                emoji: "🏋️",
                features: [
                  t("partnerships.examples.barcelona.features.0", "Goal-based matching"),
                  t("partnerships.examples.barcelona.features.1", "Workout partners"),
                  t("partnerships.examples.barcelona.features.2", "Nutrition sharing"),
                  t("partnerships.examples.barcelona.features.3", "Fitness challenges")
                ],
                color: "from-purple-500 to-pink-500"
              }
            ].map((example, index) => (
              <motion.div key={example.venue} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden group">
                  <div className="relative h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${example.color} opacity-20`}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{example.emoji}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{example.venue}</h3>
                        <div className="text-sm text-gray-300">{t("partnerships.examples.powered_by", "powered by")} {example.poweredBy}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {example.features.map((feature) => (
                        <span key={feature} className="text-[11px] text-gray-200 bg-gray-700/50 border border-gray-700 rounded-full px-2.5 py-1">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Removed bottom clarifier card under examples for a cleaner section */}
        </div>
      </section>

      {/* Earning Calculator Section */}
      <EarningCalculator />

      {/* Removed separate Problem Section to merge into bottom CTA */}

      {/* FAQ Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6"><Text id="partnerships.faq.title">Frequently Asked Questions</Text></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.who_pays">Who pays and when do we get paid?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.who_pays_answer">Groups prepay in Pulse. You receive 75% shortly after the event.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.discounts">Do we need discounts or coupons?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.discounts_answer">No. Set a fair package price. No coupons needed.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.staff_time">How much staff time is required?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.staff_time_answer">Treat it like any small group booking (≈10 people). We handle the rest.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.cancellations">What about cancellations and no‑shows?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.cancellations_answer">We set clear policies and manage communications so you’re protected.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.subscription">Any subscription or long‑term contract?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.subscription_answer">No. 25% per booking. No subscription. Cancel anytime.</Text></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="font-semibold text-white mb-1"><Text id="partnerships.faq.how_soon">How soon can we start?</Text></div>
                <div className="text-gray-300"><Text id="partnerships.faq.how_soon_answer">Typically 2–5 days after approval.</Text></div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a href="/faq" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95 transition">
                <Text id="partnerships.faq.view_full">View full FAQ</Text>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Group Match Examples (removed duplicate) */}
      {/*
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Custom Group Match <span className="inline-block">✨</span>
              <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                What It Could Look Like
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We create exclusive group matches tailored to your venue and location. Here are real examples of what your custom group could look like.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Meet Bowling Enthusiasts in Boston",
                venue: "Boston Bowlers",
                poweredBy: "New England Bowling Alley",
                description: "A community of bowling lovers who meet weekly for friendly competition and social games.",
                features: ["Skill-based matching", "Weekly league nights", "Tournament events", "Social mixers"],
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Connect with Fitness Lovers in Barcelona",
                venue: "Barcelona Gym Lovers",
                poweredBy: "BCN Gym Group",
                description: "A group of fitness enthusiasts who share workout tips, motivation, and gym buddy connections.",
                features: ["Goal-based matching", "Workout partners", "Nutrition sharing", "Fitness challenges"],
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Join Board Game Enthusiasts in Portland",
                venue: "Portland Board Game Group",
                poweredBy: "Portland Board Game Cafe",
                description: "A community of tabletop gamers who love strategy games, card games, and social gaming nights.",
                features: ["Game preference matching", "Strategy game nights", "Card game tournaments", "New game discovery"],
                color: "from-green-500 to-emerald-400"
              },
              {
                title: "Meet Art Enthusiasts in Austin",
                venue: "Austin Art Collective",
                poweredBy: "Austin Creative Studios",
                description: "A group of artists and art lovers who share techniques, inspiration, and creative workshops.",
                features: ["Medium-based matching", "Art workshops", "Gallery visits", "Creative collaborations"],
                color: "from-orange-500 to-red-500"
              }
            ].map((example, index) => (
              <motion.div key={example.venue} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden group">
                  <div className="relative h-32 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${example.color} opacity-20`}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">{example.venue}</h3>
                        <div className="text-sm text-gray-300">{t("partnerships.examples.powered_by", "powered by")} {example.poweredBy}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
                    </div>
                    
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-16">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Your Venue, Your Community</h3>
              <p className="text-gray-300 mb-6">
                We'll create a custom group match that reflects your venue's unique personality and your customers' interests. 
                Your group will be exclusive to your venue and promoted to people who share your passion.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <div className="w-4 h-4">🎯</div>
                <span>Personalized matching questions based on your services</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      */}

      {/* Event Examples removed as requested */}

      {/* Removed How Partnership Works section */}

      {/* CTA Section merged with Problem/Solution */}
      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <Text id="partnerships.cta.title">Turn Customers Into Friends Right at Your Venue</Text>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                <Text id="partnerships.cta.description">Loneliness is everywhere — but friendship is the solution. Join the Pulse Partner Program to turn social seekers into loyal regulars.</Text>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
                <div className="text-3xl mb-2">😔</div>
                <h3 className="text-lg font-semibold mb-3"><Text id="partnerships.cta.problem_title">Loneliness Is Everywhere</Text></h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-red-400 mt-0.5" /><span><Text id="partnerships.cta.problem_point1">21M Americans have zero friends</Text></span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-red-400 mt-0.5" /><span><Text id="partnerships.cta.problem_point2">1/3 unsatisfied with their circle</Text></span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-red-400 mt-0.5" /><span><Text id="partnerships.cta.problem_point3">Impacts mental health and spend</Text></span></li>
                </ul>
              </div>
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
                <div className="text-3xl mb-2">🎉</div>
                <h3 className="text-lg font-semibold mb-3"><Text id="partnerships.cta.solution_title">The Friendship Solution</Text></h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5" /><span><Text id="partnerships.cta.solution_point1">Friends visit 3× more often</Text></span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5" /><span><Text id="partnerships.cta.solution_point2">Longer stays and higher spend</Text></span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-400 mt-0.5" /><span><Text id="partnerships.cta.solution_point3">Build a loyal community</Text></span></li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="https://482tykjn26x.typeform.com/to/e4yibguB" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'partnerships:bottom_cta' })} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                  <span><Text id="partnerships.cta.cta1">Apply for Partnership</Text></span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#calculator" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                  <span><Text id="partnerships.cta.cta2">See Earnings Estimate</Text></span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
              <div className="mt-3 text-center text-xs text-gray-400"><Text id="partnerships.cta.email_note">Prefer to talk? Email partners@pulsenow.app</Text></div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
