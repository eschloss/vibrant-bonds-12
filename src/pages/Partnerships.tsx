
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
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import EarningCalculator from "@/components/EarningCalculator";

const Partnerships = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: t("partnerships.title", "Venue Partnerships | Drive Revenue & Build Community | Pulse"),
      es: t("partnerships.title", "Asociaciones de Venues | Impulsa Ingresos y Construye Comunidad | Pulse")
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
              Turn Your Venue Into a
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Friendship Factory
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Partner with Pulse to solve loneliness, boost retention, and drive new customers. 
              <span className="text-pulse-pink font-semibold"> 21 million Americans have zero friends</span> - 
              help them find community through your venue.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="#apply" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply for Partnership</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-pulse-pink mb-2">21M</div>
                <div className="text-gray-300">Americans with zero friends</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-pulse-blue mb-2">1/3</div>
                <div className="text-gray-300">Adults unsatisfied with friend circle</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
                <div className="text-3xl font-bold text-accent mb-2">3x</div>
                <div className="text-gray-300">More visits from friends</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Types Section (moved up) */}
      <section className="py-12 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect Partners
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
                We're Looking For
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We partner with venues that create social experiences. Your customers already share a passion for your services - 
              we help them find friends who love the same things.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {[
              {
                name: "Bowling Alley",
                description: "Perfect for casual meetups and team building.",
                category: "Sports & Recreation"
              },
              {
                name: "Art Workshop",
                description: "Creative spaces where people bond over shared artistic interests.",
                category: "Creative & Arts"
              },
              {
                name: "Cooking Classes",
                description: "Interactive culinary experiences where people learn and share.",
                category: "Food & Culinary"
              },
              {
                name: "Paintball",
                description: "Adrenaline-fueled team activities that build camaraderie.",
                category: "Adventure & Sports"
              },
              {
                name: "Laser Tag",
                description: "High-energy group activities perfect for team building.",
                category: "Entertainment"
              },
              {
                name: "Escape Rooms",
                description: "Puzzle-solving experiences that require teamwork.",
                category: "Entertainment"
              },
              {
                name: "Interactive Experiences",
                description: "Immersive activities like VR gaming and interactive museums.",
                category: "Technology & Innovation"
              },
              {
                name: "E-Sports Providers",
                description: "Gaming centers where gamers connect over competitive play.",
                category: "Gaming & Technology"
              },
              {
                name: "Arcades",
                description: "Classic gaming spaces where people bond over retro games.",
                category: "Entertainment"
              },
              {
                name: "Concept Bars",
                description: "Themed bars that create conversation starters and memorable moments.",
                category: "Food & Beverage"
              },
              {
                name: "Book Stores",
                description: "Literary havens where book lovers discuss their favorite reads.",
                category: "Culture & Education"
              },
              {
                name: "Board Game Cafe",
                description: "Social gaming spaces where people bond over strategy and laughter.",
                category: "Entertainment"
              }
            ].map((venue, index) => (
              <motion.div key={venue.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">
                      {venue.name === "Bowling Alley" && "🎳"}
                      {venue.name === "Art Workshop" && "🎨"}
                      {venue.name === "Cooking Classes" && "👨‍🍳"}
                      {venue.name === "Paintball" && "🔫"}
                      {venue.name === "Laser Tag" && "🎯"}
                      {venue.name === "Escape Rooms" && "🔐"}
                      {venue.name === "Interactive Experiences" && "🎮"}
                      {venue.name === "E-Sports Providers" && "🏆"}
                      {venue.name === "Arcades" && "🕹️"}
                      {venue.name === "Concept Bars" && "🍸"}
                      {venue.name === "Book Stores" && "📚"}
                      {venue.name === "Board Game Cafe" && "🎲"}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{venue.name}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-2">{venue.description}</p>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{venue.category}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-16">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Don't See Your Venue Type?</h3>
              <p className="text-gray-300 mb-6">
                We partner with any venue that creates social experiences and brings people together. 
                If your venue helps people connect, we want to work with you.
              </p>
              <a href="#apply" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium">
                <span>Apply Anyway</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Two Ways to Partner</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose between a broad city-wide promotion or an exclusive Group Match that builds a community around your core experience.
            </p>
          </motion.div>

          {/* Comparison strip */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Program 1: Featured in the City */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="relative overflow-hidden bg-gray-800/50 backdrop-blur-lg border-gray-700 h-full hover:border-blue-400/50 hover:shadow-blue-500/20 hover:shadow-xl transition-all duration-300">
                <div className="pointer-events-none absolute -top-20 -right-24 w-80 h-80 rounded-full bg-pulse-blue/20 blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl md:text-2xl font-bold">1</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Get Featured in the City</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    We promote your venue to relevant friend groups citywide — bringing new customers every week.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Citywide exposure in group feeds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Bookings from relevant groups</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Hands‑off demand; you host</span>
                    </li>
                  </ul>

                  <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
                    <div className="text-sm font-semibold mb-4 text-white">Popular price points</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$0</div>
                        <div className="text-xs text-pulse-pink">Free events</div>
                      </div>
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$20–40</div>
                        <div className="text-xs text-pulse-pink">Casual meetups</div>
                      </div>
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$50–100</div>
                        <div className="text-xs text-pulse-pink">Premium nights</div>
                      </div>
                      <div className="rounded-lg bg-gray-800/60 border border-gray-700 p-3 text-center">
                        <div className="text-lg font-bold text-white">$200+</div>
                        <div className="text-xs text-pulse-pink">Luxury events</div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
                    <a href="#apply" className="w-full md:w-auto px-6 py-3 text-base rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:from-pulse-blue hover:via-accent hover:to-pulse-pink transition-all duration-300 inline-flex items-center justify-center gap-2">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#calculator" className="w-full md:w-auto px-6 py-3 text-base rounded-full border border-gray-600 text-white hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2">
                      See Revenue Estimation
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
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Exclusive Group Match</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Co‑create a branded friend‑group match for your core experience. Turn customers into friends to lift retention and spend.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Match customers with new friends</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Co‑promotion: venue + Pulse</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Includes citywide featuring</span>
                    </li>
                  </ul>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center"><div className="text-2xl mb-1">🎳</div><div className="text-xs text-gray-400">Bowling</div></div>
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center"><div className="text-2xl mb-1">🏋️</div><div className="text-xs text-gray-400">Fitness</div></div>
                    <div className="bg-gray-700/40 rounded-lg p-3 text-center"><div className="text-2xl mb-1">🎮</div><div className="text-xs text-gray-400">Gaming</div></div>
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
                    <a href="#apply" className="w-full md:w-auto px-6 py-3 text-base rounded-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 transition-all duration-300 inline-flex items-center justify-center gap-2">
                      Request Details
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href="#calculator" className="w-full md:w-auto px-6 py-3 text-base rounded-full border border-gray-600 text-white hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2">
                      See Revenue Estimation
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Clarifier bar */}
          <div className="max-w-6xl mx-auto mt-6">
            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-center gap-3">
              <span className="text-gray-400">Note:</span>
              <span>Exclusive Group Match partners also receive full city-wide featuring of their venue and events.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Earning Calculator Section */}
      <EarningCalculator />

      {/* Problem Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loneliness Is Everywhere
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Including in Your Venue
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your customers are struggling with loneliness. When they find friends through your venue, 
              they become loyal regulars who visit more often and spend more money.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30">
                <div className="text-6xl mb-6">😔</div>
                <h3 className="text-2xl font-bold mb-4">The Loneliness Epidemic</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>21 million Americans have zero friends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>1/3 of adults are unsatisfied with their friend circle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Loneliness impacts mental health and spending habits</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold mb-4">The Friendship Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Friends visit venues 3x more often</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>They stay longer and spend more money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Build a loyal community around your venue</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Group Match Examples */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Custom Group Match
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
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
                        <div className="text-sm text-gray-300">powered by {example.poweredBy}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-white mb-2">{example.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{example.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-400 font-medium mb-3">Group Features:</div>
                      {example.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-pulse-pink"></div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
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

      {/* Event Examples */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Event Examples
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
                From Our Partners
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are real events our partners are running. Each event brings 10 people together - you set the price, we help fill the group.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {eventExamples.map((event, index) => (
              <motion.div key={event.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{event.name}</h3>
                      <span className="text-pulse-pink font-bold">{event.price}</span>
                    </div>
                    <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{event.category}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pricing Tiers */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Suggested Pricing Tiers</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We help you structure events at different price points. Each group typically has 10 people - here's how much revenue you can generate per event.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => {
              const priceRange = tier.price.replace('$', '').replace('+', '');
              const minPrice = parseInt(priceRange.split('-')[0]);
              const maxPrice = priceRange.includes('-') ? parseInt(priceRange.split('-')[1]) : minPrice;
              const avgPrice = (minPrice + maxPrice) / 2;
              const revenuePerGroup = avgPrice * 10;
              
              return (
                <motion.div key={tier.tier} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <h4 className="text-xl font-bold text-white mb-2">{tier.tier}</h4>
                      <div className="text-2xl font-bold text-pulse-pink mb-2">{tier.price}</div>
                      <div className="text-sm text-gray-300 mb-4">{tier.description}</div>
                      
                      {/* Revenue Calculation */}
                      <div className="bg-gradient-to-r from-pulse-pink/20 to-pulse-blue/20 rounded-lg p-4 mb-4">
                        <div className="text-sm text-gray-400 mb-1">Revenue per group (10 people)</div>
                        <div className="text-xl font-bold text-white">${revenuePerGroup.toLocaleString()}</div>
                        <div className="text-xs text-gray-400 mt-1">${avgPrice} × 10 people</div>
                      </div>
                      
                      <div className="space-y-1">
                        {tier.examples.map((example, i) => (
                          <div key={i} className="text-xs text-gray-400">• {example}</div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How Partnership Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We promote your events, venue, and drive customers for you while you promote your exclusive group match.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Apply & Connect",
                description: "Tell us about your venue and goals. We'll discuss how to create the perfect partnership."
              },
              {
                step: "2", 
                title: "Custom Setup",
                description: "We create your exclusive group match and set up your venue promotion in our app."
              },
              {
                step: "3",
                title: "Launch Together", 
                description: "We promote your events to our community while you promote your exclusive match."
              },
              {
                step: "4",
                title: "Grow Together",
                description: "Track success and continuously optimize to drive more customers and build community."
              }
            ].map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r from-pulse-pink to-pulse-blue text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Customers Into Friends
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
                Right at Your Venue
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the Pulse Partner Program and start building meaningful connections while driving revenue. 
              Limited early partner spots available in select cities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:partners@pulsenow.app" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply for Partnership</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span>Try Pulse Now</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
