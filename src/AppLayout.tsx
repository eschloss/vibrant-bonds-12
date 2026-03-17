
import { useRef, useRef as useReactRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import ConsentScriptLoader from "@/components/ui/ConsentScriptLoader";
import GaPageViewTracker from "@/components/analytics/GaPageViewTracker";
import MetaPixelPageViewTracker from "@/components/analytics/MetaPixelPageViewTracker";
import { ScrollContainerProvider } from "@/contexts/ScrollContainerContext";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const manageRef = useReactRef<() => void | null>(null);
  const [CitiesPreloaderComp, setCitiesPreloaderComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@/components/CitiesPreloader").then((m) => setCitiesPreloaderComp(() => m.default));
  }, []);

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw]">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollContainerProvider value={viewportRef}>
          <ScrollToTop scrollRef={viewportRef} />
          <div className="w-full">
            <Outlet />
          </div>
          <GaPageViewTracker />
          <MetaPixelPageViewTracker />
          {CitiesPreloaderComp && <CitiesPreloaderComp />}
          <ConsentScriptLoader />
          <CookieConsent manageRef={manageRef} />
        </ScrollContainerProvider>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
