
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

type AffinityParam = {
  affinityName: string;
};

interface AffinityData {
  name_en: string;
  name_es: string;
  url: string;
}

const AffinityPage = () => {
  const { affinityName } = useParams<AffinityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [affinityData, setAffinityData] = useState<AffinityData | null>(null);

  const displayName = affinityData ? 
    (currentLanguage === 'es' ? affinityData.name_es : affinityData.name_en) : 
    '';

  const seoProps = {
    title: {
      en: affinityData
        ? `Meet ${affinityData.name_en} Friends & Community | Pulse App`
        : 'Find Your Affinity Community | Pulse App',
      es: affinityData
        ? `Conoce Amigues ${affinityData.name_es} y Comunidad | Pulse App`
        : 'Encuentra Tu Comunidad de Afinidad | Pulse App'
    },
    description: {
      en: affinityData
        ? `Join the ${affinityData.name_en.toLowerCase()} community. Use Pulse to spark real friendships and plan fun in-person meetups with fellow ${affinityData.name_en.toLowerCase()}.`
        : `Pulse helps you meet people who share your interests and hobbies. Make real friends and plan IRL hangouts that actually happen.`,
      es: affinityData
        ? `Únete a la comunidad de ${affinityData.name_es.toLowerCase()}. Con Pulse puedes hacer amistades reales y organizar quedadas en persona con otros ${affinityData.name_es.toLowerCase()}.`
        : `Pulse te ayuda a conocer personas que comparten tus intereses y aficiones. Haz amistades reales y queda en la vida real.`
    }
  };

  useEffect(() => {
    const fetchAffinities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_affinities");
        const data = await response.json();

        const matchedAffinity = data.find((affinity: AffinityData) => 
          affinity.url.toLowerCase() === affinityName?.toLowerCase()
        );

        if (!matchedAffinity) {
          navigate("/");
          return;
        }

        setAffinityData(matchedAffinity);

        window.scrollTo(0, 0);
        document.documentElement.classList.add('dark');
      } catch (err) {
        console.error("Failed to fetch affinities:", err);
        navigate("/");
      }
    };

    if (affinityName) {
      fetchAffinities();
    }
  }, [affinityName, navigate]);

  if (!affinityData) return null;

  return (
    <>
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName="Your City"
        code=""
        country="Worldwide"
        state=""
        image=""
        isQueer={false}
        isAffinity={true}
        affinityName={displayName}
        affinityUrl={affinityData.url}
        language={currentLanguage !== "en" ? currentLanguage : undefined}
      />
    </>
  );
};

export default AffinityPage;
