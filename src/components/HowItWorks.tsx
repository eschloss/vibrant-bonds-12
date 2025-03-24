
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Calendar, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const features = [
  {
    id: "discover",
    title: "Discover Your Tribe",
    description: "Connect with like-minded people who share your passions, interests, and energy.",
    icon: Users,
    color: "from-pink-500 to-purple-600",
    textColor: "text-pink-300"
  },
  {
    id: "connect",
    title: "Meaningful Conversations",
    description: "Skip the small talk with AI-powered conversation starters that create genuine connections.",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-300"
  },
  {
    id: "meetup",
    title: "IRL Experiences",
    description: "Transition from digital to real-life with suggested activities based on mutual interests.",
    icon: Calendar,
    color: "from-orange-400 to-yellow-300",
    textColor: "text-orange-300"
  },
  {
    id: "friendship",
    title: "Lifelong Friendships",
    description: "Build deep connections that last with smart reminders to nurture your relationships.",
    icon: Heart,
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-300"
  }
];

const HowItWorks = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev < features.length - 1 ? prev + 1 : 0));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gray-900 dark:bg-gray-950"
    >
      {/* Rainbow gradient background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
              <Sparkles size={18} className="text-purple-400" />
              Friendship Simplified
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">Pulse</span> Works
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Building friendships shouldn't be complicated. Pulse makes it easy to find your people and create memories together.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Feature Display */}
          <div>
            <div className="relative bg-gray-800 rounded-3xl p-1 overflow-hidden shadow-xl border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-50"></div>
              
              <div className="relative bg-gray-900 rounded-[22px] p-8 h-[460px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                
                {features.map((feature, index) => {
                  const isActive = activeFeature === index;
                  const Icon = feature.icon;
                  
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.9,
                        y: isActive ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 flex items-center justify-center p-10 ${isActive ? '' : 'pointer-events-none'}`}
                    >
                      <div className="text-center">
                        <motion.div 
                          className={`mx-auto mb-8 relative`}
                          animate={{ 
                            y: [0, -10, 0],
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut"
                          }}
                        >
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} p-5 mx-auto`}>
                            <Icon size={40} className="text-white" />
                          </div>
                          
                          {/* Rainbow halo effect */}
                          <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur-xl opacity-30 -z-10"></div>
                        </motion.div>
                        
                        <h3 className={`text-2xl font-bold mb-4 ${feature.textColor}`}>
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Feature Selection */}
          <div>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const isActive = activeFeature === index;
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 
                      ${isActive 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg shadow-purple-900/20 border border-gray-700' 
                        : 'hover:bg-gray-800/40'}`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={`rounded-lg p-3 bg-gradient-to-br ${feature.color}`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${isActive ? feature.textColor : 'text-white'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                    
                    <ArrowRight 
                      size={18} 
                      className={`${isActive ? 'text-purple-400' : 'text-gray-600'} transition-all duration-300 ${isActive ? 'translate-x-0' : '-translate-x-2'}`} 
                    />
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 pl-4"
            >
              <a 
                href="#download" 
                className="group flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors"
              >
                <span>Get started for free</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
