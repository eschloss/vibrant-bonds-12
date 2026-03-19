import React from "react";
import { ExternalLink } from "lucide-react";
import type { KikiProviderDetails } from "@/lib/eventApi";
import { getProviderName } from "@/lib/eventApi";
import { useTranslation } from "@/hooks/useTranslation";

type EventProviderSectionProps = {
  provider: KikiProviderDetails;
  providerEventUrl?: string;
  /** Optional: compact layout for sidebar/card contexts */
  compact?: boolean;
  /** Hide provider bio/description */
  hideDescription?: boolean;
  /** Hide "View official event page" link */
  hideEventLink?: boolean;
  /** Extra compact for tight spaces (e.g. checkout) */
  slim?: boolean;
  className?: string;
};

export default function EventProviderSection({
  provider,
  providerEventUrl,
  compact = false,
  hideDescription = false,
  hideEventLink = false,
  slim = false,
  className = "",
}: EventProviderSectionProps) {
  const { t } = useTranslation();
  const name = getProviderName(provider);
  const hasUrl = Boolean(provider?.url?.trim());
  const hasLogo = Boolean(provider?.logo?.trim());
  const hasBio = Boolean(provider?.bio?.trim());
  const hasEventUrl = Boolean(providerEventUrl?.trim());

  const nameSizeClass = slim ? "text-xs" : "";
  const nameContent = hasUrl ? (
    <a
      href={provider.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-white/90 hover:text-white font-medium underline underline-offset-2 decoration-white/40 hover:decoration-white/70 transition-colors inline-flex items-center gap-1 ${nameSizeClass}`}
    >
      {name}
      <ExternalLink size={slim ? 12 : 14} className="shrink-0 opacity-70" />
    </a>
  ) : (
    <span className={`text-white/90 font-medium ${nameSizeClass}`}>{name}</span>
  );

  if (compact) {
    return (
      <div className={className}>
        <div className={`flex items-center gap-2 ${slim ? "gap-1.5" : ""}`}>
          {hasLogo && (
            <img
              src={provider.logo}
              alt=""
              className={`${slim ? "w-6 h-6 rounded-md" : "w-8 h-8 rounded-lg"} object-contain bg-white/5 border border-white/10 shrink-0`}
              loading="lazy"
            />
          )}
          <div className="min-w-0">
            {nameContent}
            {hasBio && !hideDescription && (
              <p className="text-xs text-white/60 mt-0.5 line-clamp-2">{provider.bio}</p>
            )}
            {hasEventUrl && !hideEventLink && (
              <a
                href={providerEventUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-[#38D1BF] hover:text-[#38D1BF]/80 transition-colors"
              >
                {t("event_confirmation.provider.see_more_details", "View official event page")}
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-white/10 bg-black/20 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        {hasLogo && (
          <img
            src={provider.logo}
            alt=""
            className="w-12 h-12 rounded-lg object-contain bg-white/5 border border-white/10 shrink-0"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{nameContent}</div>
          {hasBio && !hideDescription && (
            <p className="text-sm text-white/65 mt-1.5 leading-relaxed">{provider.bio}</p>
          )}
          {hasEventUrl && !hideEventLink && (
            <a
              href={providerEventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#38D1BF] hover:text-[#38D1BF]/80 transition-colors"
            >
              {t("event_confirmation.provider.see_more_details", "View official event page")}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
