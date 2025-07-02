
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const StepsSection = () => {
  const { t } = useTranslation();

  const steps = [{
    icon: Users,
    title: t("city.steps.get_matched.title", "Get Matched"),
    description: t("city.steps.get_matched.description", "We'll match you with a small group of like-minded people."),
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: MessageSquare,
    title: t("city.steps.break_ice.title", "Break the Ice"),
    description: t("city.steps.break_ice.description", "Chat with fellow group members, guided by our conversation starters and games."),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: CalendarDays,
    title: t("city.steps.meet_up.title", "Meet Up in Real Life"),
    description: t("city.steps.meet_up.description", "We'll handle the planning and logistics — simply show up and enjoy yourself."),
    color: "bg-gradient-to-r from-indigo-400 to-blue-500"
  }, {
    icon: Sprout,
    title: t("city.steps.grow_friendships.title", "Grow the Friendships"),
    description: t("city.steps.grow_friendships.description", "After the initial meet, we'll help you grow your new connections."),
    color: "bg-gradient-to-r from-green-400 to-emerald-500"
  }];

  return (
    <section className="relative py-16 bg-gray-900 dark:bg-gray-950">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              className="flex items-center gap-6 mb-16 last:mb-0"
            >
              <div className="relative">
                <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center`}>
                  <step.icon className="text-white" size={40} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xl text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
