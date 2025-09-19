
import { useEffect } from "react";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

const Matchmaking = () => {
  const { currentLanguage, translate } = useLanguage();
  
  const seoProps = {
    title: {
      en: "Get Matched with Your Crew | Pulse App",
      es: "Únete a Tu Grupo | Pulse App"
    },
    description: {
      en: "Find your perfect friend group and plan real-life meetups with Pulse's matchmaking",
      es: "Encuentra tu grupo ideal de amigos y planifica encuentros en la vida real con el emparejamiento de Pulse"
    },
    keywords: ["friend matching", "group matching", "meet new people", "friend finder", "social connections", "meetup planning"],
    type: "website"
  };
  
  return (
    <>
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={translate("city.your_city", "Your City")}
        code=""
        country="Worldwide"
        state=""
        image=""
        language={currentLanguage !== "en" ? currentLanguage : undefined}
      />
    </>
  );
};

export default Matchmaking;
