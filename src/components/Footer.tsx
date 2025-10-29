
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getCurrentPageLabel } from "@/lib/utils";
import { Heart, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Sparkles, Apple, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useRefParam } from "@/hooks/useRefParam";
import Text from "@/components/Text";
 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
    if (!isValid) {
      setError("Please enter a valid email.");
      return;
    }
    try {
      setIsSubmitting(true);
      const { error: insertError } = await supabase
        .from("newsletter")
        .insert({
          email: email.trim(),
          source: "pulsenow.app",
          source_details: getCurrentPageLabel(),
        });
      if (insertError) {
        // Helpful debug log for setup issues (RLS/privileges)
        console.error("Newsletter insert error:", insertError);
        // Treat duplicate email as success for UX
        if ((insertError as any).code === "23505") {
          setSubscribed(true);
          setEmail("");
          return;
        }
        throw insertError;
      }
      setSubscribed(true);
      setEmail("");
    } catch (err: any) {
      setError("Could not subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const currentYear = new Date().getFullYear();
  
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();
  
  const cities = ["London", "Los Angeles", "New York", "Berlin", "Madrid", "Portland", "Chicago", "Boston"];
  
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1: About */}
            <div className="lg:col-span-2">
              <div className="text-xl font-display font-bold mb-4 flex items-center">
                <img 
                  alt="Pulse Logo" 
                  className="h-24 md:h-28 object-contain" 
                  src="https://s.kikiapp.eu/img/pulse_logo.png" 
                />
              </div>
              <p className="text-white/70 text-sm mb-4">
                <Text id="footer.about_description" className="">Reimagining how we make friends by turning digital connection into effortless Real-Life community.</Text>
              </p>
              <div className="flex space-x-3 mb-4">
                <a href="https://instagram.com/pulse_app_" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pulse-pink transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61570738108928" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pulse-pink transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.linkedin.com/company/pulse-plans/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pulse-pink transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.reddit.com/r/PulseMeetNewFriends/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pulse-pink transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
              
              {/* App Download Links */}
              <div className="flex space-x-2">
                <a href="https://apps.apple.com/us/app/pulse-spontaneous-plans/id6472660833" target="_blank" rel="noopener noreferrer" className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors py-1 px-2 rounded-md text-xs">
                  <Apple size={12} className="mr-1" />
                  <Text id="footer.app_store" className="">App Store</Text>
                </a>
                <a href="https://play.google.com/store/apps/details?id=eu.kikiapp.kiki" target="_blank" rel="noopener noreferrer" className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors py-1 px-2 rounded-md text-xs">
                  <Play size={12} className="mr-1" />
                  <Text id="footer.play_store" className="">Play Store</Text>
                </a>
              </div>

              {/* Newsletter subscribe */}
              <div className="mt-5">
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Subscribe to our newsletter"
                    aria-label="Email address"
                    className="w-full rounded-full bg-gray-800/80 border border-gray-700 text-sm text-white placeholder-white/40 px-4 py-3 pr-32 focus:outline-none focus:ring-2 focus:ring-pulse-pink/30"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1 top-1 bottom-1 rounded-full px-4 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white text-sm font-medium hover:opacity-95 disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting…" : "Subscribe"}
                  </button>
                </form>
                {subscribed ? (
                  <p className="text-green-400 text-xs mt-2">Thanks — you’re on the list!</p>
                ) : error ? (
                  <p className="text-red-400 text-xs mt-2">{error}</p>
                ) : (
                  <p className="text-white/50 text-xs mt-2">Occasional updates. No spam.</p>
                )}
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <div className="text-white text-lg font-bold mb-4">
                <Text id="footer.company" className="">Company</Text>
              </div>
              <ul className="space-y-2">
                <li>
                  <Link to={addRefToUrl("/")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.home" className="">Home</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/activities")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.activities" className="">Adventures</Text>
                  </Link>
                </li>
                
                <li>
                  <Link to={addRefToUrl("/partners")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.partnerships" className="">Partnerships</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/ambassador-program")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.ambassador_program" className="">Ambassador Program</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/careers")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.careers" className="">Careers</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/press")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/meet-pip")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.meet_pip" className="">Meet Pip</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/loneliness-epidemic")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Loneliness Report
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/real-life-magic")} className="text-white/50 hover:text-pulse-pink text-sm transition-colors">
                    Real-Life Magic
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Cities */}
            <div>
              <div className="text-white text-lg font-bold mb-4">
                <Text id="footer.cities" className="">Cities</Text>
              </div>
              <ul className="grid grid-cols-1 gap-2">
                {cities.map((city, i) => <li key={i}>
                    <Link to={addRefToUrl(`/cities/${city.toLowerCase().replace(' ', '-')}`)} className="text-white/50 hover:text-pulse-pink text-sm transition-colors flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {city}
                    </Link>
                  </li>)}
                <li className="mt-2">
                  <Link to={addRefToUrl("/cities")} className=" text-pulse-pink hover:text-pulse-pink-300 text-sm font-medium transition-colors">
                    <Text id="footer.view_all_cities" className="">View all cities</Text>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <div className="text-white text-lg font-bold mb-4">
                <Text id="footer.contact_title" className="">Contact</Text>
              </div>
              {/* Quick Links */}
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to={addRefToUrl("/contact")} className="text-white/70 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.contact" className="">Contact</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/about")} className="text-white/70 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.about_us" className="">About Us</Text>
                  </Link>
                </li>
                <li>
                  <Link to={addRefToUrl("/faq")} className="text-white/70 hover:text-pulse-pink text-sm transition-colors">
                    <Text id="footer.faq" className="">FAQ</Text>
                  </Link>
                </li>
              </ul>

              <ul className="mt-4 space-y-3">
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
                    <span className="text-xs text-white/70">
                      <Text id="footer.download_on" className="">Download on the</Text>
                    </span>
                    <span className="text-sm font-medium">
                      <Text id="footer.app_store_full" className="">App Store</Text>
                    </span>
                  </div>
                </a>
                <a href="https://play.google.com/store/apps/details?id=eu.kikiapp.kiki" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-3 rounded-md">
                  <Play size={18} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">
                      <Text id="footer.get_it_on" className="">Get it on</Text>
                    </span>
                    <span className="text-sm font-medium">
                      <Text id="footer.google_play" className="">Google Play</Text>
                    </span>
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
              &copy; {currentYear} <Text id="footer.copyright" className="">Pulse App. All rights reserved.</Text>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                <Text id="footer.privacy_policy" className="">Privacy Policy</Text>
              </Link>
              <Link to="/terms" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                <Text id="footer.terms_of_service" className="">Terms of Service</Text>
              </Link>
              <Link to="/do-not-share" className="text-white/50 hover:text-purple-400 text-sm transition-colors duration-200">
                Do Not Share My Data
              </Link>
              
            </div>
          </motion.div>
        </div>
      </div>
    </footer>;
};

export default Footer;
