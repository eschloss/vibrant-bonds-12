interface CountdownDisplayProps {
  value: number;
  label: string;
}

export const CountdownDisplay = ({ value, label }: CountdownDisplayProps) => {
  const padded = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white w-[3ch] text-center">
        {padded}
      </div>
      <span className="text-xs sm:text-sm text-white/70 mt-1">{label}</span>
    </div>
  );
};
