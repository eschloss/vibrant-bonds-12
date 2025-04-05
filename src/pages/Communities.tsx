import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, Users, Sparkles, GraduationCap, Building, Megaphone, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  communityName: z.string().min(2, "Community name must be at least 2 characters"),
  name: z.string().min(2, "Your name is required"),
  email: z.string().email("Invalid email address"),
  communitySize: z.string().min(1, "Please select a community size")
});

type FormValues = z.infer<typeof formSchema>;

const CommunitiesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
                Build Real Friendships
              </span>
              <br />
              In Your Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Match like-minded members into groups of 8-12 people, spark conversations with AI icebreakers, and facilitate meaningful in-person meetups.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="#signup" 
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg"
              >
                <Users size={20} />
                <span>Empower Your Community</span>
              </a>
              <Link 
                to="/matchmaking" 
                className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 border border-white/10 transition-all duration-300 font-medium text-lg"
              >
                <Sparkles size={20} />
                <span>See How It Works</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section - Adapted from HowItWorks component */}
      <section id="how-it-works" className="relative py-12 bg-gray-900/50 backdrop-blur-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
              <Sparkles size={18} className="text-purple-400" />
              How It Works For Communities
            </span>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Making connections within your community</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communitySteps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center hover:translate-y-[-8px] transition-transform duration-300"
              >
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color}`}>
                  <step.icon size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Icebreakers Section - Adapted from AiIcebreakers component */}
      <section className="relative w-full overflow-hidden bg-gray-900 py-16 md:py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-purple-950/30 px-4 py-1.5 mb-4 backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4 text-pulse-purple" />
              <span className="text-sm font-medium text-pulse-purple">AI Icebreakers for Communities</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
            >
              Spark Meaningful <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Conversations</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
            >
              Our AI characters help your community members connect through engaging conversations tailored to your group's interests
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {icebreakers.map(character => (
              <motion.div 
                key={character.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 overflow-hidden mr-3 ring-2 ring-white/50 ${character.bgColor} rounded-full`}>
                        <Avatar className="w-full h-full">
                          <AvatarImage src={character.avatar} alt={character.name} className="object-cover object-center w-full h-full" />
                          <AvatarFallback className={`bg-gradient-to-br ${character.color} text-white`}>
                            {character.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{character.name}</h3>
                        <p className="text-sm text-gray-300">{character.tagline}</p>
                      </div>
                    </div>
                    
                    {/* Character message */}
                    <div className="mb-4">
                      <div className={`rounded-2xl px-4 py-3 bg-gradient-to-r ${character.color} text-white`}>
                        <p className="text-sm font-medium mb-1">{character.name}</p>
                        <p className="text-sm">{character.communityMessage || character.message}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 mt-2">
                      {character.name} creates a {character.tagline.toLowerCase()} environment for authentic sharing.
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Types Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For All Types of Communities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're managing an alumni network, a professional association, or a special interest group, 
              we help your members form meaningful connections.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 flex items-center justify-center mb-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-gray-300">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA/Signup Section */}
      <section id="signup" className="py-20 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Empower Your Community?</h2>
                <p className="text-gray-300 mb-6">
                  Take the first step towards creating a more connected, engaged community. Our team will reach out to discuss how we can work for your specific needs.
                </p>
                <div className="hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className="text-gray-300">Join 200+ thriving communities</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-pink-500/20 p-2">
                      <Sparkles className="h-5 w-5 text-pink-400" />
                    </div>
                    <p className="text-gray-300">Over 50,000 connections made</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CommunitySignupForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const CommunitySignupForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityName: "",
      name: "",
      email: "",
      communitySize: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Form submitted successfully!",
      description: "We'll get back to you soon about " + data.communityName,
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700 p-6 space-y-4">
        <FormField
          control={form.control}
          name="communityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Community Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Stanford Alumni Network"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="communitySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Community Size</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500">
                    <SelectValue placeholder="Select size..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="small">Small (50-500 members)</SelectItem>
                  <SelectItem value="medium">Medium (500-2,000 members)</SelectItem>
                  <SelectItem value="large">Large (2,000-10,000 members)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (10,000+ members)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
        >
          {form.formState.isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Users size={18} />
              Get Started
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

const communitySteps = [{
  icon: Users,
  title: "Group Matching",
  description: "Our AI creates groups of 8-12 members based on shared interests, location, and compatibility.",
  color: "bg-gradient-to-r from-pink-500 to-purple-600"
}, {
  icon: MessageSquare,
  title: "AI Icebreakers",
  description: "Customized conversation starters help members connect quickly and meaningfully.",
  color: "bg-gradient-to-r from-blue-500 to-cyan-400"
}, {
  icon: Sparkles,
  title: "Engagement Insights",
  description: "Track community engagement metrics and identify successful connection patterns.",
  color: "bg-gradient-to-r from-indigo-400 to-blue-500"
}, {
  icon: GraduationCap,
  title: "Real Connections",
  description: "Members meet in person, forming genuine friendships that strengthen your community.",
  color: "bg-gradient-to-r from-green-400 to-emerald-500"
}];

const icebreakers = [{
  id: "baba-yaga",
  name: "Baba Yaga",
  tagline: "Mystical & Wise",
  avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  color: "from-emerald-500 to-emerald-700",
  bgColor: "bg-emerald-500/20",
  message: "If you could possess any magical ability for a day, what would it be and how would you use it?",
  communityMessage: "If your community had one superpower, what would it be and how would you use it to help your members?"
}, {
  id: "sherlock",
  name: "Sherlock Holmes",
  tagline: "Analytical & Curious",
  avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
  color: "from-blue-500 to-blue-700",
  bgColor: "bg-blue-500/20",
  message: "Based on observable evidence, what unusual hobby do you think the person to your left might secretly enjoy?",
  communityMessage: "What unique pattern or insight have you observed about successful connections in your community?"
}, {
  id: "drag-queen",
  name: "Divine Diva",
  tagline: "Fabulous & Bold",
  avatar: "https://images.unsplash.com/photo-1589643138280-f39694648e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  color: "from-pink-500 to-purple-600",
  bgColor: "bg-pink-500/20",
  message: "Darlings! If your life had a theme song that played whenever you entered a room, what would it be and why?",
  communityMessage: "What memorable theme or event has created the most vibrant connections among your community members?"
}, {
  id: "baby-yoda",
  name: "Baby Yoda",
  tagline: "Cute & Innocent",
  avatar: "https://images.unsplash.com/photo-1501286353178-1ec881214838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  color: "from-green-500 to-green-700",
  bgColor: "bg-green-500/20",
  message: "Favorite snack from childhood, what is? Share why special to you, hmm?",
  communityMessage: "Simple but effective, what connection ritual in your community has been, hmm? Why works so well?"
}];

const communityTypes = [
  {
    icon: <GraduationCap className="text-white h-6 w-6" />,
    title: "Alumni Networks",
    description: "Connect former students who share academic backgrounds but may have diverse career paths and experiences."
  },
  {
    icon: <Building className="text-white h-6 w-6" />,
    title: "Professional Associations",
    description: "Create meaningful relationships beyond formal networking events by matching members with similar interests."
  },
  {
    icon: <Megaphone className="text-white h-6 w-6" />,
    title: "Creator Communities",
    description: "Help influencers and creators foster connection among their followers through meaningful group matches."
  }
];

export default CommunitiesPage;
