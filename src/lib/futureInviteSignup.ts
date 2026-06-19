import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { buildFutureInviteSignupUrl } from "@/lib/eventApi";
import { loadRecaptchaScriptOnce } from "@/lib/recaptchaLoader";
import { suggestionsForApi } from "@/lib/futureInviteSuggestions";

type TFn = (key: string, fallback?: string) => string;

/** Returns a 2-letter language code for the API, or undefined to omit the field. */
function safeLanguageForApi(language: unknown): string | undefined {
  try {
    if (typeof language !== "string") return undefined;
    const trimmed = language.trim();
    if (!trimmed) return undefined;
    const lang = trimmed.toLowerCase().slice(0, 2);
    if (!/^[a-z]{2}$/.test(lang)) return undefined;
    return lang;
  } catch {
    return undefined;
  }
}

/**
 * POST /events/future-invite-signup/ — email, kiki_id, recaptcha, optional language & suggestions.
 */
export async function submitFutureInviteSignup(params: {
  emailTrimmed: string;
  kikiId: number;
  suggestionIds: string[];
  language?: string;
  t: TFn;
}): Promise<void> {
  const { emailTrimmed, kikiId, suggestionIds, language, t } = params;
  const email = emailTrimmed.trim().toLowerCase();

  loadRecaptchaScriptOnce();
  if (!(window as any).grecaptcha) {
    await new Promise<void>((resolve, reject) => {
      let n = 0;
      const id = window.setInterval(() => {
        n += 1;
        if ((window as any).grecaptcha) {
          window.clearInterval(id);
          resolve();
        } else if (n > 80) {
          window.clearInterval(id);
          reject(new Error("timeout"));
        }
      }, 50);
    }).catch(() => {
      throw new Error(
        t("future_invites.error_recaptcha", "Security check failed. Please refresh and try again.")
      );
    });
  }

  const token = await new Promise<string>((resolve, reject) => {
    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: "future_invite_signup" })
        .then(resolve)
        .catch(reject);
    });
  });

  const payload: Record<string, unknown> = {
    recaptcha: token,
    email,
    kiki_id: kikiId,
  };
  const lang = safeLanguageForApi(language);
  if (lang) payload.language = lang;
  const sug = suggestionsForApi(suggestionIds);
  if (sug.length > 0) payload.suggestions = sug;

  const response = await fetch(buildFutureInviteSignupUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({ success: false }));

  if (response.status === 429) {
    throw new Error(t("future_invites.error_rate_limit", "Too many attempts. Please try again in a minute."));
  }

  if (!result.success) {
    const msg = result.error || t("future_invites.error_generic", "Something went wrong. Please try again.");
    throw new Error(msg);
  }
}
