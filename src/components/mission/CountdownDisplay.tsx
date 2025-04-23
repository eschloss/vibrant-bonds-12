
import React from 'react';
import { motion } from 'framer-motion';

interface CountdownDisplayProps {
  value: string;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ value }) => {
  return (
    <div className="h-24 w-24 relative flex justify-start"> {/* Fixed height/width container, left alignment */}
      <motion.div
        key={value}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute left-0" // Left alignment
      >
        <span className="text-6xl font-bold">{value}</span>
      </motion.div>
    </div>
  );
};

export default CountdownDisplay;
