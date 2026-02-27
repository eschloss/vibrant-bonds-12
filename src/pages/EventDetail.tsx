import React from "react";
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
import { getEventBySlug, getEventPriceBreakdown, getEventProviderDetails } from "@/data/events";
import NotFound from "@/pages/NotFound";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRefParam } from "@/hooks/useRefParam";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Card, CardContent } from "@/components/ui/card";
import EventSignupHowItWorks from "@/components/EventSignupHowItWorks";
import EventFaqSection from "@/components/EventFaqSection";
import { getEventVibeById } from "@/data/eventVibes";
import { useTranslation } from "@/hooks/useTranslation";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const EventDetail = () => {
  const { cityName, eventSlug } = useParams<{ cityName: string; eventSlug: string }>();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();

  const event =
    cityName && eventSlug
      ? getEventBySlug(cityName, eventSlug)
      : undefined;

  if (!event) {
    return <NotFound />;
  }

  const { data: cities, loading: loadingCities } = useApiJson<any[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );
  const matchedCity =
    cityName && Array.isArray(cities)
      ? cities.find(
          (c: any) =>
            typeof c?.url2 === "string" &&
            c.url2.replace(/^\//, "").toLowerCase() === cityName.toLowerCase()
        )
      : undefined;

  const formattedCityName = cityName
    ? matchedCity
      ? (matchedCity[currentLanguage === "es" ? "es_name" : "en_name"] || matchedCity.en_name || "")
      : cityName
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
    : "";

  const citySubtitle = matchedCity
    ? [
        matchedCity[currentLanguage === "es" ? "es_state" : "en_state"] || matchedCity.en_state,
        matchedCity[currentLanguage === "es" ? "es_country" : "en_country"] || matchedCity.en_country,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const cityCountry = matchedCity
    ? (matchedCity[currentLanguage === "es" ? "es_country" : "en_country"] || matchedCity.en_country || "")
    : "";

  const cityImage: string | undefined =
    matchedCity && typeof matchedCity.image === "string" ? matchedCity.image : undefined;

  const providerDetails = getEventProviderDetails(event);
  const priceBreakdown = getEventPriceBreakdown(event);
  const vibe = getEventVibeById(event.categoryId);
  const vibeTitle = vibe ? t(vibe.titleKey, vibe.defaultTitle) : undefined;
  const vibeDescription = vibe ? t(vibe.descriptionKey, vibe.defaultDescription) : undefined;
  const vibeChips =
    vibe ? vibe.chipKeys.map((key, idx) => t(key, vibe.defaultChips[idx] ?? "")) : [];

  const introLine = `⭐ ${event.title} is a public event in ${formattedCityName}. Pulse isn’t the organiser — we help you go with a small group of other solo attendees, so you can meet new friends before you arrive.`;

  const seoProps = {
    title: {
      en: `${event.title} | ${formattedCityName} Events | Pulse`,
      es: `${event.title} | Eventos en ${formattedCityName} | Pulse`,
    },
    description: {
      en: event.shortDescription,
      es: event.shortDescription,
    },
    keywords: [event.title, formattedCityName, "event", "activities", providerDetails.name, vibeTitle].filter(Boolean),
    type: "website" as const,
    image: event.primaryImage,
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: `${introLine}\n\n${event.longDescription}`,
    startDate: event.dateTime,
    location: {
      "@type": "Place",
      name: event.place,
    },
    image: event.images.length > 0 ? event.images : [event.primaryImage],
    offers: {
      "@type": "Offer",
      price: event.price === "Free" ? "0" : event.price.replace(/[^\d.,]/g, "") || "0",
      priceCurrency: event.price.startsWith("€")
        ? "EUR"
        : event.price.startsWith("₦")
          ? "NGN"
          : "USD",
    },
  };

  const isEmbeddable = event.provider.toLowerCase() === "typeform";
  const ctaHref = isEmbeddable
    ? `/events/${cityName}/${event.slug}/booking`
    : event.bookingUrl;
  const ctaIsInternal = isEmbeddable;
  const confirmationHref = `/events/${cityName ?? event.citySlug}/${event.slug}/confirmation`;

  const additionalImages = (event.images?.length ? event.images : [event.primaryImage])
    .filter(Boolean)
    .slice(1, 5); // 4 images in addition to primary

  const galleryImages =
    additionalImages.length >= 4
      ? additionalImages.slice(0, 4)
      : [...additionalImages, ...Array.from({ length: 4 - additionalImages.length }, () => event.primaryImage)];

  const heroImages = [event.primaryImage, ...galleryImages].filter(
    (img, idx, arr) => Boolean(img) && arr.indexOf(img) === idx
  ) as string[];

  const [heroCarouselApi, setHeroCarouselApi] = React.useState<CarouselApi | undefined>(undefined);
  const [heroSlideIndex, setHeroSlideIndex] = React.useState(0);

  const groupChatOverlayImageUrl =
    "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/Copy%20of%20may%2021,%201107%20am%20(Your%20Story).png";

  React.useEffect(() => {
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

  return (
    <div className="flex flex-col min-h-screen dark">
      <PageLoadingOverlay show={loadingCities} />
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
          {cityImage ? (
            <div className="absolute inset-0 -z-10 opacity-20">
              <img src={cityImage} alt="" className="w-full h-full object-cover" />
            </div>
          ) : null}
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
                      {heroImages.map((img, i) => (
                        <CarouselItem key={img + i} className="pl-0 h-full">
                          <img
                            src={img}
                            alt={`${event.title} image ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {heroImages.length > 1 ? (
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
                  {heroImages.length > 1 ? (
                    <div className="absolute z-30 bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/10 px-3 py-2">
                      {heroImages.map((_, i) => (
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

                  {/* Group chat preview: transparent PNG overlay (no border/edge) */}
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
                  {formatDate(event.dateTime)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {event.place}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {event.duration}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign size={18} />
                  {event.price}
                </span>
                {formattedCityName ? (
                  <span className="flex items-center gap-2">
                    <Globe size={18} />
                    {formattedCityName}
                    {cityCountry ? `, ${cityCountry}` : ""}
                  </span>
                ) : null}
                {vibeTitle ? (
                  <span className="flex items-center gap-2">
                    <span className="text-white/70">•</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                      {vibeTitle}
                    </span>
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
                  {event.title}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-4">
                Meet New Friends at this event through Pulse. We give you access to a group chat with other attendees
                and help you break the ice and get to know each other, setting you up for new successful friendships.
              </p>
              <div className="max-w-3xl">
                <div className="text-xs uppercase tracking-wider text-white/60">About the event</div>
                <p className="text-lg text-gray-300 mt-1">{event.shortDescription}</p>
              </div>

              {/* Prominent CTA (above the fold) */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="flex items-center justify-center sm:justify-start gap-3 px-2">
                  <div className="text-xs uppercase tracking-wider text-white/60">Price</div>
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                      {event.price}
                    </div>
                    {priceBreakdown ? (
                      <div className="mt-1 text-xs text-white/60">
                        Ticket {priceBreakdown.ticketPrice} + Pulse fee {priceBreakdown.pulseFee}
                      </div>
                    ) : null}
                  </div>
                </div>
                {ctaIsInternal ? (
                  <Link
                    to={confirmationHref}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                  >
                    Sign up
                    <ExternalLink size={20} />
                  </Link>
                ) : (
                  <Link
                    to={confirmationHref}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                  >
                    Sign up
                    <ExternalLink size={20} />
                  </Link>
                )}
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
                          This event is organised by <span className="text-white/90 font-medium">{event.organiser}</span>.
                          You may meet other attendees who didn’t book through Pulse — that’s normal for public events.
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-300">
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">👥</span>
                            <span>
                              <span className="text-white/90 font-medium">Your benefit with Pulse:</span> you get a small
                              group inside the wider crowd — other solo attendees who are also looking to meet new friends.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">💬</span>
                            <span>
                              <span className="text-white/90 font-medium">Group chat:</span> opens after booking so you can
                              introduce yourself and make a simple meet-up plan.
                            </span>
                          </li>
                          <li className="flex gap-3">
                            <span className="w-6 shrink-0">🍸</span>
                            <span>
                              <span className="text-white/90 font-medium">Optional pre‑meet:</span> coordinate a drink/dinner
                              nearby if you want.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {vibeTitle && vibeDescription ? (
                  <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-white">Category</h2>
                      <p className="text-gray-300 mt-2 leading-relaxed">
                        <span className="text-white/90 font-medium">{vibeTitle}:</span> {vibeDescription}
                      </p>
                      {vibeChips.filter(Boolean).length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {vibeChips.filter(Boolean).map((chip) => (
                            <span
                              key={chip}
                              className="text-[11px] font-medium text-white/90 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-md"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ) : null}

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">Provider details</h2>
                    <div className="flex items-start gap-4">
                      {providerDetails.logoUrl ? (
                        <img
                          src={providerDetails.logoUrl}
                          alt={`${providerDetails.name} logo`}
                          className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 object-contain p-2"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 font-bold">
                          {providerDetails.name?.slice(0, 1)?.toUpperCase() || "P"}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-white font-semibold leading-snug">{providerDetails.name}</div>
                        {providerDetails.shortBio ? (
                          <p className="text-gray-300 mt-1 leading-relaxed">{providerDetails.shortBio}</p>
                        ) : null}
                        {providerDetails.eventDetailsUrl ? (
                          <a
                            href={providerDetails.eventDetailsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-sm text-[#38D1BF] hover:text-white transition-colors"
                          >
                            View event details on {providerDetails.name}
                            <ExternalLink size={16} />
                          </a>
                        ) : null}
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
                          <span className="text-white/90 font-medium">Organiser:</span> {event.organiser}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">📍</span>
                        <span>
                          <span className="text-white/90 font-medium">Venue:</span> {event.place}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">📅</span>
                        <span>
                          <span className="text-white/90 font-medium">Date & time:</span>{" "}
                          {formatDate(event.dateTime)}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">⏳</span>
                        <span>
                          <span className="text-white/90 font-medium">Duration:</span> {event.duration}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">💸</span>
                        <span>
                          <span className="text-white/90 font-medium">Total price:</span> {event.price}
                          {priceBreakdown ? (
                            <span className="block text-sm text-white/60 mt-0.5">
                              Ticket: {priceBreakdown.ticketPrice} · Pulse fee: {priceBreakdown.pulseFee}
                            </span>
                          ) : null}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">🏷️</span>
                        <span>
                          <span className="text-white/90 font-medium">Provider:</span> {providerDetails.name}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">💬</span>
                        <span>
                          <span className="text-white/90 font-medium">Pulse group chat:</span> After you sign up, you’re
                          automatically added to an in‑app attendee chat to meet people in advance.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 shrink-0">🍸</span>
                        <span>
                          <span className="text-white/90 font-medium">Optional pre‑meet:</span> Coordinate drinks/dinner
                          nearby if you want.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">What happens after you sign up</h2>

                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex items-center gap-3 rounded-xl bg-gray-900/40 border border-gray-700/60 p-4 flex-1">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-white font-semibold leading-snug">You’re in</div>
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
                        <div className="text-white font-semibold leading-snug">Optional pre‑meet</div>
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
                    {event.longDescription}
                  </p>
                  <h3>Good to know</h3>
                  <ul className="text-gray-300">
                    <li>Arrive 10–15 minutes early so the group can meet up.</li>
                    <li>If you’re coming solo, you’ll be welcomed — most people are.</li>
                    <li>Prefer a quieter vibe? Say so in the chat and we’ll help coordinate.</li>
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
                        {event.price}
                      </div>
                      {priceBreakdown ? (
                        <div className="mt-2 text-xs text-white/60">
                          <div className="flex items-center justify-between gap-3">
                            <span>Ticket</span>
                            <span className="text-white/75">{priceBreakdown.ticketPrice}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span>Pulse fee</span>
                            <span className="text-white/75">{priceBreakdown.pulseFee}</span>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {ctaIsInternal ? (
                      <Link
                        to={confirmationHref}
                        className="w-full justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                      >
                        Sign up now
                        <ExternalLink size={18} />
                      </Link>
                    ) : (
                      <Link
                        to={confirmationHref}
                        className="w-full justify-center inline-flex items-center gap-2 bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:from-pulse-blue hover:via-accent hover:to-pulse-pink text-white px-6 py-4 rounded-full font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all duration-300"
                      >
                        Sign up now
                        <ExternalLink size={18} />
                      </Link>
                    )}

                    <p className="mt-3 text-xs text-white/60">
                      You’ll see the group chat inside the Pulse app after booking.
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </motion.div>

            {/* Full-width “How it works” module */}
            <div className="mt-10">
              <EventSignupHowItWorks ctaHref="/how-it-works" ctaLabel="How it works" />
            </div>

            <EventFaqSection
              eventTitle={event.title}
              city={formattedCityName || cityName || ""}
              country={cityCountry || undefined}
              venue={event.place}
              organiser={event.organiser}
              provider={event.provider}
              price={event.price}
              dateTimeLabel={formatDate(event.dateTime)}
              duration={event.duration}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetail;
