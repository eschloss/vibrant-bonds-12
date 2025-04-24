
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

const Matchmaking = () => {
  return (
    <CityMatchmakingTemplate 
      cityName="Your City"
      code=""
      country="Worldwide"
      state=""
      image=""
    />
  );
};

export default Matchmaking;
