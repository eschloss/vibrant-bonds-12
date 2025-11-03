import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { isIOS } from "@/lib/isIOS";

type Item = { id: string; name: string; image: string };

const ALL_ITEMS: Item[] = [
  { id: "arcade", name: "activity.arcade", image: "https://s.kikiapp.eu/img/pip/arcade.png" },
  { id: "pottery", name: "activity.pottery", image: "https://s.kikiapp.eu/img/pip/pottery.png" },
  { id: "surfing", name: "activity.surfing", image: "https://s.kikiapp.eu/img/pip/surfing.png" },
  { id: "hiking", name: "activity.hiking", image: "https://s.kikiapp.eu/img/pip/hiking.png" },
  { id: "wine", name: "activity.wine", image: "https://s.kikiapp.eu/img/pip/winetasting.png" },
  { id: "pilates", name: "activity.pilates", image: "https://s.kikiapp.eu/img/pip/pilates.png" },
  { id: "climbing", name: "activity.climbing", image: "https://s.kikiapp.eu/img/pip/rockclimbing.png" },
  { id: "tennis", name: "activity.tennis", image: "https://s.kikiapp.eu/img/pip/tennis.png" },
  { id: "gardening", name: "activity.gardening", image: "https://s.kikiapp.eu/img/pip/gardening.png" },
  { id: "escape", name: "activity.escape", image: "https://s.kikiapp.eu/img/pip/escaperoom.png" },
  { id: "cycling", name: "activity.cycling", image: "https://s.kikiapp.eu/img/pip/cycling.png" },
  { id: "yoga", name: "activity.yoga", image: "https://s.kikiapp.eu/img/pip/yogaoutdoors.png" },
  // Newly added items for a larger shuffle pool
  { id: "music", name: "activity.music", image: "https://s.kikiapp.eu/img/pip/music.png" },
  { id: "soccer", name: "activity.soccer", image: "https://s.kikiapp.eu/img/pip/soccer.png" },
  { id: "basketball", name: "activity.basketball", image: "https://s.kikiapp.eu/img/pip/basketball.png" },
  { id: "karaoke", name: "activity.karaoke", image: "https://s.kikiapp.eu/img/pip/karaoke.png" },
  { id: "food-walking-tour", name: "activity.food-walking-tour", image: "https://s.kikiapp.eu/img/pip/foodwalkingtour.png" },
  { id: "painting-class", name: "activity.painting-class", image: "https://s.kikiapp.eu/img/pip/paintingclass.png" },
  { id: "brewery", name: "activity.brewery", image: "https://s.kikiapp.eu/img/pip/brewery.png" },
  { id: "trivia", name: "activity.trivia", image: "https://s.kikiapp.eu/img/pip/trivia.png" },
  { id: "pool", name: "activity.pool", image: "https://s.kikiapp.eu/img/pip/pool.png" },
  { id: "poker", name: "activity.poker", image: "https://s.kikiapp.eu/img/pip/poker.png" },
  { id: "cocktail-bar", name: "activity.cocktail-bar", image: "https://s.kikiapp.eu/img/pip/cocktailbar.png" },
  { id: "day-tour", name: "activity.day-tour", image: "https://s.kikiapp.eu/img/pip/tour.png" },
  { id: "gay-bar", name: "activity.gay-bar", image: "https://s.kikiapp.eu/img/pip/gaybar.png" },
  { id: "photography", name: "activity.photography", image: "https://s.kikiapp.eu/img/pip/photography.png" },
  { id: "picnic", name: "activity.picnic", image: "https://s.kikiapp.eu/img/pip/picnic.png" },
  { id: "coffee", name: "activity.coffee", image: "https://s.kikiapp.eu/img/pip/cafe.png" },
  { id: "dancing", name: "activity.dancing", image: "https://s.kikiapp.eu/img/pip/dancing.png" },
  { id: "camping", name: "activity.camping", image: "https://s.kikiapp.eu/img/pip/camping.png" },
  { id: "beach-activities", name: "activity.beach-activities", image: "https://s.kikiapp.eu/img/pip/beachvolleyball.png" },
  { id: "boat", name: "activity.boat", image: "https://s.kikiapp.eu/img/pip/boat.png" },
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
  headlineClassName?: string;
};

export default function ActivitiesTeaser({
  title = "teaser.title",
  subtitle = "teaser.subtitle",
  ctaHref = "/activities",
  ctaLabel = "teaser.cta",
  itemsCount = 8,
  items: providedItems,
  onCtaClick,
  headlineClassName,
}: ActivitiesTeaserProps) {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const [columnCount, setColumnCount] = useState(8);

  // Keep a single row by matching the number of items to current breakpoint columns
  useEffect(() => {
    const computeCols = () => {
      const w = window.innerWidth;
      if (w < 640) return 4; // base
      if (w < 1024) return 6; // sm and md
      return 8; // lg+
    };
    const onResize = () => setColumnCount(computeCols());
    setColumnCount(computeCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const sourceItems = useMemo(() => (providedItems && providedItems.length ? providedItems : ALL_ITEMS), [providedItems]);
  const itemsToShow = useMemo(() => {
    const maxItems = Math.max(1, Math.min(itemsCount, sourceItems.length, columnCount));
    return selectWindow(sourceItems, startIndex, maxItems);
  }, [sourceItems, startIndex, itemsCount, columnCount]);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className={headlineClassName || "text-3xl md:text-4xl font-bold mb-3"}>{t(title, "Discover Your Next Adventure")}</h2>
          <p className="text-gray-300 whitespace-pre-line">{t(subtitle, "Tiny preview of what your crew could do together. Shuffle for ideas, then explore the full list.")}</p>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-white hover:bg-gray-800"
            onClick={() => setStartIndex((i) => {
              const total = sourceItems.length;
              if (total <= 1) return 0;
              const shift = Math.floor(Math.random() * (total - 1)) + 1;
              return (i + shift) % total;
            })}
          >
            <Shuffle className="w-4 h-4 mr-2" /> {t("teaser.shuffle", "Shuffle")}
          </Button>
        </div>

        <div
          className="grid gap-2 md:gap-3 max-w-[73.6rem] mx-auto"
          style={{ gridTemplateColumns: `repeat(${itemsToShow.length}, minmax(0, 1fr))` }}
        >
          {itemsToShow.map((it, i) => (
            <motion.div
              key={it.id + i}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900/30"
              style={{ paddingTop: "100%" }}
            >
              <img
                src={it.image}
                alt={`Meet New ${t(it.name, it.name)} Friends`}
                className="absolute inset-0 block w-full h-full object-contain"
                loading={isIOS() ? "eager" : "lazy"}
                {...(isIOS() ? {} : { decoding: "async" })}
                fetchPriority={isIOS() ? "high" : "auto"}
                sizes="(max-width: 768px) 50vw, 12vw"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
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
              <Button size="lg" className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                {t(ctaLabel, "Find Your Next Adventure")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          ) : (
            <Link to={ctaHref} onClick={(e) => { try { onCtaClick && onCtaClick(ctaHref, e); } catch (_) {} }}>
              <Button size="lg" className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                {t(ctaLabel, "Find Your Next Adventure")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}


