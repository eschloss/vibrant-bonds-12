
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-background w-full">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollToTop scrollRef={viewportRef} />
        <div className="w-full overflow-x-hidden">
          <Outlet />
        </div>
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
