
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseMovingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      isMouseMovingRef.current = true;
      
      // Reset the timeout on each mouse move
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      
      // Set a timeout to stop generating particles if mouse stops moving
      timeoutRef.current = window.setTimeout(() => {
        isMouseMovingRef.current = false;
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Color palette for particles
    const colors = [
      "#8B5CF6", // Purple
      "#F97316", // Orange
      "#5EEAD4", // Teal
      "#93C5FD", // Blue
      "#FDA4AF", // Pink
    ];

    // Animation loop
    const animate = () => {
      // Create particles on mouse move
      if (isMouseMovingRef.current) {
        for (let i = 0; i < 2; i++) { // Adjust number of particles per frame
          const size = Math.random() * 15 + 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Add variation to starting position
          const offsetX = (Math.random() - 0.5) * 20;
          const offsetY = (Math.random() - 0.5) * 20;
          
          // Random velocity
          const vx = (Math.random() - 0.5) * 3;
          const vy = (Math.random() - 0.5) * 3;
          
          // Add new particle
          particlesRef.current.push({
            x: mousePositionRef.current.x + offsetX,
            y: mousePositionRef.current.y + offsetY,
            size,
            color,
            vx,
            vy,
            life: 0,
            maxLife: Math.random() * 100 + 50
          });
        }
      }

      // Clear canvas with transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Increase life
        particle.life++;
        
        // Calculate opacity based on remaining life
        const lifeRatio = 1 - particle.life / particle.maxLife;
        const opacity = lifeRatio;
        
        // Calculate current size
        const currentSize = particle.size * lifeRatio;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize
        );
        gradient.addColorStop(0, `${particle.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-10 pointer-events-none"
    />
  );
};

export default MouseTrail;
