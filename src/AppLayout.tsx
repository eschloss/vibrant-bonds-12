
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";
import LanguageSelector from "@/components/LanguageSelector";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-background w-full max-w-[100vw]">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollToTop scrollRef={viewportRef} />
        <div className="w-full">
          <Outlet />
        </div>
      </ScrollArea>
      <LanguageSelector />
    </div>
  );
};

export default AppLayout;
