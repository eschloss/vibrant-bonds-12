
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4 md:text-5xl whitespace-pre-line">
            {t("about.hero.title", "From Isolation to Connection:\nHow Pulse Was Born")}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {t("about.hero.description", "Our founder's global journey—from performing on opera stages to building human-centered tech—led to a quiet but powerful realization about how real friendships form. That insight became Pulse: a new kind of social platform designed to turn digital connections into real-life friendships")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
