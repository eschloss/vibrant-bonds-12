
import { CountdownDisplay, formatTime } from "./CountdownDisplay";

interface TimerDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStatic?: boolean;
}

export const TimerDisplay = ({ days, hours, minutes, seconds, isStatic = false }: TimerDisplayProps) => {
  if (isStatic) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-bold text-white">07</div>
          <span className="text-sm text-white/70 mt-1">Days</span>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-sm text-white/70 mt-1">Hours</span>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-sm text-white/70 mt-1">Mins</span>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl font-bold text-white">00</div>
          <span className="text-sm text-white/70 mt-1">Secs</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <CountdownDisplay value={days} label="Days" />
      <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
      <CountdownDisplay value={hours} label="Hours" />
      <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
      <CountdownDisplay value={minutes} label="Mins" />
      <div className="text-4xl md:text-5xl font-bold text-white/30">:</div>
      <CountdownDisplay value={seconds} label="Secs" />
    </div>
  );
};

