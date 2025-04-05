import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const cities = ["San Francisco", "Los Angeles", "New York", "Austin", "Seattle", "Portland", "Chicago", "Boston"];
  return <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 relative">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Pulse App. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
              <span className="text-white/50 text-sm flex items-center gap-1">
                Made with <Heart size={12} className="fill-pink-500 text-pink-500" /> in SF
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>;
};
export default Footer;