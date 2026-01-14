import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";

type NeighborhoodParam = {
  cityName: string;
  neighborhoodName: string;
};

type NeighborhoodData = {
  name: string;
  name_urlized: string;
  description?: string;
  lat?: number;
  lng?: number;
  image?: string;
  is_gen?: boolean;
};

function normalizeImage(image?: string): string | undefined {
  if (!image) return undefined;
  return image.replace(/^https?:\/\//i, "");
}

const NeighborhoodPage = () => {
  const { cityName, neighborhoodName } = useParams<NeighborhoodParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const fallbackNeighborhoodDisplayName = useMemo(() => {
    if (!neighborhoodName) return "";
    return neighborhoodName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [neighborhoodName]);

  const { data: cities, loading: loadingCities } = useApiJson<any[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const { data: citiesCompact, loading: loadingCitiesCompact } = useApiJson<any[]>(
    "/auth/get_all_cities",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const [matchedCity, setMatchedCity] = useState<any | null>(null);
  const [bq, setBq] = useState<boolean | undefined>(undefined);

  const cityCode: string = matchedCity?.code || "";

  const neighborhoodsEndpoint = useMemo(() => {
    const baseUrl = cityCode ? `/auth/get_neighborhoods/${cityCode}` : "/auth/get_neighborhoods/_";
    const langParam = `lang=${currentLanguage}`;
    return `${baseUrl}?${langParam}`;
  }, [cityCode, currentLanguage]);

  const {
    data: neighborhoods,
    loading: loadingNeighborhoods,
    hasFetched: neighborhoodsFetched,
    url: neighborhoodsUrl,
    error: neighborhoodsError
  } = useApiJson<NeighborhoodData[]>(
    neighborhoodsEndpoint,
    {
      initialData: [],
      staleTime: 5 * 60 * 1000,
      enabled: Boolean(cityCode)
    }
  );

  const [neighborhoodData, setNeighborhoodData] = useState<NeighborhoodData>({
    name: fallbackNeighborhoodDisplayName,
    name_urlized: neighborhoodName || "",
    description: "",
    lat: 0,
    lng: 0,
    image: undefined,
    is_gen: false
  });

  const [cityMeta, setCityMeta] = useState<{
    cityDisplayName: string;
    country: string;
    state?: string;
    language?: string;
    active?: boolean;
    frequency_days?: number;
  }>({
    cityDisplayName: "",
    country: "",
    state: "",
    language: currentLanguage,
    active: false,
    frequency_days: undefined
  });

  useEffect(() => {
    console.log("[NeighborhoodPage]", {
      cityName,
      neighborhoodName,
      cityCode,
      neighborhoodsUrl,
      neighborhoodsFetched,
      loadingNeighborhoods,
      neighborhoodsLen: Array.isArray(neighborhoods) ? neighborhoods.length : undefined,
      neighborhoodsError: neighborhoodsError?.message
    });
  }, [
    cityName,
    neighborhoodName,
    cityCode,
    neighborhoodsUrl,
    neighborhoodsFetched,
    loadingNeighborhoods,
    neighborhoods,
    neighborhoodsError
  ]);

  // Step 1: match city by slug
  useEffect(() => {
    if (!cityName || !cities || cities.length === 0) return;
    const found = cities.find(
      (city: any) => city.url2?.replace(/^\//, "").toLowerCase() === cityName.toLowerCase()
    );
    if (!found) return;
    setMatchedCity(found);

    const matchedCompact = Array.isArray(citiesCompact)
      ? citiesCompact.find((c: any) => c.code === found.code)
      : undefined;
    const nextBq: boolean | undefined =
      typeof matchedCompact?.bq === "boolean" ? matchedCompact.bq : undefined;
    setBq(nextBq);

    const nameField = currentLanguage === "es" ? "es_name" : "en_name";
    const countryField = currentLanguage === "es" ? "es_country" : "en_country";
    const stateField = currentLanguage === "es" ? "es_state" : "en_state";
    setCityMeta({
      cityDisplayName: found[nameField] || found.en_name,
      country: found[countryField] || found.en_country,
      state: found[stateField] || found.en_state,
      language: found.language,
      active: found.active,
      frequency_days: found.frequency_days
    });

    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark");
  }, [cityName, cities, citiesCompact, navigate, currentLanguage]);

  // Step 2: match neighborhood by name_urlized
  useEffect(() => {
    if (!cityName || !neighborhoodName) return;
    if (!matchedCity) return;
    if (!Array.isArray(neighborhoods)) return;
    if (!neighborhoodsFetched) return;

    const foundNeighborhood = neighborhoods.find(
      (n) => String(n.name_urlized || "").toLowerCase() === neighborhoodName.toLowerCase()
    );

    if (!foundNeighborhood) {
      console.log("[NeighborhoodPage] redirect:not_found", {
        cityName,
        neighborhoodName,
        cityCode,
        neighborhoodsLen: neighborhoods.length
      });
      navigate(`/cities/${cityName}`);
      return;
    }

    console.log("[NeighborhoodPage] match:found", {
      cityName,
      neighborhoodName,
      cityCode,
      found: foundNeighborhood.name_urlized
    });
    setNeighborhoodData({
      name: foundNeighborhood.name,
      name_urlized: foundNeighborhood.name_urlized,
      description: foundNeighborhood.description,
      lat: foundNeighborhood.lat,
      lng: foundNeighborhood.lng,
      image: normalizeImage(foundNeighborhood.image),
      is_gen: Boolean((foundNeighborhood as any)?.is_gen)
    });
  }, [cityName, neighborhoodName, matchedCity, neighborhoods, neighborhoodsFetched, cityCode, navigate]);

  const seoProps = {
    title: {
      en: neighborhoodData
        ? `Meet New Friends in ${String(neighborhoodData.name)} | Pulse App`
        : "Find Your Crew | Pulse App",
      es: neighborhoodData
        ? `Conoce Nuevos Amigos en ${String(neighborhoodData.name)} | Pulse App`
        : "Encuentra Tu Grupo | Pulse App"
    },
    description: {
      en: neighborhoodData
        ? `Meet new friends in ${String(neighborhoodData.name)}. Join local friend groups, plan IRL meetups, and make real connections in ${String(neighborhoodData.name)} with Pulse.`
        : "Meet new friends near you. Join local friend groups, plan IRL meetups, and build real connections with Pulse.",
      es: neighborhoodData
        ? `Haz nuevos amigues en ${String(neighborhoodData.name)}. Únete a grupos de amistades, planifica quedadas en persona y crea conexiones reales en ${String(neighborhoodData.name)} con Pulse.`
        : "Haz nuevos amigues cerca de ti. Únete a grupos, planifica quedadas en persona y crea conexiones reales con Pulse."
    },
    keywords: neighborhoodData
      ? [
          `${String(neighborhoodData.name)} friends`,
          `meet friends in ${String(neighborhoodData.name)}`,
          `${String(neighborhoodData.name)} friend groups`,
          `make friends ${String(neighborhoodData.name)}`,
          `meet people in ${String(neighborhoodData.name)}`
        ]
      : ["meet friends", "friend groups", "make friends"],
    image:
      (typeof neighborhoodData?.image === "string" && neighborhoodData.image) ||
      (typeof matchedCity?.image === "string" ? normalizeImage(matchedCity.image) : undefined),
    geoData: {
      name: `${String(neighborhoodData.name)}${cityMeta.cityDisplayName ? `, ${String(cityMeta.cityDisplayName)}` : ""}${
        cityMeta.state ? `, ${String(cityMeta.state)}` : ""
      }${cityMeta.country ? `, ${String(cityMeta.country)}` : ""}`,
      lat: neighborhoodData?.lat,
      lng: neighborhoodData?.lng
    }
  };

  const isLoading = loadingCities || loadingCitiesCompact || loadingNeighborhoods;
  const effectiveImage =
    (typeof neighborhoodData?.image === "string" && neighborhoodData.image) ||
    (typeof matchedCity?.image === "string" ? normalizeImage(matchedCity.image) : undefined);

  return (
    <>
      <PageLoadingOverlay show={isLoading} />
      <Seo {...seoProps} />
      <CityMatchmakingTemplate
        cityName={neighborhoodData.name}
        neighborhoodName={neighborhoodData.name}
        isGen={Boolean(neighborhoodData.is_gen)}
        placeDescription={neighborhoodData.description}
        placeDescriptionPlacement="belowHero"
        code={cityCode}
        country={cityMeta.country}
        state={cityMeta.state}
        image={effectiveImage}
        citySlug={cityName}
        showNeighborhoodsSection={true}
        neighborhoodsSectionCityName={cityMeta.cityDisplayName}
        headlinePlaceLinkTo={cityName ? `/cities/${cityName}` : "/cities"}
        identity={null}
        affinity={null}
        isQueer={false}
        language={cityMeta.language}
        active={cityMeta.active}
        frequency_days={cityMeta.frequency_days}
        bq={bq}
        isLoading={isLoading}
      />
    </>
  );
};

export default NeighborhoodPage;


