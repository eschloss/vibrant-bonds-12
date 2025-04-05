
import React, { useState, useEffect, useRef } from "react";
import { Timer, AlertTriangle, Users, Calendar, Brain } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const MissionCountdown = () => {
  // State for the timer countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // State to track animation of days passing
  const [missionProgress, setMissionProgress] = useState(0);
  const [isWarning, setIsWarning] = useState(false);

  // Countdown reference
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Start the countdown
  useEffect(() => {
    const totalSeconds = 7 * 24 * 60 * 60; // 7 days in seconds
    let secondsElapsed = 0;
    
    countdownRef.current = setInterval(() => {
      secondsElapsed += 1;
      
      const secondsRemaining = totalSeconds - secondsElapsed;
      if (secondsRemaining <= 0) {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
        return;
      }
      
      const days = Math.floor(secondsRemaining / (24 * 60 * 60));
      const hours = Math.floor((secondsRemaining % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((secondsRemaining % (60 * 60)) / 60);
      const seconds = Math.floor(secondsRemaining % 60);
      
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });
      
      // Calculate progress as percentage completed (not remaining)
      const newProgress = (secondsElapsed / totalSeconds) * 100;
      setMissionProgress(newProgress);
      
      // Set warning state when less than 2 days remaining
      if (days < 2 && !isWarning) {
        setIsWarning(true);
      }
    }, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [isWarning]);

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
          <div className="inline-block p-2 px-4 rounded-full bg-primary/10 backdrop-blur-sm mb-4">
            <div className="flex items-center gap-2 text-primary">
              <Users size={18} />
              <span className="text-sm font-medium">Group Mission</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            <span className="font-bold">Meet in Real Life</span> — 7 Day Mission
          </h2>
          
          <p className="paragraph text-foreground/80 max-w-2xl mx-auto">
            Every crew has the same mission: connect and plan a real-life activity within the 7-day deadline. Start by taking our personality test to find your perfect match!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col gap-8">
              {/* Countdown section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Timer size={24} className="text-primary" />
                    <h3 className="text-xl font-bold">Mission Deadline</h3>
                  </div>
                  
                  <div className="flex gap-4 justify-center sm:justify-end">
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className="text-3xl font-bold text-primary" 
                        key={`days-${timeLeft.days}`} 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatTime(timeLeft.days)}
                      </motion.div>
                      <span className="text-muted-foreground text-sm">Days</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground/30">:</div>
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className="text-3xl font-bold text-primary" 
                        key={`hours-${timeLeft.hours}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatTime(timeLeft.hours)}
                      </motion.div>
                      <span className="text-muted-foreground text-sm">Hours</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground/30">:</div>
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className="text-3xl font-bold text-primary" 
                        key={`minutes-${timeLeft.minutes}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {formatTime(timeLeft.minutes)}
                      </motion.div>
                      <span className="text-muted-foreground text-sm">Mins</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Mission Progress</span>
                    <span>{Math.round(missionProgress)}%</span>
                  </div>
                  <Progress value={missionProgress} className="h-2" />
                </div>
                
                <AnimatePresence>
                  {isWarning && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="bg-destructive/10 border border-destructive/30 text-foreground shadow-lg">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <AlertTitle className="font-medium">Time is running out!</AlertTitle>
                        <AlertDescription className="text-foreground/80">
                          Less than 48 hours remaining to complete your mission. Take action now!
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Call to action for personality test */}
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2.5 rounded-lg">
                        <Brain className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">Find Your Perfect Match</h4>
                        <p className="text-sm text-foreground/80">Take our quick personality test to get matched with like-minded people in your area</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-5"
                    size="lg"
                  >
                    Take Personality Test
                  </Button>
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
