import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type EventFaqSectionProps = {
  eventTitle: string;
  city: string;
  country?: string;
  venue: string;
  organiser: string;
  provider: string;
  price: string;
  dateTimeLabel: string;
  duration: string;
};

export default function EventFaqSection({
  eventTitle,
  city,
  country,
  venue,
  organiser,
  provider,
  price,
  dateTimeLabel,
  duration,
}: EventFaqSectionProps) {
  const cityLabel = [city, country].filter(Boolean).join(", ");

  const faqs: Array<{ q: string; a: string }> = [
    {
      q: `What is Pulse at "${eventTitle}" in ${city}?`,
      a:
        `Pulse matches you into a small group of people who are also attending ${eventTitle} in ${city} on ${dateTimeLabel} and want to make new friends.\n\n` +
        `Before you arrive at ${venue}, you'll get access to a private group chat in the Pulse app with your group. Pip, your group host, helps break the ice and coordinate a simple pre- and/or post-event meet.\n\n` +
        `You don't just show up to ${eventTitle}. You arrive with people.`,
    },
    {
      q: `Is Pulse organizing ${eventTitle}?`,
      a:
        `No. ${eventTitle} at ${venue} in ${city} is organized by ${organiser}.\n\n` +
        `Your ticket is issued through ${provider}. Pulse adds the structured group experience around the event so you can actually meet people before, during, and after ${eventTitle}.`,
    },
    {
      q: `What happens after I buy my ticket for ${eventTitle}?`,
      a:
        `After completing your ${price} booking, you'll receive access to the Pulse app.\n\n` +
        `Log in using the same email from checkout and you'll see your private group for ${eventTitle} in ${city}. Pip will guide introductions and help you coordinate how and where you'll meet at ${venue}.\n\n` +
        `The goal is simple: no one walks in cold.`,
    },
    {
      q: `Do I have to chat before ${eventTitle}?`,
      a:
        `No. But even a short introduction before ${eventTitle} at ${venue} makes a big difference.\n\n` +
        `Something simple helps you recognize names and faces when you arrive. The experience works best when everyone shares a little, but there's no pressure to perform.`,
    },
    {
      q: `Is this a dating event?`,
      a:
        `No. Pulse is built for friendship.\n\n` +
        `While you're meeting new people at ${eventTitle} at ${venue}, the focus is building real social circles in ${city}, not romantic matching.`,
    },
    {
      q: `What if I'm nervous about going to ${eventTitle}?`,
      a:
        `That's completely normal. Most Pulse members joining ${eventTitle} in ${city} are coming solo. Many are new to the city, recently moved, working remotely, or simply expanding their circle.\n\n` +
        `Pip guides light introductions beforehand so when you meet at ${venue}, you already recognize a few people. You won't be walking in cold.`,
    },
    {
      q: `What if my group doesn't vibe?`,
      a:
        `The event at ${venue} is still the anchor, and you're free to connect naturally with others during ${eventTitle}.\n\n` +
        `If there's a serious issue, you can contact support inside the app and our team will step in. Friendship takes time, and many members attend multiple events as they grow their circle.`,
    },
    {
      q: `Is Pulse safe?`,
      a:
        `Your Pulse group is private to verified attendees of ${eventTitle} in ${city}.\n\n` +
        `We moderate activity, provide in-app reporting, and set clear community standards around respectful behavior. If something feels off before or during the event at ${venue}, you can reach out directly and we will respond.`,
    },
    {
      q: `Can I bring a friend to ${eventTitle}?`,
      a:
        `Yes. If you and a friend both purchased tickets for ${eventTitle} at ${venue} on ${dateTimeLabel}, you can request to be placed in the same group.\n\n` +
        `Pulse works whether you're coming solo or with one friend.`,
    },
    {
      q: `What happens after ${eventTitle} ends?`,
      a:
        `After the ${duration} experience at ${venue}, your Pulse group stays open.\n\n` +
        `Many groups from ${eventTitle} in ${city} plan follow-up dinners, coffee, or future events together. Pip will gently nudge the group to keep momentum going.`,
    },
    {
      q: `What if there aren't enough people for a group?`,
      a:
        `If we're unable to form a Pulse group for ${eventTitle} on ${dateTimeLabel}, we'll notify you in advance.\n\n` +
        `In that case, the Pulse portion of your purchase will be refunded. Your event ticket remains valid under ${provider}'s policy.`,
    },
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">FAQ</h2>
            <p className="text-white/75 text-lg">
              Everything you need to know about Pulse at this event.
            </p>
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
