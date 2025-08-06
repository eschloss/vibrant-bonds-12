
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, Users, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/hooks/useSeo";

const PlanIdeas = () => {
  const seoProps = {
    title: {
      en: "Group Plan Ideas by City | Activity Inspiration | Pulse",
      es: "Ideas de Planes Grupales por Ciudad | Inspiración de Actividades | Pulse"
    },
    description: {
      en: "Discover creative group plan ideas and activities in cities worldwide. Find inspiration for unforgettable experiences with your friend group.",
      es: "Descubre ideas creativas de planes grupales y actividades en ciudades de todo el mundo. Encuentra inspiración para experiencias inolvidables con tu grupo de amigos."
    },
    keywords: ["group plan ideas", "city activities", "friend group experiences", "activity inspiration", "group hangouts", "plan ideas by city"],
    type: "website"
  };

  const cities = [
    {
      name: "London",
      slug: "london",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      description: "From pub crawls to Thames walks, London offers endless group experiences.",
      ideaCount: "50+ plan ideas"
    },
    {
      name: "Los Angeles",
      slug: "los-angeles",
      image: "https://images.unsplash.com/photo-1534190760961-74e8657d76fe?w=800&h=600&fit=crop",
      description: "Beach days, hiking trails, and rooftop bars make LA perfect for groups.",
      ideaCount: "40+ plan ideas"
    },
    {
      name: "New York",
      slug: "new-york",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      description: "The city that never sleeps has unlimited options for friend groups.",
      ideaCount: "60+ plan ideas"
    },
    {
      name: "Berlin",
      slug: "berlin",
      image: "https://images.unsplash.com/photo-1587330979470-3316b628e0a6?w=800&h=600&fit=crop",
      description: "Art galleries, beer gardens, and underground culture await your crew.",
      ideaCount: "35+ plan ideas"
    },
    {
      name: "Madrid",
      slug: "madrid",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73569?w=800&h=600&fit=crop",
      description: "Tapas tours, park picnics, and flamenco shows for unforgettable nights.",
      ideaCount: "30+ plan ideas"
    },
    {
      name: "Portland",
      slug: "portland",
      image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=800&h=600&fit=crop",
      description: "Food trucks, craft breweries, and nature escapes in the Pacific Northwest.",
      ideaCount: "25+ plan ideas"
    },
    {
      name: "Chicago",
      slug: "chicago",
      image: "https://images.unsplash.com/photo-1477414956199-7dafc86a4f1a?w=800&h=600&fit=crop",
      description: "Deep dish pizza, lakefront activities, and world-class museums.",
      ideaCount: "35+ plan ideas"
    },
    {
      name: "Boston",
      slug: "boston",
      image: "https://images.unsplash.com/photo-1518474526234-60fdc29e3f98?w=800&h=600&fit=crop",
      description: "Historic walks, harbor cruises, and cozy neighborhood hangouts.",
      ideaCount: "30+ plan ideas"
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
            <div className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-4">
              <Lightbulb size={18} className="text-purple-400" />
              Group Plan Ideas & Inspiration
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect Plan Ideas
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                For Your Friend Group
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Discover amazing group activity ideas in cities worldwide. From casual coffee hangouts to epic adventures, explore the kinds of plans that turn acquaintances into lifelong friends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cities Grid Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Cities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Click on any city to discover curated plan ideas perfect for friend groups. Each city has unique experiences waiting to be explored together.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <motion.div key={city.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Link to={`/plan-ideas/${city.slug}`}>
                  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group hover:scale-105 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={city.image} 
                        alt={`${city.name} plan ideas and activities`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center text-pulse-pink text-sm mb-1">
                          <Sparkles size={14} className="mr-1" />
                          {city.ideaCount}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-pulse-pink transition-colors">{city.name}</h3>
                        <MapPin size={16} className="text-gray-400" />
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{city.description}</p>
                      <div className="flex items-center text-pulse-pink text-sm">
                        <Users size={14} className="mr-1" />
                        Perfect for groups
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Planning?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join Pulse to get matched with a friend group in your city. Pip will help you plan amazing experiences based on your interests and the activities that work best in your area.
            </p>
            <a href="/" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
              Join Pulse
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanIdeas;
