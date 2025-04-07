
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NeuralNetwork from "@/components/NeuralNetwork";
import AiIcebreakers from "@/components/AiIcebreakers";
import MissionCountdown from "@/components/MissionCountdown";
import Footer from "@/components/Footer";

const Index = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
    
    // Check if we need to scroll to a section based on localStorage
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
      localStorage.removeItem('scrollToSection');
      
      // Use a small timeout to ensure the page is fully loaded
      setTimeout(() => {
        const section = document.getElementById(scrollToSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Check if URL has a hash to scroll to
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <div id="how-it-works" ref={howItWorksRef}>
          <HowItWorks />
        </div>
        <NeuralNetwork />
        <AiIcebreakers />
        <MissionCountdown />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
