import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTranslation } from "@/hooks/useTranslation";

type Props = { cityLabel: string };

export default function EventsCityFaqSection({ cityLabel }: Props) {
  const { t } = useTranslation();

  const withCity = (s: string) => s.replace(/\{city\}/g, cityLabel);

  const faqs: Array<{ q: string; a: string }> = [
    { q: withCity(t("events_city.faq.q1", "What are Pulse Events in {city}?")), a: withCity(t("events_city.faq.a1", "")) },
    { q: withCity(t("events_city.faq.q2", "Do people go to Pulse events in {city} solo?")), a: withCity(t("events_city.faq.a2", "")) },
    { q: withCity(t("events_city.faq.q3", "How does the group chat work for {city} events?")), a: withCity(t("events_city.faq.a3", "")) },
    { q: withCity(t("events_city.faq.q4", "Is Pulse in {city} a dating thing?")), a: withCity(t("events_city.faq.a4", "")) },
    { q: withCity(t("events_city.faq.q5", "Who runs the actual event in {city}?")), a: withCity(t("events_city.faq.a5", "")) },
    { q: withCity(t("events_city.faq.q6", "Is Pulse safe for events in {city}?")), a: withCity(t("events_city.faq.a6", "")) },
    { q: withCity(t("events_city.faq.q7", "What happens after an event in {city}?")), a: withCity(t("events_city.faq.a7", "")) },
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="events-city-faq" className="relative py-16 md:py-20 border-t border-white/10 bg-gradient-to-b from-black to-gray-900">
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {withCity(t("events_city.faq.title", "FAQ"))}
            </h2>
            <p className="text-white/75 text-lg">{withCity(t("events_city.faq.subtitle", ""))}</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-4 md:p-8">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">
                {t("eventsLanding.faq.helpful_answers", "Helpful answers")}
              </span>
            </div>

            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <Collapsible
                  key={idx}
                  className="group w-full rounded-2xl border border-white/10 bg-gray-900/25 backdrop-blur-md overflow-hidden transition-all hover:border-white/20 hover:bg-gray-900/35 data-[state=open]:border-[#38D1BF]/30 data-[state=open]:bg-gray-900/45 data-[state=open]:shadow-[0_0_0_1px_rgba(56,209,191,0.12)]"
                >
                  <CollapsibleTrigger className="relative flex items-center w-full gap-4 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38D1BF]/35 hover:bg-white/5 [&[data-state=open]>svg]:rotate-180 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-pulse-pink before:via-accent before:to-pulse-blue before:opacity-0 before:transition-opacity group-data-[state=open]:before:opacity-100">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/10">
                      {idx + 1}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white leading-snug pr-4 tracking-tight">
                      {item.q}
                    </h3>
                    <ChevronDown className="ml-auto h-5 w-5 text-[#38D1BF] transition-transform duration-200 group-hover:text-white" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 pb-5 pt-4 border-t border-white/10">
                      <div className="space-y-3">
                        {item.a.split(/\n\s*\n/).map((p, i) => (
                          <p key={i} className="text-gray-300 leading-relaxed text-[15px]">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
