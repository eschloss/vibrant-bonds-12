
import { Brain, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissionDeadlineProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
  type: 'match' | 'meet';
}

export const MissionDeadline = ({ title, subtitle, showButton, type }: MissionDeadlineProps) => {
  const Icon = type === 'match' ? Brain : MapPin;
  
  return (
    <div className="flex gap-4 items-start">
      <div className="rounded-full bg-white/10 p-2.5">
        <Icon className="w-5 h-5 text-pulse-purple" />
      </div>
      <div>
        <h4 className="text-lg md:text-xl font-semibold text-white tracking-tight mb-1.5">{title}</h4>
        {subtitle && (
          <p className="text-sm text-white/70 leading-relaxed mb-3">
            {subtitle}
          </p>
        )}
        {showButton && (
          <a 
            href="https://482tykjn26x.typeform.com/pulse#city=" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-medium"
              size="sm"
            >
              <Brain className="mr-2 h-4 w-4" />
              Take Personality Test
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
