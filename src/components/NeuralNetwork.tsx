
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Configuration for neural network visualization
const TOTAL_DOTS = 100;
const CLUSTERS = 4;
const DOTS_PER_CLUSTER = Math.floor(TOTAL_DOTS / CLUSTERS); // 25 dots per cluster

const CLUSTER_COLORS = [
  { main: "rgba(139, 92, 246, 0.8)", light: "rgba(139, 92, 246, 0.3)" }, // Purple
  { main: "rgba(249, 115, 22, 0.8)", light: "rgba(249, 115, 22, 0.3)" },  // Orange
  { main: "rgba(16, 185, 129, 0.8)", light: "rgba(16, 185, 129, 0.3)" },  // Green
  { main: "rgba(59, 130, 246, 0.8)", light: "rgba(59, 130, 246, 0.3)" },  // Blue
];

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  
  // Animation properties
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  // Generate nodes and connections for network visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;
    
    // Create clusters of dots
    const newDots = [];
    
    for (let clusterIndex = 0; clusterIndex < CLUSTERS; clusterIndex++) {
      // Define cluster center positions distributed across the canvas
      const clusterCenterX = width * (0.25 + 0.5 * (clusterIndex % 2));
      const clusterCenterY = height * (0.25 + 0.5 * Math.floor(clusterIndex / 2));
      const clusterRadius = Math.min(width, height) * 0.15;
      
      // Create a grid within each cluster to ensure dots don't overlap
      for (let i = 0; i < DOTS_PER_CLUSTER; i++) {
        // Use a more structured approach to position dots within cluster
        // This creates a spiral pattern to maximize spacing
        const angle = (i / DOTS_PER_CLUSTER) * Math.PI * 6; // Multiple rotations for spiral
        const radiusRatio = Math.sqrt(i / DOTS_PER_CLUSTER); // Square root for more even distribution
        const distance = radiusRatio * clusterRadius;
        
        // Calculate position with some randomness but prevent overlap
        const x = clusterCenterX + Math.cos(angle) * distance + (Math.random() - 0.5) * 5;
        const y = clusterCenterY + Math.sin(angle) * distance + (Math.random() - 0.5) * 5;
        
        newDots.push({
          id: clusterIndex * DOTS_PER_CLUSTER + i,
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          cluster: clusterIndex,
          size: 2 + Math.random() * 2, // Smaller dots to reduce overlap
          pulseFactor: 0.8 + Math.random() * 0.4
        });
      }
    }
    
    // Create connections between dots
    const newConnections = [];
    
    // First, connect dots within the same cluster
    for (let i = 0; i < newDots.length; i++) {
      // Connect to some nearby dots in the same cluster (not all, to avoid too many connections)
      const dotA = newDots[i];
      const clusterDotsStart = Math.floor(dotA.id / DOTS_PER_CLUSTER) * DOTS_PER_CLUSTER;
      const clusterDotsEnd = clusterDotsStart + DOTS_PER_CLUSTER;
      
      // Connect to up to 5 random dots in the same cluster
      const connectionsCount = 2 + Math.floor(Math.random() * 3);
      const connectedDots = new Set();
      
      for (let c = 0; c < connectionsCount; c++) {
        // Find a random dot in the same cluster that's not already connected
        let attempts = 0;
        while (attempts < 10) { // Limit attempts to avoid infinite loop
          const randomIndex = clusterDotsStart + Math.floor(Math.random() * DOTS_PER_CLUSTER);
          
          if (randomIndex !== i && !connectedDots.has(randomIndex)) {
            const dotB = newDots[randomIndex];
            
            // Calculate distance
            const dx = dotA.x - dotB.x;
            const dy = dotA.y - dotB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect if they're reasonably close
            if (distance < clusterRadius * 0.5) {
              newConnections.push({
                from: i,
                to: randomIndex,
                strength: 1 - (distance / (clusterRadius * 0.5)),
                type: "intra-cluster" // Connection within the same cluster
              });
              
              connectedDots.add(randomIndex);
              break;
            }
          }
          attempts++;
        }
      }
    }
    
    // Add some inter-cluster connections
    for (let c1 = 0; c1 < CLUSTERS; c1++) {
      for (let c2 = c1 + 1; c2 < CLUSTERS; c2++) {
        // Add a few connections between each pair of clusters
        const connectionsCount = 5 + Math.floor(Math.random() * 5); // 5-9 connections between clusters
        
        for (let i = 0; i < connectionsCount; i++) {
          const dotAIndex = c1 * DOTS_PER_CLUSTER + Math.floor(Math.random() * DOTS_PER_CLUSTER);
          const dotBIndex = c2 * DOTS_PER_CLUSTER + Math.floor(Math.random() * DOTS_PER_CLUSTER);
          
          newConnections.push({
            from: dotAIndex,
            to: dotBIndex,
            strength: 0.2 + Math.random() * 0.3, // Weaker connections between clusters
            type: "inter-cluster" // Connection between different clusters
          });
        }
      }
    }
    
    setDots(newDots);
    setConnections(newConnections);
  }, []);
  
  // Canvas animation for neural network visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dots.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container width
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Reposition dots when canvas resizes
      const width = canvas.width;
      const height = canvas.height;
      
      setDots(prevDots => prevDots.map(dot => {
        // Recalculate the base position for each dot based on its cluster
        const clusterCenterX = width * (0.25 + 0.5 * (dot.cluster % 2));
        const clusterCenterY = height * (0.25 + 0.5 * Math.floor(dot.cluster / 2));
        const clusterRadius = Math.min(width, height) * 0.15;
        
        // Get the angle and distance from the dot's current position to its cluster center
        const angle = Math.atan2(dot.y - dot.baseY, dot.x - dot.baseX);
        const normalizedDistance = Math.sqrt(
          Math.pow((dot.x - dot.baseX) / canvas.width, 2) + 
          Math.pow((dot.y - dot.baseY) / canvas.height, 2)
        );
        
        const newBaseX = clusterCenterX + Math.cos(angle) * clusterRadius * normalizedDistance * 10;
        const newBaseY = clusterCenterY + Math.sin(angle) * clusterRadius * normalizedDistance * 10;
        
        return {
          ...dot,
          baseX: newBaseX,
          baseY: newBaseY,
          x: newBaseX,
          y: newBaseY
        };
      }));
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let animationFrameId: number;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(conn => {
        const dotA = dots[conn.from];
        const dotB = dots[conn.to];
        
        if (!dotA || !dotB) return;
        
        ctx.beginPath();
        ctx.moveTo(dotA.x, dotA.y);
        ctx.lineTo(dotB.x, dotB.y);
        
        // Style based on connection type
        if (conn.type === "intra-cluster") {
          // Connections within clusters
          const clusterColor = CLUSTER_COLORS[dotA.cluster];
          ctx.strokeStyle = `rgba(${clusterColor.main}, ${conn.strength * 0.7})`;
          ctx.lineWidth = conn.strength * 1.5;
        } else {
          // Connections between clusters
          ctx.strokeStyle = `rgba(255, 255, 255, ${conn.strength * 0.25})`;
          ctx.lineWidth = conn.strength * 0.8;
        }
        
        ctx.stroke();
      });
      
      // Update and draw dots
      const time = Date.now() * 0.001;
      
      dots.forEach(dot => {
        // Apply gentle movement to dots
        dot.x += Math.sin(time * 1 + dot.id * 0.1) * 0.3;
        dot.y += Math.cos(time * 1.3 + dot.id * 0.1) * 0.3;
        
        // Draw pulsing dot
        const pulseSize = dot.size * (0.8 + Math.sin(time * 2 + dot.id * 0.3) * 0.2 * dot.pulseFactor);
        
        const clusterColor = CLUSTER_COLORS[dot.cluster];
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, pulseSize * 2
        );
        
        gradient.addColorStop(0, clusterColor.main);
        gradient.addColorStop(0.5, clusterColor.light);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(dot.x, dot.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw solid dot center
        ctx.beginPath();
        ctx.fillStyle = clusterColor.main;
        ctx.arc(dot.x, dot.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dots, connections]);
  
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
        
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-black to-gray-900">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          ></canvas>
        </div>
        
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

