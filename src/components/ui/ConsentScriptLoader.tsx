import React, { useEffect } from "react";
import { getConsent } from "@/lib/consent";

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
    const maybeLoad = () => {
      const consent = getConsent();

      // Google Analytics (gtag)
      if (consent.analytics) {
        loadScript("https://www.googletagmanager.com/gtag/js?id=G-J591H7VFMV");
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]){(window as any).dataLayer.push(args);}
        (window as any).gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-J591H7VFMV');
      }

      // Meta Pixel
      if (consent.marketing) {
        if (typeof (window as any).fbq === 'undefined') {
          (function(f:any,b:any,e:any,v:any,n?:any,t?:any,s?:any){
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
    };

    maybeLoad();
    const handler = () => maybeLoad();
    window.addEventListener('pulseConsentChanged', handler as EventListener);
    return () => window.removeEventListener('pulseConsentChanged', handler as EventListener);
  }, []);

  return null;
};

export default ConsentScriptLoader;
