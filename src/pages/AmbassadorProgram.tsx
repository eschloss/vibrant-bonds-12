
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Star, Network, CalendarDays, Sparkles, Trophy, Heart, Zap, Gift, Crown, MessageSquare, Globe, DollarSign, TrendingUp, Target, Award, Share2, Megaphone, Building2, Users2, ArrowRight, CheckCircle, Lightbulb, MapPin, Clock, BarChart3, Palette, Handshake, Headphones, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import { useRefParam } from "@/hooks/useRefParam";
import { trackTypeformRedirect } from "@/lib/utils";

const AmbassadorProgram = () => {
  const { addRefToUrl } = useRefParam();
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Ambassador Program | Earn While Making Impact | Pulse",
      es: "Programa de Embajadores | Gana Haciendo Impacto | Pulse"
    },
    description: {
      en: "Join Pulse's Ambassador Program and earn 5% commission while helping solve loneliness. Community leaders and influencers wanted.",
      es: "Únete al Programa de Embajadores de Pulse y gana 5% de comisión mientras ayudas a resolver la soledad. Líderes comunitarios e influencers buscados."
    },
    keywords: ["ambassador program", "commission", "loneliness epidemic", "community leaders", "referral program", "earn money"],
    type: "website"
  };

  const [userReferrals, setUserReferrals] = useState(10);
  const [venueReferrals, setVenueReferrals] = useState(1);
  
  // Calculate earnings based on current values
  const userEarningsPerYear = userReferrals * 18; // $18 per user per year
  const venueEarningsPerYear = venueReferrals * 3900; // $3,900 per venue per year
  const totalEarnings = userEarningsPerYear + venueEarningsPerYear;

  // Updated promo section uses inline data within the section

  // Removed hero metrics section and related data

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-block">
                <div className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                  🚀 Earn While Making Impact
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Turn Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Connections Into
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-blue via-accent to-pulse-pink">
                Commission
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join our Ambassador Program and earn <span className="text-pulse-pink font-bold">5% commission</span> while helping solve the loneliness epidemic. 
              Community leaders, influencers, and connectors wanted.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="https://482tykjn26x.typeform.com/to/jJAR9IcE" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'ambassador:hero' })} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply to Join</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#earnings" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span>See Earnings</span>
                <DollarSign className="h-5 w-5" />
              </a>
            </div>

            {/* At a glance */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mt-2">
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1">What you do</div>
                <div className="text-gray-300">Promote Pulse however you like. Refer users and venues. Earn commission.</div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1">Earn</div>
                <div className="text-gray-300">5% of booking revenue for 12 months per referral</div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-white font-semibold mb-1">Tools</div>
                <div className="text-gray-300">Personal link, assets, 1:1 support</div>
              </div>
            </div>
            <div className="text-center mt-2 text-xs text-gray-400">No time commitment — it’s entirely up to you.</div>

            {/* Quick Stats removed per design simplification */}
          </motion.div>
        </div>
      </section>

      {/* How Pulse works (compact) */}
      <section className="py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-56 h-56 rounded-full bg-pulse-pink/10 blur-3xl" />
          <div className="absolute bottom-0 -right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-purple-900/30 text-white border border-purple-700/40">
              <span className="w-2 h-2 rounded-full bg-pulse-pink" /> How Pulse works
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
              10 like‑minded locals on a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> 7‑day challenge </span>
              to meet in person
            </h2>
            <p className="text-gray-300 mt-3 text-sm md:text-base">City‑wide and interest groups. Pip sparks the chat and lines up the plan.</p>
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
                    <div className="text-white text-base md:text-lg font-semibold">We match 10 locals by vibe</div>
                    <div className="text-gray-400 text-sm md:text-base">Grouped in a shared chat in the same city</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 md:p-5">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg font-semibold">Pip sparks the chat and suggests plans</div>
                    <div className="text-gray-400 text-sm md:text-base">Icebreakers + plan ideas tailored to the group</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-4 md:p-5">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white text-base md:text-lg font-semibold">They meet within 7 days</div>
                    <div className="text-gray-400 text-sm md:text-base">They book a simple, prepaid experience at a venue</div>
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
                Learn more about Pip
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For Section - Compact emoji cards (moved up) */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who We're Looking For
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">Ambassador Profiles</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connectors, creators, and doers who help people find their circle.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {[
              { name: "Community Leaders", emoji: "👥", description: "Run clubs and bring people together", tag: "Organizers" },
              { name: "Influencers & Creators", emoji: "📣", description: "Spark conversations with content", tag: "Creators" },
              { name: "Network Connectors", emoji: "🤝", description: "Natural connectors with wide circles", tag: "Connectors" },
              { name: "Business Owners", emoji: "🏢", description: "Venue owners & activity providers", tag: "Partners" },
              { name: "Passionate Advocates", emoji: "💖", description: "Care deeply about community", tag: "Advocates" },
              { name: "Students & Young Pros", emoji: "🎓", description: "In transition, eager to build circles", tag: "Emerging" }
            ].map((persona, index) => (
              <motion.div key={persona.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">{persona.emoji}</div>
                    <h3 className="text-sm font-bold text-white mb-2">{persona.name}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-2">{persona.description}</p>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">{persona.tag}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loneliness Problem Section */}
      <section className="py-20 relative bg-gray-900/50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-pulse-pink blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-pulse-blue blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Loneliness Epidemic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Needs Your Voice
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Millions of people are struggling with loneliness. As an ambassador, you can be part of the solution 
              while earning meaningful income. Your connections and influence can change lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="relative rounded-2xl p-8 border border-gray-700 bg-gray-800/60 backdrop-blur-lg">
                <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-400/30 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-red-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Problem</h3>
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
                    <span>Loneliness impacts mental health and life satisfaction</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="relative rounded-2xl p-8 border border-gray-700 bg-gray-800/60 backdrop-blur-lg">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mb-6">
                  <Users2 className="h-6 w-6 text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Your Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Use your network to help people find new friends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Earn 5% commission on every referral</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Build a sustainable income while helping others</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Earning Potential Section */}
      <section id="earnings" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Earning Potential
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                With Real Impact
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn 5% commission on all actual booking revenue from your referrals for a full year. 
              The more people you help connect, the more you earn.
            </p>
            <p className="text-sm text-gray-400 max-w-4xl mx-auto mt-4">
              * Commission is based on actual booking values from your referrals, tracked for 1 year. 
              These calculations use average spending estimates - your actual earnings depend on real booking revenue generated by your referrals.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Interactive Calculator */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Interactive Earnings Calculator</h3>
                    <p className="text-gray-300">Adjust the sliders to see your potential earnings</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Referrals Slider */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">User Referrals</h4>
                          <p className="text-sm text-gray-400">5% of actual booking revenue per user</p>
                          <p className="text-xs text-gray-500">* Based on average $360/year spending</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Number of Users:</span>
                          <span className="text-pulse-pink font-bold">{userReferrals}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={userReferrals}
                          onChange={(e) => setUserReferrals(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pulse-pink [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-pulse-pink [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg"
                          style={{
                            background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(userReferrals / 1000) * 100}%, #374151 ${(userReferrals / 1000) * 100}%, #374151 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>1000</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                        <div className="text-sm text-gray-400 mb-1">Estimated Annual Commission:</div>
                        <div className="text-blue-400 font-bold text-xl">${userEarningsPerYear.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">* Based on average user spending</div>
                      </div>
                    </div>
                    
                    {/* Venue Referrals Slider */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">Venue Referrals</h4>
                          <p className="text-sm text-gray-400">5% of actual booking revenue per venue</p>
                          <p className="text-xs text-gray-500">* Based on average $78,000/year revenue</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Number of Venues:</span>
                          <span className="text-pulse-pink font-bold">{venueReferrals}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={venueReferrals}
                          onChange={(e) => setVenueReferrals(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg"
                          style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(venueReferrals / 100) * 100}%, #374151 ${(venueReferrals / 100) * 100}%, #374151 100%)`
                          }}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>100</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                        <div className="text-sm text-gray-400 mb-1">Estimated Annual Commission:</div>
                        <div className="text-purple-400 font-bold text-xl">${venueEarningsPerYear.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">* Based on average venue revenue</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Earnings Display */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-pulse-pink/10 to-pulse-blue/10 rounded-xl border border-pulse-pink/20">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Total Estimated Annual Commission</div>
                      <div className="text-3xl font-bold text-pulse-pink">${totalEarnings.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-2">* Commission based on actual booking revenue, tracked for 1 year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <div className="mt-6 rounded-xl border border-gray-700 bg-gray-900/50 p-4 text-sm text-gray-300">
              <div className="text-white font-semibold mb-1">How you earn & payouts</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tracking: referrals via your personal link/code (1‑year attribution)</li>
                <li>Payouts: monthly to your account (Stripe/PayPal)</li>
                <li>Rate: 5% of actual booking revenue from your referrals for 12 months</li>
                <li>No cap. Transparent dashboard coming soon.</li>
              </ul>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-16">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">💡 Pro Tip</h3>
              <p className="text-gray-300 mb-6">
                The best ambassadors combine both strategies: they refer both users AND venues. 
                A single venue referral can generate thousands in commission, while user referrals build your recurring income.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Lightbulb className="h-4 w-4" />
                <span>Focus on quality connections that last</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotion Methods Section - Animated mosaic */}
      <section className="py-20 relative bg-gray-900/50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl animate-ambient-drift"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl animate-sophisticated-float"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">How to Promote Pulse</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Do these three and you’ll see momentum fast.</p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "✨", title: "Create Social Buzz", blurb: "Short reels, authentic stories, real faces" },
              { emoji: "📍", title: "Show Up Locally", blurb: "Posters, QR codes, campus & cafes" },
              { emoji: "🤝", title: "Activate Partners", blurb: "Introduce venues that fit Pulse groups" }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, rotate: i === 0 ? -2 : i === 2 ? 2 : 0, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pulse-pink/20 via-accent/20 to-pulse-blue/20 blur-xl" />
                <div className="relative rounded-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md p-6 text-center">
                  <div className="text-4xl mb-3">{card.emoji}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-300">{card.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex justify-center mt-10">
            <a href="https://482tykjn26x.typeform.com/to/jJAR9IcE" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'ambassador:midpage' })} className="rounded-full px-6 py-3 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white inline-flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:from-pulse-blue hover:via-accent hover:to-pulse-pink transition-all duration-300">
              Make Me a Top Ambassador
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Examples of how to promote */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="max-w-5xl mx-auto mt-12">
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Ways Ambassadors Promote Pulse</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">💼</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Business Outreach</div>
                    <div className="text-gray-300 text-sm">Talk to local business owners and venue managers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">📱</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Social Media</div>
                    <div className="text-gray-300 text-sm">Post on social media or create short reels</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✍️</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Content Creation</div>
                    <div className="text-gray-300 text-sm">Publish a blog post or newsletter feature</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🎥</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Video & Audio</div>
                    <div className="text-gray-300 text-sm">Film a YouTube video or podcast mention</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">📰</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Media Relations</div>
                    <div className="text-gray-300 text-sm">Pitch local media or campus press</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-700/50 bg-gray-800/40">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🤝</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">Events</div>
                    <div className="text-gray-300 text-sm">Host a small info session or meetup</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">
                No required actions — you choose what fits your style and schedule.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* Support & Resources Section - Polished grid with sticky CTA */}
      <section className="py-20 relative bg-gray-900/50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pulse-pink blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pulse-blue blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              We Support Your Success
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Everything you need to win: assets, templates, and real humans backing you.</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                <div className="text-white font-semibold mb-1">Assets & Templates</div>
                <div className="text-gray-300">Editable posts, posters, QR codes</div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                <div className="text-white font-semibold mb-1">Co‑marketing</div>
                <div className="text-gray-300">Venue partners + Pulse channels</div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-4">
                <div className="text-white font-semibold mb-1">1:1 Support</div>
                <div className="text-gray-300">Personal guidance to hit your goals</div>
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">Want more? Email ambassadors@pulsenow.app for the full resource list.</div>
          </div>
        </div>
      </section>

      {/* Removed Fit & Getting Started to reduce box count */}

      {/* CTA Section */}
      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Turn Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Connections Into Income?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our Ambassador Program and start earning while making a real difference in people's lives. 
              Limited spots available in select cities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://482tykjn26x.typeform.com/to/jJAR9IcE" target="_blank" rel="noopener noreferrer" onClick={(e) => trackTypeformRedirect({ href: (e.currentTarget as HTMLAnchorElement).href, source: 'ambassador:bottom_cta' })} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply to Join</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#earnings" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span>See Earnings</span>
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

export default AmbassadorProgram;
