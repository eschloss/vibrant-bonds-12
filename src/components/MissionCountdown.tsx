import React from "react";
import { Timer } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "./mission/TimerDisplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
const MissionCountdown = () => {
  const timeLeft = useCountdown();
  const isMobile = useIsMobile();
  const {
    t
  } = useTranslation();
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
  return <section className="relative py-12 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      {/* Subtle animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pulse-purple rounded-full mix-blend-screen filter blur-[80px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pulse-blue rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{
        animationDelay: "2s"
      }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Label and Title */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
              <Timer className="w-4 h-4 text-pulse-purple" />
              <span className="text-sm font-medium text-pulse-purple">
                {t("mission_countdown.group_mission", "Group Mission")}
              </span>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4 text-center md:text-5xl">
              {t("mission_countdown.seven_day_mission", "7 Day Mission")}<br />
              {t("mission_countdown.to", "to")} <span className="pulse-gradient-text">
                {t("mission_countdown.meet_in_real_life", "Meet in Real Life")}
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto text-center">
              {t("mission_countdown.description", "Every crew has the same mission: connect and plan a real-life activity within the 7-day deadline. Start by taking our personality quiz to find your crew!")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* First Mission Container */}
            <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-4 sm:p-6 md:p-8 text-center">
              <div>
                <h3 className="text-base font-medium text-white/70 uppercase tracking-wider mb-6 text-center">
                  {t("mission_countdown.get_matched", "Get Matched")}
                </h3>
                <div className="flex justify-center mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white tracking-tight md:text-2xl">
                      {t("mission_countdown.next_friend_match", "Next friend match happens in...")}
                    </h4>
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center">
                  <TimerDisplay {...timeLeft} />
                </div>
                <div className="mt-6">
                  <Link to="/cities">
                    <Button size="xl" className="bg-[#FF2688] hover:bg-[#FF2688]/90 text-white shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 rounded-full">
                      <span>{t("mission_countdown.get_matched_now", "Get Matched Now")}</span>
                    </Button>  
                  </Link>
                </div>
              </div>
            </div>

            {/* Second Mission Container */}
            
          </div>
        </div>
      </div>
    </section>;
};
export default MissionCountdown;