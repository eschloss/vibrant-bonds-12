
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { useNeuralNetworkAnimation } from "@/utils/neuralNetworkAnimation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

// Configuration for neural network visualization
const TOTAL_DOTS = 150; // Increased for better coverage with 5 clusters
const CLUSTERS = 5; // Updated to 5 clusters

const NeuralNetwork = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Use our custom hook for the neural network animation
  const canvasRef = useNeuralNetworkAnimation(TOTAL_DOTS, CLUSTERS);

  // Animation properties for content
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };
  
  return (
    <div ref={ref} className="w-full overflow-hidden bg-gray-950 py-16 md:py-24 relative">
      {/* Neural Network Animation as Background with Parallax */}
      <motion.div 
        style={{ y: canvasY }}
        className="absolute inset-0 w-full h-full"
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-pointer" 
          title="Move your cursor to interact with the neural network"
        ></canvas>
      </motion.div>
      
      {/* Content overlay with parallax and refined animations */}
      <motion.div 
        style={{ y: contentY }}
        className="container px-4 md:px-6 relative z-10"
      >
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-md animate-elegant-scale"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Brain className="w-4 h-4 text-pulse-purple" />
            </motion.div>
            <span className="text-sm font-medium text-pulse-purple">
              {t("neural.title", "Neural Network Technology")}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto backdrop-blur-md py-2 rounded-lg bg-gray-900/40 px-0 md:text-5xl"
          >
            {t("neural.heading1", "Find Your")} <span className="pulse-gradient-text">{t("neural.heading2", "Perfect Friend Group")}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-gray-300 max-w-2xl mx-auto backdrop-blur-md p-2 rounded-lg bg-gray-900/30 mb-6"
          >
            {t("neural.description", "Our smart matching system brings together people with shared interests and compatible personalities, making it easy to find friends you'll click with.")}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default NeuralNetwork;
