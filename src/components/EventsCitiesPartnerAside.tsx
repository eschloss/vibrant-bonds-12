import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export default function EventsCitiesPartnerAside({ className }: Props) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        "max-w-6xl mx-auto rounded-xl border-2 border-dashed border-pulse-pink/25 bg-gradient-to-br from-gray-900/90 via-purple-950/35 to-gray-900/90 shadow-[0_0_0_1px_rgba(116,26,173,0.12),0_12px_40px_-12px_rgba(0,0,0,0.55)] shadow-lg shadow-purple-500/10 backdrop-blur-sm overflow-hidden flex mb-8",
        className
      )}
    >
      <div
        className="w-1.5 shrink-0 bg-gradient-to-b from-pulse-pink via-accent to-pulse-blue"
        aria-hidden
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 min-w-0 flex-1 py-4 pl-4 pr-3 sm:pr-5">
        <div className="flex gap-3 min-w-0 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue shadow-[0_0_16px_rgba(116,26,173,0.35)]">
            <Building2 className="h-4 w-4 text-white" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-pulse-blue mb-1">
              {t("eventsCities.partner.kicker", "For venues & hosts")}
            </p>
            <p className="text-base font-semibold text-white leading-snug">
              {t("eventsCities.partner.title", "Run Pulse Events in your city")}
            </p>
            <p className="text-sm text-white/65 mt-1 leading-snug">
              {t(
                "eventsCities.partner.subtitle",
                "Have a venue or run experiences? Apply to partner and bring Pulse Events to your city."
              )}
            </p>
          </div>
        </div>
        <Link to="/partners" className="shrink-0 self-end sm:self-center">
          <Button
            size="sm"
            className="h-9 px-4 text-xs font-semibold rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90 shadow-lg shadow-purple-500/25"
          >
            {t("eventsCities.partner.cta", "Apply for partnership")}
            <ArrowRight className="ml-2 w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </aside>
  );
}
