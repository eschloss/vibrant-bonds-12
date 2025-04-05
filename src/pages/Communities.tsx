
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, Users, Heart, Coffee, Gift, Sparkles, Building, BookOpen, Megaphone, GraduationCap, Award, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

// Form validation schema
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
                Strengthen Your Community
              </span>
              <br />
              One Connection at a Time
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Transform how members of your community connect, engage, and build lasting relationships through AI-powered matchmaking.
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
              Pulse helps your members form meaningful connections.
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
      
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black/70 backdrop-blur-lg relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Pulse Empowers Your Community</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our intelligent platform creates meaningful connections between members, resulting in higher engagement and stronger community bonds.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits for Your Community</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how Pulse transforms community engagement and creates lasting connections among your members.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">For Community Managers</h3>
              <ul className="space-y-4">
                {managerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-500/20 p-1 mt-1">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">For Community Members</h3>
              <ul className="space-y-4">
                {memberBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="rounded-full bg-pink-500/20 p-1 mt-1">
                      <Heart className="h-4 w-4 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{benefit.title}</h4>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Communities love how Pulse helps their members create meaningful connections.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-3xl border border-gray-700 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-1">
                      <div className="bg-gray-900 rounded-full p-1">
                        {testimonial.icon}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
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
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-3xl border border-gray-700 p-8 md:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Empower Your Community?</h2>
                <p className="text-gray-300 mb-6">
                  Take the first step towards creating a more connected, engaged community. Our team will reach out to discuss how Pulse can work for your specific needs.
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
                      <Heart className="h-5 w-5 text-pink-400" />
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
      
      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black/70 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about implementing Pulse in your community.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
              >
                <h4 className="text-xl font-bold mb-2">{faq.question}</h4>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Signup Form Component
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
    // This would typically send the data to your backend
    console.log("Form submitted:", data);
    
    // Simulate form submission
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
              <Send size={18} />
              Get Started
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

// Data for different sections
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
    icon: <BookOpen className="text-white h-6 w-6" />,
    title: "Book & Interest Clubs",
    description: "Deepen engagement by connecting members with similar literary tastes or discussion interests."
  },
  {
    icon: <Megaphone className="text-white h-6 w-6" />,
    title: "Creator Communities",
    description: "Help influencers and creators foster connection among their followers through meaningful one-on-one matches."
  },
  {
    icon: <Award className="text-white h-6 w-6" />,
    title: "Membership Organizations",
    description: "Increase retention by ensuring members build personal connections within your broader organization."
  },
  {
    icon: <Coffee className="text-white h-6 w-6" />,
    title: "Social Clubs",
    description: "Facilitate new friendships within existing social structures by matching members who haven't yet connected."
  }
];

const howItWorks = [
  {
    title: "Personalized Profiles",
    description: "Members create profiles with their interests, background, and what they're looking for in connections."
  },
  {
    title: "Smart Matching Algorithm",
    description: "Our AI analyzes profiles to suggest matches based on shared interests, goals, and compatibility."
  },
  {
    title: "Location-Based Matching",
    description: "Members get matched with others in their city, making it easy to meet up for coffee or activities."
  },
  {
    title: "Guided Interactions",
    description: "AI-generated conversation starters and activity suggestions help break the ice and make meetings meaningful."
  },
  {
    title: "Community Dashboard",
    description: "Administrators can track engagement metrics, gather feedback, and optimize the experience."
  },
  {
    title: "Regular Match Cycles",
    description: "Weekly or monthly matching cycles keep engagement fresh and give members multiple opportunities to connect."
  }
];

const managerBenefits = [
  {
    title: "Increased Member Engagement",
    description: "Members who form personal connections are more likely to participate in events and remain active."
  },
  {
    title: "Higher Retention Rates",
    description: "When people build friendships within your community, they're less likely to let memberships lapse."
  },
  {
    title: "Actionable Analytics",
    description: "Track which matches lead to meetings, which interests are popular, and optimize your community."
  },
  {
    title: "Less Administrative Overhead",
    description: "Automate the matching process instead of manually organizing networking events."
  }
];

const memberBenefits = [
  {
    title: "Meaningful Connections",
    description: "Meet people who share your specific interests rather than random networking."
  },
  {
    title: "Local Friendships",
    description: "Connect with people in your city who you might not otherwise meet."
  },
  {
    title: "Professional Growth",
    description: "Expand your network with quality connections that can lead to collaboration and opportunities."
  },
  {
    title: "Personalized Experience",
    description: "Control your preferences and receive matches tailored to your specific goals and interests."
  }
];

const testimonials = [
  {
    icon: <GraduationCap className="text-white h-5 w-5" />,
    name: "Stanford Alumni Network",
    role: "University Alumni Association",
    quote: "Pulse has transformed how our alumni connect locally. Members who haven't been active in years are now meeting monthly with fellow alumni in their cities."
  },
  {
    icon: <Building className="text-white h-5 w-5" />,
    name: "Women in Tech Collective",
    role: "Professional Association",
    quote: "Our members love the personalized matches based on their specific tech interests. It's created a stronger sense of community beyond our formal events."
  },
  {
    icon: <Megaphone className="text-white h-5 w-5" />,
    name: "Growth Mindset Community",
    role: "Online Creator Platform",
    quote: "As a creator, I wanted my audience to connect with each other, not just with me. Pulse has created a thriving community of like-minded followers."
  }
];

const faqs = [
  {
    question: "How does Pulse integrate with our existing community platform?",
    answer: "Pulse works alongside your existing community platforms. We provide custom links or embeddable widgets that you can share with your members. We also offer API integration for seamless experiences."
  },
  {
    question: "How much does it cost to implement Pulse in our community?",
    answer: "Pricing is based on your community size and specific needs. We offer plans starting from small communities to enterprise solutions. Contact us for a personalized quote."
  },
  {
    question: "How do you ensure privacy and safety for our members?",
    answer: "Privacy is our priority. Members control what information they share, and all data is encrypted. We also provide community managers with moderation tools and safety guidelines."
  },
  {
    question: "Can we customize the matching algorithm for our specific community?",
    answer: "Absolutely! We work with you to understand your community's unique needs and adjust our matching parameters accordingly. This includes custom questions and matching criteria."
  },
  {
    question: "How long does it take to implement Pulse in our community?",
    answer: "Most communities can be up and running within 1-2 weeks. Our team handles the setup, configuration, and provides resources to help you introduce Pulse to your members."
  }
];

export default CommunitiesPage;
