import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, MapPin, Repeat, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface MeetPipPromoProps {
  imageSrc?: string;
  badgeText?: string;
  headline?: string;
  subtext?: string;
  // Deprecated: prefer `items`. If provided, rendered as simple lines.
  points?: string[];
  // Prefer this: richer bullet items with title + body
  items?: { title: string; text: string; icon?: React.ReactNode }[];
  ctaLabel?: string;
  ctaHref?: string;
}

const MeetPipPromo: React.FC<MeetPipPromoProps> = ({
  imageSrc,
  badgeText,
  headline,
  subtext,
  points,
  items,
  ctaLabel,
  ctaHref,
}) => {
  const { t } = useTranslation();

  const resolvedImage =
    imageSrc ||
    "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png";

  const defaultItems = [
    {
      title: t("meet_pippromo.item1.title", "Ice Breakers"),
      text: t(
        "meet_pippromo.item1.text",
        "Games and prompts that get everyone talking."
      ),
      icon: <MessageSquare size={18} className="text-white" />,
    },
    {
      title: t("meet_pippromo.item2.title", "Smart Scheduling"),
      text: t(
        "meet_pippromo.item2.text",
        "Picks a time that works for the whole crew."
      ),
      icon: <Calendar size={18} className="text-white" />,
    },
    {
      title: t("meet_pippromo.item3.title", "Local Picks"),
      text: t(
        "meet_pippromo.item3.text",
        "Recommends great nearby spots matched to your vibe."
      ),
      icon: <MapPin size={18} className="text-white" />,
    },
    {
      title: t("meet_pippromo.item4.title", "Keep It Going"),
      text: t(
        "meet_pippromo.item4.text",
        "Gentle nudges that guide your group to keep meeting, so casual hangs grow into lasting friendships"
      ),
      icon: <Repeat size={18} className="text-white" />,
    },
  ];

  const bulletPoints = points || undefined;
  const richItems = items || defaultItems;
  const simpleIcons = [
    <MessageSquare size={18} className="text-white" key="m" />, 
    <Calendar size={18} className="text-white" key="c" />, 
    <MapPin size={18} className="text-white" key="p" />, 
    <Repeat size={18} className="text-white" key="r" />
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-16 w-[26rem] h-[26rem] rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/70 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* removed pill badge to avoid overlap above heading */}
              <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight md:leading-[1.15]">
                {headline || t("meet_pippromo.headline", "Meet Pip, Your Social Wingman")}
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl">
                {subtext ||
                  t(
                    "meet_pippromo.subtext",
                    "From awkward silence to IRL plans, Pip energizes your chat, picks a time, and lines up the perfect spot so hanging out actually happens."
                  )}
              </p>

              {bulletPoints ? (
                <ul className="space-y-3">
                  {bulletPoints.map((text, idx) => (
                    <li className="flex items-start gap-3" key={idx}>
                      <div className="rounded-full bg-gradient-to-r from-accent to-pulse-pink p-[2px] mt-1">
                        <div className="rounded-full bg-gray-900 p-1">
                          {simpleIcons[idx % 4]}
                        </div>
                      </div>
                      <span className="text-gray-200">{text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {richItems.map((it, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-xl p-3 hover:border-accent/40 transition"
                    >
                      <div className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-r flex items-center justify-center ${[
                        'from-pink-500 to-purple-600',
                        'from-blue-500 to-cyan-400',
                        'from-stone-500 to-rose-500',
                        'from-green-400 to-emerald-500',
                      ][idx % 4]}`}>{it.icon || simpleIcons[idx % 4]}</div>
                      <p className="text-gray-200">
                        <span className="font-semibold text-white">{it.title}</span>
                        <span>: {it.text}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7">
                <a
                  href={ctaHref || "/meet-pip"}
                  aria-label={ctaLabel || t("meet_pippromo.cta", "Meet Pip")}
                  className="inline-block"
                >
                  <Button
                    className="relative bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-95 px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl rounded-full shadow-xl shadow-purple-500/30 transition transform hover:scale-[1.02]"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="inline-flex items-center gap-2">
                      <Sparkles size={20} className="text-white" />
                      {ctaLabel || t("meet_pippromo.cta", "Meet Pip")}
                    </span>
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative max-w-xl mx-auto">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue blur-2xl opacity-30" />
                <img
                  src={resolvedImage}
                  alt={t("meet_pippromo.image_alt", "Pip celebrating with friends")}
                  className="relative z-10 w-full rounded-3xl object-cover border border-gray-700 bg-gray-900/30 shadow-2xl shadow-purple-500/20"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetPipPromo;

