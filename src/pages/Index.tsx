
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NeuralNetwork from "@/components/NeuralNetwork";
import Testimonials from "@/components/Testimonials";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <NeuralNetwork />
        <Testimonials />
        <DownloadCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
