import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PreWaitlisterForm from "./PreWaitlisterForm";

interface PreWaitlisterDialogProps {
  cityName: string;
  city?: string;
  isCommunity?: boolean;
  state?: string;
}

const PreWaitlisterDialog = ({ cityName, city, isCommunity, state }: PreWaitlisterDialogProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <Button 
          size="xl" 
          className="relative rounded-full px-8 py-4 font-semibold text-white overflow-hidden border border-white/20 backdrop-blur-md transition-all duration-300 hover:brightness-110"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-pulse-pink to-pulse-green opacity-90" />
          <span className="relative z-10">
            {isCommunity ? t("city.get_matched", "Get Matched") : `${t("city.get_matched_in", "Get Matched in")} ${cityName}`}
          </span>
          <ArrowRight size={18} />
        </Button>
        {state && (
          <div className="text-sm text-black/60 mt-2 text-center font-light">
            {cityName}, {state}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto border-0 bg-white/25 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_24px_90px_rgba(0,0,0,0.18)] [box-shadow:inset_0_1px_2px_rgba(255,255,255,0.35)] rounded-[32px]">
          <DialogHeader className="pt-6">
            <DialogTitle className="text-center text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pulse-pink via-pulse-purple to-pulse-green bg-clip-text text-transparent leading-tight">
              {isCommunity ? t("city.get_matched", "Get Matched") : `${t("city.get_matched_in", "Get Matched in")} ${cityName}`}
            </DialogTitle>
          </DialogHeader>
          <PreWaitlisterForm cityName={cityName} city={city} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreWaitlisterDialog;