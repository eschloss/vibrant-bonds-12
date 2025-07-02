
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./city/HeroSection";
import StepsSection from "./city/StepsSection";
import CallToActionSection from "./city/CallToActionSection";
import ShareCTASection from "./city/ShareCTASection";

interface CityMatchmakingTemplateProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
  isQueer?: boolean;
  isAffinity?: boolean;
  affinityName?: string;
  affinityUrl?: string;
  language?: string;
}

const CityMatchmakingTemplate = ({
  cityName,
  code,
  country,
  state,
  image,
  isQueer,
  isAffinity,
  affinityName,
  affinityUrl,
  language
}: CityMatchmakingTemplateProps) => {
  const peopleOptions: string[] = [
    "https://s.kikiapp.eu/img/people/friends1.avif",
    "https://s.kikiapp.eu/img/people/friends2.avif",
    "https://s.kikiapp.eu/img/people/friends3.avif",
    "https://s.kikiapp.eu/img/people/friends4.avif",
    "https://s.kikiapp.eu/img/people/friends5.avif",
    "https://s.kikiapp.eu/img/people/friends6.avif",
  ];
  
  function cityScore(cityName: string, state?: string, country?: string): number {
    const citySum = cityName
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const stateSum = state ? state
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
    const countrySum = country ? country
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) : 0;
    
    const today = new Date();
    const dayOfMonth = today.getDate();
  
    const total = citySum + dayOfMonth + stateSum + countrySum;
  
    return total;
  }
  
  const peopleImage = peopleOptions[cityScore(cityName, state, country) % peopleOptions.length];

  return (
    <div className="flex flex-col min-h-screen dark">
      {image && (
        <Helmet>
          <link rel="preload" as="image" href={`https://${image}`} />
        </Helmet>
      )}

      <Navbar />

      <main className="flex-grow">
        <HeroSection
          cityName={cityName}
          code={code}
          country={country}
          state={state}
          image={image}
          isQueer={isQueer}
          isAffinity={isAffinity}
          affinityName={affinityName}
          affinityUrl={affinityUrl}
          language={language}
          peopleImage={peopleImage}
        />

        <StepsSection />

        <CallToActionSection
          cityName={cityName}
          code={code}
          isQueer={isQueer}
          isAffinity={isAffinity}
          affinityUrl={affinityUrl}
          language={language}
        />

        <ShareCTASection code={code} />
      </main>

      <Footer />
    </div>
  );
};

export default CityMatchmakingTemplate;
