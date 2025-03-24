
import { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, MapPin, RefreshCw } from "lucide-react";

const steps = [
  {
    id: "match",
    title: "Match",
    description: "Get matched with people who share your interests and vibe.",
    icon: Search,
    color: "bg-pulse-purple text-white",
  },
  {
    id: "chat",
    title: "Chat",
    description: "Break the ice with conversation starters that actually work.",
    icon: MessageCircle,
    color: "bg-pulse-blue text-white",
  },
  {
    id: "meetup",
    title: "Meetup",
    description: "Plan spontaneous hangouts at places you both love.",
    icon: MapPin,
    color: "bg-pulse-coral text-white",
  },
  {
    id: "reconnect",
    title: "Reconnect",
    description: "Build lasting friendships with reminders to keep in touch.",
    icon: RefreshCw,
    color: "bg-pulse-teal text-white",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding bg-muted/40 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            <span className="pulse-gradient-text">How Pulse Works</span>
          </h2>
          <p className="paragraph">
            Building friendships shouldn't be complicated. Pulse makes it easy to find your people and create memories together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const Icon = step.icon;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-lg transform scale-[1.02]"
                        : "bg-white/50 hover:bg-white/80 hover:shadow-md cursor-pointer"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className={`rounded-full p-3 ${step.color}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animation/Illustration */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-white rounded-3xl p-6 shadow-lg border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-pulse-purple/10 to-transparent opacity-50"></div>
              
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const Icon = step.icon;
                
                return (
                  <div
                    key={step.id}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="text-center">
                      <div className={`rounded-full p-6 ${step.color} mx-auto w-fit mb-6 animate-bounce-gentle`}>
                        <Icon size={48} />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-3">
                        {step.title}
                      </h3>
                      <p className="text-foreground/70 max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
