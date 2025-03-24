
import { useEffect, useRef } from "react";

const PsychedelicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Animation variables
    let time = 0;
    const colorCycles = [
      ["#8B5CF6", "#FDA4AF"], // Purple to Pink
      ["#F97316", "#FBBF24"], // Orange to Yellow
      ["#5EEAD4", "#93C5FD"], // Teal to Blue
    ];
    let currentColorCycle = 0;

    // Trippy background animation
    const animate = () => {
      time += 0.003;
      
      // Cycle through color schemes
      if (time % 20 < 0.01) {
        currentColorCycle = (currentColorCycle + 1) % colorCycles.length;
      }
      
      const [color1, color2] = colorCycles[currentColorCycle];
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw flowing patterns
      const w = canvas.width;
      const h = canvas.height;
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        
        // Wave parameters
        const amplitude = 50 + Math.sin(time * 0.5) * 20;
        const frequency = 0.008 + Math.sin(time * 0.2) * 0.002;
        const phaseShift = time * (0.5 + i * 0.1);
        
        // Create flowing wave path
        ctx.moveTo(0, h / 2);
        
        for (let x = 0; x < w; x += 5) {
          const y = h / 2 + 
            amplitude * Math.sin(x * frequency + phaseShift) +
            amplitude * 0.5 * Math.sin(x * frequency * 2 + phaseShift * 1.5);
          ctx.lineTo(x, y);
        }
        
        // Gradient for waves
        const waveGradient = ctx.createLinearGradient(0, h/2 - amplitude, 0, h/2 + amplitude);
        waveGradient.addColorStop(0, `${color1}55`); // Semitransparent
        waveGradient.addColorStop(1, `${color2}33`); // More transparent
        
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 80 - i * 15;
        ctx.globalAlpha = 0.2 + (i * 0.05);
        ctx.stroke();
      }
      
      // Add noise texture
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Subtle noise
        const noise = Math.random() * 15 - 7.5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
      }
      
      ctx.putImageData(imageData, 0, 0);
      ctx.globalAlpha = 1;
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
    />
  );
};

export default PsychedelicBackground;
