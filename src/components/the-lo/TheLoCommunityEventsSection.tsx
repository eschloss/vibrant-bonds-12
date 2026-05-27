import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { memberActivationSteps } from "@/components/the-lo/TheLoHowItWorksJourney";

type TheLoCommunityEventsSectionProps = {
  onEnter: () => void;
};

const eventFlowRows = [
  {
    label: "RSVP",
    description: "Browse official LO events in Pulse and reserve your spot.",
    accent: "text-[#FF2688]",
    glow: "from-[#FF2688]/25",
  },
  {
    label: "Chat",
    description: "Meet other attendees in a private group chat before the day.",
    accent: "text-[#38D1BF]",
    glow: "from-[#38D1BF]/20",
  },
  {
    label: "Arrive",
    description: "Show up with familiar faces — most members join solo.",
    accent: "text-[#F3E538]",
    glow: "from-[#F3E538]/15",
  },
];

const eventsStep = memberActivationSteps[2];

const TheLoCommunityEventsSection = ({ onEnter }: TheLoCommunityEventsSectionProps) => {
  return (
    <section
      id="community-events"
      className="relative mx-auto mt-10 overflow-hidden px-4 py-12 text-left sm:px-6 md:px-8 md:py-16"
    >
      <div className="pointer-events-none absolute left-0 top-8 h-80 w-80 rounded-full bg-[#FF2688]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-16 h-96 w-96 rounded-full bg-[#741ADD]/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-[#38D1BF]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#FF2688]">
            Official community events
          </span>
          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
            View and join LO events in Pulse
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
            Community-hosted gatherings curated for The LO. RSVP in the app, break the ice in chat,
            and arrive together — friendship-first, not dating.
          </p>

          <div className="mt-8 space-y-3">
            {eventFlowRows.map((row) => (
              <div
                key={row.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.075] via-white/[0.025] to-transparent p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
              >
                <div
                  className={`pointer-events-none absolute -left-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br ${row.glow} to-transparent blur-3xl transition duration-300 group-hover:opacity-90`}
                />
                <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                  <div
                    className={`min-w-24 text-3xl font-bold uppercase leading-none md:text-4xl ${row.accent}`}
                  >
                    {row.label}
                  </div>
                  <p className="text-base leading-relaxed text-white/78 md:text-lg">{row.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm font-semibold text-white/65 backdrop-blur-sm md:text-base">
            <span className="text-white/50">Events appear in Pulse after you enter with your LO invite.</span>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-8 py-3 text-base font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#38D1BF]/50 focus:ring-offset-2 focus:ring-offset-[#15191C]"
          >
            Enter Pulse with The LO
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex min-h-[28rem] items-start justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] pt-6 backdrop-blur-sm lg:min-h-[34rem]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,38,136,0.16),transparent_30%),radial-gradient(circle_at_78%_45%,rgba(116,26,221,0.14),transparent_32%)]" />
          <img
            src={eventsStep.image}
            alt={eventsStep.imageAlt}
            loading="lazy"
            decoding="async"
            className="relative z-10 h-[30rem] w-full object-contain object-top drop-shadow-2xl lg:h-[36rem]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TheLoCommunityEventsSection;
