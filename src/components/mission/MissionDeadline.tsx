import React from 'react';
import { Button } from "@/components/ui/button";
interface MissionDeadlineProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  type: 'match' | 'meet';
}
import { Link } from "react-router-dom";

export const MissionDeadline = ({
  title
}: MissionDeadlineProps) => {
  return <div className="flex gap-4 items-start">
      <div>
        <h4 className="text-xl font-semibold text-white tracking-tight mb-2 md:text-3xl">{title}</h4>
      </div>
    </div>;
};