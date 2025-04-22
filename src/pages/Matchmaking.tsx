import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";


const CityPage = () => {
  const navigate = useNavigate();

  return <CityMatchmakingTemplate 
           cityName="Your City2"
           code={cityData.code} 
           country={cityData.country} 
           state={cityData.state}
           image={cityData.image}
          />;
};

export default CityPage;
