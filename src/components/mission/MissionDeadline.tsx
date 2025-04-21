import React from 'react';
import { Button } from "@/components/ui/button";
interface MissionDeadlineProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  type: 'match' | 'meet';
}
export const MissionDeadline = ({
  title,
  subtitle,
  showButton,
  type
}: MissionDeadlineProps) => {
  return <div className="flex gap-4 items-start">
      <div>
        <h4 className="text-xl font-semibold text-white tracking-tight mb-2 md:text-3xl">{title}</h4>
        {showButton && <a href="/cities" rel="noopener noreferrer" className="inline-block">
            <Button size="xl" className="bg-[#FF2688] hover:bg-[#FF2688]/90 text-white shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 rounded-full">
                <span>Take the Quiz, Get Matched</span>
            </Button>  
        </a>}
      </div>
    </div>;
};