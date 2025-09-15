
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, ArrowRight, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "./mission/TimerDisplay";
import ShareSection from './ShareSection';
import CityPipModule from './CityPipModule';
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { trackTypeformRedirect } from "@/lib/utils";
import PreWaitlisterForm from './PreWaitlisterForm';

interface CityMatchmakingTemplateProps {
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
  isCommunity?: boolean;
  active?: boolean;
  frequency_days?: number;
  communityData?: {
    title1: string;
    title2: string;
    powered_by: string;
    business_name: string;
    business_image: string;
    business_url: string;
    submatchId: string;
    cityLabel: string;
  };
}

const CityMatchmakingTemplate = ({
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
  isCommunity,
  active,
  frequency_days,
  communityData
}: CityMatchmakingTemplateProps) => {
  const { t, currentLanguage } = useTranslation();

  // Get the current full URL for redirect parameter
  const currentUrl = window.location.href;
  
  // Extract ref parameter from current URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');

  const peopleOptions: string[] = [
    "https://s.kikiapp.eu/img/people/friends1.avif",
    "https://s.kikiapp.eu/img/people/friends2.avif",
    "https://s.kikiapp.eu/img/people/friends3.avif",
    "https://s.kikiapp.eu/img/people/friends4.avif",
    "https://s.kikiapp.eu/img/people/friends5.avif",
    "https://s.kikiapp.eu/img/people/friends6.avif",
  ];
  
  function cityScore(cityName: string, state?: string, country?: string): number {
    const citySum = cityName
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const stateSum = state ? state
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
    const countrySum = country ? country
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
    
    const today = new Date();
    const dayOfMonth = today.getDate();
  
    const total = citySum + dayOfMonth + stateSum + countrySum;
  
    return total;
  }
  
  const peopleImage = peopleOptions[cityScore(cityName, state, country) % peopleOptions.length];

  const timeLeft = useCountdown(frequency_days);

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

  return (
    <div className="flex flex-col min-h-screen dark">
      {image && (
        <Helmet>
          <link rel="preload" as="image" href={`https://${image}`} />
        </Helmet>
      )}

      <Navbar />

      <main className="flex-grow">
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
                {isCommunity && communityData ? (
                  <>
                    {communityData.title1} <span className="pulse-gradient-text">{communityData.title2}</span>
                  </>
                ) : !code ? (
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
                    {t("city.in", "in")} <Link to="/cities"><span className="pulse-gradient-text">{cityName}</span>
                    </Link>
                  </>
                )}
              </h1>

              {/* Business branding line for communities */}
              {isCommunity && communityData && communityData.business_name && (
                <div className="flex items-center justify-center gap-3 mb-8 mt-2">
                  <span className="text-base text-gray-600 font-medium">{communityData.powered_by}</span>
                  {communityData.business_image && (
                    communityData.business_url ? (
                      <a href={communityData.business_url} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={`https://${communityData.business_image}`} 
                          alt={communityData.business_name}
                          className="h-10 max-w-20 object-contain cursor-pointer"
                        />
                      </a>
                    ) : (
                      <img 
                        src={`https://${communityData.business_image}`} 
                        alt={communityData.business_name}
                        className="h-10 max-w-20 object-contain"
                      />
                    )
                  )}
                  {communityData.business_url ? (
                    <a href={communityData.business_url} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-gray-800 hover:text-gray-600 transition-colors">
                      {communityData.business_name}
                    </a>
                  ) : (
                    <span className="text-base font-bold text-gray-800">{communityData.business_name}</span>
                  )}
                </div>
              )}

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
                }} className="flex flex-col sm:flex-row gap-4 sm:items-start items-center justify-center">
                
               {!active ? (
                <div className="flex flex-col items-center">
                  <PreWaitlisterForm cityName={cityName} city={code} />
                  {state && (
                    <div className="text-sm text-black/60 mt-2 text-center font-light">
                      {cityName}, {state}
                    </div>
                  )}
                </div>
               ) : (
                <div id="button-link1" className="flex flex-col items-center">
                  <Link 
                     to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(isCommunity && communityData ? communityData.cityLabel : cityName)}${isQueer ? '&queer=true' : ''}${isCommunity && communityData ? `&submatch=${communityData.submatchId}` : isAffinity && affinityUrl ? `&submatch=${affinityUrl}` : ''}&language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}` : `?language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}`}`}
                     onClick={(e) => {
                       const href = (e.currentTarget as HTMLAnchorElement).href;
                       trackTypeformRedirect({ href, cityName, code, source: 'city:hero_cta' });
                     }}
                   >
                    <Button size="xl" className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110">
                      <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
                      <span className="relative z-10">
                        {isCommunity ? t("city.get_matched", "Get Matched") : `${t("city.get_matched_in", "Get Matched in")} ${cityName}`}
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
               )}

                {/* Language Selector */}
                <LanguageSelector language={language} variant="light" />
                
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
              {steps.map((step, index) => (
                <motion.div key={index} initial={{
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* City Pip Module removed per request */}

        {code && (
          <section className="relative py-20 bg-gray-900/80">
            <div className="max-w-4xl mx-auto text-center">
                
                {active ? (
                  <>
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
                    
                    <div id="button-link2" className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                      
                      <Link to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(isCommunity && communityData ? communityData.cityLabel : cityName)}${isQueer ? '&queer=true' : ''}${isCommunity && communityData ? `&submatch=${communityData.submatchId}` : isAffinity && affinityUrl ? `&submatch=${affinityUrl}` : ''}&language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}` : `?language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}`}`}
                        onClick={(e) => {
                          const href = (e.currentTarget as HTMLAnchorElement).href;
                          trackTypeformRedirect({ href, cityName, code, source: 'city:timer_cta' });
                        }}
                      >
                        <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto">
                          {isCommunity ? t("city.get_matched", "Get Matched") : `${t("city.get_matched_in_now", "Get Matched in")} ${cityName} ${t("city.now", "Now")}`}
                          <ArrowRight size={18} />
                        </Button>
                      </Link>

                      {/* Language Selector - Second Location */}
                       <LanguageSelector language={language} variant="dark" />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center">
                    <PreWaitlisterForm cityName={cityName} city={code} />
                  </div>
                )}
            </div>
          </section>
        )}

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
      </main>

      <Footer />
    </div>
  );
};

export default CityMatchmakingTemplate;
