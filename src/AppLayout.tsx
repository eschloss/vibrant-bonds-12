
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollToTop from "@/components/ScrollToTop";

const AppLayout = () => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <ScrollArea viewportRef={viewportRef} className="h-screen">
        <ScrollToTop scrollRef={viewportRef} />
        <Outlet />
      </ScrollArea>
    </div>
  );
};

export default AppLayout;
