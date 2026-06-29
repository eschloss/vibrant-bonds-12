import React from "react";
import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type EventEarlyBirdAppLinkProps = {
  t: (key: string, fallback?: string) => string;
  variant?: "default" | "compact";
  className?: string;
  onClick?: () => void;
};

export default function EventEarlyBirdAppLink({
  t,
  variant = "default",
  className,
  onClick,
}: EventEarlyBirdAppLinkProps) {
  const isCompact = variant === "compact";

  return (
    <Link
      to="/download"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/[0.07] font-medium text-amber-200/90 hover:bg-amber-400/12 hover:border-amber-400/35 hover:text-amber-100 transition-colors",
        isCompact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        className
      )}
    >
      <Smartphone
        size={isCompact ? 14 : 16}
        className="shrink-0"
        aria-hidden
      />
      <span>
        {t(
          "event_detail.hero.early_bird_app",
          "Early bird pricing in the Pulse app →"
        )}
      </span>
    </Link>
  );
}
