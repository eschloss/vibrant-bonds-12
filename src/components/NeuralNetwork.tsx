
import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  return (
    <div className="w-full overflow-hidden bg-gray-950 py-16 md:py-24 relative">
      {/* Neural Network Animation as Background */}
      <div className="absolute inset-0 w-full h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-pointer"
          title="Move your cursor to interact with the neural network"
        ></canvas>
        
        {/* Interaction hint overlay */}
        <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/60 text-sm z-10">
          <span>Move your cursor over the network to interact</span>
        </div>
      </div>
      
      {/* Content overlay with gradient backdrop */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Brain className="w-4 h-4 text-pulse-purple" />
            <span className="text-sm font-medium text-pulse-purple">Neural Network Technology</span>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto backdrop-blur-sm px-4 py-2 rounded-lg bg-gray-900/40"
          >
            AI-Powered Match<span className="pulse-gradient-text">ing</span> for Genuine Connections
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-300 max-w-2xl mx-auto backdrop-blur-sm p-2 rounded-lg bg-gray-900/30 mb-6"
          >
            Our proprietary neural network analyzes shared interests and personality traits to create meaningful matches that last.
          </motion.p>
          
          {/* New CTA Button */}
          <motion.div 
            variants={fadeInUp}
            className="mt-6"
          >
            <Button 
              size="lg" 
              className="bg-pulse-purple hover:bg-pulse-purple/90 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            >
              Meet your new friends
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralNetwork;
