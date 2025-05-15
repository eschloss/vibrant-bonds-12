
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CityCard from "@/components/CityCard";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

type City = {
  en_name: string;
  es_name?: string;
  url2: string;
  en_country: string;
  es_country?: string;
  en_state?: string;
  es_state?: string;
};

const CityList = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [allCities, setAllCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: City[] = await response.json();
        setAllCities(data);
        setFilteredCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Helper function to get the correct name, country, or state based on the current language
  const getLocalizedField = (city: City, field: 'name' | 'country' | 'state') => {
    if (currentLanguage === 'es') {
      switch (field) {
        case 'name':
          return city.es_name || city.en_name;
        case 'country':
          return city.es_country || city.en_country;
        case 'state':
          return city.es_state || city.en_state;
      }
    } else {
      switch (field) {
        case 'name':
          return city.en_name;
        case 'country':
          return city.en_country;
        case 'state':
          return city.en_state;
      }
    }
  };

  useEffect(() => {
    let result = allCities;
    if (searchTerm) {
      result = result.filter(city => {
        const cityName = getLocalizedField(city, 'name')?.toLowerCase() || '';
        const cityState = getLocalizedField(city, 'state')?.toLowerCase() || '';
        const cityCountry = getLocalizedField(city, 'country')?.toLowerCase() || '';
        return cityName.includes(searchTerm.toLowerCase()) || cityState.includes(searchTerm.toLowerCase()) || cityCountry.includes(searchTerm.toLowerCase());
      });
    }
    if (selectedCountry && selectedCountry !== "all-countries") {
      result = result.filter(city => getLocalizedField(city, 'country') === selectedCountry);
    }
    setFilteredCities(result);

    const matchingCountries = new Set(result.map(city => getLocalizedField(city, 'country')));

    setOpenCountries(prev => {
      const updated = { ...prev };

      if (selectedCountry && selectedCountry !== "all-countries") {
        updated[selectedCountry] = true;
      }

      if (searchTerm) {
        matchingCountries.forEach(country => {
          if (country) updated[country] = true;
        });
      }

      return updated;
    });
  }, [searchTerm, selectedCountry, allCities, currentLanguage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Get unique countries in the correct language
  const countries = Array.from(
    new Set(allCities.map(city => getLocalizedField(city, 'country')))
  ).filter(Boolean).sort();

  // Group cities by country
  const groupedCities = filteredCities.reduce<Record<string, City[]>>((acc, city) => {
    const countryName = getLocalizedField(city, 'country');
    if (!countryName) return acc;
    
    if (!acc[countryName]) acc[countryName] = [];
    acc[countryName].push(city);
    return acc;
  }, {});

  const toggleCountry = (country: string) => {
    setOpenCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen dark">
      <Navbar />
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          <div className="absolute inset-0 -z-5">
            {Array.from({
              length: 20
            }).map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-purple-500/20" 
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }} 
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{
                opacity: 0,
                y: 20
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.7
              }} 
              className="text-center max-w-3xl mx-auto mb-16 my-[20px]"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t("citylist.title", "Meet New Friends in")} <span className="pulse-gradient-text">{t("citylist.your_city", "Your City")}</span>
              </h1>
              <p className="text-xl text-foreground/80 font-light">
                {t("citylist.description", "Select your city to connect with like-minded people near you.")}
              </p>
            </motion.div>

            <motion.div 
              initial={{
                opacity: 0,
                y: 20
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.5,
                delay: 0.2
              }} 
              className="max-w-4xl mx-auto mb-10 space-y-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8E9196]"
                      aria-hidden="true"
                    />
                    <Input
                      ref={searchInputRef}
                      placeholder={t("citylist.search_placeholder", "Search cities, states, or provinces…")}
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      aria-label={t("citylist.search_label", "Search cities or states")}
                      className={
                        "pl-10 bg-gray-800/50 border-2 border-[#38D1BF] focus:border-[#38D1BF] focus:ring-0 text-white rounded-md placeholder:text-[#8E9196] transition-colors"
                      }
                      autoFocus
                    />
                  </div>
                </div>
                <div className="w-full md:w-40">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="bg-gray-800/50 border-2 border-[#38D1BF] focus:border-[#38D1BF] focus:ring-0 text-white rounded-md transition-colors">
                      <SelectValue placeholder={t("citylist.all_countries", "All Countries")} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-[#38D1BF] text-white rounded-md z-50">
                      <SelectItem value="all-countries"
                        className="data-[state=checked]:bg-[#38D1BF] data-[state=checked]:text-black transition-colors">
                        {t("citylist.all_countries", "All Countries")}
                      </SelectItem>
                      {countries.map(country => (
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
              {Object.entries(groupedCities).length > 0 ? (
                Object.entries(groupedCities)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([country, cities], i) => (
                    <motion.div 
                      key={country} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }} 
                      className="mb-8"
                    >
                      <Collapsible open={!!openCountries[country]} className="w-full">
                        <CollapsibleTrigger
                          onClick={() => toggleCountry(country)}
                          className="flex items-center w-full p-4 mb-4 bg-gray-800/70 rounded-lg"
                        >
                          <h2 className="text-xl font-bold text-white">{country}</h2>
                          <div className="ml-auto px-3 py-1 bg-[#38D1BF]/10 rounded-full text-sm text-[#38D1BF] font-medium">
                            {cities.length} {cities.length === 1 ? t("citylist.city", "city") : t("citylist.cities", "cities")}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cities.map((city, index) => (
                              <motion.div 
                                key={city.url2} 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                              >
                                <CityCard
                                  name={getLocalizedField(city, 'name') || ''}
                                  state={getLocalizedField(city, 'state')}
                                  description={t("citylist.connect_with_friends", "Connect with friends in") + " " + (getLocalizedField(city, 'name') || '')}
                                  link={`/cities${city.url2}`}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </motion.div>
                  ))
              ) : (
                <div className="text-left py-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: .5 }}
                  >
                    <CityCard
                      name={t("citylist.cant_find_city", "Can't find your city?")}
                      state={t("citylist.worldwide", "Worldwide")}
                      description={t("citylist.your_city_next", "Your city's next—Lead the way!")}
                      link="/matchmaking"
                    />
                  </motion.div>
                  <Button
                    variant="outline"
                    className="mt-4 text-[#38D1BF] border-[#38D1BF]/40 hover:bg-[#38D1BF]/20 rounded-md"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCountry("");
                    }}
                  >
                    {t("citylist.clear_filters", "Clear Filters")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CityList;
