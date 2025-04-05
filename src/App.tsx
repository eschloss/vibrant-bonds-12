
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Matchmaking from "./pages/Matchmaking";
import CityList from "./pages/CityList";
import CityPage from "./pages/CityPage";
import Communities from "./pages/Communities";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/cities" element={<CityList />} />
          <Route path="/cities/:cityName" element={<CityPage />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/about" element={<About />} />
          {/* Future routes will be added here */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
