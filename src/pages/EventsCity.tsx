import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const EventsCity = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { t } = useTranslation();
  
  // Convert URL parameter back to readable city name
  const displayCityName = cityName?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || 'City';
  
  const seoProps = {
    title: {
      en: `Group Events in ${displayCityName} | Activity Ideas | Pulse`,
      es: `Eventos Grupales en ${displayCityName} | Ideas de Actividades | Pulse`
    },
    description: {
      en: `Discover the best group activities and events in ${displayCityName}. Get inspiration for your next friend meetup with these handpicked local experiences.`,
      es: `Descubre las mejores actividades grupales y eventos en ${displayCityName}. Inspírate para tu próximo encuentro con amigos con estas experiencias locales.`
    },
    keywords: [`${displayCityName} events`, "group activities", "friend meetups", "local experiences"],
    type: "website"
  };
  
  const eventIdeas = [
    {
      title: "Coffee & Board Games Morning",
      description: "Start your weekend with artisanal coffee and strategy games at a cozy local café.",
      category: "Indoor",
      duration: "2-3 hours",
      groupSize: "4-8 people",
      cost: "$15-25",
      icon: <Calendar className="text-white h-5 w-5" />
    },
    {
      title: "Food Market Walking Tour",
      description: "Explore local flavors and discover hidden culinary gems in the city's best food markets.",
      category: "Food & Drink",
      duration: "3-4 hours", 
      groupSize: "6-12 people",
      cost: "$20-40",
      icon: <MapPin className="text-white h-5 w-5" />
    },
    {
      title: "Escape Room Challenge",
      description: "Test your teamwork and problem-solving skills in themed escape rooms around the city.",
      category: "Adventure",
      duration: "1-2 hours",
      groupSize: "4-6 people", 
      cost: "$25-35",
      icon: <Users className="text-white h-5 w-5" />
    },
    {
      title: "Local Art Gallery Hop",
      description: "Discover emerging artists and connect over creativity in the city's vibrant art scene.",
      category: "Culture",
      duration: "2-3 hours",
      groupSize: "4-10 people",
      cost: "$10-20",
      icon: <Star className="text-white h-5 w-5" />
    },
    {
      title: "Outdoor Movie Night",
      description: "Enjoy cinema under the stars in parks and outdoor venues throughout the city.",
      category: "Outdoor",
      duration: "3-4 hours",
      groupSize: "6-15 people", 
      cost: "$5-15",
      icon: <Clock className="text-white h-5 w-5" />
    },
    {
      title: "Cooking Class Experience",
      description: "Learn to make local cuisine together in hands-on cooking workshops and classes.",
      category: "Food & Drink", 
      duration: "2-4 hours",
      groupSize: "6-12 people",
      cost: "$45-85",
      icon: <Users className="text-white h-5 w-5" />
    }
  ];
  
  const categoryColors = {
    "Indoor": "bg-blue-500/20 text-blue-300",
    "Food & Drink": "bg-orange-500/20 text-orange-300", 
    "Adventure": "bg-red-500/20 text-red-300",
    "Culture": "bg-purple-500/20 text-purple-300",
    "Outdoor": "bg-green-500/20 text-green-300"
  };
  
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
              Group Events in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                {displayCityName}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Discover amazing group activities perfect for your next friend meetup in {displayCityName}. From coffee dates to adventure challenges, find your next group experience.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={`/cities/${cityName}`}>
                <Button size="xl" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                  <span>Get Matched in {displayCityName}</span>
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activity Ideas Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect Group Activities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Here are some handpicked activity ideas perfect for groups of friends in {displayCityName}.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventIdeas.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-10 h-10 flex items-center justify-center">
                        {event.icon}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[event.category as keyof typeof categoryColors] || 'bg-gray-500/20 text-gray-300'}`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                    <p className="text-gray-300 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Clock size={14} />
                          Duration
                        </span>
                        <span>{event.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Users size={14} />
                          Group Size
                        </span>
                        <span>{event.groupSize}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Star size={14} />
                          Cost per Person
                        </span>
                        <span>{event.cost}</span>
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
      <section className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Turn Ideas into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Real Plans</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join Pulse to get matched with like-minded people in {displayCityName} and start making these activities happen with your new friend group.
            </p>
            
            <Link to={`/cities/${cityName}`}>
              <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30">
                Get Matched in {displayCityName}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsCity;
