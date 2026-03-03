/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  /** When true (default), use staging-api.kikiapp.eu for Stripe/payment APIs. When false, use api.kikiapp.eu. */
  readonly VITE_IS_STRIPE_TEST_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
