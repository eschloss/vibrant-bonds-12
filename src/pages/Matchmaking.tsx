
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, Clock, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Users,
    number: 1,
    title: "Get Matched",
    description: "We'll match you with a small group of like-minded people.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  },
  {
    icon: MessageSquare,
    number: 2,
    title: "Break the Ice",
    description: "Chat with fellow group members, guided by our ice-breakers.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  },
  {
    icon: CalendarDays,
    number: 3,
    title: "Just Show Up",
    description: "We'll plan the meet-up—just show up.",
    color: "bg-gradient-to-r from-indigo-400 to-blue-500"
  },
  {
    icon: Sprout,
    number: 4,
    title: "Grow Connections",
    description: "After the initial meet, we'll help you grow your new connections.",
    color: "bg-gradient-to-r from-green-400 to-emerald-500"
  }
];

const Matchmaking = () => {
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
        {/* Enhanced Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Dynamic Background Elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          
          {/* Animated Particle Background */}
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
          
          {/* Glow Effects */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Decorative Element */}
              <div className="mb-6 inline-flex gap-2 items-center bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
                <Sparkles size={18} className="text-yellow-400" />
                <span className="text-white/90 text-sm font-medium">Making friendships magical</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Find Your <span className="pulse-gradient-text">Perfect Crew</span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-foreground/80 font-light mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Life's too short for awkward small talk. Meet people who get you.
              </motion.p>
              
              {/* City Highlights */}
              <div className="flex justify-center gap-2 mb-12 flex-wrap">
                {["San Francisco", "Los Angeles", "New York"].map((city) => (
                  <motion.div 
                    key={city}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/80 flex items-center gap-1"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Zap size={14} className="text-purple-400" />
                    {city}
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="xl" 
                  variant="gradient" 
                  className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
                >
                  <Zap size={18} className="text-white" />
                  <span>Start Matching Now</span>
                </Button>
                
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="rounded-full bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span>How It Works</span>
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Steps Section */}
        <section className="relative py-16 bg-gray-900 dark:bg-gray-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-6 mb-16 last:mb-0"
                >
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center text-white text-3xl font-bold`}>
                      {step.number}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className="text-white/20" size={40} />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xl text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-20 bg-gray-900/80">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
                Get matched
              </h2>
              
              <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 inline-flex items-center gap-2 text-gray-300">
                <Clock size={20} className="text-pulse-purple" />
                Takes 2 minutes
              </div>
              
              <Button 
                size="xl" 
                variant="gradient" 
                className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto"
              >
                Start Matching
                <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Matchmaking;
