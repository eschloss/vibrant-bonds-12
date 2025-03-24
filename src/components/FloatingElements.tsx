
import { useEffect, useRef } from "react";

interface FloatingObject {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  xSpeed: number;
  ySpeed: number;
  type: "circle" | "triangle" | "square" | "emoji";
  emoji?: string;
  color: string;
}

const FloatingElements = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingObjectsRef = useRef<FloatingObject[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Colors
    const colors = [
      "#8B5CF6", // Purple
      "#F97316", // Orange
      "#5EEAD4", // Teal
      "#93C5FD", // Blue
      "#FDA4AF", // Pink
    ];

    const emojis = ["✨", "🌈", "💫", "🔮", "👋", "🫂", "🌟", "✌️", "🙌", "💭"];

    // Generate random floating objects
    const generateFloatingObjects = () => {
      const objects: FloatingObject[] = [];
      const numObjects = Math.max(10, Math.floor(window.innerWidth / 100));
      
      for (let i = 0; i < numObjects; i++) {
        const size = Math.random() * 30 + 10;
        const types = ["circle", "triangle", "square", "emoji"] as const;
        const type = types[Math.floor(Math.random() * types.length)];
        
        objects.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          xSpeed: (Math.random() - 0.5) * 0.5,
          ySpeed: (Math.random() - 0.5) * 0.5,
          type,
          emoji: type === "emoji" ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      floatingObjectsRef.current = objects;
    };

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate objects on resize
      generateFloatingObjects();
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Draw functions for different shapes
    const drawShape = (obj: FloatingObject) => {
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.rotation);

      // Different opacity based on size for layered effect
      const opacity = 0.1 + (obj.size / 40) * 0.1;
      ctx.fillStyle = `${obj.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.strokeStyle = `${obj.color}${Math.round((opacity + 0.2) * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = 1;

      switch (obj.type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, obj.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -obj.size / 2);
          ctx.lineTo(-obj.size / 2, obj.size / 2);
          ctx.lineTo(obj.size / 2, obj.size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case "square":
          ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
          ctx.strokeRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
          break;
        case "emoji":
          ctx.font = `${obj.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(obj.emoji || "✨", 0, 0);
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw floating objects
      floatingObjectsRef.current.forEach(obj => {
        // Update position
        obj.x += obj.xSpeed;
        obj.y += obj.ySpeed;
        obj.rotation += obj.rotationSpeed;

        // Wrap around edges
        if (obj.x < -obj.size) obj.x = canvas.width + obj.size;
        if (obj.x > canvas.width + obj.size) obj.x = -obj.size;
        if (obj.y < -obj.size) obj.y = canvas.height + obj.size;
        if (obj.y > canvas.height + obj.size) obj.y = -obj.size;

        // Draw the object
        drawShape(obj);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-5 pointer-events-none"
    />
  );
};

export default FloatingElements;
