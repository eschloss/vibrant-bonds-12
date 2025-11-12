import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PageLoadingOverlayProps = {
  show: boolean;
  minDurationMs?: number;
  className?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PageLoadingOverlay({
  show,
  minDurationMs = 400,
  className = ""
}: PageLoadingOverlayProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const shownAtRef = useRef<number | null>(null);
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    let hideTimer: number | null = null;
    if (show) {
      shownAtRef.current = Date.now();
      setVisible(true);
    } else if (visible) {
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : minDurationMs;
      const remaining = Math.max(0, minDurationMs - elapsed);
      hideTimer = window.setTimeout(() => setVisible(false), remaining) as unknown as number;
    }
    return () => {
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [show, visible, minDurationMs]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className={`fixed inset-0 z-50 pointer-events-none ${className}`}
          aria-hidden="true"
        >
          {/* Soft gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/70 dark:from-gray-900/70 dark:via-gray-900/40 dark:to-gray-900/70" />

          {/* Shimmer band */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: reduceMotion ? 0 : Infinity,
                duration: reduceMotion ? 0 : 1.6,
                ease: "easeInOut"
              }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


