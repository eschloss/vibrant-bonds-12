import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCountdown } from "@/hooks/useCountdown";
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from "@/contexts/LanguageContext";

interface CityMatchmakingTemplateProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
  isQueer?: boolean;
  language?: string;
}

const CityMatchmakingTemplate = ({
  cityName,
  code,
  country,
  state,
  image,
  isQueer,
}: CityMatchmakingTemplateProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
    }
  }, [image]);

  const { days, hours, minutes, seconds } = useCountdown();

  const steps = [
    {
      title: t("city.step_1_title", "Join the Waitlist"),
      description: t("city.step_1_description", "Be the first to know when we launch in your city."),
    },
    {
      title: t("city.step_2_title", "Spread the Word"),
      description: t("city.step_2_description", "Share with your friends and community to unlock Pulse sooner."),
    },
    {
      title: t("city.step_3_title", "Get Matched"),
      description: t("city.step_3_description", "Once we launch, get matched with like-minded people in your city!"),
    },
  ];

  return <div className="flex flex-col min-h-screen dark">
      <Navbar />

      <main className="flex-grow">
        <section className="relative flex items-center overflow-hidden section-padding bg-white dark:bg-white pt-32 md:pt-36 lg:pt-40">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-black opacity-40 z-0" />
            {image && <img src={image} alt={`${cityName} Skyline`} className="absolute inset-0 object-cover w-full h-full object-center opacity-30 dark:opacity-10" />}
          </div>
          <div className="container mx-auto px-4 relative z-10 my-[31px]">
            <motion.div initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    duration: 0.7
                  }} className="text-center max-w-3xl mx-auto relative z-10">
              <motion.h1 initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      duration: 0.7
                    }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 font-display">
                {t("city.title", "Meet Your Crew in")} {cityName}
                {state ? `, ${state}` : ""}
              </motion.h1>
              <motion.p initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      delay: 0.2,
                      duration: 0.5
                    }} className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {t("city.description", "IRL community is coming to")} {cityName}! {t("city.description_2", "Join the waitlist to be the first to know when we launch.")}
              </motion.p>
              <motion.div initial={{
                      opacity: 0,
                      y: 10
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      delay: 0.4,
                      duration: 0.5
                    }} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link 
                  to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}${isQueer ? '&queer=true' : ''}&language=${currentLanguage}` : `?language=${currentLanguage}`}`}
                >
                  <Button size="xl" className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110">
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
                    <span className="relative z-10">
                      {t("city.get_matched_in", "Get Matched in")} {cityName}
                      {state ? `, ${state}` : ""}
                    </span>
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-display">
                {t("city.how_it_works_title", "How Pulse Works")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("city.how_it_works_description", "Our simple 3-step process to help you find your people.")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center px-4">
                  <div className="w-16 h-16 mx-auto bg-pulse-pink/20 dark:bg-pulse-pink/40 rounded-full flex items-center justify-center text-pulse-pink text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 font-display">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 font-display">
                {t("city.launching_soon_title", "Launching Soon")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t("city.launching_soon_description", "We're working hard to bring Pulse to")} {cityName}. {t("city.launching_soon_description_2", "Join the waitlist to be notified when we launch!")}
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-pulse-pink">{days}</div>
                <div className="text-4xl font-bold text-pulse-purple">{hours}</div>
                <div className="text-4xl font-bold text-pulse-blue">{minutes}</div>
                {/* <div className="text-4xl font-bold text-green-500">{seconds}</div> */}
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>{t("city.days", "Days")}</span>
                <span>{t("city.hours", "Hours")}</span>
                <span>{t("city.minutes", "Minutes")}</span>
                {/* <span>Seconds</span> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LanguageSelector />
    </div>;
};

export default CityMatchmakingTemplate;
