
import React from "react";
import { motion } from "framer-motion";
import { Mic, Map, Users, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
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
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
            <p className="text-xl text-gray-300 mb-6">
              How a traveling opera singer created a new way to form meaningful friendships
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Founder's Story - Simplified */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="relative">
                <img 
                  src="/lovable-uploads/8e380861-65d4-4d89-96b3-2de89a3e831c.png" 
                  alt="Eric performing opera" 
                  className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full object-cover aspect-[4/3]" 
                />
                <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-pulse-purple to-pulse-blue p-4 rounded-xl shadow-lg">
                  <Mic size={32} className="text-white" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 md:col-span-3"
            >
              <h2 className="text-3xl font-bold">The Journey</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full"></div>
              <p className="text-gray-300 text-lg">
                Pulse began with our founder Eric, a software engineer at Harvard's Research Lab who traveled the world as an opera performer. Living in 10 cities across 3 continents, he discovered a formula for making meaningful connections in new places.
              </p>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                title: "Like-minded People",
                description: "The strongest bonds form between people who share core values and interests."
              },
              {
                icon: <Map className="h-6 w-6 text-pulse-blue" />,
                title: "Shared Experiences",
                description: "Breaking bread together and exploring creates shared context that accelerates relationships."
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-pulse-pink" />,
                title: "Meaningful Conversations",
                description: "The right prompts allow people to bypass small talk and connect on a deeper level."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <Separator className="w-20 h-1 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full mx-auto mt-4 mb-8" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 md:p-12 rounded-3xl border border-purple-700/30 shadow-xl shadow-purple-500/10"
          >
            <blockquote className="text-xl md:text-2xl font-light italic text-center mb-6">
              "In a world where technology often isolates us, Pulse uses technology to bring us together in the real world. We're creating a global community where authentic friendships form naturally and no one ever has to feel alone in a new city again."
            </blockquote>
            <div className="flex justify-center">
              <p className="text-lg font-medium">— Eric, Founder</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA - Simplified */}
      <section className="py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-300 mb-6">
              Experience the Pulse approach to forming meaningful friendships in your city
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cities">
                <Button size="lg" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                  Find your city
                </Button>
              </Link>
              <Link to="/matchmaking">
                <Button size="lg" variant="coral" className="rounded-full shadow-lg shadow-pink-500/20 w-full sm:w-auto">
                  Get matched
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
