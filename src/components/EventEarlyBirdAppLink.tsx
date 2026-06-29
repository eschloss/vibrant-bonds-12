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
        "inline-flex items-center justify-center gap-3 rounded-full border border-amber-400/70 bg-transparent px-6 py-3.5 sm:py-4 hover:bg-amber-400/[0.06] hover:border-amber-400 transition-colors",
        isHero
          ? "w-full sm:w-auto min-w-[200px] sm:min-w-[220px] lg:min-w-[600px] lg:w-[600px]"
          : "w-full",
        className
      )}
    >
      <Users
        size={isHero ? 22 : 20}
        className="shrink-0 text-amber-400"
        aria-hidden
      />
      <span className="flex flex-col items-center text-center">
        <span className="font-semibold text-amber-400 text-base sm:text-lg leading-tight">
          {t(
            "event_detail.hero.early_bird_app.title",
            "See who's going in the Pulse app"
          )}
        </span>
        <span className="text-sm text-white/85 font-normal leading-snug mt-0.5">
          {t(
            "event_detail.hero.early_bird_app.subtitle",
            "Early bird pricing available in the app."
          )}
        </span>
      </span>
    </Link>
  );
}
