import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MessageSquare,
  Repeat,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/hooks/useSeo";
import { loadRecaptchaScriptOnce } from "@/lib/recaptchaLoader";
import { submitTheLoPartnerMember } from "@/lib/theLoPartnerApi";
import { useNeuralNetworkAnimation } from "@/utils/neuralNetworkAnimation";
import { useScrollContainer } from "@/contexts/ScrollContainerContext";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import TheLoHowItWorksJourney, {
  memberActivationSteps,
} from "@/components/the-lo/TheLoHowItWorksJourney";
import TheLoEntryPanel from "@/components/the-lo/TheLoEntryPanel";
import TheLoCommunityEventsSection from "@/components/the-lo/TheLoCommunityEventsSection";
import TheLoFooter from "@/components/the-lo/TheLoFooter";
import { THE_LO_ENTRY_PANEL_PEEK_HEIGHT, THE_LO_SCROLL_CLEARANCE } from "@/components/the-lo/theLoLayout";

/** Horizontal “Pulse” wordmark (same as Navbar on dark backgrounds). */
const PULSE_LOGO_URL = "https://s.kikiapp.eu/img/Pulse+Text.webp";
const THE_LO_LOGO_URL =
  "https://images.squarespace-cdn.com/content/v1/647bbaf9b744834809e39011/07266d43-0cfc-4479-80f3-019ab3d965bf/White-THELO_RGB_Logo_Horizontal_Light.png?format=1500w";
const EMAIL_COOKIE_NAME = "pulse_the_lo_email";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
const NEURAL_DOTS = 150;
const NEURAL_CLUSTERS = 5;

/** Hero partnership lockup — 20% larger than previous h-8 / sm:h-10 / md:h-12 scale. */
const HERO_PARTNER_LOGO_CLASS =
  "h-[2.4rem] max-h-[2.7rem] w-auto object-contain object-center sm:h-[3rem] sm:max-h-[3.3rem] md:h-[3.6rem] md:max-h-[3.6rem]";

type TheLoHowItWorksProps = {
  onEnter: () => void;
};

const pulsesActionRows = [
  {
    label: "Post",
    description: "Share a spontaneous plan with the community.",
    accent: "text-[#FF2688]",
    glow: "from-[#FF2688]/25",
  },
  {
    label: "Join",
    description: "Browse and join low-pressure plans happening around you.",
    accent: "text-[#38D1BF]",
    glow: "from-[#38D1BF]/20",
  },
  {
    label: "Chat",
    description: "Use the group chat to make planning feel effortless.",
    accent: "text-[#F3E538]",
    glow: "from-[#F3E538]/15",
  },
  {
    label: "Meet",
    description: "Turn spontaneous plans into real-life moments.",
    accent: "text-[#7B61FF]",
    glow: "from-[#741ADD]/25",
  },
];

const TheLoHowItWorks = ({ onEnter }: TheLoHowItWorksProps) => {
  const ref = useRef(null);
  const scrollContainer = useScrollContainer();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer || undefined,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const steps = [
    {
      icon: Users,
      title: "Join with your LO invite",
      description:
        "Enter Pulse with your invite to access LO groups, events, and members in the community.",
      color: "bg-gradient-to-r from-pink-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Find your groups",
      description:
        "Browse community groups organized around stage of life and identity within The LO.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      icon: CalendarDays,
      title: "Plan together",
      description:
        "Use group chat, prompts, and simple tools to coordinate low-pressure meetups.",
      color: "bg-gradient-to-r from-stone-500 to-rose-500",
    },
    {
      icon: Repeat,
      title: "Keep it going",
      description:
        "After the first plan, Pulse nudges the group toward the next one so friendships can grow.",
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
  ];

  return (
    <section ref={ref} id="lo-how-groups-work" className="relative bg-gray-900 py-12 dark:bg-gray-950">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-10">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-purple-600 opacity-30 blur-3xl animate-ambient-drift" />
        <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-blue-600 blur-3xl animate-sophisticated-float" />
        <div
          className="absolute -bottom-24 left-1/2 h-96 w-96 rounded-full bg-pink-600 opacity-30 blur-3xl animate-ambient-drift"
          style={{ animationDelay: "10s" }}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex items-center justify-center text-sm font-medium uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-elegant-scale"
          >
            Community groups
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-4 max-w-4xl rounded-lg bg-gray-900/40 px-0 py-2 text-3xl font-bold tracking-tight text-white backdrop-blur-sm md:text-5xl"
          >
            How LO groups work on Pulse
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-6 max-w-2xl rounded-lg bg-gray-900/30 p-2 text-lg text-gray-300 backdrop-blur-md"
          >
            Join your groups, chat, plan, and keep meeting up—the simple path from online to in
            person.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, rotateX: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group flex flex-col items-center rounded-xl bg-gray-800/50 p-6 text-center backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${step.color} transition-shadow duration-300 group-hover:shadow-lg`}
              >
                <step.icon size={24} className="text-white" aria-hidden />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                className="mb-3 text-xl font-bold text-white"
              >
                {step.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                className="my-[6px] text-gray-300"
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              variant="default"
              onClick={onEnter}
              className="rounded-full shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 animate-elegant-scale"
            >
              Enter Pulse with The LO
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

function theLoWebContinueUrl(normalizedEmail: string): string {
  const url = new URL("https://web2.pulsenow.app/phoneAuth");
  url.searchParams.set("email", normalizedEmail);
  return url.href;
}

function theLoAppContinueUrl(normalizedEmail: string): string {
  const url = new URL("https://deeplink.kikiapp.eu/login");
  url.searchParams.set("email", normalizedEmail);
  return url.href;
}

const getStoredEmail = () => {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${EMAIL_COOKIE_NAME}=`));

  if (!cookie) {
    return "";
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
};

const storeEmail = (email: string) => {
  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${EMAIL_COOKIE_NAME}=${encodeURIComponent(email)}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secureFlag}`;
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const TheLo = () => {
  const [searchParams] = useSearchParams();
  const partnerPublicKey = useMemo(
    () => searchParams.get("key")?.trim() ?? "",
    [searchParams],
  );
  const hasPartnerKey = partnerPublicKey.length > 0;

  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(true);
  const [error, setError] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [pulseLogoFailed, setPulseLogoFailed] = useState(false);
  const [theLoLogoFailed, setTheLoLogoFailed] = useState(false);
  const [partnerSubmitTarget, setPartnerSubmitTarget] = useState<null | "web" | "app">(null);
  const partnerSubmitBusy = partnerSubmitTarget !== null;
  const partnerSubmitInFlightRef = useRef(false);
  const neuralCanvasRef = useNeuralNetworkAnimation(NEURAL_DOTS, NEURAL_CLUSTERS);

  const seoProps = {
    title: {
      en: "Enter Pulse | Web Version",
      es: "Entra a Pulse | Versión web",
    },
    description: {
      en: "Enter the web version of Pulse or open the Pulse app.",
      es: "Entra a la versión web de Pulse o abre la app de Pulse.",
    },
    pathname: "/the-lo",
    image: "https://s.kikiapp.eu/img/pulselogo.webp",
    keywords: ["Pulse web app", "Pulse login", "open Pulse app", "Pulse web version"],
    type: "website",
    noIndex: true,
  };

  useEffect(() => {
    const storedEmail = getStoredEmail();

    if (storedEmail) {
      setSavedEmail(storedEmail);
      setEmail(storedEmail);
      setIsEditingEmail(false);
    }
  }, []);

  useEffect(() => {
    if (isSheetOpen) {
      loadRecaptchaScriptOnce();
    }
  }, [isSheetOpen]);

  const rememberTipText = useMemo(() => {
    if (savedEmail && !isEditingEmail) {
      return null;
    }
    return "We’ll remember this email on this device for next time.";
  }, [isEditingEmail, savedEmail]);

  const getNormalizedEmailOrSetError = (): string | null => {
    let normalized: string;
    if (savedEmail && !isEditingEmail) {
      normalized = savedEmail.trim().toLowerCase();
      if (!isValidEmail(normalized)) {
        setError("Enter a valid email address to continue.");
        return null;
      }
      return normalized;
    }
    normalized = email.trim().toLowerCase();
    if (!isValidEmail(normalized)) {
      setError("Enter a valid email address to continue.");
      return null;
    }
    return normalized;
  };

  const handleWebSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (partnerSubmitInFlightRef.current) {
      return;
    }

    if (!hasPartnerKey) {
      setError("Open this page from your partner link (missing key).");
      return;
    }

    const normalizedEmail = getNormalizedEmailOrSetError();
    if (!normalizedEmail) {
      return;
    }

    partnerSubmitInFlightRef.current = true;
    setError("");
    setPartnerSubmitTarget("web");
    try {
      await submitTheLoPartnerMember(normalizedEmail, partnerPublicKey);

      storeEmail(normalizedEmail);
      const shouldUpdateSavedState = !savedEmail || isEditingEmail;
      if (shouldUpdateSavedState) {
        setSavedEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsEditingEmail(false);
      }

      window.location.assign(theLoWebContinueUrl(normalizedEmail));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to continue. Please try again.";
      setError(msg);
      setPartnerSubmitTarget(null);
      partnerSubmitInFlightRef.current = false;
    }
  };

  const handleOpenApp = async () => {
    if (partnerSubmitInFlightRef.current) {
      return;
    }

    if (!hasPartnerKey) {
      setError("Open this page from your partner link (missing key).");
      return;
    }

    const normalizedEmail = getNormalizedEmailOrSetError();
    if (!normalizedEmail) {
      return;
    }

    partnerSubmitInFlightRef.current = true;
    setError("");
    setPartnerSubmitTarget("app");
    try {
      await submitTheLoPartnerMember(normalizedEmail, partnerPublicKey);

      storeEmail(normalizedEmail);
      const shouldUpdateSavedState = !savedEmail || isEditingEmail;
      if (shouldUpdateSavedState) {
        setSavedEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsEditingEmail(false);
      }

      window.location.assign(theLoAppContinueUrl(normalizedEmail));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to continue. Please try again.";
      setError(msg);
      setPartnerSubmitTarget(null);
      partnerSubmitInFlightRef.current = false;
    }
  };

  const handleEditEmail = () => {
    setIsSheetOpen(true);
    setIsEditingEmail(true);
    setError("");
  };

  const handleSheetPointerUp = (clientY: number) => {
    if (dragStartY === null) {
      return;
    }

    const dragDistance = clientY - dragStartY;

    if (dragDistance < -28) {
      setIsSheetOpen(true);
    } else if (dragDistance > 28 && !partnerSubmitBusy) {
      setIsSheetOpen(false);
    }

    setDragStartY(null);
  };

  return (
    <>
      <Seo {...seoProps} />
      <div
        className="h-[100dvh] overflow-x-hidden overflow-y-auto bg-[#15191C] text-white"
        style={{ scrollPaddingBottom: THE_LO_SCROLL_CLEARANCE }}
      >
        <main className="relative min-h-[100dvh]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,38,136,0.34),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,209,191,0.24),transparent_28%),radial-gradient(circle_at_50%_86%,rgba(116,26,221,0.35),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_80px)] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15191C]/45 via-[#15191C]/80 to-[#15191C]" />
          </div>

          <section
            id="hero"
            className="relative z-10 flex min-h-[calc(100dvh-6.75rem)] items-center justify-center overflow-hidden"
          >
            <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#FF2688]/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#38D1BF]/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#741ADD]/25 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10)_0_1px,transparent_1px_96px)] opacity-20" />
            <div
              className="pointer-events-none absolute top-1/4 left-10 h-16 w-16 rounded-full bg-[#FF2688]/30 animate-sophisticated-float"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-1/4 right-10 h-24 w-24 rounded-full bg-[#741ADD]/30 animate-ambient-drift"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-1/3 right-1/4 h-12 w-12 rounded-full bg-[#38D1BF]/30 animate-sophisticated-float"
              style={{ animationDelay: "3s" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-2/3 left-1/4 h-20 w-20 rounded-full bg-[#FF2688]/20 animate-ambient-drift"
              style={{ animationDelay: "0s" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-1/2 right-1/3 h-8 w-8 rounded-full bg-[#38D1BF]/20 animate-sophisticated-float"
              style={{ animationDelay: "12s" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-1/3 left-1/3 h-14 w-14 rounded-full bg-[#741ADD]/25 animate-ambient-drift"
              style={{ animationDelay: "3s" }}
              aria-hidden
            />

            <div className="container relative mx-auto px-5 py-16 sm:px-8 md:py-24">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto flex max-w-4xl flex-col items-center text-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                    Partnership between
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    {pulseLogoFailed ? (
                      <span className="text-3xl font-black leading-none bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] bg-clip-text text-transparent sm:text-4xl md:text-5xl">
                        Pulse
                      </span>
                    ) : (
                      <img
                        src={PULSE_LOGO_URL}
                        alt="Pulse"
                        width={336}
                        height={134}
                        className={`${HERO_PARTNER_LOGO_CLASS} max-w-[min(100%,14.4rem)]`}
                        decoding="async"
                        onError={() => setPulseLogoFailed(true)}
                      />
                    )}
                    <span
                      className="select-none self-center text-2xl font-medium leading-none text-white/55 sm:text-3xl md:text-4xl"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    {theLoLogoFailed ? (
                      <span className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">The LO.</span>
                    ) : (
                      <img
                        src={THE_LO_LOGO_URL}
                        alt="The LO"
                        width={432}
                        height={86}
                        className={`${HERO_PARTNER_LOGO_CLASS} max-w-[min(100%,18rem)]`}
                        decoding="async"
                        onError={() => setTheLoLogoFailed(true)}
                      />
                    )}
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 40, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 max-w-5xl text-4xl font-black leading-[0.98] tracking-tight drop-shadow-xl sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span className="pulse-gradient-text">Meet New Friends</span>
                  <span className="mt-1 block text-white sm:mt-2">in The LO community</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
                >
                  Use Pulse with your LO invite to connect with the community—chat, plan casual
                  meetups, and show up together.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8"
                >
                  <button
                    type="button"
                    onClick={() => setIsSheetOpen(true)}
                    className="inline-flex min-h-11 animate-elegant-scale items-center justify-center rounded-full bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-8 py-3 text-base font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#38D1BF]/50 focus:ring-offset-2 focus:ring-offset-[#15191C]"
                  >
                    Enter Pulse with The LO
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <ScrollIndicator
                    href="#how-it-works"
                    variant="dark"
                    label="Scroll down to see how it works"
                    className="mt-10"
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          <div className="relative z-10 mx-auto w-full pb-0 text-center">
              <TheLoHowItWorksJourney />

              <div className="relative mx-auto mt-10 overflow-hidden px-4 py-12 text-left sm:px-6 md:px-8 md:py-16">
                <div className="pointer-events-none absolute left-0 top-8 h-80 w-80 rounded-full bg-[#FF2688]/12 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-16 h-96 w-96 rounded-full bg-[#38D1BF]/12 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-[#741ADD]/12 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-[#38D1BF]">
                      Low-pressure meetups
                    </span>
                    <h2 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
                      Pulses: lightweight social plans for The LO community
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
                      Keep the community active between events with casual plans members can post,
                      join, chat about, and turn into real-life moments.
                    </p>

                    <div className="mt-8 space-y-3">
                      {pulsesActionRows.map((row) => (
                        <div
                          key={row.label}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.075] via-white/[0.025] to-transparent p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
                        >
                          <div
                            className={`pointer-events-none absolute -left-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br ${row.glow} to-transparent blur-3xl transition duration-300 group-hover:opacity-90`}
                          />
                          <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                            <div className={`min-w-24 text-3xl font-bold uppercase leading-none md:text-4xl ${row.accent}`}>
                              {row.label}
                            </div>
                            <p className="text-base leading-relaxed text-white/78 md:text-lg">
                              {row.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm font-semibold text-white/65 backdrop-blur-sm md:text-base">
                      <span className="text-white/50">Pulses can be visible to:</span>{" "}
                      <span className="text-[#38D1BF]">Public • Community • Friends • Groups</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 28, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex min-h-[30rem] items-start justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02] pt-6 backdrop-blur-sm lg:min-h-[36rem]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,38,136,0.16),transparent_30%),radial-gradient(circle_at_78%_45%,rgba(56,209,191,0.14),transparent_32%)]" />
                    <img
                      src={memberActivationSteps[1].image}
                      alt={memberActivationSteps[1].imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 h-[34rem] w-full object-contain object-top drop-shadow-2xl lg:h-[40rem]"
                    />
                  </motion.div>
                </div>
              </div>

              <TheLoHowItWorks onEnter={() => setIsSheetOpen(true)} />

              <TheLoCommunityEventsSection onEnter={() => setIsSheetOpen(true)} />

              <div className="relative mx-auto mt-8 overflow-hidden py-16 text-center md:py-20">
                <div className="absolute inset-0">
                  <canvas
                    ref={neuralCanvasRef}
                    className="h-full w-full cursor-pointer opacity-35"
                    title=""
                    aria-hidden
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,38,136,0.14),transparent_30%),radial-gradient(circle_at_70%_65%,rgba(56,209,191,0.14),transparent_32%),linear-gradient(180deg,rgba(21,25,28,0.08),rgba(21,25,28,0.62))]" />

                <div className="container relative z-10 mx-auto px-4">
                  <div className="mx-auto max-w-4xl">
                    <div className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#B35CFF]">
                      <Users className="h-4 w-4 text-[#B35CFF]" aria-hidden />
                      <span>LO community on Pulse</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                      Stay connected with{" "}
                      <span className="bg-gradient-to-r from-[#FF2688] via-[#B35CFF] to-[#38D1BF] bg-clip-text text-transparent">
                        your LO community
                      </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                      Groups, casual Pulses, and official events—all in one place so you can keep
                      building friendships beyond the big moments.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsSheetOpen(true)}
                      className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.02] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#38D1BF]/50 focus:ring-offset-2 focus:ring-offset-[#15191C]"
                    >
                      Enter Pulse with The LO
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>

              <TheLoFooter />

          </div>

          <TheLoEntryPanel
            isOpen={isSheetOpen}
            onOpen={() => setIsSheetOpen(true)}
            onClose={() => setIsSheetOpen(false)}
            hasPartnerKey={hasPartnerKey}
            email={email}
            setEmail={setEmail}
            savedEmail={savedEmail}
            isEditingEmail={isEditingEmail}
            error={error}
            setError={setError}
            rememberTipText={rememberTipText}
            partnerSubmitBusy={partnerSubmitBusy}
            partnerSubmitTarget={partnerSubmitTarget}
            onWebSubmit={handleWebSubmit}
            onOpenApp={handleOpenApp}
            onEditEmail={handleEditEmail}
            dragStartY={dragStartY}
            setDragStartY={setDragStartY}
            onSheetPointerUp={handleSheetPointerUp}
          />
        </main>
      </div>
    </>
  );
};

export default TheLo;
