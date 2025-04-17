
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
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-white">07</div>
          <span className="text-xs text-white/70">Days</span>
        </div>
        <div className="text-2xl font-bold text-white/70">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-white">00</div>
          <span className="text-xs text-white/70">Hours</span>
        </div>
        <div className="text-2xl font-bold text-white/70">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-white">00</div>
          <span className="text-xs text-white/70">Mins</span>
        </div>
        <div className="text-2xl font-bold text-white/70">:</div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-white">00</div>
          <span className="text-xs text-white/70">Secs</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <CountdownDisplay value={days} label="Days" />
      <div className="text-2xl font-bold text-white/70">:</div>
      <CountdownDisplay value={hours} label="Hours" />
      <div className="text-2xl font-bold text-white/70">:</div>
      <CountdownDisplay value={minutes} label="Mins" />
      <div className="text-2xl font-bold text-white/70">:</div>
      <CountdownDisplay value={seconds} label="Secs" />
    </div>
  );
};

