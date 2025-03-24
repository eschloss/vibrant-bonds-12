
import { Link } from "react-router-dom";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin } from "lucide-react";

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
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Pulse</h3>
            <p className="text-white/70 mb-6 max-w-xs">
              Building a world where creating meaningful friendships is effortless and joyful.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/press" 
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cities */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Cities</h3>
            <div className="grid grid-cols-2 gap-y-3">
              {cities.map((city) => (
                <Link 
                  key={city}
                  to={`/cities/${city.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  <MapPin size={14} />
                  <span>{city}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Contact</h3>
            <p className="text-white/70 mb-6">
              Questions or feedback? We'd love to hear from you.
            </p>
            <a 
              href="mailto:hello@pulse-app.com" 
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-3"
            >
              <Mail size={16} />
              <span>hello@pulse-app.com</span>
            </a>
            <Link 
              to="/contact" 
              className="inline-block px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Pulse App. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/privacy" 
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookie-policy" 
              className="text-white/50 hover:text-white text-sm transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            <span className="text-white/50 text-sm flex items-center gap-1">
              Made with <Heart size={12} className="fill-pulse-coral text-pulse-coral" /> in SF
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
