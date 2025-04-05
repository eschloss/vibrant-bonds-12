
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, UserPlus, ArrowDownToLine, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const citiesWithInfo = [
  { 
    name: "San Francisco",
    slug: "san-francisco",
    description: "Tech meetups, hiking groups & coffee chats",
    active: true
  },
  { 
    name: "New York",
    slug: "new-york",
    description: "Vibrant social scenes & diverse connections",
    active: true
  },
  { 
    name: "Los Angeles",
    slug: "los-angeles",
    description: "Creative collaborations & beach hangouts",
    active: true
  },
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCity, setActiveCity] = useState(citiesWithInfo[0]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative min-h-[80vh] flex items-center py-12 md:py-20 overflow-hidden section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
      </div>
      
      {/* Decorative Shapes */}
      <div className="absolute top-1/4 left-10 w-12 h-12 rounded-full bg-pulse-blue/20 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-pulse-purple/20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-pulse-teal/20 animate-bounce-gentle"></div>

      <div className="container mx-auto">
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
          {/* Left Column: Text Content */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 w-fit mb-6"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pulse-purple"></span>
              </span>
              Available in select cities
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="heading-xl mb-6"
            >
              <span className="pulse-gradient-text">Find Your Crew</span> in Your City
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="paragraph text-lg md:text-xl text-foreground/80 mb-8"
            >
              We match like-minded people into group chats where AI sparks conversations and plans real-life meetups. Getting started takes less than 2 minutes.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-2 mb-8"
            >
              <Button 
                size="xl" 
                variant="gradient" 
                className="shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 rounded-full"
                asChild
              >
                <Link to="/matchmaking">
                  <UserPlus size={18} />
                  <span>Start Matching</span>
                </Link>
              </Button>
              
              <Button 
                size="xl" 
                variant="outline" 
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Download App</span>
                <ArrowDownToLine size={18} />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 mt-2"
            >
              <div className="inline-flex p-2 items-center gap-1.5 text-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full text-foreground/70">
                <Clock size={14} className="text-pulse-purple" />
                <span>Takes 2 minutes</span>
              </div>
              
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200" 
                    style={{
                      backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
                      backgroundSize: 'cover'
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/70">
                <span className="font-semibold">3,000+</span> new connections
              </p>
            </motion.div>
          </div>
          
          {/* Right Column: City Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative z-10 hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-pulse-purple/10 to-pulse-blue/5 rounded-3xl blur-2xl -z-10"></div>
              <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20 p-6 shadow-xl">
                <h3 className="text-xl font-medium mb-5">Choose your city</h3>
                
                <div className="space-y-4">
                  {citiesWithInfo.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/cities/${city.slug}`}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        activeCity.name === city.name
                          ? "bg-gradient-to-r from-pulse-purple/20 to-pulse-blue/10 border border-pulse-purple/30"
                          : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50 border border-transparent"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCity(city);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pulse-purple/10">
                          <MapPin className="w-5 h-5 text-pulse-purple" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{city.name}</div>
                          <div className="text-sm text-foreground/60">{city.description}</div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                          activeCity.name === city.name ? "text-pulse-purple" : "text-gray-400"
                        }`} />
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to={`/cities/${activeCity.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-pulse-purple text-white rounded-lg font-medium transition-all hover:bg-pulse-purple/90"
                  >
                    <span>Explore {activeCity.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile City Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:hidden w-full"
          >
            <Carousel className="w-full">
              <CarouselContent>
                {citiesWithInfo.map((city) => (
                  <CarouselItem key={city.slug} className="md:basis-1/2">
                    <Link to={`/cities/${city.slug}`} className="block">
                      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 p-5 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pulse-purple/10">
                            <MapPin className="w-4 h-4 text-pulse-purple" />
                          </div>
                          <div className="font-medium">{city.name}</div>
                        </div>
                        <p className="text-sm text-foreground/70 mb-4">{city.description}</p>
                        <div className="flex items-center text-sm text-pulse-purple font-medium">
                          <span>Explore</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
