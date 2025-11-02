import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GaPageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    try {
      const gtagFn = (window as any).gtag as undefined | ((...args: any[]) => void);
      if (typeof gtagFn === 'function') {
        gtagFn('event', 'page_view', {
          page_path: location.pathname + location.search + location.hash,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    } catch {}
  }, [location]);
  return null;
}




