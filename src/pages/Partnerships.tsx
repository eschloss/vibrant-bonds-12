
import React from "react";
import { motion } from "framer-motion";
import { Users, Handshake, Network, CalendarDays, Sparkles, Target, TrendingUp, Award, Building2, Megaphone, MessageSquare, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const Partnerships = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: t("partnerships.title", "Business Partnerships | Connect Communities | Pulse"),
      es: t("partnerships.title", "Asociaciones Comerciales | Conecta Comunidades | Pulse")
    },
    description: {
      en: t("partnerships.description", "Partner with Pulse to bring meaningful connections to your audience. Discover partnership opportunities to strengthen community engagement."),
      es: t("partnerships.description", "Asóciate con Pulse para llevar conexiones significativas a tu audiencia. Descubre oportunidades de asociación para fortalecer el compromiso comunitario.")
    },
    keywords: ["business partnerships", "community partnerships", "collaboration", "brand partnerships", "community engagement"],
    type: "website"
  };
  
  const partnershipSteps = [{
    icon: Handshake,
    title: t("partnerships.process.step1.title", "Partnership Discussion"),
    description: t("partnerships.process.step1.description", "We start with understanding your community and goals to create the perfect collaboration."),
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: Target,
    title: t("partnerships.process.step2.title", "Custom Integration"),
    description: t("partnerships.process.step2.description", "We tailor our group matching technology to fit seamlessly with your brand and community."),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: Network,
    title: t("partnerships.process.step3.title", "Launch Together"),
    description: t("partnerships.process.step3.description", "We co-launch the partnership with your community, ensuring maximum engagement from day one."),
    color: "bg-gradient-to-r from-stone-500 to-rose-500"
  }, {
    icon: TrendingUp,
    title: t("partnerships.process.step4.title", "Grow Together"),
    description: t("partnerships.process.step4.description", "Track success metrics and continuously optimize to drive community growth and engagement."),
    color: "bg-gradient-to-r from-amber-400 to-orange-500"
  }];
  
  const partnershipTypes = [{
    icon: <Building2 className="text-white h-6 w-6" />,
    title: t("partnerships.types.corporate.title", "Corporate Partners"),
    description: t("partnerships.types.corporate.description", "Help your employees build meaningful connections beyond work, fostering a stronger company culture and team dynamics.")
  }, {
    icon: <Award className="text-white h-6 w-6" />,
    title: t("partnerships.types.brand.title", "Brand Collaborations"),
    description: t("partnerships.types.brand.description", "Partner with us to create authentic community experiences that align with your brand values and reach engaged audiences.")
  }, {
    icon: <Globe className="text-white h-6 w-6" />,
    title: t("partnerships.types.platform.title", "Platform Integrations"),
    description: t("partnerships.types.platform.description", "Integrate Pulse's matching technology into your existing platform to enhance user engagement and retention.")
  }, {
    icon: <Megaphone className="text-white h-6 w-6" />,
    title: t("partnerships.types.event.title", "Event Partnerships"),
    description: t("partnerships.types.event.description", "Collaborate on events and experiences that bring communities together in meaningful ways.")
  }, {
    icon: <Users className="text-white h-6 w-6" />,
    title: t("partnerships.types.community.title", "Community Leaders"),
    description: t("partnerships.types.community.description", "Work with us to amplify your community leadership and create lasting impact through authentic connections.")
  }, {
    icon: <Sparkles className="text-white h-6 w-6" />,
    title: t("partnerships.types.innovation.title", "Innovation Partners"),
    description: t("partnerships.types.innovation.description", "Join us in pioneering new ways to build human connection in the digital age.")
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
              {t("partnerships.hero.title1", "Partner With Pulse")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {t("partnerships.hero.title2", "Build Something Amazing")}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {t("partnerships.hero.description", "Join us in revolutionizing how people connect. Whether you're a brand, platform, or community leader, let's create meaningful partnerships that bring people together in real life.")}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>{t("partnerships.hero.cta", "Explore Partnership")}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("partnerships.types.title", "Partnership Opportunities")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("partnerships.types.description", "From corporate partnerships to brand collaborations, we work with organizations that share our vision of meaningful human connection.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{type.title}</h3>
                    <p className="text-gray-300">{type.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">{t("partnerships.process.title", "How Partnership Works")}</h2>
            <p className="text-gray-300">{t("partnerships.process.description", "From initial discussion to launch and beyond")}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnershipSteps.map((step, index) => (
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

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("partnerships.contact.title", "Ready to Partner?")}</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("partnerships.contact.description", "Let's discuss how we can work together to create meaningful connections for your community.")}
            </p>
            <a href="mailto:partnerships@pulsenow.app" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
              {t("partnerships.contact.cta", "Get in Touch")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
