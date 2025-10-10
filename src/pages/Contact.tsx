import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Sparkles, HeartHandshake, CalendarCheck, Bug } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FAQItem from "@/components/FAQItem";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import MissionCountdown from "@/components/MissionCountdown";

const Contact = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Contact Us | Get in Touch | Pulse",
      es: "Contáctanos | Ponte en Contacto | Pulse"
    },
    description: {
      en: "Have questions about Pulse? Get in touch with our team. We're here to help you connect with new friends in your city.",
      es: "¿Tienes preguntas sobre Pulse? Ponte en contacto con nuestro equipo. Estamos aquí para ayudarte a conectar con nuevos amigos en tu ciudad."
    },
    keywords: ["contact", "support", "help", "questions", "pulse app", "customer service"],
    type: "website"
  };
  
  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-pulse-purple blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-pulse-blue blur-3xl"></div>
          <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pulse-pink blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 mb-5">
              <Sparkles className="h-4 w-4 text-pulse-pink" />
              <span className="text-sm">{t("contact.hero.badge", "We're real humans — say hi!")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("contact.hero.title", "Get in Touch")}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              {t("contact.hero.description", "We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="mailto:contact@pulsenow.app" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white/90 transition-colors">
                {t("contact.hero.quick_email", "Email us: contact@pulsenow.app")}
              </a>
              <a href="https://instagram.com/pulse_app_" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-gradient-to-r from-pulse-pink via-pulse-purple to-pulse-blue text-white hover:opacity-95 transition-opacity">
                {t("contact.hero.quick_ig", "DM us on Instagram")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="relative bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-3xl overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pulse-purple blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pulse-blue blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Contact info gradient panel */}
              <div className="p-8 md:p-10 bg-gradient-to-br from-pulse-purple/30 via-pulse-blue/20 to-transparent border-r border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("contact.info.title", "Contact Information")}</h2>
                <p className="text-white/70 mb-8 max-w-sm">{t("contact.info.subtitle", "We’ll get back within 1-2 business days. For press or partnerships, mention it in your message.")}</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pulse-pink/20 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-pulse-pink" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{t("contact.info.email.title", "Email Us")}</h3>
                      <a href="mailto:contact@pulsenow.app" className="text-gray-300 hover:text-pulse-pink transition-colors">contact@pulsenow.app</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-pulse-pink/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-pulse-pink" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{t("contact.info.visit.title", "Visit Us")}</h3>
                      <address className="text-gray-300 not-italic">The Roux Institute<br/>100 Fore St<br/>Portland, ME 04101</address>
                    </div>
                  </div>
                </div>

                {/* Reasons to reach out */}
                <div className="mt-10 grid grid-cols-1 gap-3">
                  {[{
                    icon: <HeartHandshake className="h-5 w-5 text-pulse-pink" />, title: t("contact.reasons.partnerships.title", "Partnerships & Press"), desc: t("contact.reasons.partnerships.desc", "Collaborations and media")
                  }, {
                    icon: <Bug className="h-5 w-5 text-pulse-pink" />, title: t("contact.reasons.issues.title", "Issues & Feedback"), desc: t("contact.reasons.issues.desc", "Spotted a bug or idea")
                  }, {
                    icon: <CalendarCheck className="h-5 w-5 text-pulse-pink" />, title: t("contact.reasons.events.title", "Host or Join Events"), desc: t("contact.reasons.events.desc", "Run an activity or join")
                  }].map((card, i) => (
                    <div key={(card.title as string) + i} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3 flex items-start gap-3">
                      <div className="bg-pulse-pink/15 p-2 rounded-lg">{card.icon}</div>
                      <div>
                        <div className="font-semibold leading-tight">{card.title}</div>
                        <div className="text-xs text-white/70">{card.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("contact.form.title", "Send a Message")}</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("contact.faq.title", "Frequently Asked Questions")}</h2>
            <p className="text-xl text-gray-300">
              {t("contact.faq.description", "Find answers to the most common questions about Pulse.")}
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {[{
                  question: t("contact.faq.question1", "What exactly is Pulse?"),
                  answer: (
                    <>{t("contact.faq.answer1", "Pulse is a new friendgroup-making tool. You complete a short questionnaire, and the system places you in a private group chat with six to twelve people who share similar interests. Automated assistants start the conversation and suggest simple meet‑ups, helping the group move from chat to an in-person hangout without the usual planning hassle.")}</>
                  ),
                },
                {
                  question: t("contact.faq.question2", "How does the friend matching work?"),
                  answer: (
                    <>{t("contact.faq.answer2", "Our matching algorithm considers your interests, values, and personality to connect you with like-minded individuals in your city. We focus on creating small groups of 8-12 people who are likely to form genuine connections.")}</>
                  ),
                },
                {
                  question: t("contact.faq.question3", "Is Pulse available in my city?"),
                  answer: (
                    <>{t("contact.faq.answer3", "Pulse is currently available in select cities across the US and Europe, with new locations being added regularly. Check our Cities page to see if we're in your area yet, or to request that we expand to your city.")}</>
                  ),
                },
                {
                  question: t("contact.faq.question4", "How much does Pulse cost?"),
                  answer: (
                    <>{t("contact.faq.answer4", "Pulse is currently free to use. Stay tuned—our premium membership is coming soon, with access to events, priority matching, and exclusive experiences.")}</>
                  ),
                },
                {
                  question: t("contact.faq.question5", "How do meet‑ups actually happen?"),
                  answer: (
                    <>{t("contact.faq.answer5", "Once your group chat is underway and the gamemasters have warmed things up, an assistant suggests hangouts based on shared interests and everyone's availability. Anyone in the group can accept a suggestion or propose something new.")}</>
                  ),
                },
              ].map((faq, idx) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * (idx + 1) }}
                >
                  <FAQItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA: 10 Day Mission with Countdown */}
      <MissionCountdown />

              <Footer />
      </div>
    </>
  );
};

export default Contact;
