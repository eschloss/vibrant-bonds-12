import React from "react";
import { motion } from "framer-motion";
import { Mic, Map, Globe, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
const About = () => {
  return <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl"></div>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              How a traveling opera singer created a new way to form meaningful friendships
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Founder's Story */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
          }}>
              <div className="relative">
                <img src="/lovable-uploads/8e380861-65d4-4d89-96b3-2de89a3e831c.png" alt="Eric performing opera with orchestra" className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full object-cover aspect-[4/3]" />
                <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-pulse-purple to-pulse-blue p-4 rounded-xl shadow-lg">
                  <Mic size={32} className="text-white" />
                </div>
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
          }} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Software Developer & Travelling Opera Performer</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full"></div>
              <p className="text-gray-300 text-lg">The idea of Pulse was born on the road, by our Founder, Eric. As a Software Engineer working remote for Harvard's Research Lab, he was travelling the world performing as an opera singer. After living in 10 cities in 3 continents, Eric had to constantly make friends.</p>
              <p className="text-gray-300 text-lg">"After a few time, I saw how easy it was to make new friends. All it requires is to meet likeminded people in a setting where we can share our interests. That is what Pulse is all about, making it easy to get together and share something of passion and interest.</p>
              <div className="flex gap-4 pt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800">
                  <Globe className="h-4 w-4 text-pulse-blue" />
                  <span className="text-sm font-medium">Global Experience</span>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800">
                  <Mic className="h-4 w-4 text-pulse-purple" />
                  <span className="text-sm font-medium">Opera Singer</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The Insight */}
      <section className="py-16 md:py-24 bg-gray-800/30">
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
        }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Insight</h2>
            <p className="text-xl text-gray-300">
              Over years of building friendships around the world, Eric discovered a pattern that would become the foundation of Pulse.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-purple-800/30 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-pulse-purple" />
              </div>
              <h3 className="text-xl font-bold mb-4">Likeminded People</h3>
              <p className="text-gray-300">
                The strongest bonds form between people who share core values and interests, creating natural chemistry and understanding.
              </p>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-blue-800/30 rounded-full flex items-center justify-center mb-6">
                <Map className="h-6 w-6 text-pulse-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Shared Experiences</h3>
              <p className="text-gray-300">
                Breaking bread together, exploring a new city, or attending performances created the shared context that accelerated relationships.
              </p>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-pink-800/30 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-pulse-pink" />
              </div>
              <h3 className="text-xl font-bold mb-4">Meaningful Conversation</h3>
              <p className="text-gray-300">
                The right prompts and environment allowed people to bypass small talk and connect on a deeper level faster.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Birth of Pulse */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
          }} className="order-2 md:order-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Birth of Pulse</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-pulse-purple to-pulse-blue rounded-full"></div>
              <p className="text-gray-300 text-lg">
                When Eric settled down after years on the road, he couldn't stop thinking about the formula for friendship he'd discovered through trial and error.
              </p>
              <p className="text-gray-300 text-lg">
                "I realized that so many people struggle with the same challenge of making meaningful connections, especially in new cities. The methods I'd learned could be systematized and shared."
              </p>
              <p className="text-gray-300 text-lg">
                Pulse was born from this insight—an app that brings together like-minded people in small groups of 8-12, provides AI-powered conversation starters, and facilitates in-person meetups where real bonds can form.
              </p>
              <div className="pt-6">
                <Link to="/matchmaking">
                  <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20">
                    Experience it yourself
                  </Button>
                </Link>
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
          }} className="order-1 md:order-2">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Friends enjoying time together" className="rounded-2xl shadow-2xl shadow-purple-500/20 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-5 -left-5 bg-gradient-to-r from-pulse-coral to-pulse-pink p-4 rounded-xl shadow-lg">
                  <Users size={32} className="text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="py-16 md:py-24 bg-gray-800/30">
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
        }} className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
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
        }} className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-10 md:p-16 rounded-3xl border border-purple-700/30 shadow-xl shadow-purple-500/10">
            <blockquote className="text-xl md:text-2xl font-light italic text-center mb-6">
              "In a world where technology often isolates us, Pulse uses technology to bring us together in the real world. We're creating a global community where authentic friendships form naturally and no one ever has to feel alone in a new city again."
            </blockquote>
            <div className="flex justify-center">
              <p className="text-lg font-medium">— Eric, Founder & CEO</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the Pulse approach to forming meaningful friendships in your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cities">
                <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 w-full sm:w-auto">
                  Find your city
                </Button>
              </Link>
              <Link to="/matchmaking">
                <Button size="xl" variant="coral" className="rounded-full shadow-lg shadow-pink-500/20 w-full sm:w-auto">
                  Get matched
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