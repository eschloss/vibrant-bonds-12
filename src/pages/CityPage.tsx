
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

// This object should match the city data structure in CityList.tsx
const cities = {
  // United States
  "san-francisco": { name: "San Francisco", country: "United States", state: "California" },
  "los-angeles": { name: "Los Angeles", country: "United States", state: "California" },
  "new-york": { name: "New York", country: "United States", state: "New York" },
  "chicago": { name: "Chicago", country: "United States", state: "Illinois" },
  "miami": { name: "Miami", country: "United States", state: "Florida" },
  "seattle": { name: "Seattle", country: "United States", state: "Washington" },
  "austin": { name: "Austin", country: "United States", state: "Texas" },
  "boston": { name: "Boston", country: "United States", state: "Massachusetts" },
  "denver": { name: "Denver", country: "United States", state: "Colorado" },
  "portland": { name: "Portland", country: "United States", state: "Oregon" },
  "nashville": { name: "Nashville", country: "United States", state: "Tennessee" },
  "atlanta": { name: "Atlanta", country: "United States", state: "Georgia" },
  
  // Canada
  "toronto": { name: "Toronto", country: "Canada" },
  "vancouver": { name: "Vancouver", country: "Canada" },
  "montreal": { name: "Montreal", country: "Canada" },
  
  // United Kingdom
  "london": { name: "London", country: "United Kingdom" },
  "manchester": { name: "Manchester", country: "United Kingdom" },
  "edinburgh": { name: "Edinburgh", country: "United Kingdom" },
  
  // Australia
  "sydney": { name: "Sydney", country: "Australia" },
  "melbourne": { name: "Melbourne", country: "Australia" },
  "brisbane": { name: "Brisbane", country: "Australia" },
  
  // Germany
  "berlin": { name: "Berlin", country: "Germany" },
  "munich": { name: "Munich", country: "Germany" },
  "hamburg": { name: "Hamburg", country: "Germany" },
};

type CityParam = {
  cityName: keyof typeof cities;
};

const CityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
  const cityData = cities[cityName as keyof typeof cities];
  
  useEffect(() => {
    // If city doesn't exist, redirect to cities list
    if (!cityData && cityName) {
      navigate("/cities");
      return;
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, [cityName, cityData, navigate]);

  // If city is not found, return null (redirect will happen in useEffect)
  if (!cityData) return null;

  return <CityMatchmakingTemplate cityName={cityData.name} />;
};

export default CityPage;
