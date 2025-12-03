import React, { useEffect } from "react";
import { getConsent } from "@/lib/consent";
import { isInEeaUk } from "@/lib/region";

const loadScript = (src: string, attrs: Record<string, string> = {}) => {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
};

export const ConsentScriptLoader: React.FC = () => {
  useEffect(() => {
    const maybeLoad = async () => {
      const consent = getConsent();

      // Google Analytics now loads unconditionally in index.html
      // Update Google Consent Mode v2 for ad signals based on CPRA opt-out, GPC, and region
      const gpcEnabled = typeof navigator !== 'undefined' && (navigator as any).globalPrivacyControl === true;
      let inEeaUk: boolean | null = null;
      try {
        inEeaUk = await isInEeaUk();
      } catch {
        inEeaUk = null;
      }
      let adGranted = true;
      if (consent.doNotShare || gpcEnabled) {
        adGranted = false;
      } else if (inEeaUk === true) {
        adGranted = Boolean(consent.marketing);
      } else {
        adGranted = true;
      }
      try {
        const gtag = (window as any).gtag as undefined | ((...args: any[]) => void);
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            ad_storage: adGranted ? 'granted' : 'denied',
            ad_user_data: adGranted ? 'granted' : 'denied',
            ad_personalization: adGranted ? 'granted' : 'denied',
          });
        }
      } catch {}

      // Meta Pixel (disabled if CPRA doNotShare or ad consent denied)
      // Script is loaded in index.html; initialize only when consent is granted
      const fbq = (window as any).fbq as undefined | ((...args: any[]) => void);
      if (consent.marketing && !consent.doNotShare && adGranted) {
        if (typeof fbq === 'function') {
          // Initialize pixel if not already initialized
          try {
            fbq('init', '1935826830293991');
            // Initial page view will be tracked by MetaPixelPageViewTracker on route changes
            // Only track initial page view here if this is the first consent grant
            if (!(window as any)._fbPixelInitialized) {
              fbq('track', 'PageView');
              (window as any)._fbPixelInitialized = true;
            }
          } catch (e) {
            // Pixel initialization failed, ignore
          }
        }
      }

      // Other marketing/analytics vendor example (commented placeholders)
      // if (consent.marketing && !consent.doNotShare && adGranted) loadScript('https://r2.leadsy.ai/tag.js', { id: 'vtag-ai-js', 'data-pid': 'Zd1Rijad0ASVw65K', 'data-version': '062024' });
    };

    void maybeLoad();
    const handler = () => { void maybeLoad(); };
    window.addEventListener('pulseConsentChanged', handler as EventListener);
    return () => window.removeEventListener('pulseConsentChanged', handler as EventListener);
  }, []);

  return null;
};

export default ConsentScriptLoader;
