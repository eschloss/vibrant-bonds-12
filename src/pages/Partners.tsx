import React from "react";
import { motion } from "framer-motion";
import { Handshake, Users, Target, TrendingUp, Building, Globe, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import CommunitySignupForm from "@/components/CommunitySignupForm";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const Partners = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Business Partnerships | Grow Your Customer Community | Pulse",
      es: "Asociaciones Comerciales | Haz Crecer Tu Comunidad | Pulse"
    },
    description: {
      en: "Partner with Pulse to create meaningful connections within your customer base. Our AI-powered group matching helps businesses build stronger, more engaged communities.",
      es: "Asociate con Pulse para crear conexiones significativas dentro de tu base de clientes. Nuestro emparejamiento grupal ayuda a las empresas a construir comunidades más fuertes."
    },
    keywords: ["business partnerships", "customer community", "brand partnerships", "community engagement", "group matching"],
    type: "website"
  };
  
  const partnershipSteps = [{
    icon: Target,
    title: "Identify Your Community",
    description: "We work with you to understand your customer base and identify opportunities for deeper connection.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: Users,
    title: "Match Your Customers",
    description: "Our AI creates small groups of your customers based on shared interests and compatibility.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: Sparkles,
    title: "Facilitate Connections",
    description: "We handle the logistics while your brand gets credit for bringing people together.",
    color: "bg-gradient-to-r from-stone-500 to-rose-500"
  }, {
    icon: TrendingUp,
    title: "Measure Success",
    description: "Track engagement metrics and see how stronger connections translate to brand loyalty.",
    color: "bg-gradient-to-r from-amber-400 to-orange-500"
  }];
  
  const partnershipTypes = [{
    icon: <Building className="text-white h-6 w-6" />,
    title: "Retail & E-commerce",
    description: "Connect customers who share similar tastes and shopping preferences, creating brand ambassadors who discover and share your products together."
  }, {
    icon: <Globe className="text-white h-6 w-6" />,
    title: "SaaS & Tech",
    description: "Build user communities around your product, enabling customers to share best practices and grow together while deepening platform engagement."
  }, {
    icon: <Handshake className="text-white h-6 w-6" />,
    title: "Service Businesses",
    description: "Whether you're a gym, coworking space, or local service, help your customers form friendships that keep them coming back."
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
              Partner with Pulse to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Strengthen Customer Bonds
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Turn your customer base into a thriving community. Our AI-powered group matching helps businesses create deeper connections that drive loyalty, engagement, and growth.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#signup" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Become a Partner</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For Forward-Thinking Businesses</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're looking to increase customer retention, build brand advocates, or create new revenue streams, we have partnership models that work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipTypes.map((type, index) => 
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
              How Partnership Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Building stronger customer relationships
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {partnershipSteps.map((step, index) => 
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
                <p className="text-gray-300 mb-6">
                  Join forward-thinking businesses using Pulse to build stronger customer communities. Let's discuss how we can work together.
                </p>
                
                <div className="hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-pulse-pink/20 p-2">
                      <Handshake className="h-5 w-5 text-pulse-pink" />
                    </div>
                    <p className="text-gray-300">Trusted by innovative brands worldwide</p>
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

export default Partners;
