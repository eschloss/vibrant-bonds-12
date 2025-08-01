
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import AppLayout from "@/AppLayout";

// Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Communities from "@/pages/Communities";
import Blog from "@/pages/Blog";
import Matchmaking from "@/pages/Matchmaking";
import CitiesExpanded from "@/pages/CitiesExpanded";
import CityList from "@/pages/CityList";
import CityPage from "@/pages/CityPage";
import QueerCityPage from "@/pages/QueerCityPage";
import AffinityCityPage from "@/pages/AffinityCityPage";
import QueerAffinityCityPage from "@/pages/QueerAffinityCityPage";
import CommunityPage from "@/pages/CommunityPage";
import Redirect from "@/pages/Redirect";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  // Handle www to non-www redirect
  useEffect(() => {
    if (window.location.hostname.startsWith('www.')) {
      const newUrl = window.location.href.replace('://www.', '://');
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="communities" element={<Communities />} />
              <Route path="blog" element={<Blog />} />
              <Route path="matchmaking" element={<Matchmaking />} />
              
              {/* Cities routes */}
              <Route path="cities" element={<CityList />} />
              <Route path="cities-expanded" element={<CitiesExpanded />} />
              <Route path="cities/:cityName" element={<CityPage />} />
              <Route path="cities/:cityName/queer" element={<QueerCityPage />} />
              <Route path="cities/:cityName/:affinityName" element={<AffinityCityPage />} />
              <Route path="cities/:cityName/queer/:affinityName" element={<QueerAffinityCityPage />} />
              
              {/* Community route */}
              <Route path="communities/:community_url" element={<CommunityPage />} />
              
              {/* Redirect route */}
              <Route path="redirect" element={<Redirect />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
