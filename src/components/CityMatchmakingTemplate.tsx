
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, ArrowRight, Zap, Timer, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "./mission/TimerDisplay";
import ShareSection from './ShareSection';
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  language
}: CityMatchmakingTemplateProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  {
    image && <Helmet>
    <link rel="preload" as="image" href={`https://${image}`} />
  </Helmet>;
  }

  const timeLeft = useCountdown();

  // Determine if we need to show the language selector
  // Show when website language is not English OR when API language differs from current site language
  const showLanguageSelector = currentLanguage !== "en" || (language && language !== currentLanguage);

  // Function to get URL for a specific language
  const getLanguageUrl = (targetLang: string) => {
    // Get current URL
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const hostname = urlObj.hostname;
    
    // Split the hostname into parts
    const hostParts = hostname.split('.');
    
    // If target language is English, remove any language subdomain
    if (targetLang === 'en') {
      // If we have a subdomain that's a language code (2 letters), remove it
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        const newHostname = hostParts.slice(1).join('.');
        urlObj.hostname = newHostname;
      }
    } else {
      // For non-English languages, add/replace the language subdomain
      if (hostParts.length > 2 && hostParts[0].length === 2) {
        // Replace existing language subdomain
        hostParts[0] = targetLang;
        urlObj.hostname = hostParts.join('.');
      } else {
        // Add language subdomain
        urlObj.hostname = `${targetLang}.${hostname}`;
      }
    }
    
    return urlObj.toString();
  };

  // Translate the steps
  const steps = [{
    icon: Users,
    title: t("city.steps.get_matched.title", "Get Matched"),
    description: t("city.steps.get_matched.description", "We'll match you with a small group of like-minded people."),
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: MessageSquare,
    title: t("city.steps.break_ice.title", "Break the Ice"),
    description: t("city.steps.break_ice.description", "Chat with fellow group members, guided by our conversation starters and games."),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: CalendarDays,
    title: t("city.steps.meet_up.title", "Meet Up in Real Life"),
    description: t("city.steps.meet_up.description", "We'll handle the planning and logistics — simply show up and enjoy yourself."),
    color: "bg-gradient-to-r from-indigo-400 to-blue-500"
  }, {
    icon: Sprout,
    title: t("city.steps.grow_friendships.title", "Grow the Friendships"),
    description: t("city.steps.grow_friendships.description", "After the initial meet, we'll help you grow your new connections."),
    color: "bg-gradient-to-r from-green-400 to-emerald-500"
  }];

  return <div className="flex flex-col min-h-screen dark">
      <Navbar />

      <main className="flex-grow">
<section className="relative flex items-center overflow-hidden section-padding bg-white dark:bg-white pt-32 md:pt-36 lg:pt-40">

  <>
    {/* Decorative background gradients (bottom layer) */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
    </div>

    {/* Floating decorative elements (above background) */}
    <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pulse-blue/30 animate-float z-20"></div>
    <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-pulse-purple/30 animate-pulse-slow z-20"></div>
    <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pulse-teal/30 animate-bounce-gentle z-20"></div>
    <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pulse-coral/20 animate-float-reverse z-20"></div>
    <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pulse-blue/20 animate-spin-slow z-20"></div>
    <div className="absolute top-[16%] right-[16%] w-10 h-10 rounded-full bg-pulse-coral/20 animate-bounce-gentle z-20"></div>
    <div className="absolute bottom-[20%] left-[20%] w-18 h-18 rounded-full bg-pulse-teal/15 animate-float z-20"></div>

    {/* Conditionally rendered custom background image */}
    {image && image !== "" && (
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-50"
        style={{
          backgroundImage: `url(https://${image})`
        }}
      />
    )}

    {/* Gradient overlay on top of image */}
    <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />
  </>

  {/* 🧠 Gradient overlay to increase readability */}
  <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white via-white/70 to-transparent z-0 pointer-events-none" />

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
      <h1 className="text-4xl font-bold mb-4 md:text-5xl text-black">
        {!code ? (
          <>
            {t("city.help_launch", "Help Launch Pulse in")}{" "}
            <span className="pulse-gradient-text">{cityName}</span>
          </>
        ) : (
          <>
            {t("city.meet_new", "Meet New")}{" "}
            {isQueer ? (
              <>
                {t("city.queer_friends", "Queer Friends")}<br />
              </>
            ) : (
              t("city.friends", "Friends ")
            )}
            {t("city.in", "in")} <span className="pulse-gradient-text">{cityName}</span>
          </>
        )}
      </h1>


      <motion.p className="whitespace-pre-line text-xl md:text-2xl font-normal mb-8 text-gray-800" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }}>
        {!code 
          ? t("city.signup_now", "Sign up now—you'll be first in line to match\nas soon as a few more locals join.")
          : t("city.making_friends", "Making friends as an adult can be hard. We're here to help.")}
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
            }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        
        {/* Language Selector */}
        {showLanguageSelector && (
          <div className="flex items-center gap-2">
            <Select 
              defaultValue={currentLanguage}
              onValueChange={(value) => {
                if (value !== currentLanguage) {
                  window.location.href = getLanguageUrl(value);
                }
              }}
            >
              <SelectTrigger className="w-[120px] bg-white/90 backdrop-blur-sm border border-gray-200">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-500" />
                  <SelectValue placeholder={currentLanguage.toUpperCase()} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                {language && language !== "en" && (
                  <SelectItem value={language}>
                    {language === "es" ? "Español" : language.toUpperCase()}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      </motion.div>
    </motion.div>
  </div>
      </section>


        <section className="relative py-16 bg-gray-900 dark:bg-gray-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="flex items-center gap-6 mb-16 last:mb-0">
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon className="text-white" size={40} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xl text-gray-300">{step.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>


        {code && <section className="relative py-20 bg-gray-900/80">
          <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                {t("city.ready_to_meet", "Ready to Meet")}<br/>
                {t("city.your_crew", "Your")} <span className="pulse-gradient-text">{cityName} {t("city.crew", "Crew")}</span>?
              </h2>


              <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center">
                <TimerDisplay {...timeLeft} />
                <p className="text-sm text-white/70 mt-4 text-center">
                  {t("city.until_next_match", "until the next friend group match closes")}
                </p>
              </div>
              
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}${isQueer ? '&queer=true' : ''}&language=${currentLanguage}` : ''}`}>
                <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto">
                  {t("city.get_matched_in_now", "Get Matched in")} {cityName} {t("city.now", "Now")}
                  <ArrowRight size={18} />
                </Button>
                </Link>

                {/* Language Selector - Second Location */}
                {showLanguageSelector && (
                  <div className="flex items-center gap-2">
                    <Select 
                      defaultValue={currentLanguage}
                      onValueChange={(value) => {
                        if (value !== currentLanguage) {
                          window.location.href = getLanguageUrl(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-[120px] bg-white/10 backdrop-blur-sm border border-white/30 text-white">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-white/70" />
                          <SelectValue placeholder={currentLanguage.toUpperCase()} />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        {language && language !== "en" && (
                          <SelectItem value={language}>
                            {language === "es" ? "Español" : language.toUpperCase()}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
          </div>
        </section>}


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
      
      {/* Language Selector - Third Location */}
      {showLanguageSelector && (
        <div className="flex justify-center mt-8">
          <Select 
            defaultValue={currentLanguage}
            onValueChange={(value) => {
              if (value !== currentLanguage) {
                window.location.href = getLanguageUrl(value);
              }
            }}
          >
            <SelectTrigger className="w-[120px] bg-white/10 backdrop-blur-sm border border-white/30 text-white">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-white/70" />
                <SelectValue placeholder={currentLanguage.toUpperCase()} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              {language && language !== "en" && (
                <SelectItem value={language}>
                  {language === "es" ? "Español" : language.toUpperCase()}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </motion.div>
  </div>
</section>
      </main>

      <Footer />
    </div>;
};

export default CityMatchmakingTemplate;
