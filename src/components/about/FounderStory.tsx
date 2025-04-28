
import { motion } from "framer-motion";

const FounderStory = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div className="relative">
              <img 
                alt="Eric performing opera" 
                src="/lovable-uploads/41aeb601-a150-497b-bf78-4174c5e9ed71.jpg" 
                className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full aspect-[2/3] object-fill"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:col-span-3"
          >
            <h2 className="text-3xl font-bold">The Journey</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] rounded-full"></div>
            <p className="text-gray-300 text-lg">
              After moving 10 times across 5 countries, Eric got good at making friends from scratch—but also saw just how hard it is for most people. Even with all the social apps out there, millions still feel disconnected. As a software engineer and former opera singer, he experienced both the highs of human connection and the quiet reality of isolation.
            </p>
            <blockquote className="my-8 px-8 py-6 bg-gradient-to-r from-pulse-purple/10 to-pulse-blue/10 rounded-2xl border-l-4 border-pulse-pink relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pulse-pink rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">"</span>
              </div>
              <p className="text-gray-300 text-2xl italic leading-relaxed">
                What I learned—after starting over so many times—is that friendship takes more than a one-off coffee. Meeting someone new is actually the easy part. What's hard is building the rhythm: shared interests, repeated time together, and someone willing to say, "Let's do this again next week!"
              </p>
            </blockquote>
            <p className="text-gray-300 text-lg">
              Those lessons became Pulse: a new kind of social platform that helps people turn strangers into real friends, in real life.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
