import React from "react";
import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { useNeuralNetworkAnimation } from "@/utils/neuralNetworkAnimation";
import { Button } from "@/components/ui/button";

// Configuration for neural network visualization
const TOTAL_DOTS = 150; // Increased for better coverage with 5 clusters
const CLUSTERS = 5; // Updated to 5 clusters

const NeuralNetwork = () => {
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
  return <div className="w-full overflow-hidden bg-gray-950 py-16 md:py-24 relative">
      {/* Neural Network Animation as Background */}
      <div className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" title="Move your cursor to interact with the neural network"></canvas>
        
        {/* Interaction hint overlay */}
        
      </div>
      
      {/* Content overlay with gradient backdrop */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Brain className="w-4 h-4 text-pulse-purple" />
            <span className="text-sm font-medium text-pulse-purple">Neural Network Technology</span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto backdrop-blur-sm py-2 rounded-lg bg-gray-900/40 px-0 md:text-5xl">
            Find Your <span className="pulse-gradient-text">Perfect Friend Group</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-2xl mx-auto backdrop-blur-sm p-2 rounded-lg bg-gray-900/30 mb-6">
            Our smart matching system brings together people with shared interests and compatible personalities, making it easy to find friends you'll click with.
          </motion.p>
          
          {/* Updated CTA Button - Center aligned */}
          
        </motion.div>
      </div>
    </div>;
};
export default NeuralNetwork;