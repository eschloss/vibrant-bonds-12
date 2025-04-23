import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Sparkles, Apple, Play } from "lucide-react";
import { motion } from "framer-motion";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const cities = ["London", "Los Angeles", "New York", "Austin", "Seattle", "Portland", "Chicago", "Boston"];
  return <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 relative">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1: About */}
            <div>
              <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                <img alt="Pulse Logo" className="h-5 md:h-6 object-fill" src="https://s.kikiapp.eu/img/pulse_logo.png" />
              </h3>
              <p className="text-white/70 text-sm mb-4">Reimagining how we make friends by turning digital connection into effortless Real-Life community.</p>
              <div className="flex space-x-3 mb-4">
                <a href="https://instagram.com/pulse_app_" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-purple-400 transition-colors">
                  <Instagram size={18} />
                </a>
                {/*<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-purple-400 transition-colors">
                  <Twitter size={18} />
                 </a>*/}
                <a href="https://www.facebook.com/profile.php?id=61570738108928" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-purple-400 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.linkedin.com/company/pulse-plans/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-purple-400 transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
              
              {/* App Download Links */}
              <div className="flex space-x-2">
                <a href="https://apps.apple.com/us/app/pulse-spontaneous-plans/id6472660833" target="_blank" rel="noopener noreferrer" className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors py-1 px-2 rounded-md text-xs">
                  <Apple size={12} className="mr-1" />
                  App Store
                </a>
                <a href="https://play.google.com/store/apps/details?id=eu.kikiapp.kiki" target="_blank" rel="noopener noreferrer" className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors py-1 px-2 rounded-md text-xs">
                  <Play size={12} className="mr-1" />
                  Play Store
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/matchmaking" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/communities" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    For Communities
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Cities */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Cities</h3>
              <ul className="grid grid-cols-2 gap-2">
                {cities.map((city, i) => <li key={i}>
                    <Link to={`/cities/${city.toLowerCase().replace(' ', '-')}`} className="text-white/50 hover:text-pulse-pink text-sm transition-colors flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {city}
                    </Link>
                  </li>)}
                <li className="col-span-2 mt-2">
                  <Link to="/cities" className=" text-pulse-pink hover:text-pulse-pink-300 text-sm font-medium transition-colors">
                    View all cities
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail size={16} className="text-pulse-pink mt-1 mr-2" />
                  <a href="mailto:contact@pulsenow.app" className="text-white/70 text-sm hover:text-pulse-pink transition-colors">contact@pulsenow.app</a>
                </li>
                <li className="flex items-start">
                  <MapPin size={16} className="text-pulse-pink mt-1 mr-2" />
                  <span className="text-white/70 text-sm">100 Fore St, Portland, ME 04101</span>
                </li>
              </ul>

              {/* App Download Buttons */}
              <div className="mt-4 flex flex-col space-y-2">
                <a href="https://apps.apple.com/us/app/pulse-spontaneous-plans/id6472660833" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-3 rounded-md">
                  <Apple size={18} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Download on the</span>
                    <span className="text-sm font-medium">App Store</span>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=eu.kikiapp.kiki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-3 rounded-md">
                  <Play size={18} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">Get it on</span>
                    <span className="text-sm font-medium">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
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
              <Link to="https://legal.pulsenow.app/privacy.html" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="https://legal.pulsenow.app/terms.html" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>;
};
export default Footer;