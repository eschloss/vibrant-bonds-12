
import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Zap, Target, Globe, Code, Palette, MessageSquare, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Seo } from "@/hooks/useSeo";

const Careers = () => {
  const seoProps = {
    title: {
      en: "Careers at Pulse | Join Our Mission | Pulse",
      es: "Carreras en Pulse | Únete a Nuestra Misión | Pulse"
    },
    description: {
      en: "Join Pulse and help build the future of human connection. Explore career opportunities and be part of a team making real-world impact.",
      es: "Únete a Pulse y ayuda a construir el futuro de la conexión humana. Explora oportunidades de carrera y sé parte de un equipo con impacto real."
    },
    keywords: ["careers", "jobs", "pulse careers", "startup jobs", "tech careers", "remote work"],
    type: "website"
  };

  const values = [
    {
      icon: <Heart className="text-white h-6 w-6" />,
      title: "Human-First",
      description: "We believe technology should bring people together, not pull them apart."
    },
    {
      icon: <Zap className="text-white h-6 w-6" />,
      title: "Move Fast",
      description: "We iterate quickly, learn from feedback, and aren't afraid to experiment."
    },
    {
      icon: <Target className="text-white h-6 w-6" />,
      title: "Impact Focused",
      description: "Every decision we make is measured by its impact on real human connection."
    },
    {
      icon: <Globe className="text-white h-6 w-6" />,
      title: "Global Mindset",
      description: "We're building for communities everywhere, with diverse perspectives at our core."
    }
  ];

  const departments = [
    {
      icon: <Code className="text-white h-6 w-6" />,
      title: "Engineering",
      description: "Build the technology that powers meaningful connections worldwide.",
      openings: ["Full-Stack Engineer", "Mobile Developer", "AI/ML Engineer"]
    },
    {
      icon: <Palette className="text-white h-6 w-6" />,
      title: "Design",
      description: "Craft beautiful, intuitive experiences that make connection effortless.",
      openings: ["Product Designer", "UX Researcher"]
    },
    {
      icon: <TrendingUp className="text-white h-6 w-6" />,
      title: "Growth",
      description: "Help us reach more communities and amplify our impact.",
      openings: ["Growth Marketing Manager", "Community Manager"]
    },
    {
      icon: <Users className="text-white h-6 w-6" />,
      title: "Operations",
      description: "Keep our team and company running smoothly as we scale.",
      openings: ["Operations Manager", "People & Culture Lead"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
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
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join our mission to make meaningful friendships accessible to everyone. We're looking for passionate people who want to make a real impact on how the world connects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide everything we do and shape our culture.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 relative bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're growing fast and looking for talented people across all departments.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {departments.map((dept, index) => (
              <motion.div key={dept.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink w-12 h-12 flex items-center justify-center mr-4">
                        {dept.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{dept.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Current Openings:</h4>
                      {dept.openings.map((opening, i) => (
                        <div key={i} className="text-sm text-gray-300 bg-gray-700/50 px-3 py-2 rounded-md">
                          {opening}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't see the perfect role? We're always looking for exceptional people. Send us your resume and tell us how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:careers@pulsenow.app" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg">
                Apply Now
              </a>
              <a href="mailto:careers@pulsenow.app?subject=General Inquiry" className="border border-pulse-pink text-pulse-pink hover:bg-pulse-pink hover:text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 font-medium text-lg">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
