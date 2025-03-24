import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Calendar, 
  Sparkles,
  ArrowRight,
  Search,
  ThumbsUp,
  MapPin,
  Bell,
  CheckCircle,
  User,
  Clock,
  Coffee,
  UserPlus,
  Bookmark,
  Zap
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    id: "discover",
    title: "Get Matched Automatically",
    description: "Our AI connects you with your perfect tribe based on shared interests, energy levels, and passions.",
    icon: Users,
    color: "from-pink-500 to-purple-600",
    textColor: "text-pink-300"
  },
  {
    id: "connect",
    title: "Meaningful Conversations",
    description: "Skip the small talk with AI-powered conversation starters that create genuine connections.",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-400",
    textColor: "text-blue-300"
  },
  {
    id: "meetup",
    title: "IRL Experiences",
    description: "Transition from digital to real-life with suggested activities based on mutual interests.",
    icon: Calendar,
    color: "from-orange-400 to-yellow-300",
    textColor: "text-orange-300"
  },
  {
    id: "friendship",
    title: "Lifelong Friendships",
    description: "Build deep connections that last with smart reminders to nurture your relationships.",
    icon: Heart,
    color: "from-green-400 to-emerald-500",
    textColor: "text-green-300"
  }
];

// Mock data for the app screens
const appScreenContent = {
  discover: {
    title: "You've Been Matched!",
    groupName: "Portland Photography Enthusiasts",
    members: [
      { name: "Alex", image: null, color: "from-purple-400 to-pink-500" },
      { name: "Jamie", image: null, color: "from-blue-400 to-indigo-500" },
      { name: "Taylor", image: null, color: "from-green-400 to-teal-500" },
      { name: "Morgan", image: null, color: "from-red-400 to-orange-500" },
      { name: "Jordan", image: null, color: "from-amber-400 to-yellow-500" },
      { name: "Riley", image: null, color: "from-pink-400 to-rose-500" },
      { name: "Casey", image: null, color: "from-indigo-400 to-blue-500" },
      { name: "Drew", image: null, color: "from-emerald-400 to-green-500" },
      { name: "Quinn", image: null, color: "from-fuchsia-400 to-purple-500" },
      { name: "Avery", image: null, color: "from-cyan-400 to-blue-500" }
    ],
    interests: ["Photography", "Hiking", "Art Galleries", "Urban Exploration", "Coffee Tasting"],
    matchScore: 94
  },
  connect: {
    title: "Chat",
    conversation: [
      { sender: "You", message: "Hey! I noticed you're into rock climbing too!" },
      { sender: "Sam", message: "Yeah! Been climbing for about 2 years now. How about you?" },
      { sender: "AI", message: "Ask about their favorite climbing spot...", isPrompt: true },
      { sender: "You", message: "Do you have a favorite climbing spot nearby?" },
    ],
    suggestions: ["Ask about gear", "Share a climbing story", "Suggest meeting up"]
  },
  meetup: {
    title: "Activities Near You",
    events: [
      { name: "Coffee Tasting Workshop", date: "Sat, May 18", attendees: 6, distance: "0.5 miles" },
      { name: "Sunset Hike Group", date: "Sun, May 19", attendees: 8, distance: "2 miles" },
      { name: "Board Game Night", date: "Fri, May 24", attendees: 12, distance: "1 mile" },
    ]
  },
  friendship: {
    title: "Friendship Timeline",
    events: [
      { date: "2 months ago", activity: "First coffee meetup" },
      { date: "Last month", activity: "Went hiking at Pine Trail" },
      { date: "Last week", activity: "Book club discussion" },
    ],
    reminder: { message: "Jamie's birthday is next week!", action: "Send a message or plan something special" }
  }
};

const HowItWorks = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev < features.length - 1 ? prev + 1 : 0));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Function to render different app screens based on the active feature
  const renderAppScreen = (featureId) => {
    const content = appScreenContent[featureId];
    
    switch (featureId) {
      case "discover":
        return (
          <div className="relative overflow-hidden rounded-xl h-full">
            <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-xl">
              <h3 className="text-lg font-semibold">{content.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Zap size={15} className="text-yellow-300" />
                <span className="text-sm text-yellow-200 font-medium">{content.matchScore}% Match Rate</span>
              </div>
            </div>
            
            <div className="bg-gray-900 h-full p-4 rounded-b-xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/80 p-3 rounded-xl border border-purple-500/20 mb-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bookmark className="text-purple-400" size={16} />
                  <h4 className="font-bold text-white">
                    {content.groupName}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {content.interests.map(interest => (
                    <Badge 
                      key={interest} 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 rounded-full px-2.5 py-0.5"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </motion.div>
              
              <div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-3"
                >
                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                    <UserPlus size={14} className="text-purple-400" />
                    <span>Your new tribe ({content.members.length} people)</span>
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-5 gap-2">
                  {content.members.map((member, idx) => (
                    <motion.div 
                      key={member.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex flex-col items-center"
                    >
                      <Avatar className="w-10 h-10 mb-1 border-2 border-gray-700">
                        {member.image ? (
                          <AvatarImage src={member.image} alt={member.name} />
                        ) : (
                          <AvatarFallback className={`bg-gradient-to-br ${member.color} text-white text-xs`}>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-xs text-gray-300 text-center">
                        {member.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="mt-5 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <button className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-sm font-medium">
                  Start Chatting
                </button>
              </motion.div>
            </div>
          </div>
        );
      
      case "connect":
        return (
          <div className="relative overflow-hidden rounded-xl h-full">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <button className="p-1">
                  <ArrowRight size={16} className="text-white rotate-180" />
                </button>
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-medium">Sam</h3>
                </div>
                <div className="w-6"></div>
              </div>
            </div>
            
            <div className="bg-gray-900 h-full p-3 rounded-b-xl">
              <div className="h-[280px] overflow-y-auto mb-4">
                {content.conversation.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 + 0.2 }}
                    className={`mb-3 ${msg.isPrompt ? "mx-auto max-w-[80%]" : ""}`}
                  >
                    {msg.isPrompt ? (
                      <div className="bg-purple-900/50 p-2 rounded-lg border border-purple-500/30 text-sm text-purple-300">
                        <Sparkles size={12} className="inline-block mr-1 text-purple-400" />
                        {msg.message}
                      </div>
                    ) : (
                      <div className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.sender === "You" 
                            ? "bg-blue-600 text-white rounded-br-none" 
                            : "bg-gray-800 text-gray-100 rounded-bl-none"
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="bg-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-xs text-gray-500 mb-2">Conversation starters:</p>
                <div className="flex flex-wrap gap-2">
                  {content.suggestions.map((suggestion, idx) => (
                    <motion.button 
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + idx * 0.1 }}
                      className="text-xs bg-gray-700 text-blue-300 px-3 py-1.5 rounded-full hover:bg-gray-600"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <input 
                  type="text" 
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white"
                  placeholder="Type your message..."
                />
                <button className="p-2 bg-blue-600 rounded-full">
                  <MessageCircle size={18} className="text-white" />
                </button>
              </motion.div>
            </div>
          </div>
        );
      
      case "meetup":
        return (
          <div className="relative overflow-hidden rounded-xl h-full">
            <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white rounded-t-xl">
              <h3 className="text-lg font-medium">{content.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Nearby</button>
                  <button className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">This Week</button>
                </div>
                <button className="p-1.5 bg-white/20 rounded-full">
                  <MapPin size={14} className="text-white" />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 h-full p-3 rounded-b-xl">
              {content.events.map((event, idx) => (
                <motion.div 
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 + 0.2 }}
                  className="bg-gray-800 p-4 rounded-xl mb-3 border border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center text-white">
                      {idx === 0 ? <Coffee size={22} /> : idx === 1 ? <MapPin size={22} /> : <Users size={22} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-white">{event.name}</h4>
                          <p className="text-xs text-gray-400">{event.date} • {event.distance}</p>
                        </div>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-orange-300">
                          {event.attendees} going
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="flex-1 text-xs bg-gradient-to-r from-orange-500 to-amber-400 text-white px-3 py-1.5 rounded-full font-medium">
                          Join Event
                        </button>
                        <button className="px-3 py-1.5 text-xs bg-gray-700 text-white rounded-full">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                className="flex justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full text-white text-sm font-medium">
                  Find More Events
                </button>
              </motion.div>
            </div>
          </div>
        );
      
      case "friendship":
        return (
          <div className="relative overflow-hidden rounded-xl h-full">
            <div className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Jamie</h3>
                  <p className="text-xs text-green-200">Friends for 3 months</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 h-full p-3 rounded-b-xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-500/20 border border-red-500/30 p-3 rounded-xl mb-4"
              >
                <div className="flex items-start gap-2">
                  <Bell size={18} className="text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white text-sm">{content.reminder.message}</h4>
                    <p className="text-xs text-gray-400 mt-1">{content.reminder.action}</p>
                  </div>
                </div>
              </motion.div>
              
              <h4 className="font-medium text-green-400 mb-3 flex items-center gap-1.5">
                <Clock size={14} /> Friendship Timeline
              </h4>
              
              <div className="relative pl-6 border-l border-gray-700">
                {content.events.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 + 0.4 }}
                    className="mb-6 relative"
                  >
                    <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{event.date}</p>
                    <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                      <p className="text-sm text-white">{event.activity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex justify-between mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button className="px-3 py-1.5 bg-gray-800 text-green-400 rounded-full text-xs flex items-center gap-1">
                  <Calendar size={12} /> Plan Activity
                </button>
                <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full text-xs">
                  Send Message
                </button>
              </motion.div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gray-900 dark:bg-gray-950"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3">
              <Sparkles size={18} className="text-purple-400" />
              Friendship Simplified
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">Pulse</span> Works
            </h2>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Building friendships shouldn't be complicated. Pulse makes it easy to find your people and create memories together.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative bg-gray-800 rounded-3xl p-1.5 overflow-hidden shadow-xl border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-50"></div>
              
              <div className="relative bg-gray-900 rounded-[22px] p-2 h-[460px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
                
                <div className="relative h-full rounded-xl overflow-hidden border border-gray-800">
                  <div className="absolute top-0 inset-x-0 h-6 bg-black z-10 flex items-center justify-between px-4">
                    <div className="text-white text-xs">9:41</div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1 inset-x-0 flex justify-center z-10">
                    <div className="w-24 h-1 bg-white/40 rounded-full"></div>
                  </div>
                  
                  {features.map((feature, index) => {
                    const isActive = activeFeature === index;
                    
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.95,
                          y: isActive ? 0 : 10
                        }}
                        transition={{ duration: 0.4 }}
                        className={`absolute inset-0 pt-6 pb-1 px-1 ${isActive ? '' : 'pointer-events-none'}`}
                      >
                        {renderAppScreen(feature.id)}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-3">
              {features.map((feature, index) => {
                const isActive = activeFeature === index;
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 
                      ${isActive 
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg shadow-purple-900/20 border border-gray-700' 
                        : 'hover:bg-gray-800/40'}`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className={`rounded-lg p-3 bg-gradient-to-br ${feature.color}`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${isActive ? feature.textColor : 'text-white'}`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                    
                    <ArrowRight 
                      size={18} 
                      className={`${isActive ? 'text-purple-400' : 'text-gray-600'} transition-all duration-300 ${isActive ? 'translate-x-0' : '-translate-x-2'}`} 
                    />
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 pl-4"
            >
              <a 
                href="#download" 
                className="group flex items-center gap-2 text-purple-400 font-medium hover:text-purple-300 transition-colors"
              >
                <span>Get started for free</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
