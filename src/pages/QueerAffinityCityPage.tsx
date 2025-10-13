
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

type QueerAffinityCityParam = {
  cityName: string;
  affinityName: string;
};

interface AffinityData {
  name_en: string;
  name_es: string;
  url: string;
  all_cities: boolean;
  cities: string[];
}

const QueerAffinityCityPage = () => {
  const { cityName, affinityName } = useParams<QueerAffinityCityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [cityData, setCityData] = useState<{ 
    name: string; 
    country: string; 
    state?: string; 
    code: string;
    image?: string;
    language?: string;
    lat?: number;
    lng?: number;
    active?: boolean;
    frequency_days?: number;
  } | null>(null);
  const [affinityData, setAffinityData] = useState<AffinityData | null>(null);

  const displayAffinityName = affinityData ? 
    (currentLanguage === 'es' ? affinityData.name_es : affinityData.name_en) : 
    '';

  const seoProps = {
    title: {
      en: cityData && affinityData
        ? `Meet Queer ${affinityData.name_en} Friends in ${cityData.name} | Pulse App`
        : 'Find Your Queer Community | Pulse App',
      es: cityData && affinityData
        ? `Conoce Amigues Queer ${affinityData.name_es} en ${cityData.name} | Pulse App`
        : 'Encuentra Tu Comunidad Queer | Pulse App'
    },
    description: {
      en: cityData && affinityData
        ? `Meet queer ${affinityData.name_en.toLowerCase()} friends in ${cityData.name}. Join groups, plan IRL meetups, and make real connections in ${cityData.name} with Pulse.`
        : `Meet queer friends near you. Join groups, plan IRL meetups, and build real connections with Pulse.`,
      es: cityData && affinityData
        ? `Conoce amigues queer de ${affinityData.name_es.toLowerCase()} en ${cityData.name}. Únete a grupos, planifica quedadas en persona y crea conexiones reales en ${cityData.name} con Pulse.`
        : `Conoce amigues queer cerca de ti. Únete a grupos, planifica quedadas en persona y crea conexiones reales con Pulse.`
    },
    keywords: cityData && affinityData ? [
      `${cityData.name} ${affinityData.name_en} friends`,
      `meet ${affinityData.name_en.toLowerCase()} friends in ${cityData.name}`,
      `${cityData.name} ${affinityData.name_en.toLowerCase()} community`
    ] : ['queer friends', 'affinity groups'],
    image: typeof cityData?.image === "string" ? cityData.image : undefined,
    geoData: {
      name: cityData
        ? `${String(cityData.name)}${cityData.state ? `, ${String(cityData.state)}` : ''}, ${String(cityData.country)}`
        : 'Unspecified City',
      lat: cityData ? cityData.lat : 0,
      lng: cityData ? cityData.lng : 0,
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both cities and affinities data
        const [citiesResponse, affinitiesResponse] = await Promise.all([
          fetch("https://api.kikiapp.eu/auth/get_all_cities_expanded"),
          fetch("https://api.kikiapp.eu/auth/get_all_affinities")
        ]);

        const citiesData = await citiesResponse.json();
        const affinitiesData = await affinitiesResponse.json();

        // Find matching city
        const matchedCity = citiesData.find((city: any) => {
          const citySlug = city.url2.replace(/^\//, '').toLowerCase();
          return citySlug === cityName?.toLowerCase();
        });

        // Find matching affinity
        const matchedAffinity = affinitiesData.find((affinity: AffinityData) => 
          affinity.url.toLowerCase() === affinityName?.toLowerCase()
        );

        // If either city or affinity is not found, redirect to cities
        if (!matchedCity || !matchedAffinity) {
          navigate("/cities");
          return;
        }

        // Check if this affinity is available for this city
        const isAffinityAvailable = matchedAffinity.all_cities || 
          matchedAffinity.cities.includes(matchedCity.code);

        if (!isAffinityAvailable) {
          navigate("/cities");
          return;
        }

        // Set city data with language-specific names
        const nameField = currentLanguage === 'es' ? 'es_name' : 'en_name';
        const countryField = currentLanguage === 'es' ? 'es_country' : 'en_country';
        const stateField = currentLanguage === 'es' ? 'es_state' : 'en_state';

        setCityData({
          name: matchedCity[nameField] || matchedCity.en_name,
          country: matchedCity[countryField] || matchedCity.en_country,
          state: matchedCity[stateField] || matchedCity.en_state,
          code: matchedCity.code,
          image: matchedCity.image,
          language: matchedCity.language,
          lat: matchedCity.lat,
          lng: matchedCity.lng,
          active: matchedCity.active, // Get active status from API
          frequency_days: matchedCity.frequency_days // Get frequency days from API
        });

        setAffinityData(matchedAffinity);

        window.scrollTo(0, 0);
        document.documentElement.classList.add('dark');
      } catch (err) {
        console.error("Failed to fetch data:", err);
        navigate("/cities");
      }
    };

    if (cityName && affinityName) {
      fetchData();
    }
  }, [cityName, affinityName, navigate, currentLanguage]);

  if (!cityData || !affinityData) return null;

  return (
    <>
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={cityData.name}
        code={cityData.code}
        country={cityData.country}
        state={cityData.state}
        image={cityData.image}
        isQueer={true}
        isAffinity={true}
        affinityName={displayAffinityName}
        affinityUrl={affinityData.url}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
      />
    </>
  );
};

export default QueerAffinityCityPage;
