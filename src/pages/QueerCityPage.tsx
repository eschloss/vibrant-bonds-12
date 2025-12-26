import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";

type CityParam = {
  cityName: string;
};

const QueerCityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const fallbackCityName = useMemo(() => {
    if (!cityName) return "";
    return cityName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [cityName]);
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
    bq?: boolean;
  }>({
    name: fallbackCityName,
    country: "",
    state: "",
    code: "",
    image: undefined,
    language: currentLanguage,
    lat: 0,
    lng: 0,
    active: false,
    frequency_days: undefined,
    bq: undefined
  });

  const { data: cities, loading } = useApiJson<any[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });
  // fetch compact cities to read `bq`
  const { data: citiesCompact } = useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });

  const seoProps = {
    title: {
      en: cityData
        ? `Meet Gay, Lesbian, & Queer Friends in ${cityData.name} | Pulse App`
        : 'Find LGBTQ+, Gay, Lesbian, & Queer Friends Near You | Pulse App',
      es: cityData
        ? `Conoce Amigues Gay, Lesbianas y Queer en ${cityData.name} | Pulse App`
        : 'Encuentra Amigues LGBTQ+, Gay, Lesbianas y Queer Cerca de Ti | Pulse App'
    },
    description: {
      en: cityData
        ? `Meet LGBTQ+ friends in ${cityData.name}. Join queer friend groups, plan IRL meetups, and make real connections in ${cityData.name} with Pulse.`
        : `Meet LGBTQ+ friends near you. Join queer friend groups, plan IRL meetups, and build real connections with Pulse.`,
      es: cityData
        ? `Conoce amigues LGBTQ+ en ${cityData.name}. Únete a grupos queer, planifica quedadas en persona y crea conexiones reales en ${cityData.name} con Pulse.`
        : `Conoce amigues LGBTQ+ cerca de ti. Únete a grupos queer, planifica quedadas en persona y crea conexiones reales con Pulse.`
    },
    keywords: cityData ? [
      `${cityData.name} LGBTQ+ friends`,
      `meet queer friends in ${cityData.name}`,
      `${cityData.name} queer community`,
      `gay friends ${cityData.name}`
    ] : ['LGBTQ+ friends', 'queer community'],
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
    if (!cityName || !cities || cities.length === 0) return;
    try {
      const matchedCity = cities.find((city: any) => {
        const citySlug = city.url2.replace(/^\//, '').toLowerCase();
        return citySlug === cityName.toLowerCase();
      });
      if (!matchedCity) {
        navigate("/cities");
        return;
      }
      const matchedCompact = Array.isArray(citiesCompact)
        ? citiesCompact.find((c: any) => c.code === matchedCity.code)
        : undefined;
      const bq: boolean | undefined = typeof matchedCompact?.bq === 'boolean' ? matchedCompact.bq : undefined;
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
        active: matchedCity.active,
        frequency_days: matchedCity.frequency_days,
        bq
      });
      window.scrollTo(0, 0);
      document.documentElement.classList.add('dark');
    } catch (err) {
      console.error("Failed to process cities:", err);
      navigate("/cities");
    }
  }, [cityName, cities, citiesCompact, navigate, currentLanguage]);

  return (
    <>
      <PageLoadingOverlay show={loading} />
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={cityData.name}
        code={cityData.code}
        country={cityData.country}
        state={cityData.state}
        image={cityData.image}
        citySlug={cityName}
        showNeighborhoodsSection={true}
        neighborhoodsSectionCityName={cityData.name}
        identity="queer"
        affinity={null}
        isQueer={true}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
        bq={cityData.bq}
        isLoading={loading}
      />
    </>
  );
};

export default QueerCityPage;
