import { RECAPTCHA_SITE_KEY } from "@/lib/constants";

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
