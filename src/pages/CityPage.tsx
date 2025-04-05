
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

const cities = {
  "san-francisco": "San Francisco",
  "los-angeles": "Los Angeles",
  "new-york": "New York",
  // Add more cities here as needed
};

type CityParam = {
  cityName: keyof typeof cities;
};

const CityPage = () => {
  const { cityName } = useParams<CityParam>();
  const formattedCityName = cities[cityName as keyof typeof cities] || "Your City";
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return <CityMatchmakingTemplate cityName={formattedCityName} />;
};

export default CityPage;
