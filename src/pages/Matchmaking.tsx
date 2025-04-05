
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, Clock, ArrowRight, Laugh, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

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

const quirkySlogans = [
  "Because swiping was so last decade",
  "Making friends without the awkward small talk",
  "Turn 'stranger danger' into 'friend neighbor'",
  "Where introverts become... slightly less introverted",
  "Your future friend group is waiting (no pressure)"
];

const Matchmaking = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Pick a random slogan
  const randomSlogan = quirkySlogans[Math.floor(Math.random() * quirkySlogans.length)];

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
            
            {/* Animated background elements */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ 
                x: [50, -50, 50],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15,
                ease: "easeInOut" 
              }}
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pulse-blue/20 blur-xl"
            />
            
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ 
                x: [-50, 50, -50],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 18,
                ease: "easeInOut" 
              }}
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-pulse-purple/20 blur-xl"
            />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
              {/* Left Side - Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left lg:w-1/2"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 w-fit mb-6 mx-auto lg:mx-0">
                  <span className="text-pulse-purple">✨</span>
                  <span>{randomSlogan}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                  <span className="pulse-gradient-text">Making Friends</span>
                  <br /> 
                  <span className="text-foreground">Should Be Fun</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-foreground/80 font-light mb-8 max-w-xl mx-auto lg:mx-0">
                  We'll handle the awkward parts so you can focus on the good stuff: meeting awesome people.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="xl" 
                    variant="gradient" 
                    className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
                  >
                    Start Matching
                    <ArrowRight size={18} />
                  </Button>
                  
                  <div className="flex items-center px-4 py-2 gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full text-foreground/70">
                    <Clock size={16} className="text-pulse-purple" />
                    <span>Takes 2 minutes</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Side - Fun Interactive Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-1/2 mt-8 lg:mt-0"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 -right-10 -bottom-10 bg-gradient-to-br from-pulse-purple/10 to-pulse-blue/5 rounded-3xl blur-2xl -z-10"></div>
                  
                  <Card className="bg-black/20 backdrop-blur-md border-white/10 shadow-xl overflow-hidden rounded-xl">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="text-foreground/60 text-sm">YourCity.exe</div>
                        </div>
                        
                        <div className="text-center py-4">
                          <div className="mb-6 text-xl font-semibold">Friend-making algorithm starting up...</div>
                          
                          <div className="flex flex-col gap-3 text-left mb-8">
                            <div className="flex items-center gap-3 text-green-400">
                              <Zap size={20} />
                              <div>Scanning for fun people...</div>
                            </div>
                            <div className="flex items-center gap-3 text-blue-400">
                              <Heart size={20} />
                              <div>Removing awkwardness from conversations...</div>
                            </div>
                            <div className="flex items-center gap-3 text-purple-400">
                              <Laugh size={20} />
                              <div>Loading dad jokes and ice breakers...</div>
                            </div>
                            <div className="flex items-center gap-3 text-yellow-400">
                              <Users size={20} />
                              <div className="flex items-center">
                                Preparing perfect matches
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                  className="ml-1"
                                >
                                  ...
                                </motion.div>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            variant="gradient" 
                            className="w-full rounded-lg"
                          >
                            Start Friend.exe
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
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
