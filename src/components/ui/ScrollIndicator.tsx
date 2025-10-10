import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = { href: string; className?: string; label?: string };

const ScrollIndicator: React.FC<Props> = ({ href, className, label }) => {
  const prefersReduced = useReducedMotion();
  const dotAnim = prefersReduced ? {} : { y: [0, 8, 0], opacity: [1, 0.7, 1] };
  const chevronAnim = prefersReduced ? {} : { y: [0, 4, 0] };

  return (
    <a
      href={href}
      className={`group inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors ${className || ""}`}
      aria-label={label || "Scroll down"}
    >
      <span className="relative inline-flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-300/80 group-hover:border-gray-500/80 transition-colors">
        <motion.span
          className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400 shadow-sm"
          animate={dotAnim}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"/>
      </span>
      <motion.span
        aria-hidden
        animate={chevronAnim}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        <ChevronDown className="h-4 w-4 text-gray-300/80 group-hover:text-gray-500/80" />
      </motion.span>
      <span className="sr-only">{label || "Scroll down"}</span>
    </a>
  );
};

export default ScrollIndicator;


