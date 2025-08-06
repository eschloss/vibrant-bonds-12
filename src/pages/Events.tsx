import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const Events = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Group Events & Activities by City | Pulse",
      es: "Eventos y Actividades Grupales por Ciudad | Pulse"
    },
    description: {
      en: "Discover group activities and events in your city. Find inspiration for your next meetup with friends through Pulse.",
      es: "Descubre actividades grupales y eventos en tu ciudad. Encuentra inspiración para tu próximo encuentro con amigos a través de Pulse."
    },
    keywords: ["group events", "city activities", "group meetups", "social events", "group activities"],
    type: "website"
  };
  
  const cities = [
    { name: "London", country: "UK", image: "https://s.kikiapp.eu/img/cities/london.jpg" },
    { name: "Los Angeles", country: "US", image: "https://s.kikiapp.eu/img/cities/losangeles.jpg" },
    { name: "New York", country: "US", image: "https://s.kikiapp.eu/img/cities/newyork.jpg" },
    { name: "Berlin", country: "Germany", image: "https://s.kikiapp.eu/img/cities/berlin.jpg" },
    { name: "Madrid", country: "Spain", image: "https://s.kikiapp.eu/img/cities/madrid.jpg" },
    { name: "Portland", country: "US", image: "https://s.kikiapp.eu/img/cities/portland.jpg" },
    { name: "Chicago", country: "US", image: "https://s.kikiapp.eu/img/cities/chicago.jpg" },
    { name: "Boston", country: "US", image: "https://s.kikiapp.eu/img/cities/boston.jpg" },
    { name: "Paris", country: "France", image: "https://s.kikiapp.eu/img/cities/paris.jpg" },
    { name: "Amsterdam", country: "Netherlands", image: "https://s.kikiapp.eu/img/cities/amsterdam.jpg" },
    { name: "Barcelona", country: "Spain", image: "https://s.kikiapp.eu/img/cities/barcelona.jpg" },
    { name: "Toronto", country: "Canada", image: "https://s.kikiapp.eu/img/cities/toronto.jpg" }
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Group Events &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Activities by City
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Get inspiration for your next group meetup. Discover activities and events perfect for groups of friends in cities around the world.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <Calendar size={20} />
              <span>Group Activities</span>
              <Users size={20} />
              <span>Friend Meetups</span>
              <Sparkles size={20} />
              <span>Local Events</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your City</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select a city to discover group activities and event ideas perfect for your next friend meetup.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link to={`/events/${city.name.toLowerCase().replace(' ', '-')}`}>
                  <Card className="group bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={city.image} 
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-pulse-pink transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-sm text-gray-400">{city.country}</p>
                        </div>
                        <MapPin size={16} className="text-pulse-pink" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
