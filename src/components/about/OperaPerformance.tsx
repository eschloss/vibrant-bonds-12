import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const OperaPerformance = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-8 md:pt-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-gray-700 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <img
            src={t(
              "journey.opera.image",
              "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/204.jpg"
            )}
            alt={t("journey.opera.alt", "Eric performing opera on stage")}
            className="w-full h-auto object-cover max-h-[70vh]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between">
            <p className="text-sm md:text-base text-gray-200">
              {t("journey.opera.caption", "Eric performing on stage as a professional opera singer")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OperaPerformance;


