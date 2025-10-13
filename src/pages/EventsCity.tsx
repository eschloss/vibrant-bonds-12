
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Clock, Coffee, Utensils, Gamepad2, Music, Mountain, Camera, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/hooks/useSeo";
import { useRefParam } from "@/hooks/useRefParam";

const EventsCity = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { addRefToUrl } = useRefParam();
  
  const formattedCityName = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).replace('-', ' ') : 'City';
  
  const seoProps = {
    title: {
      en: `Group Events in ${formattedCityName} | Pulse`,
      es: `Eventos Grupales en ${formattedCityName} | Pulse`
    },
    description: {
      en: `Group events in ${formattedCityName}: meet friends, join groups, and plan IRL activities. Coffee, hikes, trivia, and more in ${formattedCityName}.`,
      es: `Eventos grupales en ${formattedCityName}: conoce amigues, únete a grupos y planifica actividades en persona. Café, rutas, trivia y más en ${formattedCityName}.`
    },
    keywords: ["group events", "activities", formattedCityName, "meetups", "friend groups", "social activities"],
    type: "website"
  };

  const eventIdeas = [
    {
      icon: <Coffee className="text-white h-6 w-6" />,
      title: "Coffee & Conversation",
      description: "Start with something simple - a cozy café where your group can chat and get to know each other over great coffee.",
      time: "1-2 hours",
      groupSize: "4-8 people",
      vibe: "Relaxed & Social",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <Utensils className="text-white h-6 w-6" />,
      title: "Food Adventure",
      description: "Explore local restaurants, food markets, or try a cooking class together. Nothing bonds people like sharing a meal.",
      time: "2-3 hours",
      groupSize: "6-10 people",
      vibe: "Fun & Interactive",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Gamepad2 className="text-white h-6 w-6" />,
      title: "Game Night",
      description: "Board games, trivia nights, or arcade venues - perfect for breaking the ice and bringing out everyone's playful side.",
      time: "2-4 hours",
      groupSize: "4-8 people",
      vibe: "Playful & Competitive",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Mountain className="text-white h-6 w-6" />,
      title: "Outdoor Adventure",
      description: "Hiking, park picnics, or outdoor sports. Fresh air and shared challenges create lasting memories.",
      time: "3-6 hours",
      groupSize: "6-12 people",
      vibe: "Active & Energetic",
      color: "from-teal-500 to-cyan-600"
    },
    {
      icon: <Music className="text-white h-6 w-6" />,
      title: "Cultural Experience",
      description: "Museums, live music, art galleries, or local festivals. Discover your city's culture together.",
      time: "2-4 hours",
      groupSize: "4-10 people",
      vibe: "Inspiring & Cultural",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <Camera className="text-white h-6 w-6" />,
      title: "Photo Walk",
      description: "Explore interesting neighborhoods, capture memories, and see your city through fresh eyes together.",
      time: "2-3 hours",
      groupSize: "4-8 people",
      vibe: "Creative & Exploratory",
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
              onClick={() => navigate('/events')} 
              className="flex items-center text-pulse-pink hover:text-pulse-pink-300 mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Cities
            </button>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Group Events in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  {formattedCityName}
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Discover amazing activities perfect for friend groups. From laid-back coffee meetups to exciting adventures, here are the kinds of plans that turn strangers into lifelong friends.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect Plans for Your Crew</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These are the types of activities that create the best group experiences. When you join Pulse, Pip will help you plan the perfect version of these based on your group's interests.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventIdeas.map((event, index) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group hover:scale-105">
                  <CardContent className="p-6">
                    <div className={`rounded-full bg-gradient-to-r ${event.color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{event.title}</h3>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock size={16} className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users size={16} className="mr-2" />
                        {event.groupSize}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar size={16} className="mr-2" />
                        {event.vibe}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Plans in {formattedCityName}?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Pulse to get matched with a friend group and start planning amazing experiences together. Pip will help you find the perfect activities for your crew.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={addRefToUrl("/")} className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                Join Pulse
              </a>
              <button 
                onClick={() => navigate(addRefToUrl(`/cities/${cityName}`))}
                className="border border-pulse-pink text-pulse-pink hover:bg-pulse-pink hover:text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg"
              >
                <MapPin size={20} />
                Visit {formattedCityName} Page
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsCity;
