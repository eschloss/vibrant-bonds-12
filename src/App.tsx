
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
