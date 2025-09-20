import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Sparkles, Heart, Calendar, Database, Eye, Brain, MessageSquare, Zap } from "lucide-react";

// Import Pip activity images
import pipSurfing from "@/assets/pip-surfing.png";
import pipVolleyball from "@/assets/pip-volleyball.png";
import pipCamping from "@/assets/pip-camping.png";
import pipPilates from "@/assets/pip-pilates.png";
import pipBookclub from "@/assets/pip-bookclub.png";
import pipPottery from "@/assets/pip-pottery.png";
import pipEscapeRoom from "@/assets/pip-escape-room.png";

const Activities = () => {
  const { t } = useTranslation();

  const seoProps = {
    title: {
      en: "Group Activities & Experiences | Pulse - Find Your Crew",
      es: "Actividades Grupales y Experiencias | Pulse - Encuentra Tu Grupo"
    },
    description: {
      en: "Discover amazing group activities curated by Pip. From surfing to book clubs, join matched crews for unforgettable experiences that build lasting friendships.",
      es: "Descubre increíbles actividades grupales curadas por Pip. Desde surf hasta clubes de lectura, únete a grupos compatibles para experiencias inolvidables."
    },
    keywords: ["group activities", "social experiences", "friendship building", "outdoor adventures", "creative workshops", "team activities"]
  };

  // SEO will be handled by Seo component

  // Activity categories for themed sections
  const activityCategories = [
    {
      title: "Outdoor Adventures",
      description: "Connect through shared challenges and natural beauty",
      color: "from-green-500 to-blue-500",
      activities: [
        { id: "surfing", name: "Beach & Water", image: pipSurfing, vibe: "Adventurous" },
        { id: "volleyball", name: "Beach Sports", image: pipVolleyball, vibe: "Energetic" },
        { id: "camping", name: "Outdoor Adventures", image: pipCamping, vibe: "Peaceful" }
      ]
    },
    {
      title: "Creative & Cultural",
      description: "Express yourselves and discover hidden talents together",
      color: "from-purple-500 to-pink-500",
      activities: [
        { id: "bookclub", name: "Book Clubs", image: pipBookclub, vibe: "Thoughtful" },
        { id: "pottery", name: "Arts & Crafts", image: pipPottery, vibe: "Creative" },
        { id: "escape-room", name: "Problem Solving", image: pipEscapeRoom, vibe: "Strategic" }
      ]
    },
    {
      title: "Wellness & Social",
      description: "Build bonds while taking care of your mind and body",
      color: "from-pink-500 to-orange-500",
      activities: [
        { id: "pilates", name: "Wellness & Fitness", image: pipPilates, vibe: "Mindful" }
      ]
    }
  ];

  // All activities for the hero collage
  const allActivities = [
    { id: "surfing", name: "Surfing", image: pipSurfing, position: "top-10 left-10", rotation: "-rotate-3", size: "w-32 h-32", zIndex: "z-20" },
    { id: "volleyball", name: "Volleyball", image: pipVolleyball, position: "top-20 right-20", rotation: "rotate-6", size: "w-28 h-28", zIndex: "z-10" },
    { id: "camping", name: "Camping", image: pipCamping, position: "top-32 left-1/2 -translate-x-1/2", rotation: "-rotate-2", size: "w-36 h-36", zIndex: "z-30" },
    { id: "pilates", name: "Pilates", image: pipPilates, position: "bottom-32 left-16", rotation: "rotate-3", size: "w-30 h-30", zIndex: "z-15" },
    { id: "bookclub", name: "Book Club", image: pipBookclub, position: "bottom-20 right-10", rotation: "-rotate-6", size: "w-32 h-32", zIndex: "z-25" },
    { id: "pottery", name: "Pottery", image: pipPottery, position: "top-1/2 left-8 -translate-y-1/2", rotation: "rotate-12", size: "w-28 h-28", zIndex: "z-5" },
    { id: "escape-room", name: "Escape Room", image: pipEscapeRoom, position: "top-1/2 right-8 -translate-y-1/2", rotation: "-rotate-12", size: "w-30 h-30", zIndex: "z-15" }
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
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-purple-900/30 text-white border border-purple-700/40 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-pulse-pink animate-pulse" />
              Curated by Pip
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Crew's Next
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                Epic Adventure
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Every crew gets a mission: plan an unforgettable real-life experience together. 
              From beach days to creative workshops, Pip curates activities that match your group's vibe and spark lasting friendships.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                Get Matched to Your Crew
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-gray-800">
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Activity Collage */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Activities That Build 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Real Bonds</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each experience is designed to break down barriers, spark conversations, and create memories that turn strangers into lifelong friends.
            </p>
          </motion.div>

          {/* Large Activity Collage */}
          <div className="relative h-96 md:h-[500px] mb-20 mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl backdrop-blur-sm border border-gray-700/50" />
            
            {allActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className={`absolute ${activity.position} ${activity.size} ${activity.zIndex}`}
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: parseInt(activity.rotation.match(/-?\d+/)?.[0] || "0") }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1, zIndex: 50 }}
              >
                <div className={`${activity.rotation} group cursor-pointer`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-800 border border-gray-600">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                    <img 
                      src={activity.image} 
                      alt={`Pip enjoying ${activity.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 text-gray-900 px-2 py-1 rounded text-xs font-medium block text-center">
                        {activity.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Center testimonial */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-xs text-center shadow-2xl border border-gray-200">
                <p className="text-gray-800 text-sm font-medium mb-2">
                  "Our pottery class turned into weekly coffee dates. Best decision ever!"
                </p>
                <p className="text-gray-600 text-xs">— Sarah, matched in Austin</p>
              </div>
            </motion.div>
          </div>

          {/* Activity Categories */}
          <div className="space-y-12">
            {activityCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="relative overflow-hidden rounded-3xl bg-gray-800/30 border border-gray-700 backdrop-blur-md p-8"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5`} />
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.activities.map((activity, actIndex) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: actIndex * 0.1 }}
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 bg-gray-800/50 border border-gray-600 backdrop-blur-md hover:border-accent/40">
                          <div className="aspect-square relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10`} />
                            <img 
                              src={activity.image} 
                              alt={`Pip enjoying ${activity.name}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-3 left-3 right-3">
                              <span className="bg-gray-900/90 text-white px-3 py-1 rounded-full text-xs font-medium block text-center border border-gray-700">
                                {activity.vibe}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium text-center text-white">
                              {activity.name}
                            </h4>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg" className="group border-gray-600 text-white hover:bg-gray-800 mb-4">
              View All Activities in Your City
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-gray-400">
              87% of crews meet within 2 weeks of being matched
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pip's Intelligence Section */}
      <section className="py-10 md:py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">Pip Knows</span> What You'll Love
              </h2>
              <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                Our AI reads your crew's vibe and suggests the perfect experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <motion.div
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                  <div className="rounded-full bg-accent/90 p-2">
                    <Users className="text-white" size={18} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Reads Your Profiles</h3>
                <p className="text-gray-300 text-sm">
                  Analyzes interests, energy levels, and preferences to understand what makes your crew tick.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                  <div className="rounded-full bg-accent/90 p-2">
                    <Heart className="text-white" size={18} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Watches Group Chat</h3>
                <p className="text-gray-300 text-sm">
                  Picks up on conversation themes and shared excitement to suggest activities everyone will love.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 backdrop-blur-md hover:border-accent/40 transition"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px]">
                  <div className="rounded-full bg-accent/90 p-2">
                    <Sparkles className="text-white" size={18} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Checks Local Scene</h3>
                <p className="text-gray-300 text-sm">
                  Finds the best local spots, events, and experiences available in your city right now.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/meet-pip">
                <Button variant="outline" size="lg" className="group border-gray-600 text-white hover:bg-gray-800">
                  Learn More About Pip
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof & Benefits */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Shared Experiences Create
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Lasting Bonds</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-white">Break Down Barriers Fast</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Shared challenges and new experiences dissolve social anxiety. When you're all learning to surf or solving an escape room together, conversation flows naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-white">Create Inside Jokes</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Those "remember when" moments become the foundation of friendship. Shared memories give you an instant connection and countless future conversations.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-white">See Real Personalities</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Activities reveal who people really are. You'll discover the problem-solver, the encourager, the comedian—authentic connections form naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-white">Build Future Plans</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Great experiences lead to "we should do this again!" Your first activity becomes the launching pad for ongoing friendships and adventures.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-14 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue"> Story Together?</span>
            </h2>
            
            <p className="text-gray-300 mb-6">
              Your crew is waiting. Your next favorite memory is one activity away. 
              Let Pip match you with like-minded people who'll become your adventure partners, coffee companions, and lifelong friends.
            </p>
            
            <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
              Find Your Crew & Start Planning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-sm text-gray-400 mt-4">
              We'll match you when enough compatible people in your city sign up—no endless waitlist.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activities;