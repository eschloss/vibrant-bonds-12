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
import { useTranslation } from "@/hooks/useTranslation";

interface PricingTier {
  name: string;
  minPrice: number;
  maxPrice: number;
  color: string;
  examples: string[];
  description: string;
}

const EarningCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [bookingsPerMonth, setBookingsPerMonth] = useState([50]);
  const [selectedTier, setSelectedTier] = useState(0);

  const pricingTiers: PricingTier[] = [
    {
      name: t("partnerships.calculator.tier.casual", "Casual Meetups"),
      minPrice: 20,
      maxPrice: 40,
      color: "from-blue-500 to-cyan-400",
      examples: ["Bowling + Beer", "Laser Tag", "Football"],
      description: "Great for driving regular foot traffic"
    },
    {
      name: t("partnerships.calculator.tier.premium", "Premium Nights"),
      minPrice: 50,
      maxPrice: 100,
      color: "from-purple-500 to-pink-500",
      examples: ["Wine Tasting", "Sailing", "Art Classes"],
      description: "Higher value experiences for engaged customers"
    },
    {
      name: t("partnerships.calculator.tier.luxury", "Luxury Events"),
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
  const partnerShare = 0.75;
  const grossPerBooking = pricePerPerson * peoplePerGroup;
  const earningsPerBooking = grossPerBooking * partnerShare;
  const monthlyRevenue = earningsPerBooking * bookingsPerMonth[0];
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
    <section id="calculator" className="py-10 relative overflow-hidden">
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
            <span className="text-pulse-pink font-semibold">{t("partnerships.calculator.badge", "PARTNER EARNINGS")}</span>
            <Sparkles className="h-6 w-6 text-pulse-pink" />
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            {t("partnerships.calculator.title", "See Your Potential Earnings with Pulse")}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base text-gray-300 max-w-2xl mx-auto"
          >
            {t("partnerships.calculator.description", "This estimates how much your venue could earn from Pulse‑driven group bookings. Adjust the tier and number of monthly groups. Assumes 10 people per group and the tier’s average ticket price.")}
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
                    {t("partnerships.calculator.metric.per_group", "Partner take‑home per group")}
                  </div>
                  <div className="text-2xl font-bold text-green-400 mt-1">${earningsPerBooking.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">${pricePerPerson} × {peoplePerGroup} × 75%</div>
                </div>
                <div className="rounded-lg bg-gray-900/40 border border-gray-700 p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-pulse-pink" />
                    {t("partnerships.calculator.metric.monthly", "Estimated monthly take‑home")}
                  </div>
                  <div className="text-3xl font-bold text-pulse-pink mt-1">${monthlyRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">{bookingsPerMonth[0]} groups × ${earningsPerBooking.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-gray-900/40 border border-gray-700 p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-400 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    {t("partnerships.calculator.metric.annual", "Estimated annual take‑home")}
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mt-1">${annualRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">${monthlyRevenue.toLocaleString()} × 12</div>
                </div>
              </div>

              {/* Controls */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-pulse-pink" />
                  {t("partnerships.calculator.choose_tier", "Choose Your Pricing Tier")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {pricingTiers.map((tier, index) => (
                    <motion.button
                      key={tier.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTier(index)}
                      className={`w-full p-3 rounded-lg border transition-all duration-300 ${
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
                    {t("partnerships.calculator.bookings.title", "Number of Bookings")}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-gray-300">{t("partnerships.calculator.bookings.per_month", "Groups per month")}</label>
                      <span className="text-pulse-blue font-bold">{bookingsPerMonth[0]}</span>
                    </div>
                    <Slider value={bookingsPerMonth} onValueChange={setBookingsPerMonth} min={1} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>{t("partnerships.calculator.bookings.min_label", "1 group")}</span>
                      <span>{t("partnerships.calculator.bookings.max_label", "100 groups")}</span>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-gray-700/30 rounded-lg">
                    <div className="text-sm text-gray-300">
                      <div className="flex justify-between mb-1">
                        <span>{t("partnerships.calculator.people_per_group", "People per group:")}</span>
                        <span className="text-pulse-blue">{peoplePerGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("partnerships.calculator.total_people_per_month", "Total people per month:")}</span>
                        <span className="text-pulse-blue">{bookingsPerMonth[0] * peoplePerGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-400">{t("partnerships.calculator.disclaimer", "Estimates your venue’s take‑home from Pulse group bookings. Assumptions: 10 people per group • Average of selected tier • 75% partner share (Pulse platform fee: 25%).")}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA removed per request */}
      </div>
    </section>
  );
};

export default EarningCalculator; 