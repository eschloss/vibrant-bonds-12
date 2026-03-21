import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { buildFutureInviteSignupUrl } from "@/lib/eventApi";
import { loadRecaptchaScriptOnce } from "@/lib/recaptchaLoader";
import { suggestionsForApi } from "@/lib/futureInviteSuggestions";
import FutureInviteSuggestionChips from "@/components/FutureInviteSuggestionChips";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type GetFutureInvitesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: (key: string, fallback?: string) => string;
  kikiId: number;
  onSuccess?: () => void;
};

export default function GetFutureInvitesModal({
  open,
  onOpenChange,
  t,
  kikiId,
  onSuccess,
}: GetFutureInvitesModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSuggestionIds, setSelectedSuggestionIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setEmail("");
    setError(null);
    setSubmitted(false);
    setSubmitting(false);
    setSelectedSuggestionIds([]);
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) reset();
      onOpenChange(next);
    },
    [onOpenChange, reset]
  );

  useEffect(() => {
    if (open) loadRecaptchaScriptOnce();
  }, [open]);

  useEffect(() => {
    if (open && !submitted) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open, submitted]);

  const toggleSuggestion = (id: string) => {
    setSelectedSuggestionIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError(t("future_invites.error_required", "Email is required"));
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError(t("future_invites.error_invalid", "Please enter a valid email address"));
      inputRef.current?.focus();
      return;
    }

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
        email: trimmed.toLowerCase(),
        kiki_id: kikiId,
      };
      const sug = suggestionsForApi(selectedSuggestionIds);
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

      setSubmitted(true);
      onSuccess?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t("future_invites.error_generic", "Something went wrong. Please try again."));
      inputRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="top-4 sm:top-[50%] translate-y-0 sm:translate-y-[-50%] max-w-sm max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-gray-700 bg-gray-900 text-white sm:rounded-xl [&>button]:text-white/70 [&>button]:hover:text-white [&>button]:hover:bg-white/10"
        onEscapeKeyDown={() => handleOpenChange(false)}
        onPointerDownOutside={() => handleOpenChange(false)}
        aria-describedby={submitted ? undefined : "future-invites-description"}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {submitted
              ? t("future_invites.success_title", "You're on the list.")
              : t("future_invites.title", "Get future invites")}
          </DialogTitle>
          {!submitted && (
            <DialogDescription
              id="future-invites-description"
              className="text-sm text-gray-400"
            >
              {t(
                "future_invites.helper",
                "Leave your email and we'll let you know about future dates and similar events."
              )}
            </DialogDescription>
          )}
        </DialogHeader>

        {submitted ? (
          <p className="text-sm text-gray-300 leading-relaxed">
            {t(
              "future_invites.success_message",
              "We'll let you know when this event returns or when similar events happen nearby."
            )}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="future-invites-email"
                className="text-sm font-medium text-white/90 sr-only"
              >
                {t("future_invites.email_label", "Email address")}
              </label>
              <Input
                ref={inputRef}
                id="future-invites-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t("future_invites.email_placeholder", "you@example.com")}
                value={email}
                onFocus={() => loadRecaptchaScriptOnce()}
                onClick={() => loadRecaptchaScriptOnce()}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                aria-invalid={!!error}
                aria-describedby={error ? "future-invites-error" : undefined}
                className={cn(
                  "h-11 border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus-visible:ring-[#38D1BF]/50",
                  error && "border-red-500 focus-visible:ring-red-500/50"
                )}
              />
              {error && (
                <p
                  id="future-invites-error"
                  role="alert"
                  className="text-sm text-red-400"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400 leading-relaxed">
                {t(
                  "future_invites.suggestions_optional",
                  "Optional: tell us what kinds of events you'd most want to see."
                )}
              </p>
              <FutureInviteSuggestionChips
                selectedIds={selectedSuggestionIds}
                onToggle={toggleSuggestion}
                t={t}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-[#38D1BF] hover:bg-[#38D1BF]/90 text-gray-900 font-semibold rounded-lg disabled:opacity-70 disabled:pointer-events-none"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("future_invites.submitting", "Submitting...")}
                </span>
              ) : (
                t("future_invites.submit", "Get future invites")
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
