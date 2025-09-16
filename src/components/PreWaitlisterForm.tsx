import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";

interface PreWaitlisterFormProps {
  cityName: string;
  city?: string;
}

/* Clean gradient border shell */
const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-3xl p-[1.5px] overflow-hidden bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
    <div className="rounded-[20px] bg-white">{children}</div>
  </div>
);

const PreWaitlisterForm = ({ cityName, city }: PreWaitlisterFormProps) => {
  const { t } = useTranslation();
  const showOtherCity = !city || city === "oth";

  const formSchema = z.object({
    email: z.string().email({
      message: t("pre_waitlister.validation.email", "Please enter a valid email address"),
    }),
    other_city: showOtherCity
      ? z.string().min(1, {
          message: t("pre_waitlister.validation.other_city", "Please enter your city"),
        })
      : z.string().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      other_city: "",
    },
  });

  useEffect(() => {
    const scriptId = "recaptcha-script";
    const loadReCaptcha = () => {
      if (document.getElementById(scriptId)) return;
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadReCaptcha();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
      if ((window as any).grecaptcha) {
        delete (window as any).grecaptcha;
      }
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!(window as any).grecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const token = await new Promise<string>((resolve, reject) => {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "pre_waitlister" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch(`${API_BASE_URL}/pre-waitlister/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          newsletter: false,
          city: city || data.other_city,
          other_city: showOtherCity ? data.other_city : "",
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: t("pre_waitlister.form.success.title", "You’re on the waitlist!"),
          description: t(
            "pre_waitlister.form.success.description",
            "We will match you as soon as enough locals join."
          ),
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: t("pre_waitlister.form.error.title", "Oops!"),
        description:
          err.message ||
          t("pre_waitlister.form.error.description", "We could not add you to the waitlist."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative mx-auto w-full">
      {/* Soft spotlight behind the form for contrast over busy photo */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 md:top-10 w-[92%] max-w-4xl h-[520px] rounded-[32px] bg-gradient-to-b from-white/70 via-white/55 to-white/30 backdrop-blur-xl ring-1 ring-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.18)]"></div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative mx-auto w-full px-4 sm:px-6 max-w-xl md:max-w-2xl space-y-10 md:space-y-12"
        >
          {/* Headline and subtitle are assumed to be outside this component on your page.
              If you keep them here, give them bottom margin that matches the rhythm. */}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <FieldShell>
                    <div className="relative">
                      {/* Optional icon */}
                      <svg
                        aria-hidden="true"
                        className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 6h16v12H4z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                      <Input
                        type="email"
                        placeholder={t("pre_waitlister.form.email_placeholder", "Your email address")}
                        {...field}
                        className="h-16 md:h-20 bg-transparent border-0 shadow-none pl-14 pr-6 text-base md:text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 focus:ring-offset-0"
                      />
                    </div>
                  </FieldShell>
                </FormControl>
                <FormMessage className="text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* City (optional based on prop) */}
          {showOtherCity && (
            <FormField
              control={form.control}
              name="other_city"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-base md:text-lg font-semibold text-gray-800 text-center md:text-left">
                    {t("pre_waitlister.form.other_city", "Which city are you in?")}
                  </FormLabel>
                  <FormControl>
                    <FieldShell>
                      <div className="relative">
                        {/* Optional icon */}
                        <svg
                          aria-hidden="true"
                          className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 5-9 12-9 12S3 15 3 10a9 9 0 1118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <Input
                          {...field}
                          placeholder={t("pre_waitlister.form.other_city_placeholder", "Enter your city")}
                          className="h-16 md:h-20 bg-transparent border-0 shadow-none pl-14 pr-6 text-base md:text-lg placeholder:text-gray-400 focus:ring-2 focus:ring-primary/30 focus:ring-offset-0"
                        />
                      </div>
                    </FieldShell>
                  </FormControl>
                  <FormMessage className="text-sm mt-1" />
                </FormItem>
              )}
            />
          )}

          {/* CTA */}
          <div className="pt-2 md:pt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-16 md:h-20 text-lg md:text-xl font-semibold tracking-wide rounded-full bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)] text-white shadow-[0_12px_40px_rgba(128,16,224,0.35)] hover:shadow-[0_16px_56px_rgba(128,16,224,0.45)] transition-transform duration-200 active:scale-[0.98] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("pre_waitlister.form.sending", "Joining...")}
                </span>
              ) : (
                t("pre_waitlister.form.submit", "Join Waitlist")
              )}
            </Button>

            {/* Reassurance line */}
            <p className="mt-3 text-center text-sm text-gray-700">
              {t("pre_waitlister.form.privacy_note", "No spam. We will only message you about matching in your city.")}
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreWaitlisterForm;
