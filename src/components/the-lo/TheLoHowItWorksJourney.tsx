import { ArrowRight } from "lucide-react";

export const memberActivationSteps = [
  {
    title: "Group Matches",
    description:
      "Get matched with LO members who share your interests, life stage, and appetite for real plans.",
    image:
      "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/sign/app/Copy%20of%20Untitled.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWJkOTkyMi00ODg1LTQ1NTEtYWVjNi0wMDIzOTZiMDE3NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcHAvQ29weSBvZiBVbnRpdGxlZC5wbmciLCJpYXQiOjE3Nzg4NjgwNTYsImV4cCI6MjEyNDQ2ODA1Nn0._6ZLLOGotrZmnGVqHt49vUOW5fpqN8UPXFDr_QCC8EI",
    imageAlt: "Pulse group profile showing shared interests for The LO members",
    accent: "text-[#38D1BF]",
    glow: "from-[#38D1BF]/30",
    outcome: "Match with members",
  },
  {
    title: "Pulses",
    description: "Spontaneous social planning for your community.",
    image:
      "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/sign/app/Untitled%20design%20(17).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWJkOTkyMi00ODg1LTQ1NTEtYWVjNi0wMDIzOTZiMDE3NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcHAvVW50aXRsZWQgZGVzaWduICgxNykucG5nIiwiaWF0IjoxNzc4ODY4MDIxLCJleHAiOjE0MzkzMjY4MDIxfQ.h7bAdcANwsml3DZGcMErNqQP6lwpV3jEj6qURsx-XIg",
    imageAlt: "Pulse screen showing community plans and member availability",
    accent: "text-[#F3E538]",
    glow: "from-[#FF2688]/30",
    outcome: "Create momentum",
  },
  {
    title: "Events",
    description: "RSVP and get your tickets to community events directly from the app.",
    image:
      "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/sign/app/Copy%20of%20Copy%20of%20Copy%20of%20Untitled.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWJkOTkyMi00ODg1LTQ1NTEtYWVjNi0wMDIzOTZiMDE3NDciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhcHAvQ29weSBvZiBDb3B5IG9mIENvcHkgb2YgVW50aXRsZWQucG5nIiwiaWF0IjoxNzc4ODY4MDkyLCJleHAiOjE4MTM0MjgwOTJ9.E_AX2lSLBGYpqsZvdCWu5Rhy44eoo6UvOGnGpdx2NPM",
    imageAlt: "Pulse community screen for LO members coordinating when to meet",
    accent: "text-[#FF2688]",
    glow: "from-[#741ADD]/35",
    outcome: "Keep engaging",
  },
];

const TheLoHowItWorksJourney = () => {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto mt-12 overflow-hidden text-left"
    >
      <div className="pointer-events-none absolute left-0 top-8 h-72 w-72 rounded-full bg-[#FF2688]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#38D1BF]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-[#741ADD]/10 blur-3xl" />

      <div className="relative mb-7 flex flex-col gap-3 text-center md:mb-9">
        <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">How it works</h2>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
          Get matched with fellow community members into small groups. An AI host breaks the ice
          through icebreakers and guided planning.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {memberActivationSteps.map((step, index) => (
          <article
            key={step.title}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <div
              className={`pointer-events-none absolute inset-x-4 top-6 h-72 rounded-full bg-gradient-to-br ${step.glow} via-white/[0.03] to-[#38D1BF]/10 blur-3xl transition duration-300 group-hover:opacity-90`}
            />
            <div className="relative flex min-h-full flex-col">
              <div className="relative mb-5 flex h-72 items-start justify-center overflow-visible sm:h-80 lg:h-72">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain object-top drop-shadow-2xl transition duration-500 group-hover:scale-[1.025]"
                />
              </div>

              <div className="flex flex-1 flex-col px-1">
                <h3 className={`text-xl font-bold leading-tight md:text-2xl ${step.accent}`}>
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/68">{step.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-4">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-white">
                  {step.outcome}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-white/80">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TheLoHowItWorksJourney;
