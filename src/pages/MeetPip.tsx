
import React from "react";
import { motion } from "framer-motion";
import { Bot, Heart, Zap, MessageSquare, Sparkles, Users, Calendar, MapPin, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const MeetPip = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: t("meet_pip.title", "Meet Pip | Your AI Connection Assistant | Pulse"),
      es: t("meet_pip.title", "Conoce a Pip | Tu Asistente de Conexión IA | Pulse")
    },
    description: {
      en: t("meet_pip.description", "Meet Pip, the AI that makes group connections effortless. Learn how Pip helps facilitate conversations and plan perfect meetups for your friend groups."),
      es: t("meet_pip.description", "Conoce a Pip, la IA que hace las conexiones grupales sin esfuerzo. Aprende cómo Pip ayuda a facilitar conversaciones y planificar encuentros perfectos para tus grupos de amigos.")
    },
    keywords: ["AI assistant", "Pip", "group chat", "conversation starter", "meetup planning", "artificial intelligence"],
    type: "website"
  };

  const pipFeatures = [
    {
      icon: <MessageSquare className="text-white h-6 w-6" />,
      title: t("meet_pip.features.conversation.title", "Conversation Starter"),
      description: t("meet_pip.features.conversation.description", "Pip breaks the ice with fun questions and topics that get everyone talking and sharing.")
    },
    {
      icon: <Calendar className="text-white h-6 w-6" />,
      title: t("meet_pip.features.planner.title", "Meetup Planner"),
      description: t("meet_pip.features.planner.description", "From finding the perfect time to suggesting activities, Pip makes planning effortless.")
    },
    {
      icon: <MapPin className="text-white h-6 w-6" />,
      title: t("meet_pip.features.expert.title", "Local Expert"),
      description: t("meet_pip.features.expert.description", "Pip knows your city and suggests the best spots for your group's interests and vibe.")
    },
    {
      icon: <Users className="text-white h-6 w-6" />,
      title: t("meet_pip.features.dynamics.title", "Group Dynamics"),
      description: t("meet_pip.features.dynamics.description", "Pip understands your group's personality and adapts suggestions to everyone's preferences.")
    },
    {
      icon: <Coffee className="text-white h-6 w-6" />,
      title: t("meet_pip.features.curator.title", "Activity Curator"),
      description: t("meet_pip.features.curator.description", "From coffee chats to adventure outings, Pip finds activities that bring out the best conversations.")
    },
    {
      icon: <Heart className="text-white h-6 w-6" />,
      title: t("meet_pip.features.coach.title", "Connection Coach"),
      description: t("meet_pip.features.coach.description", "Pip helps deepen friendships by encouraging meaningful conversations and shared experiences.")
    }
  ];

  const pipExamples = [
    {
      scenario: t("meet_pip.examples.new_group", "New Group Chat"),
      pipResponse: "Hey everyone! 🎉 I'm Pip, your group's AI assistant. Let's start with a fun question: What's the most interesting thing that happened to you this week?"
    },
    {
      scenario: t("meet_pip.examples.planning", "Planning a Meetup"),
      pipResponse: "I noticed you're all free this Saturday! How about we explore that new art district downtown? I found a great coffee shop with outdoor seating perfect for group conversations ☕🎨"
    },
    {
      scenario: t("meet_pip.examples.energy", "Keeping Energy Up"),
      pipResponse: "This conversation is amazing! Since you're all into hiking, has anyone tried the new trail that opened up? I can share some details and we could plan a group adventure! 🥾"
    }
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
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-4">
                <Bot size={64} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t("meet_pip.hero.title1", "Meet Pip")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {t("meet_pip.hero.title2", "Your AI Friend")}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {t("meet_pip.hero.description", "Pip is the AI that makes group connections effortless. From breaking the ice to planning perfect meetups, Pip helps your friend groups thrive and creates lasting memories.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("meet_pip.features.title", "What Pip Does")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("meet_pip.features.description", "Pip is designed to make every group interaction more meaningful and every meetup more memorable.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipFeatures.map((feature, index) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 relative bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("meet_pip.examples.title", "Pip in Action")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("meet_pip.examples.description", "Here's how Pip helps groups connect and plan amazing experiences together.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pipExamples.map((example, index) => (
              <motion.div key={example.scenario} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="text-pulse-pink mr-2" size={20} />
                      <h3 className="text-lg font-bold text-white">{example.scenario}</h3>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-gray-200 text-sm italic">"{example.pipResponse}"</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Pip Works Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("meet_pip.science.title", "The Science Behind Pip")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("meet_pip.science.description", "Pip combines advanced AI with deep understanding of human psychology to create meaningful connections.")}
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Zap className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("meet_pip.science.analysis.title", "Smart Analysis")}</h3>
                    <p className="text-gray-300 text-sm">{t("meet_pip.science.analysis.description", "Pip analyzes group dynamics, interests, and communication patterns to personalize interactions.")}</p>
                  </div>
                  <div className="text-center">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Heart className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("meet_pip.science.psychology.title", "Human Psychology")}</h3>
                    <p className="text-gray-300 text-sm">{t("meet_pip.science.psychology.description", "Built on research about friendship formation and what makes conversations meaningful.")}</p>
                  </div>
                  <div className="text-center">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("meet_pip.science.learning.title", "Continuous Learning")}</h3>
                    <p className="text-gray-300 text-sm">{t("meet_pip.science.learning.description", "Pip learns from successful group interactions to get better at facilitating connections.")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("meet_pip.cta.title", "Ready to Meet Pip?")}</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("meet_pip.cta.description", "Join Pulse and let Pip help you build amazing friendships through meaningful conversations and unforgettable experiences.")}
            </p>
            <a href="/" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
              {t("meet_pip.cta.button", "Get Started with Pulse")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MeetPip;
