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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";
import { trackPreWaitlisterEvent } from "@/lib/utils";

interface PreWaitlisterFormProps {
  cityName: string;
  city?: string;
}

/** Unified gradient shell for inputs */
const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-[32px] p-[1.5px] overflow-hidden bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)] shadow-[0_10px_40px_rgba(0,0,0,0.10)]">
    <div className="rounded-[30px] bg-white">{children}</div>
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
    defaultValues: { email: "", other_city: "" },
  });

  useEffect(() => {
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    return () => {
      document.getElementById(scriptId)?.remove();
      document.querySelector(".grecaptcha-badge")?.remove();
      if ((window as any).grecaptcha) delete (window as any).grecaptcha;
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!(window as any).grecaptcha) throw new Error("reCAPTCHA not loaded");

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
      if (!result.success) throw new Error(result.message || "Something went wrong");

      trackPreWaitlisterEvent('pre_waitlist_popup_submission', {
        cityName,
        city: city || data.other_city,
        extra: { email: data.email }
      });

      toast({
        title: t("pre_waitlister.form.success.title", "You are on the waitlist"),
        description: t(
          "pre_waitlister.form.success.description",
          "We will match you when enough locals join."
        ),
      });
      form.reset();
    } catch (err: any) {
      toast({
        title: t("pre_waitlister.form.error.title", "Oops"),
        description:
          err.message ||
          t("pre_waitlister.form.error.description", "We could not add you to the waitlist."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto w-full">
      <div className="text-center mb-6 md:mb-8 px-6 md:px-10">
        <p className="text-lg md:text-xl text-black/70 font-medium">
          {t("pre_waitlister.launch_subtitle", "The more people who join, the faster we launch in {cityName}.").replace("{cityName}", cityName)}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-xl md:max-w-2xl space-y-8 md:space-y-10 px-6 md:px-10 pb-6"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormControl>
                  <FieldShell>
                    <div className="relative">
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
                        className="h-20 bg-transparent border-0 shadow-none pl-14 pr-6 text-[18px] md:text-[20px] text-black placeholder:text-gray-500 placeholder:font-medium focus:ring-2 focus:ring-primary/30 focus:ring-offset-0"
                      />
                    </div>
                  </FieldShell>
                </FormControl>
                <FormMessage className="text-sm mt-1" />
              </FormItem>
            )}
          />

          {/* City */}
          {showOtherCity && (
            <FormField
              control={form.control}
              name="other_city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <FieldShell>
                      <div className="relative">
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
                          placeholder={t("pre_waitlister.form.other_city_placeholder", "Your city")}
                          className="h-20 bg-transparent border-0 shadow-none pl-14 pr-6 text-[18px] md:text-[20px] text-black placeholder:text-gray-500 placeholder:font-medium focus:ring-2 focus:ring-primary/30 focus:ring-offset-0"
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
              className="w-full h-20 text-[18px] md:text-[20px] font-semibold tracking-wide rounded-[32px] bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)] text-white shadow-[0_16px_60px_rgba(128,16,224,0.38)] hover:shadow-[0_22px_72px_rgba(128,16,224,0.48)] transition-transform duration-150 active:scale-[0.98] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("pre_waitlister.form.sending", "Joining...")}
                </span>
              ) : (
                t("pre_waitlister.form.submit", "Save My Place")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreWaitlisterForm;
