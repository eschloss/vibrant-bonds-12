
import { useState, useEffect } from "react";
import { ChevronRight, Download, Smartphone } from "lucide-react";
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden section-padding">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-pulse-coral/10 to-transparent opacity-50"></div>
      </div>
      
      {/* Decorative Shapes */}
      <div className="absolute top-1/4 left-10 w-12 h-12 rounded-full bg-pulse-blue/20 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-pulse-coral/20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-pulse-teal/20 animate-bounce-gentle"></div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} md:order-1 order-2`}>
            <div className="flex flex-col gap-6 w-full">
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-gray-200 w-fit">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pulse-coral"></span>
                </span>
                Now in San Francisco, LA, and NYC
              </div>
              
              <h1 className="heading-xl">
                Creating <span className="pulse-gradient-text">Effortless</span> Real-World Friendships
              </h1>
              
              <p className="paragraph text-lg md:text-xl text-foreground/80">
                Connect with like-minded people in your city. From coffee meetups to weekend adventures — make friends that get you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a href="#download" className="button-secondary flex items-center justify-center gap-2">
                  <Download size={18} />
                  <span>Download the App</span>
                </a>
                
                <a href="#how-it-works" className="button-tertiary flex items-center justify-center gap-2">
                  <span>See How It Works</span>
                  <ChevronRight size={18} />
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
                  <span className="font-semibold">1,000+</span> new connections made today
                </p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          
        </div>
      </div>
    </section>;
};
export default Hero;
