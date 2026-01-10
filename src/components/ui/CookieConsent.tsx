import React, { useEffect, useState } from "react";
import { acceptAll, getConsent, hasUserSetConsent, rejectNonEssential, setConsent, type ConsentCategories } from "@/lib/consent";
import { isInEeaUk } from "@/lib/region";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cookie } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type CookieConsentProps = {
  manageRef?: React.MutableRefObject<() => void | null>;
};

export const CookieConsent: React.FC<CookieConsentProps> = ({ manageRef }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentCategories>(getConsent());

  useEffect(() => {
    if (hasUserSetConsent()) return;
    // Show banner only in EU/UK. On failure, show (compliance-first)
    isInEeaUk()
      .then((inRegion) => {
        if (inRegion) setVisible(true);
      })
      .catch(() => {
        setVisible(true);
      });
  }, []);

  useEffect(() => {
    if (manageRef) {
      manageRef.current = () => setOpen(true);
    }
    try {
      window.dispatchEvent(new CustomEvent("pulseSetManageConsent", { detail: () => setOpen(true) }));
    } catch {}
  }, [manageRef]);

  const handleAcceptAll = () => {
    acceptAll();
    setPrefs(getConsent());
    setVisible(false);
  };

  const handleReject = () => {
    rejectNonEssential();
    setPrefs(getConsent());
    setVisible(false);
  };

  const handleSave = () => {
    setConsent(prefs);
    setOpen(false);
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <div className="mx-auto max-w-none md:max-w-5xl">
            <div className="m-0 rounded-none md:m-3 md:rounded-2xl border border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 shadow-2xl overflow-hidden">
              <div className="p-3 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue p-1 mt-0.5 md:mt-1">
                    <Cookie className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-300">
                    <p className="font-medium text-white mb-1 text-sm md:text-base">{t("cookie.banner.headline", "We use cookies to make friendship sweeter.")}</p>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {t("cookie.banner.description", "We use essential cookies and, with your OK, analytics and marketing to improve Pulse. See our {privacy_link}.").split("{privacy_link}")[0]}
                      <a href="/cookie-policy" className="text-[#38D1BF] hover:underline">{t("cookie.banner.privacy_link_text", "Privacy & Cookie Policy")}</a>
                      {t("cookie.banner.description", "We use essential cookies and, with your OK, analytics and marketing to improve Pulse. See our {privacy_link}.").split("{privacy_link}")[1]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center flex-wrap gap-2 md:gap-3">
                  <Button variant="ghost" className="text-gray-300 hover:text-white h-8 px-3 text-xs md:h-9 md:px-4 md:text-sm" onClick={() => setOpen(true)}>{t("cookie.customize", "Customize")}</Button>
                  <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700 h-8 px-3 text-xs md:h-9 md:px-4 md:text-sm" onClick={handleReject}>{t("cookie.reject", "Reject")}</Button>
                  <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:opacity-90 h-8 px-3 text-xs md:h-9 md:px-4 md:text-sm" onClick={handleAcceptAll}>{t("cookie.accept_all", "Accept all")}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="hidden" />
        </DialogTrigger>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 max-w-[92vw] w-[92vw] sm:max-w-lg sm:w-full p-4 sm:p-6 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("cookie.title", "Cookie preferences")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-gray-800/60 border border-gray-700">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t("cookie.essential", "Essential")}</p>
                <p className="text-xs text-gray-400">{t("cookie.essential_desc", "Required for the site to work. Always on.")}</p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-gray-800/60 border border-gray-700">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t("cookie.analytics", "Analytics")}</p>
                <p className="text-xs text-gray-400">{t("cookie.analytics_desc", "Help us understand usage and improve Pulse.")}</p>
              </div>
              <Switch checked={prefs.analytics} onCheckedChange={(v) => setPrefs((p) => ({ ...p, analytics: Boolean(v) }))} />
            </div>
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-gray-800/60 border border-gray-700">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t("cookie.marketing", "Marketing")}</p>
                <p className="text-xs text-gray-400">{t("cookie.marketing_desc", "Measure campaigns and show relevant content.")}</p>
              </div>
              <Switch checked={prefs.marketing} onCheckedChange={(v) => setPrefs((p) => ({ ...p, marketing: Boolean(v) }))} />
            </div>
            <div className="flex w-full flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-gray-800/60 border border-gray-700">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t("cookie.performance", "Performance")}</p>
                <p className="text-xs text-gray-400">{t("cookie.performance_desc", "Improve speed and reliability.")}</p>
              </div>
              <Switch checked={prefs.performance} onCheckedChange={(v) => setPrefs((p) => ({ ...p, performance: Boolean(v) }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700" onClick={handleReject}>{t("cookie.reject_non_essential", "Reject non-essential")}</Button>
            <Button variant="ghost" onClick={() => setPrefs(getConsent())}>{t("cookie.reset", "Reset")}</Button>
            <Button className="bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue hover:opacity-90" onClick={handleSave}>{t("cookie.save", "Save preferences")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;


