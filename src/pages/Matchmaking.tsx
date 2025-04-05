
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, Clock, ArrowRight } from "lucide-react";
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
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
          </div>
          
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 pulse-gradient-text">
                Meet New Friends
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 font-light mb-8">
                Making friends as an adult can be hard. We're here to help.
              </p>
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
