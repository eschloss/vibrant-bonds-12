import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Users, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type StepKey = "vibe_check" | "ticket_email" | "chat_ready" | "arrive_early";

type EventConfirmationNextStepsProps = {
  onPrimaryCta?: () => void;
  ctaLabel?: string;
  /** When false, copy refers to one attendee chat rather than small matched groups. */
  microMatches?: boolean;
};

const ALL_STEPS: ReadonlyArray<{
  key: StepKey;
  icon: typeof CheckCircle2;
  color: string;
}> = [
  {
    key: "vibe_check",
    icon: CheckCircle2,
    color: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    key: "ticket_email",
    icon: Mail,
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
  },
  {
    key: "chat_ready",
    icon: Users,
    color: "bg-gradient-to-r from-stone-500 to-rose-500",
  },
  {
    key: "arrive_early",
    icon: UtensilsCrossed,
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
  },
];

export default function EventConfirmationNextSteps({
  onPrimaryCta,
  ctaLabel,
  microMatches = true,
}: EventConfirmationNextStepsProps) {
  const { t } = useTranslation();
  const steps = microMatches ? ALL_STEPS : ALL_STEPS.filter((s) => s.key !== "vibe_check");

  return (
    <div className="bg-gray-800/35 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
          <div className="min-w-0">
            <div className="text-xs font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue uppercase">
              {t("event_confirmation.steps.kicker", "Next steps")}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mt-1">
              {t(
                microMatches ? "event_confirmation.steps.title" : "event_confirmation.steps.title_single_group",
                microMatches ? "One last step" : "What's next"
              )}
            </div>
            <p className="text-sm text-white/70 mt-2 max-w-2xl">
              {t(
                microMatches ? "event_confirmation.steps.subtitle" : "event_confirmation.steps.subtitle_single_group",
                microMatches
                  ? "Complete your vibe test now so we can match you with the right group for this event."
                  : "Check your email, then watch for your group chat to open ahead of the event so you can say hi—and optionally plan an informal meetup."
              )}
            </p>
          </div>

          {microMatches && onPrimaryCta ? (
            <div className="w-full md:w-auto">
              <Button
                size="lg"
                onClick={onPrimaryCta}
                className="w-full md:w-auto rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95"
              >
                {ctaLabel || t("event_confirmation.vibe_check.cta", "Complete vibe test")}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          ) : null}
        </div>

        <div
          className={
            microMatches ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          }
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="bg-gray-900/35 border border-white/10 rounded-xl p-4"
            >
              <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${step.color}`}>
                <step.icon size={20} className="text-white" />
              </div>
              <div className="text-white font-semibold leading-snug">
                {t(`event_confirmation.steps.${step.key}.title`, step.key)}
              </div>
              <div className="text-sm text-gray-300 mt-1 leading-relaxed">
                {step.key === "vibe_check"
                  ? t(
                      "event_confirmation.steps.vibe_check.desc",
                      "It takes about 2 minutes and helps us match you with the right group."
                    )
                  : step.key === "chat_ready"
                    ? t(
                        microMatches
                          ? "event_confirmation.steps.chat_ready.desc"
                          : "event_confirmation.steps.chat_ready.desc_single_group",
                        microMatches
                          ? "A few days before the event, the group chat will open so you can break the ice and get to know the group."
                          : "A few days before the event, the group chat will open so you can break the ice and get to know other attendees."
                      )
                    : t(`event_confirmation.steps.${step.key}.desc`, "")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
