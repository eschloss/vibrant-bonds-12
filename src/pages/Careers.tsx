
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Removed lucide-react icons used only in the Values section
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

  // Values section removed per request

  const openPositions = [
    {
      id: "social-growth-intern",
      title: "Social Growth & Community Intern",
      description:
        "Own a niche growth channel and build communities around specific identities. Remote, part-time, unpaid with commission opportunities.",
      remote: true,
      partTime: true,
      unpaid: true,
      featured: true
    },
    {
      id: "social-media-intern",
      title: "Social Media Intern",
      description:
        "Help shape the voice of a social app rethinking friendship. Remote, part-time, unpaid with commission opportunities.",
      remote: true,
      partTime: true,
      unpaid: true,
      featured: false
    },
    {
      id: "growth-intern",
      title: "Growth Intern",
      description:
        "Support growth experiments, analytics, and channel operations to accelerate user acquisition.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: false
    },
    {
      id: "head-social-media",
      title: "Head of Social Media",
      description:
        "Own our social strategy end-to-end, lead content programming, and grow our brand presence.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: false
    },
    {
      id: "community-lead",
      title: "Community Lead",
      description:
        "Build, activate, and support our global community through events, programs, and moderation.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: false
    },
    {
      id: "partnership-manager-intern",
      title: "Partnership Manager Intern",
      description:
        "Build real-world connections. Get partners excited about friendship. Remote, part-time, unpaid with commission opportunities.",
      remote: true,
      partTime: true,
      unpaid: true,
      featured: false
    },
    {
      id: "affiliate-marketing-manager-intern",
      title: "Affiliate Marketing Manager Intern",
      description:
        "Grow our ambassador network. Recruit the right people. Remote, part-time, unpaid with commission opportunities.",
      remote: true,
      partTime: true,
      unpaid: true,
      featured: false
    },
    {
      id: "social-media-talent-pool",
      title: "Join Pulse's Social Media Talent Pool",
      description:
        "Let's start the conversation now—so we're ready to build together later. Remote opportunities with future roles.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: true
    },
    {
      id: "growth-team-talent-pool",
      title: "Join Pulse's Growth Team Talent Pool",
      description:
        "We're assembling our growth dream team. Let's get you on our radar. Remote opportunities with future roles.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: true
    },
    {
      id: "technical-talent-pool",
      title: "Join Pulse's Technical Talent Pool",
      description:
        "We're building a world-class team of makers, builders, and AI-first engineers. Remote opportunities with future roles.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: true
    },
    {
      id: "partnership-talent-pool",
      title: "Join Pulse's Partnership Talent Pool",
      description:
        "Help us build the real-world engine behind real-life friendships. Remote opportunities with future roles.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: true
    },
    {
      id: "community-manager-talent-pool",
      title: "Join Pulse's Community Manager Talent Pool",
      description:
        "Bring people together. Make friendship feel local, creative, and real. Remote opportunities with future roles.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: true
    },
    {
      id: "partnership-manager",
      title: "Partnership Manager",
      description:
        "Source, negotiate, and manage strategic partnerships to expand reach and impact.",
      remote: true,
      partTime: false,
      unpaid: false,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-10 relative overflow-hidden">
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

      {/* Values Section removed */}

      {/* Open Positions Section */}
      <section className="py-12 relative bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're growing fast and looking for talented people to join our mission.
            </p>
          </motion.div>
          <div className="max-w-4xl md:max-w-5xl mx-auto">
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardContent className="p-8 md:p-10">
                <ul className="space-y-4">
                  {openPositions.map((role) => {
                    const viewable = (
                      role.id === "social-growth-intern" ||
                      role.id === "social-media-intern" ||
                      role.id === "partnership-manager-intern" ||
                      role.id === "affiliate-marketing-manager-intern" ||
                      role.id === "social-media-talent-pool" ||
                      role.id === "growth-team-talent-pool" ||
                      role.id === "technical-talent-pool" ||
                      role.id === "partnership-talent-pool" ||
                      role.id === "community-manager-talent-pool"
                    );
                    if (!viewable) return null; // remove early-stage dummy roles
                    return (
                      <li
                        key={role.id}
                        className={`flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gray-900/40 border border-gray-700 hover:border-purple-500/40 transition-colors rounded-xl px-6 py-5 ${
                          role.featured ? 'ring-2 ring-pulse-pink/30 bg-gradient-to-r from-gray-900/40 to-purple-900/20' : ''
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white text-lg md:text-xl font-semibold">{role.title}</span>
                            {role.featured && (
                              <span className="text-pulse-pink border border-pulse-pink/30 bg-pulse-pink/10 text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                            {role.remote && (
                              <span className="text-green-300 border border-green-500/30 bg-green-500/10 text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                                Remote
                              </span>
                            )}
                            {role.partTime && (
                              <span className="text-blue-300 border border-blue-500/30 bg-blue-500/10 text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                                Part-Time
                              </span>
                            )}
                            {role.unpaid && (
                              <span className="text-yellow-300 border border-yellow-500/30 bg-yellow-500/10 text-[10px] md:text-xs px-2 py-0.5 rounded-full">
                                Unpaid
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm md:text-base">{role.description}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <Link
                            to={`/careers/${role.id}`}
                            className="text-pulse-pink hover:underline text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-12 relative">
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
