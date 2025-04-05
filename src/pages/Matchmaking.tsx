import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, Clock, ArrowRight, Sparkles, Zap, Timer, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [{
  icon: Users,
  number: 1,
  title: "Get Matched",
  description: "We'll match you with a small group of like-minded people.",
  color: "bg-gradient-to-r from-pink-500 to-purple-600"
}, {
  icon: MessageSquare,
  number: 2,
  title: "Break the Ice",
  description: "Chat with fellow group members, guided by our ice-breakers.",
  color: "bg-gradient-to-r from-blue-500 to-cyan-400"
}, {
  icon: CalendarDays,
  number: 3,
  title: "Just Show Up",
  description: "We'll plan the meet-up—just show up.",
  color: "bg-gradient-to-r from-indigo-400 to-blue-500"
}, {
  icon: Sprout,
  number: 4,
  title: "Grow Connections",
  description: "After the initial meet, we'll help you grow your new connections.",
  color: "bg-gradient-to-r from-green-400 to-emerald-500"
}];

const Matchmaking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, []);

  return <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 -z-5">
            {Array.from({
            length: 20
          }).map((_, i) => <div key={i} className="absolute rounded-full bg-purple-500/20" style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }} />)}
          </div>
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} className="text-center max-w-3xl mx-auto">
              <div className="mb-6 inline-flex gap-2 items-center bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/10">
                <Sparkles size={18} className="text-yellow-400" />
                <span className="text-white/90 text-sm font-medium">Make Friends in Your City</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Find Your <span className="pulse-gradient-text">Perfect Crew</span>
              </h1>
              <motion.p className="text-xl md:text-2xl text-foreground/80 font-light mb-8" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }}>Life's too short for awkward small talk. Meet people who get you in your city.</motion.p>
              <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4,
              duration: 0.5
            }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30">
                  <Zap size={18} className="text-white" />
                  <span>Start Matching Now</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        <section className="relative py-16 bg-gray-900 dark:bg-gray-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="flex items-center gap-6 mb-16 last:mb-0">
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
                </motion.div>)}
            </div>
          </div>
        </section>
        
        <section className="relative py-20 bg-gray-900/80">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5 }} 
              className="text-center max-w-3xl mx-auto"
            >
              <div className="mb-6 inline-flex items-center justify-center gap-2 bg-red-500/20 backdrop-blur-sm px-5 py-3 rounded-full border border-red-500/30">
                <Timer size={22} className="text-red-400 animate-pulse" />
                <span className="text-white/90 font-medium">7-Day Mission Deadline</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Meet Your <span className="pulse-gradient-text">Perfect Crew</span>?
              </h2>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <AlertTriangle size={22} className="text-yellow-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white mb-2">The Clock is Ticking!</h3>
                    <p className="text-gray-300">
                      Once matched, you and your crew have <span className="font-bold text-white">only 7 days</span> to meet in real life. 
                      Don't miss your chance to make meaningful connections!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="xl" 
                  variant="gradient" 
                  className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto animate-pulse-slow"
                >
                  Start Matching Now
                  <ArrowRight size={18} />
                </Button>
                
                <span className="text-gray-400 text-sm">Takes just 2 minutes</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

export default Matchmaking;
