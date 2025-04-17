import React from "react";
import { Timer } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { MissionDeadline } from "./mission/MissionDeadline";
import { TimerDisplay } from "./mission/TimerDisplay";
import { useIsMobile } from "@/hooks/use-mobile";

const MissionCountdown = () => {
  const timeLeft = useCountdown();
  const isMobile = useIsMobile();

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
        <div className="max-w-4xl mx-auto">
          {/* Section Label and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
              <Timer size={18} className="text-pulse-purple" />
              <span className="text-white/90 text-sm font-medium">Group Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet in Real Life — 7 Day Mission
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Every crew has the same mission: connect and plan a real-life activity within the 7-day deadline. Start by taking our personality test to find your perfect match!
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* First Mission Container */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg">
              <div>
                {isMobile && (
                  <h3 className="text-base font-medium text-white/70 uppercase tracking-wider mb-6">Get Matched</h3>
                )}
                <MissionDeadline 
                  title="Get matched into a group"
                  showButton={true}
                  type="match"
                />
                <div className="mt-6">
                  <TimerDisplay {...timeLeft} />
                  <p className="text-sm text-white/70 text-center mt-4">Time Left Until Next Match</p>
                </div>
              </div>
            </div>

            {/* Second Mission Container */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-lg">
              <div>
                {isMobile && (
                  <h3 className="text-base font-medium text-white/70 uppercase tracking-wider mb-6">Meet in Person</h3>
                )}
                <MissionDeadline 
                  title="Meet in real life"
                  subtitle="Countdown starts once you're matched into a group"
                  type="meet"
                />
                <div className="mt-6">
                  <TimerDisplay days={7} hours={0} minutes={0} seconds={0} isStatic={true} />
                  <p className="text-sm text-white/70 text-center mt-4">Countdown starts once you're matched into a group</p>
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
