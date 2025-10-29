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
      if (consent.marketing && !consent.doNotShare && adGranted) {
        if (!(window as any).fbq) {
          !(function(f:any,b:any,e:any,v:any,n?:any,t?:any,s?:any){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        }
        (window as any).fbq('init', '1935826830293991');
        (window as any).fbq('track', 'PageView');
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
