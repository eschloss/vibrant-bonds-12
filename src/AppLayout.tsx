
import { useRef, useRef as useReactRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import ConsentScriptLoader from "@/components/ui/ConsentScriptLoader";
import GaPageViewTracker from "@/components/analytics/GaPageViewTracker";
import { ScrollContainerProvider } from "@/contexts/ScrollContainerContext";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const manageRef = useReactRef<() => void | null>(null);

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw]">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollContainerProvider value={viewportRef}>
          <ScrollToTop scrollRef={viewportRef} />
          <div className="w-full">
            <Outlet />
          </div>
          <GaPageViewTracker />
          <ConsentScriptLoader />
          <CookieConsent manageRef={manageRef} />
        </ScrollContainerProvider>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
