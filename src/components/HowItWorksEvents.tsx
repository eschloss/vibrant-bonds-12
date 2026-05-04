
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, MessageSquare, MapPin, ArrowRight, UtensilsCrossed } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";
import { useRefParam } from "@/hooks/useRefParam";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";

type HowItWorksEventsProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

const HowItWorksEvents = ({ ctaHref, ctaLabel }: HowItWorksEventsProps) => {
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();
  const ref = useRef(null);
  const scrollContainer = useScrollContainer();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const steps = [{
    icon: Users,
    title: t("hiw_events.steps.get_matched.title", "Get matched"),
    description: t("hiw_events.steps.get_matched.description", "A quick vibe test places you with likeminded people who booked the same event. Most groups are about six people, but it can land anywhere from roughly four to ten depending on signups and the night."),
    color: "bg-gradient-to-r from-pink-500 to-purple-600"
  }, {
    icon: MessageSquare,
    title: t("hiw_events.steps.break_ice.title", "Break the ice"),
    description: t("hiw_events.steps.break_ice.description", "Chat with your group before the day—your chat opens ahead of time to break the ice and plan around the experience with Pip."),
    color: "bg-gradient-to-r from-blue-500 to-cyan-400"
  }, {
    icon: MapPin,
    title: t("hiw_events.steps.meet_event.title", "Show up with your crew"),
    description: t("hiw_events.steps.meet_event.description", "Walk into the event with familiar faces instead of as a stranger."),
    color: "bg-gradient-to-r from-stone-500 to-rose-500"
  }, {
    icon: UtensilsCrossed,
    title: t("hiw_events.steps.keep_going.title", "Optional pre/post hangout"),
    description: t("hiw_events.steps.keep_going.description", "If the vibe’s there, coordinate a simple pre- or post-event hang so the friendships keep going—totally optional; many groups just enjoy the ticketed experience together."),
    color: "bg-gradient-to-r from-green-400 to-emerald-500"
  }];

  return <section ref={ref} id="events-how-it-works" className="relative py-12 bg-gray-900 dark:bg-gray-950">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl animate-ambient-drift opacity-30"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl animate-sophisticated-float"></div>
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 rounded-full bg-pink-600 blur-3xl animate-ambient-drift opacity-30" style={{ animationDelay: '10s' }}></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center text-sm font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 uppercase mb-3 animate-elegant-scale"
          >
            <Text id="hiw_events.subtitle" className="">How It Works</Text>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight text-white mb-4 max-w-4xl mx-auto backdrop-blur-sm py-2 rounded-lg bg-gray-900/40 px-0 md:text-5xl whitespace-pre-line"
          >
            <Text id="hiw_events.headline">
              {"Get matched into a small group before the event.\nShow up with new friends."}
            </Text>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center flex flex-col items-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${step.color} group-hover:shadow-lg transition-shadow duration-300`}
              >
                <step.icon size={24} className="text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                className="text-xl font-bold text-white mb-3 whitespace-pre-line"
              >
                {step.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                className="text-gray-300 whitespace-pre-line my-[6px]"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex justify-center mt-12"
        >
          <Link to={addRefToUrl(ctaHref || "/events/cities")}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button size="lg" variant="default" className="rounded-full shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 animate-elegant-scale">
                {ctaLabel ? (
                  <span>{ctaLabel}</span>
                ) : (
                  <Text id="hiw_events.cta" className="">Browse events</Text>
                )}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>;
};

export default HowItWorksEvents;
