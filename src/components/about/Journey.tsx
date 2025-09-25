import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { MapPin, HeartHandshake, BookOpen } from "lucide-react";

const OPERA_IMAGE = "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Stage-Photographer-Andreas-Grieger-165.jpg";

const Journey = () => {
  const { t } = useTranslation();

  const locations = t(
    "journey.simple.locations",
    "US, UK, Germany, Spain, Mexico, Norway, Ireland, UAE, China, India"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-5 gap-8 items-center"
        >
          {/* Image */}
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-gray-700">
              <img
                src={OPERA_IMAGE}
                alt={t("journey.opera.alt", "Eric performing opera on stage")}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-3 space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("journey.simple.title", "The Journey of Pulse")}
            </h2>
            <p className="text-gray-300 text-lg whitespace-pre-line">
              {t(
                "journey.simple.body",
                "Eric spent 15 years building apps for mental-health research at Harvard while touring the world as a professional opera singer. Working on a study of suicidal teens, he saw how loneliness drives mental health struggles, and realized he wanted to tackle the problem directly.\n\nAfter moving 10 times across five continents, Eric got good at making friends from scratch, but also saw how hard it is for most people. Meeting someone new is easy. Building real friendship is harder. The rhythm matters: shared interests, repeated time together, and a gentle nudge to say, \"Let's do this again next week.\"\n\nThose lessons became Pulse, a platform designed to help people turn strangers into real friends, in real life."
              )}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-2 bg-gray-800/60 border border-gray-700 rounded-full px-3 py-1 text-white/80">
                <HeartHandshake size={14} className="text-pulse-pink" />
                {t(
                  "journey.simple.formula",
                  "Our Friendship Formula: shared interests + repeated IRL + a gentle nudge"
                )}
              </span>
            </div>
            <div className="pt-2">
              <div className="text-white font-medium mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                {t("journey.simple.lived", "Places we've lived")}
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc, i) => (
                  <span
                    key={i}
                    className="text-xs rounded-full border border-gray-700 bg-gray-800/50 px-2.5 py-1 text-gray-300"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <BookOpen size={14} />
              {t(
                "journey.simple.note",
                "Pulse turns strangers into real friends by making the healthy thing the easy thing."
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;


