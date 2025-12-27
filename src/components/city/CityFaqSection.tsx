import { motion } from "framer-motion";
import FAQItem from "@/components/FAQItem";
import { buildCityFaqs } from "@/lib/cityFaq";
import { useTranslation } from "@/hooks/useTranslation";

type CityFaqSectionProps = {
  city: string;
  identity?: string | null;
  affinity?: string | null;
};

export default function CityFaqSection({ city, identity, affinity }: CityFaqSectionProps) {
  const { currentLanguage } = useTranslation();
  const faqs = buildCityFaqs({
    city,
    identity,
    affinity,
    language: currentLanguage === "es" ? "es" : "en"
  });

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
      }
    }))
  };

  return (
    <section className="relative py-20 bg-gray-900 dark:bg-gray-950 border-t border-white/10">
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              <span className="pulse-gradient-text">FAQ</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl">
              {currentLanguage === "es"
                ? `Respuestas a preguntas comunes sobre cómo conocer amigues en ${city} con Pulse.`
                : `Answers to common questions about meeting friends in ${city} with Pulse.`}
            </p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * idx }}
              >
                <FAQItem question={faq.question} answer={<p>{faq.answer}</p>} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


