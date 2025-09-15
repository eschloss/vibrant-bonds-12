import React, { useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";

interface PreWaitlisterFormProps {
  cityName: string;
  city?: string;
}

const PreWaitlisterForm = ({ cityName, city }: PreWaitlisterFormProps) => {
  const { t } = useTranslation();
  const showOtherCity = !city || city === "oth";

  // Create the form schema with translated validation messages
  const formSchema = z.object({
    email: z.string().email({
      message: t("pre_waitlister.validation.email", "Please enter a valid email address")
    }),
    newsletter: z.boolean().default(false),
    other_city: showOtherCity ? z.string().min(1, {
      message: t("pre_waitlister.validation.other_city", "Please enter your city")
    }) : z.string().optional(),
  });
  
  type FormValues = z.infer<typeof formSchema>;
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newsletter: false,
      other_city: "",
    }
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
      if (script) {
        script.remove();
      }

      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }

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
          newsletter: data.newsletter,
          city: city || data.other_city,
          other_city: showOtherCity ? data.other_city : "",
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: t("pre_waitlister.form.success.title", "You're on the waitlist!"),
          description: t("pre_waitlister.form.success.description", "We'll notify you as soon as we're ready to match you with your crew."),
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: t("pre_waitlister.form.error.title", "Oops!"),
        description: err.message || t("pre_waitlister.form.error.description", "We couldn't add you to the waitlist."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("pre_waitlister.title", "We're almost ready in {cityName}.").replace("{cityName}", cityName)}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {t("pre_waitlister.subtitle", "Sign up now, and as soon as enough locals join, we'll connect you with your best matches.")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-900 dark:text-white">
                {t("pre_waitlister.form.email", "Email")}
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t("pre_waitlister.form.email_placeholder", "Your email address")}
                  type="email" 
                  {...field} 
                  className="bg-white/70 dark:bg-gray-800/70 border-gray-300 dark:border-gray-600 focus-visible:ring-pulse-blue placeholder:text-gray-500" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {showOtherCity && (
            <FormField control={form.control} name="other_city" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-900 dark:text-white">
                  {t("pre_waitlister.form.other_city", "Which city?")}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t("pre_waitlister.form.other_city_placeholder", "Enter your city")}
                    {...field} 
                    className="bg-white/70 dark:bg-gray-800/70 border-gray-300 dark:border-gray-600 focus-visible:ring-pulse-blue placeholder:text-gray-500" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          )}

          <FormField control={form.control} name="newsletter" render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                  className="border-pulse-blue data-[state=checked]:bg-pulse-blue" 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                  {t("pre_waitlister.form.newsletter", "Keep me updated on Pulse news")}
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )} />

          <Button 
            type="submit" 
            className="w-full bg-pulse-blue hover:bg-pulse-blue/90 transition-colors duration-300" 
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("pre_waitlister.form.sending", "Joining...")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {t("pre_waitlister.form.submit", "Join Waitlist")}
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PreWaitlisterForm;