
import React from "react";
import { motion } from "framer-motion";
import ShareSection from "@/components/ShareSection";
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";

const ShareCallout: React.FC = () => {
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
              <Text id="share_callout.title" className="">Spread the word</Text>
            </span>
          </h2>

          <div className="w-32 h-1 mx-auto mb-6 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue rounded-full animate-glow-bar" />

          <motion.p
            className="whitespace-pre-line text-lg md:text-xl text-white/90 font-medium drop-shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Text id="share_callout.description" className="">Share Pulse with friends and help grow your local crew.</Text>
          </motion.p>

          <ShareSection />
        </motion.div>
      </div>
    </section>
  );
};

export default ShareCallout;
