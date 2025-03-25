
import React, { useState, useEffect, useRef } from "react";
import { Timer, AlertTriangle, Users, Calendar } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

const MissionCountdown = () => {
  // State for the timer countdown - starting at 24 hours remaining
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // State to track if we're in warning mode (always true from the start now)
  const [isWarning, setIsWarning] = useState(true);
  
  // State to show the initial animation of time passing
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Initial total days reference
  const [totalDaysShown, setTotalDaysShown] = useState(7);
  
  // Animation timeouts
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the initial animation showing the progression from 7 days to 1 day
  useEffect(() => {
    if (showInitialAnimation) {
      // Start with showing 7 days total and quickly count down to 24 hours
      setTotalDaysShown(7);
      
      animationTimeoutRef.current = setTimeout(() => {
        const quickInterval = setInterval(() => {
          setTotalDaysShown(prev => {
            if (prev <= 1) {
              clearInterval(quickInterval);
              setShowInitialAnimation(false);
              setAnimationComplete(true);
              return 1;
            }
            return prev - 0.5;
          });
        }, 300); // Quick visual countdown
        
        return () => clearInterval(quickInterval);
      }, 1000); // Start after 1 second
    }
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [showInitialAnimation]);

  // Start the normal countdown after the animation finishes
  useEffect(() => {
    if (animationComplete) {
      countdownRef.current = setInterval(() => {
        setTimeLeft(prev => {
          let newSeconds = prev.seconds - 1;
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          let newDays = prev.days;
          
          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
            
            if (newMinutes < 0) {
              newMinutes = 59;
              newHours -= 1;
              
              if (newHours < 0) {
                newHours = 23;
                newDays -= 1;
              }
            }
          }
          
          return {
            days: newDays,
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds
          };
        });
      }, 1000); // Update every second for the countdown
    }
    
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [animationComplete]);

  // Format time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900/90 via-indigo-900/80 to-gray-900/90 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block p-2 px-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <div className="flex items-center gap-2 text-white/90">
              <Users size={18} className="text-pink-300" />
              <span className="text-sm font-medium">Group Mission</span>
            </div>
          </div>
          
          <h2 className="heading-lg mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            Plan Your <span className="font-bold">First Meetup</span>
          </h2>
          
          <p className="paragraph text-white/80 max-w-2xl mx-auto">
            Every Pulse group has one mission: to organize an in-person gathering within 7 days.
            This creates momentum and transforms digital connections into real friendships.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left side: Timer and warning */}
              <div className="space-y-8">
                {showInitialAnimation ? (
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                      <Timer size={28} className="text-pulse-coral" />
                      <h3 className="text-xl md:text-2xl font-bold text-white">Mission Duration: 7 Days</h3>
                    </div>
                    
                    <div className="w-full bg-gray-800/50 h-8 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-pulse-coral to-pulse-pink"
                        style={{ 
                          width: `${((7 - totalDaysShown) / 7) * 100}%`,
                          transition: "width 0.3s ease-out"
                        }}
                      />
                    </div>
                    
                    <motion.p 
                      className="mt-3 text-lg font-semibold text-white"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {Math.ceil(totalDaysShown)} days remaining...
                    </motion.p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <Timer size={28} className="text-pulse-coral" />
                      <h3 className="text-xl md:text-2xl font-bold text-white">Last 24 Hours!</h3>
                    </div>
                    
                    <div className="flex justify-center md:justify-start gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-4xl md:text-5xl font-bold text-pulse-coral"
                          key={`days-${timeLeft.days}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.days)}
                        </motion.div>
                        <span className="text-white/60 text-sm mt-1">Days</span>
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white/50">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-4xl md:text-5xl font-bold text-pulse-coral"
                          key={`hours-${timeLeft.hours}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.hours)}
                        </motion.div>
                        <span className="text-white/60 text-sm mt-1">Hours</span>
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white/50">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-4xl md:text-5xl font-bold text-pulse-coral"
                          key={`minutes-${timeLeft.minutes}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.minutes)}
                        </motion.div>
                        <span className="text-white/60 text-sm mt-1">Mins</span>
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white/50">:</div>
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className="text-4xl md:text-5xl font-bold text-pulse-coral"
                          key={`seconds-${timeLeft.seconds}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formatTime(timeLeft.seconds)}
                        </motion.div>
                        <span className="text-white/60 text-sm mt-1">Secs</span>
                      </div>
                    </div>
                  </>
                )}
                
                <AnimatePresence>
                  {isWarning && !showInitialAnimation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="destructive" className="bg-pulse-coral/20 border-pulse-coral/40 text-white">
                        <AlertTriangle className="h-5 w-5 text-pulse-coral" />
                        <AlertTitle className="text-white">Time is running out!</AlertTitle>
                        <AlertDescription className="text-white/80">
                          You have less than 24 hours to agree on a plan or your group will be dissolved.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Right side: Features and benefits */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-500/20 p-3 rounded-lg shrink-0">
                    <Calendar className="w-6 h-6 text-pulse-pink" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Suggest a Meetup Idea</h4>
                    <p className="text-gray-300">Share activity ideas that match your group's interests and vote on the best options.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg shrink-0">
                    <Users className="w-6 h-6 text-pulse-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Everyone Participates</h4>
                    <p className="text-gray-300">The 7-day deadline ensures all group members are committed to making real connections.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg shrink-0">
                    <AlertTriangle className="w-6 h-6 text-pulse-purple" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Stakes Create Success</h4>
                    <p className="text-gray-300">Our data shows the 7-day deadline leads to 83% more successful in-person connections.</p>
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
