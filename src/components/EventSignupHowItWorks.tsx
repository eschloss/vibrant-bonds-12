import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, MessageSquare, Sparkles, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRefParam } from "@/hooks/useRefParam";

type EventSignupHowItWorksProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function EventSignupHowItWorks({
  ctaHref = "/how-it-works",
  ctaLabel = "How it works",
}: EventSignupHowItWorksProps) {
  const { addRefToUrl } = useRefParam();

  const steps = [
    {
      icon: CalendarDays,
      title: "Sign up for the event",
      description: "Reserve your spot. You’re officially in.",
      color: "bg-gradient-to-r from-pink-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Your group chat opens",
      description: "We add you to a Pulse in‑app chat with other attendees.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      icon: Sparkles,
      title: "We break the ice for you",
      description: "Pulse kickstarts the chat with prompts so you can get to know each other fast.",
      color: "bg-gradient-to-r from-stone-500 to-rose-500",
    },
    {
      icon: Users,
      title: "Just show up",
      description: "Arrive with familiar faces instead of walking in alone.",
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
  ] as const;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-xs font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue uppercase">
              How it works
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mt-1">
              Show up with new friends
            </div>
            <p className="text-sm text-white/70 mt-2 max-w-2xl">
              Pulse turns this event into a crew. Sign up, join the group chat, break the ice, then meet up IRL.
            </p>
          </div>
          <Link
            to={addRefToUrl(ctaHref)}
            className="hidden md:inline-flex text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors whitespace-nowrap"
          >
            Learn more
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="bg-gray-900/40 border border-gray-700/60 rounded-xl p-4"
            >
              <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${step.color}`}>
                <step.icon size={20} className="text-white" />
              </div>
              <div className="text-white font-semibold leading-snug">{step.title}</div>
              <div className="text-sm text-gray-300 mt-1 leading-relaxed">{step.description}</div>
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
            You’ll see the chat inside the Pulse app after booking.
          </div>
        </div>
      </div>
    </div>
  );
}

