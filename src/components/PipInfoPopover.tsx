import { Link } from "react-router-dom";
import { Info, ArrowRight } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const PIP_IMAGE_URL =
  "https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png";

export default function PipInfoPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-4 decoration-white/40 hover:decoration-white/70 transition-colors cursor-pointer"
        >
          Pip
          <Info size={13} className="text-white/40" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={8}
        className="w-72 rounded-xl border border-gray-700 bg-gray-800 p-0 shadow-xl shadow-black/40"
      >
        <div className="flex items-start gap-3 p-4">
          <img
            src={PIP_IMAGE_URL}
            alt="Pip"
            className="w-14 h-14 rounded-full object-cover border border-gray-600 shrink-0 bg-gray-900/30"
          />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">Meet Pip</div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Your AI group host. Pip breaks the ice, keeps the chat lively, and
              helps your group plan meetups.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 px-4 py-2.5">
          <Link
            to="/meet-pip"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:opacity-80 transition-opacity"
          >
            Learn more about Pip
            <ArrowRight size={12} className="text-accent" />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
