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

  const seoCityLabel = useMemo(
    () => (cityData.code ? cityData.name : fallbackCityName),
    [cityData.code, cityData.name, fallbackCityName]
  );

  const seoProps = {
    title: {
      en: `Meet Gay, Lesbian, & Queer Friends in ${seoCityLabel} | Pulse App`,
      es: `Conoce Amigues Gay, Lesbianas y Queer en ${seoCityLabel} | Pulse App`,
    },
    description: {
      en: `Meet LGBTQ+ friends in ${seoCityLabel}. Join queer friend groups, plan IRL meetups, and make real connections in ${seoCityLabel} with Pulse.`,
      es: `Conoce amigues LGBTQ+ en ${seoCityLabel}. Únete a grupos queer, planifica quedadas en persona y crea conexiones reales en ${seoCityLabel} con Pulse.`,
    },
    keywords: [
      `${seoCityLabel} LGBTQ+ friends`,
      `meet queer friends in ${seoCityLabel}`,
      `${seoCityLabel} queer community`,
      `gay friends ${seoCityLabel}`,
    ],
    image: typeof cityData?.image === "string" ? cityData.image : undefined,
    geoData: cityData.code
      ? {
          name: `${String(cityData.name)}${cityData.state ? `, ${String(cityData.state)}` : ""}, ${String(cityData.country)}`,
          lat: cityData.lat,
          lng: cityData.lng,
        }
      : {
          name: seoCityLabel,
          lat: 0,
          lng: 0,
        },
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
