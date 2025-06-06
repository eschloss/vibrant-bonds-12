
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
    <section className="py-16 md:py-20 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("friendship.title", "The Friendship Formula")}</h2>
          <p className="text-xl text-gray-300">
            {t("friendship.description", "Three key insights that became the foundation of Pulse")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 whitespace-pre-line">
                {t(item.titleKey, item.titleDefault)}
              </h3>
              <p className="text-gray-300 whitespace-pre-line flex-grow">
                {t(item.descriptionKey, item.descriptionDefault)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FriendshipFormula;
