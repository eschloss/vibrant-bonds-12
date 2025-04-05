
import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  CalendarDays, 
  Sprout,
  Sparkles
} from "lucide-react";

// Define the steps with more friendly, conversational headlines and descriptions
const steps = [
  {
    icon: Users,
    title: "Get Matched",
    description: "We'll match you with a small group of like-minded people.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  },
  {
    icon: MessageSquare,
    title: "Break the Ice",
    description: "Chat with fellow group members, guided by our conversation starters.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  },
  {
    icon: CalendarDays,
    title: "Just Show Up",
    description: "We'll plan the meet-up—you just need to be there.",
    color: "bg-gradient-to-r from-orange-400 to-yellow-300"
  },
  {
    icon: Sprout,
    title: "Grow Together",
    description: "After the initial meet, we'll help you nurture your new connections.",
    color: "bg-gradient-to-r from-green-400 to-emerald-500"
  }
];

const HowItWorks = () => {
  return (
    <section 
      id="how-it-works" 
      className="relative py-12 bg-gray-900 dark:bg-gray-950"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
            <Sparkles size={18} className="text-purple-400" />
            How It Works
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Making friends shouldn't be complicated
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300"
            >
              <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                <step.icon size={24} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
