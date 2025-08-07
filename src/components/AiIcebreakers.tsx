
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

// Define our unique icebreaker characters with translation keys
const getIcebreakers = (t) => [{
  id: "baba-yaga",
  name: t("icebreakers.characters.baba_yaga.name", "Baba Yaga"),
  tagline: t("icebreakers.characters.baba_yaga.tagline", "Choose Your Own Adventure"),
  avatar: "/lovable-uploads/aa5d117e-d012-4bcd-b7b6-09b64d034f78.png",
  color: "from-emerald-800 to-emerald-950",
  bgColor: "bg-emerald-800/30",
  message: t("icebreakers.characters.baba_yaga.message", "Welcome, little wanderer. The mushrooms are watching. The shadows are bored. Pick someone here and invent a magical creature you two discovered while lost in my forest. Give it a name. Quick!")
}, {
  id: "mother-flawless",
  name: t("icebreakers.characters.mother_flawless.name", "Mother Flawless"),
  tagline: t("icebreakers.characters.mother_flawless.tagline", "Toast or Roast"),
  avatar: "/lovable-uploads/c8835787-8f77-40c7-9df3-f0f092e43f1d.png",
  color: "from-pink-500 to-purple-600",
  bgColor: "bg-pink-500/20",
  message: t("icebreakers.characters.mother_flawless.message", "Alright, darlings. I'm choosing someone in this room—and when I do, I'm either going to crown you with praise or roast you to ashes. Buckle up.")
}, {
  id: "judge-snooty",
  name: t("icebreakers.characters.judge_snooty.name", "Judge Snooty"),
  tagline: t("icebreakers.characters.judge_snooty.tagline", "Chaos Courtroom"),
  avatar: "/lovable-uploads/4511f010-fca9-4375-992c-dba8555e7191.png",
  color: "from-amber-500 to-amber-700",
  bgColor: "bg-amber-500/20",
  message: t("icebreakers.characters.judge_snooty.message", "I hereby accuse YOU of a ridiculous crime! What's your defense, and who in this room would you implicate as your accomplice?")
}, {
  id: "sherlock",
  name: t("icebreakers.characters.sherlock.name", "Sherlock Holmes"),
  tagline: t("icebreakers.characters.sherlock.tagline", "Two Truths and a Lie"),
  avatar: "/lovable-uploads/ee0c88d9-5380-4021-aef8-a0b7f194feda.png",
  color: "from-blue-600 to-blue-800",
  bgColor: "bg-blue-600/20",
  message: t("icebreakers.characters.sherlock.message", "Share three statements about yourself—two true, one false—and let's see if your companions can deduce which is the clever lie.")
}];

const CharacterCard = ({ character, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, opacity }}
      initial={{ 
        opacity: 0, 
        y: 60,
        rotateX: 15,
        z: -100
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        z: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.165, 0.84, 0.44, 1],
        type: "spring",
        stiffness: 60,
        damping: 15
      }}
      whileHover={{ 
        y: -12,
        rotateY: 2,
        scale: 1.02,
        transition: { 
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
      className="will-change-transform perspective-1000"
    >
      <motion.div
        whileHover={{
          background: "rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/30 h-full group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 ease-out overflow-hidden">
          <CardContent className="p-8 pb-12 relative">
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${character.color.split(' ')[1]} 0%, transparent 50%)`
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2 + 0.3, 
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="mb-6 relative z-10"
            >
              <motion.p 
                className="text-gray-300 text-xl text-center group-hover:text-white transition-colors duration-500"
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {character.tagline}
              </motion.p>
            </motion.div>
            
            <div className="mb-6 relative z-10">
              <motion.div 
                initial={{ 
                  opacity: 0, 
                  x: 30,
                  scale: 0.9
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                transition={{ 
                  delay: index * 0.2 + 0.5, 
                  duration: 0.9,
                  ease: [0.165, 0.84, 0.44, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                whileHover={{
                  scale: 1.02,
                  x: 4,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }
                }}
                className={`rounded-2xl px-6 py-4 bg-gradient-to-r ${character.color} text-white mb-6 ml-10 shadow-lg group-hover:shadow-xl transition-all duration-500 relative overflow-hidden`}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                
                <motion.p 
                  className="text-sm font-normal relative z-10"
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1 }}
                >
                  {character.message}
                </motion.p>
                <motion.p 
                  className="text-sm text-left font-medium pt-2 relative z-10"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  — {character.name}
                </motion.p>
              </motion.div>
              
              <motion.div 
                initial={{ 
                  opacity: 0, 
                  scale: 0.3,
                  rotate: -20
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 0
                }}
                transition={{ 
                  delay: index * 0.2 + 0.7, 
                  duration: 0.8,
                  ease: [0.165, 0.84, 0.44, 1],
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: 5,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }
                }}
                className={`absolute -bottom-4 left-0 w-14 h-14 ring-2 ring-white/40 ${character.bgColor} rounded-full transition-all duration-500 group-hover:ring-white/80 group-hover:ring-4 will-change-transform shadow-lg group-hover:shadow-xl`}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="w-full h-full rounded-full overflow-hidden"
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage 
                      src={character.avatar} 
                      alt={character.name} 
                      className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110" 
                    />
                    <AvatarFallback className={`bg-gradient-to-br ${character.color} text-white text-xs font-bold`}>
                      {character.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const AiIcebreakers = () => {
  const { t } = useTranslation();
  const icebreakers = getIcebreakers(t);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden opacity-20"
      >
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl animate-ambient-drift"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl animate-sophisticated-float"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl animate-ambient-drift" style={{ animationDelay: '8s' }}></div>
      </motion.div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm animate-elegant-scale"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <MessageSquare className="w-4 h-4 text-pulse-purple" />
            </motion.div>
            <span className="text-sm font-medium text-pulse-purple">{t("icebreakers.title", "AI Icebreakers")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight text-white mb-4 md:text-5xl"
          >
            {t("icebreakers.heading1", "Spark")} <span className="pulse-gradient-text">{t("icebreakers.heading2", "Meaningful Conversations")}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          >
            {t("icebreakers.description", "Each character brings a unique personality to break the ice and spark engaging conversations")}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {icebreakers.map((character, index) => (
            <CharacterCard key={character.id} character={character} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link to="/matchmaking">
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AiIcebreakers;
