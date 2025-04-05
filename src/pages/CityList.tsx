
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// These city names should match the route parameters in the CityPage component
const cities = [
  { name: "San Francisco", slug: "san-francisco" },
  { name: "Los Angeles", slug: "los-angeles" },
  { name: "New York", slug: "new-york" },
  { name: "Chicago", slug: "chicago" },
  { name: "Miami", slug: "miami" },
  { name: "Seattle", slug: "seattle" },
  { name: "Austin", slug: "austin" },
  { name: "Boston", slug: "boston" },
  { name: "Denver", slug: "denver" },
  { name: "Portland", slug: "portland" },
  { name: "Nashville", slug: "nashville" },
  { name: "Atlanta", slug: "atlanta" },
];

const CityList = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          
          <div className="absolute inset-0 -z-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-purple-500/20" 
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }} 
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Find Friends in <span className="pulse-gradient-text">Your City</span>
              </h1>
              <p className="text-xl text-foreground/80 font-light">
                Select your city to connect with like-minded people near you.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cities.map((city, index) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/cities/${city.slug}`} className="block">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full hover:bg-gray-800/70 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-500/20 rounded-full p-3">
                          <MapPin className="text-purple-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{city.name}</h3>
                          <p className="text-gray-300 mb-4">Connect with friends in {city.name}</p>
                          
                          <div className="flex justify-end">
                            <Button variant="ghost" size="sm" className="text-purple-400 group-hover:bg-purple-500/20">
                              View <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CityList;
