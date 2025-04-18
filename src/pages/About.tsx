import React from "react";
import { motion } from "framer-motion";
import { Mic, Map, Users, MessageSquare, Sparkles, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const About = () => {
  return <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 md:text-5xl whitespace-pre-line">From Isolation to Connection:
How Pulse Was Born</h1>
            <p className="text-xl text-gray-300 mb-6">Our founder’s global journey—from opera stages to software labs—led to a surprising insight about how we build real friendships. That insight became Pulse: a new kind of social platform for meaningful connection in real life.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Founder's Story - Simplified */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="md:col-span-2">
              <div className="relative">
                <img src="/lovable-uploads/8e380861-65d4-4d89-96b3-2de89a3e831c.png" alt="Eric performing opera" className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full object-cover aspect-[4/3]" />
                
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="space-y-6 md:col-span-3">
              <h2 className="text-3xl font-bold">The Journey</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full"></div>
              <p className="text-gray-300 text-lg whitespace-pre-line">After living in 10 cities across 3 continents, Eric noticed a pattern: despite being surrounded by people, forming real friendships in a new place was hard—and tech wasn’t helping. As both a software engineer and an opera singer performing internationally, he experienced the highs of human connection—and the lows of isolation. He began to ask: What actually makes people feel close?

 That led to a simple but powerful insight: “When you bring the right people together in the right setting, friendships form naturally.” Pulse was built to make that happen—on purpose, and at scale.</p>
              <p className="text-gray-300 text-lg">
                "I realized that forming friendships is surprisingly simple when you connect like-minded people in settings where they can share interests. That insight became the foundation of Pulse."
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800">
                  <Map className="h-4 w-4 text-pulse-blue" />
                  <span className="text-sm font-medium">Global Perspective</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800">
                  <Mic className="h-4 w-4 text-pulse-purple" />
                  <span className="text-sm font-medium">Opera Singer</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800">
                  <Sparkles className="h-4 w-4 text-pulse-pink" />
                  <span className="text-sm font-medium">Software Engineer</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The Friendship Formula - Consolidated insights */}
      <section className="py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Friendship Formula</h2>
            <p className="text-xl text-gray-300">
              Three key insights that became the foundation of Pulse
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[{
            icon: <Users className="h-6 w-6 text-pulse-purple" />,
            title: "Shared Context",
            description: "The strongest bonds form between people who share core values and interests."
          }, {
            icon: <Map className="h-6 w-6 text-pulse-blue" />,
            title: "Repeated In-Person Interaction",
            description: "need to meet repeatedly and it must be in person to fast-track a frienship"
          }, {
            icon: <MessageSquare className="h-6 w-6 text-pulse-pink" />,
            title: "A little Nudge",
            description: "Someone in the friendship has to nag the other to meet regularly."
          }].map((item, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2 * index
          }} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col h-full">
                <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 flex-grow">
                  {item.description}
                </p>
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* Our Mission - Simplified with quote */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <Separator className="w-20 h-1 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full mx-auto mt-4 mb-8" />
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 md:p-12 rounded-3xl border border-purple-700/30 shadow-xl shadow-purple-500/10">
            <blockquote className="text-xl md:text-2xl font-light italic text-center mb-6">"In a world where technology often isolates us, Pulse uses tech to bring people together. We’re building a world where forming meaningful friendships is no longer left to chance."</blockquote>
            <div className="flex justify-center">
              <p className="text-lg font-medium">— Eric, Founder</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA - Updated for meeting new friends */}
      <section className="py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Meet New Friends?</h2>
            <p className="text-lg text-gray-300 mb-6">
              Join our community and connect with like-minded people in your city who share your interests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://482tykjn26x.typeform.com/pulse#city=" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Start Meeting People
                </Button>
              </a>
              <Link to="/cities">
                <Button size="lg" variant="coral" className="rounded-full shadow-lg shadow-pink-500/20 w-full sm:w-auto">
                  Find Your City
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default About;