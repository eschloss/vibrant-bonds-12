
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" />
        {/* Dark radial mask to boost text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0)_70%)]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 whitespace-pre-line bg-clip-text text-transparent bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF]">
            {t("about.hero.title", "Making Meaningful Friendships Effortless")}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {t("about.hero.description", "We're on a mission to solve loneliness by making it easy for anyone to build real friendships—together, in real life.")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-wider rounded-full border border-pulse-purple/40 bg-pulse-purple/10 px-3 py-1">Less Scroll</span>
            <span className="text-xs uppercase tracking-wider rounded-full border border-pulse-blue/40 bg-pulse-blue/10 px-3 py-1">More Face Time</span>
            <span className="text-xs uppercase tracking-wider rounded-full border border-pulse-pink/40 bg-pulse-pink/10 px-3 py-1">Real Friends</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
