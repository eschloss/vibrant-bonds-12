
import React, { useState, useEffect, useRef } from "react";
import { Timer, AlertTriangle, Users, Brain } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MissionCountdown = () => {
  // Calculate time until next Monday 11pm
  const getTimeUntilNextMonday = () => {
    const now = new Date();
    const nextMonday = new Date();
    nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7)); // Get next Monday
    nextMonday.setHours(23, 0, 0, 0); // Set to 11 PM
    
    const diff = nextMonday.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeUntilNextMonday());
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setTimeLeft(getTimeUntilNextMonday());
    }, 1000);

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
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 gap-8">
              {/* Mission Deadlines Column */}
              <div>
                <h3 className="text-lg font-medium text-white/70 mb-4">Mission Deadline</h3>
                <div className="space-y-6">
                  {/* First Mission */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Get matched into a group</h4>
                    <a 
                      href="https://482tykjn26x.typeform.com/pulse#city=" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-white font-medium"
                        size="sm"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Take Personality Test
                      </Button>
                    </a>
                  </div>
                  
                  {/* Second Mission */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Meet in real life</h4>
                    <p className="text-sm text-white/70">
                      Countdown starts once you're matched into a group
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Countdown Column */}
              <div>
                <h3 className="text-lg font-medium text-white/70 mb-4">Time Left</h3>
                <div className="space-y-6">
                  {/* First Mission Countdown */}
                  <div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-2xl font-bold text-white" 
                          key={`days-${timeLeft.days}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.days)}
                        </motion.div>
                        <span className="text-xs text-white/70">Days</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          key={`hours-${timeLeft.hours}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.hours)}
                        </motion.div>
                        <span className="text-xs text-white/70">Hours</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          key={`minutes-${timeLeft.minutes}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.minutes)}
                        </motion.div>
                        <span className="text-xs text-white/70">Mins</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          key={`seconds-${timeLeft.seconds}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.seconds)}
                        </motion.div>
                        <span className="text-xs text-white/70">Secs</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Second Mission Static Countdown */}
                  <div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white">07</div>
                        <span className="text-xs text-white/70">Days</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white">00</div>
                        <span className="text-xs text-white/70">Hours</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white">00</div>
                        <span className="text-xs text-white/70">Mins</span>
                      </div>
                      <div className="text-2xl font-bold text-white/70">:</div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white">00</div>
                        <span className="text-xs text-white/70">Secs</span>
                      </div>
                    </div>
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
