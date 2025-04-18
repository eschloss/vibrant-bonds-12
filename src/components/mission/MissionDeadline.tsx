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
        {showButton && <a href="https://482tykjn26x.typeform.com/pulse#city=" target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-medium text-base px-6 py-2.5 my-[4px]">Take the Quiz, Get Matched</Button>
          </a>}
      </div>
    </div>;
};