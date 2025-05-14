
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

// Define our unique icebreaker characters
const icebreakers = [{
  id: "baba-yaga",
  name: "Baba Yaga",
  tagline: "Choose Your Own Adventure",
  avatar: "/lovable-uploads/aa5d117e-d012-4bcd-b7b6-09b64d034f78.png",
  color: "from-emerald-800 to-emerald-950",
  bgColor: "bg-emerald-800/30",
  message: "Welcome, little wanderer. The mushrooms are watching. The shadows are bored. Pick someone here and invent a magical creature you two discovered while lost in my forest. Give it a name. Quick!"
}, {
  id: "mother-flawless",
  name: "Mother Flawless",
  tagline: "Toast or Roast",
  avatar: "/lovable-uploads/c8835787-8f77-40c7-9df3-f0f092e43f1d.png",
  color: "from-pink-500 to-purple-600",
  bgColor: "bg-pink-500/20",
  message: "Alright, darlings. I'm choosing someone in this room—and when I do, I'm either going to crown you with praise or roast you to ashes. Buckle up."
}, {
  id: "judge-snooty",
  name: "Judge Snooty",
  tagline: "Chaos Courtroom",
  avatar: "/lovable-uploads/4511f010-fca9-4375-992c-dba8555e7191.png",
  color: "from-amber-500 to-amber-700",
  bgColor: "bg-amber-500/20",
  message: "I hereby accuse YOU of a ridiculous crime! What's your defense, and who in this room would you implicate as your accomplice?"
}, {
  id: "sherlock",
  name: "Sherlock Holmes",
  tagline: "Two Truths and a Lie",
  avatar: "/lovable-uploads/ee0c88d9-5380-4021-aef8-a0b7f194feda.png",
  color: "from-blue-600 to-blue-800",
  bgColor: "bg-blue-600/20",
  message: "Share three statements about yourself—two true, one false—and let's see if your companions can deduce which is the clever lie."
}];

const CharacterCard = ({ character }) => {
  return (
    <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 h-full py-0">
      <CardContent className="p-6 my-0 py-[24px] px-[12px]">
        <div className="mb-4">
          <p className="text-gray-300 text-xl text-center my-0 py-0 px-[25px]">{character.tagline}</p>
        </div>
        
        <div className="mb-4 relative px-0">
          <div className={`rounded-2xl px-4 py-3 bg-gradient-to-r ${character.color} text-white mb-4 ml-8`}>
            <p className="text-sm font-normal">{character.message}</p>
            <p className="text-sm mx-0 my-0 text-left font-normal py-[3px]">&nbsp;&nbsp;- {character.name}</p>
          </div>
          
          <div className={`absolute -bottom-3 left-0 w-12 h-12 overflow-hidden ring-2 ring-white/50 ${character.bgColor} rounded-full`}>
            <Avatar className="w-full h-full">
              <AvatarImage src={character.avatar} alt={character.name} className="object-cover object-center w-full h-full" />
              <AvatarFallback className={`bg-gradient-to-br ${character.color} text-white`}>
                {character.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AiIcebreakers = () => {
  const { t } = useTranslation();
  
  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm"
          >
            <MessageSquare className="w-4 h-4 text-pulse-purple" />
            <span className="text-sm font-medium text-pulse-purple">{t("icebreakers.title", "AI Icebreakers")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white mb-4 md:text-5xl"
          >
            {t("icebreakers.heading", "Spark")} <span className="pulse-gradient-text">{t("icebreakers.heading", "Meaningful Conversations")}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          >
            {t("icebreakers.description", "Each character brings a unique personality to break the ice and spark engaging conversations")}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {icebreakers.map(character => (
            <motion.div 
              key={character.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CharacterCard character={character} />
            </motion.div>
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
