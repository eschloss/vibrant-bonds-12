
import { motion } from "framer-motion";
import { HeartHandshake, CalendarDays, Zap } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const FriendshipFormula = () => {
  const { t } = useTranslation();

  const insights = [
    {
      icon: <HeartHandshake className="h-6 w-6 text-pulse-pink" />,
      titleKey: "friendship.shared_interests.title",
      titleDefault: "Shared Interests",
      descriptionKey: "friendship.shared_interests.description",
      descriptionDefault: "People come together faster when plans are built around something they're all excited to do.\n\nShared interests not only spark connection—they also give you something to focus on, so it's not just endless small talk."
    },
    {
      icon: <CalendarDays className="h-6 w-6 text-pulse-blue" />,
      titleKey: "friendship.irl.title",
      titleDefault: "IRL, Again and Again",
      descriptionKey: "friendship.irl.description",
      descriptionDefault: "You can't build a real friendship from a one-off meetup. \n\nIt takes seeing each other again and again—and it has to happen in real life."
    },
    {
      icon: <Zap className="h-6 w-6 text-[#FFD600]" />,
      titleKey: "friendship.nudge.title",
      titleDefault: "A Little Nudge",
      descriptionKey: "friendship.nudge.description",
      descriptionDefault: "Every great friendship has someone who says, \"Let's hang out.\"\n\nPulse plays that role—helping people follow through and stay connected."
    }
  ];

  return (
    <section id="friendship-formula" className="relative py-16 md:py-20 bg-gray-800/30 overflow-hidden">
      {/* playful background orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pulse-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-pulse-blue/20 blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF]">
            {t("friendship.title", "Our Friendship Formula")}
          </h2>
          <p className="text-xl text-gray-300">
            {t("friendship.description", "Three key insights that became the foundation of Pulse")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* floating sparkles */}
          <motion.div
            className="hidden md:block absolute left-6 top-0 text-pulse-pink/70"
            initial={{ y: -6, opacity: 0.7 }}
            animate={{ y: [ -6, 6, -6 ] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.div>
          <motion.div
            className="hidden md:block absolute right-8 bottom-8 text-pulse-blue/70"
            initial={{ y: 6, opacity: 0.7 }}
            animate={{ y: [ 6, -6, 6 ] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.div>

          {insights.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, rotate: -0.25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="p-[1px] rounded-2xl bg-gradient-to-br from-[#FF2688]/40 via-[#741ADD]/30 to-[#38D1BF]/40 shadow-[0_0_30px_rgba(116,26,221,0.2)]"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 flex flex-col h-full">
                <div className="w-12 h-12 bg-gray-700/40 rounded-full flex items-center justify-center mb-4 ring-1 ring-gray-600/50">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 whitespace-pre-line">
                  {t(item.titleKey, item.titleDefault)}
                </h3>
                <p className="text-gray-300 whitespace-pre-line flex-grow">
                  {t(item.descriptionKey, item.descriptionDefault)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* playful equation strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <span className="rounded-full px-3 py-1 bg-pulse-pink/15 border border-pulse-pink/30">{t("friendship.shared_interests.title", "Shared Interests")}</span>
          <span className="text-gray-400">+</span>
          <span className="rounded-full px-3 py-1 bg-pulse-blue/15 border border-pulse-blue/30">{t("friendship.irl.title", "IRL, Again and Again")}</span>
          <span className="text-gray-400">+</span>
          <span className="rounded-full px-3 py-1 bg-yellow-500/15 border border-yellow-500/30">{t("friendship.nudge.title", "A Little Nudge")}</span>
          <span className="text-gray-400">=</span>
          <span className="rounded-full px-3 py-1 bg-emerald-500/15 border border-emerald-500/30">{t("friendship.result", "Real Friends")}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FriendshipFormula;
