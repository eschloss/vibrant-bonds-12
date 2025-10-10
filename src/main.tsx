
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import { onCLS, onFID, onLCP, onINP, onTTFB } from 'web-vitals'

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);

// Minimal Web Vitals reporting (console + dataLayer if present)
const report = (name: string, value: number) => {
  // eslint-disable-next-line no-console
  console.log(`[web-vitals] ${name}:`, Math.round(value))
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: 'web_vitals', name, value })
  }
}

onCLS((v) => report('CLS', v.value))
onFID((v) => report('FID', v.value))
onLCP((v) => report('LCP', v.value))
onINP((v) => report('INP', v.value))
onTTFB((v) => report('TTFB', v.value))
