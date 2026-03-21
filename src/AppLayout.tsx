import { Suspense, lazy, useRef, useRef as useReactRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppShellRouteFallback } from "@/components/AppShellRouteFallback";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import ConsentScriptLoader from "@/components/ui/ConsentScriptLoader";
import AppReadyDispatch from "@/components/analytics/AppReadyDispatch";
import GaPageViewTracker from "@/components/analytics/GaPageViewTracker";
import MetaPixelPageViewTracker from "@/components/analytics/MetaPixelPageViewTracker";
import MatchmakingChatContextSync from "@/components/MatchmakingChatContextSync";
import { ScrollContainerProvider } from "@/contexts/ScrollContainerContext";
import {
  ChatContextProvider,
  pathShowsChatBubbleByDefault,
  useChatContext,
} from "@/contexts/ChatContext";

const WhatsAppChatButton = lazy(() => import("@/components/WhatsAppChatButton"));
const CitiesPreloader = lazy(() => import("@/components/CitiesPreloader"));

/** Whether to show the chat bubble. Uses path-based default (false) unless a page overrides via setShowChatBubble. */
function useShouldShowChatBubble(): boolean {
  const location = useLocation();
  const { showChatBubble } = useChatContext();
  const pathDefault = pathShowsChatBubbleByDefault(location.pathname);
  return showChatBubble === null ? pathDefault : showChatBubble;
}

const AppLayoutInner = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const manageRef = useReactRef<() => void | null>(null);
  const shouldShowChatBubble = useShouldShowChatBubble();

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw]">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollContainerProvider value={viewportRef}>
          <ScrollToTop scrollRef={viewportRef} />
          <div className="w-full">
            <MatchmakingChatContextSync />
            <Suspense fallback={<AppShellRouteFallback />}>
              <Outlet />
              <AppReadyDispatch />
            </Suspense>
          </div>
          <GaPageViewTracker />
          <MetaPixelPageViewTracker />
          <Suspense fallback={null}>
            <CitiesPreloader />
          </Suspense>
          <ConsentScriptLoader />
          <CookieConsent manageRef={manageRef} />
          {shouldShowChatBubble && (
            <Suspense fallback={null}>
              <WhatsAppChatButton />
            </Suspense>
          )}
        </ScrollContainerProvider>
      </ScrollArea>
    </div>
  );
};

const AppLayout = () => {
  return (
    <ChatContextProvider>
      <AppLayoutInner />
    </ChatContextProvider>
  );
};

export default AppLayout;
