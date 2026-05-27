import { FormEvent, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronUp,
  ExternalLink,
  Loader2,
  Mail,
  PenLine,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { THE_LO_ENTRY_PANEL_PEEK_HEIGHT } from "@/components/the-lo/theLoLayout";

const PULSE_LOGO_URL = "https://s.kikiapp.eu/img/pulselogo.webp";

export type TheLoEntryPanelProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  hasPartnerKey: boolean;
  email: string;
  setEmail: (value: string) => void;
  savedEmail: string;
  isEditingEmail: boolean;
  error: string;
  setError: (value: string) => void;
  rememberTipText: string | null;
  partnerSubmitBusy: boolean;
  partnerSubmitTarget: null | "web" | "app";
  onWebSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onOpenApp: () => void;
  onEditEmail: () => void;
  dragStartY: number | null;
  setDragStartY: (value: number | null) => void;
  onSheetPointerUp: (clientY: number) => void;
};

const PanelGlow = () => (
  <>
    <div className="pointer-events-none absolute -inset-x-4 -top-4 h-24 rounded-[2rem] bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] opacity-30 blur-3xl" />
    <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[#38D1BF]/20 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#FF2688]/20 blur-3xl" />
  </>
);

const PanelHeader = ({ trailing }: { trailing?: ReactNode }) => (
  <div className="relative flex items-center gap-3">
    <img
      src={PULSE_LOGO_URL}
      alt=""
      className="h-14 w-14 rounded-2xl shadow-lg shadow-[#FF2688]/20"
      width={56}
      height={56}
      decoding="async"
    />
    <span className="min-w-0 flex-1 text-left">
      <span className="block text-xs uppercase tracking-[0.28em] text-white/45">Pulse</span>
      <span className="block text-2xl font-bold text-white">Enter Pulse with The LO</span>
    </span>
    {trailing}
  </div>
);

const EntryFormBody = ({
  hasPartnerKey,
  email,
  setEmail,
  savedEmail,
  isEditingEmail,
  error,
  setError,
  rememberTipText,
  partnerSubmitBusy,
  partnerSubmitTarget,
  onWebSubmit,
  onOpenApp,
  onEditEmail,
}: Omit<
  TheLoEntryPanelProps,
  "isOpen" | "onOpen" | "onClose" | "dragStartY" | "setDragStartY" | "onSheetPointerUp"
>) => (
  <>
    {!hasPartnerKey && (
      <p
        className="mb-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3 py-2.5 text-sm leading-snug text-amber-100/95"
        role="status"
      >
        Use your partner invitation link. The URL must include a{" "}
        <span className="font-mono text-[0.8125rem] text-white/90">key</span> query parameter (e.g.{" "}
        <span className="break-all font-mono text-[0.7rem] text-white/75">/the-lo?key=…</span>).
      </p>
    )}

    <form onSubmit={onWebSubmit} className="space-y-4 pt-2">
      {(!savedEmail || isEditingEmail) && (
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/75">Email address</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <Input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={partnerSubmitBusy || !hasPartnerKey}
              className="h-14 rounded-2xl border-white/15 bg-white/10 pl-12 text-base text-white placeholder:text-white/35 focus-visible:ring-[#FF2688] disabled:opacity-60"
              aria-invalid={Boolean(error)}
            />
          </div>
        </label>
      )}

      <div className="min-h-5">
        {error ? (
          <p className="text-sm text-[#FF7BB8]" role="alert">
            {error}
          </p>
        ) : savedEmail && !isEditingEmail ? (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/60 sm:justify-start sm:gap-x-6">
            <span className="min-w-0 break-words text-center sm:text-left">
              Continuing with {savedEmail}
            </span>
            <button
              type="button"
              disabled={partnerSubmitBusy || !hasPartnerKey}
              onClick={onEditEmail}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-45"
            >
              <PenLine className="h-3.5 w-3.5" />
              Edit
            </button>
          </div>
        ) : (
          rememberTipText && (
            <p className="text-center text-sm text-white/50 sm:text-left">{rememberTipText}</p>
          )
        )}
      </div>

      <Button
        type="submit"
        size="xl"
        disabled={partnerSubmitBusy || !hasPartnerKey}
        aria-busy={partnerSubmitTarget === "web"}
        className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-base font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.01] hover:opacity-95 disabled:pointer-events-none disabled:opacity-55"
      >
        Enter web version of Pulse
        {partnerSubmitTarget === "web" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <ArrowRight className="h-5 w-5" aria-hidden />
        )}
      </Button>
    </form>

    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/35">
      <span className="h-px flex-1 bg-white/10" />
      or
      <span className="h-px flex-1 bg-white/10" />
    </div>

    <Button
      type="button"
      variant="outline"
      size="xl"
      disabled={partnerSubmitBusy || !hasPartnerKey}
      aria-busy={partnerSubmitTarget === "app"}
      onClick={onOpenApp}
      className="h-14 w-full rounded-2xl border-white/15 bg-white/[0.06] text-base font-bold text-white hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-55"
    >
      {partnerSubmitTarget === "app" ? (
        <Loader2 className="h-5 w-5 animate-spin text-[#38D1BF]" aria-hidden />
      ) : (
        <Smartphone className="h-5 w-5 text-[#38D1BF]" aria-hidden />
      )}
      Open the App
      {partnerSubmitTarget === "app" ? (
        <span className="inline-block h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <ExternalLink className="h-4 w-4 text-white/55" aria-hidden />
      )}
    </Button>

    <p className="mt-5 text-center text-xs leading-relaxed text-white/42 sm:text-left">
      Push notifications are more reliable in the Pulse app than on the web version—open the app if
      you don’t want to miss updates.
    </p>
  </>
);

const TheLoEntryPanel = (props: TheLoEntryPanelProps) => {
  const {
    isOpen,
    onOpen,
    onClose,
    dragStartY,
    setDragStartY,
    onSheetPointerUp,
    ...formProps
  } = props;
  const { partnerSubmitBusy } = formProps;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !partnerSubmitBusy) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, partnerSubmitBusy]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Collapse entry panel"
          onClick={() => {
            if (!partnerSubmitBusy) {
              onClose();
            }
          }}
          className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px]"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ y: isOpen ? "0%" : `calc(100% - ${THE_LO_ENTRY_PANEL_PEEK_HEIGHT})` }}
        transition={{ type: "spring", stiffness: 340, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-40 h-[86dvh] w-full rounded-t-[2rem] border border-white/15 bg-[#111518]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
        aria-label="Enter Pulse panel"
      >
        <PanelGlow />

        <button
          type="button"
          onClick={onOpen}
          onPointerDown={(event) => setDragStartY(event.clientY)}
          onPointerUp={(event) => onSheetPointerUp(event.clientY)}
          className="relative flex w-full touch-pan-y items-center gap-3 px-6 py-5 text-left sm:px-8"
          style={{ minHeight: THE_LO_ENTRY_PANEL_PEEK_HEIGHT }}
          aria-expanded={isOpen}
        >
          <span className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
          <PanelHeader
            trailing={
              <ChevronUp
                className={`h-6 w-6 shrink-0 text-white/55 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            }
          />
        </button>

        {isOpen && (
          <div className="relative max-h-[calc(86dvh-6.75rem)] overflow-y-auto px-6 pb-8 sm:px-8">
            <div className="mx-auto max-w-xl">
              <EntryFormBody {...formProps} />
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default TheLoEntryPanel;
