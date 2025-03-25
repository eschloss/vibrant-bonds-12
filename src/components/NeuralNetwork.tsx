
import React from "react";
import { motion } from "framer-motion";
import { Brain, Heart, ZapIcon } from "lucide-react";
import { useNeuralNetworkAnimation } from "@/utils/neuralNetworkAnimation";

// Configuration for neural network visualization
const TOTAL_DOTS = 120; // Increased for better coverage
const CLUSTERS = 4;

const NeuralNetwork = () => {
  // Use our custom hook for the neural network animation
  const canvasRef = useNeuralNetworkAnimation(TOTAL_DOTS, CLUSTERS);
  
  // Animation properties for content
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  return (
    <div className="w-full overflow-hidden bg-gray-950 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4">
            <Brain className="w-4 h-4 text-pulse-purple" />
            <span className="text-sm font-medium text-pulse-purple">Neural Network Technology</span>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto"
          >
            AI-Powered Match<span className="pulse-gradient-text">ing</span> for Genuine Connections
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Our proprietary neural network analyzes shared interests and personality traits to create meaningful matches that last.
          </motion.p>
        </motion.div>
        
        {/* Neural Network Visualization */}
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-black to-gray-900 shadow-xl">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full cursor-pointer"
            title="Move your cursor to interact with the neural network"
          ></canvas>
          
          {/* Network labels */}
          <div className="absolute top-4 left-4 flex items-center gap-2 text-white/60 text-sm font-medium bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ZapIcon className="w-4 h-4" />
            <span>Interactive Neural Network</span>
          </div>
          
          {/* Instruction overlay */}
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/60 text-sm">
            <span>Move your cursor over the network to interact</span>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
          >
            <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-pulse-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
            <p className="text-gray-400">Our neural network analyzes thousands of data points to understand your unique preferences.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
          >
            <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pulse-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Meaningful Matches</h3>
            <p className="text-gray-400">We prioritize quality over quantity, focusing on deep connections rather than endless swiping.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
          >
            <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-pulse-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Continuous Learning</h3>
            <p className="text-gray-400">Our algorithm evolves with your feedback, getting better at finding your perfect matches over time.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NeuralNetwork;
