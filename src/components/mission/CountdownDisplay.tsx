
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
      <div className="text-4xl md:text-5xl font-bold text-white">
        {formatTime(value)}
      </div>
      <span className="text-sm text-white/70 mt-1">{label}</span>
    </div>
  );
};
