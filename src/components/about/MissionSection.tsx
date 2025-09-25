
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const MissionSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t("about.mission.title", "Our Mission")}</h2>
          <Separator className="w-20 h-1 bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] rounded-full mx-auto mt-4 mb-8" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-5xl font-extrabold leading-tight uppercase tracking-wide md:tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF]">
              {t("about.mission.statement", "Making it effortless to meet new friends and create lasting memories together.")}
            </span>
          </h3>
          <div className="mt-6">
            <Link to="/cities">
              <Button size="lg" variant="gradient" className="rounded-full">
                {t("about.mission.cta", "Meet Your Crew")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
