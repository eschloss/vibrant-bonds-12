
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600 blur-3xl"></div>
          <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-pink-600 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="bg-gray-800/30 p-8 md:p-10 rounded-2xl border border-gray-700/50">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pulse-pink/30 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-pulse-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <a href="mailto:contact@pulsenow.app" className="text-gray-300 hover:text-pulse-pink transition-colors">
                      contact@pulsenow.app
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-pulse-pink/30 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-pulse-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <address className="text-gray-300 not-italic">
                      The Roux Institute<br/>
                      100 Fore St<br />
                      Portland, ME 04101
                    </address>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com/pulse_app_" target="_blank" rel="noopener noreferrer" className="bg-gray-700/50 hover:bg-pink-600 p-3 rounded-full transition-colors" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61570738108928" target="_blank" rel="noopener noreferrer" className="bg-gray-700/50 hover:bg-blue-700 p-3 rounded-full transition-colors" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/pulse-plans/" target="_blank" rel="noopener noreferrer" className="bg-gray-700/50 hover:bg-blue-800 p-3 rounded-full transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
              <div className="bg-gray-800/30 p-8 md:p-10 rounded-2xl border border-gray-700/50">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Find answers to the most common questions about Pulse.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: 0.1
              }} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  How does the friend matching work?
                </h3>
                <p className="text-gray-300">
                  Our matching algorithm considers your interests, values, and personality to connect you with like-minded individuals in your city. We focus on creating small groups of 8-12 people who are likely to form genuine connections.
                </p>
              </motion.div>
              <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: 0.2
              }} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  Is Pulse available in my city?
                </h3>
                <p className="text-gray-300">
                  Pulse is currently available in select major cities across the US, with new locations being added regularly. Check our Cities page to see if we're in your area yet, or to request that we expand to your city.
                </p>
              </motion.div>
              <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: 0.3
              }} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  How much does Pulse cost?
                </h3>
                <p className="text-gray-300">
                  Pulse offers a free tier that allows you to join a limited number of community events. Our premium membership provides unlimited access to events, priority matching, and exclusive experiences for $19.99/month.
                </p>
              </motion.div>
              <motion.div initial={{
                opacity: 0,
                y: 10
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.4,
                delay: 0.4
              }} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  How can I become a community host?
                </h3>
                <p className="text-gray-300">
                  We're always looking for enthusiastic individuals to host Pulse gatherings. Contact us through this page expressing your interest, and our community team will get back to you with details about our host application process.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
