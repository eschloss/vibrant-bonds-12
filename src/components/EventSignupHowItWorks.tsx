import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare, Users, ArrowRight, MapPin, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRefParam } from "@/hooks/useRefParam";
import { useTranslation } from "@/hooks/useTranslation";

type EventSignupHowItWorksProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function EventSignupHowItWorks({
  ctaHref = "/how-it-works",
  ctaLabel = "How it works",
}: EventSignupHowItWorksProps) {
  const { addRefToUrl } = useRefParam();
  const { t } = useTranslation();

  const steps = [
    {
      icon: Users,
      title: t("event_detail.step1_title", "Get matched with likeminded attendees"),
      description: t(
        "event_detail.step1_desc",
        "Complete a quick vibe test so we can place you with 5–8 likeminded solo attendees who all want to make friends."
      ),
      color: "bg-gradient-to-r from-pink-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: t("event_detail.step2_title", "Break the ice"),
      description: t(
        "event_detail.step2_desc",
        "Chat with fellow group members, guided by our conversation starters so you get to know each other before the event."
      ),
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      icon: MapPin,
      title: t("event_detail.step3_title", "Show up with your crew"),
      description: t(
        "event_detail.step3_desc",
        "Walk into the event with familiar faces instead of as a stranger."
      ),
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
    {
      icon: UtensilsCrossed,
      title: t("event_detail.step4_title", "Pre or post-event meetup"),
      description: t(
        "event_detail.step4_desc",
        "Your group coordinates a pre or post-event hangout so the friendships keep going beyond the event itself."
      ),
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
    },
  ] as const;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mt-1">
              {t("event_detail.what_happens_title", "What happens after you sign up")}
            </div>
            <p className="text-sm text-white/70 mt-2 max-w-2xl">
              {t("eventsLanding.how.subtitle", "The event is organised by the original venue or provider. Here's what Pulse adds.")}
            </p>
          </div>
          <Link
            to={addRefToUrl(ctaHref)}
            className="hidden md:inline-flex text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors whitespace-nowrap"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex items-start gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4"
            >
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${step.color}`}>
                <step.icon size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold leading-snug">{step.title}</div>
                <div className="text-sm text-gray-300 mt-1 leading-relaxed">{step.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link to={addRefToUrl(ctaHref)} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95"
            >
              {ctaLabel}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <div className="text-xs text-white/60 px-1">
            {t("eventsLanding.how.note", "The group chat opens in the Pulse app after booking.")}
          </div>
        </div>
      </div>
    </div>
  );
}

