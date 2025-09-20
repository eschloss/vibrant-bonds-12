import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Seo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, Sparkles, Heart, Calendar } from "lucide-react";

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

  const activities = [
    {
      id: "surfing",
      name: "Beach & Water",
      image: pipSurfing,
      vibe: "Adventurous"
    },
    {
      id: "volleyball",
      name: "Beach Sports",
      image: pipVolleyball,
      vibe: "Energetic"
    },
    {
      id: "camping",
      name: "Outdoor Adventures",
      image: pipCamping,
      vibe: "Peaceful"
    },
    {
      id: "pilates",
      name: "Wellness & Fitness",
      image: pipPilates,
      vibe: "Mindful"
    },
    {
      id: "bookclub",
      name: "Creative & Cultural",
      image: pipBookclub,
      vibe: "Thoughtful"
    },
    {
      id: "pottery",
      name: "Arts & Crafts",
      image: pipPottery,
      vibe: "Creative"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <Seo {...seoProps} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              Curated by Pip
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="pulse-gradient-text">
                Your Crew's Next
              </span>
              <br />
              <span className="text-foreground">
                Epic Adventure
              </span>
            </h1>

            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Every crew gets a mission: plan an unforgettable real-life experience together. 
              From beach days to creative workshops, Pip curates activities that match your group's vibe and spark lasting friendships.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
                Get Matched to Your Crew
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Activities That Build 
              <span className="pulse-gradient-text"> Real Bonds</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Each experience is designed to break down barriers, spark conversations, and create memories that turn strangers into lifelong friends.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card/60 backdrop-blur">
                  <div className="aspect-square relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5" />
                    <img 
                      src={activity.image} 
                      alt={`Pip enjoying ${activity.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium block text-center">
                        {activity.vibe}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-center text-foreground">
                      {activity.name}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg" className="group">
              View All Activities in Your City
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pip's Intelligence Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="pulse-gradient-text">Pip Knows</span> What You'll Love
              </h2>
            <p className="text-lg text-foreground/70">
              Our AI reads your crew's vibe and suggests the perfect experiences
            </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Reads Your Profiles</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Analyzes interests, energy levels, and preferences to understand what makes your crew tick.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Watches Group Chat</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Picks up on conversation themes and shared excitement to suggest activities everyone will love.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Checks Local Scene</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Finds the best local spots, events, and experiences available in your city right now.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Benefits */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Shared Experiences Create
                <span className="pulse-gradient-text"> Lasting Bonds</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Break Down Barriers Fast</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Shared challenges and new experiences dissolve social anxiety. When you're all learning to surf or solving an escape room together, conversation flows naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Create Inside Jokes</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Those "remember when" moments become the foundation of friendship. Shared memories give you an instant connection and countless future conversations.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">See Real Personalities</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Activities reveal who people really are. You'll discover the problem-solver, the encourager, the comedian—authentic connections form naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Build Future Plans</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Great experiences lead to "we should do this again!" Your first activity becomes the launching pad for ongoing friendships and adventures.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your
              <span className="pulse-gradient-text"> Story Together?</span>
            </h2>
            
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Your crew is waiting. Your next favorite memory is one activity away. 
              Let Pip match you with like-minded people who'll become your adventure partners, coffee companions, and lifelong friends.
            </p>
            
            <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform text-lg px-8 py-6">
              Find Your Crew & Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-sm text-foreground/60 mt-4">
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