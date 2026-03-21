import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { buildFutureInviteSignupUrl } from "@/lib/eventApi";
import { loadRecaptchaScriptOnce } from "@/lib/recaptchaLoader";
import { suggestionsForApi } from "@/lib/futureInviteSuggestions";
import FutureInviteSuggestionChips from "@/components/FutureInviteSuggestionChips";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  cityLabel: string;
  /** Django City PK from get_all_cities_expanded; required for signup. */
  cityId: number | null;
};

export default function EventsCityFutureInterestSection({ cityLabel, cityId }: Props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const withCity = (value: string) => value.replace(/\{city\}/g, cityLabel);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    const emailIsValid = EMAIL_REGEX.test(trimmed);

    if (!trimmed || !emailIsValid) {
      setEmailError(
        t(
          "events_city.future_interest.email_error",
          "Enter a valid email to get future event updates."
        )
      );
      return;
    }

    if (cityId == null) {
      setEmailError(
        t("events_city.future_interest.city_missing", "City data is still loading. Please try again in a moment.")
      );
      return;
    }

    setEmailError("");
    setSubmitting(true);
    try {
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
              reject(new Error("recaptcha"));
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
        email: trimmed.toLowerCase(),
        city_id: cityId,
      };
      const sug = suggestionsForApi(selectedTypes);
      if (sug.length > 0) payload.suggestions = sug;

      const response = await fetch(buildFutureInviteSignupUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({ success: false }));

      if (response.status === 429) {
        throw new Error(
          t("future_invites.error_rate_limit", "Too many attempts. Please try again in a minute.")
        );
      }

      if (!result.success) {
        throw new Error(
          result.error || t("future_invites.error_generic", "Something went wrong. Please try again.")
        );
      }

      setSubmitted(true);
    } catch (e: unknown) {
      setEmailError(e instanceof Error ? e.message : t("future_invites.error_generic", "Something went wrong. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes((current) =>
      current.includes(typeId)
        ? current.filter((value) => value !== typeId)
        : [...current, typeId]
    );
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 text-white">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-pulse-purple rounded-full mix-blend-screen blur-[80px] animate-float" />
        <div
          className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-pulse-blue rounded-full mix-blend-screen blur-[80px] animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {withCity(
                t(
                  "events_city.future_interest.title_prefix",
                  "Want more events in {city}?"
                )
              )}{" "}
              <span className="pulse-gradient-text">
                {t("events_city.future_interest.title_focus", "Tell us what to run next.")}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
              {withCity(
                t(
                  "events_city.future_interest.subtitle",
                  "Get updates on future events in {city} and vote on the kinds of experiences you want Pulse to organize next."
                )
              )}
            </p>
          </div>

          <div className="max-w-2xl mx-auto backdrop-blur-sm bg-white/5 dark:bg-black/20 border border-primary/20 rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {t(
                    "events_city.future_interest.form_title",
                    "Get updates on future events"
                  )}
                </h3>
              </div>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-emerald-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">
                      {t(
                        "events_city.future_interest.success_title",
                        "You're on the list"
                      )}
                    </div>
                    <div className="text-sm text-emerald-100/80 mt-1">
                      {withCity(
                        selectedTypes.length > 0
                          ? t(
                              "events_city.future_interest.success_with_votes",
                              "We'll keep you posted on new events in {city}, and we've saved your event type preferences too."
                            )
                          : t(
                              "events_city.future_interest.success_without_votes",
                              "We'll keep you posted when new events and dates open up in {city}."
                            )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div className="space-y-3">
                  <Input
                    type="email"
                    value={email}
                    onFocus={() => loadRecaptchaScriptOnce()}
                    onClick={() => loadRecaptchaScriptOnce()}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder={t(
                      "events_city.future_interest.email_placeholder",
                      "Enter your email"
                    )}
                    className="h-12 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-white/45 focus-visible:ring-pulse-pink/40"
                  />
                  {emailError ? <p className="text-sm text-rose-300">{emailError}</p> : null}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue shadow-[0_0_14px_rgba(168,85,247,0.45)]" />
                    <p>
                      {withCity(
                        t(
                          "events_city.future_interest.vote_inline",
                          "Optional — tell us what kinds of events you'd most want to see in {city}."
                        )
                      )}
                    </p>
                  </div>

                  <FutureInviteSuggestionChips
                    selectedIds={selectedTypes}
                    onToggle={toggleType}
                    t={t}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pulse-pink via-accent to-pulse-blue text-white shadow-lg shadow-purple-500/20 hover:opacity-95 disabled:opacity-60"
                  size="lg"
                >
                  {submitting
                    ? t("future_invites.submitting", "Submitting...")
                    : t(
                    "events_city.future_interest.submit_cta",
                    "Get updates"
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
