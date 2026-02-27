import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type EventConfirmationNextStepsProps = {
  onPrimaryCta: () => void;
  ctaLabel?: string;
};

const steps = [
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
    icon: Clock,
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
  },
] as const;

export default function EventConfirmationNextSteps({
  onPrimaryCta,
  ctaLabel,
}: EventConfirmationNextStepsProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/35 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
          <div className="min-w-0">
            <div className="text-xs font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue uppercase">
              {t("event_confirmation.steps.kicker", "Next steps")}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mt-1">
              {t("event_confirmation.steps.title", "You’re all set")}
            </div>
            <p className="text-sm text-white/70 mt-2 max-w-2xl">
              {t(
                "event_confirmation.steps.subtitle",
                "Complete the vibe check now. Then we’ll email you when your group chat is ready."
              )}
            </p>
          </div>

          <div className="w-full md:w-auto">
            <Button
              size="lg"
              onClick={onPrimaryCta}
              className="w-full md:w-auto rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95"
            >
              {ctaLabel || t("event_confirmation.vibe_check.cta", "Complete vibe check")}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                {t(
                  `event_confirmation.steps.${step.key}.title`,
                  step.key
                )}
              </div>
              <div className="text-sm text-gray-300 mt-1 leading-relaxed">
                {t(
                  `event_confirmation.steps.${step.key}.desc`,
                  ""
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

