import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Map, Users, MessageSquare, Sparkles, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  useEffect(() => {
    // Reset any scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              duration: 0.5
            }} 
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-4 md:text-5xl whitespace-pre-line">From Isolation to Connection:
How Pulse Was Born</h1>
            <p className="text-xl text-gray-300 mb-6">Our founder's global journey—from performing on opera stages to building human-centered tech—led to a quiet but powerful realization about how real friendships form. That insight became Pulse: a new kind of social platform designed to turn digital connections into real-life friendships</p>
          </motion.div>
        </div>
      </section>
      
      {/* Founder's Story - Simplified */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div 
              initial={{
                opacity: 0,
                x: -20
              }} 
              whileInView={{
                opacity: 1,
                x: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.6
              }} 
              className="md:col-span-2"
            >
              <div className="relative">
                <img alt="Eric performing opera" src="/lovable-uploads/41aeb601-a150-497b-bf78-4174c5e9ed71.jpg" className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full aspect-[2/3] object-fill" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{
                opacity: 0,
                x: 20
              }} 
              whileInView={{
                opacity: 1,
                x: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.6,
                delay: 0.2
              }} 
              className="space-y-6 md:col-span-3"
            >
              <h2 className="text-3xl font-bold">The Journey</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full"></div>
              <p className="text-gray-300 text-lg">After moving 10 times across 5 countries, Eric got good at making friends from scratch—but also saw just how hard it is for most people. Even with all the social apps out there, millions still feel disconnected. As a software engineer and former opera singer, he experienced both the highs of human connection and the quiet reality of isolation.</p>
              <blockquote className="my-8 px-8 py-6 bg-gradient-to-r from-pulse-purple/10 to-pulse-blue/10 rounded-2xl border-l-4 border-pulse-pink relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-pulse-pink rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">"</span>
                </div>
                <p className="text-gray-300 text-2xl italic leading-relaxed">
                  What I learned—after starting over so many times—is that friendship takes more than a one-off coffee. Meeting someone new is actually the easy part. What's hard is building the rhythm: shared context, repeated time together, and someone willing to say, "Let's do this again next week!"
                </p>
              </blockquote>
              <p className="text-gray-300 text-lg">Those lessons became Pulse: a new kind of social platform that helps people turn strangers into real friends, in real life.</p>
              
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
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.6
            }} 
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Friendship Formula</h2>
            <p className="text-xl text-gray-300">
              Three key insights that became the foundation of Pulse
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="h-6 w-6 text-pulse-purple" />,
                title: "Shared Context",
                description: "The strongest bonds form between people who share core values and interests."
              }, 
              {
                icon: <Map className="h-6 w-6 text-pulse-blue" />,
                title: "Repeated In-Person Interaction",
                description: "You can't build a real friendship from a one-off meetup. It takes seeing each other again and again—and it has to happen in real life."
              }, 
              {
                icon: <MessageSquare className="h-6 w-6 text-pulse-pink" />,
                title: "A little Nudge",
                description: 'Every great friendship has someone who says, "Let\'s hang out." Pulse plays that role—helping people follow through and stay connected.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0
                }} 
                viewport={{
                  once: true
                }} 
                transition={{
                  duration: 0.6,
                  delay: 0.2 * index
                }} 
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 flex-grow">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Mission - Simplified with quote */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.6
            }} 
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <Separator className="w-20 h-1 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full mx-auto mt-4 mb-8" />
          </motion.div>
          
          <motion.div 
            initial={{
              opacity: 0,
              scale: 0.95
            }} 
            whileInView={{
              opacity: 1,
              scale: 1
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.6
            }} 
            className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 md:p-12 rounded-3xl border border-purple-700/30 shadow-xl shadow-purple-500/10"
          >
            <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 border-l-4 border-pulse-pink pl-4 py-2 bg-gray-800/30 rounded-r-xl">
              "What I learned—after starting over so many times—is that friendship takes more than a one-off coffee. Meeting someone new is actually the easy part. What's hard is building the rhythm: shared context, repeated time together, and someone willing to say, 'Let's do this again next week!'"
            </blockquote>
            <div className="flex justify-center">
              <p className="text-lg font-medium">— Eric, Founder</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA - Updated for meeting new friends */}
      <section className="py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{
              opacity: 0,
              y: 20
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.6
            }} 
            className="max-w-2xl mx-auto"
          >
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
    </div>
  );
};

export default About;
