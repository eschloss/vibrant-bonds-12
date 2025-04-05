
import { useState, useEffect } from "react";
import { ChevronRight, UserPlus, ArrowDownToLine } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="relative flex items-center py-16 pt-28 overflow-hidden section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
      </div>
      
      {/* Decorative Shapes */}
      <div className="absolute top-1/4 left-10 w-12 h-12 rounded-full bg-pulse-blue/20 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-pulse-purple/20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-pulse-teal/20 animate-bounce-gentle"></div>

      <div className="container mx-auto">
        {/* Changed from grid to flex layout */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} flex flex-col items-center text-center`}>
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-gray-200 w-fit mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pulse-purple"></span>
            </span>
            Now in San Francisco, LA, and NYC
          </div>
          
          <h1 className="heading-xl w-full max-w-4xl mx-auto mb-6">
            <span className="pulse-gradient-text">Meet New Friends</span> in Your City
          </h1>
          
          <p className="paragraph text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">We match like-minded people into group chats where AI sparks conversations and plans real-life meetups.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-8">
            <a href="#download" className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium">
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </a>
            
            <a href="#how-it-works" className="bg-white hover:bg-gray-100 text-pulse-purple px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
              <span>Download App</span>
              <ArrowDownToLine size={18} />
            </a>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" style={{
              backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
              backgroundSize: 'cover'
            }}></div>)}
            </div>
            <p className="text-sm text-foreground/70">
              <span className="font-semibold">3,000+</span> new connections made today
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
