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
      name: "Beach & Water Sports",
      image: pipSurfing,
      description: "Catch waves, make memories. Perfect for adventurous souls who love the ocean.",
      vibe: "Adventurous",
      duration: "Half Day",
      groupSize: "6-8 people",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      id: "volleyball",
      name: "Beach Sports & Games",
      image: pipVolleyball,
      description: "Spike, laugh, bond. Team sports that bring out everyone's competitive spirit.",
      vibe: "Energetic",
      duration: "2-3 hours",
      groupSize: "8-12 people",
      gradient: "from-orange-500 to-yellow-400"
    },
    {
      id: "camping",
      name: "Outdoor Adventures",
      image: pipCamping,
      description: "Under the stars, around the fire. Nature experiences that create deep connections.",
      vibe: "Peaceful",
      duration: "Weekend",
      groupSize: "6-10 people",
      gradient: "from-purple-600 to-indigo-500"
    },
    {
      id: "pilates",
      name: "Wellness & Fitness",
      image: pipPilates,
      description: "Strengthen bodies, build bonds. Group fitness that feels more like fun than work.",
      vibe: "Mindful",
      duration: "1-2 hours",
      groupSize: "6-8 people",
      gradient: "from-pink-500 to-rose-400"
    },
    {
      id: "bookclub",
      name: "Creative & Cultural",
      image: pipBookclub,
      description: "Stories, wine, new perspectives. Intellectual conversations that spark deep friendships.",
      vibe: "Thoughtful",
      duration: "2-3 hours",
      groupSize: "6-8 people",
      gradient: "from-amber-600 to-orange-500"
    },
    {
      id: "pottery",
      name: "Arts & Crafts",
      image: pipPottery,
      description: "Create together, laugh together. Hands-on workshops where masterpieces and friendships are made.",
      vibe: "Creative",
      duration: "2-4 hours",
      groupSize: "6-10 people",
      gradient: "from-teal-500 to-emerald-400"
    },
    {
      id: "escape",
      name: "Puzzles & Games",
      image: pipEscapeRoom,
      description: "Solve mysteries, build trust. Team challenges that reveal everyone's unique strengths.",
      vibe: "Clever",
      duration: "1-2 hours",
      groupSize: "6-8 people",
      gradient: "from-violet-600 to-purple-500"
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

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
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
      <section className="py-20 bg-muted/30">
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each experience is designed to break down barriers, spark conversations, and create the kind of memories that turn strangers into lifelong friends.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card/80 backdrop-blur">
                  <div className="aspect-square relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} opacity-20`} />
                    <img 
                      src={activity.image} 
                      alt={`Pip enjoying ${activity.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {activity.vibe}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {activity.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {activity.groupSize}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {activity.duration}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
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
              <p className="text-lg text-muted-foreground">
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
                <p className="text-muted-foreground leading-relaxed">
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
                <p className="text-muted-foreground leading-relaxed">
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
                <p className="text-muted-foreground leading-relaxed">
                  Finds the best local spots, events, and experiences available in your city right now.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Benefits */}
      <section className="py-20 bg-muted/30">
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
                  <p className="text-muted-foreground leading-relaxed">
                    Shared challenges and new experiences dissolve social anxiety. When you're all learning to surf or solving an escape room together, conversation flows naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Create Inside Jokes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Those "remember when" moments become the foundation of friendship. Shared memories give you an instant connection and countless future conversations.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">See Real Personalities</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Activities reveal who people really are. You'll discover the problem-solver, the encourager, the comedian—authentic connections form naturally.
                  </p>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-3 text-foreground">Build Future Plans</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your crew is waiting. Your next favorite memory is one activity away. 
              Let Pip match you with like-minded people who'll become your adventure partners, coffee companions, and lifelong friends.
            </p>
            
            <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform text-lg px-8 py-6">
              Find Your Crew & Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
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