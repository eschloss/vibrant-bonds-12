import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ticket } from "lucide-react";
import type { EventHeaderCtaLocation } from "@/contexts/EventHeaderContext";
import { useIsMobile } from "@/hooks/use-mobile";

type EventStickyCtaProps = {
  checkoutHref: string;
  trackCheckoutClick: (location: EventHeaderCtaLocation) => void;
  t: (key: string, fallback?: string) => string;
  ticketsRemaining: number;
  checkoutDisabled?: boolean;
  checkoutDisabledLabel?: string;
  className?: string;
};

export default function EventStickyCta({
  checkoutHref,
  trackCheckoutClick,
  t,
  ticketsRemaining,
  checkoutDisabled = false,
  checkoutDisabledLabel = "",
  className = "",
}: EventStickyCtaProps) {
  const isMobile = useIsMobile();
  const urgencyText = isMobile
    ? t("event_detail.sticky.tickets_remaining_short", "Only {n} spots left for this event").replace("{n}", String(ticketsRemaining))
    : t("event_detail.sticky.tickets_remaining", "Only {n} tickets left").replace("{n}", String(ticketsRemaining));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 px-4 pr-24 py-4 sm:py-3 backdrop-blur-md bg-gray-900/95 border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] pb-[max(1rem,env(safe-area-inset-bottom))] ${className}`}
    >
      <div className="flex flex-col items-start gap-1 sm:gap-0.5 min-w-0">
        {checkoutDisabled ? (
          <span className="text-sm font-medium text-white/55">{checkoutDisabledLabel}</span>
        ) : (
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
            <Ticket size={16} className="shrink-0" aria-hidden />
            <span>{urgencyText}</span>
          </div>
        )}
      </div>
      {checkoutDisabled ? (
        <span
          role="status"
          className="w-full sm:w-auto shrink-0 justify-center inline-flex items-center gap-2 bg-white/10 text-white/55 px-6 py-3.5 sm:py-3 rounded-full font-semibold text-base border border-white/10 cursor-not-allowed min-h-[44px] items-center"
        >
          {checkoutDisabledLabel || t("event_detail.cta.unavailable", "Unavailable")}
        </span>
      ) : (
        <Link
          to={checkoutHref}
          onClick={() => trackCheckoutClick("sticky")}
          className="w-full sm:w-auto shrink-0 justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-3.5 sm:py-3 rounded-full font-semibold text-base shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/40 min-h-[44px] items-center"
        >
          {t("event_detail.sticky.reserve_spot", "Reserve your spot")}
        </Link>
      )}
    </motion.div>
  );
}
