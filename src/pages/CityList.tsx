import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
type City = {
  en_name: string;
  url2: string;
  en_country: string;
  en_state?: string;
};


const CityList = () => {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<City[]>(allCities);

  useEffect(() => {
  const fetchCities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: City[] = await response.json();
        setAllCities(data);
        setFilteredCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Get unique list of countries for filter dropdown
  const countries = Array.from(new Set(allCities.map(city => city.en_country))).sort();

  // Filter cities based on search and country selection
  useEffect(() => {
  let result = allCities;

  if (searchTerm) {
    result = result.filter(city =>
      city.en_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.en_state?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCountry && selectedCountry !== "all-countries") {
    result = result.filter(city => city.en_country === selectedCountry);
  }

  setFilteredCities(result);
}, [searchTerm, selectedCountry, allCities]);

  // Group cities by country
  const groupedCities = filteredCities.reduce<Record<string, City[]>>((acc, city) => {
    if (!acc[city.en_country]) {
      acc[city.en_country] = [];
    }
    acc[city.en_country].push(city);
    return acc;
  }, {});
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Set dark mode
    document.documentElement.classList.add('dark');
  }, []);
  return <div className="flex flex-col min-h-screen dark">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-purple-900/40 to-gray-900"></div>
          
          <div className="absolute inset-0 -z-5">
            {Array.from({
            length: 20
          }).map((_, i) => <div key={i} className="absolute rounded-full bg-purple-500/20" style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }} />)}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} className="text-center max-w-3xl mx-auto mb-16 my-[20px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Find Friends in <span className="pulse-gradient-text">Your City</span>
              </h1>
              <p className="text-xl text-foreground/80 font-light">
                Select your city to connect with like-minded people near you.
              </p>
            </motion.div>
            
            {/* Filters */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="max-w-4xl mx-auto mb-10 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search cities or states..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-gray-800/50 border-white/10 text-white" />
                  </div>
                </div>
                <div className="w-full md:w-40">
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/10 text-white">
                      <SelectItem value="all-countries">All Countries</SelectItem>
                      {countries.map(country => <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
            
            {/* Cities list grouped by country */}
            <div className="max-w-6xl mx-auto">
              {Object.entries(groupedCities).length > 0 ? Object.entries(groupedCities).sort(([countryA], [countryB]) => countryA.localeCompare(countryB)).map(([country, cities], countryIndex) => <motion.div key={country} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: countryIndex * 0.1
            }} className="mb-8">
                      <Collapsible defaultOpen={false} className="w-full">
                        <CollapsibleTrigger className="flex items-center w-full p-4 mb-4 bg-gray-800/70 rounded-lg">
                          <h2 className="text-xl font-bold text-white">{country}</h2>
                          <div className="ml-auto px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">
                            {cities.length} {cities.length === 1 ? 'city' : 'cities'}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cities.map((city, index) => <motion.div key={city.url2} initial={{
                      opacity: 0,
                      y: 20
                    }} animate={{
                      opacity: 1,
                      y: 0
                    }} transition={{
                      duration: 0.5,
                      delay: index * 0.05
                    }}>
                                <Link to={`/cities${city.url2}`} className="block">
                                  <div className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 h-full hover:bg-gray-800/70 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
                                    <div className="flex items-start gap-4">
                                      <div className="bg-purple-500/20 rounded-full p-3">
                                        <MapPin className="text-purple-400" />
                                      </div>
                                      
                                      <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{city.en_name}</h3>
                                        {city.en_state && <p className="text-sm text-gray-400 mb-2">{city.en_state}</p>}
                                        <p className="text-gray-300 mb-4">Connect with friends in {city.en_name}</p>
                                        
                                        <div className="flex justify-end">
                                          <Button variant="ghost" size="sm" className="text-purple-400 group-hover:bg-purple-500/20">
                                            View <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>)}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </motion.div>) : <div className="text-center py-12">
                  <p className="text-xl text-gray-400">No cities found matching your search criteria.</p>
                  <Button variant="outline" className="mt-4 text-purple-400 border-purple-400/30 hover:bg-purple-500/20" onClick={() => {
                setSearchTerm("");
                setSelectedCountry("");
              }}>
                    Clear Filters
                  </Button>
                </div>}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default CityList;