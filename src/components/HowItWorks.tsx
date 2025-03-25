
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  CalendarDays, 
  Sprout,
  Sparkles
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Users,
    headline: "We'll match you with a small group of like-minded people.",
    color: "from-pink-500 to-purple-600"
  },
  {
    number: 2,
    icon: MessageSquare,
    headline: "Chat with fellow group members, guided by our ice-breakers.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    number: 3,
    icon: CalendarDays,
    headline: "We'll plan the meet-up—just show up.",
    color: "from-orange-400 to-yellow-300"
  },
  {
    number: 4,
    icon: Sprout,
    headline: "After the initial meet, we'll help you grow your new connections.",
    color: "from-green-400 to-emerald-500"
  }
];

const HowItWorks = () => {
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

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gray-900 dark:bg-gray-950"
    >
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
              How It Works
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Making friends as an adult can be hard. We're here to help.
            </h2>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6 md:gap-10"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-gray-800">
                  <step.icon size={28} className="text-gray-400" />
                </div>
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center -mt-8 md:-mt-10 border-4 border-gray-900">
                  <span className="text-white text-2xl md:text-3xl font-bold">{step.number}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  {step.headline}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
