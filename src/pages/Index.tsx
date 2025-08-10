
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NeuralNetwork from "@/components/NeuralNetwork";
import MeetPipPromo from "@/components/MeetPipPromo";
import MissionCountdown from "@/components/MissionCountdown";
import Footer from "@/components/Footer";
import ShareCallout from "@/components/ShareCallout";

const Index = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <div id="how-it-works" ref={howItWorksRef}>
          <HowItWorks />
        </div>
        <NeuralNetwork />
        <MeetPipPromo />
        <MissionCountdown />
        <ShareCallout />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
