import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTranslation } from "@/hooks/useTranslation";

type EventFaqSectionProps = {
  eventTitle: string;
  city: string;
  country?: string;
  venue: string;
  organiser: string;
  provider: string;
  dateTimeLabel: string;
  duration: string;
};

function replacePlaceholders(
  text: string | undefined,
  params: { eventTitle: string; city: string; venue: string; provider: string; dateTimeLabel: string }
): string {
  const str = text ?? "";
  return str
    .replace(/{eventTitle}/g, params.eventTitle)
    .replace(/{city}/g, params.city)
    .replace(/{venue}/g, params.venue)
    .replace(/{provider}/g, params.provider)
    .replace(/{dateTimeLabel}/g, params.dateTimeLabel);
}

export default function EventFaqSection({
  eventTitle,
  city,
  country,
  venue,
  organiser,
  provider,
  dateTimeLabel,
  duration,
}: EventFaqSectionProps) {
  const { t } = useTranslation();
  const params = { eventTitle, city, venue, provider, dateTimeLabel };

  const faqs: Array<{ qKey: string; aKey: string }> = [
    { qKey: "event_detail.faq.q1", aKey: "event_detail.faq.a1" },
    { qKey: "event_detail.faq.q2", aKey: "event_detail.faq.a2" },
    { qKey: "event_detail.faq.q3", aKey: "event_detail.faq.a3" },
    { qKey: "event_detail.faq.q4", aKey: "event_detail.faq.a4" },
    { qKey: "event_detail.faq.q5", aKey: "event_detail.faq.a5" },
    { qKey: "event_detail.faq.q6", aKey: "event_detail.faq.a6" },
    { qKey: "event_detail.faq.q7", aKey: "event_detail.faq.a7" },
    { qKey: "event_detail.faq.q8", aKey: "event_detail.faq.a8" },
    { qKey: "event_detail.faq.q9", aKey: "event_detail.faq.a9" },
    { qKey: "event_detail.faq.q10", aKey: "event_detail.faq.a10" },
  ];

  const faqsWithText = faqs.map((f) => ({
    q: replacePlaceholders(t(f.qKey, ""), params),
    a: replacePlaceholders(t(f.aKey, ""), params),
  }));

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsWithText.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section id="faq" className="relative py-16 md:py-20 border-t border-white/10">
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {t("event_detail.faq.title", "FAQ")}
            </h2>
            <p className="text-white/75 text-lg">
              {t("event_detail.faq.subtitle", "Everything you need to know about Pulse at this event.")}
            </p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-4 md:p-8">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">
                {t("event_detail.faq.helpful_answers", "Helpful answers")}
              </span>
            </div>
            <div className="space-y-3">
              {faqsWithText.map((item, idx) => (
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
                        {(item.a ?? "").split(/\n\s*\n/).map((p, i) => (
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
