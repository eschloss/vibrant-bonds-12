import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  CalendarDays,
  Sprout,
  ArrowRight,
  Zap,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CityMatchmakingTemplateProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
}

const steps = [
  {
    icon: Users,
    title: "Get Matched",
    description: "We'll match you with a small group of like-minded people.",
    color: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Break the Ice",
    description:
      "Chat with fellow group members, guided by our conversation starters and games.",
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
  },
  {
    icon: CalendarDays,
    title: "Meet Up in Real Life",
    description:
      "We’ll handle the planning and logistics — simply show up and enjoy yourself.",
    color: "bg-gradient-to-r from-indigo-400 to-blue-500",
  },
  {
    icon: Sprout,
    title: "Grow the Friendships",
    description: "After the initial meet, we'll help you grow your new connections.",
    color: "bg-gradient-to-r from-green-400 to-emerald-500",
  },
];

const CityMatchmakingTemplate = ({
  cityName,
  code,
  country,
  state,
  image,
}: CityMatchmakingTemplateProps) => {
  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />

      <main className="flex-grow">
        <section className="relative py-32 overflow-hidden">
          {image && image !== "" ? (
            <>
              <div
                className="absolute inset-0 -z-5 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(https://${image})` }}
              />
              <div className="absolute inset-0 -z-4 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0 -z-5 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(https://s.kikiapp.eu/img/colorful-white.png)` }}
              />
              <div className="absolute inset-0 -z-4 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />
            </>
          )}

          <div className="container mx-auto px-4 relative z-10 my-[31px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className={`text-4xl font-bold mb-4 md:text-5xl ${
                image ? "text-black" : "text-gray-900"
              }`}>
                Meet New Friends in{" "}
                <span className="pulse-gradient-text">{cityName}</span>
              </h1>
              <motion.p
                className={`text-xl md:text-2xl font-light mb-8 ${
                  image ? "text-black" : "text-gray-700"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Making friends as an adult can be hard. We're here to help.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to={`https://pu1.se/233?city=${code}&cityLabel=${encodeURIComponent(cityName)}`}>
                  <Button
                    size="xl"
                    variant="gradient"
                    className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
                  >
                    <Zap size={18} className="text-white" />
                    <span>
                      Start Matching in {cityName}
                      {state ? `, ${state}` : ""}
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* the rest of the component remains unchanged */}
