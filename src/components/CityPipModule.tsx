import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, MapPin, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CityPipModule: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MessageSquare size={16} className="text-white" />,
      title: t("city_pip.ice_breakers", "Ice Breakers"),
      text: t("city_pip.ice_breakers_text", "Get everyone talking fast")
    },
    {
      icon: <Calendar size={16} className="text-white" />,
      title: t("city_pip.scheduling", "Smart Scheduling"),
      text: t("city_pip.scheduling_text", "Find time that works for all")
    },
    {
      icon: <MapPin size={16} className="text-white" />,
      title: t("city_pip.local_picks", "Local Picks"),
      text: t("city_pip.local_picks_text", "Great nearby spots for your vibe")
    }
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -right-16 w-64 h-64 rounded-full bg-pulse-pink/10 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/70 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-3">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                {t("city_pip.badge", "Your AI wingman")}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t("city_pip.headline", "Meet Pip, Your Social Wingman")}
              </h2>
              <p className="text-gray-300 mb-4 text-sm md:text-base">
                {t("city_pip.subtext", "From awkward silence to IRL plans, Pip energizes your chat and helps make hanging out actually happen.")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-gray-800/40 border border-gray-700 rounded-lg p-3 hover:border-accent/40 transition"
                  >
                    <div className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${
                      ['from-pink-500 to-purple-600', 'from-blue-500 to-cyan-400', 'from-stone-500 to-rose-500'][idx]
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm">{feature.title}</p>
                      <p className="text-gray-400 text-xs">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/meet-pip" className="inline-block">
                  <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95 px-6 py-3 text-sm rounded-full shadow-lg shadow-purple-500/30 transition transform hover:scale-[1.02]">
                    <span className="inline-flex items-center gap-2">
                      <Sparkles size={16} className="text-white" />
                      {t("city_pip.cta", "Meet Pip")}
                    </span>
                  </Button>
                </a>
                <a href="/plan-ideas" className="inline-block">
                  <Button variant="outline" className="border-pulse-pink text-pulse-pink hover:bg-pulse-pink hover:text-white px-6 py-3 text-sm rounded-full transition">
                    {t("city_pip.plan_ideas", "Get Ideas")}
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Compact Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative max-w-48">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue blur-xl opacity-20" />
                <img
                  src="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png"
                  alt={t("city_pip.image_alt", "Pip celebrating with friends")}
                  className="relative z-10 w-full rounded-2xl object-cover border border-gray-700 bg-gray-900/30 shadow-xl shadow-purple-500/20"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityPipModule;
