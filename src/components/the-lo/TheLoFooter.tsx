import { Link } from "react-router-dom";
import { THE_LO_SCROLL_CLEARANCE } from "@/components/the-lo/theLoLayout";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
] as const;

const legalLinks = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/community-guidelines", label: "Guidelines" },
] as const;

const PULSE_LOGO_URL = "https://s.kikiapp.eu/img/pulselogo.webp";

const linkClassName =
  "text-white/55 transition-colors hover:text-[#38D1BF] focus:outline-none focus-visible:text-[#38D1BF] focus-visible:underline";

const TheLoFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-4" aria-label="Page footer">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,38,136,0.08),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(56,209,191,0.06),transparent_35%)]"
        aria-hidden
      />

      <div className="relative z-10 border-t border-white/10 pt-10 md:pt-12">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <img
              src={PULSE_LOGO_URL}
              alt="Pulse"
              width={120}
              height={48}
              className="mx-auto h-10 w-auto object-contain opacity-90 md:h-12"
              loading="lazy"
              decoding="async"
            />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Pulse × The LO
            </p>

            <nav
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
              aria-label="Site"
            >
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className={linkClassName}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 mt-8 border-t border-white/[0.06] bg-gradient-to-b from-[#15191C] via-[#13171a] to-[#111518] px-5 pt-6 sm:px-8"
        style={{ paddingBottom: THE_LO_SCROLL_CLEARANCE }}
      >
        <div className="container mx-auto">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs text-white/45"
              aria-label="Legal"
            >
              {legalLinks.map((link, index) => (
                <span key={link.to} className="inline-flex items-center">
                  {index > 0 && (
                    <span className="mx-2 select-none text-white/20" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link to={link.to} className={linkClassName}>
                    {link.label}
                  </Link>
                </span>
              ))}
            </nav>
            <p className="text-[11px] leading-relaxed text-white/35">
              &copy; {currentYear} Pulse Now Co.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TheLoFooter;
