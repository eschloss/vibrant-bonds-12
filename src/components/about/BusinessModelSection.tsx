import { motion } from "framer-motion";
import { DollarSign, Handshake, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const BusinessModelSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-20 bg-gray-800/30 overflow-hidden">
      {/* subtle background orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pulse-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-pulse-blue/20 blur-3xl" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-4">
            <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
            {t("about.model.badge", "Aligned incentives")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF]">
              {t("about.model.title", "We Grow When You Meet, Not When You Scroll")}
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            {t(
              "about.model.subtitle",
              "Unlike traditional social media, our incentives are aligned with your real life. We make money when people meet in person—through group matching, events, and partner experiences—not by keeping you glued to a feed."
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-[1px] rounded-2xl bg-gradient-to-br from-[#FF2688]/30 via-[#741ADD]/20 to-[#38D1BF]/30"
          >
            <div className="rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur-sm p-6 hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <Handshake className="h-6 w-6 text-pulse-blue" />
                <h3 className="text-xl font-semibold">
                  {t("about.model.value.title", "Aligned with Your Friendships")}
                </h3>
              </div>
              <p className="text-gray-300">
                {t(
                  "about.model.value.desc",
                  "Our product is designed to reduce screen time and increase face time. The better we are at helping you form real friendships, the better our business does."
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-[1px] rounded-2xl bg-gradient-to-br from-[#38D1BF]/30 via-[#741ADD]/20 to-[#FF2688]/30"
          >
            <div className="rounded-2xl border border-gray-700 bg-gray-900/60 backdrop-blur-sm p-6 hover:translate-y-[-4px] transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-6 w-6 text-[#22c55e]" />
                <h3 className="text-xl font-semibold">
                  {t("about.model.how.title", "How We Make Money")}
                </h3>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>{t("about.model.how.item1", "Premium group matching tiers")}</li>
                <li>{t("about.model.how.item2", "Event passes and curated experiences")}</li>
                <li>{t("about.model.how.item3", "Local partnerships that benefit members")}</li>
              </ul>
            </div>
          </motion.div>
        </div>

        
      </div>
    </section>
  );
};

export default BusinessModelSection;


