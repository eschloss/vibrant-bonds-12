
import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
 
import ShareSection from './ShareSection';
import ActivitiesTeaser from './ActivitiesTeaser';
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import { trackTypeformRedirect } from "@/lib/utils";
import PreWaitlisterDialog from './PreWaitlisterDialog';

interface CommunityMatchmakingTemplateProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
  active?: boolean;
  frequency_days?: number;
  communityData: {
    title1: string;
    title2: string;
    subtitle?: string;
    title2_part2?: string;
    powered_by: string;
    business_name: string;
    business_image: string;
    business_url: string;
    submatchId: string;
    cityLabel: string;
  };
}

const CommunityMatchmakingTemplate = ({
  cityName,
  code,
  country,
  state,
  image,
  active,
  frequency_days: _frequency_days,
  communityData
}: CommunityMatchmakingTemplateProps) => {
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
          <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pulse-blue/30 animate-float z-20 pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pulse-teal/30 animate-bounce-gentle z-20 pointer-events-none"></div>
          <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pulse-coral/20 animate-float-reverse z-20 pointer-events-none"></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pulse-blue/20 animate-spin-slow z-20 pointer-events-none"></div>
          <div className="absolute top-[16%] right-[16%] w-10 h-10 rounded-full bg-pulse-coral/20 animate-bounce-gentle z-20 pointer-events-none"></div>
          <div className="absolute bottom-[20%] left-[20%] w-18 h-18 rounded-full bg-pulse-teal/15 animate-float z-20 pointer-events-none"></div>

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
                {communityData.title1}
                <br />
                {communityData.title2} <span className="pulse-gradient-text">{communityData.title2_part2 || cityName}</span>
              </h1>

              {/* Business branding line for communities */}
              {communityData.business_name && (
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
                {communityData.subtitle || t("city.making_friends", "Making friends as an adult can be hard. We're here to help.")}
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
                <PreWaitlisterDialog cityName={cityName} city={code} isCommunity={true} state={state} />
               ) : (
                <div id="button-link1" className="flex flex-col items-center">
                  <Link 
                     to={`https://form.pulsenow.app${code ? `?city=${code}&cityLabel=${encodeURIComponent(communityData.cityLabel)}&submatch=${communityData.submatchId}&language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}` : `?language=${currentLanguage}&redirect=${encodeURIComponent(currentUrl)}${refParam ? `&ref=${encodeURIComponent(refParam)}` : ''}`}`}
                     onClick={(e) => {
                       const href = (e.currentTarget as HTMLAnchorElement).href;
                       trackTypeformRedirect({ href, cityName, code, source: 'community:hero_cta' });
                     }}
                   >
                    <Button size="xl" className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110">
                      <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
                      <span className="relative z-10">
                        {t("city.get_matched", "Get Matched")}
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
                <LanguageSelector variant="light" />
                
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

        

        <ActivitiesTeaser />

        <ShareSection />
      </main>

      <Footer />
    </div>
  );
};

export default CommunityMatchmakingTemplate;
