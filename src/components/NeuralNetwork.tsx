import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define user profiles with interests for the visualization
const profiles = [
  {
    id: 1,
    name: "Alex",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    initials: "AJ",
    interests: ["Dogs", "Hiking", "Photography"],
    cluster: 1,
  },
  {
    id: 2,
    name: "Taylor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    initials: "TS",
    interests: ["Cats", "Reading", "Coffee"],
    cluster: 2,
  },
  {
    id: 3,
    name: "Jordan",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    initials: "JK",
    interests: ["Dogs", "Hiking", "Travel"],
    cluster: 1,
  },
  {
    id: 4,
    name: "Morgan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    initials: "MR",
    interests: ["Cats", "Music", "Coffee"],
    cluster: 2,
  },
  {
    id: 5,
    name: "Casey",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    initials: "CL",
    interests: ["Dogs", "Photography", "Hiking"],
    cluster: 1,
  },
  {
    id: 6,
    name: "Riley",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    initials: "RB",
    interests: ["Cats", "Art", "Reading"],
    cluster: 2,
  },
];

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation properties
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  // Canvas animation for neural network visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container width
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create node positions for profiles
    const nodes = profiles.map((profile, index) => {
      // Position nodes in clusters based on interests
      const clusterOffset = profile.cluster === 1 
        ? -canvas.width / 4
        : canvas.width / 4;
        
      return {
        id: profile.id,
        x: canvas.width / 2 + clusterOffset + (Math.random() - 0.5) * 150,
        y: canvas.height / 2 + (Math.random() - 0.5) * 150,
        profile,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      };
    });
    
    // Create connections between profiles with similar interests
    const connections: Array<{from: number, to: number, strength: number}> = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const profileA = nodes[i].profile;
        const profileB = nodes[j].profile;
        
        // Count shared interests
        const sharedInterests = profileA.interests.filter(interest => 
          profileB.interests.includes(interest)
        ).length;
        
        if (sharedInterests > 0) {
          connections.push({
            from: i,
            to: j,
            strength: sharedInterests / 3, // Normalize strength (max 3 interests)
          });
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(conn => {
        const nodeA = nodes[conn.from];
        const nodeB = nodes[conn.to];
        
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        
        // Gradient based on strength and cluster
        const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        
        if (nodeA.profile.cluster === nodeB.profile.cluster) {
          // Same cluster - use purple gradient
          gradient.addColorStop(0, `rgba(139, 92, 246, ${conn.strength * 0.7})`);
          gradient.addColorStop(1, `rgba(147, 197, 253, ${conn.strength * 0.7})`);
        } else {
          // Different clusters - use orange gradient
          gradient.addColorStop(0, `rgba(249, 115, 22, ${conn.strength * 0.4})`);
          gradient.addColorStop(1, `rgba(253, 164, 175, ${conn.strength * 0.4})`);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = conn.strength * 2;
        ctx.stroke();
      });
      
      // Update node positions with gentle movement
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x < 50 || node.x > canvas.width - 50) {
          node.vx *= -1;
        }
        if (node.y < 50 || node.y > canvas.height - 50) {
          node.vy *= -1;
        }
        
        // Draw pulsing circle behind avatar
        ctx.beginPath();
        const pulseSize = 40 + Math.sin(Date.now() * 0.003) * 5;
        
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, pulseSize
        );
        
        if (node.profile.cluster === 1) {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.6)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.6)');
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
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
        
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full bg-gradient-to-b from-black to-gray-900"
          ></canvas>
          
          {/* Overlay the avatars at the node positions */}
          <div className="absolute inset-0 pointer-events-none">
            {profiles.map((profile, index) => (
              <motion.div 
                key={profile.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100 
                }}
                className="absolute"
                style={{ 
                  left: `calc(${profile.cluster === 1 ? '35%' : '65%'} + ${(Math.random() - 0.5) * 150}px)`, 
                  top: `calc(50% + ${(Math.random() - 0.5) * 150}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <div className={`mb-2 ring-2 ${profile.cluster === 1 ? 'ring-pulse-purple' : 'ring-pulse-coral'} ring-offset-2 ring-offset-gray-900`}>
                    <Avatar className="h-16 w-16 border-2 border-background">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback>{profile.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white mb-1">{profile.name}</p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {profile.interests.slice(0, 1).map(interest => (
                        <Badge 
                          key={interest} 
                          variant="outline" 
                          className={`text-xs ${
                            profile.cluster === 1 
                              ? 'bg-purple-950/50 text-purple-200 border-purple-800/50' 
                              : 'bg-orange-950/50 text-orange-200 border-orange-800/50'
                          }`}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
