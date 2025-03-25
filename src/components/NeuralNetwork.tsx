
import React from "react";
import { motion } from "framer-motion";
import { Brain, Download } from "lucide-react";
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
          
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto backdrop-blur-sm px-4 py-2 rounded-lg bg-gray-900/40">
            AI-Powered Match<span className="pulse-gradient-text">ing</span> for Genuine Connections
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-2xl mx-auto backdrop-blur-sm p-2 rounded-lg bg-gray-900/30 mb-6">
            Our proprietary neural network analyzes shared interests and personality traits to create meaningful matches that last.
          </motion.p>
          
          {/* Updated CTA Button to match header style */}
          <motion.div variants={fadeInUp} className="mt-6">
            <a href="#download" className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium inline-flex justify-center">
              <Download size={18} />
              <span>Meet Your Crew</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>;
};
export default NeuralNetwork;
