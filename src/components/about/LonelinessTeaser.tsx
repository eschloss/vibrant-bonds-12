import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Users, Heart, TrendingDown, Brain, ArrowRight } from "lucide-react";

const LonelinessTeaser = () => {
  const { t } = useTranslation();

  // Helper to remove any leading numeric/stat prefix from translated strings to avoid duplication
  const stripLeadingStat = (s: string): string => {
    // Matches optional ~ or ≈, then digits with separators, optional %/M/m/million/millones, then optional punctuation and spaces
    const cleaned = s.replace(/^\s*[~≈]?\d+[\d.,]*\s*(%|[Mm]|million|millones)?\s*[-–—:]?\s*/u, "");
    return cleaned.trim();
  };

  const items = [
    {
      icon: <Users size={18} className="text-white" />,
      number: "50%",
      text: stripLeadingStat(t("loneliness.stats.scale.value", "50% of Americans feel lonely regularly")),
      colors: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Heart size={18} className="text-white" />,
      number: "29%",
      text: stripLeadingStat(t("loneliness.stats.health.value", "29% higher risk of premature death")),
      colors: "from-pink-500 to-purple-600",
    },
    {
      icon: <Brain size={18} className="text-white" />,
      number: "79%",
      text: stripLeadingStat(t("loneliness.stats.affected.value", "Gen Z reports 79% loneliness rate")),
      colors: "from-emerald-400 to-teal-500",
    },
    {
      icon: <TrendingDown size={18} className="text-white" />,
      number: "21M",
      text: stripLeadingStat(t("loneliness.stats.friendless.value", "21 million have zero close friends")),
      colors: "from-rose-500 to-orange-500",
    },
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-16 w-[26rem] h-[26rem] rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/70 p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 items-center max-w-4xl mx-auto text-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                {t("loneliness.teaser.badge", "A Global Crisis We Can Solve")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                {t("loneliness.teaser.headline", "Loneliness Is More Than a Feeling. It’s a Public Health Crisis")}
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                {t(
                  "loneliness.teaser.subtext",
                  "It’s not just feelings — it’s health. The data is clear, and the solution is simple: real friendships built through repeated in‑person moments."
                )}
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 text-left">
                {items.map((it, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-3 hover:border-accent/40 transition"
                  >
                    <div
                      className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${it.colors}`}
                    >
                      {it.icon}
                    </div>
                    <p className="text-gray-200">
                      <span className="font-semibold text-white mr-1">{it.number}</span>
                      <span>{it.text}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <Link to="/loneliness-epidemic" aria-label={t("loneliness.teaser.cta", "Learn more about the crisis")} className="inline-block">
                  <Button className="relative bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95 px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl rounded-full shadow-xl shadow-purple-500/30 transition transform hover:scale-[1.02]">
                    <span className="inline-flex items-center gap-2">
                      {t("loneliness.teaser.cta", "Learn more about the crisis")} <ArrowRight size={18} className="text-white" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LonelinessTeaser;


