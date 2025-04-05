
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Define our unique icebreaker characters
const icebreakers = [{
  id: "baba-yaga",
  name: "Baba Yaga",
  tagline: "Ancient & Wicked",
  avatar: "/lovable-uploads/aa5d117e-d012-4bcd-b7b6-09b64d034f78.png",
  color: "from-emerald-800 to-emerald-950",
  bgColor: "bg-emerald-800/30",
  message: "If you were to trap another player in my haunted forest, what dark secret would you reveal about them to ensure they never escape?"
}, {
  id: "sherlock",
  name: "Sherlock Holmes",
  tagline: "Theatrical & Deductive",
  avatar: "/lovable-uploads/ee0c88d9-5380-4021-aef8-a0b7f194feda.png",
  color: "from-blue-600 to-blue-800",
  bgColor: "bg-blue-600/20",
  message: "Share three statements about yourself—two true, one false—and let's see if your companions can deduce which is the clever lie."
}, {
  id: "drag-queen",
  name: "Divine Diva",
  tagline: "Fabulous & Bold",
  avatar: "https://images.unsplash.com/photo-1589643138280-f39694648e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  color: "from-pink-500 to-purple-600",
  bgColor: "bg-pink-500/20",
  message: "Darlings! If your life had a theme song that played whenever you entered a room, what would it be and why?"
}, {
  id: "baby-yoda",
  name: "Baby Yoda",
  tagline: "Cute & Innocent",
  avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  color: "from-green-500 to-green-700",
  bgColor: "bg-green-500/20",
  message: "Favorite snack from childhood, what is? Share why special to you, hmm?"
}];

const CharacterCard = ({
  character
}) => {
  return <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 overflow-hidden mr-3 ring-2 ring-white/50 ${character.bgColor} rounded-full`}>
            <Avatar className="w-full h-full">
              <AvatarImage src={character.avatar} alt={character.name} className="object-cover object-center w-full h-full" />
              <AvatarFallback className={`bg-gradient-to-br ${character.color} text-white`}>
                {character.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{character.name}</h3>
            <p className="text-sm text-gray-300">{character.tagline}</p>
          </div>
        </div>
        
        {/* Character message */}
        <div className="mb-4">
          <div className={`rounded-2xl px-4 py-3 bg-gradient-to-r ${character.color} text-white`}>
            <p className="text-sm font-medium mb-1">{character.name}</p>
            <p className="text-sm">{character.message}</p>
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-2">
          {character.id === "baba-yaga" ? 
            "A cackling force of dark magic who twists your tales into haunted nightmares." : 
            character.id === "sherlock" ?
            "The world's most theatrical detective leading a game of deception and clever deduction." :
            `${character.name} creates a ${character.tagline.toLowerCase()} environment for authentic sharing.`}
        </div>
      </CardContent>
    </Card>;
};

const AiIcebreakers = () => {
  return <div className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4 text-pulse-purple" />
            <span className="text-sm font-medium text-pulse-purple">AI Icebreakers</span>
          </motion.div>
          
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Spark Meaningful <span className="pulse-gradient-text">Conversations</span>
          </motion.h2>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Each character brings a unique personality to break the ice and spark engaging conversations
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {icebreakers.map(character => <motion.div key={character.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
              <CharacterCard character={character} />
            </motion.div>)}
        </div>
        
        {/* Call to action - Updated with Link to matchmaking */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="flex justify-center mt-12">
          <Link to="/matchmaking">
            <Button 
              size="xl"
              variant="gradient"
              className="rounded-full shadow-lg shadow-purple-500/20"
            >
              Meet all our icebreakers
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>;
};

export default AiIcebreakers;
