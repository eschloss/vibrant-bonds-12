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
import AiIcebreakers from "@/components/AiIcebreakers";

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
                              Build Real Friendships<br/>

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
              Within Your Community
              </span>
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
      
      {/* AI Icebreakers Section - Using the imported AiIcebreakers component */}
      <AiIcebreakers />
      
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
