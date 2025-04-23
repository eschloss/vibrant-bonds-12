
import { motion } from "framer-motion";

interface CountdownDisplayProps {
  value: number;
  label: string;
}

export const formatTime = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const CountdownDisplay = ({ value, label }: CountdownDisplayProps) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white hardware-accelerated min-w-[3ch] text-center"
        key={`${label}-${value}`}
        initial={{ opacity: 0, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.15, 
          ease: "easeOut" 
        }}
        style={{ 
          willChange: "opacity, transform",
          transform: "translateZ(0)"
        }}
      >
        {formatTime(value)}
      </motion.div>
      <span className="text-xs sm:text-sm text-white/70 mt-1">{label}</span>
    </div>
  );
};

