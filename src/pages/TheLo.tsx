import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronUp, ExternalLink, Mail, PenLine, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/hooks/useSeo";
import { submitTheLoPartnerMember } from "@/lib/theLoPartnerApi";

const WEB_LOGIN_BASE = "https://web2.pulsenow.app/login";
const APP_LOGIN_BASE = "https://deeplink.pulsenow.app/login";
const THE_LO_LOGO_URL =
  "https://images.squarespace-cdn.com/content/v1/647bbaf9b744834809e39011/07266d43-0cfc-4479-80f3-019ab3d965bf/White-THELO_RGB_Logo_Horizontal_Light.png?format=1500w";
const EMAIL_COOKIE_NAME = "pulse_the_lo_email";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

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
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(true);
  const [error, setError] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [theLoLogoFailed, setTheLoLogoFailed] = useState(false);
  const [partnerSubmitLoading, setPartnerSubmitLoading] = useState(false);

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
  };

  useEffect(() => {
    const storedEmail = getStoredEmail();

    if (storedEmail) {
      setSavedEmail(storedEmail);
      setEmail(storedEmail);
      setIsEditingEmail(false);
    }
  }, []);

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

    const normalizedEmail = getNormalizedEmailOrSetError();
    if (!normalizedEmail) {
      return;
    }

    setError("");
    setPartnerSubmitLoading(true);
    try {
      await submitTheLoPartnerMember(normalizedEmail);

      storeEmail(normalizedEmail);
      const shouldUpdateSavedState = !savedEmail || isEditingEmail;
      if (shouldUpdateSavedState) {
        setSavedEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsEditingEmail(false);
      }

      window.location.assign(`${WEB_LOGIN_BASE}/${encodeURIComponent(normalizedEmail)}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to continue. Please try again.";
      setError(msg);
      setPartnerSubmitLoading(false);
    }
  };

  const handleOpenApp = async () => {
    const normalizedEmail = getNormalizedEmailOrSetError();
    if (!normalizedEmail) {
      return;
    }

    setError("");
    setPartnerSubmitLoading(true);
    try {
      await submitTheLoPartnerMember(normalizedEmail);

      storeEmail(normalizedEmail);
      const shouldUpdateSavedState = !savedEmail || isEditingEmail;
      if (shouldUpdateSavedState) {
        setSavedEmail(normalizedEmail);
        setEmail(normalizedEmail);
        setIsEditingEmail(false);
      }

      window.location.assign(`${APP_LOGIN_BASE}/${encodeURIComponent(normalizedEmail)}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unable to continue. Please try again.";
      setError(msg);
      setPartnerSubmitLoading(false);
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
    } else if (dragDistance > 28) {
      setIsSheetOpen(false);
    }

    setDragStartY(null);
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-[100dvh] overflow-hidden bg-[#15191C] text-white">
        <main className="relative min-h-[100dvh]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,38,136,0.34),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,209,191,0.24),transparent_28%),radial-gradient(circle_at_50%_86%,rgba(116,26,221,0.35),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_80px)] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15191C]/45 via-[#15191C]/80 to-[#15191C]" />
          </div>

          <section className="container relative z-10 mx-auto flex min-h-[100dvh] items-start px-4 pb-40 pt-14 sm:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="tracking-tight">
                <span className="mb-1 block text-base font-medium leading-snug tracking-wide text-white/85 sm:text-lg md:text-lg">
                  Partnership between
                </span>
                <span className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-4xl sm:text-5xl md:text-6xl">
                  <span className="font-black bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] bg-clip-text text-transparent">
                    Pulse
                  </span>
                  <span
                    className="select-none self-center px-1 text-3xl font-medium leading-none text-white/65 sm:text-4xl md:text-[2.5rem]"
                    aria-hidden="true"
                  >
                    +
                  </span>
                  {theLoLogoFailed ? (
                    <span className="text-3xl font-bold text-white sm:text-4xl md:text-4xl">The LO.</span>
                  ) : (
                    <img
                      src={THE_LO_LOGO_URL}
                      alt="The LO"
                      width={360}
                      height={72}
                      className="h-9 max-h-10 w-auto max-w-[min(100%,18rem)] object-contain object-center sm:h-11 sm:max-h-12 md:h-12"
                      decoding="async"
                      onError={() => setTheLoLogoFailed(true)}
                    />
                  )}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
                Placeholder section about Pulse and who we are.
              </p>

              <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
                {["Meet through shared energy", "Continue in Pulse", "Use web or app"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-[#15191C]">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-white/85">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {isSheetOpen && (
            <button
              type="button"
              aria-label="Collapse entry panel"
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px]"
            />
          )}

          <motion.aside
            initial={false}
            animate={{ y: isSheetOpen ? "0%" : "calc(100% - 6.75rem)" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-40 mx-auto h-[86dvh] max-w-xl rounded-t-[2rem] border border-white/15 bg-[#111518]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
            aria-label="Enter Pulse panel"
          >
            <div className="absolute -inset-x-4 -top-4 h-24 rounded-[2rem] bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] opacity-30 blur-3xl" />
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#38D1BF]/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#FF2688]/20 blur-3xl" />

            <button
              type="button"
              onClick={() => setIsSheetOpen(true)}
              onPointerDown={(event) => setDragStartY(event.clientY)}
              onPointerUp={(event) => handleSheetPointerUp(event.clientY)}
              className="relative flex min-h-[6.75rem] w-full touch-pan-y items-center gap-3 px-6 py-5 text-left sm:px-8"
              aria-expanded={isSheetOpen}
            >
              <span className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/25" />
              <img
                src="https://s.kikiapp.eu/img/pulselogo.webp"
                alt=""
                className="h-14 w-14 rounded-2xl shadow-lg shadow-[#FF2688]/20"
                width={56}
                height={56}
                decoding="async"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-[0.28em] text-white/45">Pulse</span>
                <span className="block text-2xl font-bold">Enter Pulse</span>
              </span>
              <ChevronUp
                className={`h-6 w-6 text-white/55 transition-transform duration-300 ${
                  isSheetOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSheetOpen && (
              <div className="relative max-h-[calc(86dvh-6.75rem)] overflow-y-auto px-6 pb-8 sm:px-8">
                <form onSubmit={handleWebSubmit} className="space-y-4 pt-2">
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
                          disabled={partnerSubmitLoading}
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
                      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/60 sm:gap-x-6">
                        <span className="min-w-0 break-words text-center sm:text-left">
                          Continuing with {savedEmail}
                        </span>
                        <button
                          type="button"
                          disabled={partnerSubmitLoading}
                          onClick={handleEditEmail}
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
                    disabled={partnerSubmitLoading}
                    className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-base font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.01] hover:opacity-95 disabled:pointer-events-none disabled:opacity-55"
                  >
                    {partnerSubmitLoading ? (
                      "Working…"
                    ) : (
                      <>
                        Enter web version of Pulse
                        <ArrowRight className="h-5 w-5" />
                      </>
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
                  disabled={partnerSubmitLoading}
                  onClick={handleOpenApp}
                  className="h-14 w-full rounded-2xl border-white/15 bg-white/[0.06] text-base font-bold text-white hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-55"
                >
                  <Smartphone className="h-5 w-5 text-[#38D1BF]" />
                  {partnerSubmitLoading ? "Working…" : "Open the App"}
                  <ExternalLink className="h-4 w-4 text-white/55" />
                </Button>

                <p className="mt-5 text-center text-xs leading-relaxed text-white/42">
                  Push notifications are more reliable in the Pulse app than on the web version—open the app if you don’t want to miss updates.
                </p>
              </div>
            )}
          </motion.aside>
        </main>
      </div>
    </>
  );
};

export default TheLo;
