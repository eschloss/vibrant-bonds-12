import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunityMatchmakingTemplate from "@/components/CommunityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";

type CommunityParam = {
  community_url: string;
};

interface CommunityData {
  id: string;
  url: string;
  title1: string;
  title2: string;
  subtitle?: string;
  title2_part2?: string;
  powered_by: string;
  business_name: string;
  business_image: string;
  business_url: string;
  background_image: string;
  city: string;
  form_before?: string;
  form_after?: string;
}

const CommunityPage = () => {
  const { community_url } = useParams<CommunityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const fallbackTitle = useMemo(() => {
    if (!community_url) return "";
    return community_url.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [community_url]);
  const [communityData, setCommunityData] = useState<CommunityData>({
    id: "",
    url: community_url || "",
    title1: "",
    title2: fallbackTitle,
    subtitle: "",
    title2_part2: "",
    powered_by: "",
    business_name: "",
    business_image: "",
    business_url: "",
    background_image: "",
    city: ""
  });

  const endpoint = useMemo(() => {
    if (!community_url) return null;
    return `/match/get_community?slag=${encodeURIComponent(community_url)}`;
  }, [community_url]);
  const { data, loading, error } = useApiJson<CommunityData>(endpoint || "", {
    initialData: undefined,
    enabled: !!endpoint
  });

  // Fetch cities to derive `bq` by code
  const { data: citiesCompact } = useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });

  const hasLoadedCommunity = Boolean(communityData.id);
  const seoProps = {
    title: {
      en: hasLoadedCommunity
        ? `${communityData.title1} ${communityData.title2} | Pulse App`
        : "Find Your Community | Pulse App",
      es: hasLoadedCommunity
        ? `${communityData.title1} ${communityData.title2} | Pulse App`
        : "Encuentra Tu Comunidad | Pulse App",
    },
    description: {
      en: hasLoadedCommunity
        ? `${communityData.title1} ${communityData.title2} on Pulse. Join a matched local group and meet new friends IRL—small groups, real meetups.`
        : "Discover Pulse communities: group matching to meet like-minded people and make friends near you.",
      es: hasLoadedCommunity
        ? `${communityData.title1} ${communityData.title2} en Pulse. Únete a un grupo local emparejado y haz nuevos amigos en persona—grupos pequeños, quedadas reales.`
        : "Descubre comunidades en Pulse: emparejamiento en grupo para conocer gente afín y hacer amigos cerca de ti.",
    },
    keywords: hasLoadedCommunity
      ? [
          communityData.title1,
          communityData.title2,
          communityData.title2_part2 || communityData.title2,
          communityData.business_name,
          "meet friends",
          "Pulse",
        ].filter(Boolean)
      : ["community", "meet friends", "group matching", "Pulse"],
    image: communityData?.background_image ? `https://${communityData.background_image}` : undefined,
  };

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch community:", error);
      navigate("/communities");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data) return;
    setCommunityData(data);
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, [data]);

  const cityLabel = (communityData.title2_part2 || communityData.title2)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
  const derivedBq: boolean | undefined = Array.isArray(citiesCompact)
    ? (citiesCompact.find((c: any) => c.code === communityData.city)?.bq ?? undefined)
    : undefined;

  return (
    <>
      <PageLoadingOverlay show={loading} />
      <Seo {...seoProps} />
      <CommunityMatchmakingTemplate 
        cityName={communityData.title2}
        code={communityData.city}
        country=""
        state=""
        image={communityData.background_image}
        isLoading={loading}
        bq={derivedBq}
        communityData={{
          title1: communityData.title1,
          title2: communityData.title2,
          subtitle: communityData.subtitle,
          title2_part2: communityData.title2_part2,
          powered_by: communityData.powered_by,
          business_name: communityData.business_name,
          business_image: communityData.business_image,
          business_url: communityData.business_url,
          submatchId: communityData.id,
          cityLabel,
          form_before: communityData.form_before,
          form_after: communityData.form_after
        }}
      />
    </>
  );
};

export default CommunityPage;