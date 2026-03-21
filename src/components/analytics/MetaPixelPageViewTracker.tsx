import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ANALYTICS_INIT_EVENT } from '@/lib/analyticsAppReady';

export default function MetaPixelPageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    const send = () => {
      try {
        const fbq = (window as any).fbq as undefined | ((...args: any[]) => void);
        const debug = /(^|[?&])debug_fb=1(&|$)/.test(window.location.search);
        if (typeof fbq !== 'function') return;
        setTimeout(() => {
          if (debug) {
            // eslint-disable-next-line no-console
            console.log('[fb] PageView', {
              page_path: location.pathname + location.search + location.hash,
              page_title: document.title,
              page_location: window.location.href,
            });
          }
          fbq('track', 'PageView');
        }, 0);
      } catch {}
    };
    send();
    window.addEventListener(ANALYTICS_INIT_EVENT, send);
    return () => window.removeEventListener(ANALYTICS_INIT_EVENT, send);
  }, [location]);
  return null;
}

