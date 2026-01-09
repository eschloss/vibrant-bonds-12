
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import AppLayout from "@/AppLayout";

// Pages
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Communities = lazy(() => import("@/pages/Communities"));
const Blog = lazy(() => import("@/pages/Blog"));
const Matchmaking = lazy(() => import("@/pages/Matchmaking"));
const CitiesExpanded = lazy(() => import("@/pages/CitiesExpanded"));
const CityList = lazy(() => import("@/pages/CityList"));
const CityPage = lazy(() => import("@/pages/CityPage"));
const QueerCityPage = lazy(() => import("@/pages/QueerCityPage"));
const AffinityCityPage = lazy(() => import("@/pages/AffinityCityPage"));
const QueerAffinityCityPage = lazy(() => import("@/pages/QueerAffinityCityPage"));
const NeighborhoodPage = lazy(() => import("@/pages/NeighborhoodPage"));
const QueerNeighborhoodPage = lazy(() => import("@/pages/QueerNeighborhoodPage"));
const AffinityNeighborhoodPage = lazy(() => import("@/pages/AffinityNeighborhoodPage"));
const QueerAffinityNeighborhoodPage = lazy(() => import("@/pages/QueerAffinityNeighborhoodPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const Partnerships = lazy(() => import("@/pages/Partnerships"));
const AmbassadorProgram = lazy(() => import("@/pages/AmbassadorProgram"));
const Careers = lazy(() => import("@/pages/Careers"));
const JobOpening = lazy(() => import("@/pages/JobOpening"));
const MeetPip = lazy(() => import("@/pages/MeetPip"));
const Press = lazy(() => import("@/pages/Press"));
const PlanIdeas = lazy(() => import("@/pages/PlanIdeas"));
const PlanIdeasCity = lazy(() => import("@/pages/PlanIdeasCity"));
const Activities = lazy(() => import("@/pages/Activities"));
const Download = lazy(() => import("@/pages/Download"));
const AlmostThere = lazy(() => import("@/pages/AlmostThere"));
const Redirect = lazy(() => import("@/pages/Redirect"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const LonelinessEpidemic = lazy(() => import("@/pages/LonelinessEpidemic"));
const RealLifeMagic = lazy(() => import("@/pages/RealLifeMagic"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorks"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const DoNotShare = lazy(() => import("@/pages/DoNotShare"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Signup = lazy(() => import("@/pages/Signup"));
const SupportUs = lazy(() => import("@/pages/SupportUs"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));

const queryClient = new QueryClient();

function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
          <Suspense fallback={null}>
            <Router>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="communities" element={<Communities />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="matchmaking" element={<Matchmaking />} />
                  
                  {/* New pages */}
                  <Route path="partners" element={<Partnerships />} />
                  <Route path="ambassador-program" element={<AmbassadorProgram />} />
                  <Route path="careers" element={<Careers />} />
                  <Route path="careers/:jobId" element={<JobOpening />} />
                  <Route path="meet-pip" element={<MeetPip />} />
                  <Route path="plan-ideas" element={<PlanIdeas />} />
                  <Route path="plan-ideas/:cityName" element={<PlanIdeasCity />} />
                  <Route path="activities" element={<Activities />} />
                  <Route path="download" element={<Download />} />
                  <Route path="almost-there" element={<AlmostThere />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="support-us/:city_code" element={<SupportUs />} />
                  <Route path="thank-you" element={<ThankYou />} />
                  <Route path="how-it-works" element={<HowItWorksPage />} />
                  <Route path="press" element={<Press />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="loneliness-epidemic" element={<LonelinessEpidemic />} />
                  <Route path="real-life-magic" element={<RealLifeMagic />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="do-not-share" element={<DoNotShare />} />
                  
                  {/* Cities routes */}
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities-expanded" element={<CitiesExpanded />} />
                  <Route path="cities/:cityName" element={<CityPage />} />
                  <Route path="cities/:cityName/queer" element={<QueerCityPage />} />
                  <Route path="cities/:cityName/:affinityName" element={<AffinityCityPage />} />
                  <Route path="cities/:cityName/queer/:affinityName" element={<QueerAffinityCityPage />} />

                  {/* Neighborhood routes */}
                  <Route path="neighborhoods/:cityName/:neighborhoodName" element={<NeighborhoodPage />} />
                  <Route path="neighborhoods/:cityName/:neighborhoodName/queer" element={<QueerNeighborhoodPage />} />
                  <Route path="neighborhoods/:cityName/:neighborhoodName/:affinityName" element={<AffinityNeighborhoodPage />} />
                  <Route path="neighborhoods/:cityName/:neighborhoodName/queer/:affinityName" element={<QueerAffinityNeighborhoodPage />} />
                  
                  {/* Community route */}
                  <Route path="communities/:community_url" element={<CommunityPage />} />
                  
                  {/* Redirect route */}
                  <Route path="redirect" element={<Redirect />} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Router>
          </Suspense>
          <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
