import React from "react";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const Download = () => {
  const { t } = useTranslation();

  const seoProps = {
    title: {
      en: "Download Pulse | iOS & Android",
      es: "Descarga Pulse | iOS y Android"
    },
    description: {
      en: "Get the Pulse app to continue. Match into small groups and make plans in real life.",
      es: "Descarga la app Pulse para continuar. Únete a grupos pequeños y haz planes en la vida real."
    },
    pathname: "/download",
    image: "https://s.kikiapp.eu/img/press/1024x.png",
    keywords: [
      "Pulse app download",
      "Pulse iOS",
      "Pulse Android",
      "friendship app",
      "make friends"
    ],
    type: "website"
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />

        {/* Hero Section (matches site style) */}
        <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-purple-600/25 blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-pink-600/20 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0)_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Row 1: Big app icon */}
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
              {/* Row 2: Headline */}
              <h1 className="text-3xl md:text-5xl font-extrabold md:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] mb-3">
                {t("download.title", "Download Pulse to continue")}
              </h1>
              <p className="text-lg text-gray-300">
                {t(
                  "download.subtitle",
                  "Install the app to join your crew and make plans IRL."
                )}
              </p>
              <p className="text-sm md:text-base text-white/80 mt-4 max-w-2xl mx-auto">
                {t(
                  "download.wait_message",
                  "Groups don’t always start instantly—it can take time to match the right mix of people."
                )} {t(
                  "download.speed_tip",
                  "Download now and answer your intro question to help us kick off your group faster."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Download + Social */}
        <main className="px-4 pt-8 pb-16">
          <div className="w-full max-w-2xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <h2 className="text-sm md:text-base font-semibold mb-2">
                  {t("download.ios_headline", "iOS · App Store")}
                </h2>
                <a
                href="https://apple.pulsenow.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors mx-auto p-2 md:p-3"
              >
                <img
                  src="https://s.kikiapp.eu/img/apple.png"
                  alt={t("download.app_store", "Download on the App Store")}
                  className="h-24 md:h-[7.5rem] w-auto object-contain"
                  loading="eager"
                  decoding="async"
                />
              </a>
              </div>

              <div className="flex flex-col items-center">
                <h2 className="text-sm md:text-base font-semibold mb-2">
                  {t("download.android_headline", "Android · Google Play")}
                </h2>
                <a
                href="https://google.pulsenow.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors mx-auto p-2 md:p-3"
              >
                <img
                  src="https://s.kikiapp.eu/img/google.png"
                  alt={t("download.google_play", "Get it on Google Play")}
                  className="h-24 md:h-[7.5rem] w-auto object-contain"
                  loading="eager"
                  decoding="async"
                />
              </a>
              </div>
            </div>

            <p className="text-[13px] text-white/50 mt-6">
              {t(
                "download.note",
                "After installing, open the app to finish setting up your group."
              )}
            </p>

            {/* Social: prominent follow/share ask */}
            <div className="mt-10">
              <h3 className="text-base font-semibold mb-1">
                {t("download.social_title", "Help your group start faster")}
              </h3>
              <p className="text-white/70 text-sm mb-4">
                {t(
                  "download.social_desc",
                  "Follow us and share with your audience so more people join—this helps kick off groups sooner."
                )}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 justify-center">
                <a href="https://instagram.pulsenow.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors py-3 px-4" aria-label="Instagram">
                  <Instagram size={20} className="text-white" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61570738108928" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors py-3 px-4" aria-label="Facebook">
                  <Facebook size={20} className="text-white" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/pulse-plans/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors py-3 px-4" aria-label="LinkedIn">
                  <Linkedin size={20} className="text-white" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="https://www.reddit.com/r/PulseMeetNewFriends/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors py-3 px-4" aria-label="Reddit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                  <span className="text-sm font-medium">Reddit</span>
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Download;


