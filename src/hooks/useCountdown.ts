
import { useState, useEffect, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = () => {
  // Calculate time until next Monday 11pm
  const getTimeUntilNextMonday = () => {
    const now = new Date();
    const nextMonday = new Date(now);
  
    // Calculate days until Monday
    const day = now.getDay();
    let daysUntilMonday = (1 + 7 - day) % 7;
  
    if (day === 1 && now.getHours() >= 23) {
      // It's already Monday past 11PM, go to next week
      daysUntilMonday = 7;
    }
  
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(23, 0, 0, 0);
  
    const diff = nextMonday.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntilNextMonday());
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setTimeLeft(getTimeUntilNextMonday());
    }, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return timeLeft;
};

