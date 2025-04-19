
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
    // Set dark mode
    document.documentElement.classList.add('dark');
    
    // Create a single unified scroll handler with better performance
    const handleScroll = () => {
      // Using passive listener for better performance
      return true;
    };
    
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Handle any hash-based or localStorage-based scrolling
    const scrollToTarget = () => {
      const scrollToSection = localStorage.getItem('scrollToSection');
      
      if (scrollToSection) {
        localStorage.removeItem('scrollToSection');
        const section = document.getElementById(scrollToSection);
        if (section) {
          // Use a smooth scroll with proper timing
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          // Use a smooth scroll with proper timing
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    // Slight delay before attempting to scroll to allow page to fully render
    setTimeout(scrollToTarget, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Remove overflow-x-hidden from the flexbox container to prevent scroll freezing
    <div className="flex flex-col min-h-screen dark hardware-accelerated w-full">
      <Navbar />
      
      {/* Use a container with better scroll characteristics */}
      <main className="flex-grow hardware-accelerated w-full">
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
