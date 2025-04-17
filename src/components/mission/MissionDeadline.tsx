
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissionDeadlineProps {
  title: string;
  subtitle?: string;
  showButton?: boolean;
}

export const MissionDeadline = ({ title, subtitle, showButton }: MissionDeadlineProps) => {
  return (
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      {subtitle && (
        <p className="text-sm text-white/70">
          {subtitle}
        </p>
      )}
      {showButton && (
        <a 
          href="https://482tykjn26x.typeform.com/pulse#city=" 
          target="_blank" 
          rel="noopener noreferrer"
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
  );
};

