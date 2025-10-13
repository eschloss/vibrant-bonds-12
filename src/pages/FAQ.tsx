import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, ChevronDown, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  const seoProps = {
    title: {
      en: t("faq.title", "FAQ | Pulse: Answers to Your Questions"),
      es: t("faq.title", "FAQ | Pulse: Respuestas a Tus Preguntas"),
    },
    description: {
      en: t(
        "faq.description",
        "Everything you want to know about the Pulse app: how it works, who it's for, pricing, meetups, AI, safety, and how to meet new friends in your city."
      ),
      es: t(
        "faq.description",
        "Todo lo que quieres saber sobre la app de Pulse: cómo funciona, para quién es, precios, quedadas, IA, seguridad y cómo hacer nuevos amigos en tu ciudad."
      ),
    },
    keywords: [
      "Pulse FAQ",
      "friend-finding app",
      "make friends",
      "group matching",
      "meetups",
      "AI host",
      "Pip",
    ],
    type: "website",
    section: "FAQ",
  };

  const faqs = [
    {
      q: "What is the Pulse app and how does it work?",
      answerText:
        "Pulse is a mobile platform that matches you with like-minded people in your city who want to make new friends. Groups are guided by Pip, our AI host, who breaks the ice, keeps conversations flowing, and plans real-life meetups based on shared interests, availability, and budget.",
      a: (
        <p>
          The Pulse app is a mobile platform that matches you with like-minded people in your city who want to make new friends. Groups are guided by Pip, our friendly AI host, who breaks the ice, keeps conversations flowing, and plans real-life meetups based on your shared interests, availability, and budget.
        </p>
      ),
    },
    {
      q: "Who should use the Pulse app to make new friends?",
      answerText:
        "Anyone who wants to meet new people and build real-life connections. Join city-wide matches or themed friend groups around your passions — from gaming and bowling to book clubs and more.",
      a: (
        <p>
          The Pulse app is for anyone looking to meet new people and build real-life connections. You can join city-wide matches or themed friend groups built around your passions — from gaming and bowling to book clubs and more.
        </p>
      ),
    },
    {
      q: "Is the Pulse app LGBTQ+ friendly and inclusive?",
      answerText:
        "Yes. Pulse was founded by a queer founder and started with LGBTQ+ exclusive matches. Today every city offers queer-only matches alongside inclusive city-wide options, with a safe, welcoming space for friendship and acceptance.",
      a: (
        <p>
          Yes. Pulse was founded by a queer founder, and our first matches were LGBTQ+ exclusive. Today, every city offers queer-only matches alongside inclusive city-wide options. The Pulse app is committed to creating a safe, welcoming space for friendship, openness, and acceptance.
        </p>
      ),
    },
    {
      q: "What types of meetups and events does the Pulse app organize?",
      answerText:
        "Free activities like park meetups, hikes, and city walks; premium experiences like wine tastings, salsa classes, sailing, cooking classes, and hot air balloons; plus exclusive partner events at vetted local venues.",
      a: (
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-white">Free activities</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Park meetups</li>
              <li>Hikes</li>
              <li>City walks</li>
              <li>And more</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Premium experiences</p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Wine tastings</li>
              <li>Salsa classes</li>
              <li>Sailing</li>
              <li>Cooking classes</li>
              <li>Hot air balloon rides</li>
              <li>And more</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Exclusive partner events</p>
            <p className="text-gray-300">Hosted at local venues designed for friendship-building</p>
          </div>
        </div>
      ),
    },
    {
      q: "How much does the Pulse app cost?",
      answerText:
        "Using Pulse is free. You only pay for the experiences you choose. Prices range from free to $500 per person. Set your spending tier during onboarding to match with people who share your budget.",
      a: (
        <p>
          Using the Pulse app is free. You only pay for the experiences you choose. Prices range from free to $500 per person. During onboarding, you set your spending tier so your group is matched with people who share your budget.
        </p>
      ),
    },
    {
      q: "How does the Pulse app match people into friend groups?",
      answerText:
        "Our personality test and proprietary matching algorithm consider values, age, spending habits, preferred activities, and availability to match you with people you’ll get along with and can easily make plans with.",
      a: (
        <p>
          Our personality test and proprietary matching algorithm consider factors like values, age, spending habits, preferred activities, and availability. This ensures you’re matched with people it’s easy to get along with — and even easier to make plans you all enjoy.
        </p>
      ),
    },
    {
      q: "Step-by-step: How does the Pulse app work?",
      answerText:
        "Take the personality test to join the waitlist. When enough compatible people sign up in your city, you’re invited to a group. Answer a starter prompt to unlock chat. You have 10 days to meet. If 60%+ RSVP, the mission continues weekly.",
      a: (
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Take our personality test to join the waitlist.</li>
          <li>When enough compatible people sign up in your city, you’ll be invited to join a group.</li>
          <li>Answer a fun starter prompt to unlock your group chat.</li>
          <li>You have 10 days to meet in person.</li>
          <li>If at least 60% RSVP to a plan, the mission continues for another week — and keeps going as long as you keep meeting.</li>
        </ol>
      ),
    },
    {
      q: "Is the Pulse app available in my city?",
      answerText:
        "Pulse is live in many major cities and expanding quickly. We need at least 100 sign-ups to start matching locally. Join the Ambassador Program to help launch in your area.",
      a: (
        <p>
          Pulse is live in many major cities and expanding quickly. We need at least 100 sign-ups in your city to start matching locally. You can join our Ambassador Program to help launch the Pulse app in your area.
        </p>
      ),
    },
    {
      q: "Does the Pulse app have an affiliate program?",
      answerText:
        "Yes. Our Ambassador Program offers 5% commission on bookings from both users and partners you refer.",
      a: (
        <p>
          Yes. Our Ambassador Program offers 5% commission on bookings from both users and partners you refer.
        </p>
      ),
    },
    {
      q: "Can local businesses partner with the Pulse app?",
      answerText:
        "Yes. We partner with aligned venues to host meetups and can create exclusive group matches around themes like ‘Meet Bowling Buddies in Boston.’",
      a: (
        <p>
          Yes. We work with venues that align with our values to host meetups, and we can create exclusive group matches around a relevant theme (e.g., “Meet Bowling Buddies in Boston”).
        </p>
      ),
    },
    {
      q: "Does the Pulse app use AI?",
      answerText:
        "Yes. Pip, our AI host, uses advanced conversation analysis and interest matching to spark engagement and suggest tailored meetups.",
      a: (
        <p>
          Yes. Pip, our AI host, uses advanced conversation analysis and interest matching to spark engagement and suggest meetups tailored to your group.
        </p>
      ),
    },
    {
      q: "Can I use the Pulse app without AI?",
      answerText:
        "Yes. If you decline AI consent at sign-up, Pip won’t interact with you or use your data, but you’ll still see all group messages.",
      a: (
        <p>
          Yes. If you decline AI consent at sign-up, Pip won’t interact with you or use your data, but you’ll still see all group messages.
        </p>
      ),
    },
    {
      q: "Can seniors use the Pulse app to make friends?",
      answerText:
        "Yes. While most users are currently 20–40, the app welcomes all ages and is expanding senior-focused friend matches.",
      a: (
        <p>
          Yes. While most Pulse users are currently aged 20–40, the app welcomes people of all ages and is expanding senior-focused friend matches.
        </p>
      ),
    },
    {
      q: "How does the Pulse app support people with social anxiety, neurodiversity, or mental health challenges?",
      answerText:
        "Pulse reduces social pressure and helps you connect comfortably. You can choose to match only with neurodiverse users if you prefer, depending on city sign-ups.",
      a: (
        <p>
          The Pulse app is designed to reduce social pressure and help you connect comfortably. You can choose to match only with neurodiverse users if you prefer, although availability may vary depending on sign-ups in your city.
        </p>
      ),
    },
    {
      q: "Is the Pulse app safe and how does it protect users?",
      answerText:
        "Yes. We encourage meeting in public spaces, partner with vetted venues, and monitor group activity. You can report behavior in-app, and repeat offenders are removed.",
      a: (
        <p>
          Yes. The Pulse app is designed for safe, positive social experiences. We encourage meeting in public spaces, partner with vetted venues, and monitor group activity. You can report inappropriate behavior in-app, and repeat offenders are removed from the platform.
        </p>
      ),
    },
    {
      q: "Can travelers use the Pulse app to meet people in a new city?",
      answerText:
        "Yes. You can join matches in any active city — perfect for meeting locals or fellow visitors.",
      a: (
        <p>
          Yes. You can join matches in any city where the Pulse app is active — perfect for travelers looking to meet locals or fellow visitors.
        </p>
      ),
    },
    {
      q: "Do I have to attend every Pulse app meetup?",
      answerText:
        "No. You can skip events, but joining regularly helps keep your group active and your mission alive.",
      a: (
        <p>
          No. You can skip events, but joining regularly helps keep your group active and your mission alive.
        </p>
      ),
    },
    {
      q: "Can I invite friends to join my Pulse app match?",
      answerText:
        "Yes. If friends sign up and match your group’s interests and spending tier, they can join your match.",
      a: (
        <p>
          Yes. If your friends sign up for the Pulse app and meet your group’s interests and spending tier, they can join your match.
        </p>
      ),
    },
    {
      q: "What happens when a Pulse app mission ends?",
      answerText:
        "If fewer than 60% RSVP to new plans, the mission ends and the chat closes. You can always join a new match to meet fresh faces.",
      a: (
        <p>
          If fewer than 60% RSVP to new plans, the mission ends and the group chat closes. You can always join a new match to meet fresh faces.
        </p>
      ),
    },
    {
      q: "Can I join multiple group matches on the Pulse app?",
      answerText:
        "Currently you can join one new group match per week to encourage commitment to meeting. We’ll expand this as we grow and learn from feedback.",
      a: (
        <p>
          Currently, you can join one new group match per week. This helps ensure people commit to meeting rather than joining multiple matches they don’t attend. We’ll expand this feature as we grow and collect user feedback.
        </p>
      ),
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
        text: f.answerText || "",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[60px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-4">
                <Users size={56} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {t("faq.hero.title.line1", "Frequently Asked")}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">{t("faq.hero.title.line2", "Questions")}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t("faq.hero.subtitle", "Clear answers about how Pulse works — from pricing and safety to AI and planning meetups — and how to meet new friends in your city.")}
            </p>
          </motion.div>
        </div>
      </section>
      <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>

      {/* FAQ List */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-4 md:p-8">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">{t("faq.list.badge", "Helpful answers")}</span>
            </div>
            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <Collapsible key={idx} className="w-full">
                  <CollapsibleTrigger
                    className="flex items-center w-full p-4 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-[#38D1BF]/40 transition-colors text-left [&[data-state=open]>svg]:rotate-180"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">{item.q}</h3>
                    <ChevronDown className="ml-auto h-5 w-5 text-[#38D1BF] transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pt-3 pb-4 text-gray-300 leading-relaxed bg-gray-800/40 rounded-b-lg">
                      {item.a}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq.cta.title", "Ready to make new friends?")}</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("faq.cta.subtitle", "Join Pulse to get matched with a friend group in your city. Pip will help you plan meetups you actually look forward to.")}
            </p>
            <a
              href="/cities"
              className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg"
            >
              {t("faq.cta.button", "Get Started with Pulse")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-24 -mt-12">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-6 md:p-8 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">{t("faq.contact.title", "Didn’t find your answer?")}</h3>
            <p className="text-gray-300 mb-6">{t("faq.contact.subtitle", "We're here to help. Reach out and we’ll get back to you quickly.")}</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#38D1BF] text-[#38D1BF] hover:bg-[#38D1BF]/10 transition-colors"
            >
              <Mail className="h-5 w-5" /> {t("faq.contact.button", "Contact Us")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

