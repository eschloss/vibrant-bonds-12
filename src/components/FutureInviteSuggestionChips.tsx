import { cn } from "@/lib/utils";
import { FUTURE_INVITE_SUGGESTION_IDS } from "@/lib/futureInviteSuggestions";

type Props = {
  selectedIds: string[];
  onToggle: (id: string) => void;
  t: (key: string, fallback?: string) => string;
};

export default function FutureInviteSuggestionChips({ selectedIds, onToggle, t }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {FUTURE_INVITE_SUGGESTION_IDS.map((id) => {
        const selected = selectedIds.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
              selected
                ? "bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20"
                : "border border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:text-white"
            )}
          >
            {t(`events_city.future_interest.types.${id}`, id)}
          </button>
        );
      })}
    </div>
  );
}
