import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Mail, PenLine, Smartphone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Seo } from "@/hooks/useSeo";

const WEB_VERSION_URL = "https://web2.pulsenow.app";
const APP_DEEPLINK_URL = "https://deeplink.pulsenow.app";
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

  const helperText = useMemo(() => {
    if (savedEmail && !isEditingEmail) {
      return `Continuing with ${savedEmail}`;
    }

    return "We’ll remember this email on this device for next time.";
  }, [isEditingEmail, savedEmail]);

  const openWebVersion = () => {
    window.location.href = WEB_VERSION_URL;
  };

  const handleWebSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!savedEmail || isEditingEmail) {
      if (!isValidEmail(normalizedEmail)) {
        setError("Enter a valid email address to continue.");
        return;
      }

      storeEmail(normalizedEmail);
      setSavedEmail(normalizedEmail);
      setEmail(normalizedEmail);
      setIsEditingEmail(false);
    }

    setError("");
    openWebVersion();
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setError("");
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen overflow-hidden bg-[#15191C] text-white">
        <Navbar />

        <main className="relative min-h-screen pt-28 md:pt-32">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,38,136,0.34),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(56,209,191,0.24),transparent_28%),radial-gradient(circle_at_50%_86%,rgba(116,26,221,0.35),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_80px)] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15191C]/45 via-[#15191C]/80 to-[#15191C]" />
          </div>

          <section className="container relative z-10 mx-auto px-4 pb-20">
            <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 shadow-lg shadow-[#FF2688]/10 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-[#38D1BF]" />
                  Pulse web access
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Enter Pulse,
                  <span className="block bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] bg-clip-text text-transparent">
                    your way.
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/72 lg:mx-0 md:text-xl">
                  Jump into the web version from any browser, or open the app if it’s already on your phone.
                </p>

                <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
                  {["Save your email", "Enter the web app", "Open mobile app"].map((item, index) => (
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

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="relative mx-auto w-full max-w-md"
              >
                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] opacity-35 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#111518]/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#38D1BF]/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#FF2688]/20 blur-3xl" />

                  <div className="relative">
                    <div className="mb-7 flex items-center gap-3">
                      <img
                        src="https://s.kikiapp.eu/img/pulselogo.webp"
                        alt="Pulse app icon"
                        className="h-14 w-14 rounded-2xl shadow-lg shadow-[#FF2688]/20"
                        width={56}
                        height={56}
                        decoding="async"
                      />
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-white/45">Pulse</p>
                        <h2 className="text-2xl font-bold">Choose how to enter</h2>
                      </div>
                    </div>

                    <form onSubmit={handleWebSubmit} className="space-y-4">
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
                              className="h-14 rounded-2xl border-white/15 bg-white/10 pl-12 text-base text-white placeholder:text-white/35 focus-visible:ring-[#FF2688]"
                              aria-invalid={Boolean(error)}
                            />
                          </div>
                        </label>
                      )}

                      {savedEmail && !isEditingEmail && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Saved email</p>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <p className="truncate font-semibold text-white">{savedEmail}</p>
                            <button
                              type="button"
                              onClick={handleEditEmail}
                              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/75 transition hover:border-white/30 hover:text-white"
                            >
                              <PenLine className="h-3.5 w-3.5" />
                              Edit
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="min-h-5">
                        {error ? (
                          <p className="text-sm text-[#FF7BB8]" role="alert">
                            {error}
                          </p>
                        ) : (
                          <p className="text-sm text-white/50">{helperText}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="xl"
                        className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-base font-bold text-white shadow-xl shadow-[#FF2688]/20 transition hover:scale-[1.01] hover:opacity-95"
                      >
                        Enter web version of Pulse
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </form>

                    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/35">
                      <span className="h-px flex-1 bg-white/10" />
                      or
                      <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="h-14 w-full rounded-2xl border-white/15 bg-white/[0.06] text-base font-bold text-white hover:bg-white/10 hover:text-white"
                    >
                      <a href={APP_DEEPLINK_URL} rel="noopener noreferrer">
                        <Smartphone className="h-5 w-5 text-[#38D1BF]" />
                        Open the App
                        <ExternalLink className="h-4 w-4 text-white/55" />
                      </a>
                    </Button>

                    <p className="mt-5 text-center text-xs leading-relaxed text-white/42">
                      Use the web version when you’re on desktop. Use the app button when you want Pulse to open on your phone.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TheLo;
