
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Matchmaking from "./pages/Matchmaking";
import CityList from "./pages/CityList";
import CitiesExpanded from "./pages/CitiesExpanded";
import CityPage from "./pages/CityPage";
import QueerCityPage from "./pages/QueerCityPage";
import Communities from "./pages/Communities";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import AppLayout from "./AppLayout";
import Sitemap from "./pages/Sitemap";

const queryClient = new QueryClient();

// Enhanced WwwRedirect component with immediate execution
const WwwRedirect = () => {
  useEffect(() => {
    // Only run in the browser environment
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Check if hostname starts with "www."
      if (hostname.startsWith('www.')) {
        // Preserve the entire URL except replace www. with nothing
        const newUrl = window.location.href.replace(/^(https?:\/\/)www\./i, '$1');
        
        // Use replace instead of assign to prevent back button from returning to www version
        window.location.replace(newUrl);
        
        // Return early since we're redirecting
        return;
      }
    }
  }, []);
  
  // Component doesn't render anything
  return null;
};

// Add redirect outside the React component tree for immediate execution
if (typeof window !== 'undefined' && window.location.hostname.startsWith('www.')) {
  const newUrl = window.location.href.replace(/^(https?:\/\/)www\./i, '$1');
  window.location.replace(newUrl);
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Add the WwwRedirect component at the top level */}
      <WwwRedirect />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/cities" element={<CityList />} />
            <Route path="/cities-expanded" element={<CitiesExpanded />} />
            <Route path="/cities/:cityName" element={<CityPage />} />
            <Route path="/cities/:cityName/queer" element={<QueerCityPage />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Make the sitemap route more explicit and outside of AppLayout */}
          <Route path="/sitemap.xml" element={<Sitemap />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
