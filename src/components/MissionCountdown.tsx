import React, { useState, useEffect, useRef } from "react";
import { Timer, Users, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addDays, setHours, setMinutes, setSeconds } from "date-fns";

const MissionCountdown = () => {
  // State for the matching countdown
  const [timeToNextMonday, setTimeToNextMonday] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Get next Monday at 23:00 (11 PM)
  const getNextMonday = () => {
    let date = new Date();
    const day = date.getDay();
    const daysUntilNextMonday = day <= 1 ? 1 - day : 8 - day;
    date = addDays(date, daysUntilNextMonday);
    date = setHours(date, 23);
    date = setMinutes(date, 0);
    date = setSeconds(date, 0);
    return date;
  };

  // Countdown reference
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Start the countdown to next Monday
  useEffect(() => {
    const nextMonday = getNextMonday();
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = nextMonday.getTime() - now.getTime();
      
      if (diff <= 0) {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeToNextMonday({
        days,
        hours,
        minutes,
        seconds
      });
    };

    updateCountdown();
    countdownRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Format time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Subtle animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pulse-purple rounded-full mix-blend-screen filter blur-[80px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pulse-blue rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{
          animationDelay: "2s"
        }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block p-2 px-4 rounded-full bg-primary/30 backdrop-blur-sm mb-4">
            <div className="flex items-center gap-2 text-white">
              <Timer size={18} />
              <span className="text-sm font-medium">Mission Deadlines</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            <span className="font-bold">Meet in Real Life — 7 Day Mission</span>
          </h2>
          
          <p className="paragraph text-foreground/80 max-w-2xl mx-auto">
            Our matching algorithm runs every Monday at 11 PM. Once matched, you have 7 days to meet your crew in real life!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Headers */}
              <div className="text-lg font-semibold text-white/80 text-center md:text-left">Mission Deadline</div>
              <div className="text-lg font-semibold text-white/80 text-center md:text-left">Time Left</div>
              
              {/* First Mission: Get Matched */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Get Matched Into a Group</h3>
                <p className="text-sm text-white/60">Take the Personality Test</p>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-4xl font-bold text-white" 
                    key={`days-${timeToNextMonday.days}`} 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatTime(timeToNextMonday.days)}
                  </motion.div>
                  <span className="text-muted-foreground text-sm">Days</span>
                </div>
                <div className="text-4xl font-bold text-white/70">:</div>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-4xl font-bold text-white" 
                    key={`hours-${timeToNextMonday.hours}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatTime(timeToNextMonday.hours)}
                  </motion.div>
                  <span className="text-muted-foreground text-sm">Hours</span>
                </div>
                <div className="text-4xl font-bold text-white/70">:</div>
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-4xl font-bold text-white" 
                    key={`minutes-${timeToNextMonday.minutes}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatTime(timeToNextMonday.minutes)}
                  </motion.div>
                  <span className="text-muted-foreground text-sm">Mins</span>
                </div>
              </div>

              {/* Second Mission: Meet in Real Life */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Meet in Real Life</h3>
                <p className="text-sm text-white/60">Countdown starts once you're matched into a group</p>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-white/80">07</div>
                  <span className="text-muted-foreground text-sm">Days</span>
                </div>
                <div className="text-4xl font-bold text-white/70">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-white/80">00</div>
                  <span className="text-muted-foreground text-sm">Hours</span>
                </div>
                <div className="text-4xl font-bold text-white/70">:</div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-white/80">00</div>
                  <span className="text-muted-foreground text-sm">Mins</span>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="md:col-span-2">
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/20 p-2.5 rounded-lg">
                          <Brain className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">Start Your Journey</h4>
                          <p className="text-sm text-foreground/80">Take our quick personality test to get matched with like-minded people in your area</p>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href="https://482tykjn26x.typeform.com/pulse#city=" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-5 text-base w-full md:w-auto"
                        size="lg"
                      >
                        Take Personality Test
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCountdown;
