import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Asterisk, Network, CalendarDays, Sparkles, Gamepad2, Briefcase, GraduationCap, Building, Megaphone, MessageSquare, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import AiIcebreakers from "@/components/AiIcebreakers";
import CommunitySignupForm from "@/components/CommunitySignupForm";
const communitySteps = [{
  icon: Users,
  title: "Group Matching",
  description: "Our AI creates groups of 8-12 members based on shared interests, location, and compatibility.",
  color: "bg-gradient-to-r from-pink-500 to-purple-600"
}, {
  icon: MessageSquare,
  title: "Break the Ice",
  description: "Our AI chat-guides help members connect quickly and meaningfully.",
  color: "bg-gradient-to-r from-blue-500 to-cyan-400"
}, {
  icon: CalendarDays,
  title: "Plan a Meetup",
  description: "Our AI helps the group find the perfect time and activity that works for everyone.",
  color: "bg-gradient-to-r from-stone-500 to-rose-500"
}, {
  icon: Network,
  title: "Strengthen the Community",
  description: "Members meet in person, forming genuine friendships that strengthen your community.",
  color: "bg-gradient-to-r from-amber-400 to-orange-500"
}];
const communityTypes = [{
  icon: <GraduationCap className="text-white h-6 w-6" />,
  title: "Alumni Networks",
  description: "Connect former students living in the same city who share academic backgrounds but may have diverse career paths and experiences."
}, {
  icon: <Gamepad2 className="text-white h-6 w-6" />,
  title: "Hobby Groups",
  description: "Keep the momentum going between official meetups—so your runners, knitters, board gamers, or hikers show up already knowing people and feel part of something."
}, {
  icon: <Briefcase className="text-white h-6 w-6" />,
  title: "Professional Associations",
  description: "Help members go beyond business cards by forming friendships that grow through shared interests and regular meetups."
}, {
  icon: <Sparkles className="text-white h-6 w-6" />,
  title: "Creator Communities",
  description: "Give fans a deeper sense of belonging—and turn your community into a movement that thrives without you needing to be in every room."
}, {
  icon: <Globe className="text-white h-6 w-6" />,
  title: "Expat Communities",
  description: "Make a new city feel like home by helping expats connect with others navigating similar life transitions."
},{
  icon: <Asterisk className="text-white h-6 w-6" />,
  title: "Special-Interest Circles",
  description: "From niche fandoms to quirky causes, Pulse gathers your one-of-a-kind crowd—so even the most offbeat passions find their crew."
}];
const CommunitiesPage = () => {
  return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build Real Friendships
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Within Your Community
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">A private friend group match just for your community—powered by Pulse. We match your members into small group chats designed to spark conversation and meet IRL—so they stay engaged and more deeply connected.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#signup" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>Empower Your Community</span>
              </a>
              
            </div>
          </motion.div>
        </div>
      </section>


     {/* Community Types Section */}
      <section className="py-20 relative">
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
          duration: 0.5
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect For All Types of Communities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Whether you run a local running club, an alumni network, or a work-related community, we help your members turn familiar faces into real friendships.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityTypes.map((type, index) => <motion.div key={type.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{type.title}</h3>
                    <p className="text-gray-300">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>
    

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-12 bg-gray-900/50 backdrop-blur-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
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
        }} className="text-center max-w-3xl mx-auto mb-10">
            <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
              <Sparkles size={18} className="text-purple-400" />
              How It Works For Communities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Making connections within your community
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communitySteps.map((step, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300">
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Icebreakers */}
      <AiIcebreakers />


      {/* Signup Section */}
      <section id="signup" className="py-20 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5
            }}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Empower Your Community?</h2>
                <p className="text-gray-300 mb-6">
                  Take the first step towards creating a more connected, engaged community. Our team will reach out to discuss how we can work for your specific needs.
                </p>
                
                <div className="hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-pulse-pink/20 p-2">
                      <Globe className="h-5 w-5 text-pulse-pink" />
                    </div>
                    {/*<p className="text-gray-300">Join 200+ thriving communities</p>*/}
                    <p className="text-gray-300">Strengthening communities globally</p>

                  </div>
                  {/*<div className="flex items-center gap-4">
                    <div className="rounded-full bg-pink-500/20 p-2">
                      <Users className="h-5 w-5 text-pink-400" />
                    </div>
                    <p className="text-gray-300">Over 50,000 connections made</p>
                   </div>*/}
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
              duration: 0.5,
              delay: 0.2
            }}>
                <CommunitySignupForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};
export default CommunitiesPage;