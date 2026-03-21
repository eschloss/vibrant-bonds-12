import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { buildFutureInviteSignupUrl } from "@/lib/eventApi";
import { loadRecaptchaScriptOnce } from "@/lib/recaptchaLoader";
import { suggestionsForApi } from "@/lib/futureInviteSuggestions";

type TFn = (key: string, fallback?: string) => string;

/**
 * POST /events/future-invite-signup/ — same payload shape as GetFutureInvitesModal on event detail pages.
 */
export async function submitFutureInviteSignup(params: {
  emailTrimmed: string;
  kikiId: number;
  suggestionIds: string[];
  t: TFn;
}): Promise<void> {
  const { emailTrimmed, kikiId, suggestionIds, t } = params;
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
