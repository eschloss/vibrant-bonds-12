import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";

type Item = { id: string; name: string; image: string };

const ALL_ITEMS: Item[] = [
  { id: "arcade", name: "Arcade", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/arcade.png" },
  { id: "pottery", name: "Pottery", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/pottery.png" },
  { id: "surfing", name: "Surfing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Surfing.png" },
  { id: "hiking", name: "Hiking", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/hiking.png" },
  { id: "wine", name: "Wine Tasting", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/wine_tasting.png" },
  { id: "pilates", name: "Pilates", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/Pilates.png" },
  { id: "climbing", name: "Rock Climbing", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/rock_climbing.png" },
  { id: "tennis", name: "Tennis", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/tennis.png" },
  { id: "gardening", name: "Gardening", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/gardening.png" },
  { id: "escape", name: "Escape Rooms", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/escape_rooms.png" },
  { id: "cycling", name: "Cycling", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/cycling.png" },
  { id: "yoga", name: "Yoga", image: "https://xzbbpbuldlzkkvlplvij.supabase.co/storage/v1/object/public/activities/yoga.png" },
];

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function ActivitiesTeaser() {
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => pickRandom(ALL_ITEMS, 8), [seed]);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pulse-pink/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">Adventure</span></h2>
          <p className="text-gray-300">Tiny preview of what your crew could do together. Shuffle for ideas, then explore the full list.</p>
        </div>

        <div className="flex items-center justify-center mb-4">
          <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800" onClick={() => setSeed((s) => s + 1)}>
            <Shuffle className="w-4 h-4 mr-2" /> Shuffle
          </Button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <motion.div
              key={it.id + i}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900/30"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img src={it.image} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
              <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-center w-full">{it.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/activities">
            <Button size="lg" className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
              Discover activities near you <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}


