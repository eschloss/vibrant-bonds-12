import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Zap,
  Star,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface PricingTier {
  name: string;
  minPrice: number;
  maxPrice: number;
  color: string;
  examples: string[];
  description: string;
}

const EarningCalculator: React.FC = () => {
  const [bookingsPerMonth, setBookingsPerMonth] = useState([4]);
  const [selectedTier, setSelectedTier] = useState(0);

  const pricingTiers: PricingTier[] = [
    {
      name: "Casual Meetups",
      minPrice: 20,
      maxPrice: 40,
      color: "from-blue-500 to-cyan-400",
      examples: ["Bowling + Beer", "Laser Tag", "Football"],
      description: "Great for driving regular foot traffic"
    },
    {
      name: "Premium Nights",
      minPrice: 50,
      maxPrice: 100,
      color: "from-purple-500 to-pink-500",
      examples: ["Wine Tasting", "Sailing", "Art Classes"],
      description: "Higher value experiences for engaged customers"
    },
    {
      name: "Luxury Events",
      minPrice: 200,
      maxPrice: 500,
      color: "from-yellow-500 to-orange-500",
      examples: ["Hot Air Balloon", "Private Chef", "Helicopter Tours"],
      description: "Exclusive experiences for your VIP customers"
    }
  ];

  const currentTier = pricingTiers[selectedTier];
  const pricePerPerson = (currentTier.minPrice + currentTier.maxPrice) / 2;
  const peoplePerGroup = 10;
  const revenuePerBooking = pricePerPerson * peoplePerGroup;
  const monthlyRevenue = revenuePerBooking * bookingsPerMonth[0];
  const annualRevenue = monthlyRevenue * 12;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const numberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <section className="py-10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-pulse-pink" />
            <span className="text-pulse-pink font-semibold">EARNING CALCULATOR</span>
            <Sparkles className="h-6 w-6 text-pulse-pink" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            See Your Earning Potential
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base text-gray-300 max-w-2xl mx-auto"
          >
            Pick a tier and how many groups book each month. We’ll estimate revenue using 10 people per group and the tier’s average price.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardContent className="p-6 md:p-8">
              {/* Metrics on top */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-gray-900/40 border border-gray-700 p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    Revenue / group
                  </div>
                  <div className="text-2xl font-bold text-green-400 mt-1">${revenuePerBooking.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">${pricePerPerson} × {peoplePerGroup}</div>
                </div>
                <div className="rounded-lg bg-gray-900/40 border border-gray-700 p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-pulse-pink" />
                    Monthly revenue
                  </div>
                  <div className="text-3xl font-bold text-pulse-pink mt-1">${monthlyRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">{bookingsPerMonth[0]} groups × ${revenuePerBooking.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-gray-900/40 border border-gray-700 p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    Annual revenue
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mt-1">${annualRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">${monthlyRevenue.toLocaleString()} × 12</div>
                </div>
              </div>

              {/* Controls */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-pulse-pink" />
                  Choose Your Pricing Tier
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {pricingTiers.map((tier, index) => (
                    <motion.button
                      key={tier.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTier(index)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        selectedTier === index
                          ? 'border-pulse-pink bg-gradient-to-r from-pulse-pink/20 to-pulse-blue/20'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-sm font-bold mb-0.5 ${selectedTier === index ? 'text-white' : 'text-gray-300'}`}>{tier.name}</div>
                        <div className={`text-xs ${selectedTier === index ? 'text-pulse-pink' : 'text-gray-400'}`}>${tier.minPrice}-${tier.maxPrice}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Removed avg/description bar for simplicity */}

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-pulse-blue" />
                    Number of Bookings
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-gray-300">Groups per month</label>
                      <span className="text-pulse-blue font-bold">{bookingsPerMonth[0]}</span>
                    </div>
                    <Slider value={bookingsPerMonth} onValueChange={setBookingsPerMonth} min={1} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>1 group</span>
                      <span>100 groups</span>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-sm text-gray-300">
                      <div className="flex justify-between mb-1">
                        <span>People per group:</span>
                        <span className="text-pulse-blue">{peoplePerGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total people per month:</span>
                        <span className="text-pulse-blue">{bookingsPerMonth[0] * peoplePerGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-400">Assumptions: 10 people per group • Price uses average of selected tier.</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
            <p className="text-gray-300 mb-6">
              Join our partnership program and start building meaningful connections while driving revenue. 
              Our team will help you optimize your events for maximum earnings.
            </p>
            <a 
              href="#apply" 
              className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-lg"
            >
              <span>Apply for Partnership</span>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningCalculator; 