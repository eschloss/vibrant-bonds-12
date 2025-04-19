
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
    
    // Remove any global scroll event listeners that might interfere
    const prevHandlers = window.onscroll;
    window.onscroll = null;
    
    // Use a more efficient passive scroll listener
    const handleScroll = () => {
      // Using passive listener for better performance
      return true;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check if we need to scroll to a section based on localStorage
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
      localStorage.removeItem('scrollToSection');
      
      // Delay scrolling slightly to avoid interruption
      setTimeout(() => {
        requestAnimationFrame(() => {
          const section = document.getElementById(scrollToSection);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 100);
    }
    
    // Check if URL has a hash to scroll to
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }, 100);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.onscroll = prevHandlers; // Restore previous handlers if any
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark hardware-accelerated overflow-x-hidden w-full">
      <Navbar />
      
      <main className="flex-grow hardware-accelerated overflow-x-hidden w-full">
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
