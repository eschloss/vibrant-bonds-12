
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
  originalX?: number; // Store original position
  originalY?: number; // Store original position
};

export type Connection = {
  from: number;
  to: number;
  strength: number;
  type: 'intra' | 'inter';
};

// Mouse interaction settings
const MOUSE_INFLUENCE_RADIUS = 150; // How far the mouse influence reaches
const MOUSE_REPEL_STRENGTH = 0.8; // How strongly dots move away from cursor
const RETURN_SPEED = 0.05; // How quickly dots return to original position

// Colors for each cluster - added a new color for the central cluster
const CLUSTER_COLORS = [
  'rgba(139, 92, 246, 0.8)',  // Purple
  'rgba(249, 115, 22, 0.8)',  // Orange
  'rgba(16, 185, 129, 0.8)',  // Green
  'rgba(59, 130, 246, 0.8)',  // Blue
  'rgba(236, 72, 153, 0.8)'   // Pink (for central cluster)
];

// Initialize neural network dots in a non-overlapping grid pattern
export function initializeNetwork(
  width: number, 
  height: number, 
  totalDots: number = 150, // Increased dot count for 5 clusters
  clusters: number = 5     // Updated to 5 clusters
): { dots: DotCluster[], connections: Connection[] } {
  const dotsPerCluster = Math.floor(totalDots / clusters);
  const dots: DotCluster[] = [];
  const connections: Connection[] = [];
  
  // Create clusters
  for (let c = 0; c < clusters; c++) {
    // Define cluster positions - with the 5th cluster in the center
    let clusterCenterX, clusterCenterY;
    
    if (c === 4) { // Central cluster (5th cluster)
      clusterCenterX = width * 0.5;
      clusterCenterY = height * 0.5;
    } else {
      // Position the 4 outer clusters in a square formation
      const angle = (c * Math.PI / 2) + (Math.PI / 4); // Positions at 45°, 135°, 225°, 315°
      const distance = Math.min(width, height) * 0.28; // Distance from center
      clusterCenterX = width * 0.5 + Math.cos(angle) * distance;
      clusterCenterY = height * 0.5 + Math.sin(angle) * distance;
    }
    
    // Calculate cluster radius
    const clusterRadius = c === 4 
      ? Math.min(width, height) * 0.18  // Smaller radius for central cluster
      : Math.min(width, height) * 0.22; // Radius for outer clusters
    
    // Create dots for this cluster
    const clusterColor = CLUSTER_COLORS[c];
    
    for (let i = 0; i < dotsPerCluster; i++) {
      // Use a spiral pattern to place dots
      const angle = (i / dotsPerCluster) * Math.PI * 8; // More rotations for wider spread
      const radiusRatio = Math.pow(i / dotsPerCluster, 0.5); // Better distribution
      const distance = radiusRatio * clusterRadius;
      
      // Add some randomness but prevent overlap
      const x = clusterCenterX + Math.cos(angle) * distance + (Math.random() - 0.5) * 10;
      const y = clusterCenterY + Math.sin(angle) * distance + (Math.random() - 0.5) * 10;
      
      // Create the dot
      dots.push({
        id: c * dotsPerCluster + i,
        x,
        y,
        originalX: x, // Store original position for returning after mouse interaction
        originalY: y, // Store original position for returning after mouse interaction
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2.5 + Math.random() * 2.5, // Increased dot size
        cluster: c,
        color: clusterColor,
        pulseSpeed: 0.8 + Math.random() * 0.4
      });
    }
    
    // Create connections within this cluster
    const clusterStart = c * dotsPerCluster;
    const clusterEnd = clusterStart + dotsPerCluster;
    
    // For each dot in this cluster
    for (let i = clusterStart; i < clusterEnd && i < dots.length; i++) {
      const dot = dots[i];
      
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
            if (distance < clusterRadius * 0.8) { // Increased connection distance
              connections.push({
                from: i,
                to: targetIndex,
                strength: 0.8 - (distance / (clusterRadius * 1.2)),
                type: 'intra'
              });
              
              connected.add(targetIndex);
              break;
            }
          }
        }
      }
    }
  }
  
  // Create more connections between clusters with special focus on the central cluster
  for (let c1 = 0; c1 < clusters; c1++) {
    for (let c2 = c1 + 1; c2 < clusters; c2++) {
      // Add more connections if one of the clusters is the central one (cluster index 4)
      const isConnectionWithCentral = c1 === 4 || c2 === 4;
      const interConnections = isConnectionWithCentral
        ? 8 + Math.floor(Math.random() * 4) // More connections to central cluster
        : 5 + Math.floor(Math.random() * 4); // Regular connections
      
      for (let i = 0; i < interConnections; i++) {
        const fromIndex = c1 * dotsPerCluster + Math.floor(Math.random() * dotsPerCluster);
        const toIndex = c2 * dotsPerCluster + Math.floor(Math.random() * dotsPerCluster);
        
        if (fromIndex < dots.length && toIndex < dots.length) {
          connections.push({
            from: fromIndex,
            to: toIndex,
            strength: isConnectionWithCentral 
              ? 0.5 + Math.random() * 0.3 // Stronger connections to central cluster
              : 0.3 + Math.random() * 0.3,
            type: 'inter'
          });
        }
      }
    }
  }
  
  // Add some random dots to fill in empty spaces - fewer as we now have 5 clusters
  const extraDots = 15; // Additional random dots
  for (let i = 0; i < extraDots; i++) {
    const randomCluster = Math.floor(Math.random() * clusters);
    const x = Math.random() * width;
    const y = Math.random() * height;
    
    dots.push({
      id: dots.length,
      x,
      y,
      originalX: x, // Store original position
      originalY: y, // Store original position
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: 2 + Math.random() * 2,
      cluster: randomCluster,
      color: CLUSTER_COLORS[randomCluster],
      pulseSpeed: 0.8 + Math.random() * 0.4
    });
  }
  
  return { dots, connections };
}

// Animation hook that handles the canvas rendering
export function useNeuralNetworkAnimation(totalDots = 120, clusters = 4) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<DotCluster[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef<{ x: number, y: number, active: boolean }>({ x: 0, y: 0, active: false });
  
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
    
    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Call resize initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001; // Current time in seconds
      
      // Update dot positions based on mouse influence
      if (mouseRef.current.active) {
        dotsRef.current.forEach(dot => {
          // Calculate distance from mouse
          const dx = dot.x - mouseRef.current.x;
          const dy = dot.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < MOUSE_INFLUENCE_RADIUS) {
            // Calculate repulsion force (stronger when closer)
            const force = (1 - distance / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPEL_STRENGTH;
            
            // Apply force to move away from mouse
            const angle = Math.atan2(dy, dx);
            dot.x += Math.cos(angle) * force * 5;
            dot.y += Math.sin(angle) * force * 5;
            
            // Keep dots within boundaries with some padding
            const padding = dot.size * 3;
            if (dot.x < padding) dot.x = padding;
            if (dot.x > canvas.width - padding) dot.x = canvas.width - padding;
            if (dot.y < padding) dot.y = padding;
            if (dot.y > canvas.height - padding) dot.y = canvas.height - padding;
          }
        });
      } else {
        // Return dots slowly to their original positions when mouse is not active
        dotsRef.current.forEach(dot => {
          if (dot.originalX !== undefined && dot.originalY !== undefined) {
            dot.x += (dot.originalX - dot.x) * RETURN_SPEED;
            dot.y += (dot.originalY - dot.y) * RETURN_SPEED;
          }
          
          // Apply gentle movement with boundaries
          dot.x += Math.sin(time * dot.pulseSpeed) * 0.3;
          dot.y += Math.cos(time * dot.pulseSpeed * 1.3) * 0.3;
          
          // Keep dots within boundaries with some padding
          const padding = dot.size * 3;
          if (dot.x < padding) dot.x = padding;
          if (dot.x > canvas.width - padding) dot.x = canvas.width - padding;
          if (dot.y < padding) dot.y = padding;
          if (dot.y > canvas.height - padding) dot.y = canvas.height - padding;
        });
      }
      
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
          ctx.lineWidth = conn.strength * 1.2; // Thicker lines
        } else {
          // Between-cluster connection
          ctx.strokeStyle = `rgba(255, 255, 255, ${conn.strength * 0.3})`; // More visible
          ctx.lineWidth = conn.strength * 0.7; // Thicker lines
        }
        
        ctx.stroke();
      });
      
      // Update and draw dots
      dotsRef.current.forEach(dot => {
        // Draw the dot with pulsing effect
        const pulseSize = dot.size * (0.8 + Math.sin(time * 2 + dot.id * 0.3) * 0.25 * dot.pulseSpeed);
        
        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, pulseSize * 4 // Larger glow
        );
        
        // Extract base color components for gradient
        const baseColor = dot.color;
        const lightColor = baseColor.replace('0.8', '0.4'); // More visible glow
        
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, lightColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        // Draw glow
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(dot.x, dot.y, pulseSize * 4, 0, Math.PI * 2);
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
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [totalDots, clusters]);
  
  return canvasRef;
}
