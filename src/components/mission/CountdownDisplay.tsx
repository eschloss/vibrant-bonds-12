
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
      <div className="relative h-[60px] md:h-[72px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white absolute inset-0 flex items-center justify-center"
          key={`${label}-${value}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.15, 
            ease: "easeOut" 
          }}
        >
          {formatTime(value)}
        </motion.div>
      </div>
      <span className="text-xs sm:text-sm text-white/70 mt-1">{label}</span>
    </div>
  );
};
