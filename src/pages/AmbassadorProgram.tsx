
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Star, Network, CalendarDays, Sparkles, Trophy, Heart, Zap, Gift, Crown, MessageSquare, Globe, DollarSign, TrendingUp, Target, Award, Share2, Megaphone, Building2, Users2, ArrowRight, CheckCircle, Lightbulb, MapPin, Clock, BarChart3, Palette, Handshake, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const AmbassadorProgram = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Ambassador Program | Earn While Making Impact | Pulse",
      es: "Programa de Embajadores | Gana Mientras Haces Impacto | Pulse"
    },
    description: {
      en: "Join the Pulse Ambassador Program and earn 5% commission while helping solve the loneliness epidemic. Community leaders, influencers, and connectors wanted.",
      es: "Únete al Programa de Embajadores de Pulse y gana 5% de comisión mientras ayudas a resolver la epidemia de soledad. Buscamos líderes comunitarios, influencers y conectores."
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

  const promotionMethods = [
    {
      title: "Social Media",
      description: "Share Pulse on Instagram, TikTok, YouTube, and blogs",
      icon: Share2,
      examples: ["Create engaging content", "Share your own Pulse experiences", "Tag friends who need connection"]
    },
    {
      title: "Community Spaces",
      description: "Hang posters and flyers in local gathering places",
      icon: MapPin,
      examples: ["Coffee shops", "Community centers", "Gym bulletin boards", "Student unions"]
    },
    {
      title: "Local Businesses",
      description: "Talk to venue owners about partnership opportunities",
      icon: Building2,
      examples: ["Bowling alleys", "Art studios", "Cooking classes", "Escape rooms"]
    },
    {
      title: "Networking Events",
      description: "Spread the word at meetups and community events",
      icon: Users2,
      examples: ["Professional networking", "Community meetings", "Social clubs", "Volunteer groups"]
    }
  ];

  const impactStats = [
    { number: "21M", label: "Americans with zero friends", icon: Users },
    { number: "1/3", label: "Adults unsatisfied with friend circle", icon: Heart },
    { number: "5%", label: "Commission on all referrals", icon: DollarSign },
    { number: "365", label: "Days of impact per referral", icon: CalendarDays }
  ];

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
                <div className="bg-gradient-to-r from-pulse-pink to-pulse-blue text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
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
              <a href="#apply" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply to Join</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#earnings" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span>See Earnings</span>
                <DollarSign className="h-5 w-5" />
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {impactStats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="text-center">
                  <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-xl p-4 border border-gray-700">
                    <div className="text-2xl md:text-3xl font-bold text-pulse-pink mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Loneliness Problem Section */}
      <section className="py-20 relative bg-gradient-to-br from-red-500/10 to-pink-500/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Loneliness Epidemic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                Needs Your Voice
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Millions of people are struggling with loneliness. As an ambassador, you can be part of the solution 
              while earning meaningful income. Your connections and influence can change lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30">
                <div className="text-6xl mb-6">😔</div>
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
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
                <div className="text-6xl mb-6">💪</div>
                <h3 className="text-2xl font-bold mb-4">Your Solution</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Use your network to connect lonely people</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Earn 5% commission on every referral</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
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

      {/* Promotion Methods Section - Playbook timeline */}
      <section className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">How to Promote Pulse</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">A simple playbook you can start today.</p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-0 right-0 top-9 md:top-10 h-1 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue opacity-40 rounded-full"></div>
            <div className="overflow-x-auto snap-x snap-mandatory pb-2">
              <div className="min-w-[700px] md:min-w-0 grid grid-flow-col md:grid-cols-4 auto-cols-[minmax(260px,1fr)] gap-6">
                {promotionMethods.map((method, index) => (
                  <motion.div key={method.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="snap-center">
                    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pulse-pink to-pulse-blue flex items-center justify-center ring-4 ring-gray-900">
                          <method.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{method.title}</h3>
                      </div>
                      <p className="text-sm text-gray-300">{method.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {method.examples.slice(0, 2).map((ex) => (
                          <span key={ex} className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-300 bg-gray-800/50">{ex}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Who We're Looking For</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Connectors with heart and reach.</p>
          </motion.div>

          <div className="overflow-x-auto snap-x snap-mandatory pb-2">
            <div className="min-w-[900px] md:min-w-0 grid grid-flow-col md:grid-cols-3 auto-cols-[minmax(280px,1fr)] gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Community Leaders",
                description: "People who organize events, run clubs, or lead community groups",
                icon: Crown,
                examples: ["Event organizers", "Club presidents", "Community activists", "Volunteer coordinators"]
              },
              {
                title: "Influencers & Creators",
                description: "People with social media followings and content creation skills",
                icon: Megaphone,
                examples: ["Social media influencers", "YouTubers", "Bloggers", "Content creators"]
              },
              {
                title: "Network Connectors",
                description: "People who naturally connect others and have wide social networks",
                icon: Network,
                examples: ["Networkers", "Social butterflies", "Professional connectors", "Community builders"]
              },
              {
                title: "Business Owners",
                description: "People who own or manage venues that could partner with Pulse",
                icon: Building2,
                examples: ["Venue owners", "Restaurant managers", "Activity providers", "Event spaces"]
              },
              {
                title: "Passionate Advocates",
                description: "People who care deeply about solving loneliness and building community",
                icon: Heart,
                examples: ["Mental health advocates", "Community volunteers", "Social workers", "Wellness coaches"]
              },
              {
                title: "Students & Young Professionals",
                description: "People in transition periods who understand the need for connection",
                icon: Users2,
                examples: ["College students", "Recent graduates", "Young professionals", "Relocation experts"]
              }
            ].map((profile, index) => (
              <motion.div key={profile.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="snap-center">
                <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pulse-pink to-pulse-blue flex items-center justify-center">
                      <profile.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{profile.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{profile.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.examples.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-300 bg-gray-800/50">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support & Resources Section - Matrix with sticky CTA */}
      <section className="py-20 relative bg-gradient-to-br from-blue-500/5 to-purple-500/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">We Support Your Success</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">Tools, assets, and real people behind you.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Custom Materials', icon: Palette, blurb: 'Posters, flyers, and merch tailored to your community' },
                { title: 'Digital Support', icon: Share2, blurb: 'Landing pages, social templates, QR codes' },
                { title: 'Partner Channels', icon: Handshake, blurb: 'Co‑marketing with venue partners' },
                { title: 'Personalized Strategy', icon: Target, blurb: '1:1 guidance and a clear plan' },
                { title: 'Community Tools', icon: Users, blurb: 'Event guides and engagement tips' },
                { title: 'Ongoing Support', icon: Headphones, blurb: 'Regular check‑ins and new opportunities' }
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-5 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pulse-pink to-pulse-blue flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-300">{item.blurb}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6">
                  <h3 className="text-xl font-bold mb-2">Need something special?</h3>
                  <p className="text-sm text-gray-300 mb-4">Tell us what would help you win in your city.</p>
                  <a href="mailto:ambassadors@pulsenow.app?subject=Ambassador Support Request" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-5 py-3 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 font-medium text-sm">
                    <span>Request Support</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Turn Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink to-pulse-blue">
                Connections Into Income?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our Ambassador Program and start earning while making a real difference in people's lives. 
              Limited spots available in select cities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:ambassadors@pulsenow.app?subject=Ambassador Program Application" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Apply to Join</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a href="/" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                <span>Try Pulse First</span>
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
