
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, UserPlus, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative flex items-center py-100 pt-50 overflow-hidden section-padding py-[109px] bg-white dark:bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
      </div>
      
      {/* Enhanced Animated Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-pulse-blue/30 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-pulse-purple/30 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-pulse-teal/30 animate-bounce-gentle"></div>
      
      {/* Additional Animated Elements */}
      <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-pulse-coral/20 animate-float-reverse"></div>
      <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-pulse-blue/20 animate-spin-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 w-14 h-14 rounded-full bg-pulse-purple/25 animate-pulse-slow"></div>
      <div className="absolute top-1/6 right-1/6 w-10 h-10 rounded-full bg-pulse-coral/20 animate-bounce-gentle"></div>
      <div className="absolute bottom-1/5 left-1/5 w-18 h-18 rounded-full bg-pulse-teal/15 animate-float"></div>

      <div className="container mx-auto py-[132px]">
        {/* Changed from grid to flex layout */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} flex flex-col items-center text-center`}>
          
          <h1 className="heading-xl w-full max-w-4xl mx-auto mb-6 text-gray-900">
            <span className="pulse-gradient-text">Meet New Friends</span> in Your City
          </h1>
          
          <p className="paragraph text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">We match like-minded people into group chats where AI sparks conversations and plans real-life meetups.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-8">
            <Link to="/cities">
              <Button size="xl" className="bg-[#FF2688] hover:bg-[#FF2688]/90 text-white shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 rounded-full">
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
