
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Users, Calendar } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Define our unique icebreaker characters
const icebreakers = [
  {
    id: "baba-yaga",
    name: "Baba Yaga",
    tagline: "Mystical & Wise",
    avatar: "https://source.unsplash.com/random/200x200/?witch",
    color: "from-emerald-500 to-emerald-700",
    bgColor: "bg-emerald-500/20",
    message: "If you could possess any magical ability for a day, what would it be and how would you use it?",
    responses: [
      {
        name: "Maya",
        message: "I'd choose invisibility—not to spy, but to observe how people behave when they think no one's watching."
      },
      {
        name: "Leo",
        message: "Time manipulation! I'd slow down those perfect moments we never want to end."
      }
    ]
  },
  {
    id: "sherlock",
    name: "Sherlock Holmes",
    tagline: "Analytical & Curious",
    avatar: "https://source.unsplash.com/random/200x200/?detective",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-500/20",
    message: "Based on observable evidence, what unusual hobby do you think the person to your left might secretly enjoy?",
    responses: [
      {
        name: "Priya",
        message: "From the calluses on James' fingers and his rhythmic tapping, I deduce he's secretly a guitarist!"
      },
      {
        name: "James",
        message: "Guilty as charged! I've been learning jazz guitar for six months now."
      }
    ]
  },
  {
    id: "drag-queen",
    name: "Divine Diva",
    tagline: "Fabulous & Bold",
    avatar: "https://source.unsplash.com/random/200x200/?glamour",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-pink-500/20",
    message: "Darlings! If your life had a theme song that played whenever you entered a room, what would it be and why?",
    responses: [
      {
        name: "Alex",
        message: "\"Don't Stop Me Now\" by Queen! Because I'm having such a good time, I'm having a ball!"
      },
      {
        name: "Taylor",
        message: "Mine would be \"This Is Me\" from The Greatest Showman—it's all about embracing who you are!"
      }
    ]
  },
  {
    id: "baby-yoda",
    name: "Baby Yoda",
    tagline: "Cute & Innocent",
    avatar: "https://source.unsplash.com/random/200x200/?cute",
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-500/20",
    message: "Favorite snack from childhood, what is? Share why special to you, hmm?",
    responses: [
      {
        name: "Raj",
        message: "Those fruit roll-ups! I used to unroll them completely before eating them piece by piece."
      },
      {
        name: "Emma",
        message: "My grandma's homemade cookies. She'd let me add whatever mix-ins I wanted. Usually meant way too many chocolate chips!"
      }
    ]
  }
];

const CharacterCard = ({ character, isActive, onClick }) => {
  return (
    <motion.div 
      className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'border-2 border-white shadow-lg' : 'opacity-70 hover:opacity-90'}`}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <div className={`h-full bg-gray-800/60 backdrop-blur-sm p-4 flex flex-col items-center`}>
        <div className={`w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-white/50 ${character.bgColor}`}>
          <Avatar className="w-full h-full">
            <AvatarImage src={character.avatar} alt={character.name} />
            <AvatarFallback className={`bg-gradient-to-br ${character.color} text-white`}>
              {character.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{character.name}</h3>
        <p className="text-sm text-gray-300 text-center">{character.tagline}</p>
      </div>
    </motion.div>
  );
};

const MessageBubble = ({ name, message, isCharacter, color }) => (
  <div className={`flex ${isCharacter ? "justify-start" : "justify-end"} mb-4`}>
    <div className={`max-w-xs md:max-w-md ${isCharacter ? "" : "ml-auto"}`}>
      <div className={`rounded-2xl px-4 py-3 ${isCharacter 
        ? `bg-gradient-to-r ${color} text-white` 
        : "bg-gray-800/80 backdrop-blur-sm text-white"}`}>
        <p className="text-xs font-medium mb-1">{name}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

const AiIcebreakers = () => {
  const [activeCharacter, setActiveCharacter] = useState(icebreakers[0]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24">
      {/* Background gradients */}
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
            <span className="text-sm font-medium text-pulse-purple">Meet The Characters</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Choose Your <span className="pulse-gradient-text">Conversation Starter</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Our AI characters bring unique personalities to your group chats, making breaking the ice fun and effortless
          </motion.p>
        </div>
        
        {/* Character selector carousel for mobile */}
        <div className="block md:hidden mb-10">
          <Carousel className="w-full">
            <CarouselContent>
              {icebreakers.map((character) => (
                <CarouselItem key={character.id} className="md:basis-1/2 lg:basis-1/3">
                  <CharacterCard 
                    character={character} 
                    isActive={activeCharacter.id === character.id}
                    onClick={() => setActiveCharacter(character)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 left-0 mr-2" />
              <CarouselNext className="relative static translate-y-0 right-0" />
            </div>
          </Carousel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Character selector for desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:block md:col-span-3 space-y-4"
          >
            {icebreakers.map((character) => (
              <CharacterCard 
                key={character.id}
                character={character} 
                isActive={activeCharacter.id === character.id}
                onClick={() => setActiveCharacter(character)}
              />
            ))}
          </motion.div>
          
          {/* Message preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-9 bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full overflow-hidden ${activeCharacter.bgColor}`}>
                  <Avatar>
                    <AvatarImage src={activeCharacter.avatar} alt={activeCharacter.name} />
                    <AvatarFallback className={`bg-gradient-to-br ${activeCharacter.color} text-white`}>
                      {activeCharacter.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeCharacter.name}</h3>
                  <p className="text-xs text-gray-300">{activeCharacter.tagline}</p>
                </div>
              </div>
              <div className="bg-gray-700/50 text-xs text-gray-300 py-1 px-3 rounded-full">
                Today, 2:30 PM
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-80 space-y-4">
              {/* Character message */}
              <MessageBubble 
                name={activeCharacter.name}
                message={activeCharacter.message}
                isCharacter={true}
                color={activeCharacter.color}
              />
              
              {/* User responses */}
              {activeCharacter.responses.map((response, index) => (
                <MessageBubble 
                  key={index}
                  name={response.name}
                  message={response.message}
                  isCharacter={false}
                />
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Why This Works:</h4>
              <p className="text-sm text-gray-400">
                {activeCharacter.name} creates a playful, low-pressure environment for sharing personal stories,
                encouraging authentic connections between group members.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Call to action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button 
            size="lg" 
            className="px-8 py-6 rounded-full text-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20"
          >
            Try Our Icebreaker Characters
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AiIcebreakers;
