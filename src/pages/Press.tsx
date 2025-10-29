import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Download, Image as ImageIcon, Newspaper } from "lucide-react";
import { Seo } from "@/hooks/useSeo";
import { useTranslation } from "@/hooks/useTranslation";
import { downloadAsset, getFilenameFromUrl } from "@/lib/download";

const MEDIA_KIT_URL = "https://drive.google.com/drive/folders/1EvnYL_LHB0-J28DlWNa0Gt5uoSg9yZ9A";
const PRESS_RELEASES_URL = "https://drive.google.com/drive/folders/1Bb8YS4g2Mi3i-5iMVCIWTv8XfXkJVr02?usp=drive_link";

// Grouped brand assets (categories provided by user)
const brandCategories: Array<{ id: string; defaultName: string; assets: string[] }> = [
  {
    id: "app_logo",
    defaultName: "App Logo",
    assets: [
      "https://s.kikiapp.eu/img/press/1024x.png",
      "https://s.kikiapp.eu/img/press/1024x2.png",
    ],
  },
  {
    id: "full_logo_horizontal",
    defaultName: "Full Logo Horizontal",
    assets: [
      "https://s.kikiapp.eu/img/press/CMHorizontal-1.png",
      "https://s.kikiapp.eu/img/press/CMHorizontal-2.png",
      "https://s.kikiapp.eu/img/press/CMHorizontal-3.png",
      "https://s.kikiapp.eu/img/press/CMHorizontal-4.png",
      "https://s.kikiapp.eu/img/press/CMHorizontal-5.png",
    ],
  },
  {
    id: "full_logo_vertical",
    defaultName: "Full Logo Vertical",
    assets: [
      "https://s.kikiapp.eu/img/press/CMVertical-1.png",
      "https://s.kikiapp.eu/img/press/CMVertical-2.png",
      "https://s.kikiapp.eu/img/press/CMVertical-3.png",
      "https://s.kikiapp.eu/img/press/CMVertical-4.png",
      "https://s.kikiapp.eu/img/press/CMVertical-5.png",
    ],
  },
  {
    id: "logo_icon_only",
    defaultName: "Logo Icon Only",
    assets: [
      "https://s.kikiapp.eu/img/press/Icon-1.png",
      "https://s.kikiapp.eu/img/press/Icon-2.png",
      "https://s.kikiapp.eu/img/press/Icon-3.png",
      "https://s.kikiapp.eu/img/press/Icon-4.png",
      "https://s.kikiapp.eu/img/press/Icon-5.png",
    ],
  },
  {
    id: "logo_name_only",
    defaultName: "Logo Name Only",
    assets: [
      "https://s.kikiapp.eu/img/press/Logo-1.png",
      "https://s.kikiapp.eu/img/press/Logo-2.png",
      "https://s.kikiapp.eu/img/press/Logo-3.png",
      "https://s.kikiapp.eu/img/press/Logo-4.png",
      "https://s.kikiapp.eu/img/press/Logo-5.png",
    ],
  },
  {
    id: "round_profile",
    defaultName: "Round Profile",
    assets: ["https://s.kikiapp.eu/img/press/Logo-blend.jpeg"],
  },
];

// Use the same comprehensive list as the Activities page for full variety
const pipActivityImages = [
  { id: "arcade", name: "Arcade", image: "https://s.kikiapp.eu/img/pip/arcade.png" },
  { id: "board-games", name: "Board Games", image: "https://s.kikiapp.eu/img/pip/boardgames.png" },
  { id: "cycling", name: "Cycling", image: "https://s.kikiapp.eu/img/pip/cycling.png" },
  { id: "escape-rooms", name: "Escape Rooms", image: "https://s.kikiapp.eu/img/pip/escaperoom.png" },
  { id: "gardening", name: "Gardening", image: "https://s.kikiapp.eu/img/pip/gardening.png" },
  { id: "golf", name: "Golf", image: "https://s.kikiapp.eu/img/pip/golf.png" },
  { id: "hiking", name: "Hiking", image: "https://s.kikiapp.eu/img/pip/hiking.png" },
  { id: "pilates", name: "Pilates", image: "https://s.kikiapp.eu/img/pip/pilates.png" },
  { id: "pottery", name: "Pottery", image: "https://s.kikiapp.eu/img/pip/pottery.png" },
  { id: "rock-climbing", name: "Rock Climbing", image: "https://s.kikiapp.eu/img/pip/rockclimbing.png" },
  { id: "scavenger-hunt", name: "Scavenger Hunt", image: "https://s.kikiapp.eu/img/pip/scavengerhunt.png" },
  { id: "surfing", name: "Surfing", image: "https://s.kikiapp.eu/img/pip/surfing.png" },
  { id: "tennis", name: "Tennis", image: "https://s.kikiapp.eu/img/pip/tennis.png" },
  { id: "wine-tasting", name: "Wine Tasting", image: "https://s.kikiapp.eu/img/pip/winetasting.png" },
  { id: "yoga", name: "Yoga", image: "https://s.kikiapp.eu/img/pip/yogaoutdoors.png" },
  { id: "music", name: "Music", image: "https://s.kikiapp.eu/img/pip/music.png" },
  { id: "soccer", name: "Soccer", image: "https://s.kikiapp.eu/img/pip/soccer.png" },
  { id: "basketball", name: "Basketball", image: "https://s.kikiapp.eu/img/pip/basketball.png" },
  { id: "karaoke", name: "Karaoke", image: "https://s.kikiapp.eu/img/pip/karaoke.png" },
  { id: "food-walking-tour", name: "Food Walking Tour", image: "https://s.kikiapp.eu/img/pip/foodwalkingtour.png" },
  { id: "painting-class", name: "Painting Class", image: "https://s.kikiapp.eu/img/pip/paintingclass.png" },
  { id: "brewery", name: "Brewery", image: "https://s.kikiapp.eu/img/pip/brewery.png" },
  { id: "trivia", name: "Trivia", image: "https://s.kikiapp.eu/img/pip/trivia.png" },
  { id: "pool", name: "Pool", image: "https://s.kikiapp.eu/img/pip/pool.png" },
  { id: "poker", name: "Poker", image: "https://s.kikiapp.eu/img/pip/poker.png" },
  { id: "cocktail-bar", name: "Cocktail Bar", image: "https://s.kikiapp.eu/img/pip/cocktailbar.png" },
  { id: "day-tour", name: "Day Tour", image: "https://s.kikiapp.eu/img/pip/tour.png" },
  { id: "gay-bar", name: "Gay Bar", image: "https://s.kikiapp.eu/img/pip/gaybar.png" },
  { id: "photography", name: "Photography", image: "https://s.kikiapp.eu/img/pip/photography.png" },
  { id: "picnic", name: "Picnic", image: "https://s.kikiapp.eu/img/pip/picnic.png" },
  { id: "coffee", name: "Coffee", image: "https://s.kikiapp.eu/img/pip/cafe.png" },
  { id: "dancing", name: "Dancing", image: "https://s.kikiapp.eu/img/pip/dancing.png" },
  { id: "camping", name: "Camping", image: "https://s.kikiapp.eu/img/pip/camping.png" },
  { id: "beach-activities", name: "Beach Activities", image: "https://s.kikiapp.eu/img/pip/beachvolleyball.png" },
  { id: "boat", name: "Boat", image: "https://s.kikiapp.eu/img/pip/boat.png" },
];

const Press: React.FC = () => {
  const { t } = useTranslation();
  const seoProps = {
    title: {
      en: "Press & Media – Pulse",
      es: "Prensa y Medios – Pulse",
    },
    description: {
      en: "Download Pulse logos and Pip images, and access our media kit and press releases.",
      es: "Descarga los logotipos de Pulse e imágenes de Pip, y accede a nuestro media kit y notas de prensa.",
    },
    keywords: ["Pulse", "press", "media kit", "logo", "brand assets", "Pip"],
    type: "website",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Seo {...seoProps} />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-pulse-pink blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-[28rem] h-[28rem] rounded-full bg-pulse-blue blur-3xl" />
        </div>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Glow border card */}
            <div className="p-[1px] rounded-3xl bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue shadow-[0_0_60px_-25px_rgba(147,51,234,0.6)]">
              <div className="rounded-3xl bg-gray-900/70 border border-white/10 backdrop-blur-xl p-7 md:p-10 text-center relative overflow-hidden">
                {/* top accent lights */}
                <div className="pointer-events-none absolute -top-20 left-1/3 w-64 h-64 bg-pulse-pink/20 blur-3xl rounded-full" />
                <div className="pointer-events-none absolute -bottom-24 right-1/4 w-64 h-64 bg-pulse-blue/20 blur-3xl rounded-full" />

                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/5 border border-white/10 mb-4">
                  <ImageIcon size={16} className="text-pulse-pink" />
                  <span>{t("press.badge", "Press & Media")}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue">{t("press.hero.title_highlight", "Brand Assets")}</span>{" "}
                  <span className="text-white">{t("press.hero.title_suffix", "and Press Resources")}</span>
                </h1>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{t("press.hero.subtitle", "Download official logos and Pip images, or open our media kit and the latest press releases.")}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href={MEDIA_KIT_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="gradient" size="xl" className="rounded-full">
                      {t("press.cta.media_kit", "Open Media Kit")}
                      <ExternalLink className="ml-2" />
                    </Button>
                  </a>
                  <a href={PRESS_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="coral" size="xl" className="rounded-full">
                      {t("press.cta.press_releases", "Press Releases")}
                      <Newspaper className="ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">{t("press.assets.title", "Brand Assets")}</h2>
            <a href={MEDIA_KIT_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block">
              <Button variant="ghost" className="text-white/90">
                {t("press.assets.full_media_kit", "Full Media Kit")}
                <ExternalLink className="ml-2" />
              </Button>
            </a>
          </div>
          <p className="text-gray-300 mb-6">{t("press.assets.subtitle", "Our official logos for editorial and press use.")}</p>

          <div className="space-y-6">
            {brandCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-xl font-semibold mb-3">{t(`press.category.${category.id}`, category.defaultName)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.assets.map((url, idx) => (
                    <Card key={`${category.id}-${idx}`} className="bg-gray-800/50 border-gray-700 rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-48 flex items-center justify-center bg-gray-900/60">
                          <img
                            src={url}
                            alt={`${category.defaultName} ${idx + 1}`}
                            className="max-h-28 object-contain"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                          />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white">{t(`press.category.${category.id}`, category.defaultName)} {idx + 1}</div>
                            <div className="text-xs text-gray-400">PNG/JPEG</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                              <Button size="sm" variant="secondary" className="rounded-full">
                                {t("press.assets.open", "Open")}
                                <ExternalLink className="ml-2" />
                              </Button>
                            </a>
                            <Button
                              size="sm"
                              className="rounded-full"
                              onClick={() => downloadAsset(url, `${category.id}-${idx + 1}-${getFilenameFromUrl(url)}`)}
                            >
                              <Download className="mr-2" />{t("press.assets.download", "Download")}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pip Images */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("press.pip.title", "Pip Images")}</h2>
          <p className="text-gray-300 mb-6">{t("press.pip.subtitle", "Download approved images of Pip for editorial use.")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipActivityImages.map((img, idx) => (
              <Card key={`${img.id}-${idx}`} className="bg-gray-800/50 border-gray-700 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-900/60">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={img.image}
                        alt={img.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="inline-block bg-black/60 text-white px-2 py-1 rounded text-[12px] font-medium border border-white/10">
                          {t(`activity.${img.id}` as any, img.name)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="font-medium text-white">{t(`activity.${img.id}` as any, img.name)}</div>
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={() => downloadAsset(img.image, `${img.id}-${getFilenameFromUrl(img.image)}`)}
                    >
                      <Download className="mr-2" />{t("press.assets.download", "Download")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Press;


