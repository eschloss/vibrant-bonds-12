import { motion } from "framer-motion";
import { Users, MessageSquare, CalendarDays, Sprout, ArrowRight, Zap, Timer, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useCountdown } from "@/hooks/useCountdown";
import { TimerDisplay } from "./mission/TimerDisplay";
import ShareSection from './ShareSection';


interface CityMatchmakingTemplateProps {
  cityName: string;
  code: string;
  country: string;
  state?: string;
  image?: string;
}
const steps = [{
  icon: Users,
  title: "Get Matched",
  description: "We'll match you with a small group of like-minded people.",
  color: "bg-gradient-to-r from-pink-500 to-purple-600"
}, {
  icon: MessageSquare,
  title: "Break the Ice",
  description: "Chat with fellow group members, guided by our conversation starters and games.",
  color: "bg-gradient-to-r from-blue-500 to-cyan-400"
}, {
  icon: CalendarDays,
  title: "Meet Up in Real Life",
  description: "We’ll handle the planning and logistics — simply show up and enjoy yourself.",
  color: "bg-gradient-to-r from-indigo-400 to-blue-500"
}, {
  icon: Sprout,
  title: "Grow the Friendships",
  description: "After the initial meet, we'll help you grow your new connections.",
  color: "bg-gradient-to-r from-green-400 to-emerald-500"
}];
const CityMatchmakingTemplate = ({
  cityName,
  code,
  country,
  state,
  image
}: CityMatchmakingTemplateProps) => {
  {
    image && <Helmet>
    <link rel="preload" as="image" href={`https://${image}`} />
  </Helmet>;
  }

    const timeLeft = useCountdown();

  return <div className="flex flex-col min-h-screen dark">
      <Navbar />

      <main className="flex-grow">
        <section className="relative py-32 overflow-hidden">
  {image && image !== "" ? <>
      <div className="absolute inset-0 -z-5 bg-cover bg-center blur-sm" style={{
            backgroundImage: `url(https://${image})`
          }} />
      <div className="absolute inset-0 -z-4 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />
    </> : <>
      <div className="absolute inset-0 -z-5 bg-cover bg-center blur-sm" style={{
            backgroundImage: `url(https://s.kikiapp.eu/img/colorful-white.png)`
          }} />
      <div className="absolute inset-0 -z-4 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm mix-blend-lighten" />
    </>}

  {/* 🧠 Gradient overlay to increase readability */}
  <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white via-white/70 to-transparent z-0 pointer-events-none" />

  <div className="container mx-auto px-4 relative z-10 my-[31px]">
    <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} className="text-center max-w-3xl mx-auto relative z-10">
      <h1 className="text-4xl font-bold mb-4 md:text-5xl text-black">
        {!code ? "Help Launch Pulse in" : "Meet New Friends in"}{" "}
        <span className="pulse-gradient-text">{cityName}</span>
      </h1>
      <motion.p className="whitespace-pre-line text-xl md:text-2xl font-normal mb-8 text-gray-800" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }}>
        {!code ? "Sign up now—you’ll be first in line to match\nas soon as a few more locals join." : "Making friends as an adult can be hard. We're here to help." }
      </motion.p>
      <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4,
              duration: 0.5
            }} className="flex flex-col sm:flex-row gap-4 justify-center">
       <Link to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}` : ''}`}>
          <Button size="xl" className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110">
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
            <span className="relative z-10">
              Get Matched in {cityName}
              {state ? `, ${state}` : ""}
            </span>
            <ArrowRight size={18} />
          </Button>
        </Link>
      </motion.div>
      {!code && <motion.p className="text-xl md:text-xl font-normal mt-24 text-gray-800" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }}>
        Want it sooner? Share Pulse with friends nearby!<br/>Every signup moves your city up the list.
        <ShareSection />
      </motion.p>}
    </motion.div>
  </div>
      </section>


        <section className="relative py-16 bg-gray-900 dark:bg-gray-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="flex items-center gap-6 mb-16 last:mb-0">
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon className="text-white" size={40} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xl text-gray-300">{step.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>


        {code && <section className="relative py-20 bg-gray-900/80">
          <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Meet<br/>Your <span className="pulse-gradient-text">{cityName} Crew</span>?
              </h2>


              <div className="backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-lg text-center">
                <TimerDisplay {...timeLeft} />
                <p className="text-sm text-white/70 mt-4 text-center">until the next friend group match closes</p>
              </div>
              
              
              <div className="justify-center gap-4 mt-8">
                <Link to={`https://pu1.se/233${code ? `?city=${code}&cityLabel=${encodeURIComponent(cityName)}` : ''}`}>
                <Button size="xl" variant="gradient" className="rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 w-full sm:w-auto">
                  Get Matched in {cityName} Now
                  <ArrowRight size={18} />
                </Button>
                </Link>

              </div>
          </div>
        </section>}
      </main>

      <Footer />
    </div>;
};
export default CityMatchmakingTemplate;