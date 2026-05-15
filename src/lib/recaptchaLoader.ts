import { RECAPTCHA_SITE_KEY } from "@/lib/constants";

type GrecaptchaWindow = Window & {
  grecaptcha?: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
};

/** Idempotent: loads reCAPTCHA v3 script once for `grecaptcha.execute`. */
export function loadRecaptchaScriptOnce(): void {
  const scriptId = "recaptcha-script";
  if (document.getElementById(scriptId)) return;
  const script = document.createElement("script");
  script.id = scriptId;
  script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

async function waitForGrecaptcha(maxAttempts = 80): Promise<void> {
  for (let n = 0; n < maxAttempts; n += 1) {
    const w = window as GrecaptchaWindow;
    if (w.grecaptcha) return;
    await new Promise((r) => setTimeout(r, 50));
  }
  throw new Error("recaptcha_timeout");
}

/** v3 invisible token for the given action (script load + execute). */
export async function executeRecaptchaV3(action: string): Promise<string> {
  loadRecaptchaScriptOnce();
  await waitForGrecaptcha();
  const w = window as GrecaptchaWindow;
  const g = w.grecaptcha;
  if (!g) {
    throw new Error("recaptcha_unavailable");
  }
  return new Promise((resolve, reject) => {
    g.ready(() => {
      g.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(reject);
    });
  });
}

