import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MessageSquare, CalendarDays, Sprout, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// Define the steps with updated headlines and descriptions
const steps = [{
  icon: Users,
  title: "Get Matched",
  description: "We'll match you with a small group of like-minded people.",
  color: "bg-gradient-to-r from-pink-500 to-purple-600"
}, {
  icon: MessageSquare,
  title: "Break the Ice",
  description: "Chat with fellow group members, guided by our conversation starters.",
  color: "bg-gradient-to-r from-blue-500 to-cyan-400"
}, {
  icon: CalendarDays,
  title: "Plan a Meetup\n—Just Show Up",
  description: "Our AI helps you find the perfect time and activity that works for everyone.",
  color: "bg-gradient-to-r from-indigo-400 to-blue-500"
}, {
  icon: Sprout,
  title: "Grow the Friendships",
  description: "One hangout's just the beginning.\nWe'll help you keeep the momentum going\n—so new connections turn into real friends.",
  color: "bg-gradient-to-r from-green-400 to-emerald-500"
}];
const HowItWorks = () => {
  return <section id="how-it-works" className="relative py-12 bg-gray-900 dark:bg-gray-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="text-center max-w-3xl mx-auto mb-10">
          <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
            <Sparkles size={18} className="text-purple-400" />
            How It Works
          </span>
          
          <h2 className="text-3xl font-bold mb-4 text-white w-full max-w-4xl mx-auto mb-6 md:text-5xl">Making Friends Shouldn't be Hard</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
        }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300">
              <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                <step.icon size={24} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 whitespace-pre-line">
                {step.title}
              </h3>
              
              <p className="text-gray-300 whitespace-pre-line my-[6px]">
                {step.description}
              </p>
            </motion.div>)}
        </div>

        {/* Call to Action Button */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} className="flex justify-center mt-12">
          <Link to="/matchmaking">
            
          </Link>
        </motion.div>
      </div>
    </section>;
};
export default HowItWorks;