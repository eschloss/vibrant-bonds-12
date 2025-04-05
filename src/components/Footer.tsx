
import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Sparkles, Apple, Play } from "lucide-react";
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
        
        {/* Download App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-16 bg-gradient-to-r from-gray-800/70 to-gray-800/50 p-8 rounded-2xl border border-white/10 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
                Take Pulse Everywhere
              </h3>
              <p className="text-white/80 text-lg">
                Download the Pulse app to make meaningful connections on the go. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-black/80 text-white py-3 px-6 rounded-xl transition-all duration-200 shadow-lg group"
                >
                  <Apple size={24} className="text-white group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="text-xs font-light">Download on the</div>
                    <div className="text-md font-bold">App Store</div>
                  </div>
                </a>
                <a 
                  href="https://play.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-black/80 text-white py-3 px-6 rounded-xl transition-all duration-200 shadow-lg group"
                >
                  <Play size={24} className="text-white fill-white group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="text-xs font-light">Get it on</div>
                    <div className="text-md font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80" 
                  alt="Pulse app on mobile device" 
                  className="relative z-10 rounded-xl shadow-2xl w-full max-w-md mx-auto object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
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
