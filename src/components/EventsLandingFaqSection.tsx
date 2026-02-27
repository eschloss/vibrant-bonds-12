import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function EventsLandingFaqSection() {
  const faqs: Array<{ q: string; a: string }> = [
    {
      q: "What are Pulse Events?",
      a:
        "Pulse Events are real events (concerts, trivia, classes, nights out) with a social layer on top.\n\n" +
        "When you sign up, we add you to a private in‑app group chat with other attendees who also want to meet new people — so you can break the ice before you arrive and show up with familiar faces.",
    },
    {
      q: "Is this a dating thing?",
      a:
        "No — Pulse is built for friendship.\n\n" +
        "Pulse Events are designed to help you meet new people and build a real social circle through shared experiences.",
    },
    {
      q: "How does the group chat work?",
      a:
        "After you book/RSVP, your Pulse group chat opens automatically inside the Pulse app.\n\n" +
        "We’ll kickstart the chat with light prompts so it’s easy to introduce yourself, coordinate arrival timing, and decide whether you want a quick meetup (like a drink or dinner) before or after the event.",
    },
    {
      q: "Who will be in my group?",
      a:
        "Your group is made up of other attendees who opted into Pulse for the same event and are there to meet new friends.\n\n" +
        "Groups are kept small enough to feel natural — typically a handful of people — so it’s easy to recognize each other and actually connect.",
    },
    {
      q: "Do I have to be super social in the chat?",
      a:
        "No. Even a short hello makes a big difference.\n\n" +
        "The chat is there to reduce the awkwardness of showing up alone. Participate as much as you like — the goal is comfort, not performance.",
    },
    {
      q: "Do people come solo?",
      a:
        "Yes — most Pulse members join solo.\n\n" +
        "Pulse Events are made for people who want to meet others in their city without needing to bring friends to begin with.",
    },
    {
      q: "Who runs the event itself?",
      a:
        "The event is run by the original organizer/venue.\n\n" +
        "Pulse isn’t replacing the event — we add the attendee group chat and structured meetup experience around it so it’s easy to meet people before, during, and after.",
    },
    {
      q: "Where do I buy tickets and how does payment work?",
      a:
        "Ticketing depends on the event provider (for example: Fever, Typeform, or a venue checkout).\n\n" +
        "Pulse will always make it clear where checkout happens. Once you’ve booked, you’ll get access to the Pulse group for that event in the app.",
    },
    {
      q: "Is Pulse safe?",
      a:
        "We take safety seriously.\n\n" +
        "Your Pulse group is private to people attending the same event, and we provide clear community standards plus in‑app reporting. If anything feels off, you can contact support inside the app and our team will respond.",
    },
    {
      q: "What happens after the event?",
      a:
        "Your group chat stays open.\n\n" +
        "Many groups continue the conversation, plan a follow‑up coffee, or go to another event together. The goal is turning one night into an ongoing social circle.",
    },
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">FAQ</h2>
            <p className="text-white/75 text-lg">Quick answers about Pulse Events, group chat, and tickets.</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-4 md:p-8">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">Helpful answers</span>
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

