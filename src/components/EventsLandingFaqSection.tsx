import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTranslation } from "@/hooks/useTranslation";

export default function EventsLandingFaqSection() {
  const { t } = useTranslation();

  const faqs: Array<{ q: string; a: string }> = [
    { q: t("eventsLanding.faq.q1", "What are Pulse Events?"), a: t("eventsLanding.faq.a1", "Pulse Events are real events (concerts, trivia, classes, nights out) with a social layer on top.\n\nWhen you sign up, we connect you with other attendees who also want to meet new people, then add you to a private in‑app group chat — so you can break the ice before you arrive and show up with familiar faces.") },
    { q: t("eventsLanding.faq.q2", "Is this a dating thing?"), a: t("eventsLanding.faq.a2", "No — Pulse is built for friendship.\n\nPulse Events are designed to help you meet new people and build a real social circle through shared experiences.") },
    { q: t("eventsLanding.faq.q3", "How does the group chat work?"), a: t("eventsLanding.faq.a3", "After you book/RSVP, your Pulse group chat opens automatically inside the Pulse app.\n\nEveryone going can say hi, get to know each other a little, coordinate arrival timing, and decide whether you want a quick meetup (like a drink or dinner) before or after the event.") },
    { q: t("eventsLanding.faq.q4", "Who will be in my group?"), a: t("eventsLanding.faq.a4", "Your group is made up of other attendees who opted into Pulse for the same event and are there to meet new friends.\n\nGroups are kept small enough to feel natural — typically a handful of people — so it's easy to recognize each other and actually connect.") },
    { q: t("eventsLanding.faq.q5", "Do I have to be super social in the chat?"), a: t("eventsLanding.faq.a5", "No. Even a short hello makes a big difference.\n\nThe chat is there to reduce the awkwardness of showing up alone. Participate as much as you like — the goal is comfort, not performance.") },
    { q: t("eventsLanding.faq.q6", "Do people come solo?"), a: t("eventsLanding.faq.a6", "Yes — most Pulse members join solo.\n\nPulse Events are made for people who want to meet others in their city without needing to bring friends to begin with.") },
    { q: t("eventsLanding.faq.q7", "Who runs the event itself?"), a: t("eventsLanding.faq.a7", "The event is run by the original organizer/venue.\n\nPulse isn't replacing the event — we add the attendee group chat and structured meetup experience around it so it's easy to meet people before, during, and after.") },
    { q: t("eventsLanding.faq.q8", "Is Pulse safe?"), a: t("eventsLanding.faq.a8", "We take safety seriously.\n\nYour Pulse group is private to people attending the same event, and we provide clear community standards plus in‑app reporting. If anything feels off, you can contact support inside the app and our team will respond.") },
    { q: t("eventsLanding.faq.q9", "What happens after the event?"), a: t("eventsLanding.faq.a9", "Your group chat stays open.\n\nMany groups continue the conversation, plan a follow‑up coffee, or go to another event together. The goal is turning one night into an ongoing social circle.") },
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
    <section id="events-faq" className="relative py-16 md:py-20 border-t border-white/10">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{t("eventsLanding.faq.title", "FAQ")}</h2>
            <p className="text-white/75 text-lg">{t("eventsLanding.faq.subtitle", "Quick answers about Pulse Events, group chat, and tickets.")}</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-4 md:p-8">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">{t("eventsLanding.faq.helpful_answers", "Helpful answers")}</span>
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

