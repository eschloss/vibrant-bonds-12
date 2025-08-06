import React from "react";
import { motion } from "framer-motion";
import { Star, Users, Gift, TrendingUp, Trophy, Heart, Sparkles, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import CommunitySignupForm from "@/components/CommunitySignupForm";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const AmbassadorProgram = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Ambassador Program | Spread the Word | Pulse",
      es: "Programa de Embajadores | Comparte la Palabra | Pulse"
    },
    description: {
      en: "Join the Pulse Ambassador Program and help build meaningful communities in your city. Earn rewards while connecting people and spreading friendship.",
      es: "Únete al Programa de Embajadores de Pulse y ayuda a construir comunidades significativas en tu ciudad. Gana recompensas mientras conectas personas."
    },
    keywords: ["ambassador program", "community building", "referral program", "social impact", "friendship"],
    type: "website"
  };
  
  const ambassadorSteps = [{
    icon: Star,
    title: "Apply & Get Accepted",
    description: "Share your passion for community building and get accepted into our exclusive ambassador program.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: Users,
    title: "Spread the Word",
    description: "Share Pulse with your network and help people in your city discover meaningful connections.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: Gift,
    title: "Earn Rewards",
    description: "Get exclusive perks, early access to features, and rewards for every successful referral.",
    color: "bg-gradient-to-r from-stone-500 to-rose-500"
  }, {
    icon: Trophy,
    title: "Make Impact",
    description: "See the friendships you've helped create and be recognized as a community leader.",
    color: "bg-gradient-to-r from-amber-400 to-orange-500"
  }];
  
  const ambassadorBenefits = [{
    icon: <Crown className="text-white h-6 w-6" />,
    title: "VIP Status",
    description: "Get priority access to new features, exclusive events, and direct line to our team for feedback and suggestions."
  }, {
    icon: <Gift className="text-white h-6 w-6" />,
    title: "Exclusive Rewards",
    description: "Earn points for referrals that can be redeemed for cash, gift cards, or exclusive Pulse merchandise."
  }, {
    icon: <Heart className="text-white h-6 w-6" />,
    title: "Community Impact",
    description: "Be part of something bigger—help combat loneliness and build stronger, more connected communities."
  }, {
    icon: <TrendingUp className="text-white h-6 w-6" />,
    title: "Personal Growth",
    description: "Develop leadership skills, expand your network, and gain experience in community building and social impact."
  }];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Become a Pulse
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Ambassador
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Help us build communities that matter. Join our ambassador program and earn rewards while connecting people and spreading friendship in your city.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#signup" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Join the Program</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get as an Ambassador</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our ambassadors are valued members of the Pulse family. Here's what you can expect when you join our program.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ambassadorBenefits.map((benefit, index) => 
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-12 bg-gray-900/50 backdrop-blur-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
            <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
              <Sparkles size={18} className="text-purple-400" />
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Your journey as a Pulse Ambassador
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {ambassadorSteps.map((step, index) => 
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-20 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
                <p className="text-gray-300 mb-6">
                  Join our ambassador program and help us build meaningful connections in communities around the world. Apply now to get started.
                </p>
                
                <div className="hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-pulse-pink/20 p-2">
                      <Star className="h-5 w-5 text-pulse-pink" />
                    </div>
                    <p className="text-gray-300">Join thousands of ambassadors worldwide</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                <CommunitySignupForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AmbassadorProgram;
