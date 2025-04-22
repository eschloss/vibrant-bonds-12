
import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CityCardProps {
  name: string;
  state?: string;
  description: string;
  link: string;
  isExternal?: boolean;
  disabled?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ name, state, description, link, isExternal, disabled }) => {
  const Wrapper = isExternal ? "a" : Link;
  const wrapperProps = isExternal
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { to: link };

  return (
    // @ts-ignore — TypeScript doesn't know that Wrapper can be both Link or "a"
    <Wrapper {...wrapperProps} className="block">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full 
        hover:border-[#38D1BF] transition-all hover:shadow-lg hover:shadow-[#38D1BF]/10 group opacity-100"
      >
        <div className="flex items-start gap-4">
          <div className="bg-[#38D1BF]/20 rounded-full p-3 group-hover:bg-[#38D1BF]/40 transition-colors">
            <MapPin className="transition-colors text-[#38D1BF] group-hover:text-[#38D1BF]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#38D1BF] transition-colors">
              {name}
            </h3>
            {state && (
              <p className="text-sm text-gray-400 mb-2">{state}</p>
            )}
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className={`text-[#38D1BF] group-hover:bg-[#38D1BF]/20 group-hover:text-[#38D1BF] rounded-md font-semibold transition-colors`}
                disabled={disabled}
              >
                View
                {/* Same arrow icon styling as originals */}
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform text-[#38D1BF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CityCard;
