
import { useRef, useRef as useReactRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import ConsentScriptLoader from "@/components/ui/ConsentScriptLoader";
import GaPageViewTracker from "@/components/analytics/GaPageViewTracker";
import MetaPixelPageViewTracker from "@/components/analytics/MetaPixelPageViewTracker";
import { ScrollContainerProvider } from "@/contexts/ScrollContainerContext";
import { ChatContextProvider } from "@/contexts/ChatContext";

/** Set to true to show the "Chat with us" button */
const SHOW_CHAT_BUTTON = true;

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const manageRef = useReactRef<() => void | null>(null);
  const [CitiesPreloaderComp, setCitiesPreloaderComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@/components/CitiesPreloader").then((m) => setCitiesPreloaderComp(() => m.default));
  }, []);

  return (
    <ChatContextProvider>
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
          {SHOW_CHAT_BUTTON && <WhatsAppChatButton />}
          </ScrollContainerProvider>
        </ScrollArea>
      </div>
    </ChatContextProvider>
  );
};

export default AppLayout;
