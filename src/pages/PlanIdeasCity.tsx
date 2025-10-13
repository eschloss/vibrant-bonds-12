
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, Users, MapPin, Clock, Coffee, Utensils, Gamepad2, Music, Mountain, Camera, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import { useRefParam } from "@/hooks/useRefParam";

const PlanIdeasCity = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();
  
  const formattedCityName = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).replace('-', ' ') : 'City';
  
  const seoProps = {
    title: {
      en: `Group Plan Ideas in ${formattedCityName} | Pulse`,
      es: `Ideas de Planes Grupales en ${formattedCityName} | Pulse`
    },
    description: {
      en: `Group plan ideas in ${formattedCityName}: coffee, hikes, trivia, pottery, picnics and more. Meet friends and plan IRL activities in ${formattedCityName}.`,
      es: `Ideas de planes grupales en ${formattedCityName}: café, rutas, trivia, cerámica, picnic y más. Conoce amigues y planifica actividades en persona en ${formattedCityName}.`
    },
    keywords: ["group plan ideas", "activities", formattedCityName, "friend group experiences", "hangout ideas", "group activities"],
    type: "website"
  };

  const planIdeas = [
    {
      icon: <Coffee className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.coffee.title", "Coffee & Conversation"),
      description: t("plan_ideas_city.coffee.description", "Start with something simple - a cozy café where your group can chat and get to know each other over great coffee and pastries."),
      time: t("plan_ideas_city.coffee.time", "1-2 hours"),
      groupSize: t("plan_ideas_city.coffee.size", "4-8 people"),
      vibe: t("plan_ideas_city.coffee.vibe", "Relaxed & Social"),
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <Utensils className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.food.title", "Food Adventure"),
      description: t("plan_ideas_city.food.description", "Explore local restaurants, food markets, or try a cooking class together. Nothing bonds people like sharing a great meal and new flavors."),
      time: t("plan_ideas_city.food.time", "2-3 hours"),
      groupSize: t("plan_ideas_city.food.size", "6-10 people"),
      vibe: t("plan_ideas_city.food.vibe", "Fun & Interactive"),
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Gamepad2 className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.game.title", "Game Night"),
      description: t("plan_ideas_city.game.description", "Board games, trivia nights, or arcade venues - perfect for breaking the ice and bringing out everyone's playful, competitive side."),
      time: t("plan_ideas_city.game.time", "2-4 hours"),
      groupSize: t("plan_ideas_city.game.size", "4-8 people"),
      vibe: t("plan_ideas_city.game.vibe", "Playful & Competitive"),
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Mountain className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.outdoor.title", "Outdoor Adventure"),
      description: t("plan_ideas_city.outdoor.description", "Hiking trails, park picnics, or outdoor sports. Fresh air and shared challenges create lasting memories and natural bonding moments."),
      time: t("plan_ideas_city.outdoor.time", "3-6 hours"),
      groupSize: t("plan_ideas_city.outdoor.size", "6-12 people"),
      vibe: t("plan_ideas_city.outdoor.vibe", "Active & Energetic"),
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: <Music className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.cultural.title", "Cultural Experience"),
      description: t("plan_ideas_city.cultural.description", "Museums, live music venues, art galleries, or local festivals. Discover your city's culture together and spark interesting conversations."),
      time: t("plan_ideas_city.cultural.time", "2-4 hours"),
      groupSize: t("plan_ideas_city.cultural.size", "4-10 people"),
      vibe: t("plan_ideas_city.cultural.vibe", "Inspiring & Cultural"),
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <Camera className="text-white h-6 w-6" />,
      title: t("plan_ideas_city.photo.title", "Photo Walk"),
      description: t("plan_ideas_city.photo.description", "Explore interesting neighborhoods, capture memories, and see your city through fresh eyes together while creating lasting photo memories."),
      time: t("plan_ideas_city.photo.time", "2-3 hours"),
      groupSize: t("plan_ideas_city.photo.size", "4-8 people"),
      vibe: t("plan_ideas_city.photo.vibe", "Creative & Exploratory"),
      color: "from-blue-500 to-purple-600"
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/plan-ideas')} 
              className="flex items-center text-pulse-pink hover:text-pulse-pink-300 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              {t("plan_ideas_city.back_button", "Back to Cities")}
            </button>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("plan_ideas_city.hero.title1", "Plan Ideas for")}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  {formattedCityName}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                {t("plan_ideas_city.hero.description", "Discover amazing activity ideas perfect for friend groups. From laid-back coffee hangouts to exciting adventures, here are the kinds of plans that turn strangers into lifelong friends.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plan Ideas Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("plan_ideas_city.ideas.title", "Perfect Plans for Your Crew")}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("plan_ideas_city.ideas.description", "These are the types of activities that create the best group experiences. When you join Pulse, Pip will help you plan the perfect version of these based on your group's interests.")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planIdeas.map((idea, index) => (
              <motion.div key={idea.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group hover:scale-105">
                  <CardContent className="p-6">
                    <div className={`rounded-full bg-gradient-to-r ${idea.color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {idea.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{idea.title}</h3>
                    <p className="text-gray-300 mb-4">{idea.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock size={16} className="mr-2" />
                        {idea.time}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users size={16} className="mr-2" />
                        {idea.groupSize}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Lightbulb size={16} className="mr-2" />
                        {idea.vibe}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("plan_ideas_city.cta.title", "Ready to Make Plans in {city}?").replace("{city}", formattedCityName)}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("plan_ideas_city.cta.description", "Join Pulse to get matched with a friend group and start planning amazing experiences together. Pip will help you find the perfect activities for your crew.")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={addRefToUrl("/")} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                {t("plan_ideas_city.cta.button", "Join Pulse")}
              </a>
              <button 
                onClick={() => navigate(addRefToUrl(`/cities/${cityName}`))}
                className="border border-pulse-pink text-pulse-pink hover:bg-pulse-pink hover:text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg"
              >
                <MapPin size={20} />
                {t("plan_ideas_city.cta.city_button", "Visit {city} Page").replace("{city}", formattedCityName)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanIdeasCity;
