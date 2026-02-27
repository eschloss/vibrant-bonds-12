import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  DollarSign,
  MessageSquare,
  Users,
  UtensilsCrossed,
  Globe,
  BadgeInfo,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import NotFound from "@/pages/NotFound";
import { useRefParam } from "@/hooks/useRefParam";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import EventSignupHowItWorks from "@/components/EventSignupHowItWorks";
import EventFaqSection from "@/components/EventFaqSection";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  type GetKikiEventResponse,
  buildGetKikiUrl,
  formatEventPrice,
  getEventPriceOpts,
} from "@/lib/eventApi";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(hours: number): string {
  if (hours === 1) return "1 hour";
  return `${hours} hours`;
}

const EventDetail = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { addRefToUrl } = useRefParam();

  const [eventData, setEventData] = useState<GetKikiEventResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [heroCarouselApi, setHeroCarouselApi] = useState<CarouselApi | undefined>(undefined);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const groupChatOverlayImageUrl =
    "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Copy%20of%20may%2021,%201107%20am%20(Your%20Story).png";

  useEffect(() => {
    if (!heroCarouselApi) return;
    const onSelect = () => setHeroSlideIndex(heroCarouselApi.selectedScrollSnap());
    onSelect();
    heroCarouselApi.on("select", onSelect);
    heroCarouselApi.on("reInit", onSelect);
    return () => {
      heroCarouselApi.off("select", onSelect);
      heroCarouselApi.off("reInit", onSelect);
    };
  }, [heroCarouselApi]);

  useEffect(() => {
    if (!eventSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const url = buildGetKikiUrl(eventSlug);

    fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    })
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json) setEventData(json as GetKikiEventResponse);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [eventSlug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen dark">
        <PageLoadingOverlay show={true} />
        <Navbar />
        <main className="flex-grow" />
        <Footer />
      </div>
    );
  }

  if (notFound || !eventData) {
    return <NotFound />;
  }

  const data = eventData;
  const priceOpts = getEventPriceOpts(data);

  const formattedCityName = data.city_label || "";
  const organiser = data.place; // Default: use venue as organiser
  const providerName = `Provider ${data.provider}`;

  const formattedTotalPrice = formatEventPrice(data.total_price, priceOpts);
  const formattedTicketPrice = formatEventPrice(data.ticket_price, priceOpts);
  const formattedPulseFee = formatEventPrice(data.platform_fee, priceOpts);
  const formattedProviderFee =
    data.provider_fee > 0 ? formatEventPrice(data.provider_fee, priceOpts) : null;

  const introLine = `⭐ ${data.title} is a public event in ${formattedCityName}. Pulse isn't the organiser — we help you go with a small group of other solo attendees, so you can meet new friends before you arrive.`;

  const heroImages = [
    data.primary_image,
    data.image_2,
    data.image_3,
    data.image_4,
    data.image_5,
  ].filter(Boolean) as string[];

  const displayHeroImages =
    heroImages.length >= 5
      ? heroImages.slice(0, 5)
      : heroImages.length > 0
        ? [
            ...heroImages,
            ...Array.from(
              { length: Math.max(0, 5 - heroImages.length) },
              () => data.primary_image
            ),
          ]
        : [data.primary_image];

  const checkoutHref = `/events/${data.slug}/checkout`;

  const seoProps = {
    title: {
      en: `${data.title} | ${formattedCityName} Events | Pulse`,
      es: `${data.title} | Eventos en ${formattedCityName} | Pulse`,
    },
    description: {
      en: data.short_description,
      es: data.short_description,
    },
    keywords: [data.title, formattedCityName, "event", "activities", providerName].filter(
      Boolean
    ),
    type: "website" as const,
    image: data.primary_image,
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.title,
    description: `${introLine}\n\n${data.long_description}`,
    startDate: data.datetime_local,
    location: {
      "@type": "Place",
      name: data.place,
    },
    image: heroImages.length > 0 ? heroImages : [data.primary_image],
    offers: {
      "@type": "Offer",
      price: String(data.total_price),
      priceCurrency: data.currency || "USD",
    },
  };

  const durationText = formatDuration(data.duration_hours);

  const priceBreakdownParts = [
    formattedTicketPrice ? `Ticket ${formattedTicketPrice}` : "Ticket",
    formattedPulseFee ? `Pulse fee ${formattedPulseFee}` : "Pulse fee",
  ];
  if (formattedProviderFee && data.provider_fee > 0) {
    priceBreakdownParts.push(`Provider fee ${formattedProviderFee}`);
  }
  const priceBreakdownLine = priceBreakdownParts.join(" + ");

  return (
    <div className="flex flex-col min-h-screen dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Seo {...seoProps} />
      <Navbar />

      <main className="flex-grow">
        {/* Hero (match /cities visual language) */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-gray-700 bg-black/20">
                  <Carousel setApi={setHeroCarouselApi} opts={{ loop: true }} className="h-full">
                    <CarouselContent className="ml-0 h-full">
                      {displayHeroImages.map((img, i) => (
                        <CarouselItem key={img + i} className="pl-0 h-full">
                          <img
                            src={img}
                            alt={`${data.title} image ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {displayHeroImages.length > 1 ? (
                      <>
                        <CarouselPrevious
                          variant="secondary"
                          className="z-30 left-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex"
                        />
                        <CarouselNext
                          variant="secondary"
                          className="z-30 right-3 top-1/2 -translate-y-1/2 border-white/10 bg-black/35 hover:bg-black/50 text-white backdrop-blur-md hidden md:inline-flex"
                        />
                      </>
                    ) : null}
                  </Carousel>

                  {/* Dots */}
                  {displayHeroImages.length > 1 ? (
                    <div className="absolute z-30 bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2">
                      {displayHeroImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => heroCarouselApi?.scrollTo(i)}
                          className={[
                            "h-2 w-2 rounded-full transition-all",
                            i === heroSlideIndex ? "bg-white w-5" : "bg-white/45 hover:bg-white/70",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  ) : null}

                  {/* Group chat preview */}
                  <div className="absolute z-20 right-[22px] bottom-3 md:right-[26px] md:bottom-4 h-[90%] aspect-[9/16] pointer-events-none select-none">
                    <img
                      src={groupChatOverlayImageUrl}
                      alt="Group chat preview"
                      className="w-full h-full object-contain drop-shadow-2xl"
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </div>

                  <div className="absolute z-10 inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Meta (move above title) */}
              <div className="flex flex-wrap gap-4 text-gray-300 mb-5">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {formatDate(data.datetime_local)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {data.place}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {durationText}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {formattedTotalPrice}
                </span>
                {formattedCityName ? (
                  <span className="flex items-center gap-2">
                    <Globe size={18} />
                    {formattedCityName}
                  </span>
                ) : null}
              </div>

              <h1 className="mb-2 text-white leading-tight">
                <span className="block text-2xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                    Meet New Friends at
                  </span>
                </span>
                <span className="block text-4xl md:text-6xl font-extrabold text-white">
                  {data.title}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-4">
                Meet New Friends at this event through Pulse. We give you access to a group chat
                with other attendees and help you break the ice and get to know each other, setting
                you up for new successful friendships.
              </p>
              <div className="max-w-3xl">
                <div className="text-xs uppercase tracking-wider text-white/60">About the event</div>
                <p className="text-lg text-gray-300 mt-1">{data.short_description}</p>
              </div>

              {/* Prominent CTA (above the fold) */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex items-center justify-center sm:justify-start gap-3 px-2">
                  <div className="text-xs uppercase tracking-wider text-white/60">Price</div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                      {formattedTotalPrice}
                    </div>
                    <div className="mt-1 text-xs text-white/60">{priceBreakdownLine}</div>
                  </div>
                </div>
                <Link
                  to={checkoutHref}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                >
                  Sign up
                  <ExternalLink size={20} />
                </Link>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/70 px-2">
                  <MessageSquare size={16} className="text-pulse-pink" />
                  Group chat opens after booking
                </div>
              </div>
              <div className="mt-3">
                <Link
                  to={addRefToUrl("/how-it-works")}
                  className="text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors"
                >
                  How it works (friend group matching)
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main details */}
              <div className="lg:col-span-2">
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                    {introLine}
                  </p>
                </div>

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                        <BadgeInfo className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">How Pulse fits in</h2>
                        <p className="text-gray-300 mt-2 leading-relaxed">
                          This event is organised by{" "}
                          <span className="text-white/90 font-medium">{organiser}</span>. You may meet
                          other attendees who didn't book through Pulse — that's normal for public
                          events.
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-300">
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">👥</span>
                            <span>
                              <span className="text-white/90 font-medium">Your benefit with Pulse:</span>{" "}
                              you get a small group inside the wider crowd — other solo attendees who
                              are also looking to meet new friends.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">💬</span>
                            <span>
                              <span className="text-white/90 font-medium">Group chat:</span> opens
                              after booking so you can introduce yourself and make a simple meet-up
                              plan.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">🍸</span>
                            <span>
                              <span className="text-white/90 font-medium">Optional pre‑meet:</span>{" "}
                              coordinate a drink/dinner nearby if you want.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">Provider details</h2>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 font-bold">
                        {providerName?.slice(0, 1)?.toUpperCase() || "P"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white font-semibold leading-snug">
                          {providerName}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">General Info</h2>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">🎟️</span>
                        <span>
                          <span className="text-white/90 font-medium">Organiser:</span> {organiser}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">📍</span>
                        <span>
                          <span className="text-white/90 font-medium">Venue:</span> {data.place}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">📅</span>
                        <span>
                          <span className="text-white/90 font-medium">Date & time:</span>{" "}
                          {formatDate(data.datetime_local)}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">⏳</span>
                        <span>
                          <span className="text-white/90 font-medium">Duration:</span>{" "}
                          {durationText}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">💸</span>
                        <span>
                          <span className="text-white/90 font-medium">Total price:</span>{" "}
                          {formattedTotalPrice}
                          <span className="block text-sm text-white/60 mt-0.5">
                            Ticket: {formattedTicketPrice} · Pulse fee: {formattedPulseFee}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">🏷️</span>
                        <span>
                          <span className="text-white/90 font-medium">Provider:</span>{" "}
                          {providerName}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">💬</span>
                        <span>
                          <span className="text-white/90 font-medium">Pulse group chat:</span> After
                          you sign up, you're automatically added to an in‑app attendee chat to meet
                          people in advance.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">🍸</span>
                        <span>
                          <span className="text-white/90 font-medium">Optional pre‑meet:</span>{" "}
                          Coordinate drinks/dinner nearby if you want.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      What happens after you sign up
                    </h2>

                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex items-center gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4 flex-1">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-white font-semibold leading-snug">You're in</div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4 flex-1">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-white font-semibold leading-snug">Group chat opens</div>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4 flex-1">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                          <UtensilsCrossed className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-white font-semibold leading-snug">
                          Optional pre‑meet
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-white/60">
                      Chat opens automatically after booking.
                    </p>
                  </CardContent>
                </Card>

                <div className="prose prose-invert max-w-none">
                  <h2>About this event</h2>
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {data.long_description}
                  </p>
                  <h3>Good to know</h3>
                  <ul className="text-gray-300">
                    <li>Arrive 10–15 minutes early so the group can meet up.</li>
                    <li>If you're coming solo, you'll be welcomed — most people are.</li>
                    <li>Prefer a quieter vibe? Say so in the chat and we'll help coordinate.</li>
                    <li>Questions about the venue or timing? Ask in the group chat.</li>
                  </ul>
                </div>
              </div>

              {/* Sticky signup card */}
              <aside className="lg:sticky lg:top-28 h-fit">
                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h3 className="text-xl font-bold text-white">Sign up</h3>
                      <span className="text-xs text-white/60 flex items-center gap-1.5">
                        <MessageSquare size={14} className="text-pulse-pink" />
                        Group chat included
                      </span>
                    </div>

                    <div className="space-y-3 text-sm text-gray-300 mb-5">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#38D1BF]" />
                        Meet others going to the same event
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-purple-300" />
                        Get added to the attendee chat after booking
                      </div>
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed size={16} className="text-amber-300" />
                        Optional drinks/dinner before the event
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wider text-white/60">Price</div>
                      <div className="text-2xl font-extrabold text-white leading-none mt-1">
                        {formattedTotalPrice}
                      </div>
                      <div className="mt-2 text-xs text-white/60">
                        <div className="flex items-center justify-between gap-3">
                          <span>Ticket</span>
                          <span className="text-white/75">{formattedTicketPrice}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>Pulse fee</span>
                          <span className="text-white/75">{formattedPulseFee}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={checkoutHref}
                      className="w-full justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                    >
                      Sign up now
                      <ExternalLink size={18} />
                    </Link>

                    <p className="mt-3 text-xs text-white/60">
                      You'll see the group chat inside the Pulse app after booking.
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </motion.div>

            {/* Full-width "How it works" module */}
            <div className="mt-10">
              <EventSignupHowItWorks ctaHref="/how-it-works" ctaLabel="How it works" />
            </div>

            <EventFaqSection
              eventTitle={data.title}
              city={formattedCityName || ""}
              venue={data.place}
              organiser={organiser}
              provider={providerName}
              price={formattedTotalPrice}
              dateTimeLabel={formatDate(data.datetime_local)}
              duration={durationText}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
