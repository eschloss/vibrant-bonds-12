
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import ShareSection from '../ShareSection';

interface ShareCTASectionProps {
  code: string;
}

const ShareCTASection = ({ code }: ShareCTASectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-gray-900 dark:bg-gray-950">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text">
            <span className="pulse-gradient-text">
              {!code ? t("city.want_it_sooner", "Want it sooner?") : t("city.spread_the_word", "Spread the word")}
            </span>
          </h2>

          <div className="w-32 h-1 mx-auto mb-6 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue rounded-full animate-glow-bar" />

          <motion.p
            className="whitespace-pre-line text-lg md:text-xl text-white/90 font-medium drop-shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {!code
              ? t("city.every_signup", "Every signup moves your city up the list.\nHelp us launch faster by sharing Pulse.")
              : t("city.share_with_friends", "Share Pulse with friends and help grow your local crew.")}
          </motion.p>

          <ShareSection />
        </motion.div>
      </div>
    </section>
  );
};

export default ShareCTASection;
