
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "../LanguageSelector";
import { useRefParam } from "@/hooks/useRefParam";

interface HeroSectionProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
  isQueer?: boolean;
  isAffinity?: boolean;
  affinityName?: string;
  affinityUrl?: string;
  language?: string;
  peopleImage: string;
}

const HeroSection = ({
  cityName,
  code,
  country,
  state,
  image,
  isQueer,
  isAffinity,
  affinityName,
  affinityUrl,
  language,
  peopleImage
}: HeroSectionProps) => {
  const { t, currentLanguage } = useTranslation();
  const { addRefToUrl } = useRefParam();

  // Get the current full URL for redirect parameter and fix %2F encoding
  const currentUrl = (window.location.pathname + window.location.search + window.location.hash)
    .replace(/%2F/g, '/'); // Convert %2F to /
  
  // Extract ref parameter from current URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');

  return (
    <section className="relative flex items-center overflow-hidden section-padding bg-white dark:bg-white pt-32 md:pt-36 lg:pt-40">
      {/* Decorative background gradients (bottom layer) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
      </div>

      {/* Floating decorative elements (above background) */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pulse-blue/30 animate-float z-20"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pulse-teal/30 animate-bounce-gentle z-20"></div>
      <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pulse-coral/20 animate-float-reverse z-20"></div>
      <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pulse-blue/20 animate-spin-slow z-20"></div>
      <div className="absolute top-[16%] right-[16%] w-10 h-10 rounded-full bg-pulse-coral/20 animate-bounce-gentle z-20"></div>
      <div className="absolute bottom-[20%] left-[20%] w-18 h-18 rounded-full bg-pulse-teal/15 animate-float z-20"></div>

      {/* Conditionally rendered custom background image */}
      {image && image !== "" && (
        <motion.div
          key={image}
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 0.5, filter: "blur(0px)" }}
          transition={{ delay: 2, duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-50"
          style={{
            backgroundImage: `url(https://${image})`
          }}
        />
      )}

      {(!image || image == "") && (
        <motion.div
          key={peopleImage}
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 0.5, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-50"
          style={{
            backgroundImage: `url(${peopleImage})`
          }}
        />
      )}

      {/* Gradient overlay on top of image */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />

      {/* Gradient overlay to increase readability */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white via-white/70 to-transparent z-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 my-[31px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <h1 className="text-4xl font-bold mb-4 md:text-5xl text-black">
            {!code ? (
              <>
                {t("city.help_launch", "Help Launch Pulse in")}{" "}
                <span className="pulse-gradient-text">{cityName}</span>
              </>
            ) : (
              <>
                {t("city.meet_new", "Meet New")}
                {isQueer && isAffinity ? <><br /></> : " "}
                {isQueer && isAffinity ? (
                  <>
                    {currentLanguage === 'es' ? (
                      <>amigos queer {affinityName}</>
                    ) : (
                      <>
                        {t("city.queer", "Queer")} {affinityName} {t("city.friends", "Friends")}
                      </>
                    )}
                    <br />
                  </>
                ) : isQueer ? (
                  <>
                    {t("city.queer_friends", "Queer Friends")}<br />
                  </>
                ) : isAffinity ? (
                  <>
                    {currentLanguage === 'es' ? (
                      <>amigos {affinityName}</>
                    ) : (
                      <>{affinityName} {t("city.friends", "Friends")}</>
                    )}
                    <br />
                  </>
                ) : (
                  <>
                    {t("city.friends", "Friends ")}<br />
                  </>
                )}
                {t("city.in", "in")} <Link to={addRefToUrl("/cities")}><span className="pulse-gradient-text">{cityName}</span></Link>
              </>
            )}
          </h1>

          <motion.p 
            className="whitespace-pre-line text-xl md:text-2xl font-normal mb-8 text-gray-800" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {!code 
              ? t("city.signup_now", "Sign up now—you'll be first in line to match\nas soon as a few more locals join.")
              : t("city.making_friends", "Making friends as an adult can be hard. We're here to help.")}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.5 }} 
            className="flex flex-col sm:flex-row gap-4 sm:items-start items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <Link 
                to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}${isQueer ? '&queer=true' : ''}${isAffinity && affinityUrl ? `&submatch=${affinityUrl}` : ''}&language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}` : `?language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}`}`}
              >
                <Button size="xl" className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110">
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
                  <span className="relative z-10">
                    {t("city.get_matched_in", "Get Matched in")} {cityName}
                  </span>
                  <ArrowRight size={18} />
                </Button>
              </Link>
              {state && (
                <div className="text-sm text-black/60 mt-2 text-center font-light">
                  {cityName}, {state}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <LanguageSelector language={language} variant="light" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
