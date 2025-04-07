
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
      {/* Friendlier Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/20 to-transparent opacity-70"></div>
      </div>
      
      {/* Friend Bubbles - Inspired by the reference image */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-[#FF6B8B]/70 animate-float-slow">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#FF6B8B] animate-pulse-slow"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/3 right-14 w-32 h-32 rounded-full bg-[#741ADD]/60 animate-float-reverse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#741ADD] animate-pulse-slow"></div>
        </div>
      </div>
      
      <div className="absolute top-2/5 right-1/4 w-28 h-28 rounded-full bg-[#38D1BF]/60 animate-float-medium">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-18 h-18 rounded-full bg-[#38D1BF] animate-pulse-slow"></div>
        </div>
      </div>
      
      {/* Connection Lines Between Friend Bubbles */}
      <div className="absolute inset-0 -z-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path 
            className="animate-draw-path" 
            d="M120,200 Q300,100 500,250 T800,200" 
            stroke="url(#friendGradient)" 
            strokeWidth="3" 
            fill="none" 
          />
          <path 
            className="animate-draw-path-delayed" 
            d="M200,400 Q400,500 700,350" 
            stroke="url(#friendGradient)" 
            strokeWidth="3" 
            fill="none" 
          />
          <defs>
            <linearGradient id="friendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B8B" />
              <stop offset="50%" stopColor="#741ADD" />
              <stop offset="100%" stopColor="#38D1BF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Small Decorative Elements */}
      <div className="absolute top-1/6 left-1/3 w-4 h-4 rounded-full bg-[#FF6B8B]/80 animate-ping-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-5 h-5 rounded-full bg-[#741ADD]/80 animate-ping-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-[#38D1BF]/80 animate-ping-slow"></div>
      
      {/* Friendship Icons */}
      <div className="absolute top-1/5 right-1/5 w-10 h-10 animate-float-fast">
        <div className="w-full h-full text-[#FF6B8B] animate-pulse-fast">❤️</div>
      </div>
      <div className="absolute bottom-1/5 left-1/6 w-10 h-10 animate-bounce-gentle">
        <div className="w-full h-full text-[#741ADD] animate-pulse-fast">✨</div>
      </div>
      <div className="absolute top-2/3 right-1/4 w-10 h-10 animate-float-medium">
        <div className="w-full h-full text-[#38D1BF] animate-pulse-fast">🎉</div>
      </div>

      <div className="container mx-auto py-[132px]">
        {/* Content */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} flex flex-col items-center text-center`}>
          
          <h1 className="heading-xl w-full max-w-4xl mx-auto mb-6 text-gray-900">
            <span className="pulse-gradient-text">Meet New Friends</span> in Your City
          </h1>
          
          <p className="paragraph text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">We match like-minded people into group chats where AI sparks conversations and plans real-life meetups.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-8">
            <Link to="/matchmaking">
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
