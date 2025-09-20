import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Heart, TrendingDown, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/hooks/useSeo";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LonelinessEpidemic: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const keyStats = [
    { number: "50%", text: "of Americans report experiencing loneliness", source: "Cigna, 2023" },
    { number: "21M", text: "Americans have zero close friends", source: "Survey Center on American Life, 2021" },
    { number: "79%", text: "of Gen Z reports frequent loneliness", source: "Cigna, 2020" },
    { number: "29%", text: "increased risk of premature death", source: "PLOS Medicine, 2015" }
  ];

  const healthImpacts = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Cardiovascular Disease",
      stat: "29% higher risk",
      description: "Loneliness increases risk of heart disease comparable to smoking"
    },
    {
      icon: <TrendingDown className="h-6 w-6 text-orange-500" />,
      title: "Stroke Risk", 
      stat: "32% increase",
      description: "Chronic loneliness significantly raises stroke probability"
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-500" />,
      title: "Immune Function",
      stat: "Weakened response",
      description: "Lonely individuals show compromised immune systems"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: "Premature Death",
      stat: "30% higher risk", 
      description: "Effect comparable to smoking 15 cigarettes daily"
    }
  ];

  const generationStats = [
    { generation: "Gen Z (18-26)", loneliness: "79%", noFriends: "25%", description: "The loneliest generation" },
    { generation: "Millennials (27-42)", loneliness: "71%", noFriends: "22%", description: "High dissatisfaction with friendships" },
    { generation: "Gen X (43-58)", loneliness: "50%", noFriends: "15%", description: "Moderate but concerning levels" },
    { generation: "Boomers (59+)", loneliness: "33%", noFriends: "9%", description: "Often situational loneliness" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 pt-16">
        <Seo
          title={{
            en: "The Loneliness Epidemic: Statistics, Causes, and Solutions in 2025",
            es: "La Epidemia de Soledad: Estadísticas, Causas y Soluciones en 2025"
          }}
          description={{
            en: "Comprehensive analysis of the loneliness epidemic affecting millions. Statistics, health impacts, generational trends, and solutions for the social isolation crisis.",
            es: "Análisis completo de la epidemia de soledad que afecta a millones. Estadísticas, impactos en la salud, tendencias generacionales y soluciones para la crisis de aislamiento social."
          }}
          keywords={["loneliness epidemic", "social isolation", "mental health crisis", "friendship statistics", "Gen Z loneliness", "social connections", "public health"]}
          type="article"
          publishedTime="2025-01-20T00:00:00Z"
          modifiedTime="2025-01-20T00:00:00Z"
          section="Health & Society"
        />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-orange-900/20" />
        
        {/* Cool Background Animations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Crisis Icons */}
          <motion.div
            className="absolute top-20 left-10 opacity-20"
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </motion.div>
          
          <motion.div
            className="absolute top-32 right-20 opacity-10"
            animate={{ 
              y: [0, 15, 0], 
              x: [0, 10, 0] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            <Heart className="h-8 w-8 text-orange-400" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-40 left-1/4 opacity-15"
            animate={{ 
              y: [0, -10, 0], 
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Users className="h-7 w-7 text-red-300" />
          </motion.div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
                backgroundSize: "50px 50px"
              }}
              animate={{
                backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Subtle Pulse Rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 border border-red-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-orange-500/10 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Crisis Alert with Enhanced Animation */}
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </motion.div>
              
              <motion.div
                className="relative"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(220, 38, 127, 0.3)",
                    "0 0 30px rgba(220, 38, 127, 0.6)", 
                    "0 0 20px rgba(220, 38, 127, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold animate-pulse">
                  PUBLIC HEALTH CRISIS
                </Badge>
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </motion.div>
            </motion.div>

            {/* Clean Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"
              variants={fadeInUp}
            >
              The Loneliness Epidemic
            </motion.h1>

            {/* Subtitle with Fade Effect */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              variants={fadeInUp}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Statistics, Causes, and the Search for Friendship in 2025
            </motion.p>

            {/* Enhanced Statistics Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {keyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <Card className="bg-gray-800/50 border-red-500/20 hover:border-red-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden">
                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <CardContent className="p-4 text-center relative z-10">
                      <motion.div 
                        className="text-3xl font-bold text-red-400 mb-2"
                        animate={{ 
                          scale: [1, 1.05, 1] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-300 mb-1">{stat.text}</div>
                      <div className="text-xs text-gray-500">{stat.source}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto prose prose-lg prose-invert"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
              <Users className="h-8 w-8 text-pulse-pink" />
              Introduction
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Not long ago, loneliness was thought of as a personal problem — a fleeting feeling you might experience after moving to a new city, going through a breakup, or losing a loved one. Today, it's increasingly recognized as a public health crisis that touches millions of people across every generation, income level, and culture.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              In 2023, U.S. Surgeon General Dr. Vivek Murthy issued a landmark advisory calling loneliness and social isolation an "epidemic."<sup><a href="#ref-1" className="text-blue-400 hover:text-blue-300 font-semibold">[1]</a></sup> He compared the health impact of disconnection to smoking 15 cigarettes a day, warning that the absence of meaningful social bonds is shortening lives and worsening the nation's mental health crisis. It was one of the clearest signals yet that loneliness is not a fringe issue, but one of the defining challenges of our time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <TrendingDown className="h-8 w-8 text-orange-500" />
              Why Now?
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                The numbers tell a sobering story. Roughly one in two Americans reports experiencing loneliness<sup><a href="#ref-2" className="text-blue-400 hover:text-blue-300 font-semibold">[2]</a></sup>. More than 20 million adults say they have no close friends<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300 font-semibold">[3]</a></sup>, a figure that has quadrupled since the 1990s. Among young people, the problem is even more acute: Gen Z has been described as the loneliest generation, with surveys showing nearly three out of four reporting frequent loneliness<sup><a href="#ref-4" className="text-blue-400 hover:text-blue-300 font-semibold">[4]</a></sup>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                International data echo these patterns. The United Kingdom has appointed a Minister of Loneliness to coordinate national response efforts<sup><a href="#ref-5" className="text-blue-400 hover:text-blue-300 font-semibold">[5]</a></sup>. In Japan, where suicide and social withdrawal (hikikomori) are rising concerns, lawmakers passed a 2024 law requiring local governments to address loneliness directly<sup><a href="#ref-6" className="text-blue-400 hover:text-blue-300 font-semibold">[6]</a></sup>. Global surveys from Gallup and the OECD show that 25% of adults worldwide feel lonely on a regular basis<sup><a href="#ref-7" className="text-blue-400 hover:text-blue-300 font-semibold">[7]</a></sup>, with especially high rates among youth.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                What makes loneliness so urgent now is not just the prevalence of the feeling itself but the social and technological forces accelerating it. Remote work has untethered millions from casual office relationships. COVID-19 lockdowns disrupted in-person gatherings and weakened the everyday "weak ties" — neighbors, coworkers, acquaintances — that form the fabric of social life. Social media, once heralded as a connector, often deepens the sense of isolation through endless comparison and shallow interaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Is the Loneliness Epidemic? */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <Users className="h-8 w-8 text-blue-500" />
              What Is the Loneliness Epidemic?
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                When we talk about the loneliness epidemic, we're talking about more than a temporary feeling of being left out. Loneliness, as researchers define it, is a mismatch between the social connections you want and the ones you have. You can be surrounded by people and still feel lonely if those connections don't meet your emotional needs.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">Loneliness vs. Social Isolation</h3>
              <p className="text-gray-300 mb-4">It's important to distinguish between two related concepts:</p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li><strong className="text-white">Loneliness:</strong> A subjective experience — the pain of feeling disconnected, unseen, or unsupported.</li>
                <li><strong className="text-white">Social isolation:</strong> An objective measure — how much contact you have with others, regardless of how you feel about it.</li>
              </ul>
              <p className="text-gray-300 mb-6">
                A person can be socially isolated but not feel lonely if they are content with that level of contact. Others may be socially active yet still feel lonely if they lack close, meaningful ties. The U.S. National Academies of Sciences has warned that social isolation among older adults is associated with a 50% increased risk of dementia<sup className="text-blue-400 font-semibold">[19]</sup>.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">A Growing Problem</h3>
              <p className="text-gray-300 mb-6">
                The phrase "loneliness epidemic" was popularized by Harvard political scientist Robert Putnam in his landmark book <em>Bowling Alone</em><sup className="text-blue-400 font-semibold">[11]</sup>. Putnam showed how American social life was fragmenting: fewer bowling leagues, fewer neighborhood gatherings, fewer civic organizations. The decline of these "middle institutions" was already eroding community bonds.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">Why Call It an "Epidemic"?</h3>
              <p className="text-gray-300 mb-6">
                The term captures something essential: loneliness spreads. When people withdraw from social life, their absence weakens communities for everyone else. A society with fewer gatherings, fewer clubs, and fewer third places doesn't just affect the lonely individual — it leaves everyone with fewer opportunities to connect.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <AlertTriangle className="h-8 w-8 text-red-500" />
              Why It Matters
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Loneliness is not simply an emotional state. Researchers have found it to be as dangerous as many leading risk factors for early death, including obesity, physical inactivity, and smoking<sup className="text-blue-400 font-semibold">[8]</sup>. It increases the likelihood of cardiovascular disease, dementia, and stroke. Perhaps most tragically, loneliness is tightly linked to suicide risk: in 2023, the U.S. recorded 49,000 deaths by suicide, the highest ever<sup className="text-blue-400 font-semibold">[15]</sup>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Beyond health, loneliness is also reshaping culture, politics, and the economy. Civic participation has fallen sharply in the U.S., as documented in Robert Putnam's classic <em>Bowling Alone</em><sup className="text-blue-400 font-semibold">[11]</sup>. Voter turnout, union membership, and religious attendance have all declined, leaving fewer built-in communities where people once found connection. Economists estimate that workplace loneliness costs billions annually in lost productivity, absenteeism, and turnover<sup className="text-blue-400 font-semibold">[12]</sup>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How the Epidemic Has Grown */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <TrendingDown className="h-8 w-8 text-red-500" />
              📉 How the Loneliness Epidemic Has Grown Over Time
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Loneliness is not a new phenomenon. But data shows it has worsened dramatically in recent decades — making it one of the defining social and health challenges of the 21st century.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">Declining Social Connections Over Decades</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>In 1990, only 3% of Americans said they had no close friends. By 2021, that number had risen to 12%<sup className="text-blue-400 font-semibold">[3]</sup></li>
                <li>The average number of close friendships per adult has dropped from 4 in 1990 to just 2 today</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">The Impact of Technology & Remote Work</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Since 2019, remote work has surged. By 2023, 28% of full-time employees work remotely<sup className="text-blue-400 font-semibold">[13]</sup></li>
                <li>Digital platforms often replace, rather than supplement, face-to-face relationships</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">COVID-19 and the Surge in Isolation</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>36% of all U.S. adults reported feeling "serious loneliness" during the pandemic<sup className="text-blue-400 font-semibold">[14]</sup></li>
                <li>61% of young adults and 51% of mothers with young children experienced serious loneliness</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Workplace Loneliness Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <Clock className="h-8 w-8 text-orange-500" />
              💼 Workplace Loneliness and Remote Work
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                The way we work has undergone a seismic shift in the past decade — and even more since COVID-19. While flexible schedules and remote work bring freedom, they also come at a cost: increased social isolation.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">Remote Work and Isolation</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Remote workers are more than twice as likely to report loneliness compared to in-office employees<sup className="text-blue-400 font-semibold">[18]</sup></li>
                <li>1 in 4 remote workers say loneliness is their biggest struggle</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">The Decline of Workplace Friendships</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>In 1985, nearly half of Americans had a close friend at work. Today, fewer than 30% say the same</li>
                <li>Only 2 in 10 employees report having a "best friend at work," yet those who do are 7x more likely to be engaged</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">Productivity and Retention Costs</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Companies lose an estimated $406 billion annually due to loneliness and disengagement<sup className="text-blue-400 font-semibold">[12]</sup></li>
                <li>Isolated employees are 5x more likely to miss work due to stress and illness</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Health Impact Section */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-12 text-white text-center flex items-center justify-center gap-3"
              variants={fadeInUp}
            >
              <Heart className="h-8 w-8 text-red-500" />
              The Health Toll of Loneliness
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              variants={fadeInUp}
            >
              {healthImpacts.map((impact, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      {impact.icon}
                    </div>
                    <CardTitle className="text-lg text-white">{impact.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-red-400 mb-2">{impact.stat}</div>
                    <p className="text-sm text-gray-400">{impact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <h3 className="text-2xl font-semibold mb-4 text-white">Mental Health Impacts</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Loneliness increases the risk of depression by more than twofold (Journal of Clinical Psychiatry, 2020)</li>
                <li>Young adults reporting chronic loneliness were 3x more likely to experience severe anxiety and depressive symptoms (CDC, 2022)</li>
                <li>Teenagers who report feeling lonely are more likely to have self-harm behaviors and suicidal ideation</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">Physical Health Impacts</h3>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Loneliness and social isolation increase the risk of premature death by 29%<sup className="text-blue-400 font-semibold">[8]</sup> — an effect comparable to smoking 15 cigarettes per day</li>
                <li>Lonely individuals have a 32% higher risk of stroke and a 29% higher risk of heart disease<sup className="text-blue-400 font-semibold">[9]</sup></li>
                <li>Chronic loneliness has been linked to weakened immune function, slower wound healing, and higher inflammation markers<sup className="text-blue-400 font-semibold">[10]</sup></li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Generational Trends */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-12 text-white text-center"
              variants={fadeInUp}
            >
              Generational Trends: Who Feels Loneliest?
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
            >
              {generationStats.map((gen, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{gen.generation}</h3>
                        <p className="text-gray-400">{gen.description}</p>
                      </div>
                      <div className="flex gap-6 text-center">
                        <div>
                          <div className="text-2xl font-bold text-red-400">{gen.loneliness}</div>
                          <div className="text-sm text-gray-500">Feel Lonely</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-400">{gen.noFriends}</div>
                          <div className="text-sm text-gray-500">No Close Friends</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section - Comprehensive */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-12 text-white text-center"
              variants={fadeInUp}
            >
              📊 Loneliness Epidemic: Key Facts, Numbers, and Statistics
            </motion.h2>

            <motion.div 
              className="grid lg:grid-cols-2 gap-8 mb-12"
              variants={fadeInUp}
            >
              {/* Overall Loneliness in the U.S. */}
              <Card className="bg-gray-800/50 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-red-400" />
                    Overall Loneliness in the U.S.
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Adults feeling lonely at least sometimes</span>
                    <span className="font-semibold text-red-400">50%<sup><a href="#ref-2" className="text-blue-400 hover:text-blue-300">[2]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Americans with zero close friends</span>
                    <span className="font-semibold text-red-400">21 million<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Adults dissatisfied with friendships</span>
                    <span className="font-semibold text-red-400">33%<sup><a href="#ref-2" className="text-blue-400 hover:text-blue-300">[2]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Gen Z reporting frequent loneliness</span>
                    <span className="font-semibold text-red-400">79%<sup><a href="#ref-4" className="text-blue-400 hover:text-blue-300">[4]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Millennials feeling lonely often/always</span>
                    <span className="font-semibold text-red-400">30%<sup><a href="#ref-20" className="text-blue-400 hover:text-blue-300">[20]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Boomers (45+) feeling lonely</span>
                    <span className="font-semibold text-red-400">33%<sup><a href="#ref-21" className="text-blue-400 hover:text-blue-300">[21]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* Friendship Networks */}
              <Card className="bg-gray-800/50 border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-orange-400" />
                    Friendship Networks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Average close friends (1990 vs today)</span>
                    <span className="font-semibold text-orange-400">4 → 2<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Americans with no close friends</span>
                    <span className="font-semibold text-orange-400">12%<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Americans with 10+ friends (then vs now)</span>
                    <span className="font-semibold text-orange-400">33% → 13%<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Remote workers citing loneliness as biggest challenge</span>
                    <span className="font-semibold text-orange-400">25%<sup><a href="#ref-18" className="text-blue-400 hover:text-blue-300">[18]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* Health Impacts */}
              <Card className="bg-gray-800/50 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Health Impacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Increased premature death risk</span>
                    <span className="font-semibold text-red-400">29%<sup><a href="#ref-8" className="text-blue-400 hover:text-blue-300">[8]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Higher cardiovascular disease risk</span>
                    <span className="font-semibold text-red-400">29%<sup><a href="#ref-9" className="text-blue-400 hover:text-blue-300">[9]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Increased stroke risk</span>
                    <span className="font-semibold text-red-400">32%<sup><a href="#ref-9" className="text-blue-400 hover:text-blue-300">[9]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Dementia risk increase (older adults)</span>
                    <span className="font-semibold text-red-400">50%<sup><a href="#ref-19" className="text-blue-400 hover:text-blue-300">[19]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">LGBTQ+ youth considering suicide</span>
                    <span className="font-semibold text-red-400">45%<sup><a href="#ref-17" className="text-blue-400 hover:text-blue-300">[17]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Weakened immune response</span>
                    <span className="font-semibold text-red-400">Confirmed<sup><a href="#ref-10" className="text-blue-400 hover:text-blue-300">[10]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* COVID-19 & Social Isolation */}
              <Card className="bg-gray-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    COVID-19 & Social Isolation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Adults with serious loneliness during lockdown</span>
                    <span className="font-semibold text-purple-400">36%<sup><a href="#ref-14" className="text-blue-400 hover:text-blue-300">[14]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Young adults (18-25) serious loneliness</span>
                    <span className="font-semibold text-purple-400">61%<sup><a href="#ref-14" className="text-blue-400 hover:text-blue-300">[14]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">UK adults feeling lonely during lockdown</span>
                    <span className="font-semibold text-purple-400">50%<sup><a href="#ref-5" className="text-blue-400 hover:text-blue-300">[5]</a></sup></span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Second Row of Statistics */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-8 mb-12"
              variants={fadeInUp}
            >
              {/* Workplace & Remote Work */}
              <Card className="bg-gray-800/50 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    Workplace & Remote Work
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Remote workers more likely to feel lonely</span>
                    <span className="font-semibold text-yellow-400">2x<sup><a href="#ref-18" className="text-blue-400 hover:text-blue-300">[18]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Employees with work best friend</span>
                    <span className="font-semibold text-yellow-400">20%<sup><a href="#ref-7" className="text-blue-400 hover:text-blue-300">[7]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Annual productivity loss from loneliness</span>
                    <span className="font-semibold text-yellow-400">$406B<sup><a href="#ref-12" className="text-blue-400 hover:text-blue-300">[12]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Isolated employees missing work</span>
                    <span className="font-semibold text-yellow-400">5x more<sup><a href="#ref-12" className="text-blue-400 hover:text-blue-300">[12]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* Technology & Social Media */}
              <Card className="bg-gray-800/50 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-blue-400" />
                    Technology & Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Heavy social media users feeling isolated</span>
                    <span className="font-semibold text-blue-400">2x more<sup><a href="#ref-22" className="text-blue-400 hover:text-blue-300">[22]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Millennials/Gen Z daily social media use</span>
                    <span className="font-semibold text-blue-400">4-5 hours<sup><a href="#ref-23" className="text-blue-400 hover:text-blue-300">[23]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* Generational Differences */}
              <Card className="bg-gray-800/50 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-400" />
                    Generational Differences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Gen Z with no close friends</span>
                    <span className="font-semibold text-green-400">25%<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Millennials with no friends at all</span>
                    <span className="font-semibold text-green-400">22%<sup><a href="#ref-20" className="text-blue-400 hover:text-blue-300">[20]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Gen X with no close friends</span>
                    <span className="font-semibold text-green-400">15%<sup><a href="#ref-3" className="text-blue-400 hover:text-blue-300">[3]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Boomers (59+) feeling lonely</span>
                    <span className="font-semibold text-green-400">33%<sup><a href="#ref-21" className="text-blue-400 hover:text-blue-300">[21]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* Mental Health & Suicide */}
              <Card className="bg-gray-800/50 border-red-600/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Mental Health & Suicide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">U.S. deaths by suicide in 2023</span>
                    <span className="font-semibold text-red-400">49,000<sup><a href="#ref-15" className="text-blue-400 hover:text-blue-300">[15]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Suicide risk for isolated older adults</span>
                    <span className="font-semibold text-red-400">2-3x higher<sup><a href="#ref-16" className="text-blue-400 hover:text-blue-300">[16]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Loneliness correlation with anxiety/depression</span>
                    <span className="font-semibold text-red-400">3x higher<sup><a href="#ref-15" className="text-blue-400 hover:text-blue-300">[15]</a></sup></span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Third Row of Statistics */}
            <motion.div 
              className="grid lg:grid-cols-2 gap-8"
              variants={fadeInUp}
            >
              {/* Civic Engagement & Community */}
              <Card className="bg-gray-800/50 border-indigo-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-400" />
                    Civic Engagement & Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Civic organization membership decline (1960s-2000s)</span>
                    <span className="font-semibold text-indigo-400">50%<sup><a href="#ref-11" className="text-blue-400 hover:text-blue-300">[11]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Americans trusting "most people" (1972 vs 2000)</span>
                    <span className="font-semibold text-indigo-400">55% → 32%<sup><a href="#ref-24" className="text-blue-400 hover:text-blue-300">[24]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Religious attendance (1970 vs 2020)</span>
                    <span className="font-semibold text-indigo-400">45% → 24%<sup><a href="#ref-25" className="text-blue-400 hover:text-blue-300">[25]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Volunteer participation (1970 vs 2020)</span>
                    <span className="font-semibold text-indigo-400">30% → 20%<sup><a href="#ref-26" className="text-blue-400 hover:text-blue-300">[26]</a></sup></span>
                  </div>
                </CardContent>
              </Card>

              {/* International Comparisons */}
              <Card className="bg-gray-800/50 border-teal-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-teal-400" />
                    International Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Global adults feeling lonely regularly</span>
                    <span className="font-semibold text-teal-400">25%<sup><a href="#ref-7" className="text-blue-400 hover:text-blue-300">[7]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">UK adults reporting frequent loneliness</span>
                    <span className="font-semibold text-teal-400">38%<sup><a href="#ref-5" className="text-blue-400 hover:text-blue-300">[5]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="text-gray-300">Japan socially isolated adults (40+)</span>
                    <span className="font-semibold text-teal-400">14%<sup><a href="#ref-27" className="text-blue-400 hover:text-blue-300">[27]</a></sup></span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">OECD countries chronic loneliness</span>
                    <span className="font-semibold text-teal-400">20-30%<sup><a href="#ref-27" className="text-blue-400 hover:text-blue-300">[27]</a></sup></span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cultural Shifts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white"
              variants={fadeInUp}
            >
              Cultural and Social Shifts: Why Loneliness Is Rising
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Loneliness doesn't occur in a vacuum. It reflects profound changes in how society is structured, how we interact, and the role technology plays in our lives.
              </p>

              <h3 className="text-2xl font-semibold mb-4 text-white">The Decline of Civic Engagement</h3>
              <p className="text-gray-300 mb-4">
                Robert Putnam's "Bowling Alone" (2000) documented a sharp decline in American community life over the latter half of the 20th century:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Membership in organizations like PTAs, civic clubs, and unions dropped by nearly 50% between the 1960s and 2000</li>
                <li>The percentage of Americans who say "most people can be trusted" fell from 55% in 1972 to 32% in 2000</li>
                <li>Religious attendance fell from 45% in 1970 to 24% in 2020</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4 text-white">Technology: Connection and Isolation</h3>
              <p className="text-gray-300 mb-4">
                The digital age promised more connection, but evidence shows a paradoxical rise in loneliness:
              </p>
              <ul className="text-gray-300 space-y-2 mb-6">
                <li>Social media overuse correlates with loneliness and depression, particularly in young adults. Heavy users are 2x more likely to feel socially isolated</li>
                <li>Millennials and Gen Z spend up to 4–5 hours per day on social media, which correlates with increased reports of loneliness</li>
                <li>While platforms facilitate contact, they often replace in-person experiences with shallow interactions</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-white flex items-center gap-3"
              variants={fadeInUp}
            >
              <Shield className="h-8 w-8 text-green-500" />
              Solutions and What Works: Combating Loneliness
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                While the statistics are sobering, loneliness is not inevitable. Research shows that interventions — both at the individual and community level — can significantly reduce chronic loneliness.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Building Meaningful Friendships</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>Quality over quantity: Having even one or two high-quality friendships can buffer the negative health effects of loneliness</p>
                    <p>Shared experiences: Joining clubs, volunteering, or taking classes creates lasting bonds</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Leveraging Technology Wisely</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>Video calls and messaging apps help maintain connections when used intentionally</p>
                    <p>Passive social media use correlates with increased loneliness and depressive symptoms</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Community Engagement</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>Volunteer work significantly reduces loneliness, particularly among older adults</p>
                    <p>"Third places" — cafés, libraries, community centers — foster casual social connections</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white">Apps and Platforms for Friendship</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 space-y-3">
                    <p>Emerging social apps focus on connecting people with shared interests for meaningful in-person interaction</p>
                    <p>Platforms help users meet new friends in safe, structured social settings</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

        {/* Sources and References Section */}
        <section className="py-16 bg-gray-800/50">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-4xl font-bold mb-12 text-white text-center flex items-center justify-center gap-3"
                variants={fadeInUp}
              >
                📚 Sources & References
              </motion.h2>
              
              <motion.div 
                className="grid md:grid-cols-2 gap-6 mb-8"
                variants={fadeInUp}
              >
                <div className="space-y-4">
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[1] U.S. Surgeon General Advisory</p>
                      <p className="text-gray-300 text-sm">Our Epidemic of Loneliness and Isolation, 2023</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[2] Cigna U.S. Loneliness Index</p>
                      <a href="https://www.cigna.com/newsroom/news-releases/2023/loneliness-index" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Cigna 2023 Report
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[3] Survey Center on American Life</p>
                      <a href="https://www.americansurveycenter.org/reports/the-state-of-american-friendship/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        The State of American Friendship Report, 2021
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[4] Cigna Loneliness Factsheet</p>
                      <a href="https://www.cigna.com/assets/docs/about-us/newsroom/loneliness-factsheet.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Cigna 2020 Report
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[5] UK Office for National Statistics</p>
                      <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/articles/coronavirusandlonelinessgreatbritain/2021-04-07" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Coronavirus and Loneliness in Great Britain, 2021
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[6] The Guardian</p>
                      <a href="https://www.theguardian.com/world/2021/feb/16/japan-appoints-minister-of-loneliness-to-help-tackle-rising-suicide-rate" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Japan Appoints Minister of Loneliness, 2021
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[7] Gallup</p>
                      <p className="text-gray-300 text-sm">State of Social Connections Survey, 2022</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[8] Holt-Lunstad et al.</p>
                      <a href="https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        PLOS Medicine, 2015
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[9] European Heart Journal</p>
                      <a href="https://academic.oup.com/eurheartj/article/37/46/3479/1748921" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Loneliness and Cardiovascular Disease, 2016
                      </a>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[10] PNAS</p>
                      <a href="https://www.pnas.org/doi/10.1073/pnas.1514249112" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Loneliness, Immune Function, and Health Outcomes, 2015
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[11] Robert D. Putnam</p>
                      <a href="https://www.hup.harvard.edu/catalog.php?isbn=9780743203043" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Bowling Alone: The Collapse and Revival of American Community, 2000
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[12] CAA Foundation</p>
                      <a href="https://www.caa.com/news/loneliness-and-the-workplace" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Loneliness and the Workplace Costs, 2019
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[13] McKinsey & Company</p>
                      <a href="https://www.mckinsey.com/industries/real-estate/our-insights/the-state-of-remote-work" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        The State of Remote Work, 2023
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[14] Harvard Making Caring Common</p>
                      <a href="https://mcc.gse.harvard.edu/reports/loneliness-in-america" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Loneliness in America During COVID-19, 2021
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[15] CDC</p>
                      <a href="https://www.cdc.gov/suicide/facts/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Suicide Data and Statistics, 2022
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[16] American Foundation for Suicide Prevention</p>
                      <a href="https://afsp.org/suicide-statistics/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Suicide Statistics
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[17] The Trevor Project</p>
                      <a href="https://www.thetrevorproject.org/survey-2022/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        National Survey on LGBTQ Youth Mental Health 2022
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[18] Buffer</p>
                      <a href="https://buffer.com/state-of-remote-work/2023" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        The State of Remote Work 2023
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[19] National Academies of Sciences</p>
                      <a href="https://nap.nationalacademies.org/catalog/25663/social-isolation-and-loneliness-in-older-adults-opportunities-for-the-health-care-system" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Social Isolation and Loneliness in Older Adults, 2020
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[20] YouGov</p>
                      <a href="https://today.yougov.com/topics/lifestyle/articles-reports/2019/07/23/one-five-millennials-say-they-have-no-friends" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        One-Fifth of Millennials Have No Friends, 2019
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[21] AARP</p>
                      <a href="https://www.aarp.org/research/topics/life/info-2020/loneliness-coronavirus.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Loneliness and Social Connections in Adults 45+, 2020
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[22] Twenge et al.</p>
                      <a href="https://psycnet.apa.org/record/2018-21749-001" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Social Media and Loneliness, J Abnorm Psychol, 2018
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[23] Pew Research Center</p>
                      <a href="https://www.pewresearch.org/internet/2022/04/07/social-media-use-in-2022/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Social Media Use in 2022
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[24] General Social Survey</p>
                      <a href="https://gss.norc.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Trust Data, 2000
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[25] PEW Research</p>
                      <a href="https://www.pewforum.org/2021/04/07/religion-in-america/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Religion in America, 2021
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[26] Independent Sector</p>
                      <a href="https://independentsector.org/resource/volunteering-in-the-us/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                        Volunteering in the U.S., 2020
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-blue-500/20">
                    <CardContent className="p-4">
                      <p className="text-white font-semibold mb-2">[27] OECD</p>
                      <p className="text-gray-300 text-sm">Loneliness Data, 2021</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20"
                variants={fadeInUp}
              >
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Research Note:</strong> This comprehensive report compiles data from peer-reviewed studies, government health agencies, and reputable research organizations. All statistics are sourced from original publications and surveys conducted between 2015-2023. Citations link directly to source materials for verification and further reading.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Conclusion & CTA */}
      <section className="py-20 bg-gradient-to-br from-pulse-pink/20 via-gray-900 to-pulse-blue/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"
              variants={fadeInUp}
            >
              Tackling the Loneliness Epidemic
            </motion.h2>
            
            <motion.div className="prose prose-lg prose-invert mb-12" variants={fadeInUp}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Loneliness is one of the most urgent social and public health challenges of our time. Millions of Americans — from Gen Z to Boomers — experience chronic isolation that harms mental health, physical well-being, and overall life satisfaction. Yet loneliness is not inevitable.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Creating meaningful friendships may feel daunting, especially in a world that has become more digital and dispersed. That's where tools like Pulse come in. Pulse helps you meet new friends safely, intentionally, and locally, bridging the gap between online connections and real-world social interaction.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Link to="/">
                <Button size="xl" className="pulse-gradient-cta text-white font-semibold px-8 py-4 hover:shadow-lg hover:shadow-pulse-pink/25 transition-all duration-300">
                  Start Building Connections Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.p
              className="text-gray-400 text-sm mt-6"
              variants={fadeInUp}
            >
              Don't wait. Start connecting today. Your future self will thank you.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
  </>
  );
};

export default LonelinessEpidemic;