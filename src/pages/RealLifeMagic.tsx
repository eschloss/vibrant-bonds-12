import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Zap,
  Users,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  MessageSquare,
  UtensilsCrossed,
  Mountain,
  Globe2,
  Link2,
  ExternalLink,
  CheckCircle,
  TestTube,
  CalendarCheck,
  Beaker,
  Gauge
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQItem from "@/components/FAQItem";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import ActivitiesTeaser from "@/components/ActivitiesTeaser";

// Local lightweight counter for fun interactive stats
const AnimatedCounter: React.FC<{ value: number; suffix?: string; durationMs?: number }> = ({ value, suffix = "", durationMs = 1800 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start: number | undefined;
    let raf = 0;
    const step = (t: number) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);
  return (
    <span ref={ref} className="font-bold">
      {count}
      {suffix}
    </span>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const RealLifeMagic: React.FC = () => {
  const { t } = useTranslation();
  // Simple interactive comparison: communication method effectiveness
  const methods = useMemo(
    () => [
      { key: "in_person", label: t("rlm.methods.in_person", "Face-to-Face"), score: 100, description: t("rlm.methods.in_person.desc", "Richest sensory data: tone, micro‑expressions, touch, pheromones, spatial dynamics.") },
      { key: "phone", label: t("rlm.methods.phone", "Phone Call"), score: 80, description: t("rlm.methods.phone.desc", "Vocal tone and synchrony; strong substitute when in-person isn't possible.") },
      { key: "video", label: t("rlm.methods.video", "Video Call"), score: 75, description: t("rlm.methods.video.desc", "Visual channel adds value, but lacks presence, smell, and shared environment.") },
      { key: "text", label: t("rlm.methods.text", "Text / DM"), score: 40, description: t("rlm.methods.text.desc", "Low bandwidth; easy to misread; maintains contact but rarely deepens bonds.") },
      { key: "social", label: t("rlm.methods.social", "Social Media"), score: 30, description: t("rlm.methods.social.desc", "Broadcast over bonding; lowest correlation with mental health benefits.") }
    ],
    [t]
  );
  const [selectedMethod, setSelectedMethod] = useState(methods[0].key);
  const currentMethod = methods.find(m => m.key === selectedMethod)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      {/* Structured data: Article */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Science Behind Real-Life Magic: Health, Happiness, Longevity',
        description: 'Face-to-face connection improves longevity, immunity, and mental health. Explore oxytocin, dopamine, mirror neurons, shared meals, and group adventures—plus evidence-based actions.',
        datePublished: '2025-09-22T00:00:00Z',
        dateModified: '2025-09-22T00:00:00Z',
        image: 'https://s.kikiapp.eu/img/loneliness-epidemic-2025-stats.jpg',
        author: { '@type': 'Organization', name: 'Pulse' },
        publisher: { '@type': 'Organization', name: 'Pulse', logo: { '@type': 'ImageObject', url: 'https://s.kikiapp.eu/img/pulse_logo.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://pulsenow.app/real-life-magic' }
      }) }} />

      <Seo
        title={{
          en: t("rlm.seo.title", "The Science Behind Real-Life Magic: Health, Happiness, Longevity"),
          es: t("rlm.seo.title", "La ciencia de la conexión real: salud, felicidad y longevidad")
        }}
        description={{
          en: t("rlm.seo.description", "Face-to-face connection improves longevity, immunity, and mental health. Explore oxytocin, dopamine, mirror neurons, shared meals, and group adventures—plus evidence-based actions."),
          es: t("rlm.seo.description", "La conexión cara a cara mejora longevidad, inmunidad y salud mental. Explora oxitocina, dopamina, neuronas espejo, comidas compartidas y aventuras grupales con acciones basadas en evidencia.")
        }}
        keywords={[
          "real life magic",
          "science of connection",
          "face-to-face benefits",
          "oxytocin",
          "dopamine",
          "mirror neurons",
          "social connection health",
          "immune function",
          "longevity",
          "shared meals",
          "group adventures",
          "social capital"
        ]}
        image="https://s.kikiapp.eu/img/loneliness-epidemic-2025-stats.jpg"
        type="article"
        publishedTime="2025-09-22T00:00:00Z"
        modifiedTime="2025-09-22T00:00:00Z"
        section="Health & Connection"
        pathname="/real-life-magic"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-blue-600 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-block">
                <div className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white px-6 py-3 rounded-full text-sm font-medium mb-6 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {t("rlm.hero.badge", "SCIENCE OF CONNECTION")}
                </div>
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">{t("rlm.hero.title_prefix", "The Science Behind")}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-blue via-accent to-pulse-pink">{t("rlm.hero.title_focus", "Real‑Life Magic")}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              {t("rlm.hero.subtitle", "What single habit improves survival odds by 50%, boosts immunity like quitting smoking, and even makes food taste better? Genuine, face‑to‑face human connection.")}
              <sup><a href="#rlm-ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">[2]</a></sup>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="#neurobiology" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                {t("rlm.hero.cta_explore", "Explore the Science")}
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg border border-gray-600">
                {t("rlm.hero.cta_find", "Find Connection")}
                <Heart className="h-5 w-5" />
              </Link>
            </div>

            {/* At a glance */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-gray-400 mb-1">{t("rlm.stats.mortality.label", "Mortality Risk")}</div>
                <div className="text-white text-lg"><AnimatedCounter value={50} suffix="%" /> {t("rlm.stats.mortality.text", "lower with strong social ties")} <span className="text-xs align-top">(<a href="#rlm-ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">2</a>, <a href="#rlm-ref-3" className="text-blue-400 hover:text-blue-300 font-semibold">3</a>)</span></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-gray-400 mb-1">{t("rlm.stats.immunity.label", "Immune Function")}</div>
                <div className="text-white text-lg">{t("rlm.stats.immunity.text", "Group activities boost IgA and CD4 T cells")} <span className="text-xs align-top">(<a href="#rlm-ref-8" className="text-blue-400 hover:text-blue-300 font-semibold">8</a>, <a href="#rlm-ref-40" className="text-blue-400 hover:text-blue-300 font-semibold">40</a>)</span></div>
              </div>
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-4">
                <div className="text-gray-400 mb-1">{t("rlm.stats.meals.label", "Shared Meals")}</div>
                <div className="text-white text-lg">~<AnimatedCounter value={9} suffix="%" /> {t("rlm.stats.meals.text", "lower taste thresholds with friends")} <span className="text-xs align-top">(<a href="#rlm-ref-16" className="text-blue-400 hover:text-blue-300 font-semibold">16</a>)</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-900/50 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-56 h-56 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute bottom-0 -right-10 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-[17px] md:text-[18px]" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-pulse-pink" />
              {t("rlm.intro.heading", "Why In‑Person Connection Changes Everything")}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t("rlm.intro.p1", "What if there were a single intervention that could improve survival odds by 50%, boost your immune system like quitting smoking, and even make food taste better? It isn't a new drug—it's the scientifically‑proven magic of meaningful, face‑to‑face human connection.")}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t("rlm.intro.p2.part1", "In a world overflowing with digital contact, we face a paradox: record levels of loneliness and its consequences. The WHO estimates loneliness contributes to 871,000 deaths annually—about 100 every hour.")}
              <sup><a href="#rlm-ref-12" className="text-blue-400 hover:text-blue-300 font-semibold">[12]</a>, <a href="#rlm-ref-15" className="text-blue-400 hover:text-blue-300 font-semibold">[15]</a></sup>
              {" "}
              {t("rlm.intro.p2.part2.prefix", "For data and solutions, see our ")}
              <Link to="/loneliness-epidemic" className="text-pulse-pink hover:text-accent underline">{t("rlm.intro.p2.link", "Loneliness Epidemic report")}</Link>
              {". "}
              {t("rlm.intro.p2.part2", "The flip side? Face‑to‑face relationships are one of the most potent interventions for human flourishing.")}
            </p>
            <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 mb-6">
              <p className="text-gray-300 text-sm">
                {t("rlm.intro.info", "Mortality risk changes associated with social isolation versus connection are striking: strong relationships are linked with up to 50% lower all‑cause mortality risk. Explore the full context in the Loneliness Epidemic.")}
                <sup><a href="#rlm-ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">[2]</a>, <a href="#rlm-ref-3" className="text-blue-400 hover:text-blue-300 font-semibold">[3]</a></sup>
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("rlm.intro.p3", "From the neurochemical cascades that flood the brain during authentic encounters to measurable immune shifts after group activities, the science shows that real‑world interactions rewire neural circuits, regulate stress, and extend life. This guide distills those findings and shows how to harness them.")}
              <sup><a href="#rlm-ref-4" className="text-blue-400 hover:text-blue-300 font-semibold">[4]</a>, <a href="#rlm-ref-10" className="text-blue-400 hover:text-blue-300 font-semibold">[10]</a></sup>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Neurobiology of Connection */}
      <section id="neurobiology" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto text-[17px] md:text-[18px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <Brain className="h-8 w-8 text-purple-400" />
              {t("rlm.neuro.heading", "Neurobiology of Social Connection: Oxytocin, Dopamine, Endorphins")}
            </motion.h2>
            <motion.p className="text-gray-300 leading-relaxed mb-8" variants={fadeInUp}>
              {t("rlm.neuro.blurb", "Meaningful interaction triggers a precise cocktail of neurochemicals—creating a measurable social high and durable changes in stress regulation, empathy, and trust.")}
            </motion.p>

            <motion.div className="prose prose-invert max-w-none mb-6 text-gray-300" variants={fadeInUp}>
              <p>
                Researchers often highlight four core neurochemicals that shape social bonding—oxytocin, dopamine, serotonin, and endorphins—each with distinct roles that together generate what many describe as a "social high."
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4" variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2"><Heart className="h-5 w-5 text-pink-400" />{t("rlm.neuro.oxytocin.title", "Oxytocin")}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm space-y-2">
                  <p>{t("rlm.neuro.oxytocin.text1", "Context‑sensitive bonding hormone—up to ~40% higher with close friends.")}<sup><a href="#rlm-ref-1" className="text-blue-400 hover:text-blue-300 font-semibold">[1]</a>, <a href="#rlm-ref-7" className="text-blue-400 hover:text-blue-300 font-semibold">[7]</a></sup></p>
                  <p>{t("rlm.neuro.oxytocin.text2", "Enhances hypothalamus and insula activity → lower anxiety and higher trust.")}<sup><a href="#rlm-ref-10" className="text-blue-400 hover:text-blue-300 font-semibold">[10]</a></sup></p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-400" />{t("rlm.neuro.dopamine.title", "Dopamine")}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm space-y-2">
                  <p>{t("rlm.neuro.dopamine.text1", "Encodes social hunger in dorsal raphe; relief on reconnection reinforces seeking.")}<sup><a href="#rlm-ref-5" className="text-blue-400 hover:text-blue-300 font-semibold">[5]</a></sup></p>
                  <p>{t("rlm.neuro.dopamine.text2", "Drives motivation and reward during shared novelty.")}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2"><Shield className="h-5 w-5 text-green-400" />{t("rlm.neuro.serotonin.title", "Serotonin")}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm space-y-2">
                  <p>{t("rlm.neuro.serotonin.text1", "Stabilizes mood and social confidence; modulated by meaningful connection.")}</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2"><Activity className="h-5 w-5 text-blue-400" />{t("rlm.neuro.endorphins.title", "Endorphins")}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 text-sm space-y-2">
                  <p>{t("rlm.neuro.endorphins.text1", "Released in laughter and synchronized movement; increases pain tolerance and bonding.")}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2"><Heart className="h-5 w-5 text-pink-400" />{t("rlm.deep.oxytocin.title", "Oxytocin: The Master Conductor")}</h3>
              <p className="text-gray-300 leading-relaxed">
                Often mislabeled the "love hormone," oxytocin is better understood as a context‑sensitive <em>social switch</em>. In familiar, trusting interactions its release increases substantially—by roughly <span className="text-white font-semibold">40%</span> with close friends compared to strangers—tuning brain systems for connection<sup><a href="#rlm-ref-1" className="text-blue-400 hover:text-blue-300 font-semibold">[1]</a>, <a href="#rlm-ref-10" className="text-blue-400 hover:text-blue-300 font-semibold">[10]</a></sup>. Beyond warm feelings, oxytocin modulates activity in the hypothalamus and anterior insula—regions central to stress regulation and interoception—supporting lower anxiety, greater resilience, and a higher capacity for empathy and trust<sup><a href="#rlm-ref-10" className="text-blue-400 hover:text-blue-300 font-semibold">[10]</a></sup>. Converging evidence (including UC Berkeley's vole studies) indicates oxytocin is as critical for <em>friendship formation</em> as it is for romantic bonding, suggesting a shared neurobiological foundation across human relationships<sup><a href="#rlm-ref-7" className="text-blue-400 hover:text-blue-300 font-semibold">[7]</a></sup>.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h3 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-400" />{t("rlm.deep.dopamine.title", "Dopamine: Social Reward")}</h3>
              <p className="text-gray-300 leading-relaxed">
                Dopamine doesn't just respond to pleasure—it encodes <em>social need</em>. Work from Kay Tye's lab shows dorsal raphe dopamine neurons track isolation, producing a loneliness‑like state that motivates seeking others—essentially a form of social hunger<sup><a href="#rlm-ref-5" className="text-blue-400 hover:text-blue-300 font-semibold">[5]</a></sup>. Reconnection then delivers dopaminergic relief that reinforces prosocial behaviors, much like eating resolves physiological hunger. This mechanism helps explain both the discomfort of isolation and the powerful "ahh" of a good hang with friends.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="text-2xl font-semibold mb-3 text-white flex items-center gap-2"><UtensilsCrossed className="h-5 w-5 text-purple-400" />{t("rlm.deep.shared.title", "Shared Experience Amplifier")}</h3>
              <p className="text-gray-300 leading-relaxed">
                Experiences intensify when shared. A Yale study found chocolate tasted better when eaten at the same time as another person—even without speaking<sup><a href="#rlm-ref-23" className="text-blue-400 hover:text-blue-300 font-semibold">[23]</a></sup>. The effect isn't limited to flavor; pleasant and unpleasant experiences alike become more intense together. The likely mechanism is heightened attention and enhanced memory encoding under joint attention, creating more vivid, longer‑lasting impressions that strengthen bonds.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital vs Real Comparison (interactive) */}
      <section className="pt-16 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto text-[17px] md:text-[18px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <MessageSquare className="h-8 w-8 text-accent" />
              {t("rlm.digital.heading", "Face‑to‑Face vs Digital: Why Screens Can't Replace Real Connection")}
            </motion.h2>
            <motion.p className="text-gray-300 leading-relaxed mb-6" variants={fadeInUp}>
              {t("rlm.digital.blurb", "Communication effectiveness scales with sensory bandwidth. More channels → better trust, empathy, and wellbeing. Explore the difference:")}
              <sup><a href="#rlm-ref-11" className="text-blue-400 hover:text-blue-300 font-semibold">[11]</a>, <a href="#rlm-ref-12" className="text-blue-400 hover:text-blue-300 font-semibold">[12]</a>, <a href="#rlm-ref-13" className="text-blue-400 hover:text-blue-300 font-semibold">[13]</a></sup>
            </motion.p>

            <motion.div className="flex flex-wrap gap-2 mb-6" variants={fadeInUp}>
              {methods.map(m => (
                <Button key={m.key} variant={selectedMethod === m.key ? "default" : "outline"} className={selectedMethod === m.key ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"} onClick={() => setSelectedMethod(m.key)}>
                  {m.label}
                </Button>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">{t("rlm.stats.effectiveness_label", "Effectiveness for Bonding")}</div>
                    <div className="text-gray-400 text-sm">{t("rlm.stats.chart_helper", "Higher is better")}</div>
                  </div>
                  <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue" style={{ width: `${currentMethod.score}%` }} />
                  </div>
                  <div className="text-gray-300 text-sm">{currentMethod.description}</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compact comparison chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <Card className="bg-gray-800/40 border-gray-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">{t("rlm.stats.all_methods_title", "All Methods at a Glance")}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-5">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={methods.map(m => ({ name: m.label, value: m.score, description: m.description }))} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-20" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} angle={-20} textAnchor="end" height={40} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip content={({ active, payload }) => {
                          if (!active || !payload || !payload.length) return null as any;
                          const d: any = payload[0].payload;
                          return (
                            <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl text-sm">
                              <div className="font-semibold text-foreground mb-1">{d.name}</div>
                              <div className="text-foreground">{d.value}% effectiveness</div>
                              <div className="text-muted-foreground mt-1 max-w-[220px]">{d.description}</div>
                            </div>
                          );
                        }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}
                          className="drop-shadow"
                        >
                          {methods.map((_, i) => (
                            <Cell key={i} fill={['#8B5CF6', '#FF2688', '#38D1BF', '#9CA3AF', '#F59E0B'][i % 5]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">Comparative mental health benefits by communication method (higher = better bonding effectiveness).</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Gap and Digital Paradox */}
            <motion.div className="mt-8 space-y-4" variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-white">{t("rlm.info_gap.heading", "The Information Gap: What Screens Can't Capture")}</h3>
              <p className="text-gray-300">
                {t("rlm.info_gap.p1", "Face‑to‑face provides rich sensory data—tone, micro‑expressions, body language, pheromones, spatial dynamics—crucial for trust and empathy.")}
                <sup><a href="#rlm-ref-11" className="text-blue-400 hover:text-blue-300 font-semibold">[11]</a>, <a href="#rlm-ref-13" className="text-blue-400 hover:text-blue-300 font-semibold">[13]</a></sup>
                . {t("rlm.info_gap.covid_note", "During COVID‑19, a large 2023 study found face‑to‑face contact was 32% more strongly associated with positive mental health than digital communication—even after controls.")}
                <sup><a href="#rlm-ref-12" className="text-blue-400 hover:text-blue-300 font-semibold">[12]</a></sup>
              </p>
              <h3 className="text-2xl font-semibold text-white">{t("rlm.digital_paradox.heading", "The Digital Paradox: More Connected, More Isolated")}</h3>
              <p className="text-gray-300">{t("rlm.digital_paradox.p1", "Research from 2025 and related work paint a nuanced picture. Some digital channels help; others fall short:")}
                <sup><a href="#rlm-ref-11" className="text-blue-400 hover:text-blue-300 font-semibold">[11]</a>, <a href="#rlm-ref-13" className="text-blue-400 hover:text-blue-300 font-semibold">[13]</a></sup>
              </p>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li><span className="text-white">{t("rlm.digital_paradox.li1", "Phone calls can approach (and in some contexts even exceed) face‑to‑face interaction quality.")}</span></li>
                <li><span className="text-white">{t("rlm.digital_paradox.li2", "Text‑based interactions are consistently lower quality than in‑person conversation.")}</span></li>
                <li><span className="text-white">{t("rlm.digital_paradox.li3", "Social media shows the lowest correlation with positive mental health outcomes.")}</span></li>
              </ul>
              <p className="text-gray-300">{t("rlm.digital_paradox.p2", "Key insight: the more sensory channels available during communication, the more effective it is for building real connection and supporting mental health.")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Physical Health */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <Shield className="h-8 w-8 text-green-400" />
              {t("rlm.phys.heading", "Physical Health Benefits of Social Connection")}
            </motion.h2>
            <motion.div className="grid md:grid-cols-3 gap-4" variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.phys.card1.title", "Enhanced Immunity")}</div>{t("rlm.phys.card1.text", "Social networks correlate with higher NK cells, IgA, and CD4 T cells—and lower inflammatory neutrophils")}<sup><a href="#rlm-ref-8" className="text-blue-400 hover:text-blue-300 font-semibold">[8]</a>, <a href="#rlm-ref-40" className="text-blue-400 hover:text-blue-300 font-semibold">[40]</a></sup>.</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.phys.card2.title", "Longevity")}</div>{t("rlm.phys.card2.text", "Strong social ties reduce all‑cause mortality risk by up to 50%, rivaling top medical interventions.")}<sup><a href="#rlm-ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">[2]</a>, <a href="#rlm-ref-3" className="text-blue-400 hover:text-blue-300 font-semibold">[3]</a></sup></CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.phys.card3.title", "Stress & Heart")}</div>{t("rlm.phys.card3.text", "Connection lowers systemic inflammation and cardiovascular risk through neuroendocrine regulation.")}</CardContent></Card>
            </motion.div>

            <motion.p className="text-gray-300 mt-6" variants={fadeInUp}>
              {t("rlm.phys.p1", "Isolated individuals show elevated inflammatory markers and higher cardiovascular risk, while strong connection buffers through biological and behavioral pathways")}<sup><a href="#rlm-ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">[2]</a>, <a href="#rlm-ref-3" className="text-blue-400 hover:text-blue-300 font-semibold">[3]</a></sup>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mirror Neurons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-[17px] md:text-[18px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-6 text-white flex items-center gap-3"><Brain className="h-8 w-8 text-blue-400" />{t("rlm.mirror.heading", "Mirror Neurons and Empathy: How We \"Feel\" Each Other")}</h2>
            <p className="text-gray-300 leading-relaxed">
              {t("rlm.mirror.p1", "Mirror neurons fire both when we act and when we observe others, enabling embodied simulation. This neural resonance supports empathy, social learning, and group coordination—systems strengthened through rich, in‑person interaction.")}
              <sup><a href="#rlm-ref-21" className="text-blue-400 hover:text-blue-300 font-semibold">[21]</a>, <a href="#rlm-ref-33" className="text-blue-400 hover:text-blue-300 font-semibold">[33]</a>, <a href="#rlm-ref-36" className="text-blue-400 hover:text-blue-300 font-semibold">[36]</a></sup>
            </p>
            <p className="text-gray-300 mt-4">
              {t("rlm.mirror.p2", "Social learning depends on these systems to interpret context, predict behavior, and coordinate action, highlighting the importance of in‑person interaction for developing and maintaining social cognition.")}
              <sup><a href="#rlm-ref-21" className="text-blue-400 hover:text-blue-300 font-semibold">[21]</a>, <a href="#rlm-ref-33" className="text-blue-400 hover:text-blue-300 font-semibold">[33]</a></sup>
            </p>
            <div className="prose prose-invert max-w-none text-gray-300 mt-6">
              <h3 className="text-white text-xl font-semibold mb-2">{t("rlm.mirror.sub1", "How Mirror Neurons Create Connection")}</h3>
              <p>
                {t("rlm.mirror.sub1.p", "Concentrated in the premotor cortex and inferior parietal lobule, mirror neurons enable embodied simulation—our brains partially reproduce what we witness in others, creating an automatic, pre‑reflective empathic response.")}
                <sup><a href="#rlm-ref-21" className="text-blue-400 hover:text-blue-300 font-semibold">[21]</a>, <a href="#rlm-ref-36" className="text-blue-400 hover:text-blue-300 font-semibold">[36]</a></sup> {t("rlm.mirror.sub1.p.cont", "fMRI studies show these regions also respond during pain observation and prosocial acts, and individuals with stronger mirroring responses tend to report higher empathy and better social skills.")}
                <sup><a href="#rlm-ref-33" className="text-blue-400 hover:text-blue-300 font-semibold">[33]</a></sup>
              </p>
              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.mirror.sub2", "The Social Learning Advantage")}</h3>
              <p>
                {t("rlm.mirror.sub2.p", "Mirror systems form a neurobiological basis for social learning and cultural transmission. Presence amplifies mirroring, making face‑to‑face interaction essential practice across the lifespan.")}
                <sup><a href="#rlm-ref-21" className="text-blue-400 hover:text-blue-300 font-semibold">[21]</a>, <a href="#rlm-ref-33" className="text-blue-400 hover:text-blue-300 font-semibold">[33]</a>, <a href="#rlm-ref-36" className="text-blue-400 hover:text-blue-300 font-semibold">[36]</a></sup>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shared Meals */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-[17px] md:text-[18px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold mb-6 text-white flex items-center gap-3"><UtensilsCrossed className="h-8 w-8 text-purple-400" />{t("rlm.meals.heading", "Shared Meals: Why Food Tastes Better with Friends")}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t("rlm.meals.p1", "One of social neuroscience's most delightful findings: food can literally taste better together. Multiple studies show social context alters taste perception in measurable ways.")}
            </p>

            <div className="prose prose-invert max-w-none text-gray-300">
              <h3 className="text-white text-xl font-semibold mb-2">{t("rlm.meals.sub1", "The Electrical Taste Threshold Discovery")}</h3>
              <p>
                {t("rlm.meals.sub1.p", "Dining with close friends decreased electrical taste thresholds by about 9%—participants detected weaker tastes when eating socially. This reflects a physiological change in sensory sensitivity and appears with familiar companions, consistent with parasympathetic activation.")}
                <sup><a href="#rlm-ref-16" className="text-blue-400 hover:text-blue-300 font-semibold">[16]</a></sup>
              </p>

              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.meals.sub2", "The Evolutionary Logic of Social Eating")}</h3>
              <p>
                {t("rlm.meals.sub2.p", "Shared meals helped humans evaluate food safety, distribute resources, and strengthen bonds—rituals still visible across cultures today. People are about 50% more likely to try new foods when dining in groups than alone.")}
                <sup><a href="#rlm-ref-26" className="text-blue-400 hover:text-blue-300 font-semibold">[26]</a>, <a href="#rlm-ref-38" className="text-blue-400 hover:text-blue-300 font-semibold">[38]</a></sup>
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><span className="text-white">{t("rlm.meals.li1", "Familiar companions amplify the effect more than strangers or very large groups.")}</span></li>
                <li><span className="text-white">{t("rlm.meals.li2", "Calm, phone‑free tables promote parasympathetic tone and sharper perception.")}</span></li>
                <li><span className="text-white">{t("rlm.meals.li3", "Small‑to‑medium group size (2–6) balances conversation, safety, and attention.")}</span></li>
                <li><span className="text-white">{t("rlm.meals.li4", "Shared novelty (a new cuisine or dish) encodes stronger, longer‑lasting memories.")}</span></li>
              </ul>
            </div>

            <Card className="bg-gray-800/40 border-gray-700/50 mt-6"><CardContent className="p-6 text-gray-300">{t("rlm.meals.bottom", "Bottom line: with trusted friends at the table, the nervous system shifts toward safety and openness—heightening flavor, curiosity, and connection in the process.")}</CardContent></Card>
          </motion.div>
        </div>
      </section>

      {/* Group Adventures */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto text-[17px] md:text-[18px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <Mountain className="h-8 w-8 text-orange-400" />
              {t("rlm.group.heading", "Group Adventures: Bonding, Memory, and Motivation")}
            </motion.h2>
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.group.card1.title", "Novelty + Challenge")}</div>{t("rlm.group.card1.text", "Adventure activates dopamine and endorphins; shared exertion creates behavioral synchrony and stronger ties.")}<sup><a href="#rlm-ref-29" className="text-blue-400 hover:text-blue-300 font-semibold">[29]</a>, <a href="#rlm-ref-32" className="text-blue-400 hover:text-blue-300 font-semibold">[32]</a></sup>.</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.group.card2.title", "Memory Amplifier")}</div>{t("rlm.group.card2.text", "Shared novelty encodes deeper memories, associating companions with positive arousal for years.")}<sup><a href="#rlm-ref-23" className="text-blue-400 hover:text-blue-300 font-semibold">[23]</a></sup>.</CardContent></Card>
            </motion.div>
            <motion.div className="prose prose-invert max-w-none text-gray-300 mt-6" variants={fadeInUp}>
              <h3 className="text-white text-xl font-semibold mb-2">{t("rlm.group.sub1", "The Shared Adventure Amplifier")}</h3>
              <p>
                {t("rlm.group.sub1.p", "Novel, challenging experiences reliably create stronger memories and deeper emotional connections when shared. Reward pathways are most active in social contexts, linking companions to positive arousal.")}
              </p>
              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.group.sub2", "The Biochemistry of Shared Challenge")}</h3>
              <p>
                {t("rlm.group.sub2.p", "Physical challenge increases endorphins (raising pain tolerance), while novelty and controlled stress engage dopamine systems. In groups, signals associate with companions, strengthening bonds beyond typical hangouts.")}
              </p>
            </motion.div>
            <motion.p className="text-gray-300 mt-6" variants={fadeInUp}>
              {t("rlm.group.p_end", "Group workouts improve pain tolerance, performance, and connection via synchronized effort and shared challenge.")}
              <sup><a href="#rlm-ref-41" className="text-blue-400 hover:text-blue-300 font-semibold">[41]</a>, <a href="#rlm-ref-42" className="text-blue-400 hover:text-blue-300 font-semibold">[42]</a></sup>
            </motion.p>
            <div className="mt-2">
              <ActivitiesTeaser
                title="teaser.title"
                subtitle="teaser.subtitle"
                ctaHref="/activities"
                ctaLabel="teaser.cta"
                itemsCount={8}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Capital */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto text-[17px] md:text-[18px]" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <Globe2 className="h-8 w-8 text-teal-400" />
              {t("rlm.social.heading", "Rebuilding Social Capital: Beyond Bowling Alone")}
            </motion.h2>
            <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardHeader><CardTitle className="text-white">{t("rlm.social.card1.title", "Bonding Capital")}</CardTitle></CardHeader><CardContent className="text-gray-300">{t("rlm.social.card1.text", "Deep ties with similar others provide emotional support and identity. Vital, but can be insular.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardHeader><CardTitle className="text-white">{t("rlm.social.card2.title", "Bridging Capital")}</CardTitle></CardHeader><CardContent className="text-gray-300">{t("rlm.social.card2.text", "Connections across diverse groups unlock opportunity, resilience, and collective problem‑solving.")}</CardContent></Card>
            </motion.div>
            <motion.div className="prose prose-invert max-w-none text-gray-300 mt-6" variants={fadeInUp}>
              <h3 className="text-white text-xl font-semibold mb-2">{t("rlm.social.sub1", "The Great Disconnection")}</h3>
              <p>
                {t("rlm.social.sub1.p", "Putnam documented decades‑long declines in civic participation across the U.S.—from clubs and unions to PTA involvement, religious attendance, volunteering, and neighborliness. He cited screen time, suburbanization, time pressures, and generational turnover.")}
                <sup><a href="#rlm-ref-43" className="text-blue-400 hover:text-blue-300 font-semibold">[43]</a>, <a href="#rlm-ref-44" className="text-blue-400 hover:text-blue-300 font-semibold">[44]</a></sup>
              </p>
              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.social.sub2", "Core Findings")}</h3>
              <p>
                {t("rlm.social.sub2.p", "Social capital links to lower crime, better health, higher educational attainment, and stronger local economies—yet league participation, club membership, and public meeting attendance have declined steeply since the mid‑20th century.")}
                <sup><a href="#rlm-ref-43" className="text-blue-400 hover:text-blue-300 font-semibold">[43]</a></sup>
              </p>
              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.social.sub3", "Bonding vs Bridging")}</h3>
              <p>
                {t("rlm.social.sub3.p", "Bonding capital is tight‑knit and homophilous; bridging capital crosses difference. Healthy communities cultivate both; bridging is especially powerful for resilience, innovation, and opportunity flow.")}
                <sup><a href="#rlm-ref-47" className="text-blue-400 hover:text-blue-300 font-semibold">[47]</a></sup>
              </p>
              <h3 className="text-white text-xl font-semibold mt-6 mb-2">{t("rlm.social.sub4", "Into the Digital Age")}</h3>
              <p>
                {t("rlm.social.sub4.p", "Some digital communities can substitute or complement in‑person ties, yet many interactions remain thinner than co‑present ones, leaving gaps in trust, empathy, and local problem‑solving. Activity‑based groups convert interests into recurring, face‑to‑face bridging ties.")}
                <sup><a href="#rlm-ref-46" className="text-blue-400 hover:text-blue-300 font-semibold">[46]</a>, <a href="#rlm-ref-45" className="text-blue-400 hover:text-blue-300 font-semibold">[45]</a></sup>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Action Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3" variants={fadeInUp}>
              <CheckCircle className="h-8 w-8 text-green-400" />
              {t("rlm.actions.heading", "Your Roadmap to Real‑Life Magic")}
            </motion.h2>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" variants={fadeInUp}>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card1.title", "Prioritize Face‑to‑Face")}</div>{t("rlm.actions.card1.text", "Treat meetups like medical appointments. Even brief in‑person time pays outsized dividends.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card2.title", "Share Meals Mindfully")}</div>{t("rlm.actions.card2.text", "Phone‑free dining amplifies flavor and bonding for everyone at the table.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card3.title", "Try Adventures")}</div>{t("rlm.actions.card3.text", "Join hikes, sports, or classes that combine novelty with people.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card4.title", "Use Tech to Meet")}</div>{t("rlm.actions.card4.text", "Prefer calls or video over text. Use apps to facilitate real‑world plans, not replace them.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card5.title", "Move Together")}</div>{t("rlm.actions.card5.text", "Choose group workouts. Synchronized effort boosts mood, resilience, and commitment.")}</CardContent></Card>
              <Card className="bg-gray-800/40 border-gray-700/50"><CardContent className="p-6 text-gray-300"><div className="text-white font-semibold mb-2">{t("rlm.actions.card6.title", "Compound the Gains")}</div>{t("rlm.actions.card6.text", "Connection begets connection. Skills, empathy, and rewards grow with practice.")}</CardContent></Card>
            </motion.div>
            <motion.p className="text-gray-300 mt-6" variants={fadeInUp}>
              {t("rlm.actions.p1", "Each positive interaction increases the likelihood and payoff of the next. Empathic circuits strengthen with use, and your brain more readily associates people and places with positive outcomes.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div className="text-center mb-10" variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">{t("rlm.faq.heading", "Real‑Life Magic: FAQ")}</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t("rlm.faq.sub", "Answers to the most common questions about why in‑person connection outperforms digital—and how to apply the science.")}</p>
            </motion.div>

            <div className="grid gap-6 max-w-5xl mx-auto">
              <motion.div
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q1", "How much face‑to‑face interaction do I need for health benefits?")} answer={t("rlm.faq.a1", "Even minimal in‑person contact confers significant benefits. Seeing one close friend regularly delivers many protective effects; diverse networks provide the strongest gains.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q2", "Can video calls substitute for in‑person interaction?")} answer={t("rlm.faq.a2", "Video calls help and are superior to text, but they lack key sensory information—like scent, subtle body language, and shared spatial context—necessary for deep bonding.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q3", "Do introverts benefit as much as extraverts?")} answer={t("rlm.faq.a3", "Yes. Quality over quantity. Many introverts prefer smaller groups or one‑on‑one time and still achieve full health gains from meaningful, regular contact.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q4", "Which ages benefit most?")} answer={t("rlm.faq.a4", "Benefits apply across the lifespan; effects are pronounced for older adults and during developmental windows for youth. Some studies estimate social connection slows biological aging by 1–2 years in older adults.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q5", "Are group adventures better than routine hangouts?")} answer={t("rlm.faq.a5", "Novel, challenging experiences reliably forge stronger bonds than routine meetups, via dopamine/endorphin responses and shared arousal linked to companions.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q6", "What's the minimum group size?")} answer={t("rlm.faq.a6", "Two people suffice for many benefits. For adventures, groups of ~6–10 often maximize participation, cohesion, and memory effects.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q7", "Do workplace relationships count?")} answer={t("rlm.faq.a7", "Meaningful workplace ties matter—especially when they extend beyond tasks to mutual support and informal connection.")} />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FAQItem question={t("rlm.faq.q8", "How quickly can I feel better?")} answer={t("rlm.faq.a8", "Positive interactions can lift mood immediately. Sustained improvements typically appear over 4–12 weeks of consistent in‑person contact.")} />
              </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sources and References */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-4xl font-bold mb-12 text-white text-center" variants={fadeInUp}>{t("rlm.sources.heading", "📚 Research Sources and Data References")}</motion.h2>
            <motion.div className="grid md:grid-cols-2 gap-6 mb-8" variants={fadeInUp}>
              <div className="space-y-4 md:pr-3">
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-1"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[1] Oxytocin & Social Bonding</p><a href="https://wjbphs.com/sites/default/files/WJBPHS-2024-0418.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">World Journal of Biology Pharmacy & Health Sciences, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-2"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[2] Social Connection & Early Death</p><a href="https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">WHO Guidelines, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-3"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[3] Loneliness, Health & Mortality</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6998928/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PMC Review, 2017</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-4"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[4] Oxytocin in Social Cooperation</p><a href="https://pubmed.ncbi.nlm.nih.gov/39611271/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PubMed, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-5"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[5] Dopamine & Social Isolation</p><span className="text-gray-300 text-sm">Kay Tye Lab (summary)</span></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-7"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[7] Oxytocin as Friendship Hormone</p><a href="https://news.berkeley.edu/2025/08/11/is-the-love-hormone-oxytocin-also-the-friendship-hormone/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">UC Berkeley News, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-8"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[8] Social Support & Immunity</p><a href="https://pubmed.ncbi.nlm.nih.gov/38524896/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PubMed, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-10"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[10] Oxytocin & Psychotherapy</p><a href="https://www.sciencedirect.com/science/article/pii/S0149763424004044" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">ScienceDirect, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-11"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[11] Interaction Quality (JCMC)</p><a href="https://academic.oup.com/jcmc/article/doi/10.1093/jcmc/zmaf004/8063696" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Oxford Academic, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-12"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[12] Pandemic: F2F vs Digital</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10191089/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PMC, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-13"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[13] F2F vs Digital Channels</p><a href="https://lup.lu.se/student-papers/record/9135359/file/9135511.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Lund University, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-14"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[14] Face‑to‑Face Communication: Healthier Than Digital?</p><a href="https://www.psychologytoday.com/us/blog/insight-therapy/202305/face-to-face-communication-healthier-than-digital" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Psychology Today, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-17"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[17] Why Exercising with Friends Helps</p><a href="https://www.anthro.ox.ac.uk/article/why-exercising-friends-could-be-better-you" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Oxford Anthropology, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-18"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[18] Social Bonds and Exercise</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4552681/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PMC, 2015</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-19"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[19] Social Connections & Physical Health</p><a href="https://ahaclinics.com.au/2024/11/30/how-social-connections-impact-physical-health/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">AHA Clinics, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-20"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[20] How Social Connection Supports Longevity</p><a href="https://longevity.stanford.edu/lifestyle/2023/12/18/how-social-connection-supports-longevity/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Stanford Center on Longevity, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-22"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[22] Social Media and Loneliness</p><a href="https://psycnet.apa.org/record/2018-21749-001" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Twenge et al., 2018</a></CardContent></Card>
              </div>

              <div className="space-y-4 md:pl-3">
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-15"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[15] Loneliness & Early Death (News)</p><a href="https://healthpolicy-watch.news/loneliness-social-isolation-linked-to-871000-annual-deaths-who-finds/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Health Policy Watch, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-16"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[16] Eating with Friends</p><a href="https://www.scirp.org/journal/paperinformation?paperid=91360" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">SCIRP, 2019</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-21"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[21] Mirror Neurons & Empathy</p><a href="https://www.scitechnol.com/peer-review/the-role-of-mirror-neurons-in-understanding-social-cognition-and-empathy-pvEA.php?article_id=25974" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">SciTechnol, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-23"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[23] Yale Chocolate Study</p><a href="https://www.mentalfloss.com/posts/why-food-from-someone-elses-plate-tastes-better" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Mental Floss, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-26"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[26] Why Humans Feast Together</p><a href="https://www.bbc.com/future/article/20241126-why-humans-feel-the-need-to-feast-together" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">BBC Future, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-29"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[29] Team Bonding Activities</p><a href="https://groupdynamix.com/6-fun-sports-team-bonding-activities-to-strengthen-relationships/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Group DynamiX, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-32"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[32] Psychology of Team Building</p><a href="https://www.xlevents.com.au/articles/unlocking-team-potential-the-psychology-behind-successful-team-building-activities/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">XL Events, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-33"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[33] Mirror Neurons Review</p><a href="https://www.arfjournals.com/image/catalog/Journals%20Papers/IJAR/2024/No%202%20(2024)/10_Basanta%20Kumar.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">ARF Journals, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-36"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[36] Empathy & Mirror Neurons</p><a href="https://positivepsychology.com/mirror-neurons/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Positive Psychology, 2025</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-38"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[38] Unifying Power of Food</p><a href="https://www.thechoppingblock.com/blog/the-unifying-power-of-food-how-sharing-a-meal-brings-us-together" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">The Chopping Block, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-40"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[40] Immunology of Stress</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11546738/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PMC Review, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-41"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[41] Group Exercise Benefits</p><a href="https://orthosportsmed.com/people-who-exercise-in-groups-get-more-health-benefits/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Orthosportsmed, 2023</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-42"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[42] Social Support & Group Exercise</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9053316/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">PMC, 2021</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-43"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[43] Bowling Alone (Book)</p><a href="https://www.hup.harvard.edu/catalog.php?isbn=9780743203043" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Harvard University Press, 2000</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-44"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[44] Original Paper: America's Declining Social Capital</p><a href="https://historyofsocialwork.org/1995_Putnam/1995,%20Putnam,%20bowling%20alone.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Putnam, 1995</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-45"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[45] Summary of Bowling Alone</p><a href="https://www.beyondintractability.org/bksum/putnam-bowling" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Beyond Intractability, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-46"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[46] NFCB Critique of Civic Engagement</p><a href="https://nfcb.org/civic-engagement-social-capital-and-robert-putnams-bowling-alone-a-critique-by-a-rima-dael-nfcb-ceo/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">NFCB, 2024</a></CardContent></Card>
                <Card className="bg-gray-800/50 border-blue-500/20" id="rlm-ref-47"><CardContent className="p-4"><p className="text-white font-semibold mb-2">[47] Putnam on Social Capital (Overview)</p><a href="https://www.socialcapitalresearch.com/putnam-on-social-capital-democratic-or-civic-perspective/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">Social Capital Research, 2024</a></CardContent></Card>
              </div>
            </motion.div>
            <motion.div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20" variants={fadeInUp}>
              <p className="text-gray-300 text-sm"><strong className="text-white">{t("rlm.sources.note_title", "Research Note:")}</strong> {t("rlm.sources.note_text", "Citations include peer‑reviewed studies, institutional reports, and expert commentary. Inline markers link to the corresponding references above.")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">{t("rlm.closing.heading", "Choose Connection")}</span></h2>
            <p className="text-gray-300 text-lg mb-8">{t("rlm.closing.p1", "The most powerful intervention for health and happiness is free and available today. Step away from screens, gather your people, and experience real‑life magic.")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/activities" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                {t("rlm.closing.cta.activities", "Plan Something Fun")}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 border border-gray-600 font-medium text-lg">
                {t("rlm.closing.cta.home", "Find People Near You")}
                <Users className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealLifeMagic;


