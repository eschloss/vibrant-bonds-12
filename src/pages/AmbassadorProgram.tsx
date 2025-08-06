
import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Network, CalendarDays, Sparkles, Trophy, Heart, Zap, Gift, Crown, MessageSquare, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const AmbassadorProgram = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Ambassador Program | Spread Connection | Pulse",
      es: "Programa de Embajadores | Difunde Conexión | Pulse"
    },
    description: {
      en: "Join the Pulse Ambassador Program and help bring meaningful connections to your community. Earn rewards while spreading the joy of real-life friendships.",
      es: "Únete al Programa de Embajadores de Pulse y ayuda a llevar conexiones significativas a tu comunidad. Gana recompensas mientras difundes la alegría de las amistades reales."
    },
    keywords: ["ambassador program", "community leaders", "referral program", "brand ambassadors", "social impact"],
    type: "website"
  };
  
  const ambassadorSteps = [{
    icon: Star,
    title: "Apply to Join",
    description: "Share your passion for building community and tell us why you'd be a great ambassador.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: Zap,
    title: "Get Activated",
    description: "Receive your ambassador toolkit, training, and exclusive access to new features.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: Network,
    title: "Spread the Word",
    description: "Share Pulse with your networks and help people discover meaningful connections.",
    color: "bg-gradient-to-r from-stone-500 to-rose-500"
  }, {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Get recognized for your impact with exclusive perks, rewards, and recognition.",
    color: "bg-gradient-to-r from-amber-400 to-orange-500"
  }];
  
  const ambassadorBenefits = [{
    icon: <Crown className="text-white h-6 w-6" />,
    title: "Exclusive Access",
    description: "Be the first to try new features and get behind-the-scenes access to Pulse updates."
  }, {
    icon: <Gift className="text-white h-6 w-6" />,
    title: "Rewards & Perks",
    description: "Earn points, exclusive merchandise, and special recognition for your contributions."
  }, {
    icon: <Heart className="text-white h-6 w-6" />,
    title: "Make Real Impact",
    description: "Help people form genuine friendships and build stronger communities in your city."
  }, {
    icon: <Users className="text-white h-6 w-6" />,
    title: "Ambassador Network",
    description: "Connect with like-minded ambassadors from around the world in our exclusive community."
  }, {
    icon: <MessageSquare className="text-white h-6 w-6" />,
    title: "Direct Feedback",
    description: "Have your voice heard in product development and help shape the future of Pulse."
  }, {
    icon: <Sparkles className="text-white h-6 w-6" />,
    title: "Personal Growth",
    description: "Develop leadership skills and grow your personal brand as a community connector."
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
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join our community of passionate advocates and help spread meaningful connections in your city. Make a real impact while earning exclusive rewards and recognition.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#apply" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ambassador Benefits</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe in rewarding those who help build stronger communities. Here's what you get as a Pulse Ambassador.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambassadorBenefits.map((benefit, index) => (
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
            ))}
          </div>
        </div>
      </section>
    
      {/* How It Works Section */}
      <section className="relative py-12 bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How to Become an Ambassador</h2>
            <p className="text-gray-300">Your journey to spreading meaningful connections</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {ambassadorSteps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of ambassadors worldwide who are helping build stronger, more connected communities.
            </p>
            <a href="mailto:ambassadors@pulsenow.app?subject=Ambassador Program Application" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AmbassadorProgram;
