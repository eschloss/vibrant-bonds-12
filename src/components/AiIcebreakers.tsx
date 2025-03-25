import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, CalendarDays, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const messages = [{
  id: 1,
  user: "Pulse AI",
  avatar: "/lovable-uploads/38e3c054-e0e0-4011-bd40-d167b312c66d.png",
  message: "What's one place you've always wanted to visit but haven't had the chance yet?",
  type: "ai",
  delay: 0
}, {
  id: 2,
  user: "Sarah",
  avatar: "https://source.unsplash.com/random/100x100/?portrait&woman",
  message: "I've always dreamed of visiting Kyoto during cherry blossom season! The temples and gardens look magical.",
  type: "user",
  delay: 2
}, {
  id: 3,
  user: "James",
  avatar: "https://source.unsplash.com/random/100x100/?portrait&man",
  message: "Same! Japan is high on my list. I'm also fascinated by the food culture there.",
  type: "user",
  delay: 3.5
}, {
  id: 4,
  user: "Mia",
  avatar: "https://source.unsplash.com/random/100x100/?portrait&woman2",
  message: "I've been to Tokyo but missed Kyoto. We should plan a group trip!",
  type: "user",
  delay: 5
}, {
  id: 5,
  user: "Kevin",
  avatar: "https://source.unsplash.com/random/100x100/?portrait&man2",
  message: "I'd be down for that! When were you thinking?",
  type: "user",
  delay: 6.5
}, {
  id: 6,
  user: "Pulse AI",
  avatar: "/lovable-uploads/38e3c054-e0e0-4011-bd40-d167b312c66d.png",
  message: "Great conversation! I see you're all interested in Japan. Would you like to set up a video call this weekend to discuss plans?",
  type: "ai",
  delay: 8
}];
const countdownDays = 12;
const MessageBubble = ({
  message,
  visible
}) => {
  const isAi = message.type === "ai";
  return <motion.div initial={{
    opacity: 0,
    y: 20,
    scale: 0.95
  }} animate={visible ? {
    opacity: 1,
    y: 0,
    scale: 1
  } : {
    opacity: 0,
    y: 20,
    scale: 0.95
  }} transition={{
    duration: 0.5
  }} className={`flex ${isAi ? "justify-start" : "justify-end"} mb-4`}>
      <div className={`flex ${isAi ? "flex-row" : "flex-row-reverse"} max-w-xs md:max-w-md items-end gap-2`}>
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={message.avatar} alt={message.user} className="w-full h-full object-cover" />
        </div>
        <div className={`rounded-2xl px-4 py-3 ${isAi ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white" : "bg-gray-800 dark:bg-gray-800/80 backdrop-blur-sm text-white"}`}>
          <p className="text-xs font-medium mb-1">{message.user}</p>
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    </motion.div>;
};
const AiIcebreakers = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  useEffect(() => {
    const timers = messages.map(message => {
      return setTimeout(() => {
        setVisibleMessages(prev => [...prev, message.id]);
      }, message.delay * 1000);
    });
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
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
            <span className="text-sm font-medium text-pulse-purple">AI-Powered Conversations</span>
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
            From Chat to <span className="pulse-gradient-text">Real-Life</span> Connections
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
        }} className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Our AI helps spark meaningful conversations that lead to real-world friendships
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Message animation */}
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
          delay: 0.3
        }} className="lg:col-span-7 bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-pulse-purple" />
                <h3 className="text-lg font-medium text-white">Japan Travel Group</h3>
              </div>
              
            </div>
            
            <div className="overflow-y-auto max-h-96 pr-2 -mr-2">
              <AnimatePresence>
                {messages.map(message => <MessageBubble key={message.id} message={message} visible={visibleMessages.includes(message.id)} />)}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Features */}
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
          delay: 0.4
        }} className="lg:col-span-5 space-y-4">
            <Card className="backdrop-blur-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-pulse-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Icebreakers</h3>
                    <p className="text-gray-300">Our intelligent conversation starters help everyone feel welcome and engaged</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-pulse-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Group Formation</h3>
                    <p className="text-gray-300">Connect with people who share your interests and plan activities together</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-500/20 p-3 rounded-lg">
                    <CalendarDays className="w-6 h-6 text-pulse-pink" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Meetup Countdown</h3>
                    <p className="text-gray-300">Every group has 30 days to plan their first in-person meetup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default AiIcebreakers;