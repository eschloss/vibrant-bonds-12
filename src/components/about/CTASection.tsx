
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const CTASection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-20 bg-gray-800/30">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">{t("about.cta.title", "Ready to Meet New Friends?")}</h2>
          <p className="text-lg text-gray-300 mb-6">
            {t("about.cta.description", "Join our community and connect with like-minded people in your city who share your interests")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cities">
              <Button size="lg" variant="gradient" className="rounded-full shadow-lg shadow-pink-500/20 w-full sm:w-auto">
                {t("about.cta.button", "Get Matched into a Friend Group")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
