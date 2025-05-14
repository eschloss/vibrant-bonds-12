import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

const Matchmaking = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <CityMatchmakingTemplate 
      cityName="Your City"
      code=""
      country="Worldwide"
      state=""
      image=""
      language={currentLanguage !== "en" ? currentLanguage : undefined}
    />
  );
};

export default Matchmaking;
