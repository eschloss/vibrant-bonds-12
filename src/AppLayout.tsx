
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
          <ScrollToTop scrollRef={viewportRef} />
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
