
import React, { useEffect } from "react";
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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/hooks/useTranslation";
import { RECAPTCHA_SITE_KEY, API_BASE_URL } from "@/lib/constants";

// Create a type to represent our form values
type FormValues = {
  communityName: string;
  name: string;
  email: string;
  communitySize: string;
  agreeToTerms: boolean;
}

const CommunitySignupForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  // Create the form schema with translated validation messages
  const formSchema = z.object({
    communityName: z.string().min(2, t("community.validation.community_name", "Community name must be at least 2 characters")),
    name: z.string().min(2, t("community.validation.name", "Your name is required")),
    email: z.string().email(t("community.validation.email", "Invalid email address")),
    communitySize: z.string().min(1, t("community.validation.community_size", "Please select a community size")),
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: t("community.validation.terms", "You must agree to our terms and privacy policy")
    })
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityName: "",
      name: "",
      email: "",
      communitySize: "",
      agreeToTerms: false,
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
      if (script) script.remove();
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.remove();
      if ((window as any).grecaptcha) delete (window as any).grecaptcha;
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
            .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
            .then(resolve)
            .catch(reject);
        });
      });

      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: "", // Optional field in this form
          title: `Community Signup: ${data.communityName}`,
          message: `Community size: ${data.communitySize}`,
          recaptcha: token,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: t("community.toast.success.title", "Submitted!"),
          description: t("community.toast.success.description", "We'll be in touch soon."),
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err: any) {
      toast({
        title: t("community.toast.error.title", "Oops!"),
        description: err.message || t("community.toast.error.description", "We couldn't process your submission."),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700 p-6 space-y-4"
      >
        <FormField
          control={form.control}
          name="communityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("community.form.community_name", "Community Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("community.form.community_name_placeholder", "e.g., Stanford Alumni Network")}
                  className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("community.form.your_name", "Your Name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("community.form.your_name_placeholder", "Your full name")}
                  className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("community.form.email", "Email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("community.form.email_placeholder", "your@email.com")}
                  className="bg-gray-700/50 border-gray-600 focus-visible:ring-purple-500 placeholder:text-gray-500" 
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="communitySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">{t("community.form.community_size", "Community Size")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500">
                    <SelectValue placeholder={t("community.form.select_size", "Select size...")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="small">{t("community.form.small", "Small (50-500 members)")}</SelectItem>
                  <SelectItem value="medium">{t("community.form.medium", "Medium (500-2,000 members)")}</SelectItem>
                  <SelectItem value="large">{t("community.form.large", "Large (2,000-10,000 members)")}</SelectItem>
                  <SelectItem value="enterprise">{t("community.form.xlarge", "Extra-Large (10,000+ members)")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-soft-gray" />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange} 
                className="border-pulse-blue data-[state=checked]:bg-pulse-blue" 
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                {t("community.form.agree_terms", "I agree to the")} <a target="_blank" href="https://legal.pulsenow.app/terms.html" className="text-pulse-blue hover:underline">{t("legal.terms.link_text", "terms of service")}</a> {t("community.form.and", "and")} <a target="_blank" href="https://legal.pulsenow.app/privacy.html" className="text-pulse-blue hover:underline">{t("legal.privacy.link_text", "privacy policy")}</a>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )} />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-pulse-blue hover:bg-pulse-blue/90 transition-colors duration-300" 
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("community.form.processing", "Processing...")}
            </span>
          ) : (
            <span>{t("community.form.submit", "Get Started")}</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommunitySignupForm;
