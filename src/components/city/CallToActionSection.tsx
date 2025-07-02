
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "../mission/TimerDisplay";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "../LanguageSelector";

interface CallToActionSectionProps {
  cityName: string;
  code: string;
  isQueer?: boolean;
  isAffinity?: boolean;
  affinityUrl?: string;
  language?: string;
}

const CallToActionSection = ({
  cityName,
  code,
  isQueer,
  isAffinity,
  affinityUrl,
  language
}: CallToActionSectionProps) => {
  const { t, currentLanguage } = useTranslation();
  const timeLeft = useCountdown();

  // Get the current full URL for redirect parameter and fix %2F encoding
  const currentUrl = (window.location.pathname + window.location.search + window.location.hash)
    .replace(/%2F/g, '/'); // Convert %2F to /

  if (!code) return null;

  return (
    <section className="relative py-20 bg-gray-900/80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          {t("city.ready_to_meet", "Ready to Meet")}<br/>
          {t("city.your_crew", "Your")} <span className="pulse-gradient-text">
            {cityName} {t("city.crew", "Crew")}
          </span>?
        </h2>

        <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center">
          <TimerDisplay {...timeLeft} />
          <p className="text-sm text-white/70 mt-4 text-center">
            {t("city.until_next_match", "until the next friend group match closes")}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}${isQueer ? '&queer=true' : ''}${isAffinity && affinityUrl ? `&submatch=${affinityUrl}` : ''}&language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}` : `?language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}`}`}>
            <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto">
              {t("city.get_matched_in_now", "Get Matched in")} {cityName} {t("city.now", "Now")}
              <ArrowRight size={18} />
            </Button>
          </Link>

          {/* Language Selector - Second Location */}
          <LanguageSelector language={language} variant="dark" />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
