import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GaPageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    try {
      const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
      const debug = /(^|[?&])debug_ga=1(&|$)/.test(window.location.search);
      if (typeof gtagFn === 'function') {
        setTimeout(() => {
          const payload = {
            page_path: location.pathname + location.search + location.hash,
            page_title: document.title,
            page_location: window.location.href,
          } as const;
          if (debug) {
            // eslint-disable-next-line no-console
            console.log('[ga] page_view', payload);
          }
          gtagFn('event', 'page_view', payload);
        }, 0);
      }
    } catch {}
  }, [location]);
  return null;
}




