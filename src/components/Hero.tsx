
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useScroll, useTransform } from "framer-motion";
import Text from "@/components/Text";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section ref={ref} className="relative flex items-center overflow-hidden section-padding bg-white dark:bg-white pt-32 md:pt-36 lg:pt-40">
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
      </motion.div>
      
      {/* Sophisticated Ambient Animation Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pulse-blue/30 animate-sophisticated-float animate-elegant-scale"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-pulse-purple/30 animate-ambient-drift"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pulse-teal/30 animate-sophisticated-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Additional Ambient Elements */}
      <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pulse-coral/20 animate-ambient-drift" style={{ animationDelay: '8s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pulse-blue/20 animate-sophisticated-float" style={{ animationDelay: '12s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-14 h-14 rounded-full bg-pulse-purple/25 animate-ambient-drift" style={{ animationDelay: '5s' }}></div>
      <div className="absolute top-1/6 right-1/6 w-10 h-10 rounded-full bg-pulse-coral/20 animate-sophisticated-float" style={{ animationDelay: '15s' }}></div>
      <div className="absolute bottom-1/5 left-1/5 w-18 h-18 rounded-full bg-pulse-teal/15 animate-ambient-drift" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        style={{ y: contentY }}
        className="container mx-auto py-[132px]"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl w-full max-w-4xl mx-auto mb-6 text-gray-900"
          >
            <span className="pulse-gradient-text">{t("hero.title", "Meet New Friends")}</span> {t("hero.in_your_city", "in Your City")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="paragraph text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8"
          >
            {t("hero.description", "We match like-minded people into group chats where AI sparks conversations and plans real-life meetups.")}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-4 mb-8"
          >
            <Link to="/cities">
              <Button size="xl" className="bg-[#FF2688] hover:bg-[#FF2688]/90 text-white shadow-lg shadow-[#FF2688]/20 transition-all duration-500 hover:shadow-[#FF2688]/40 hover:scale-105 rounded-full animate-elegant-scale">
                <span>{t("hero.cta", "Meet Your Crew")}</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
