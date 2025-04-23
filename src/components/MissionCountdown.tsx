import React from "react";
import { Timer } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "./mission/TimerDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";



const MissionCountdown = () => {
  const timeLeft = useCountdown();
  const isMobile = useIsMobile();
    const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };
  
  return <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Subtle animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pulse-purple rounded-full mix-blend-screen filter blur-[80px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pulse-blue rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{
        animationDelay: "2s"
      }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Label and Title */}
          <div className="text-center mb-12">


          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <Timer className="w-4 h-4 text-pulse-purple" />
              <span className="text-white/90 text-sm font-medium">Group Mission</span>
          </motion.div>

            
            <h2 className="text-3xl font-bold text-white mb-4 text-center md:text-5xl">
              <span className="pulse-gradient-text">Meet in Real Life</span> — 7 Day Mission
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto text-center">Every crew has the same mission: connect and plan a real-life activity within the 7-day deadline. Start by taking our personality quiz to find your crew!</p>
          </div>

          <div className="flex flex-col gap-8">
            {/* First Mission Container */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center">
              <div>
                {isMobile && <h3 className="text-base font-medium text-white/70 uppercase tracking-wider mb-8 text-center">Get Matched</h3>}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-4 items-start">
                    <div>
                      <h4 className="text-xl font-semibold text-white tracking-tight md:text-3xl">1. Get Matched into a Group</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center my-0">
                  <TimerDisplay {...timeLeft} />
                  <p className="text-sm text-white/70 mt-4 text-center">until the next friend group match closes</p>
                </div>
                <div className="mt-8">
                  <Link to="/cities">
                      <Button size="xl" className="bg-[#FF2688] hover:bg-[#FF2688]/90 text-white shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 rounded-full">
                          <span>Get Matched Now</span>
                      </Button>  
                  </Link>
                </div>

              </div>
            </div>

            {/* Second Mission Container */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center">
              <div>
                {isMobile && <h3 className="text-base font-medium text-white/70 uppercase tracking-wider mb-8 text-center">Meet in Person</h3>}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-4 items-start">
                    <div>
                      <h4 className="text-xl font-semibold text-white tracking-tight md:text-3xl">2. Meet in Real Life</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center my-0">
                  <TimerDisplay days={7} hours={0} minutes={0} seconds={0} isStatic={true} />
                  <p className="text-sm text-white/70 mt-4 text-center">countdown begins once matched into a friend group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MissionCountdown;