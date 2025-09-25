import { motion } from "framer-motion";
import { Apple, Play, Users, MessageSquare, Sparkles, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const APP_IMAGE = "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/1024x.png";

const PulseAppPromo = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/70 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
                <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
                {t("pulseapp.badge", "MATCH • CHAT • MEET")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                {t("pulseapp.headline", "Pulse makes meeting your new crew effortless")}
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                {t(
                  "pulseapp.subtext",
                  "Pulse matches you into a small group in your city, drops you into a shared chat, and Pip the penguin breaks the ice with fun prompts. Then Pip lines up activities so you can go on unforgettable adventures—together."
                )}
              </p>

              <ul className="space-y-3 mb-6">
                {[{
                  icon: <Users size={18} className="text-white" />, text: t("pulseapp.point1", "Smart group matching by vibe and interests")
                }, {
                  icon: <MessageSquare size={18} className="text-white" />, text: t("pulseapp.point2", "Instant group chat with icebreakers from Pip")
                }, {
                  icon: <MapPin size={18} className="text-white" />, text: t("pulseapp.point3", "Curated local plans so hanging out actually happens")
                }, {
                  icon: <Sparkles size={18} className="text-white" />, text: t("pulseapp.point4", "Keep the momentum with weekly meetups")
                }].map((it, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-gray-800/40 border border-gray-700 rounded-xl p-3">
                    <div className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${[
                      'from-pink-500 to-purple-600',
                      'from-blue-500 to-cyan-400',
                      'from-stone-500 to-rose-500',
                      'from-green-400 to-emerald-500',
                    ][idx % 4]}`}>{it.icon}</div>
                    <p className="text-gray-200">{it.text}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="relative max-w-md mx-auto">
                <img
                  src={APP_IMAGE}
                  alt={t("pulseapp.image_alt", "Pulse app preview")}
                  className="relative z-10 w-full rounded-3xl object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                />
              </div>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://apps.apple.com/us/app/pulse-spontaneous-plans/id6472660833" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-3 rounded-md">
                  <Apple size={18} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white/70">{t("footer.download_on", "Download on the")}</span>
                    <span className="text-sm font-medium">{t("footer.app_store_full", "App Store")}</span>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=eu.kikiapp.kiki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-3 rounded-md">
                  <Play size={18} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white/70">{t("footer.get_it_on", "Get it on")}</span>
                    <span className="text-sm font-medium">{t("footer.google_play", "Google Play")}</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PulseAppPromo;


