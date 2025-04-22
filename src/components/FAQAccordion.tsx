
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Help, BookOpen, List } from "lucide-react";

type FAQ = {
  question: string;
  answer: React.ReactNode;
  icon: React.ReactNode;
};

const faqs: FAQ[] = [
  {
    question: "How does the friend matching work?",
    answer: (
      <>
        Our matching algorithm considers your interests, values, and personality to connect you with like-minded individuals in your city. We focus on creating small groups of 8-12 people who are likely to form genuine connections.
      </>
    ),
    icon: <List className="h-5 w-5 text-accent" aria-hidden="true" />,
  },
  {
    question: "Is Pulse available in my city?",
    answer: (
      <>
        Pulse is currently available in select major cities across the US, with new locations being added regularly. Check our Cities page to see if we're in your area yet, or to request that we expand to your city.
      </>
    ),
    icon: <Help className="h-5 w-5 text-accent" aria-hidden="true" />,
  },
  {
    question: "How much does Pulse cost?",
    answer: (
      <>
        Pulse offers a free tier that allows you to join a limited number of community events. Our premium membership provides unlimited access to events, priority matching, and exclusive experiences for $19.99/month.
      </>
    ),
    icon: <BookOpen className="h-5 w-5 text-accent" aria-hidden="true" />,
  },
  {
    question: "How can I become a community host?",
    answer: (
      <>
        We're always looking for enthusiastic individuals to host Pulse gatherings. Contact us through this page expressing your interest, and our community team will get back to you with details about our host application process.
      </>
    ),
    icon: <List className="h-5 w-5 text-accent" aria-hidden="true" />,
  },
];

const FAQAccordion: React.FC = () => (
  <Accordion type="single" collapsible className="w-full">
    {faqs.map((faq, idx) => (
      <AccordionItem
        key={faq.question}
        value={`faq-${idx}`}
        className="bg-gray-800/50 rounded-xl border border-gray-700/50 mb-4"
      >
        <AccordionTrigger className="text-xl font-medium flex items-center gap-2 px-4">
          {faq.icon}{faq.question}
        </AccordionTrigger>
        <AccordionContent className="px-4 text-gray-300">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQAccordion;
