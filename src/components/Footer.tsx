
import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const cities = [
    "San Francisco",
    "Los Angeles",
    "New York",
    "Austin",
    "Seattle",
    "Portland",
    "Chicago",
    "Boston",
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 relative">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {/* Company */}
            <div>
              <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">Pulse</span>
                <Sparkles className="text-purple-400 h-5 w-5" />
              </h3>
              <p className="text-white/70 mb-6 max-w-xs">
                Building a world where creating meaningful friendships is effortless and joyful.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 p-2 rounded-full transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 p-2 rounded-full transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 p-2 rounded-full transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 p-2 rounded-full transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-display font-bold text-xl mb-4 text-white">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/about" 
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/careers" 
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/press" 
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Cities */}
            <div>
              <h3 className="font-display font-bold text-xl mb-4 text-white">Cities</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {cities.map((city) => (
                  <Link 
                    key={city}
                    to={`/cities/${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/70 hover:text-purple-400 transition-colors duration-200 flex items-center gap-1"
                  >
                    <MapPin size={14} className="text-purple-400" />
                    <span>{city}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-display font-bold text-xl mb-4 text-white">Contact</h3>
              <p className="text-white/70 mb-6">
                Questions or feedback? We'd love to hear from you.
              </p>
              <a 
                href="mailto:hello@pulse-app.com" 
                className="flex items-center gap-2 text-white/70 hover:text-purple-400 transition-colors duration-200 mb-3"
              >
                <Mail size={16} className="text-purple-400" />
                <span>hello@pulse-app.com</span>
              </a>
              <Link 
                to="/contact" 
                className="inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 rounded-full text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Pulse App. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/privacy" 
                className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookie-policy" 
                className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <span className="text-white/50 text-sm flex items-center gap-1">
                Made with <Heart size={12} className="fill-pink-500 text-pink-500" /> in SF
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
