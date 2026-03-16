import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Handshake, MapPin, Search, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";
import { getCitiesWithEvents, type CityFromApi } from "@/data/events";
import { useFeaturedEvents } from "@/hooks/useFeaturedEvents";

const DEFAULT_CITY_IMAGE =
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop";

function normalizeSlug(s: string) {
  return (s || "").replace(/^\//, "").toLowerCase().trim();
}

function titleCaseFromSlug(slug: string) {
  return (slug || "")
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function formatDateShort(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function EventsCities() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const scrollContainer = useScrollContainer();

  const [launchingSearchTerm, setLaunchingSearchTerm] = useState("");
  const [launchingSelectedCountry, setLaunchingSelectedCountry] = useState<string>("");

  const [openCountriesLaunching, setOpenCountriesLaunching] = useState<Record<string, boolean>>({});

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  const seoProps = {
    title: {
      en: "Events by City | Find IRL Plans | Pulse",
      es: "Eventos por Ciudad | Encuentra Planes IRL | Pulse",
    },
    description: {
      en: "Browse Pulse event hubs by city. Find local events and meetups, grouped by country, and pick your city to explore what’s happening.",
      es: "Explora eventos de Pulse por ciudad. Encuentra eventos y meetups locales, agrupados por país, y elige tu ciudad para ver qué hay.",
    },
    keywords: ["events", "meetups", "city events", "group activities", "friend groups"],
    type: "website" as const,
  };

  // Fetch expanded data to reliably get `image` for every city
  const { data: citiesExpanded, loading: loadingCitiesExpanded } = useApiJson<CityFromApi[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const getLocalizedField = (city: CityFromApi, field: "name" | "country" | "state") => {
    if (currentLanguage === "es") {
      switch (field) {
        case "name":
          return city.es_name || city.en_name;
        case "country":
          return city.es_country || city.en_country || "";
        case "state":
          return city.es_state || (city as any).en_state;
      }
    }
    switch (field) {
      case "name":
        return city.en_name;
      case "country":
        return city.en_country || "";
      case "state":
        return (city as any).en_state;
    }
  };

  const cityBySlug = useMemo(() => {
    const map = new Map<string, CityFromApi>();
    if (!Array.isArray(citiesExpanded)) return map;
    for (const c of citiesExpanded) {
      const slug = normalizeSlug(c.url2);
      if (!slug) continue;
      map.set(slug, c);
    }
    return map;
  }, [citiesExpanded]);

  type DirectoryCity = {
    citySlug: string;
    name: string;
    country: string;
    state?: string;
    image?: string;
    eventCount?: number;
  };

  const liveNowCities = useMemo((): DirectoryCity[] => {
    if (!Array.isArray(citiesExpanded) || citiesExpanded.length === 0) return [];
    const base = getCitiesWithEvents(citiesExpanded);
    return base.map((c) => {
      const full = cityBySlug.get(c.citySlug);
      const name = full ? getLocalizedField(full, "name") : c.name;
      const country = full ? getLocalizedField(full, "country") : "";
      const state = full ? (getLocalizedField(full, "state") as string | undefined) : undefined;
      const image = full?.image || c.image;
      return {
        citySlug: c.citySlug,
        name,
        country,
        state,
        image,
        eventCount: c.eventCount,
      };
    });
  }, [citiesExpanded, cityBySlug, currentLanguage]);

  const { events: featuredEvents } = useFeaturedEvents(12);

  const launchingSoonCities = useMemo((): DirectoryCity[] => {
    if (!Array.isArray(citiesExpanded) || citiesExpanded.length === 0) return [];
    const liveSet = new Set(liveNowCities.map((c) => c.citySlug));
    return citiesExpanded
      .map((c) => {
        const citySlug = normalizeSlug(c.url2);
        return {
          citySlug,
          name: getLocalizedField(c, "name") || citySlug,
          country: getLocalizedField(c, "country") || "",
          state: getLocalizedField(c, "state") as string | undefined,
          image: c.image,
        } satisfies DirectoryCity;
      })
      .filter((c) => !!c.citySlug && !liveSet.has(c.citySlug))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [citiesExpanded, liveNowCities, currentLanguage]);

  const normalizeSearch = (str: string) =>
    (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const launchingCountries = useMemo(
    () =>
      Array.from(new Set(launchingSoonCities.map((c) => c.country)))
        .filter(Boolean)
        .sort(),
    [launchingSoonCities]
  );

  const filteredLaunchingSoon = useMemo(() => {
    let result = launchingSoonCities;
    if (launchingSearchTerm) {
      const term = normalizeSearch(launchingSearchTerm);
      result = result.filter((c) => {
        const name = normalizeSearch(c.name);
        const state = normalizeSearch(c.state || "");
        const country = normalizeSearch(c.country || "");
        return name.includes(term) || state.includes(term) || country.includes(term);
      });
    }
    if (launchingSelectedCountry && launchingSelectedCountry !== "all-countries") {
      result = result.filter((c) => c.country === launchingSelectedCountry);
    }
    return result;
  }, [launchingSoonCities, launchingSearchTerm, launchingSelectedCountry]);

  const groupByCountry = (cities: DirectoryCity[]) => {
    return cities.reduce<Record<string, DirectoryCity[]>>((acc, city) => {
      const country = city.country || "Other";
      if (!acc[country]) acc[country] = [];
      acc[country].push(city);
      return acc;
    }, {});
  };

  const groupedLaunchingSoon = useMemo(() => groupByCountry(filteredLaunchingSoon), [filteredLaunchingSoon]);

  const launchingCountryEntries = useMemo(() => {
    return Object.entries(groupedLaunchingSoon).sort(([a], [b]) => a.localeCompare(b));
  }, [groupedLaunchingSoon]);

  useEffect(() => {
    if (!launchingSearchTerm || !searchContainerRef.current || hasScrolledRef.current) return;
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    hasScrolledRef.current = true;
    setTimeout(() => {
      const container = searchContainerRef.current;
      if (!container) return;
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? (navbar as HTMLElement).offsetHeight : 80;

      if (scrollContainer?.current) {
        const containerRect = container.getBoundingClientRect();
        const scrollContainerRect = scrollContainer.current.getBoundingClientRect();
        const scrollPosition =
          scrollContainer.current.scrollTop +
          containerRect.top -
          scrollContainerRect.top -
          navbarHeight;
        scrollContainer.current.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      } else {
        const containerRect = container.getBoundingClientRect();
        const scrollPosition = window.scrollY + containerRect.top - navbarHeight;
        window.scrollTo({ top: Math.max(0, scrollPosition), behavior: "smooth" });
      }
    }, 100);
  }, [launchingSearchTerm, scrollContainer]);

  useEffect(() => {
    if (!launchingSearchTerm) hasScrolledRef.current = false;
  }, [launchingSearchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark");
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark">
      <PageLoadingOverlay show={loadingCitiesExpanded} />
      <Seo {...seoProps} />
      <Navbar />

      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 -z-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto mb-10"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
                <Sparkles size={14} className="text-pulse-pink" />
                {t("eventsCities.hero.pill", "Choose a city. Meet people before you arrive.")}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
                {t("eventsCities.hero.title_prefix", "Find your")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">
                  {t("eventsCities.hero.title_focus", "event crew")}
                </span>
                <br />
                {t("eventsCities.hero.title_suffix", "in your city")}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                {t(
                  "eventsCities.hero.subtitle",
                  "Browse cities where Pulse Events are live now, or explore where we’re launching next. If you run a venue or experiences, partner with us to bring events to your city."
                )}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90"
                  onClick={() => {
                    setTimeout(() => scrollToId("live-now"), 60);
                  }}
                >
                  {t("eventsCities.hero.cta_live", "Browse live event cities")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                  onClick={() => {
                    setTimeout(() => scrollToId("launching-soon"), 60);
                  }}
                >
                  {t("eventsCities.hero.cta_launching", "Launching soon")}
                </Button>
                <Link to="/partners" className="sm:self-center">
                  <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/15 border border-white/10">
                    <Handshake className="mr-2 h-4 w-4" />
                    {t("eventsCities.hero.cta_partner", "Become a partner")}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {/* LIVE NOW */}
              <section id="live-now">
                <div id="live-now-events" className="mb-10">
                  <div className="flex items-end justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        {t("eventsCities.live.featured_kicker", "Happening soon")}
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {t("eventsCities.live.featured_title", "Featured events")}
                      </div>
                    </div>
                    <Link
                      to="/events"
                      className="text-sm text-[#38D1BF] hover:text-white transition-colors"
                    >
                      {t("eventsCities.live.featured_link", "View events landing →")}
                    </Link>
                  </div>

                  {featuredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredEvents.map((e, idx) => {
                        const citySlug = normalizeSlug(e.citySlug);
                        const city = cityBySlug.get(citySlug);
                        const cityName = city ? getLocalizedField(city, "name") : titleCaseFromSlug(citySlug);
                        const cityCountry = city ? getLocalizedField(city, "country") : "";
                        const dateLabel = formatDateShort(e.dateTime);
                        const href = `/events/${e.slug}`;

                        return (
                          <motion.div
                            key={e.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: idx * 0.03 }}
                          >
                            <Link to={href} className="block h-full">
                              <Card className="bg-gray-800/40 backdrop-blur-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full group overflow-hidden rounded-3xl">
                                <div className="relative h-44 overflow-hidden">
                                  <img
                                    src={e.primaryImage || DEFAULT_CITY_IMAGE}
                                    alt={e.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    loading={idx < 3 ? "eager" : "lazy"}
                                    decoding="async"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent" />
                                  <div className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-white/90 text-xs">
                                      <MapPin size={14} className="text-white/70" />
                                      <span className="truncate">
                                        {cityCountry ? `${cityName}, ${cityCountry}` : cityName}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/90 text-xs">
                                      <CalendarDays size={14} className="text-white/70" />
                                      <span>{dateLabel}</span>
                                    </div>
                                  </div>
                                </div>
                                <CardContent className="p-5">
                                  <div className="text-lg font-bold text-white group-hover:text-pulse-pink transition-colors leading-snug">
                                    {e.title}
                                  </div>
                                  <div className="text-sm text-gray-300 mt-2 line-clamp-2">{e.shortDescription}</div>
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="text-white font-extrabold">{e.price}</div>
                                    <div className="text-xs uppercase tracking-wider text-[#38D1BF]">
                                      {t("eventsCities.live.card_cta", "View details")}
                                      <ArrowRight className="inline-block ml-1 w-4 h-4" />
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-300">
                      {t("eventsCities.live.none", "No featured events yet.")}
                    </div>
                  )}
                </div>
              </section>

              {/* PARTNERSHIP (between live now and launching soon) */}
              <div className="mt-12 mb-12 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/55 via-purple-900/25 to-gray-900/55 backdrop-blur-xl overflow-hidden">
                <div className="p-6 md:p-8 relative">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-pulse-pink/15 blur-3xl" />
                    <div className="absolute -bottom-12 -right-10 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="text-white font-bold text-lg md:text-xl">
                        {t("eventsCities.partner.title", "Run Pulse Events in your city")}
                      </div>
                      <div className="text-white/75 mt-1 max-w-2xl">
                        {t(
                          "eventsCities.partner.subtitle",
                          "Have a venue or run experiences? Apply to partner and bring Pulse Events to your city."
                        )}
                      </div>
                    </div>
                    <Link to="/partners" className="shrink-0">
                      <Button className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white hover:opacity-90">
                        {t("eventsCities.partner.cta", "Apply for partnership")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* LAUNCHING SOON (visible by default) */}
              <section id="launching-soon">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="max-w-4xl mx-auto mb-8 space-y-3"
                  ref={searchContainerRef}
                >
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {t("eventsCities.launching.title", "Launching soon")}
                    </div>
                    <p className="text-white/75 mt-2">
                      {t(
                        "eventsCities.launching.subtitle",
                        "We’re expanding Pulse Events. Browse upcoming cities — or partner with us to launch faster."
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E9196]"
                          aria-hidden="true"
                        />
                        <Input
                          ref={searchInputRef}
                          placeholder={t("eventsCities.search_placeholder", "Search cities, states, or countries…")}
                          value={launchingSearchTerm}
                          onChange={(e) => setLaunchingSearchTerm(e.target.value)}
                          aria-label={t("eventsCities.search_label", "Search cities")}
                          className="pl-10 bg-gray-800/50 border-2 border-[#38D1BF] focus:border-[#38D1BF] focus:ring-0 text-white rounded-md placeholder:text-[#8E9196] transition-colors"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-56">
                      <Select value={launchingSelectedCountry} onValueChange={setLaunchingSelectedCountry}>
                        <SelectTrigger className="bg-gray-800/50 border-2 border-[#38D1BF] focus:border-[#38D1BF] focus:ring-0 text-white rounded-md transition-colors">
                          <SelectValue placeholder={t("eventsCities.all_countries", "All Countries")} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border border-[#38D1BF] text-white rounded-md z-50">
                          <SelectItem
                            value="all-countries"
                            className="data-[state=checked]:bg-[#38D1BF] data-[state=checked]:text-black transition-colors"
                          >
                            {t("eventsCities.all_countries", "All Countries")}
                          </SelectItem>
                          {launchingCountries.map((country) => (
                            <SelectItem
                              key={country}
                              value={country}
                              className="data-[state=checked]:bg-[#38D1BF] data-[state=checked]:text-black transition-colors"
                            >
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                  {launchingCountryEntries.length > 0 ? (
                    launchingCountryEntries.map(([country, citiesInCountry], i) => (
                      <motion.div
                        key={country}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.04 }}
                        className="mb-8"
                      >
                        <Collapsible open={openCountriesLaunching[country] ?? i < 2} className="w-full">
                          <CollapsibleTrigger
                            onClick={() =>
                              setOpenCountriesLaunching((prev) => ({
                                ...prev,
                                [country]: !(prev[country] ?? i < 2),
                              }))
                            }
                            className="flex items-center w-full p-4 mb-4 bg-gray-800/55 rounded-lg border border-white/10"
                          >
                            <h2 className="text-xl font-bold text-white">{country}</h2>
                            <div className="ml-auto px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 font-medium border border-white/10">
                              {citiesInCountry.length}{" "}
                              {citiesInCountry.length === 1
                                ? t("eventsCities.city", "city")
                                : t("eventsCities.cities", "cities")}
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {citiesInCountry
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((city, index) => (
                                  <motion.div
                                    key={city.citySlug}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.03 }}
                                  >
                                    <Link to={`/events/cities/${city.citySlug}`}>
                                      <Card className="bg-gray-900/25 backdrop-blur-lg border border-dashed border-white/20 hover:border-white/30 transition-all duration-300 h-full group overflow-hidden rounded-3xl">
                                        <div className="relative h-40 overflow-hidden">
                                          <img
                                            src={city.image || DEFAULT_CITY_IMAGE}
                                            alt={`${city.name} events`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                                            loading="lazy"
                                            decoding="async"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                          <div className="absolute top-3 left-3">
                                            <div className="inline-flex items-center rounded-full bg-black/35 backdrop-blur px-3 py-1 text-xs text-white border border-white/10">
                                              {t("eventsCities.launching.badge", "Launching soon")}
                                            </div>
                                          </div>
                                        </div>
                                        <CardContent className="p-5">
                                          <h3 className="text-lg font-bold text-white group-hover:text-pulse-pink transition-colors">
                                            {city.name}
                                          </h3>
                                          <p className="text-sm text-gray-400 mt-1">
                                            {city.state ? city.state : country}
                                          </p>
                                          <div className="mt-4 inline-flex items-center text-[#38D1BF] text-sm font-semibold">
                                            {t("eventsCities.launching.cta", "Explore city")}
                                            <ArrowRight className="ml-1 w-4 h-4" />
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </Link>
                                  </motion.div>
                                ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-gray-300">
                      {t("eventsCities.no_results", "No cities match your search.")}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

