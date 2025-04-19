
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
      <div className="relative h-[60px] md:h-[72px] w-[50px] md:w-[60px] flex items-center justify-center">
        <motion.div 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white absolute inset-0 flex items-center justify-center"
          key={`${label}-${value}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.3, 
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
