import { motion } from "framer-motion";
import { Briefcase, Globe2, HeartPulse, Music2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const steps = [
  {
    icon: Music2,
    titleKey: "journey.step.opera.title",
    titleDefault: "Opera Singer on Global Stages",
    descKey: "journey.step.opera.desc",
    descDefault:
      "Touring and performing worldwide, learning how connection is built through shared moments and rhythm.",
  },
  {
    icon: Briefcase,
    titleKey: "journey.step.harvard.title",
    titleDefault: "Software Engineer at Harvard",
    descKey: "journey.step.harvard.desc",
    descDefault:
      "Built technology for mental health research, translating human insights into real-world systems.",
  },
  {
    icon: HeartPulse,
    titleKey: "journey.step.study.title",
    titleDefault: "Turning Point: Suicide Study on Teens",
    descKey: "journey.step.study.desc",
    descDefault:
      "Reading the firsthand stories made it undeniable: loneliness is the defining mental health crisis of our time.",
  },
  {
    icon: Globe2,
    titleKey: "journey.step.countries.title",
    titleDefault: "Making Friends Across 5+ Countries",
    descKey: "journey.step.countries.desc",
    descDefault:
      "After rebuilding community again and again, the Friendship Formula emerged: shared interests, repeated IRL time, a gentle nudge.",
  },
];

const JourneyTimeline = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("journey.title", "The Journey of Pulse")}
          </h2>
          <p className="text-lg text-gray-300 mt-3">
            {t(
              "journey.subtitle",
              "From opera stages to Harvard research to building a platform that turns strangers into friends."
            )}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pulse-purple via-pulse-blue to-pulse-pink opacity-40" />
          <div className="grid md:grid-cols-2 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={step.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative ${isLeft ? "md:pr-10" : "md:pl-10"}`}
                >
                  <div
                    className={`absolute top-4 ${
                      isLeft ? "right-[-10px]" : "left-[-10px]"
                    } w-5 h-5 rounded-full bg-gray-900 border-2 border-pulse-pink shadow-[0_0_12px_rgba(255,38,136,0.5)]`}
                  />
                  <div className="rounded-2xl border border-gray-700 bg-gray-900/50 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5 text-pulse-blue" />
                      <h3 className="text-xl font-semibold">
                        {t(step.titleKey, step.titleDefault)}
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      {t(step.descKey, step.descDefault)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;


