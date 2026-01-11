import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield } from "lucide-react";

const TERMS_URLS = {
  en: "https://api.kikiapp.eu/auth/legal/en/terms.html",
  es: "https://api.kikiapp.eu/auth/legal/es/terms.html",
} as const;

const TERMS_PROXY_URLS = {
  en: "/api/legal/terms?lang=en",
  es: "/api/legal/terms?lang=es",
} as const;

function stripScripts(html: string) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function decodeCloudflareEmail(cfemail: string) {
  const key = parseInt(cfemail.slice(0, 2), 16);
  let out = "";
  for (let i = 2; i < cfemail.length; i += 2) {
    const code = parseInt(cfemail.slice(i, i + 2), 16) ^ key;
    out += String.fromCharCode(code);
  }
  return out;
}

function decodeCloudflareEmailsInHtml(html: string) {
  try {
    if (typeof window === "undefined" || typeof DOMParser === "undefined") return html;

    const doc = new DOMParser().parseFromString(`<div id="__root__">${html}</div>`, "text/html");
    const root = doc.getElementById("__root__");
    if (!root) return html;

    const nodes = root.querySelectorAll<HTMLElement>("[data-cfemail]");
    nodes.forEach((node) => {
      const cfemail = node.getAttribute("data-cfemail");
      if (!cfemail) return;
      const email = decodeCloudflareEmail(cfemail);
      node.textContent = email;

      const a = node.closest("a");
      if (a && (a.getAttribute("href") || "").includes("/cdn-cgi/l/email-protection")) {
        a.setAttribute("href", `mailto:${email}`);
      }
    });

    return root.innerHTML;
  } catch {
    return html;
  }
}

function extractBodyHtml(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = stripScripts((match?.[1] ?? html).trim());
  return decodeCloudflareEmailsInHtml(body);
}

function looksLikeSpaIndexHtml(html: string) {
  return /\/@react-refresh|vite\/client/i.test(html) || /<div[^>]+id=["']root["']/i.test(html);
}

const Terms: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const seoProps = {
    title: {
      en: "Terms of Service | Pulse",
      es: "Términos de Servicio | Pulse"
    },
    description: {
      en: "Read the Terms of Service for the Pulse website.",
      es: "Lee los Términos de Servicio del sitio web de Pulse."
    },
    pathname: "/terms",
    type: "website",
    section: "Legal"
  };

  const url = useMemo(() => {
    return currentLanguage === "es" ? TERMS_URLS.es : TERMS_URLS.en;
  }, [currentLanguage]);

  const proxyUrl = useMemo(() => {
    return currentLanguage === "es" ? TERMS_PROXY_URLS.es : TERMS_PROXY_URLS.en;
  }, [currentLanguage]);

  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "loaded"; html: string }
    | { status: "error"; message?: string }
  >({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    (async () => {
      try {
        const candidates = [proxyUrl, url];
        let lastError: unknown = undefined;

        for (const candidate of candidates) {
          try {
            const res = await fetch(candidate, {
              method: "GET",
              headers: { Accept: "text/html" },
              signal: controller.signal,
            });
            if (!res.ok) throw new Error(`Failed to load terms (${res.status})`);

            const html = await res.text();
            if (candidate === proxyUrl && looksLikeSpaIndexHtml(html)) {
              throw new Error("Proxy route returned SPA HTML (dev server). Falling back.");
            }
            setState({ status: "loaded", html: extractBodyHtml(html) });
            return;
          } catch (e) {
            if (controller.signal.aborted) return;
            lastError = e;
          }
        }

        throw lastError ?? new Error("Failed to load terms");
      } catch (err) {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : undefined;
        setState({ status: "error", message });
      }
    })();

    return () => controller.abort();
  }, [proxyUrl, url]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-600 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-[40px]">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-4">
                <Shield size={56} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {t("legal.terms.title", "Terms of Service")}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 relative">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700 p-6 md:p-10 leading-relaxed text-gray-200">
            {state.status === "loading" && (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-700/60 rounded w-2/3 mb-4" />
                <div className="h-4 bg-gray-700/60 rounded w-full mb-2" />
                <div className="h-4 bg-gray-700/60 rounded w-11/12 mb-2" />
                <div className="h-4 bg-gray-700/60 rounded w-10/12 mb-6" />
                <div className="h-4 bg-gray-700/60 rounded w-full mb-2" />
                <div className="h-4 bg-gray-700/60 rounded w-5/6 mb-2" />
                <div className="h-4 bg-gray-700/60 rounded w-3/4" />
              </div>
            )}

            {state.status === "loaded" && (
              <div
                className="prose prose-invert max-w-none text-gray-200 prose-headings:text-white prose-a:text-[#38D1BF] prose-a:no-underline prose-a:hover:underline prose-strong:text-white prose-li:marker:text-gray-400 prose-hr:border-gray-700"
                dangerouslySetInnerHTML={{ __html: state.html }}
              />
            )}

            {state.status === "error" && (
              <div className="space-y-4">
                <p className="text-gray-200">
                  {t("legal.remote_load_failed", "We couldn't load the policy content right now.")}
                </p>
                {state.message && (
                  <p className="text-sm text-gray-400">
                    {t("legal.error_details", "Details")}: {state.message}
                  </p>
                )}
                <p className="text-gray-200">
                  <a className="text-[#38D1BF] hover:underline" href={url} target="_blank" rel="noreferrer">
                    {t("legal.open_in_new_tab", "Open the policy in a new tab")}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;


