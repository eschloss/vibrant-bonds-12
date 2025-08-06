import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Users, Heart, Sparkles, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const MeetPip = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Meet Pip | Your AI Friendship Assistant | Pulse",
      es: "Conoce a Pip | Tu Asistente de Amistad IA | Pulse"
    },
    description: {
      en: "Meet Pip, Pulse's AI assistant that helps facilitate conversations, plan group activities, and turn digital connections into real-life friendships.",
      es: "Conoce a Pip, el asistente IA de Pulse que ayuda a facilitar conversaciones, planear actividades grupales y convertir conexiones digitales en amistades reales."
    },
    keywords: ["AI assistant", "Pip", "conversation starter", "friendship", "group activities", "social AI"],
    type: "website"
  };
  
  const pipFeatures = [{
    icon: <MessageSquare className="text-white h-6 w-6" />,
    title: "Conversation Starter",
    description: "Pip helps break the ice in group chats with thoughtful questions and engaging conversation prompts tailored to your group's interests."
  }, {
    icon: <Users className="text-white h-6 w-6" />,
    title: "Activity Planner",
    description: "From coffee meetups to hiking trips, Pip suggests activities based on your group's preferences, location, and schedules."
  }, {
    icon: <Zap className="text-white h-6 w-6" />,
    title: "Smart Matching",
    description: "Pip uses advanced AI to understand personalities and interests, creating groups of 6-12 people with genuine compatibility."
  }, {
    icon: <Heart className="text-white h-6 w-6" />,
    title: "Friendship Guide",
    description: "Get personalized tips and advice on building lasting friendships, maintaining connections, and growing your social circle."
  }];

  const pipPersonality = [
    "Friendly and approachable, never pushy or overwhelming",
    "Genuinely curious about people and their stories", 
    "Encouraging without being fake or overly optimistic",
    "Respectful of boundaries and social cues",
    "Helpful in practical ways, not just cheerleading",
    "Understands that making friends as an adult is genuinely hard"
  ];
  
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
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-1">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <Bot size={48} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Meet 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {" "}Pip
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Your AI friendship assistant who helps turn awkward small talk into genuine connections. Pip is here to make forming adult friendships feel natural and fun.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="xl" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Chat with Pip</span>
                <MessageSquare size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Pip Does Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Pip Does</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pip is designed to be the friend you need to make friends—supportive, insightful, and always ready to help you connect.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pipFeatures.map((feature, index) => 
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Pip's Personality Section */}
      <section className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pip's Personality</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've carefully crafted Pip to be the kind of assistant that actually helps, without being annoying or fake.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pipPersonality.map((trait, index) => 
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg"
                >
                  <Sparkles size={16} className="text-pulse-pink flex-shrink-0" />
                  <p className="text-gray-300">{trait}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Example Conversation Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Pip in Action</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here's how Pip might help your group get started with some conversation.
            </p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pulse-pink to-pulse-blue flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-2xl p-3 flex-1">
                      <p className="text-white">Hey everyone! 👋 I'm Pip, and I'm here to help you all get to know each other. I noticed you all mentioned loving coffee—has anyone found a hidden gem coffee shop recently?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-pulse-pink rounded-2xl p-3 max-w-xs">
                      <p className="text-white">Oh yes! There's this tiny place called Bean There that just opened downtown.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white">A</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pulse-pink to-pulse-blue flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-2xl p-3 flex-1">
                      <p className="text-white">That sounds amazing! Maybe you could all check it out together this weekend? I can help coordinate a time that works for everyone ☕</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MeetPip;
