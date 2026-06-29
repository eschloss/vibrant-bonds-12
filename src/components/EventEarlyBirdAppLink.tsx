import React from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

type EventEarlyBirdAppLinkProps = {
  t: (key: string, fallback?: string) => string;
  layout?: "hero" | "card";
  className?: string;
  onClick?: () => void;
};

export default function EventEarlyBirdAppLink({
  t,
  layout = "hero",
  className,
  onClick,
}: EventEarlyBirdAppLinkProps) {
  const isHero = layout === "hero";

  return (
    <Link
      to="/download"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-amber-400/70 bg-transparent hover:bg-amber-400/[0.06] hover:border-amber-400 transition-colors box-border",
        isHero
          ? "w-full sm:w-auto min-w-[200px] sm:min-w-[220px] lg:min-w-[600px] lg:w-[600px] px-6 py-5 sm:py-5 max-h-[72px]"
          : "w-full px-6 py-4 max-h-[60px]",
        className
      )}
    >
      <span className="inline-grid grid-cols-[auto_1fr] items-center gap-x-2.5 gap-y-1">
        <Users
          size={isHero ? 18 : 16}
          className="row-start-1 col-start-1 shrink-0 text-amber-400"
          aria-hidden
        />
        <span
          className={cn(
            "row-start-1 col-start-2 min-w-0 text-left font-semibold text-amber-400 leading-none",
            isHero ? "text-sm sm:text-base" : "text-sm"
          )}
        >
          {t(
            "event_detail.hero.early_bird_app.title",
            "See who's going in the Pulse app"
          )}
        </span>
        <span className="row-start-2 col-start-2 min-w-0 text-left text-xs text-white/85 font-normal leading-none">
          {t(
            "event_detail.hero.early_bird_app.subtitle",
            "Early bird pricing available in the app."
          )}
        </span>
      </span>
    </Link>
  );
}
