
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const MissionSection = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
          <Separator className="w-20 h-1 bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] rounded-full mx-auto mt-4 mb-8" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 md:p-12 rounded-3xl border border-purple-700/30 shadow-xl shadow-purple-500/10"
        >
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 border-l-4 border-pulse-pink pl-4 py-2 bg-gray-800/30 rounded-r-xl">
            To create a world where growing meaningful friendships is effortless.
          </blockquote>
          <div className="flex justify-center">
            <p className="text-lg font-medium">— Eric, Founder</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
