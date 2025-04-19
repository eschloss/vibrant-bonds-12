
import { useState, useEffect, useRef, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = () => {
  // Calculate time until next Monday 11pm with memoization
  const getTimeUntilNextMonday = useCallback(() => {
    const now = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7));
    nextMonday.setHours(23, 0, 0, 0);
    
    const diff = Math.max(0, nextMonday.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntilNextMonday());
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Use throttled updates to prevent excessive renders
    let lastUpdateTime = 0;
    const THROTTLE_MS = 1000; // Update once per second
    
    const updateCountdown = () => {
      const now = Date.now();
      if (now - lastUpdateTime >= THROTTLE_MS) {
        setTimeLeft(getTimeUntilNextMonday());
        lastUpdateTime = now;
      }
    };

    countdownRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [getTimeUntilNextMonday]);

  return timeLeft;
};
