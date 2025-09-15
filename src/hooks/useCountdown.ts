import { useState, useEffect, useRef } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getFirstMondayOfMonthAt2300(ref: Date): Date {
  const year = ref.getFullYear();
  const month = ref.getMonth(); // 0-indexed
  const d = new Date(year, month, 1, 23, 0, 0, 0); // 23:00 local time on the 1st
  const day = d.getDay(); // 0 Sun, 1 Mon, ...
  const offsetToMonday = (1 - day + 7) % 7; // days to next Monday
  d.setDate(1 + offsetToMonday);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function diffToTimeLeft(target: Date, now = new Date()): TimeLeft {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const sec = Math.floor(diffMs / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return { days, hours, minutes, seconds };
}

export const useCountdown = (frequency_days?: number) => {
  const freq = typeof frequency_days === "number" && frequency_days > 0 ? frequency_days : 7;

  const computeNextDate = () => {
    const now = new Date();

    // Base is the first Monday of THIS month at 23:00
    let base = getFirstMondayOfMonthAt2300(now);

    // If base already passed, jump forward in freq-day steps
    if (base.getTime() <= now.getTime()) {
      const msPerStep = freq * 86400000;
      const steps = Math.ceil((now.getTime() - base.getTime() + 1) / msPerStep);
      base = addDays(base, steps * freq);
    }

    // If base is somehow still not in the future, push one more step
    if (base.getTime() <= now.getTime()) {
      base = addDays(base, freq);
    }

    return base;
  };

  const getTimeUntilNext = (): TimeLeft => {
    const nextDate = computeNextDate();
    return diffToTimeLeft(nextDate);
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeUntilNext());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // tick every second
    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeUntilNext());
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // re-run if frequency changes
  }, [freq]);

  return timeLeft;
};
