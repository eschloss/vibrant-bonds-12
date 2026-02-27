import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getUpcomingEvents } from "@/data/events";

type Review = {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
};

export default function EventsTestimonials() {
  const events = React.useMemo(() => getUpcomingEvents(8), []);

  const reviews: Review[] = React.useMemo(
    () => [
      {
        id: "r1",
        quote:
          "I would’ve skipped this if I had to go alone. The chat made it so easy — we grabbed a drink first and it felt like going out with friends.",
        name: "Maya S.",
        location: "London",
        avatar: "https://i.pravatar.cc/100?img=47",
        rating: 5,
      },
      {
        id: "r2",
        quote:
          "The best part was not walking in cold. A few messages before the event and suddenly you’re greeting people like you already know them.",
        name: "Chris A.",
        location: "New York",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 5,
      },
      {
        id: "r3",
        quote:
          "This was my first solo event in years. Pulse made it feel effortless — fun people, zero awkwardness, and we’re already planning the next one.",
        name: "Nina K.",
        location: "Los Angeles",
        avatar: "https://i.pravatar.cc/100?img=32",
        rating: 5,
      },
      {
        id: "r4",
        quote:
          "It’s exactly what I needed after moving here. A real event plus a built‑in crew. We ended up getting dinner after and it felt so natural.",
        name: "Jordan P.",
        location: "Boston",
        avatar: "https://i.pravatar.cc/100?img=15",
        rating: 5,
      },
      {
        id: "r5",
        quote:
          "The prompts in the chat are clutch. By the time we met up, everyone already had a vibe and conversation starters.",
        name: "Aisha T.",
        location: "Lagos",
        avatar: "https://i.pravatar.cc/100?img=23",
        rating: 5,
      },
    ],
    []
  );

  // Pair reviews with event photos (cycle if needed)
  const slides = React.useMemo(() => {
    return reviews.map((r, idx) => {
      const e = events[idx % Math.max(1, events.length)];
      return { review: r, event: e };
    });
  }, [events, reviews]);

  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-16 md:py-20 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/3 w-[520px] h-[520px] rounded-full bg-pulse-pink/15 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 w-[560px] h-[560px] rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
              People Say
            </span>
          </h2>
          <p className="text-lg text-white/75">
            Real nights out. Real crews. Real friendships — built around events you actually want to go to.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="relative">
            <CarouselContent className="-ml-4">
              {slides.map(({ review, event }, i) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, delay: i * 0.04 }}
                    className="h-full"
                  >
                    <div className="h-full rounded-3xl overflow-hidden border border-white/10 bg-gray-900/30 backdrop-blur-xl">
                      {/* Event image header */}
                      <div className="relative h-44 md:h-52">
                        <img
                          src={event?.primaryImage}
                          alt={event ? `${event.title} photo` : "Event photo"}
                          className="w-full h-full object-cover"
                          loading={i < 2 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        {event ? (
                          <div className="absolute left-4 bottom-4 right-4">
                            <div className="text-white font-semibold leading-snug line-clamp-2">
                              {event.title}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/80">
                              <div className="inline-flex items-center gap-2">
                                <MapPin size={14} className="text-white/70" />
                                {event.citySlug
                                  .split("-")
                                  .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
                                  .join(" ")}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      {/* Review */}
                      <div className="p-6 md:p-7">
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: review.rating }).map((_, s) => (
                            <Star key={s} size={16} className="fill-pink-400 text-pink-400" />
                          ))}
                        </div>

                        <div className="relative">
                          <Quote size={18} className="absolute -left-1 -top-1 text-white/25" />
                          <blockquote className="text-[15px] md:text-base text-white/90 leading-relaxed pl-6">
                            {review.quote}
                          </blockquote>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-white/15"
                            style={{ backgroundImage: `url(${review.avatar})` }}
                          />
                          <div>
                            <div className="font-bold text-white">{review.name}</div>
                            <div className="text-sm text-white/70">{review.location}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex" />
          </Carousel>

          {/* Dots */}
          {slides.length > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={[
                    "h-2 w-2 rounded-full transition-all",
                    i === index ? "bg-white w-5" : "bg-white/35 hover:bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

