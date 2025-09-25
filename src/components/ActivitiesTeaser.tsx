import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

type Item = { id: string; name: string; image: string };

const ALL_ITEMS: Item[] = [
  { id: "arcade", name: "activity.arcade", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/arcade.png" },
  { id: "pottery", name: "activity.pottery", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pottery.png" },
  { id: "surfing", name: "activity.surfing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Surfing.png" },
  { id: "hiking", name: "activity.hiking", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/hiking.png" },
  { id: "wine", name: "activity.wine", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/wine_tasting.png" },
  { id: "pilates", name: "activity.pilates", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Pilates.png" },
  { id: "climbing", name: "activity.climbing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/rock_climbing.png" },
  { id: "tennis", name: "activity.tennis", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/tennis.png" },
  { id: "gardening", name: "activity.gardening", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/gardening.png" },
  { id: "escape", name: "activity.escape", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Escape%20Room.png" },
  { id: "cycling", name: "activity.cycling", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/cycling.png" },
  { id: "yoga", name: "activity.yoga", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/yoga%20outdoors.png" },
  // Newly added items for a larger shuffle pool
  { id: "music", name: "activity.music", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Music.png" },
  { id: "soccer", name: "activity.soccer", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Soccer.png" },
  { id: "basketball", name: "activity.basketball", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Basketball.png" },
  { id: "karaoke", name: "activity.karaoke", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Karaoke.png" },
  { id: "food-walking-tour", name: "activity.food-walking-tour", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/food%20walking%20tour.png" },
  { id: "painting-class", name: "activity.painting-class", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Painting%20Class.png" },
  { id: "brewery", name: "activity.brewery", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Brewery.png" },
  { id: "trivia", name: "activity.trivia", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Trivia.png" },
  { id: "pool", name: "activity.pool", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pool.png" },
  { id: "poker", name: "activity.poker", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/poker%20(1).png" },
  { id: "cocktail-bar", name: "activity.cocktail-bar", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Cocktail%20Bar.png" },
  { id: "day-tour", name: "activity.day-tour", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Day%20Tour.png" },
  { id: "gay-bar", name: "activity.gay-bar", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Gay%20Bar.png" },
  { id: "photography", name: "activity.photography", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Photography.png" },
  { id: "picnic", name: "activity.picnic", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/picnic.png" },
  { id: "coffee", name: "activity.coffee", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/cafe.png" },
  { id: "dancing", name: "activity.dancing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Dancing.png" },
  { id: "camping", name: "activity.camping", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Camping.png" },
  { id: "beach-activities", name: "activity.beach-activities", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Beach%20Volleyball.png" },
  { id: "boat", name: "activity.boat", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Boat.png" },
];

// Deterministic rotation helper to select a window of items starting at a given index
function selectWindow<T>(arr: T[], startIndex: number, count: number): T[] {
  const result: T[] = [];
  const total = arr.length;
  const windowSize = Math.max(1, Math.min(count, total));
  for (let i = 0; i < windowSize; i++) {
    result.push(arr[(startIndex + i) % total]);
  }
  return result;
}

type ActivitiesTeaserProps = {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  itemsCount?: number; // default 8
  items?: { id: string; name: string; image: string }[];
  onCtaClick?: (href: string, e: any) => void;
};

export default function ActivitiesTeaser({
  title = "teaser.title",
  subtitle = "teaser.subtitle",
  ctaHref = "/activities",
  ctaLabel = "teaser.cta",
  itemsCount = 8,
  items: providedItems,
  onCtaClick,
}: ActivitiesTeaserProps) {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const sourceItems = useMemo(() => (providedItems && providedItems.length ? providedItems : ALL_ITEMS), [providedItems]);
  const itemsToShow = useMemo(
    () => selectWindow(sourceItems, startIndex, Math.max(1, Math.min(itemsCount, sourceItems.length))),
    [sourceItems, startIndex, itemsCount]
  );

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t(title, "Discover Your Next Adventure")}</h2>
          <p className="text-gray-300">{t(subtitle, "Tiny preview of what your crew could do together. Shuffle for ideas, then explore the full list.")}</p>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-white hover:bg-gray-800"
            onClick={() => setStartIndex((i) => (i + itemsCount) % sourceItems.length)}
          >
            <Shuffle className="w-4 h-4 mr-2" /> {t("teaser.shuffle", "Shuffle")}
          </Button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 max-w-5xl mx-auto">
          {itemsToShow.map((it, i) => (
            <motion.div
              key={it.id + i}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900/30"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img src={it.image} alt={t(it.name, it.name)} className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
              <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-center w-full">{t(it.name, it.name)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          {/^https?:\/\//.test(ctaHref) ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={(e) => { try { onCtaClick && onCtaClick(ctaHref, e); } catch (_) {} }}>
              <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                {t(ctaLabel, "Find Your Next Adventure")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          ) : (
            <Link to={ctaHref} onClick={(e) => { try { onCtaClick && onCtaClick(ctaHref, e); } catch (_) {} }}>
              <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                {t(ctaLabel, "Find Your Next Adventure")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}


