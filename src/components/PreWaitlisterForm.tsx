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

const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl p-[1.5px] overflow-hidden bg-[linear-gradient(135deg,#FF2D8D,#8010E0,#00D0C0)]">
    <div className="rounded-[1rem] bg-white">
      {children}
    </div>
  </div>
);

const PreWaitlisterForm = ({ cityName, city }: PreWaitlisterFormProps) => {
  const { t } = useTranslation();
  const showOtherCity = !city || city === "oth";

  const formSchema = z.object({
    email: z.string().email({
      message: t(
        "pre_waitlister.validation.email",
        "Please enter a valid email address"
      ),
    }),
    other_city: showOtherCity
      ? z.string().min(1, {
          message: t(
            "pre_waitlister.validation.other_city",
            "Please enter your city"
          ),
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
          title: t(
            "pre_waitlister.form.success.title",
            "You're on the waitlist!"
          ),
          description: t(
            "pre_waitlister.form.success.description",
            "Sign up now, and as soon as enough locals join, we'll connect you with your new friend group."
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
          t(
            "pre_waitlister.form.error.description",
            "We couldn't add you to the waitlist."
          ),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto w-full px-4 sm:px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-2xl md:max-w-4xl space-y-12 md:space-y-16"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-6 md:space-y-8">
                <FormControl>
                  <FieldShell>
                    <Input
                      type="email"
                      placeholder={t(
                        "pre_waitlister.form.email_placeholder",
                        "Your email address"
                      )}
                      {...field}
                      className="h-20 text-lg bg-transparent border-0 shadow-none px-8 placeholder:opacity-70 focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                    />
                  </FieldShell>
                </FormControl>
                <FormMessage className="text-sm mt-2" />
              </FormItem>
            )}
          />

          {showOtherCity && (
            <FormField
              control={form.control}
              name="other_city"
              render={({ field }) => (
                <FormItem className="space-y-4 md:space-y-6">
                  <FormLabel className="text-lg font-semibold text-gray-800 tracking-wide block">
                    {t("pre_waitlister.form.other_city", "Which city?")}
                  </FormLabel>
                  <FormControl>
                    <FieldShell>
                      <Input
                        {...field}
                        placeholder={t(
                          "pre_waitlister.form.other_city_placeholder",
                          "Enter your city"
                        )}
                        className="h-20 text-lg bg-transparent border-0 shadow-none px-8 placeholder:opacity-70 focus:ring-2 focus:ring-primary/20 focus:ring-offset-0"
                      />
                    </FieldShell>
                  </FormControl>
                  <FormMessage className="text-sm mt-2" />
                </FormItem>
              )}
            />
          )}

          <div className="pt-8 md:pt-10">
            <Button
              type="submit"
              className="w-full h-20 text-lg bg-gradient-hero text-white hover:opacity-90 transition-all duration-300 font-semibold tracking-wide rounded-2xl shadow-lg hover:shadow-xl"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("pre_waitlister.form.sending", "Joining...")}
                </span>
              ) : (
                t("pre_waitlister.form.submit", "Join Waitlist")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PreWaitlisterForm;
