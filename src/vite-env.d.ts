/// <reference types="vite/client" />

import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    /**
     * HTML `fetchpriority` (lowercase). Prefer this in JSX on React 18 instead of `fetchPriority`
     * so the attribute matches the DOM and React does not warn.
     */
    fetchpriority?: "high" | "low" | "auto";
  }
}

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  /** When true (default), use staging-api.kikiapp.eu for Stripe/payment APIs. When false, use api.kikiapp.eu. */
  readonly VITE_IS_STRIPE_TEST_MODE?: string;
  /** WhatsApp Business number in international format (e.g. 14155551234) for the floating chat button. */
  readonly VITE_WHATSAPP_PHONE?: string;
  /** Optional pre-filled message when opening WhatsApp chat (e.g. "Hi! I have a question about Pulse."). */
  readonly VITE_WHATSAPP_PREFILL?: string;
  /** Make.com (or other) webhook for in-widget chat; POST JSON { thread_id, message, count }. */
  readonly VITE_CHAT_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
