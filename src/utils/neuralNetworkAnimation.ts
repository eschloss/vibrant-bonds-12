
// Neural network animation utilities
import { useEffect, useRef } from 'react';

// Configuration
export type DotCluster = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  cluster: number;
  color: string;
  pulseSpeed: number;
};

export type Connection = {
  from: number;
  to: number;
  strength: number;
  type: 'intra' | 'inter';
};

// Colors for each cluster
const CLUSTER_COLORS = [
  'rgba(139, 92, 246, 0.8)',  // Purple
  'rgba(249, 115, 22, 0.8)',  // Orange
  'rgba(16, 185, 129, 0.8)',  // Green
  'rgba(59, 130, 246, 0.8)'   // Blue
];

// Initialize neural network dots in a non-overlapping grid pattern
export function initializeNetwork(
  width: number, 
  height: number, 
  totalDots: number = 100, 
  clusters: number = 4
): { dots: DotCluster[], connections: Connection[] } {
  const dotsPerCluster = Math.floor(totalDots / clusters);
  const dots: DotCluster[] = [];
  const connections: Connection[] = [];
  
  // Create clusters
  for (let c = 0; c < clusters; c++) {
    // Define cluster center positions distributed across the canvas
    const clusterCenterX = width * (0.25 + 0.5 * (c % 2));
    const clusterCenterY = height * (0.25 + 0.5 * Math.floor(c / 2));
    const clusterRadius = Math.min(width, height) * 0.15;

    // Create dots for this cluster using a spiral pattern for better distribution
    const clusterColor = CLUSTER_COLORS[c];
    
    for (let i = 0; i < dotsPerCluster; i++) {
      // Use a spiral pattern to place dots
      const angle = (i / dotsPerCluster) * Math.PI * 6; // Multiple rotations for spiral
      const radiusRatio = Math.sqrt(i / dotsPerCluster); // Square root for more even distribution
      const distance = radiusRatio * clusterRadius;
      
      // Add some slight randomness but prevent overlap
      const x = clusterCenterX + Math.cos(angle) * distance + (Math.random() - 0.5) * 5;
      const y = clusterCenterY + Math.sin(angle) * distance + (Math.random() - 0.5) * 5;
      
      // Create the dot
      dots.push({
        id: c * dotsPerCluster + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 1.5 + Math.random() * 1.5,
        cluster: c,
        color: clusterColor,
        pulseSpeed: 0.8 + Math.random() * 0.4
      });
    }
  }
  
  // Create connections within clusters
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    const clusterStart = Math.floor(dot.id / dotsPerCluster) * dotsPerCluster;
    const clusterEnd = clusterStart + dotsPerCluster;
    
    // Connect to 2-4 other dots in same cluster
    const connectionCount = 2 + Math.floor(Math.random() * 3);
    const connected = new Set<number>();
    
    for (let c = 0; c < connectionCount; c++) {
      // Try to find a suitable connection
      for (let attempt = 0; attempt < 5; attempt++) {
        const targetIndex = clusterStart + Math.floor(Math.random() * dotsPerCluster);
        
        if (targetIndex !== i && !connected.has(targetIndex) && targetIndex < dots.length) {
          const target = dots[targetIndex];
          
          // Calculate distance
          const dx = dot.x - target.x;
          const dy = dot.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect if reasonably close
          if (distance < clusterRadius * 0.6) {
            connections.push({
              from: i,
              to: targetIndex,
              strength: 0.8 - (distance / (clusterRadius * 0.8)),
              type: 'intra'
            });
            
            connected.add(targetIndex);
            break;
          }
        }
      }
    }
  }
  
  // Create fewer connections between clusters
  for (let c1 = 0; c1 < clusters; c1++) {
    for (let c2 = c1 + 1; c2 < clusters; c2++) {
      // Add 3-6 connections between each pair of clusters
      const interConnections = 3 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < interConnections; i++) {
        const fromIndex = c1 * dotsPerCluster + Math.floor(Math.random() * dotsPerCluster);
        const toIndex = c2 * dotsPerCluster + Math.floor(Math.random() * dotsPerCluster);
        
        if (fromIndex < dots.length && toIndex < dots.length) {
          connections.push({
            from: fromIndex,
            to: toIndex,
            strength: 0.2 + Math.random() * 0.2, // Weaker connections between clusters
            type: 'inter'
          });
        }
      }
    }
  }
  
  return { dots, connections };
}

// Animation hook that handles the canvas rendering
export function useNeuralNetworkAnimation(totalDots = 100, clusters = 4) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<DotCluster[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set initial canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      
      // Set canvas dimensions to match container size
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Initialize network with new dimensions
      const { dots, connections } = initializeNetwork(canvas.width, canvas.height, totalDots, clusters);
      dotsRef.current = dots;
      connectionsRef.current = connections;
    };
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001; // Current time in seconds
      
      // Draw connections
      connectionsRef.current.forEach(conn => {
        const fromDot = dotsRef.current[conn.from];
        const toDot = dotsRef.current[conn.to];
        
        if (!fromDot || !toDot) return;
        
        ctx.beginPath();
        ctx.moveTo(fromDot.x, fromDot.y);
        ctx.lineTo(toDot.x, toDot.y);
        
        if (conn.type === 'intra') {
          // Within-cluster connection
          const baseColor = fromDot.color.replace('0.8', `${conn.strength * 0.5}`);
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = conn.strength * 1;
        } else {
          // Between-cluster connection
          ctx.strokeStyle = `rgba(255, 255, 255, ${conn.strength * 0.2})`;
          ctx.lineWidth = conn.strength * 0.5;
        }
        
        ctx.stroke();
      });
      
      // Update and draw dots
      dotsRef.current.forEach(dot => {
        // Apply gentle movement with boundaries
        dot.x += Math.sin(time * dot.pulseSpeed) * 0.3;
        dot.y += Math.cos(time * dot.pulseSpeed * 1.3) * 0.3;
        
        // Draw the dot with pulsing effect
        const pulseSize = dot.size * (0.8 + Math.sin(time * 2 + dot.id * 0.3) * 0.2 * dot.pulseSpeed);
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, pulseSize * 3
        );
        
        // Extract base color components for gradient
        const baseColor = dot.color;
        const lightColor = baseColor.replace('0.8', '0.3');
        
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, lightColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        // Draw glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(dot.x, dot.y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw solid dot center
        ctx.beginPath();
        ctx.fillStyle = baseColor;
        ctx.arc(dot.x, dot.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [totalDots, clusters]);
  
  return canvasRef;
}
