
import { CountdownDisplay, formatTime } from "./CountdownDisplay";

interface TimerDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStatic?: boolean;
}

const Colon = () => (
  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/30 w-[1.5ch] text-center">:</div>
);

export const TimerDisplay = ({ days, hours, minutes, seconds, isStatic = false }: TimerDisplayProps) => {
  if (isStatic) {
    return (
      <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">07</div>
          <span className="text-xs sm:text-sm text-white/70 mt-1">Days</span>
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-xs sm:text-sm text-white/70 mt-1">Hours</span>
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-xs sm:text-sm text-white/70 mt-1">Mins</span>
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-xs sm:text-sm text-white/70 mt-1">Secs</span>
        </div>
      </div>
    );
  }

  return (
<div className="flex items-center justify-center w-full gap-2 sm:gap-4 font-mono">
  <CountdownDisplay value={days} label="Days" />
  <Colon />
  <CountdownDisplay value={hours} label="Hours" />
  <Colon />
  <CountdownDisplay value={minutes} label="Mins" />
  <Colon />
  <CountdownDisplay value={seconds} label="Secs" />
</div>
  );
};
