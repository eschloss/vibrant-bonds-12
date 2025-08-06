import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Code, Palette, TrendingUp, Heart, Globe, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";

const Careers = () => {
  const { t } = useTranslation();
  
  const seoProps = {
    title: {
      en: "Careers at Pulse | Join Our Mission | Pulse",
      es: "Carreras en Pulse | Únete a Nuestra Misión | Pulse"
    },
    description: {
      en: "Join the Pulse team and help us build technology that brings people together. Explore career opportunities in engineering, design, marketing, and more.",
      es: "Únete al equipo de Pulse y ayúdanos a construir tecnología que une a las personas. Explora oportunidades profesionales en ingeniería, diseño, marketing y más."
    },
    keywords: ["careers", "jobs", "pulse jobs", "startup careers", "social technology", "remote work"],
    type: "website"
  };
  
  const jobOpenings = [{
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Portland, ME",
    type: "Full-time",
    description: "Build the core platform that powers meaningful connections. Work with React, Node.js, and AI technologies."
  }, {
    title: "Product Designer",
    department: "Design",
    location: "Remote / Portland, ME", 
    type: "Full-time",
    description: "Design intuitive experiences that make forming friendships effortless. Create user flows, interfaces, and design systems."
  }, {
    title: "Community Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Build and nurture our community across social platforms. Help spread the word about making adult friendships."
  }, {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Portland, ME",
    type: "Full-time", 
    description: "Improve our matching algorithms and conversational AI. Work with LLMs, recommendation systems, and data science."
  }];
  
  const values = [{
    icon: <Heart className="text-white h-6 w-6" />,
    title: "Human Connection First",
    description: "Everything we build is designed to bring people together and combat loneliness in the modern world."
  }, {
    icon: <Zap className="text-white h-6 w-6" />,
    title: "Move Fast & Care",
    description: "We iterate quickly while maintaining high standards and genuinely caring about our users' experiences."
  }, {
    icon: <Globe className="text-white h-6 w-6" />,
    title: "Remote-First Culture",
    description: "We're a distributed team that values flexibility, autonomy, and getting great work done from anywhere."
  }, {
    icon: <TrendingUp className="text-white h-6 w-6" />,
    title: "Growth Mindset",
    description: "We're constantly learning, experimenting, and pushing the boundaries of what's possible in social technology."
  }];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[85px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Build the Future of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Human Connection
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto md:text-xl">
              Join our mission to make meaningful friendships accessible to everyone. We're looking for passionate people who want to combat loneliness and build technology that brings people together.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#openings" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                <span>View Open Positions</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do and the kind of team we're building.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => 
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to make an impact? Join our growing team and help millions of people form meaningful connections.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job, index) => 
              <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{job.department}</span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">{job.location}</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">{job.type}</span>
                        </div>
                        <p className="text-gray-300">{job.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button 
                          variant="outline" 
                          className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                          onClick={() => window.open('mailto:careers@pulsenow.app?subject=' + encodeURIComponent(`Application for ${job.title}`))}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-12">
            <p className="text-gray-300 mb-4">Don't see the perfect fit?</p>
            <Button 
              variant="outline" 
              className="border-pulse-pink/50 text-pulse-pink hover:bg-pulse-pink/10"
              onClick={() => window.open('mailto:careers@pulsenow.app?subject=General%20Interest')}
            >
              Send Us Your Resume
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Careers;
