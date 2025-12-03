import React, { useMemo, useEffect } from "react";
import { Seo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { trackMetaPixelEvent } from "@/lib/utils";

const AlmostThere = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const cityLabel = searchParams.get("citylabel") || "";
  const redirect = searchParams.get("redirect") || "";
  const email = searchParams.get("email") || "";
  const isQueer = (searchParams.get("queer") || "").toLowerCase() === "true";

  const shareUrl = redirect || "https://pulsenow.app/cities";

  const seoProps = {
    title: {
      en: "Almost there | Pulse",
      es: "¡Casi listo! | Pulse",
    },
    description: {
      en: "You're all set for your friend group match. Download the app and invite friends so your group launches faster.",
      es: "Todo listo para tu grupo de amigos. Descarga la app e invita a amigos para lanzar tu grupo más rápido.",
    },
    pathname: "/almost-there",
    image: "https://s.kikiapp.eu/img/press/1024x.png",
    keywords: ["Pulse", "friend groups", "download", "invite friends", "matchmaking"],
    type: "website",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: t("almost_there.copy.success_title", "Link copied"),
        description: t("almost_there.copy.success_desc", "Share it with friends to help your group form faster."),
      });
    } catch {
      toast({
        title: t("almost_there.copy.error_title", "Couldn’t copy link"),
        description: t("almost_there.copy.error_desc", "Please copy it manually."),
        variant: "destructive",
      });
    }
  };

  const headline = (() => {
    if (isQueer) {
      return cityLabel
        ? t("almost_there.headline_queer.in_city", "You’re almost set for your queer friend group match in {city}.").replace("{city}", cityLabel)
        : t("almost_there.headline_queer.generic", "You’re almost set for your queer friend group match.");
    }
    return cityLabel
      ? t("almost_there.headline.in_city", "You’re all set for your friend group match in {city}.").replace("{city}", cityLabel)
      : t("almost_there.headline.generic", "You’re all set for your friend group match.");
  })();

  const afterInstallEmail = email || t("almost_there.after_install_hint", "the same email you used here");

  // Track signup_complete event when page loads
  useEffect(() => {
    const metaPayload = {
      city: cityLabel,
      is_queer: isQueer,
      path: location.pathname + location.search,
    };
    trackMetaPixelEvent('signup_complete', metaPayload, { custom: true });
  }, []); // Only run once on mount

  const handleAppStoreClick = (store: 'apple' | 'google') => {
    const metaPayload = {
      store,
      city: cityLabel,
      is_queer: isQueer,
      path: location.pathname + location.search,
    };
    trackMetaPixelEvent('signup_complete_app_stores_redirect', metaPayload, { custom: true });
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />

        <section className="relative pt-32 pb-8 md:pt-40 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/25 blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0)_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6">
                <img
                  src="https://s.kikiapp.eu/img/press/1024x.png"
                  alt="Pulse app icon"
                  width={160}
                  height={160}
                  decoding="async"
                  className="mx-auto rounded-2xl shadow-xl"
                />
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold md:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] mb-3">
                {t("almost_there.title", "Almost there!")}
              </h1>

              <p className="text-lg text-gray-300">{headline}</p>
              <p className="text-sm md:text-base text-white/80 mt-4 max-w-2xl mx-auto">
                {t("almost_there.chat_desc", "Your group chat and meetups will happen inside the Pulse app — it’s where you’ll see your matches, icebreakers, and meetup details.")}
              </p>
              <p className="text-sm md:text-base text-white/80 mt-8 max-w-2xl mx-auto">
                {t("almost_there.download_prompt", "Download the app to be ready when your friend group launches.")}
              </p>
              <p className="text-[13px] md:text-sm text-white/70 mt-3 mb-0 max-w-2xl mx-auto">
                {t("almost_there.after_install", "After installing, open Pulse and sign in with {email}.").replace("{email}", afterInstallEmail)}
              </p>
            </div>
          </div>
        </section>

        <main className="px-4 pt-4 pb-16">
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <h2 className="text-sm md:text-base font-semibold mb-2">{t("download.ios_headline", "iOS · App Store")}</h2>
                <a
                  href="https://apple.pulsenow.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleAppStoreClick('apple')}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors mx-auto p-2 md:p-3"
                >
                  <img
                    src="https://s.kikiapp.eu/img/apple.png"
                    alt={t("download.app_store", "Download on the App Store")}
                    className="h-16 md:h-20 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </a>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-sm md:text-base font-semibold mb-2">{t("download.android_headline", "Android · Google Play")}</h2>
                <a
                  href="https://google.pulsenow.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleAppStoreClick('google')}
                  className="inline-flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors mx-auto p-2 md:p-3"
                >
                  <img
                    src="https://s.kikiapp.eu/img/google.png"
                    alt={t("download.google_play", "Get it on Google Play")}
                    className="h-16 md:h-20 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </a>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-1">
                {t("almost_there.fast.title", "Want your group to form faster?")}
              </h3>
              <p className="text-white/80 text-base md:text-lg mb-2">
                {t("almost_there.fast.subtitle", "Invite a few friends who might want to join too.")}
              </p>
              <p className="text-white/70 text-sm mb-4">
                {cityLabel
                  ? t("almost_there.fast.more_in_city", "The more people we have in {city}, the quicker we can create your crew.").replace("{city}", cityLabel)
                  : t("almost_there.fast.more_generic", "The more people we have in your city, the quicker we can create your crew.")}
              </p>

              <div className="bg-gray-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3 justify-between">
                <div className="text-left w-full md:w-auto">
                  <div className="text-xs text-white/60 mb-1">{t("almost_there.share.label", "Share this link:")}</div>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base font-medium text-white hover:underline break-all"
                  >
                    {shareUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>
                <Button onClick={handleCopy} className="w-full md:w-auto">
                  {t("almost_there.share.copy", "Copy to clipboard")}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlmostThere;


