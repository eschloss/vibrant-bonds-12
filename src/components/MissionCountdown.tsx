import React from 'react';
import { Tally1 } from 'lucide-react';

const MissionCountdown = () => {
  return (
    <div className="relative">
      <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center flex items-center">
        <div className="absolute left-[-40px] md:left-[-80px] top-1/2 transform -translate-y-1/2 z-10">
          <div className="text-[120px] md:text-[200px] font-bold text-primary/10 select-none">
            1
          </div>
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Your Mission Starts In:
          </h3>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold text-primary">24</span>
              <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold text-primary">10</span>
              <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold text-primary">59</span>
              <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">Mins</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold text-primary">59</span>
              <span className="text-sm md:text-base text-gray-500 dark:text-gray-400">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCountdown;
